import React from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip } from 'recharts';

const BarChartBox = (props) => {
  return (
    <div className="flex flex-col h-full bg-transparent rounded-lg p-4">
      <h1 className="text-xl font-medium mb-4">{props.title}</h1>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={props.chartData}>
            <Tooltip
              contentStyle={{ background: '#2a3447', borderRadius: '5px' }}
              labelStyle={{ display: 'none' }}
              cursor={{ fill: 'none' }}
            />
            <Bar dataKey={props.dataKey} fill={props.color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartBox;
