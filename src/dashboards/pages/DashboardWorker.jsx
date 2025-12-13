import { NavBar } from "../components/NavBar";
import { ActionsBar } from "../components/ActionsBar";
import { MapCasaTrabajo } from "../components/MapCasaTrabajo";
import { MapTrabajoCasa } from "../components/MapTrabajoCasa";
import { RoutegramModal } from "../components/RoutegramModal";

export const DashboardWorker = () => {
  return (
    <>
      <NavBar />

      <section className="body-container">
        <div className="maps-container">
          <MapCasaTrabajo />
          <MapTrabajoCasa />
        </div>
      </section>

      <ActionsBar />
      <RoutegramModal />
    </>
  );
};
