import { Trash } from 'lucide-react';
import React from 'react';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';
import { getTableColumns, sql } from "drizzle-orm";
import { db } from "../../../../../utils/dbConfig";
import { Budgets } from "../../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import { Expenses } from "../../../../../utils/schema";
import { useState } from "react";
import { index } from "drizzle-orm/mysql-core";
import { Bug } from "lucide-react";
import { desc } from "drizzle-orm";

function ExpenseListTable({ expensesList, refreshData }) {


  const handleDelete = async(expense) => {
    const result=await db.delete(Expenses).where(eq(Expenses.id,expense.id))
    .returning();
    if(result){
      toast.success("Expense Deleted Successfully")
      refreshData();

    }
    else{
      toast.error("Expense Deletion Failed")
    }
  }

  return (
    <div className="overflow-x-auto  shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
              Amount
            </th>
            <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {expensesList.map((expense,index) => (
            <tr key={expense.id}>
              <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {expense.name}
              </td>
              <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                ${expense.amount}
              </td>
              <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                {expense.createdAt}
              </td>
              <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                <Trash
                onClick={() => handleDelete(expense)}
                className="cursor-pointer hover:text-red-800 text-red-600" />
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseListTable;
