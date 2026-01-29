import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { DashboardAdmin } from "../dashboards/pages/DashboardAdmin";
import { DashboardWorker } from "../dashboards/pages/DashboardWorker";
import { useAuthStore } from "../hooks/useAuthStore";
import { useEffect } from "react";

export const AppRouter = () => {
  const { checkAuthToken, status, user } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <h1>Cargando...</h1>;
  }

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" replace />} />
        </>
      ) : user.role === "Admin" ? (
        <>
          <Route path="*" element={<DashboardAdmin />} />
        </>
      ) : (
        <>
          <Route path="/dashboard/*" element={<DashboardWorker />} />
          <Route path="/*" element={<Navigate to="/dashboard" replace />} />
        </>
      )}
    </Routes>
  );
};
