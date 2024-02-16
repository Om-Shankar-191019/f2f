import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";
import background from "../assets/bg-auth.jpg";
import { MdFace2 } from "react-icons/md";
import { MdPhotoCamera } from "react-icons/md";
import { defaultAvatar, generateRandomUsername } from "../utils/constants";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import toast from "react-hot-toast";

const backGroundImage = {
  background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${background})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};
const Signup = () => {
  const { loading, signup } = useSignup();
  const [filePerc, setFilePerc] = useState(null);
  const [imgUploadLoading, setImgUploadLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "male",
    profilePic: "",
    remember: false,
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setImgUploadLoading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        toast.error(`failed! only upto 4mb image size allowed.`);
        setImgUploadLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUserInput({ ...userInput, profilePic: downloadURL });
          // console.log(downloadURL, "from download url");
          setImgUploadLoading(false);
        });
      }
    );
  };

  const handleRandomPic = () => {
    // https://avatar-placeholder.iran.liara.run/
    // boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    // girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    let randomProfilePic;
    let randomuser = generateRandomUsername();
    if (userInput.gender === "male") {
      randomProfilePic = `https://avatar.iran.liara.run/public/boy?username=${randomuser}`;
    } else {
      randomProfilePic = `https://avatar.iran.liara.run/public/girl?username=${randomuser}`;
    }
    setUserInput({ ...userInput, profilePic: randomProfilePic });
  };

  const handleUserInputChange = (e) => {
    if (e.target.name === "remember") {
      setUserInput({ ...userInput, [e.target.name]: e.target.checked });
    } else setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(userInput);
  };
  return (
    <section
      className="bg-gray-200 dark:bg-gray-900 py-12  "
      // style={{ backgroundImage: `url(${background})` }}
      style={backGroundImage}
    >
      <div className="flex flex-col items-center  px-6 py-8 mx-auto md:h-full lg:py-0">
        <div className="flex items-center gap-4 mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <MdFace2 className="text-themeColorHover text-4xl" />
          <span className="text-themeColorHover ">face2face</span>
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl  text-center font-bold leading-tight tracking-tight text-themeColor md:text-2xl dark:text-white">
              Create an account
            </h1>
            {/* image upload ui */}
            <div className="flex justify-center  ">
              <div className="relative  ">
                <img
                  src={
                    userInput.profilePic ? userInput.profilePic : defaultAvatar
                  }
                  className="h-16 w-16 rounded-full object-cover "
                />
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 absolute -bottom-2 right-0 "
                  htmlFor="userPhoto"
                >
                  <div className="text-gray-300 rounded-full bg-white p-1 border border-gray-300 cursor-pointer">
                    <MdPhotoCamera size={16} />
                  </div>
                  <input
                    type="file"
                    id="userPhoto"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </div>
            <button
              onClick={handleRandomPic}
              disabled={imgUploadLoading || loading}
              className="w-full text-white bg-themeColor hover:bg-themeColorHover  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-themeColor dark:hover:bg-themeColorHover  duration-200"
            >
              {imgUploadLoading || loading ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                "Click to generate a random profile image"
              )}
            </button>

            {/* form */}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="gender"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Choose your gender
                </label>
                <select
                  name="gender"
                  id="gender"
                  value={userInput.gender}
                  onChange={handleUserInputChange}
                  className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sm  text-gray-900 dark:text-white"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="firstName lastName"
                  required
                  value={userInput.fullName}
                  onChange={handleUserInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="firstlast12"
                  required
                  value={userInput.username}
                  onChange={handleUserInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="email@xyz.com"
                  required
                  value={userInput.email}
                  onChange={handleUserInputChange}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={userInput.password}
                  onChange={handleUserInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={userInput.confirmPassword}
                  onChange={handleUserInputChange}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      name="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      checked={userInput.remember}
                      onChange={handleUserInputChange}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading || imgUploadLoading}
                className="w-full text-white bg-themeColor hover:bg-themeColorHover focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-themeColor dark:hover:bg-themeColorHover dark:focus:ring-primary-800 duration-200"
              >
                {loading || imgUploadLoading ? (
                  <span className="loading loading-dots loading-md"></span>
                ) : (
                  "Sign up"
                )}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-themeColor hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
