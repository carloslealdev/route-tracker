import Modal from "react-modal";
import { useUiStore } from "../../hooks/useUiStore";
import { Map } from "./Map";
import { ActionsBar } from "./ActionsBar";
import { useRoutegramStore } from "../../hooks/useRoutegramStore";
import { MapTestRoutingMachine } from "./MapTestRoutingMachine";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const RoutegramModal = () => {
  const { isRoutegramModalOpen, closeRoutegramModal, typeRoutegramToEdit } =
    useUiStore();

  const { resetActiveRoutegram, clearDraftPoints } = useRoutegramStore();

  const onCloseRoutegramModal = () => {
    closeRoutegramModal();
    resetActiveRoutegram();
    clearDraftPoints();
  };

  return (
    <Modal
      isOpen={isRoutegramModalOpen}
      onRequestClose={onCloseRoutegramModal}
      style={customStyles}
      //   className="modal"
    >
      <h2 style={{ color: "black" }}>{typeRoutegramToEdit}</h2>
      <Map />
      <ActionsBar />

      {/* TEST DE INTEGRACION CON ROUTING MACHINE */}
      {/* <MapTestRoutingMachine /> */}
    </Modal>
  );
};
