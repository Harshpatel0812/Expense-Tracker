import React, { useState, useEffect } from "react";

import NewExpense from "./Component/NewExpense/NewExpense";
import Expenses from "./Component/Expenses/Expenses";
// import ExpenseForm from "./Component/NewExpense/ExpenseForm";

const DUMMY_EXPENSE = [];

const App = () => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSE);

  function fetchData() {
    fetch("API")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      setExpenses(data);
    });
  }

  useEffect(() => {
   fetchData(); 
  },[]);

  const addExpenseHandler = (expense) => {
    fetch('API',{
      method:'POST',
      body:JSON.stringify(expense),
      headers:{
        'content-Type' : 'application/json'
      }
    }).then(
      responce => {
        fetchData();
      }
    )
  };

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses item={expenses} />
    </div>
  );
};

export default App;
