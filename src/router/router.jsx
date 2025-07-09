import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import CreateBiodata from "../pages/CreateBiodata";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },

      {
        path: "/create-biodata",
        Component: CreateBiodata,
      }



      // {
      //   path: "dashboard",
      //   Component: Dashboard,
      // },

      
    ],
  },
]);
