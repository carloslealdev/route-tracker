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
    activeRoute,
    startUpdatingRoutegram,
  } = useRoutegramStore();
  const { startLogin, user } = useAuthStore();
  const { typeRoutegramToEdit, closeRoutegramModal } = useUiStore();

  const handleUndoLastLine = () => {
    removeLastPoint();
  };

  const handleSaveRoute = () => {
    const coordinates = reverseCoordinates(draftPoints);
    const dataToSave = {
      type: "LineString",
      typeRoute: typeRoutegramToEdit,
      coordinates: coordinates,
    };

    if (activeRoute && activeRoute._id) {
      startUpdatingRoutegram(activeRoute._id, dataToSave);
    } else {
      startSavingRoutegram(dataToSave);
    }

    // console.log(dataToSave);

    closeRoutegramModal();
  };

  return (
    <footer className="action-footer">
      <div className="actions-container">
        <button className="btn-action" onClick={handleUndoLastLine}>
          Deshacer
        </button>
        <button className="btn-action" onClick={handleSaveRoute}>
          Guardar Rutagrama
        </button>
        {/* <button className="btn-action" onClick={() => startLogin(testUser)}>
          Login
        </button>
        <button
          className="btn-action"
          onClick={() => startLoadingMyRoutegrams()}
        >
          My Routegrams
        </button> */}
      </div>
    </footer>
  );
};
