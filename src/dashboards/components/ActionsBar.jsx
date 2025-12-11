import { testUser } from "../../fixtures/testUser";
import { reverseCoordinates } from "../../helpers/reverseCoordinates";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useRoutegramStore } from "../../hooks/useRoutegramStore";

export const ActionsBar = () => {
  const { startLoadingMyRoutegrams } = useRoutegramStore();
  const { startLogin } = useAuthStore();

  const handleUndoLastLine = () => {
    setRoute((prevRoute) => prevRoute.slice(0, -1));
  };

  const handleSaveRoute = () => {
    const dataToSave = {
      user: "Carlos",
      date: new Date().toISOString(),
      routegram: reverseCoordinates(route),
    };

    console.log(dataToSave);
  };
  return (
    <footer className="action-footer">
      <div className="actions-container">
        <button className="btn-action" onClick={handleUndoLastLine}>
          Undo Last Line
        </button>
        <button className="btn-action" onClick={handleSaveRoute}>
          Save Route
        </button>
        <button className="btn-action" onClick={() => startLogin(testUser)}>
          Login
        </button>
        <button
          className="btn-action"
          onClick={() => startLoadingMyRoutegrams()}
        >
          My Routegrams
        </button>
      </div>
    </footer>
  );
};
