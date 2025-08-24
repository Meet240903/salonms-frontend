import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import CustomerLayout from "./layouts/CustomerLayout";
import Dashboard from "./pages/Admin/Dashboard";
import BookAppointment from "./pages/Customer/BookAppointment";
import Login from "./pages/Auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageAppointments from "./pages/Admin/ManageAppointments";
import StaffManagement from "./pages/Admin/StaffManagement";
import ServiceManagement from "./pages/Admin/ServiceManagement";
import MyAppointments from "./pages/Customer/MyAppointments";
import Profile from "./pages/Customer/Profile";
import Services from "./pages/Customer/Services";
import Home from "./pages/Customer/Home";
import Register from "./pages/Customer/Registration";
import CustomerList from "./pages/Admin/CustomerList";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="appointments" element={<ManageAppointments />} />
          <Route path="staff" element={<StaffManagement />} />
          <Route path="customers" element={<CustomerList />} />
          <Route path="services" element={<ServiceManagement />} />
        </Route>

        {/* Customer Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute role="customer">
              <CustomerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="book-appointment" element={<BookAppointment />} />
          <Route path="my-appointments" element={<MyAppointments />} />
          <Route path="profile" element={<Profile />} />
          <Route path="services" element={<Services />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;