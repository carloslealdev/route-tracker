import React from "react";
import { useUiStore } from "../../hooks/useUiStore";

export const NoRoutegramAvailable = ({ typeRoutegram }) => {
  const { openRoutegramModal } = useUiStore();

  const handleClick = () => {
    openRoutegramModal(typeRoutegram);
  };
  return (
    <>
      <div className="no-map-available-container">
        <h2>No posee un Rutagrama de este tipo</h2>

        <button onClick={handleClick} className="btn-new-routegram">
          New Routegram
        </button>
      </div>
    </>
  );
};
