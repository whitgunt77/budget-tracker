import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ExpenseChart = ({ transactions }) => {
  const data = useMemo(() => {
    const safeTransaction = Array.isArray(transactions) ? transactions : [];

    // Aggregate amounts by category
    const totals = safeTransaction.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
      return acc;
    }, {});

    return Object.keys(totals).map((key) => ({
      name: key,
      value: totals[key],
    }));
  }, [transactions]);

  return (
    <div className="h-80 w-full bg-white p-6 rounded-xl shadow-lg border">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Spending Breakdown</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
          <YAxis stroke="#6b7280" fontSize={12} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
          />
          <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;