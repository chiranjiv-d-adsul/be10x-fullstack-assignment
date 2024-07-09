import Link from "next/link";
import React from "react";

function BudgetItem({ budget }) {
  const spendPercentage = budget?.totalSpend && budget?.amount ? (budget.totalSpend / budget.amount) * 100 : 0;

  return (

    <Link
    href={'/dashboard/expenses/' + budget?.id}
    className=""
    >
      <div className="p-5 border rounded-lg hover:shadow-md cursor-pointer h-[150px]">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2 className="text-2xl p-3 bg-slate-100 rounded-full px-4">
            {budget?.icon}
          </h2>
          <div>
            <h2 className="font-bold">{budget?.name}</h2>
            <h2 className="text-sm text-gray-500">{budget?.totalItems} Items</h2>
          </div>
        </div>
        <h2 className="font-bold text-primary text-lg">${budget?.amount}</h2>
      </div>
      <div className="mt-5">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xs text-slate-400 font-bold">
            ${budget?.totalSpend ? budget.totalSpend : 0} Spend
          </h2>
          <h2 className="text-xs text-slate-400 font-bold">
            ${budget?.amount ? budget.amount - budget.totalSpend : 0} Remaining
          </h2>
        </div>
        <div className="w-full bg-slate-300 h-2 rounded-full">
          <div
            className="bg-amber-900 h-2 rounded-full"
            style={{ width: `${spendPercentage}%` }}
            ></div>
        </div>
      </div>
            </div>
    </Link>
  );
}

export default BudgetItem;
