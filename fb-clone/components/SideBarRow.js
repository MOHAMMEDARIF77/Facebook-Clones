import React from 'react';
import Image from 'next/image';

const SideBarRow = ({ src, Icon, title }) => {
  return (
    <div className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-xl cursor-pointer">
      {src && (
        <Image
          className="rounded-full"
          src={src}
          width={30}
          height={30}
          alt="Profile"
        />
      )}
      {Icon && <Icon className="h-8 w-8 text-blue-500" />}
      <p className="hidden sm:inline-flex font-medium">{title}</p>
    </div>
  );
};

export default SideBarRow;
