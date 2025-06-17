import { useEffect, useState } from "react";
import { signOut as nextSignOut, useSession } from "next-auth/react";
import { auth, db } from "../firebase"; 
import Image from "next/image";
import {
  HomeIcon,
  UserGroupIcon,
  BellIcon,
  ChatBubbleLeftIcon,
  ChevronDownIcon,
  Squares2X2Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  FlagIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import HeaderIcon from "./HeaderIcon";

const signOutAll = async () => {
  try {
    await auth.signOut();
    await nextSignOut();
  } catch (err) {
    console.error("Sign out error:", err);
  }
};

const Header = () => {
  const { data: session } = useSession();
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [firebaseName, setFirebaseName] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setFirebaseUser(user);

      if (user) {
        const doc = await db.collection("users").doc(user.uid).get();
        if (doc.exists) {
          const userData = doc.data();
          setFirebaseName(`${userData.firstName} ${userData.surname}`);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const userImage =
    session?.user?.image ||
    "data:image/png;base64,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";
  const userName = session?.user?.name || firebaseName || "User";
  const isLoggedIn = session || firebaseUser;

  return (
    <div className="flex sticky top-0 z-50 bg-white items-center p-2 lg:px-5 shadow-md">
      {/* Left */}
      <div className="flex items-center">
        <Image
          src="https://links.papareact.com/5me"
          width={35}
          height={35}
          alt="Facebook Logo"
        />
        <div className="hidden md:inline-flex ml-2 items-center rounded-full bg-gray-100 p-2">
          <MagnifyingGlassIcon className="h-6 text-gray-600" />
          <input
            type="text"
            placeholder="Search Facebook"
            className="hidden lg:inline-flex ml-2 bg-transparent outline-none placeholder-gray-500 flex-shrink"
          />
        </div>
      </div>

      {/* Center */}
      <div className="flex justify-center flex-grow">
        <div className="flex space-x-6 md:space-x-2">
          <HeaderIcon Icon={HomeIcon} active />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center sm:space-x-2 justify-end">
        {isLoggedIn && (
          <>
            <Image
              onClick={signOutAll}
              className="rounded-full cursor-pointer"
              src={userImage}
              width={30}
              height={30}
              alt="User"
            />
            <p className="hidden lg:inline-flex text-sm whitespace-nowrap font-semibold pr-3">
              {userName}
            </p>
          </>
        )}
        <Squares2X2Icon className="icon" />
        <ChatBubbleLeftIcon className="icon" />
        <BellIcon className="icon" />
        <ChevronDownIcon className="icon" />
      </div>
    </div>
  );
};

export default Header;
