"use client";
import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { toast } from "react-toastify";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, doc, provider } from "@/firebaseConfig";
import { useRouter } from "next/navigation";
import { getDoc, setDoc } from "firebase/firestore";

const SignUpIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);

  const router = useRouter();

  const signUpEmail = () => {
    setLoading(true);
    if (name != "" || email != "" || password != "" || confirmPassword != "") {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("user>>", user);
            createDoc(user);
            setLoading(false);
            setName("");
            setEmail("");
            setConfirmPassword("");
            setPassowrd("");
            toast.success("User created!");
            router.push("/dashboard");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      } else {
        toast.error("Password doesn't match");
        setLoading(false);
      }
    } else {
      toast.warn("All fields are mandatory");
      setLoading(false);
    }
  };

  const loginEmail = () => {
    setLoading(true);
    if (email != "" || password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("user>>>", user);
          setLoading(false);
          setEmail("");
          setPassowrd("");
          toast.success("User logged in.");
          router.push("/dashboard");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.warn("All fields are mandatory");
      setLoading(false);
    }
  };

  const googleAuth = () => {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log("user>>>", user);
          createDoc(user);
          setLoading(false);
          router.push("/dashboard");
          toast.success("User Authenticated");
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
        });
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };

  const createDoc = async (user) => {
    setLoading(true);
    console.log("inside createDoc");
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        console.log("creating doc");
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc created");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      toast.error("doc alreaady exists");
      setLoading(false);
    }
  };

  return (
    <>
      {loginForm ? (
        <div className="flex flex-col gap-4 md:w-2/5 xl:w-1/4 shadow-lg bg-white shadow-neutral-300 dark:shadow-neutral-900 dark:bg-neutral-800 rounded-xl px-8 py-6">
          <h1 className="text-2xl font-semibold text-center text-neutral-950 dark:text-white">
            Log Into <span className="text-primary">Financier.</span>
          </h1>
          <form className="flex flex-col">
            <Input
              type={"email"}
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"johndoe@gmail.com"}
            />
            <Input
              type={"password"}
              label={"Password"}
              state={password}
              setState={setPassowrd}
              placeholder={"Example@123"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Login using Email and Password"}
              onClick={loginEmail}
            />
            <span className="text-center text-neutral-500 dark:text-neutral-400 text-lg">
              or
            </span>
            <Button
              text={loading ? "Loading..." : "Login using Google"}
              blue={true}
              onClick={googleAuth}
            />
            <p className="text-center mt-2 font-light text-neutral-500 dark:text-neutral-400 text-sm">
              Don&apos;t have an account?
              <span
                className="cursor-pointer text-neutral-700 dark:text-neutral-200"
                onClick={() => setLoginForm(!loginForm)}
              >
                {" "}
                Click here!
              </span>
            </p>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-4 md:w-2/5  xl:w-1/4 shadow-lg bg-white shadow-neutral-300 dark:shadow-neutral-900 dark:bg-neutral-800 rounded-xl px-8 py-6">
          <h1 className="text-2xl font-semibold text-center text-neutral-950 dark:text-white">
            Sign Up on <span className="text-primary">Financier.</span>
          </h1>
          <form className="flex flex-col">
            <Input
              type={"text"}
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"John Doe"}
            />
            <Input
              type={"email"}
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"johndoe@gmail.com"}
            />
            <Input
              type={"password"}
              label={"Password"}
              state={password}
              setState={setPassowrd}
              placeholder={"Example@123"}
            />
            <Input
              type={"password"}
              label={"Confirm Password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Example@123"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Signup using Email and Password"}
              onClick={signUpEmail}
            />
            <span className="text-center text-neutral-500 dark:text-neutral-400 text-lg">
              or
            </span>
            <Button
              onClick={googleAuth}
              text={loading ? "Loading..." : "Signup using Google"}
              blue={true}
            />
            <p className="text-center mt-2 font-light text-neutral-500 dark:text-neutral-400 text-sm">
              Already have an account?
              <span
                className="cursor-pointer text-neutral-700 dark:text-neutral-200"
                onClick={() => setLoginForm(!loginForm)}
              >
                {" "}
                Click here!
              </span>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default SignUpIn;
