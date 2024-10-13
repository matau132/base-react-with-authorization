import Layout, { PropsLayout } from "app/components/Layout/Layout";
import React, { Fragment, lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IndexedObject } from "types/common";
import { UserInfo, UserRole } from "types/userInfo";
import { Epath } from "./routesConfig";

export type RoutesProps = {
  exact?: boolean;
  path: string;
  component: React.FC<{
    history: IndexedObject;
    location: IndexedObject;
    match: IndexedObject;
  }>;
  auth?: boolean;
  role?: UserRole;
  routes?: Array<RoutesProps>;
  layout?: React.FC<PropsLayout>;
};

const RenderRoutes = ({
  routes,
  currentUser,
  loading,
}: {
  routes: Array<RoutesProps>;
  currentUser?: UserInfo;
  loading: boolean;
}) => {
  if (loading) return <div>loading...</div>;

  return (
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
        {routes.map((route, i) => {
          const Layout = route.layout || Fragment;
          const Component = route.component || <div />;

          if (route.auth) {
            if (!currentUser) {
              return <Redirect key={i} to={Epath.pathLogin} />;
            }

            const isRoleAllow =
              route.role === UserRole.ALL ||
              currentUser?.attributes?.role === route.role;

            if (!isRoleAllow) {
              return <Redirect key={i} to={Epath.pathNotFoundPage} />;
            }
          }

          return (
            <Route
              key={i}
              path={route.path}
              exact={!!route.exact}
              render={(props) => {
                return (
                  <Layout>
                    {route.routes ? (
                      <RenderRoutes
                        routes={route.routes}
                        currentUser={currentUser}
                        loading={loading}
                      />
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                );
              }}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
};

export const routes: RoutesProps[] = [
  {
    exact: true,
    path: Epath.pathNotFoundPage,
    component: lazy(() => import("../pages/NotFound/NotFound")),
  },
  {
    exact: true,
    path: Epath.pathLogin,
    component: lazy(() => import("../pages/LoginPage/LoginPage")),
  },
  {
    path: "*",
    layout: Layout,
    component: () => <Redirect to={Epath.pathHomePage} />,
    role: UserRole.ALL,
    routes: [
      {
        exact: true,
        path: Epath.pathHomePage,
        component: lazy(() => import("../pages/HomePage/HomePage")),
        auth: true,
        role: UserRole.ADMIN,
      },
    ],
  },
];

export default RenderRoutes;
