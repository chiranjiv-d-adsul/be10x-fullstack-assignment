"use client";

import React from "react";

import { useState } from "react";

import EmojiPicker from "emoji-picker-react";

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
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

function CreateBudget({refreshData}) {
  const [emojiIcon, setEmojiIcon] = useState("🙂");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, Name] = useState();
  const [amount, setAmount] = useState();
  const { user } = useUser();


  // to create a new budget
  const onCreateBudget = async () => {
    const result = await db
      .insert(Budgets)
      .values({
        name: name,
        amount: amount,
        createBy: user?.primaryEmailAddress?.emailAddress,
        icon: emojiIcon,
      })
      .returning({ insertedId: Budgets.id });
    if (result) {
      refreshData();
      toast.success("Budget Created Successfully");

    }
    else{
      toast.error("Budget Creation Failed")
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="bg-slate-100 p-10 rounded-md
    items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md"
          >
            <h2 className="text-3xl">+</h2>
            <h2>Create your New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget here!</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                  variant="outline"
                  className="text-lg"
                >
                  {emojiIcon}
                </Button>
                <div className="absolute z-10">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);

                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Name</h2>
                  <Input
                    placeholder="Enter budget name"
                    onChange={(e) => Name(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <Input
                    placeholder="Enter budget amount"
                    type="number"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
          <Button
                  disabled={!(name && amount)}
                  onClick={() => onCreateBudget()}
                  className="mt-5 relative bg-amber-900 "
                >
                  Create Budget
                </Button>
          </DialogClose>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
