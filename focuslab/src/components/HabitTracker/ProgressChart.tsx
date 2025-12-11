import React from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import type { DailyProgress } from './types';

type Props = {
  dailyProgress: DailyProgress[];
};

const ProgressChart: React.FC<Props> = ({ dailyProgress }) => {
  return (
    <div className="mt-6">
      <ResponsiveContainer width="100%" height={150}>
        <AreaChart data={dailyProgress}>
          <defs>
            <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="progress" stroke="#82ca9d" fill="url(#colorProgress)" />
          <YAxis domain={[0, 100]} ticks={[20, 40, 60]} tickFormatter={(v: any) => `${v}%`} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
