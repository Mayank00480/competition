import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import './CompetitionList.css';

const CompetitionList = ({ competitions }) => {
  const navigate = useNavigate(); // Hook for navigation
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);
  const [paginatedData, setPaginatedData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  // Calculate pagination when competitions change
  useEffect(() => {
    if (competitions && competitions.length > 0) {
      // Calculate total pages
      const pages = Math.ceil(competitions.length / itemsPerPage);
      setTotalPages(pages);
      
      // Create paginated data
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setPaginatedData(competitions.slice(startIndex, endIndex));
    } else {
      setPaginatedData([]);
      setTotalPages(0);
    }
  }, [competitions, currentPage]);

  // Handle next page click
  const handleNextClick = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle cancel/previous click
  const handleCancelClick = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle register click
  const handleRegisterClick = (competitionId) => {
    // Navigate to registration form with the competition ID
    navigate(`/register/${competitionId}`);
  };

  // Calculate progress percentage for overall pagination
  const progressPercentage = ((currentPage + 1) / totalPages) * 100;
  
  // Calculate progress percentage for individual competition registrations
  const calculateProgressForRegistered = (registered, total) => {
    if (!registered || !total) return 0;
    const percentage = (registered / total) * 100;
    return Math.min(percentage, 100); // Ensure it doesn't exceed 100%
  };



  return (
    <>

    <div className="competition-container">
      <div className="competition-header">
        <h2>Competition List</h2>
      </div>
      <ul className="competition-list">
        {paginatedData && paginatedData.map(competition => {
          const itemProgressPercentage = calculateProgressForRegistered(
            competition?.numberOfPeopleRegistered,
            competition?.totalAllowed || 100
          );
          
          return (
            <li className="competition-item" key={competition?.id}>
              <div className="competition-info">
                <span className="competition-name">{competition?.name}</span>
                <span className="competition-count">{competition?.numberOfPeopleRegistered || 0}</span>
              </div>
              <div className="item-progress-container">
                <div className="item-progress-bar">
                  <div 
                    className="item-progress-completed"
                    style={{ width: `${itemProgressPercentage}%` }}
                  ></div>
                </div>
                <button 
                  className="register-button"
                  onClick={() => handleRegisterClick(competition.id)}
                  disabled={competition.status === "Closed" || competition?.numberOfPeopleRegistered >= competition?.totalAllowed}
                >
                 {(competition.status === "Closed" || competition?.numberOfPeopleRegistered >= competition?.totalAllowed) ? "Closed" : "Register"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="progress-bar">
        <div 
          className="progress-completed" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="button-container">
        <button 
          className="button-dark" 
          onClick={handleCancelClick}
          disabled={currentPage === 0}
        >
          {"Previous"}
        </button>
        <button 
          className="button-accent" 
          onClick={handleNextClick}
          disabled={currentPage >= totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
    </>
  );
};

export default CompetitionList;