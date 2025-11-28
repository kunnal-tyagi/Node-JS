import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import Usercard from './Usercard';
import { addfeed } from './utils/feedSlice';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed.length > 0) return;
    try {
      const res = await axios.get("http://localhost:3000/feed", {
        withCredentials: true
      });
      dispatch(addfeed(res.data.users));
    } catch (err) {
      console.log("Error in fetching feed", err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className='flex flex-col items-center my-10 w-full'>
      {feed.length > 0 ? (
        // Show first user card (can map for multiple later)
        <Usercard user={feed[0]} />
      ) : (
        // Modern "No Users" card
        <div className="flex flex-col items-center justify-center mt-20 space-y-4">
          {/* Big 3D-ish Emoji */}
          <div className="text-6xl animate-bounce drop-shadow-lg">
            🥺💔
          </div>

          {/* Main Message */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-700 drop-shadow-md">
            No More Users Found!
          </h2>

          {/* Subtext */}
          <p className="text-gray-500 text-center max-w-xs animate-pulse">
            Looks like everyone has been seen. Come back later for more connections!
          </p>

          {/* Optional action button */}
          <button className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:scale-105 transition-transform"
             onClick={() => getFeed()}  >
            Refresh Feed
          </button>
        </div>
      )}
    </div>
  );
};

export default Feed;
