import { Line, Pie } from "@ant-design/charts";
import React from "react";

const Charts = ({ sortedTransactions }) => {
  const data = sortedTransactions.map((transaction) => {
    return {
      date: transaction.date,
      amount: transaction.amount,
    };
  });

  const spendingData = sortedTransactions.map((transaction) => {
    if (transaction.type === "expense") {
      return {
        tag: transaction.tag,
        amount: transaction.amount,
      };
    }
  });

  let newSpendings = [
    { tag: "Food", amount: 0 },
    { tag: "education", amount: 0 },
    { tag: "office", amount: 0 },
  ];

  spendingData.forEach((spending) => {
    if (spending) {
      if (spending.tag === "Food") {
        newSpendings[0].amount += spending.amount;
      } else if (spending.tag === "education") {
        newSpendings[1].amount += spending.amount;
      } else if (spending.tag === "office") {
        newSpendings[2].amount += spending.amount;
      }
    }
  });

  const spendingConfig = {
    data: newSpendings,
    angleField: "amount",
    colorField: "tag",
  };

  const config = {
    data: data,
    xField: "date",
    yField: "amount",
    autoFit: true,
  };

  let chart;

  let pieChart;
  return (
    <div className="flex w-10/12 mx-auto py-6 px-2 gap-4 bg-white mb-8 shadow-md shadow-neutral-300">
      <div className="flex-1">
        <h2 className="font-bold mb-4">Your Analytics</h2>
        <Line
          {...config}
          onReady={(chartInstance) => (chart = chartInstance)}
        />
      </div>
      <div className="flex-1">
        <h2 className="font-bold mb-4">Your Spendings</h2>
        <Pie
          {...spendingConfig}
          onReady={(chartInstance) => (pieChart = chartInstance)}
        />
      </div>
    </div>
  );
};

export default Charts;
