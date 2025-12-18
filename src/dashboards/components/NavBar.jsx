import { useAuthStore } from "../../hooks/useAuthStore";

export const NavBar = () => {
  const { user } = useAuthStore();
  return (
    <header className="nav-bar">
      <div className="nav-bar-container">
        <h2>RoutegramApp</h2>
        <div className="nav-bar-info">
          <h3>{user.name}</h3>
          <button className="btn-logout">Logout</button>
        </div>
      </div>
    </header>
  );
};
