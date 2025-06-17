import { useSession } from "next-auth/react";
import React from "react";
import SideBarRow from "./SideBarRow";
import {
  ChevronDownIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  CalendarIcon,
  ClockIcon,
  ComputerDesktopIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const SideBar = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <div className="p-2 mt-5 max-w-[600px] xl:min-w-[300px]">
      {session && (
        <SideBarRow src={session.user?.image} title={session.user?.name} />
      )}

      <SideBarRow Icon={UserIcon} title="Friends" />
      <SideBarRow Icon={UserGroupIcon} title="Groups" />
      <SideBarRow Icon={ShoppingBagIcon} title="MarketPlace" />
      <SideBarRow Icon={ComputerDesktopIcon} title="Watch" />
      <SideBarRow Icon={CalendarIcon} title="Events" />
      <SideBarRow Icon={ClockIcon} title="Memories" />
      <SideBarRow Icon={ChevronDownIcon} title="See More" />
    </div>
  );
};

export default SideBar;
