import React from "react";

const Input = ({ label, state, setState, placeholder, type }) => {
  return (
    <div className="my-3">
      <p className="font-medium text-base capitalize">{label}</p>
      <input
        type={type}
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={placeholder}
        className="border-b border-b-neutral-400 outline-none w-full bg-transparent placeholder:text-sm"
      />
    </div>
  );
};

export default Input;
