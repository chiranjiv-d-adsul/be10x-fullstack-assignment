'use client'

import React, { useEffect } from "react";
import { Button } from "/components/ui/button";
import { Pen } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Input } from "/components/ui/input";
import { db } from "/utils/dbConfig";
import { Budgets } from "/utils/schema";
import { toast } from "sonner";
import { eq } from "drizzle-orm";

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

function EditBudget({budgetInfo, refreshData}) {
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, Name] = useState();
  const [amount, setAmount] = useState();
  const { user } = useUser();


    useEffect(() => {
      if(budgetInfo){
      setEmojiIcon(budgetInfo?.icon);
      Name(budgetInfo?.name);
      setAmount(budgetInfo?.amount);


      }
    },[budgetInfo])

  const onUpdateBudget=async()=>{
    const result = await db.update(Budgets).set({
      name: name,
      amount: amount,
      icon: emojiIcon,
    }).where(eq(Budgets.id,budgetInfo.id)).returning();
    if(result){
      refreshData();
      toast.success("Budget Updated Successfully");
    }
    }





  return (
    <div>

      <Dialog>
        <DialogTrigger asChild>
        <Button

        className="flex gap-1 justify-center items-center "
      >
        <Pen className="h-4 " /> Edit
      </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget !</DialogTitle>
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
                    defaultValue={budgetInfo?.name}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <Input
                    placeholder="Enter budget amount"
                    type="number"
                    onChange={(e) => setAmount(e.target.value)}
                    defaultValue={budgetInfo?.amount}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={() => onUpdateBudget()}
                className="mt-5 relative bg-amber-900 "
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;
