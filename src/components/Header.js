import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { USER_ICON } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";

const Header = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  return (
    <div className="absolute bg-gradient-to-b from-black w-screen px-8 py-2 z-10 flex justify-between">
      <img className="w-60 h-20" src={"/logo.png"} alt="logo" />
      {user && (
        <div className="flex p-4">
          <button
            className="px-4 m-2 my-2 bg-red-700 text-white rounded-lg mx-4"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Home Page" : "GPT Search"}
          </button>
          <img
            className="w-12 h-12 p-2 rounded-xl"
            alt="usericon"
            src={USER_ICON}
          />
          <button onClick={handleSignOut} className="font-bold text-white">
            {user.displayName && (
              <span className="font-normal">Hi {user.displayName}, </span>
            )}
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
