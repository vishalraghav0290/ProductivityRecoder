// Allow importing .jsx files without TypeScript complaints
declare module '*.jsx' {
  import React = require('react');
  const component: React.ComponentType<any>;
  export default component;
}

// Fallback for specific local imports without extension
declare module './HabitTracker' {
  import React = require('react');
  const component: React.ComponentType<any>;
  export default component;
}

// Recharts has no types installed in this project; provide a loose module declaration
declare module 'recharts' {
  export const LineChart: any;
  export const Line: any;
  export const Area: any;
  export const AreaChart: any;
  export const XAxis: any;
  export const YAxis: any;
  export const CartesianGrid: any;
  export const Tooltip: any;
  export const ResponsiveContainer: any;
  const _default: any;
  export default _default;
}

