// src/routes.js
import Dashboard from "./pages/Admin/Dashboard";
import ManageAppointments from "./pages/Admin/ManageAppointments";
import StaffManagement from "./pages/Admin/StaffManagement";
import ServiceManagement from "./pages/Admin/ServiceManagement";
import Inventory from "./pages/Admin/Inventory";
import Reports from "./pages/Admin/Reports";

import Home from "./pages/Customer/Home";
import BookAppointment from "./pages/Customer/BookAppointment";
import MyAppointments from "./pages/Customer/MyAppointments";
import Services from "./pages/Customer/Services";
import Profile from "./pages/Customer/Profile";

export const adminRoutes = [
  { path: "/admin/dashboard", element: <Dashboard /> },
  { path: "/admin/appointments", element: <ManageAppointments /> },
  { path: "/admin/staff", element: <StaffManagement /> },
  { path: "/admin/services", element: <ServiceManagement /> },
  { path: "/admin/inventory", element: <Inventory /> },
  { path: "/admin/reports", element: <Reports /> }
];

export const customerRoutes = [
  { path: "/", element: <Home /> },
  { path: "/book", element: <BookAppointment /> },
  { path: "/my-appointments", element: <MyAppointments /> },
  { path: "/services", element: <Services /> },
  { path: "/profile", element: <Profile /> }
];