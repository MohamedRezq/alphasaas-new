import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";
import FullSidebar from "./FullSidebar";
import MiniSideBar from "./MiniSideBar";
//----------------------------------------------------------------------------------//
//-----> END OF IMPORTS <-------------------------------------//
//----------------------------------------------------------------------------------//
const Sidebar = () => {
  //----------------------------------------------------------------------------------//
  const displayMiniSidebar = sessionStorage.getItem("extended_view")
    ? true
    : false;
  //----------------------------------------------------------------------------------//
  return (
    <nav>
      <div
        className={`hidden ${!displayMiniSidebar && "lg:block"} w-64 h-full`}
      >
        <FullSidebar />
      </div>
      <div
        className={`hidden ${
          displayMiniSidebar && "lg:flex xl:items-center"
        } w-fit h-full`}
      >
        <MiniSideBar />
      </div>
    </nav>
  );
};

export default Sidebar;
