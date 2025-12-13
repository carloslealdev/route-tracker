import { testUser } from "../../fixtures/testUser";
import { reverseCoordinates } from "../../helpers/reverseCoordinates";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useRoutegramStore } from "../../hooks/useRoutegramStore";
import { useUiStore } from "../../hooks/useUiStore";

export const ActionsBar = () => {
  const {
    startLoadingMyRoutegrams,
    removeLastPoint,
    draftPoints,
    startSavingRoutegram,
  } = useRoutegramStore();
  const { startLogin, user } = useAuthStore();
  const { typeRoutegramToEdit, closeRoutegramModal } = useUiStore();

  const handleUndoLastLine = () => {
    removeLastPoint();
  };

  const handleSaveRoute = async () => {
    const coordinates = reverseCoordinates(draftPoints);
    const dataToSave = {
      type: "LineString",
      typeRoute: typeRoutegramToEdit,
      coordinates: coordinates,
    };

    // console.log(dataToSave);

    await startSavingRoutegram(dataToSave);
    closeRoutegramModal();
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
