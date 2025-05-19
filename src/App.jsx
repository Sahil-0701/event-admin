import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AdminLayout from "./layout/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import AllEvents from "./pages/AllEvents";
import AddEvents from "./pages/AddEvents";
import EditEvent from "./pages/EditEvent";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContent = () => {
  const location = useLocation();
  const isAuthRoute =
    location.pathname === "/signin" || location.pathname === "/signup";
  const { token } = useContext(AuthContext);

  if (isAuthRoute && token) {
    return <Navigate to="/" replace />;
  }

  
  return (
    <>
      <Routes>
        {isAuthRoute ? (
          <>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/signin" replace />} />
          </>
        ) : (
          <Route element={<AdminLayout />}>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/all-events"
              element={
                <ProtectedRoute>
                  <AllEvents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-events"
              element={
                <ProtectedRoute>
                  <AddEvents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-event/:id"
              element={
                <ProtectedRoute>
                  <EditEvent />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </Routes>
    </>
  );
};

const App = () => (
  <>
    <Router>
      <AppContent />
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  </>
);

export default App;
