import Image from "next/image";
import React from "react";

const StoryCard = ({ name, src, profile }) => {
  return (
    <div className="relative h-14 w-14 md:h-20 md:w-20 lg:h-56 lg:w-32 cursor-pointer items-center justify-center overflow-x p-3 transition duration-200 transform ease-in hover:scale-105 hover:animate-pulse">
      {/* Profile Picture */}
      <Image
        className="absolute opacity-0 lg:opacity-100  z-50 top-10 rounded-full h-12 w-12"
        //  border-white shadow-md h-12 w-12
        src={profile}
        width={40}
        height={40}
        // alt={name}
        layout="fixed"
        objectFit="cover"
      />

      {/* Background Story Image */}
      <Image
        className="object-cover filter brightness-75 rounded-full lg:rounded-3xl"
        src={src}
        fill
        alt={name}
        layout="fill"
      />
      {/* <P className="absolute opacity-0 lg:opacity-100 bottom-4 w-5/6 text-white text-sm font-bold truncate">{name}</P> */}
    </div>
  );
};

export default StoryCard;
