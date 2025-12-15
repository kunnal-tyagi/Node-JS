import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { removefeed } from "./utils/feedSlice";

const Usercard = ({ user }) => {
  if (!user) return null;

  const { _id, firstname, lastname, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `http://localhost:3000/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removefeed(userId));
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto sm:max-w-md lg:max-w-lg px-2 sm:px-4 my-4">
      <div className="card bg-base-100 shadow-md rounded-xl overflow-hidden w-full">
        
        {/* Image */}
        <figure className="w-full aspect-[4/3]">
          <img
            className="object-cover w-full h-full"
            src={
              photoUrl ||
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            alt={`${firstname} ${lastname}`}
          />
        </figure>

        {/* Body */}
        <div className="card-body p-4 sm:p-6 flex flex-col gap-2">
          <h2 className="card-title text-lg sm:text-xl">
            {firstname} {lastname}
          </h2>

          {age && gender && (
            <p className="text-sm sm:text-base text-gray-500">
              {age}, {gender}
            </p>
          )}

          <p className="text-sm sm:text-base text-gray-700 line-clamp-3">
            {about || "This user has not added any description yet."}
          </p>

          {/* Actions */}
          <div className="card-actions mt-4 justify-center flex flex-wrap gap-3">
            <button
              className="btn btn-outline btn-sm sm:btn-md flex-1"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>

            <button
              className="btn btn-primary btn-sm sm:btn-md flex-1"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usercard;
