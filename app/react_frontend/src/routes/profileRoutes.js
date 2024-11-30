import React from "react";
import ProtectedRoute from "./ProtectedRoute";

// Import Profile-related components
import Profile from "../pages/profile/Profile";
import Categories from "../pages/profile/Categories";
import CustomCategories from "../pages/profile/CustomCategory";
import UserCategories from "../pages/profile/UserCategory";
import ProfileInfo from "../pages/profile/GeneralProfile";
import ChangePassword from "../pages/profile/ChangePassword";
import CommonCategories from "../pages/profile/CommonCategories";
import Accounts from "../pages/accounts/Accounts";
import Banks from "../pages/accounts/Banks";

const profileRoutes = {
  path: "/profile",
  element: (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  ),
  children: [
    {
      path: "categories",
      element: <Categories />,
      children: [
        { index: true, element: <div>Select a category tab.</div> }, // Default content
        { path: "user_categories", element: <UserCategories /> }, // Ensure path matches exactly
        { path: "common_categories", element: <CommonCategories /> },
        { path: "custom_categories", element: <CustomCategories /> },
      ],
    },
    { path: "info", element: <ProfileInfo /> },
    { path: "change_password", element: <ChangePassword /> },
    { path: "accounts", element: <Accounts /> },
    { path: "banks", element: <Banks /> },
  ],
};

export default profileRoutes;
