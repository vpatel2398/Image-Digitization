import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditPhotoPage from "./components/EditPhoto";
import Dashboard from "./components/Dashboard";
import Progress from "./components/Progress";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define Routes for React Router v6 */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/edit-photo/:id" element={<EditPhotoPage />} /> {/* Dynamic Route for Edit */}
        <Route path="/progress-photo/:id" element={<Progress />} />
      </Routes>
    </Router>
  );
};

export default App;
