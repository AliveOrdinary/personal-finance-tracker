"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    // conditionally render sun or moon icon based on theme
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="bg-transparent"
    >
      {theme === "dark" ? (
        <Image src={"/icon-sun.svg"} alt="sun icon" width={18} height={18} />
      ) : (
        <Image src={"/icon-moon.svg"} alt="moon icon" width={18} height={18} />
      )}
    </button>
  );
};

export default ThemeSwitcher;
