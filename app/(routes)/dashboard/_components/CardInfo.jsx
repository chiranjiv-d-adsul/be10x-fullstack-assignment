// In _components/CardInfo.js or .jsx or .tsx

import { PiggyBank, ReceiptText, Wallet,  IndianRupee  } from "lucide-react";
import React, { useEffect, useState } from "react";

export const CardInfo = ({ budgetList }) => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  useEffect(() => {
    budgetList && CalculateCardInfo();
  }, [budgetList]);

  const CalculateCardInfo = () => {
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    budgetList.forEach((element) => {
      totalBudget_ = totalBudget_ + Number(element.amount);
      totalSpend_ = totalSpend_ + element.totalSpend;
    });
    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
  };
  return (
    <div>
 {budgetList?.length>0?
    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">

      <div className="p-7 border rounded-lg flex items-center justify-between">
        <div>
          <h2 className="text-sm"> Total Budget</h2>
          <h2 className="font-bold text-2xl flex justify-between items-center">   <IndianRupee /> {totalBudget}</h2>
        </div>
        <PiggyBank className="bg-amber-950 p-3 h-12 w-12 rounded-full text-white" />
      </div>
      <div className="p-7 border rounded-lg flex items-center justify-between">
        <div>
          <h2 className="text-sm"> Total Spend</h2>
          <h2 className="font-bold text-2xl  flex justify-between items-center"> <IndianRupee /> {totalSpend}</h2>
        </div>
        <ReceiptText className="bg-amber-950 p-3 h-12 w-12 rounded-full text-white" />
      </div>
      <div className="p-7 border rounded-lg flex items-center justify-between">
        <div>
          <h2 className="text-sm"> No. of Budget</h2>
          <h2 className="font-bold text-2xl">{budgetList?.length}</h2>
        </div>
        <Wallet className="bg-amber-950 p-3 h-12 w-12 rounded-full text-white" />
      </div>

    </div>
    :
    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
     { [1,2,3].map((item,index)=>(
          <div className="h-[100px] w-full bg-slate-200 animate-pulse rounded-lg"></div>
    ))}
    </div>
}
    </div>
  );
};
