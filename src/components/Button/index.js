import React from "react";

const Button = ({ text, onClick, blue, disabled }) => {
  return (
    <div
      className={`${
        blue
          ? "bg-primary text-white hover:text-primary hover:bg-white hover:transition-all duration-300"
          : " border-primary text-primary hover:bg-primary hover:text-white hover:transition-all duration-300"
      } py-2 flex justify-center items-center w-full h-auto rounded cursor-pointer my-2 border-2 border-primary box-border text-base font-medium`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </div>
  );
};

export default Button;
