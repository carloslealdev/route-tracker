import { NavBar } from "../components/NavBar";
import { ActionsBar } from "../components/ActionsBar";
import { MapCasaTrabajo } from "../components/MapCasaTrabajo";
import { MapTrabajoCasa } from "../components/MapTrabajoCasa";
import { RoutegramModal } from "../components/RoutegramModal";
import { useEffect, useState } from "react";
import { useRoutegramStore } from "../../hooks/useRoutegramStore";
import { SideBar } from "../components/SideBar";

export const DashboardWorker = () => {
  const { startLoadingMyRoutegrams } = useRoutegramStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    startLoadingMyRoutegrams();
  }, []);

  return (
    <>
      <NavBar open={open} setOpen={setOpen} />
      {/* <SideBar open={open} setOpen={setOpen} /> */}

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
