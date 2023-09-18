import React from "react";
//-----> Components <----------------------------------------------//
import Dropdown from "rc-dropdown";
import { BsThreeDots } from "react-icons/bs";
//-----> Assets <----------------------------------------------//
import { roundNumbers } from "@/utils/roundNumbers";
import ChartMenu from "@/components/menus/ChartMenu";
import Skeleton from "react-loading-skeleton";
//----------------------------------------------------------------------------------//
//-----> END OF IMPORTS <-------------------------------------//
//----------------------------------------------------------------------------------//
type HomeCardProps = {
  title: string;
  subTitle: string;
  value: number;
  subValues: {
    subTitle: string;
    subValue: number;
  }[];
  chart: React.ReactNode;
};
//----------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------//
const HomeCard = (props: HomeCardProps) => {
  return (
    <div
      className="col-span-2 rounded-2xl h-fit lg:h-[240px] mb-5 text-mineshaftDark font-semibold w-full"
      style={{ boxShadow: "0px 3px 5px #00000029" }}
    >
      <div className=" h-8 bg-gallery  dark:bg-mineshaftLight dark:text-white flex items-center text-[10px] rounded-tr-2xl rounded-tl-2xl relative px-7 py-1">
        {props.title || <Skeleton />}
        <Dropdown
          trigger={["click"]}
          overlay={ChartMenu}
          animation="slide-up"
          placement="bottomRight"
        >
          <BsThreeDots className="absolute right-5 top-2 text-dovegray cursor-pointer text-base" />
        </Dropdown>
      </div>
      <div
        className={`lg:h-[210px]  h-fit  pl-7 pr-3 gap-x-5 bg-wildsand dark:bg-darkMineShaft dark:text-white  flex flex-col md:flex-row gap-y-1 whitespace-nowrap pt-2 pb-3 rounded-br-2xl rounded-bl-2xl`}
      >
        <div className="flex flex-col mt-5 gap-y-1 text-[10px]">
          <div>{props.subTitle || <Skeleton />}</div>
          {props.value ? (
            <div className="text-[16px] font-extrabold text-mineshaft dark:text-white opacity-90 mt-1 mb-5">
              ${" "}
              {Math.round(props.value || 0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
          ) : (
            <Skeleton />
          )}
          {props.subValues ? (
            <>
              {props.subValues.map(
                (
                  item: {
                    subTitle: string;
                    subValue: number;
                  },
                  i: number
                ) => (
                  <div
                    key={`${item.subValue}-${i}`}
                    className="flex items-center gap-x-4 ml-1 text-[10px] font-medium"
                  >
                    <div className="font-bold w-7">
                      $ {roundNumbers(item?.subValue)}
                    </div>
                    <div className="text-grayish font-medium dark:text-white">
                      {item?.subTitle?.length > 15
                        ? `${item.subTitle.slice(0, 15)}...`
                        : item.subTitle}
                    </div>
                  </div>
                )
              )}
            </>
          ) : (
            <Skeleton count={3} />
          )}
        </div>
        <div className="dark:bg-midMineShaft h-full w-full py-1 px-2 rounded-[15px]">
          {props.chart || <Skeleton className="h-full" />}
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
