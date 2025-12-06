import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { DashboardAdmin } from "../dashboards/pages/DashboardAdmin";
import { DashboardWorker } from "../dashboards/pages/DashboardWorker";

export const AppRouter = () => {
  const status = "authenticated"; //"not-authenticated"
  const role = "worker"; //"worker"
  return (
    <Routes>
      {status !== "authenticated" ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" replace />} />
        </>
      ) : role === "admin" ? (
        <>
          <Route path="/dashboard/*" element={<DashboardAdmin />} />
          <Route path="/*" element={<Navigate to="/dashboard" replace />} />
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
