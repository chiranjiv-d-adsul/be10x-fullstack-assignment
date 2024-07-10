import React, { useState, useEffect } from "react";
import moment from "moment";
import { Expenses, Budgets } from "../../../../../utils/schema";
import { db } from "../../../../../utils/dbConfig";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { Input } from "/components/ui/input";
import { Button } from "/components/ui/button";
import { eq } from "drizzle-orm";

function AddExpense({ budgetId, user, refreshData }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [budgetInfo, setBudgetInfo] = useState(null);

  useEffect(() => {
    getBudgetInfo();
  }, []);

  const getBudgetInfo = async () => {
    const result = await db
      .select({
        totalAmount: Budgets.amount,
      })
      .from(Budgets)
      .where(eq(Budgets.id, budgetId))
      .limit(1);

    setBudgetInfo(result[0]);
  };

  const addNewExpense = async () => {
    setLoading(true);

    if (!budgetInfo) {
      toast.error("Budget information not loaded!");
      setLoading(false);
      return;
    }

    if (parseInt(amount) > budgetInfo.totalAmount) {
      toast.error("Entered amount exceeds budget amount!");
      setLoading(false);
      return;
    }

    const result = await db
      .insert(Expenses)
      .values({
        name: name,
        amount: amount,
        budgetId: budgetId,
        createdAt: moment().format("DD/MM/yyyy HH:mm:ss"),
      })
      .returning({ insertedId: Expenses.id });

    setAmount("");
    setName("");

    if (result) {
      setLoading(false);
      refreshData();
      toast.success("Expense Created Successfully");
    } else {
      toast.error("Expense Creation Failed");
    }
  };

  return (
    <div className="p-5 border rounded-lg hover:shadow-md cursor-pointer">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          value={name}
          placeholder="Enter expense name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          value={amount}
          placeholder="Enter expense amount"
          type="number"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <Button
        className="mt-5 relative bg-amber-900"
        disabled={!(name && amount) || loading}
        onClick={() => addNewExpense()}
      >
        {loading ? (
          <Loader className="animate-spin" size={20} />
        ) : (
          "Add New Expense"
        )}
      </Button>
    </div>
  );
}

export default AddExpense;
