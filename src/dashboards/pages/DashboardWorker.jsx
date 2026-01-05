import { NavBar } from "../components/NavBar";
import { ActionsBar } from "../components/ActionsBar";
import { MapCasaTrabajo } from "../components/MapCasaTrabajo";
import { MapTrabajoCasa } from "../components/MapTrabajoCasa";
import { RoutegramModal } from "../components/RoutegramModal";
import { useEffect } from "react";
import { useRoutegramStore } from "../../hooks/useRoutegramStore";

export const DashboardWorker = () => {
  const { startLoadingMyRoutegrams } = useRoutegramStore();

  useEffect(() => {
    startLoadingMyRoutegrams();
  }, []);

  return (
    <>
      <NavBar />

      <section className="body-container">
        <div className="maps-container">
          <MapCasaTrabajo />
          <MapTrabajoCasa />
        </div>
      </section>

      {/* <ActionsBar /> */}
      <RoutegramModal />
    </>
  );
};
