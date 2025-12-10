import axios from "axios";
import React, { useEffect } from "react";
import { addConnections } from "./utils/ConnectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const connect = await axios.get("http://localhost:3000/user/connections", {
        withCredentials: true,
      });
      console.log(connect.data.data);
      dispatch(addConnections(connect.data.data));
    } catch (err) {
      console.log("Error in fetching connections", err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl font-semibold text-gray-500">
          You have no connections yet!
        </h2>
      </div>
    );
  }

  return (
    <div className="text-center my-10 w-11/12 sm:w-3/4 md:w-1/2 mx-auto pb-40">
      <h1 className="font-bold text-2xl mb-6">Connections</h1>
      {connections.map((plot) => {
        const { _id, firstname, lastname, photoUrl, age, gender, about } = plot;

        return (
          <div
            key={_id}
            className="flex flex-col sm:flex-row items-center sm:items-start m-4 p-4 rounded-lg bg-base-200 shadow-md"
          >
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <img
                src={photoUrl}
                alt="profile pic"
                className="w-24 h-24 sm:w-20 sm:h-20 rounded-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="text-center sm:text-left mt-4 sm:mt-0 sm:ml-4 flex-1">
              <h2 className="font-bold text-xl">
                {firstname} {lastname}
              </h2>
              <h2 className="text-gray-600">{about}</h2>
              {age && gender && (
                <p className="text-gray-500">
                  {age}, {gender}
                </p>
              )}
            </div>

            {/* Chat Button */}
            <div className="mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
              <Link to={"/chat/" + _id}>
                <button className="btn bg-[#FEE502] text-[#181600] border-[#f1d800] my-5 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  Chat
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
