import React from "react";
import cardImg from "../../../public/transactions.svg";
import Image from "next/image";

const NoTransaction = () => {
  return (
    <div className="flex justify-center items-center w-full flex-col mb-8">
      <Image className="m-16" src={cardImg} width={400} alt="no-transaction" />
      <p className="text-center text-lg">You have no transactions.</p>
    </div>
  );
};

export default NoTransaction;
