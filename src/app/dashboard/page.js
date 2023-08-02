"use client";
import React, { useEffect, useState } from "react";
import Cards from "@/components/Cards";
import AddIncomeModal from "@/components/Modals/addIncome";
import AddExpenseModal from "@/components/Modals/addExpense";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, getDocs } from "@firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "@/firebaseConfig";
import moment from "moment/moment";
import TransactionTable from "@/components/TransactionTable";
import NoTransaction from "@/components/NoTransaction";
import Charts from "@/components/Charts";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [transactions, setTransactions] = useState([]);
  const [isIncomeMopen, setIsIncomeMopen] = useState(false);
  const [isExpenseMopen, setIsExpenseMopen] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const showIcomeModal = () => {
    setIsIncomeMopen(true);
  };

  const showExpenseModal = () => {
    setIsExpenseMopen(true);
  };

  const handleIncomeCancel = () => {
    setIsIncomeMopen(false);
  };

  const handleExpenseCancel = () => {
    setIsExpenseMopen(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      name: values.name,
      amount: parseFloat(values.amount),
      date: values.date.format("YYYY-MM-DD"),
      tag: values.tag,
    };
    addTransaction(newTransaction);
  };

  const fetchTransactions = async () => {
    const transactions = [];
    const querySnapshot = await getDocs(
      collection(db, `users/${user.uid}/transactions`)
    );
    querySnapshot.forEach((doc) => {
      transactions.push({ ...doc.data(), id: doc.id });
    });
    setTransactions(transactions);
    toast.success("Transactions fetched successfully");
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const addTransaction = async (transaction, many) => {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user?.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      if (!many) toast.success("Transaction added successfully");
      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
      calculateBalance();
    } catch (err) {
      console.log(err);
      if (!many) toast.error("Error adding transaction");
    }
  };

  const calculateBalance = () => {
    let income = 0;
    let expense = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        income += transaction.amount;
      } else {
        expense += transaction.amount;
      }
    });
    setIncome(income);
    setExpense(expense);
    setTotalBalance(income - expense);
  };

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  let sortedTransactions = transactions.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="flex flex-col">
      <Cards
        income={income}
        expense={expense}
        totalBalance={totalBalance}
        showIcomeModal={showIcomeModal}
        showExpenseModal={showExpenseModal}
      />

      <AddIncomeModal
        isIncomeMopen={isIncomeMopen}
        handleIncomeCancel={handleIncomeCancel}
        onFinish={onFinish}
      />
      <AddExpenseModal
        isExpenseMopen={isExpenseMopen}
        handleExpenseCancel={handleExpenseCancel}
        onFinish={onFinish}
      />
      {transactions && transactions.length != 0 ? (
        <Charts sortedTransactions={sortedTransactions} />
      ) : (
        <NoTransaction />
      )}
      <div className="w-10/12 mx-auto">
        <TransactionTable
          transactions={transactions}
          addTransaction={addTransaction}
          fetchTransactions={fetchTransactions}
        />
      </div>
    </div>
  );
};

export default Dashboard;
