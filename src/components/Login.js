import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../utils/firebase";
import { firebaseErrorMessage } from "../utils/firebaseErrorMessage";
import { addUser } from "../utils/userSlice";
import { checkValiddata } from "../utils/validation";
import Header from "./Header";
import { BACKGROUND_IMAGE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const [toggleSignIn, setToggleSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toggleSignInForm = () => {
    setErrorMessage(null);
    setToggleSignIn(!toggleSignIn);
  };

  const handleButtonClick = async () => {
    setErrorMessage(null);
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const inValidMessage = checkValiddata(emailValue, passwordValue);
    setErrorMessage(inValidMessage);
    if (inValidMessage) return;
    setLoading(true);
    if (!toggleSignIn) {
      try {
        const nameValue = name.current.value;
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          emailValue,
          passwordValue
        );
        await updateProfile(userCredential.user, {
          displayName: nameValue || "User",
        });

        dispatch(
          addUser({
            displayName: nameValue || "User",
          })
        );
      } catch (error) {
        const errMessage = firebaseErrorMessage(error.code);
        setErrorMessage(errMessage);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, emailValue, passwordValue);
      } catch (error) {
        const errMessage = firebaseErrorMessage(error.code);
        setErrorMessage(errMessage);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute w-full h-screen">
        <img
          src={BACKGROUND_IMAGE_URL}
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute rounded-lg p-6 bg-black bg-opacity-70 my-28 mx-auto right-0 left-0 text-white"
      >
        <h1 className="font-bold text-3xl py-4">
          {toggleSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!toggleSignIn && (
          <input
            ref={name}
            type="name"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-100 bg-opacity-10"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-100 bg-opacity-10"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-100 bg-opacity-10"
        />
        <p className="text-red-500 font-bold text-lg"> {errorMessage}</p>
        <button
          className="p-2 my-6 bg-red-700 rounded-md w-full text-lg disabled:bg-gray-600"
          onClick={handleButtonClick}
          disabled={loading}
        >
          {toggleSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-1 text-gray-300">
          {toggleSignIn ? "New to Redflix? " : "Already registered? "}
          <span
            className="font-bold text-white cursor-pointer"
            onClick={toggleSignInForm}
          >
            {toggleSignIn ? "Sign Up Now" : "Sign In Now"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
