import React, { useEffect } from "react";
import { SideBar } from "../components/SideBar";
import { NavBar } from "../components/NavBar";
import { useAdminStore } from "../../hooks/useAdminStore";

export const DashboardAdmin = () => {
  const { startLoadingUsers, isLoading } = useAdminStore();

  useEffect(() => {
    startLoadingUsers();
  }, []);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <NavBar />
      <SideBar />
    </>
  );
};
