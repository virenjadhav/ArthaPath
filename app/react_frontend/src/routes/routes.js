// src/routes.js
import React from "react";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import Transactions from "../pages/transaction/Transactions";
import Dashboard from "../pages/Dashboard";
import Finance from "../pages/Finance/Finance";
import PageNotFound from "../pages/PageNotFound";
import ProtectedRoute from "./ProtectedRoute";
import profileRoutes from "./profileRoutes"; // Import profile routes
import Budgets from "../pages/budgets/Budgets";
const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/transactions",
    element: (
      <ProtectedRoute>
        <Transactions />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  // {
  //   path: "/profile",
  //   element: (
  //     <ProtectedRoute>
  //       <Profile />
  //     </ProtectedRoute>
  //   ),
  //   children: [
  //     {
  //       path: "categories",
  //       element: <div>Categories Component</div>, // Import component as needed
  //     },
  //     {
  //       path: "categories/custom_categories",
  //       element: <div>Custom Categories Component</div>, // Import component as needed
  //     },
  //   ],
  // },
  profileRoutes,
  // {
  //   path: "/finance",
  //   element: (
  //     <ProtectedRoute>
  //       <Finance />
  //     </ProtectedRoute>
  //   ),
  // },
  {
    path: "/finance/*",
    element: (
      <ProtectedRoute>
        <Finance />
      </ProtectedRoute>
    ),
    // children: [
    //   { path: "transaction", element: <Finance /> },
    //   { path: "budget", element: <Finance /> },
    // ],
  },
  {
    path: "*",
    element: (
      <ProtectedRoute>
        <PageNotFound />
      </ProtectedRoute>
    ),
  },
];

export default routes;
