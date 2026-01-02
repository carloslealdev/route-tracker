import React from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useRoutegramStore } from "../../hooks/useRoutegramStore";

export const DashboardAdmin = () => {
  const { startLogout } = useAuthStore();
  const { resetLoadedRoutegrams } = useRoutegramStore();

  const handleLogout = () => {
    startLogout();
    resetLoadedRoutegrams();
  };
  return (
    <>
      <div>DashboardAdmin</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};
