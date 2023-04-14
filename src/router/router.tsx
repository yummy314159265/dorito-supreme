import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { Home } from "../components/pages/Home/Home";
import { Auth } from "../components/pages/Auth/Auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        index: true,
        element: <Home></Home>
      },
      {
        path: "/login",
        element: <Auth></Auth>
      }
    ]
  }
]);
