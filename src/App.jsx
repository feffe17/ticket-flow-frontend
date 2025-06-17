import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPassword from "./pages/ResetPassword";
import LoginPage from "./pages/LoginPage";
import OpenTicket from "./pages/OpenTicket";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/open-ticket" element={<OpenTicket />} />
          </Route>
        </Routes>
        <Routes>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
