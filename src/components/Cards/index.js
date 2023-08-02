import { Card, Row } from "antd";
import React from "react";
import Button from "../Button";

const Cards = ({
  income,
  expense,
  totalBalance,
  showIcomeModal,
  showExpenseModal,
}) => {
  return (
    <>
      <Row className="flex flex-1 flex-col lg:flex-row gap-10  justify-center lg:justify-between items-center w-10/12 mx-auto my-10 z-0">
        <Card className="flex flex-col flex-1 w-full shadow-lg bg-white shadow-neutral-300 dark:shadow-neutral-900 dark:bg-neutral-800 dark:border-neutral-800 ">
          <h2 className="font-bold text-lg dark:text-white text-black">
            Current Balance
          </h2>
          <p className="my-4 text-lg dark:text-white text-black">
            ₹{totalBalance}
          </p>
          <Button text="Reset Balance" blue={true} />
        </Card>
        <Card
          bordered={true}
          className="flex flex-col flex-1 w-full  shadow-lg bg-white shadow-neutral-300 dark:shadow-neutral-900 dark:bg-neutral-800 dark:border-neutral-800"
        >
          <h2 className="font-bold text-lg dark:text-white text-black">
            Total Income
          </h2>
          <p className="my-4 text-lg dark:text-white text-black">₹{income}</p>
          <Button text="Add Income" blue={true} onClick={showIcomeModal} />
        </Card>
        <Card
          bordered={true}
          className="flex flex-col flex-1 w-full   shadow-lg bg-white shadow-neutral-300 dark:shadow-neutral-900 dark:bg-neutral-800 dark:border-neutral-800"
        >
          <h2 className="font-bold text-lg dark:text-white text-black">
            Total Expenses
          </h2>
          <p className="my-4 text-lg dark:text-white text-black">₹{expense}</p>
          <Button text="Add Expense" blue={true} onClick={showExpenseModal} />
        </Card>
      </Row>
    </>
  );
};

export default Cards;
