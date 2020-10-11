import BlogLayout from "./layouts/BlogLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import NodesBySlug from "./views/nodes/NodesBySlug";
import NodesByTerm from "./views/nodes/NodesByTerm";
import NodesByType from "./views/nodes/NodesByType";
import Presentation from "./views/Presentation";

let presentationRoutes = [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: Presentation,
    name: "Presentation"
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

let routes = [...presentationRoutes];
export { routes, presentationRoutes };
