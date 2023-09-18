"use client";
import React, { useEffect } from "react";
import Image from "next/image";
//-----> Actions <----------------------------------------------//
//-----> Utils <----------------------------------------------//
import { dateFormatter } from "@/utils/dateFormatter";
//-----> Components <----------------------------------------------//
import Dropdown from "rc-dropdown";
//-----> Assets <----------------------------------------------//
import monthIcon from "@/public/assets/img/icons/month.svg";
import dropDown from "@/public/assets/img/icons/arrow-down-sign-to-navigate.svg";
import { DashboardHeader } from "@/components/layouts";
import CustomDropMenu from "@/components/menus/CustomDropMenu";
import StatsCard from "@/components/dashboard/cards/HomeStatsCard";
import { roundNumbers } from "@/utils/roundNumbers";
import HomeCard from "@/components/dashboard/cards/HomeCard";
import LineChart from "@/components/dashboard/charts/LineChart";
import PieChart from "@/components/dashboard/charts/PieChart";
import { fetchDataPost } from "@/utils/fetchData";
import ColChart from "@/components/dashboard/charts/ColChart";
//----------------------------------------------------------------------------------//
//-----> END OF IMPORTS <-------------------------------------//
//----------------------------------------------------------------------------------//
const Home = () => {
  //-------------------------------------------------------------------------//
  const INTERVALS = ["Month", "Quarter", "Year"];
  //-------------------------------------------------------------------------//
  const date = dateFormatter();
  let interval: any, user: any;
  useEffect(() => {
    interval = sessionStorage.getItem("main_interval") ?? INTERVALS[0];
    let logged_user = sessionStorage.getItem("user");
    user = logged_user ? JSON.parse(logged_user) : null;
  }, []);

  //-------------------------------------------------------------------------//
  let data: any = [];
  const requests = [
    {
      url: `dashboard/home/get-home-stats`,
      params: { interval: 0 },
    },
    {
      url: `dashboard/home/get-home-chart-1`,
      params: { interval: 0 },
    },
    {
      url: `dashboard/home/get-home-chart-2`,
      params: { interval: 0 },
    },
    {
      url: `dashboard/home/get-home-chart-3`,
      params: { interval: 0 },
    },
  ];
  requests.forEach(async (req: { url: string; params: object }) => {
    await fetchDataPost(req.url, req.params).then((apiData) => {
      if (apiData !== undefined) data = [...data, apiData];
      else data = [...data, null];
    });
  });
  //-------------------------------------------------------------------------//
  return (
    <>
      <DashboardHeader
        headerTitle={`Good ${
          new Date().getHours() >= 12 ? "Evening" : "Morning"
        }, ${user?.info?.firstName || ""}!`}
        date={date}
      />
      <div className="flex flex-col gap-y-5 w-full">
        <div className="flex justify-between">
          <div className="flex w-44 justify-around items-center gap-x-2 text-sm bg-bonjour rounded-[15px] px-5 py-2 text-mineshaft dark:text-white pr-6">
            <Image src={monthIcon} alt="calendar" />
            <div className="text-center font-medium text-sm w-40 text-mineshaft">
              {interval}
            </div>
            <Dropdown
              trigger={["click"]}
              overlay={
                <CustomDropMenu
                  selectedOption={interval}
                  options={INTERVALS}
                  setterFunction={(key: string) =>
                    sessionStorage.setItem("main_interval", key)
                  }
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
          {/* <div
            onClick={() => {
              const appIds = user?.info?.applications?.map(
                (app: any) => app.application_id
              );
              syncUserData(appIds);
            }}
            className=" cursor-pointer hover:underline"
          >
            Sync
          </div> */}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {data?.at(0)?.map((item: any, i: number) => (
            <StatsCard
              key={`${item?.title}-${item?.value}-${i}`}
              title={item?.title}
              value={
                i === 2
                  ? item?.value >= 1000
                    ? `$${roundNumbers(item?.value)}`
                    : `$${item?.value}`
                  : item?.value
              }
              valueType={item?.valueType}
              subValues={item?.subValues}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-3">
          <div className="lg:col-span-2">
            <HomeCard
              title="Spend Summary by department"
              subTitle="Total Spend"
              value={data?.at(1)?.value || 0}
              subValues={data?.at(1)?.subValues || 0}
              chart={
                <LineChart
                  chartSeries={data?.at(1)?.chartSeries}
                  xData={data?.at(1)?.xData}
                />
              }
            />
          </div>
          <div className="lg:col-span-1">
            <HomeCard
              title="Top 4 Apps by Spend"
              subTitle="Total Spend"
              value={data?.at(2)?.value || 0}
              subValues={data?.at(2)?.subValues || 0}
              chart={
                <PieChart
                  chartSeries={data?.at(2)?.chartSeries}
                  xData={data?.at(2)?.xData}
                />
              }
            />
          </div>
          <div className="lg:col-span-2">
            <HomeCard
              title="License Summary"
              subTitle="Total Wasted Value"
              value={data?.at(3)?.value || 0}
              subValues={data?.at(3)?.subValues || 0}
              chart={
                <ColChart
                  chartSeries={data?.at(3)?.chartSeries}
                  xData={data?.at(3)?.xData}
                />
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
