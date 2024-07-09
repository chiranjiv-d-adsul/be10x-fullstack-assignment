"use client";

import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { Expenses } from "../../../../../utils/schema";
import { Button } from "/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "/components/ui/dialog";
import { Input } from "/components/ui/input";
import { db } from "../../../../../utils/dbConfig";
import { Budgets } from "../../../../../utils/schema";
import { toast } from "sonner";
import { RefreshCcwIcon } from "lucide-react";
import moment from "moment";

function AddExpense({ budgetId, user, refreshData }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const addNewExpense = async () => {
    const result = await db
      .insert(Expenses)
      .values({
        name: name,
        amount: amount,
        budgetId: budgetId,
        createdAt: moment().format("DD/MM/yyyy HH:mm:ss"),
      })
      .returning({ insertedId: Budgets.id });

    if (result) {
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
          placeholder="Enter expense name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          placeholder="Enter expense amount"
          type="number"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <Button
        className="mt-5 relative bg-amber-900"
        disabled={!(name && amount)}
        onClick={addNewExpense}
      >
        Add New Expense
      </Button>
    </div>
  );
}

export default AddExpense;
