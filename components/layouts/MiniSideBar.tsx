import React from "react";
//-----> Components <-----------------------------------------//
import { IoSettingsSharp } from "react-icons/io5";
import { TbAlpha } from "react-icons/tb";
import sidebar from "@/public/constants/sidebar.json";
//-----> Redux <----------------------------------------------//
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "@/store/slices/sidebar";
import { RootState } from "@/store";
import Link from "next/link";
import { setDisplayMiniSidebar } from "@/store/slices/dashboard";
import { Tooltip } from "@/components/shared";
//----------------------------------------------------------------------------------//
//-----> END OF IMPORTS <-------------------------------------//
//----------------------------------------------------------------------------------//

const MiniSideBar = () => {
  //----------------------------------------------------------------------------------//
  const { activeTab } = useSelector((state: RootState) => state.sidebar);
  const dispatch = useDispatch();
  //----------------------------------------------------------------------------------//
  return (
    <div className="w-[57px] flex h-[450px] mr-[28px] ml-[34px] lg:mt-[90px] flex-col py-10 justify-between rounded-[48px] bg-hippiegreen dark:bg-darkMineShaft text-white">
      <div
        onClick={() => {
          dispatch(setDisplayMiniSidebar(false));
        }}
        className={`px-4 my-1 py-2 flex justify-center mb-5 cursor-pointer text-white rounded-xl items-center gap-x-5 hover:bg-opacity-80`}
      >
        <TbAlpha />
      </div>

      {sidebar.tabs.map((tab, i) => (
        <div
          key={`${tab.title}-${i}`}
          onClick={() => dispatch(setActiveTab(tab.title))}
        >
          <Link
            href={tab.link}
            className={`flex justify-center my-1 py-2 cursor-pointer ${
              tab.title == activeTab ? "text-hippiegreen" : "text-white"
            } rounded-xl flex items-center gap-x-5 hover:bg-opacity-80`}
          >
            <Tooltip
              element={
                typeof tab.icon == "string" ? (
                  <img src={tab.icon} alt={tab.title} className="w-4 h-4" />
                ) : (
                  tab.icon
                )
              }
              text={tab.title}
            />
          </Link>
        </div>
      ))}
      <div>
        <Link
          onClick={() => dispatch(setActiveTab("Settings"))}
          href={"/dashboard/settings"}
          className={`px-4 flex justify-center mt-3 my-1 py-2 cursor-pointer text-white rounded-xl items-center gap-x-5 hover:bg-opacity-80`}
        >
          <Tooltip element={<IoSettingsSharp />} text={"Settings"} />
        </Link>
      </div>
    </div>
  );
};

export default MiniSideBar;
