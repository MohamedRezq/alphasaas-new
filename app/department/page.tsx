"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
//-----> Actions <----------------------------------------------//
//-----> Utils <----------------------------------------------//
import { dateFormatter } from "@/utils/dateFormatter";
//-----> Redux <----------------------------------------------//
import { useSelector } from "react-redux";
import { RootState } from "@/store";
//-----> Components <----------------------------------------------//
import Dropdown from "rc-dropdown";
//-----> Assets <----------------------------------------------//
import monthIcon from "@/public/assets/img/icons/month.svg";
import dropDown from "@/public/assets/img/icons/arrow-down-sign-to-navigate.svg";
import { setHomeInterval } from "@/store/slices/dashboard";
import { DashboardHeader } from "@/components/layouts";
import CustomDropMenu from "@/components/menus/CustomDropMenu";
import PageLoading from "@/components/loaders/PageLoading";
import { fetchDataGet } from "@/utils/fetchData";
import { DepartmentStatsCard } from "@/components/dashboard/cards";
//----------------------------------------------------------------------------------//
//-----> END OF IMPORTS <-------------------------------------//
//----------------------------------------------------------------------------------//
type AppInfoType = {
  logo: string;
  title: string;
  url?: string;
};
type UserInfoType = {
  avatar: string;
  name: string;
};
type DepartmentStatsCardProps = {
  title: string;
  totalSpend: number;
  increasePercent: number;
  apps: AppInfoType[];
  users: UserInfoType[];
};
//-------------------------------------------------------------------------//
const DepartmentList = () => {
  //-------------------------------------------------------------------------//
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const homeInterval = useSelector(
    (state: RootState) => state.dashboard.home.mainInterval
  );
  const requests = [
    {
      url: `dashboard/department/get-department-info`,
      params: { interval: homeInterval },
    },
  ];
  //-------------------------------------------------------------------------//
  const date = dateFormatter();
  //-------------------------------------------------------------------------//
  setLoading(true);
  requests.forEach(async (req: { url: string }) => {
    await fetchDataGet(req.url).then((apiData) => {
      if (apiData !== undefined) setData([...data, apiData]);
      else setData([...data, null]);
    });
  });
  setLoading(false);

  //-------------------------------------------------------------------------//
  //-------------------------------------------------------------------------//
  return (
    <>
      <DashboardHeader
        headerTitle={`Good ${
          new Date().getHours() >= 12 ? "Evening" : "Morning"
        }, ${user.info.firstName}!`}
        date={date}
      />
      <div className="flex flex-col gap-y-5 w-full">
        <div className="flex w-44 justify-around items-center gap-x-2 text-sm bg-bonjour rounded-[15px] px-5 py-2 text-mineshaft dark:text-white pr-6">
          <Image src={monthIcon} alt="calendar" />
          <div className="text-center font-medium text-sm w-40 text-mineshaft">
            {homeInterval}
          </div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <CustomDropMenu
                options={["Month", "Quarter", "Year"]}
                selectedOption={homeInterval}
                setterFunction={setHomeInterval}
              />
            }
            animation="slide-up"
          >
            <Image
              src={dropDown}
              alt="Menu"
              className="w-[10px] h-[6px] cursor-pointer"
            />
          </Dropdown>
        </div>
        {loading ? (
          <PageLoading />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-3">
            {/* <DepartmentStatsCard /> */}
            {data[0].map((dept: DepartmentStatsCardProps) => (
              <DepartmentStatsCard
                key={`dept-stats-card-${dept.title}`}
                title={dept.title}
                totalSpend={dept.totalSpend}
                increasePercent={dept.increasePercent}
                apps={dept.apps}
                users={dept.users}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DepartmentList;
