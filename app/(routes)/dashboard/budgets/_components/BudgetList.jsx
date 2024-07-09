"use client";

import React, { useEffect } from "react";
import CreateBudget from "./CreateBudget";
import { getTableColumns, sql } from "drizzle-orm";
import { db } from "../../../../../utils/dbConfig";
import { Budgets } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { Expenses } from "../../../../../utils/schema";
import { useState } from "react";
import { index } from "drizzle-orm/mysql-core";
import BudgetItem from "./BudgetItem";
import { Bug } from "lucide-react";
import { desc } from "drizzle-orm";

function BudgetList() {

  const [budgetList, setBudgetList] = useState([]);
  const {user} = useUser();
  useEffect(() => {
    user&&getBudgetList()
  }, [user])

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItems: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id))
      setBudgetList(result);
  };

  return (
    <div className="mt-7 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateBudget
        refreshData={() => getBudgetList()}
        />
        {budgetList?.length>0? budgetList.map((budget,index) => (

        <BudgetItem budget={budget}/>
        ))
      :[1,2,3,4,5].map((item,index)=>(
       <div key={index}
       className="w-full bg-slate-200 rounded-lg h-[144px] animate-pulse">

       </div>
      ))
      }

      </div>
    </div>
  );
}

export default BudgetList;


// refreshData is veey useful if we have to refresh the data after some operation like create, update or delete
// without loading the page again