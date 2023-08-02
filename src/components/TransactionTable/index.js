import { Radio, Select, Table } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import searchImg from "../../../public/search.svg";
import Button from "../Button";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";

const TransactionTable = ({
  transactions,
  addTransaction,
  fetchTransactions,
}) => {
  const [searchText, setSearchText] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
  ];

  let filteredTransactions = transactions.filter((transaction) => {
    return (
      transaction.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (transaction.type.includes(typeFilter) || typeFilter === "")
    );
  });

  let sortedTransactions = filteredTransactions.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  const importCSV = (e) => {
    e.preventDefault();
    try {
      parse(e.target.files[0], {
        header: true,
        complete: async function (results) {
          for (const transaction of results.data) {
            const newTransaction = {
              ...transaction,
              amount: parseInt(transaction.amount),
            };
            await addTransaction(newTransaction, true);
          }
        },
      });
      toast.success("Transactions imported successfully");
      fetchTransactions();
      e.target.files = null;
    } catch (err) {
      console.log(err);
    }
  };

  const exportCSV = () => {
    var csv = unparse({
      fields: ["name", "amount", "date", "type", "tag"],
      data: transactions,
    });
    const blob = new Blob([csv], { type: "text/csv:charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", `transactions.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <div className="flex items-center justify-start w-full gap-2 py-4 shadow-md shadow-neutral-300 bg-white px-4 rounded-t-sm">
        <Image src={searchImg} width={20} height={20} alt="search-icon" />
        <input
          type="text"
          value={searchText}
          className="w-full  outline-none py-2"
          placeholder="Search by name"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Select
          className="w-1/4 bg-white"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter by type"
          allowClear
        >
          <Select.Option value="">All</Select.Option>
          <Select.Option value="income">Income</Select.Option>
          <Select.Option value="expense">Expense</Select.Option>
        </Select>
      </div>

      <div className="flex bg-white items-center justify-between px-4">
        <h2 className="text-2xl font-bold my-4">My Transactions</h2>
        <Radio.Group
          onChange={(e) => setSortKey(e.target.value)}
          value={sortKey}
        >
          <Radio.Button value="">No sort</Radio.Button>
          <Radio.Button value="amount">Amount</Radio.Button>
          <Radio.Button value="date">Date</Radio.Button>
        </Radio.Group>
        <div className="flex gap-6">
          <Button text={"Export to CSV"} onClick={exportCSV} blue={true} />
          <label
            for="file-csv"
            className="w-full text-center border-2 border-primary flex items-center justify-center h-auto cursor-pointer px-4 rounded text-primary hover:bg-primary hover:text-white transition-all m-2"
          >
            Import from CSV
          </label>
          <input
            type="file"
            id="file-csv"
            accept=".csv"
            required
            onChange={importCSV}
            className="hidden"
          />
        </div>
      </div>

      <Table dataSource={sortedTransactions} columns={columns} />
    </>
  );
};

export default TransactionTable;
