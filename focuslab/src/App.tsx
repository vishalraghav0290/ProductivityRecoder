import React from "react";
import HabitTracker from "./pages/HabitTracker";
import Navbar from "./components/HabitTracker/navbar";
const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <HabitTracker />
    </div>
  );
}

export default App;