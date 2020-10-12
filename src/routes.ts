import BlogLayout from "./layouts/BlogLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import NodesBySlug from "./views/nodes/NodesBySlug";
import NodesByTerm from "./views/nodes/NodesByTerm";
import NodesByType from "./views/nodes/NodesByType";
import Presentation from "./views/Presentation";

let staticRoutes = [
  {
    path: "/support",
    exact: true,
    layout: BlogLayout,
    component: NodesBySlug,
  },
];

let presentationRoutes = [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: Presentation,
  },
  {
    path: "/:type(page|blog)/term/:term",
    exact: false,
    layout: BlogLayout,
    component: NodesByTerm,
  },
  {
    path: "/:type(page|blog)/:slug",
    exact: false,
    layout: BlogLayout,
    component: NodesBySlug,
  },
  {
    path: "/:type(page|blog)",
    exact: false,
    layout: BlogLayout,
    component: NodesByType,
  },
];

let routes = [...staticRoutes, ...presentationRoutes];
export { routes, presentationRoutes };
