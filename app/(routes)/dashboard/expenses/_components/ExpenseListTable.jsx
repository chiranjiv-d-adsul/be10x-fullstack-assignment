"use client"
import { IndianRupee, Trash } from "lucide-react";
import React from "react";
import { eq } from "drizzle-orm";
import { toast } from "sonner";
import { Expenses } from "../../../../../utils/schema";
import { db } from "../../../../../utils/dbConfig";

function ExpenseListTable({ expensesList, refreshData }) {
  const handleDelete = async (expense) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();
    if (result) {
      toast.success("Expense Deleted Successfully");
      refreshData();
    } else {
      toast.error("Expense Deletion Failed");
    }
  };

  return (
    <div className="w-full">
      {/* Table for larger screens */}
      <div className="hidden sm:block overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {expensesList.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {expense.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <IndianRupee className="w-4 h-4 mr-1" />
                    {expense.amount}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {expense.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleDelete(expense)}
                    className="text-red-600 hover:text-red-900"
                    aria-label="Delete expense"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for smaller screens */}
      <div className="sm:hidden space-y-4">
        {expensesList.map((expense) => (
          <div
            key={expense.id}
            className="bg-white shadow rounded-lg p-4 space-y-2"
          >
            <div className="font-medium text-gray-900">{expense.name}</div>
            <div className="text-sm text-gray-500 flex items-center">
              <IndianRupee className="w-4 h-4 mr-1" />
              {expense.amount}
            </div>
            <div className="text-sm text-gray-500">{expense.createdAt}</div>
            <div className="flex justify-end">
              <button
                onClick={() => handleDelete(expense)}
                className="text-red-600 hover:text-red-900"
                aria-label="Delete expense"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseListTable;
