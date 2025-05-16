import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/adminLogin";
import AdminRegister from "./pages/adminRegister";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/register" element={<AdminRegister />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
