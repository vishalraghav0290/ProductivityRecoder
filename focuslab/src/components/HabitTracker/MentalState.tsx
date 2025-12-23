import React from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';

type Props = {
  moodData: Array<number | null>;
  motivationData: Array<number | null>;
};

const MentalState: React.FC<Props> = ({ moodData, motivationData }) => {
  return (
    <div className="flex flex-col mt-8 border-t border-gray-300 pt-4 gap-3">
      <div className="text-center font-bold mb-2">Mental State</div>
      <div className="flex text-xs">
        <div className="w-48 font-bold">Mood</div>
        {moodData.map((mood, i) => (
          <div key={i} className="flex-1 text-center">
            {mood !== null ? mood : '-'}
          </div>
        ))}
      </div>
      <div className="flex text-xs mt-1">
        <div className="w-48 font-bold">Motivation</div>
        {motivationData.map((mot, i) => (
          <div key={i} className="flex-1 text-center">
            {mot !== null ? mot : '-'}
          </div>
        ))}
      </div>

      <div className="flex mt-4">
        <ResponsiveContainer width="100%" height={150}>
          <AreaChart data={moodData.map((mood, i) => ({ day: i + 1, mood: mood ?? 0 }))}>
            <defs>
              <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#c084fc" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#c084fc" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="mood" stroke="#c084fc" fill="url(#colorMood)" />
            <YAxis domain={[0, 10]} ticks={[2.5, 5, 7.5]} tickFormatter={(v: any) => `${Math.round(v * 10)}%`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MentalState;
