import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import CreateBiodataModal from "../components/CreateBiodataModal";
import Biodatas from "../pages/Biodatas";
import PrivateRoute from "./PrivateRoute";
import BiodataDetails from "../pages/BiodataDetails";
import CheckoutPage from "../pages/Dashboard/CheckoutPage";
import DashboardLayout from "../layouts/DashboardLayout";
import EditBiodata from "../pages/Dashboard/EditBiodata";
import ViewBiodata from "../pages/Dashboard/ViewBiodata";
import MyContactRequest from "../pages/Dashboard/MyContactRequest";
import MyFavourites from "../pages/Dashboard/MyFavourites";
import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import ApprovedContactRequest from "../pages/Dashboard/AdminDashboard/ApprovedContactRequest";
import ApprovedPremium from "../pages/Dashboard/AdminDashboard/ApprovedPremium";
import ManageUsers from "../pages/Dashboard/AdminDashboard/ManageUsers";
import SubmitSuccessStory from "../components/GotMarried/SubmitSuccessStory";
import AdminSuccessStories from "../pages/Dashboard/AdminDashboard/AdminSuccessStories";
import AdminSuccessStoryTable from "../pages/Dashboard/AdminDashboard/AdminSuccessStoryTable";
import Contact from "../pages/Contact";
import About from "../pages/About";


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
        path: "contact",
        Component: Contact,
      },
              {
        path: "about",
        Component: About,
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
        path: "/checkout/:biodataId",
        element: <PrivateRoute>
          <CheckoutPage />
        </PrivateRoute>,
     

      },

      {
        path: "got-married",
        element: (
          <PrivateRoute>
            <SubmitSuccessStory />
          </PrivateRoute>
        ),
      },

      {
        path: "/dashboard",
        element:

          <PrivateRoute>
            <DashboardLayout></DashboardLayout>
          </PrivateRoute>,
        children: [
          {
            path: "edit-biodata",
            element: <EditBiodata></EditBiodata>
          },
          {
            path: "view-biodata",
            element: <ViewBiodata></ViewBiodata>
          },
          {
            path: "my-contact-request",
            element: <MyContactRequest></MyContactRequest>
          },
          {
            path: "favourites",
            element: <MyFavourites></MyFavourites>
          },
          {
            path: "admin",
            element: <AdminDashboard></AdminDashboard>
          },
          {
            path: "success-stories",
            element: <AdminSuccessStories />
          },
          {
            path: "/dashboard/successStoryTable",
            element: <AdminSuccessStoryTable></AdminSuccessStoryTable>
          },
          {
            path: "manage-users",
            element: <ManageUsers></ManageUsers>
          },
          {
            path: "approved-premium",
            element: <ApprovedPremium></ApprovedPremium>
          },
          {
            path: "approved-contact-request",
            element: <ApprovedContactRequest></ApprovedContactRequest>
          },

        ]


      },




      {
        path: "biodatas",
        Component: Biodatas,
      },








    ],
  },
]);
