import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
   { name: 'Mobile', value: 400, color: '#0088FE' },
   { name: 'Desktop', value: 300, color: '#00C49F' },
   { name: 'Laptop', value: 300, color: '#FFBB28' },
   { name: 'Tablet', value: 200, color: '#FF8042' },
];

const PieChartBox = ({ ProductCategory }) => {
   console.log(ProductCategory);
   return (
      <div className="flex flex-col h-full bg-transparent rounded-lg shadow-md p-4">
         <h1 className="text-xl font-medium mb-4">Leads by Source</h1>
         <div className="flex justify-center items-center h-full">
            <ResponsiveContainer width="70%" height={300}>
               <PieChart>
                  <Tooltip contentStyle={{ background: 'white', borderRadius: '5px' }} />
                  <Pie data={ProductCategory} innerRadius="70%" outerRadius="90%" paddingAngle={5} dataKey="value">
                     {ProductCategory?.map((item) => (
                        <Cell key={item.name} fill={item.color} />
                     ))}
                  </Pie>
               </PieChart>
            </ResponsiveContainer>
         </div>
         <div className="flex flex-wrap justify-between mt-4 text-white">
            {ProductCategory?.map((item) => (
               <div className="flex items-center gap-2 mb-2" key={item.category}>
                  <div className="w-10 h-4 rounded-full bg-[item.color]" />
                  <span className="text-sm">{item.name}</span>
                  <span className="text-sm font-medium">{item.value}</span>
               </div>
            ))}
         </div>
      </div>
   );
};

export default PieChartBox;
