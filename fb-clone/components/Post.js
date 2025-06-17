// components/Post.js
import React from "react";
import {
  ChatBubbleBottomCenterIcon,
  ShareIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";

const Post = ({ name, message, image, postImage, email, timestamp }) => {
  return (
    <div className="flex flex-col">
      <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-sm">
        <div className="flex items-center space-x-2">
          <img
            src={image}
            alt={name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-xs text-gray-400">
              {new Date(timestamp?.toDate()).toLocaleString()}
            </p>
          </div>
        </div>
        <p className="pt-4">{message}</p>
      </div>
      {postImage && (
        <div className="relative h-56 md:h-96 bg-white ">
          <img
            src={postImage}
            alt="Post"
            objectFit="cover"
            layout="fill"
          />
        </div>
      )}
      {/* Footer of the Post */}
      <div className="flex items-center justify-around text-gray-400  pt-2 rounded-b-2xl shadow-md bg-white">
        <div className="inputIcon rounded-none hover:text-blue-500 cursor-pointer rounded-b-2xl">
          <HandThumbUpIcon className="h-4" />
          <p className="text-xs sm:text-base">Like</p>
        </div>
        <div className="inputIcon rounded-none hover:text-blue-500 cursor-pointer rounded-b-2xl">
          <ChatBubbleBottomCenterIcon className="h-4" />
          <p className="text-xs sm:text-base">Comment</p>
        </div>
        <div className="inputIcon rounded-none hover:text-blue-500 cursor-pointer rounded-b-2xl">
          <ShareIcon className="h-4" />
          <p className="text-xs sm:text-base">Share</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
