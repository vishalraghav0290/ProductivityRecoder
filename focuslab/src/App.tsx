import React from "react";
import HabitTracker from "./pages/HabitTracker";
import Navbar from "./components/HabitTracker/navbar";
const App: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Navbar />
      <div className="flex-1">
        <HabitTracker />
      </div>
    </div>
  );
}

export default App;