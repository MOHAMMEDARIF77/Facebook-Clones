import React from "react";
import clsx from "clsx"; // if using clsx

const HeaderIcon = ({ Icon, active }) => {
  return (
    <div className="flex items-center rounded-xl cursor-pointer  md:px-10 sm:h-14 md:hover:bg-gray-100 active:border-b-2 active:border-blue-500 group">
      {/* <Icon className={`h-5 group-hover:text-blue-500 text-center sm:h-7 mx-auto text-gray-500 ${active && 'text-blue-500'}`}/> */}
      <Icon
        className={clsx(
          "h-5 sm:h-7 mx-auto text-center group-hover:text-blue-500",
          active ? "text-blue-500" : "text-gray-500"
        )}
      />
    </div>
  );
};

export default HeaderIcon;
