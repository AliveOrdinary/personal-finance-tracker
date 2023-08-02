"use client";
import React, { useEffect } from "react";
import ThemeSwitcher from "../ThemeSwitcher";
import { auth } from "@/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import Image from "next/image";
import userImg from "../../../public/user.svg";

const Header = () => {
  const [user, loading] = useAuthState(auth);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  });

  const logOutFn = () => {
    try {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          toast.success("Successfully logged out");
          router.push("/");
        })
        .catch((error) => {
          // An error happened.
          toast.error("error.message");
        });
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
    <div className="sticky top-0 left-0 w-full flex justify-between bg-primary px-10 py-4 items-center z-50">
      <h1 className="font-semibold tracking-wider text-lg text-white">
        Financier.
      </h1>
      <div className="flex gap-6 items-center">
        {user && (
          <div className="flex items-center gap-2 justify-center">
            <img
              src={user?.photoURL ? user?.photoURL : userImg}
              width={30}
              height={30}
              alt="user-icon"
              className="rounded-full"
            />
            <p
              className="cursor-pointer font-medium text-base text-white"
              onClick={logOutFn}
            >
              Logout
            </p>
          </div>
        )}
        {/* <ThemeSwitcher /> */}
      </div>
    </div>
  );
};

export default Header;
