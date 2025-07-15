import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import CreateBiodataModal from "../components/CreateBiodataModal";
import Biodatas from "../pages/Biodatas";
import PrivateRoute from "./PrivateRoute";
import BiodataDetails from "../pages/BiodataDetails";
import SubmitSuccessStory from "../components/SubmitSuccessStory";


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
  path: "/create-biodatamodal",
  element: (
    <PrivateRoute>
      <CreateBiodataModal />
    </PrivateRoute>
  ),
}, 

{
  path: "biodatas/:id",
  element: (
    <PrivateRoute>
      <BiodataDetails />
    </PrivateRoute>
  )
},

{
  path: "/biodata-details/:id",
  element: (
    <PrivateRoute>
      <BiodataDetails />
    </PrivateRoute>
  )
},

{
  path: "submit-story",
  element: (
    <PrivateRoute>
      <SubmitSuccessStory />
    </PrivateRoute>
  ),
},


      {
        path: "biodatas",
        Component: Biodatas,
      }



      // {
      //   path: "dashboard",
      //   Component: Dashboard,
      // },

      
    ],
  },
]);
