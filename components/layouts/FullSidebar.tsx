"use client";
import React from "react";
//-----> Components <-----------------------------------------//
import { IoSettingsSharp } from "react-icons/io5";
import SidebarItem from "./SidebarItem";
//-----> Redux <----------------------------------------------//
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "@/store/slices/sidebar";
import { RootState } from "@/store";
import { setDisplayMiniSidebar } from "@/store/slices/dashboard";
import sidebar from "@/public/constants/sidebar.json";
//----------------------------------------------------------------------------------//
//-----> END OF IMPORTS <-------------------------------------//
//----------------------------------------------------------------------------------//

const FullSidebar = () => {
  //----------------------------------------------------------------------------------//
  const displayMiniSidebar = sessionStorage.getItem("extended_view")
    ? true
    : false;
  //----------------------------------------------------------------------------------//
  const { activeTab } = useSelector((state: RootState) => state.sidebar);
  const dispatch = useDispatch();
  //----------------------------------------------------------------------------------//
  return (
    <div
      className={`w-full ${
        displayMiniSidebar && "none"
      } lg:w-[240px] h-full dark:bg-darkMineShaft lg:h-[95vh] lg:flex mr-5 flex-col px-5 py-10 justify-between lg:rounded-2xl bg-hippiegreen text-white`}
    >
      <div>
        <div
          onClick={() => {
            dispatch(setDisplayMiniSidebar(true));
          }}
          className="mb-16 cursor-pointer font-quicksandLogo text-[30px] font-bold text-center"
        >
          {sidebar.short_name}
        </div>

        {sidebar.tabs.map((tab, i) => (
          <div
            key={`${tab.title}-${i}`}
            onClick={() => dispatch(setActiveTab(tab.title))}
          >
            <SidebarItem
              title={tab.title}
              active={tab.title == activeTab ? true : false}
              icon={tab.icon}
              link={tab.link}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        <SidebarItem
          title="Settings"
          active={false}
          icon={<IoSettingsSharp />}
          link="/dashboard"
        />
        <div className="text-[10px] opacity-50 font-light mx-12 pl-1">
          Version {sidebar.version}
        </div>
      </div>
    </div>
  );
};

export default FullSidebar;
