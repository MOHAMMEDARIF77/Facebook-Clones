import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  EllipsisHorizontalIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";

const contacts = [
  { src: "https://links.papareact.com/ZvY", name: "Jeff Bezoz" },
  { src: "https://links.papareact.com/kxk", name: "Elon Musk" },
  { src: "https://links.papareact.com/zvy", name: "Bill Gates" },
  { src: "https://links.papareact.com/snf", name: "Mark Zuckerberg" },
  { src: "https://links.papareact.com/d0c", name: "Harry Potter" },
  { src: "https://links.papareact.com/6gg", name: "The Queen" },
  { src: "https://links.papareact.com/r57", name: "James Bond" },
];

function Widgets() {
  return (
    <div className="hidden lg:flex flex-col w-64 p-2 mt-5">
      {/* Header */}
      <div className="flex justify-between items-center text-gray-500 mb-4 px-2">
        <h2 className="text-lg font-semibold">Contacts</h2>
        <div className="flex space-x-2">
          <VideoCameraIcon className="h-6 w-6 cursor-pointer hover:text-blue-500" />
          <MagnifyingGlassIcon className="h-6 w-6 cursor-pointer hover:text-blue-500" />
          <EllipsisHorizontalIcon className="h-6 w-6 cursor-pointer hover:text-blue-500" />
        </div>
      </div>

      {/* Contact list */}
      <div className="space-y-2 px-2">
        {contacts.map((contact, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 hover:bg-gray-200 p-2 rounded-xl cursor-pointer transition duration-200"
          >
            <div className="relative">
              <img
                src={contact.src}
                alt={contact.name}
                className="w-10 h-10 rounded-full object-cover border-black-2"
              />
              {/* Online status dot */}
              <div className="absolute bottom-0 right-0 bg-green-400 h-3 w-3 rounded-full border-2 border-white" />
            </div>
            <p className="text-sm font-medium text-gray-700">{contact.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Widgets;
