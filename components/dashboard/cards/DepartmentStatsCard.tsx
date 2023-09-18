import React from "react";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
//-----> Components <----------------------------------------------//
import Dropdown from "rc-dropdown";
import { BsThreeDots } from "react-icons/bs";
//-----> Assets <----------------------------------------------//
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { Tooltip } from "@/components/shared";
import ChartMenu from "@/components/menus/ChartMenu";
//----------------------------------------------------------------------------------//
//-----> END OF IMPORTS <-------------------------------------//
//----------------------------------------------------------------------------------//

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
//----------------------------------------------------------------------------------//

const DepartmentStatsCard = (props: DepartmentStatsCardProps) => {
  //-------------------------------------------------------------------------//
  return (
    <div
      className="col-span-1 text-mineshaft dark:text-white rounded-2xl h-fit mb-5 font-semibold w-full"
      style={{ boxShadow: "0px 3px 5px #00000029" }}
    >
      <Link
        href={`/dashboard/department/details?department=${encodeURIComponent(
          props.title
        )}`}
        passHref
        className=" bg-gallery h-8 dark:bg-mineshaftLight dark:text-white flex items-center text-[10px] rounded-tr-2xl rounded-tl-2xl relative px-7 py-1"
      >
        {props.title || <Skeleton />}
        <Dropdown trigger={["click"]} overlay={ChartMenu} animation="slide-up">
          <BsThreeDots className="absolute right-5 top-2 text-dovegray cursor-pointer text-base" />
        </Dropdown>
      </Link>
      <div
        className={`h-fit  px-7 bg-wildsand dark:bg-darkMineShaft text-white flex flex-col justify-between gap-y-1 whitespace-nowrap py-5 rounded-br-2xl rounded-bl-2xl`}
      >
        <div className="flex text-mineshaft dark:text-white flex-col gap-y-1 text-[10px]">
          <div>Total Spend</div>
          <div className="flex gap-x-4 items-center">
            <div className="text-[20px] font-extrabold text-mineshaft opacity-90 dark:text-white  mt-1 mb-1">
              $
              {Math.round(props?.totalSpend || 0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
            {props.increasePercent ? (
              <div className="flex items-center mt-1 justify-center flex-col text-hippiegreen text-[6px]">
                <div className="text-[8px]">
                  {props.increasePercent > 0 ? (
                    <BiSolidUpArrow />
                  ) : (
                    <BiSolidDownArrow />
                  )}
                </div>
                <div>{props.increasePercent || 0} %</div>
              </div>
            ) : (
              <Skeleton />
            )}
          </div>
          <div className="mt-2">{props?.apps?.length || 0} apps</div>
          <div className=" flex gap-2 flex-wrap">
            {props?.apps?.map((app: AppInfoType, i: number) => (
              <Tooltip
                key={`dept-card-info-${app?.title}-${i}`}
                element={
                  <Link
                    href={app?.url || "/"}
                    target="_blank"
                    className={`w-7 h-7 rounded-md flex justify-center items-center`}
                  >
                    <img
                      src={app.logo}
                      alt={app.title}
                      className="rounded-sm w-inherit h-inherit"
                    />
                  </Link>
                }
                text={app.title}
              />
            ))}
          </div>
          <div className="mt-3">{props?.users?.length || 0} users</div>
          {props?.users?.length > 25 ? (
            <div className="flex items-center -space-x-3">
              {props?.users
                ?.slice(0, 3)
                .map((user: UserInfoType, i: number) => (
                  <Tooltip
                    additionalClassNames={`z-${
                      (i + 1) * 10
                    }  bg-opacity-100 opacity-100`}
                    key={`dept-card-info-${user?.name}-${i}`}
                    element={
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="rounded-full h-7 w-7 border-2 border-white"
                      />
                    }
                    text={user.name}
                  />
                ))}
              <div className="text-[8px] bg-opacity-100 opacity-100 z-50 rounded-full border border-white h-6 w-6 flex items-center justify-center bg-hippiegreen text-white">
                25+
              </div>
            </div>
          ) : (
            <div className=" flex gap-1 flex-wrap">
              {props?.users?.map((user: UserInfoType, i: number) => (
                <Tooltip
                  key={`dept-card-info-${user?.name}-${i}`}
                  element={
                    <div className="flex gap-x-1 items-center">
                      <div className="rounded-full h-7 w-7 border border-cuttysark p-1">
                        <img src={user?.avatar} alt={user?.name} />
                      </div>
                    </div>
                  }
                  text={user.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentStatsCard;
