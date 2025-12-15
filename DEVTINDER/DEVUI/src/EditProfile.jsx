import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Usercard from "./Usercard";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addUser } from "./utils/userSlice";

const EditProfile = ({ user }) => {
  if (!user) return <p className="text-center mt-10">Loading profile...</p>;

  const [firstName, setFirstName] = useState(user.firstname || "");
  const [lastName, setLastName] = useState(user.lastname || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");

  const dispatch = useDispatch();

  const SaveProfile = async () => {
    try {
      const Updated = await axios.patch(
        "http://localhost:3000/profile/edit",
        {
          firstname: firstName,
          lastname: lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );

      toast.success("✅ Profile updated successfully!", {
        position: "top-right",
        autoClose: 4000,
        transition: Flip,
      });

      dispatch(addUser(Updated.data));
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update profile");
    }
  };

  return (
    <>
      <ToastContainer />

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-10 px-4 my-10">

        {/* Edit Form */}
        <div className="w-full sm:w-96">
          <div className="card bg-base-300 shadow-md w-full">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>

              {/* First Name */}
              <label className="input validator w-full my-2">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

              {/* Last Name */}
              <label className="input validator w-full my-2">
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>

              {/* Photo URL */}
              <label className="input validator w-full my-2">
                <input
                  type="url"
                  placeholder="Photo URL"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>

              {/* Age */}
              <label className="input validator w-full my-2">
                <input
                  type="number"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>

              {/* Gender */}
              <label className="input validator w-full my-2">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>

              {/* About */}
              <div className="flex border rounded-lg overflow-hidden w-full my-2">
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="About You"
                  className="w-full p-2 h-24 resize-none outline-none bg-transparent"
                />
              </div>

              <div className="card-actions justify-center mt-4">
                <button className="btn btn-primary w-full" onClick={SaveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <div className="w-full sm:w-96">
          <Usercard
            user={{
              firstname: firstName,
              lastname: lastName,
              photoUrl,
              age,
              gender,
              about,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
