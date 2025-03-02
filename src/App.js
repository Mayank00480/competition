// src/App.js
import React, { useState } from 'react';
import './App.css';
import CompetitionList from "./component/competition-list/CompetitionList";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterForm from './component/RegisterForm/RegisterFom';
import Background from './component/Background/Background';
const competition = [
  { id: 1, name: "Chess", status: "Open", numberOfPeopleRegistered: 1, totalAllowed: 10 },
  { id: 2, name: "Cricket", status: "Upcoming", numberOfPeopleRegistered: 3, totalAllowed: 10 },
  { id: 3, name: "Volleyball", status: "Closed", numberOfPeopleRegistered: 3, totalAllowed: 10 },
  { id: 4, name: "Baseball", status: "Open", numberOfPeopleRegistered: 6, totalAllowed: 6 },
  { id: 5, name: "Coding Contest", status: "Upcoming", numberOfPeopleRegistered: 1, totalAllowed: 10 },
  { id: 6, name: "Web Development", status: "Open", numberOfPeopleRegistered: 8, totalAllowed: 15 },
  { id: 7, name: "BasketBall", status: "Upcoming", numberOfPeopleRegistered: 2, totalAllowed: 12 },
  { id: 8, name: "Mountain Expedition", status: "Closed", numberOfPeopleRegistered: 10, totalAllowed: 10 },
  { id: 9, name: "Bike Race", status: "Open", numberOfPeopleRegistered: 5, totalAllowed: 20 },
  { id: 10, name: "International Chess Championship", status: "Upcoming", numberOfPeopleRegistered: 4, totalAllowed: 10 },
  { id: 11, name: "The Maze Challenge", status: "Open", numberOfPeopleRegistered: 7, totalAllowed: 10 },
  { id: 12, name: "Winter Games", status: "Closed", numberOfPeopleRegistered: 10, totalAllowed: 10 },
  { id: 13, name: "The Great Relay", status: "Open", numberOfPeopleRegistered: 9, totalAllowed: 15 },
  { id: 14, name: "Virtual Olympics", status: "Upcoming", numberOfPeopleRegistered: 0, totalAllowed: 10 },
  { id: 15, name: "Global Hackathon", status: "Open", numberOfPeopleRegistered: 12, totalAllowed: 20 }
];
const backgroundStyle = {
  backgroundImage: "url('https://s3.amazonaws.com/startupcollective-com/wp-content/uploads/business-competition-1024x681.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%", // Changed from 10% to 100% to cover the entire width
  height: "100%",
  zIndex: -1,
  opacity: 1, // To ensure it stays behind other content
};
const App = () => {
  const [competitions , setCompetitions] = useState(competition)
  return (
    <div className="app-background">
      <div className="app-container">
      <Background backgroundStyle={backgroundStyle} />
        <BrowserRouter>
          <Routes>
            {/* Route for the competition list */}
            <Route path="/" element={<CompetitionList competitions={competitions} />} />
            
            {/* Route for the registration form with dynamic id */}
            <Route path="/register/:id" element={<RegisterForm competitions = {competitions} setCompetitions = {setCompetitions}/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
