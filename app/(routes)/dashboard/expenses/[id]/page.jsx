"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { Expenses, Budgets } from "../../../../../utils/schema";
import { db } from "../../../../../utils/dbConfig";
import { eq, getTableColumns, sql } from "drizzle-orm";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import { desc } from "drizzle-orm";
import ExpenseListTable from "../_components/ExpenseListTable";
import { ArrowLeft, Pen, Trash } from "lucide-react";
import { Button } from "/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudget from "../_components/EditBudget";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "/components/ui/alert-dialog";

function ExpensesScreen({ params }) {
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState(null);
  const [expensesList, setExpensesList] = useState([]);
  const  router = useRouter();

  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);

  // get budget info
  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItems: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, params.id))
      .groupBy(Budgets.id);
    setBudgetInfo(result[0]);
    getExpensesList();
  };

  // get lastest expenses info

  const getExpensesList = async () => {
    const result = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
  };
//  to delete budget and all its expenses
    const deleteBudget = async () => {
    const deleteExpenses = await db.delete(Expenses).where(eq(Expenses.budgetId, params.id)).returning();

    if(deleteExpenses){
      const result = await db.delete(Budgets).where(eq(Budgets.id, params.id)).returning();
      if (result) {
        toast.success("Budget Deleted Successfully");
        router.replace("/dashboard/budgets");
      }
      else{
        toast.error("Budget Deletion Failed");


      }
    }

  }



  return (
    <div className="md:p-10 p-2">
      <h2 className="text-2xl font-bold flex justify-between items-center">
        <span className="flex gap-2 text-[22px] md:text-lg items-center">
      <ArrowLeft onClick={()=>router.back()} className="cursor-pointer" />
        Expenses
        </span>
        <div className="flex gap-2 items-center ">

          <EditBudget size="sm"  budgetInfo={  budgetInfo }
          refreshData={() => getBudgetInfo()}
          />
        <AlertDialog>
          <AlertDialogTrigger asChild>
          <Button size="sm"  variant="destructive" className="flex gap-2">
          <Trash />
          Delete
        </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete your budget with all its expenses.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction  onClick={()=>  deleteBudget()}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        </div>

      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpense
          user={user}
          refreshData={getBudgetInfo}
          budgetId={params.id}
        />
      </div>
      <div className="mt-6">
        <h2 className="font-bold font-mono text-lg mb-4">Newly Expenses</h2>
        <ExpenseListTable
          expensesList={expensesList}
          refreshData={() => getBudgetInfo()}
        />
      </div>
    </div>
  );
}

export default ExpensesScreen;
