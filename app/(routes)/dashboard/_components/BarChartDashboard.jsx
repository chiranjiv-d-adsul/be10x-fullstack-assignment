import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function BarChartDashboard({ budgetList }) {
  return (
    <div className="border rounded-lg p-5 ">
      <h2 className="font-bold text-lg ">Data</h2>
      <ResponsiveContainer width={'80%'} height={300}>
        <BarChart

          data={budgetList}
          margin={{ top: 8, right: 5, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSpend" fill="#9A7B4F" />
          <Bar dataKey="amount" fill="#481F01" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartDashboard;
