import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AdminLayout from "./layout/AdminLayout";

import Dashboard from "./pages/Dashboard";
import AllEvents from "./pages/AllEvents";

import Orders from "./pages/Orders";
import AddEvents from "./pages/AddEvents";

const AppContent = () => {
  const location = useLocation();
  const isAuthRoute =
    location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <div >
      {isAuthRoute ? (
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      ) : (
        <Routes>
          <Route element={<AdminLayout />}>
           
            <Route path="/" element={<Dashboard />} />
            <Route path="/all-events" element={<AllEvents />} />
            <Route path="/add-events" element={<AddEvents />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
        </Routes>
      )}
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
