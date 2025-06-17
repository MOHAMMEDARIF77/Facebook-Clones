import Image from "next/image";
import React, { useRef, useState } from "react";
// import { useSession } from "next-auth/react";
import {
  FaceSmileIcon,
  CameraIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
// import firebase from "firebase";
// import { db, firebase } from "../firebase";
import { db, storage, firebase } from "../firebase";

const InputBox = () => {
  //   const { data: session, status } = useSession();

  // if (status === "loading") return null;
  // if (!session) return null;

  const inputRef = useRef(null);
  const filepickerRef = useRef(null);
  const [imageToPost, setImageToPast] = useState(null);
  
  const sendPost = (e) => {
  e.preventDefault();
  if (!inputRef.current.value) return;

  db.collection("posts")
    .add({
      message: inputRef.current.value,
      // name, email, image — you can use dummy or session data
      name: "Mohammed Arif",
      email: "arif@example.com",
      image: "https://links.papareact.com/4u4",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((doc) => {
      if (imageToPost) {
        const uploadTask = storage
          .ref(`posts/${doc.id}`)
          .putString(imageToPost, "data_url");

        removeImage();

        uploadTask.on(
          "state_changed",
          null,
          (error) => console.error("Upload error:", error),
          () => {
            storage
              .ref("posts")
              .child(doc.id)
              .getDownloadURL()
              .then((url) => {
                db.collection("posts").doc(doc.id).set(
                  {
                    postImage: url,
                  },
                  { merge: true }
                );
              });
          }
        );
      }
    });

  inputRef.current.value = "";
};

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImageToPast(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPast(null);
  };

  return (
    
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
  {/* TOP */}
  <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 p-4 items-center">
    <Image
      className="rounded-full"
      src="https://links.papareact.com/4u4"
      width={40}
      height={40}
      alt="User Image"
      layout="fixed"
    />

    <form className="flex flex-1 w-full sm:w-auto">
      <input
        className="rounded-full h-10 sm:h-12 bg-gray-100 flex-grow px-4 text-sm sm:text-base focus:outline-none w-full"
        type="text"
        ref={inputRef}
        placeholder={`What's on your mind, Mohammed Arif`}
      />
      <button hidden type="submit" onClick={sendPost}>
        Submit
      </button>
    </form>

    {imageToPost && (
      <div
        onClick={removeImage}
        className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
      >
        <img
          className="h-10 object-contain"
          src={imageToPost}
          alt="Post Image"
        />
        <p className="text-xs text-red-500 text-center">Remove</p>
      </div>
    )}
  </div>

  {/* BOTTOM ICONS */}
  <div className="flex flex-col sm:flex-row justify-around items-center px-3 pt-2 gap-2 sm:gap-0 border-t">
    <div className="inputIcon w-full sm:w-auto justify-center">
      <VideoCameraIcon className="h-6 sm:h-7 text-red-500" />
      <p className="text-xs sm:text-sm">Live Video</p>
    </div>
    <div
      onClick={() => filepickerRef.current.click()}
      className="inputIcon w-full sm:w-auto justify-center"
    >
      <CameraIcon className="h-6 sm:h-7 text-green-400" />
      <p className="text-xs sm:text-sm">Photo/Video</p>
      <input
        ref={filepickerRef}
        onChange={addImageToPost}
        type="file"
        hidden
      />
    </div>
    <div className="inputIcon w-full sm:w-auto justify-center">
      <FaceSmileIcon className="h-6 sm:h-7 text-yellow-300" />
      <p className="text-xs sm:text-sm">Feeling/Activity</p>
    </div>
  </div>
</div>

  );
};

export default InputBox;
