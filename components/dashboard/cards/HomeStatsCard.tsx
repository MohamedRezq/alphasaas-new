import React from "react";
//-----> Components <-----------------------------------------//
import Dropdown from "rc-dropdown";
import { BsThreeDots } from "react-icons/bs";
import ChartMenu from "@/components/menus/ChartMenu";
import Skeleton from "react-loading-skeleton";
//----------------------------------------------------------------------------------//
//-----> END OF IMPORTS <-------------------------------------//
//----------------------------------------------------------------------------------//
type HomeStatsCardProps = {
  title: string;
  value: number;
  valueType: string;
  subValues: {
    subValue: number;
    subValueState: string;
    subTitle: string;
  }[];
};
//----------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------//
const HomeStatsCard = (props: HomeStatsCardProps) => {
  const valueTypesToStyles = new Map([
    ["stats", ""],
    ["value", "text-emperor"],
  ]);
  const subValueStatesToStyles = new Map([
    ["positive", "text-chateaugreen"],
    ["negative", "text-sunsetorange"],
    ["normal", "text-grayish"],
  ]);
  //----------------------------------------------------------------------------------//
  //----------------------------------------------------------------------------------//
  return (
    <div
      style={{ boxShadow: "0px 3px 5px #00000029" }}
      className="rounded-2xl w-[285px] lg:w-full h-full flex bg-wildsand p-1 text-mineshaft dark:bg-darkMineShaft dark:text-white"
    >
      <div className="w-1/2 flex flex-col items-start justify-center my-auto h-20 gap-y-1 pl-4">
        <div className="text-[10px] font-bold">{props.title}</div>
        <div
          className={`text-3xl ${valueTypesToStyles.get(
            props?.valueType ?? ""
          )} font-bold opacity-80 dark:text-white`}
        >
          {props.value || <Skeleton />}
        </div>
      </div>
      {props.subValues ? (
        <>
          <div className="bg-white dark:bg-midMineShaft font-bold relative flex flex-col gap-y-1 pl-3 items-start justify-center w-1/2 rounded-tr-2xl rounded-br-2xl text-[11px]">
            {props.subValues.map(
              (
                item: {
                  subValue: number;
                  subValueState: string;
                  subTitle: string;
                },
                i: number
              ) => (
                <div
                  key={`${item.subTitle}-${item.subValue}-${i}`}
                  className="flex items-center gap-x-2"
                >
                  <div
                    className={`w-5 ${subValueStatesToStyles.get(
                      item.subValueState
                    )} font-bold text-[11px]`}
                  >
                    {item.subTitle == "Per user spend"
                      ? `$${Math.round(item.subValue)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                      : Math.round(item.subValue)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
                  <div>{item.subTitle}</div>
                </div>
              )
            )}
            <Dropdown
              placement="bottomRight"
              trigger={["click"]}
              overlay={ChartMenu}
              animation="slide-up"
            >
              <BsThreeDots className="absolute right-3 top-2 text-dovegray cursor-pointer text-sm" />
            </Dropdown>
          </div>
        </>
      ) : (
        <Skeleton
          containerClassName="bg-white dark:bg-midMineShaft font-bold relative flex flex-col gap-y-1 pl-3 items-start justify-center w-1/2 rounded-tr-2xl rounded-br-2xl text-[11px]"
          count={3}
        />
      )}
    </div>
  );
};

export default HomeStatsCard;
