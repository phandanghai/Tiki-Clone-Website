import React from 'react';
import { Link } from 'react-router-dom';
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';

const ChartBox = (props) => {
   return (
      <div className="flex flex-col h-full bg-transparent rounded-lg p-2 relative">
         <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
               <img className="w-6 h-6" src={props.icon} alt="" />
               <span className="text-lg font-medium">{props.title}</span>
            </div>
            {/* <Link to="/" className="text-blue-500 hover:underline absolute bottom-1 right-2">
          View all
        </Link> */}
         </div>
         <div className="flex flex-grow">
            <div className="w-full flex-grow">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={props.chartData}>
                     <Tooltip
                        contentStyle={{ background: 'transparent', border: 'none' }}
                        labelStyle={{ display: 'none' }}
                        position={{ x: 10, y: 70 }}
                     />
                     <Line type="monotone" dataKey={props.dataKey} stroke={props.color} strokeWidth={2} dot={false} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
            <div className="flex flex-col text-right">
               {/* <span className="text-lg font-bold text-red-500">{props.percentage}%</span> */}
               <span className="text-base text-gray-500">trong năm nay</span>
            </div>
         </div>
      </div>
   );
};

export default ChartBox;
