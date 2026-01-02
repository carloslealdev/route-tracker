import { useAuthStore } from "../../hooks/useAuthStore";
import { useRoutegramStore } from "../../hooks/useRoutegramStore";

export const NavBar = () => {
  const { user, startLogout } = useAuthStore();
  const { resetLoadedRoutegrams } = useRoutegramStore();

  const handleLogout = () => {
    startLogout();
    resetLoadedRoutegrams();
  };
  return (
    <header className="nav-bar">
      <div className="nav-bar-container">
        <h2>RoutegramApp</h2>
        <div className="nav-bar-info">
          <h3>{user.name}</h3>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};
