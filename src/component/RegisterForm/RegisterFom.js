import React, { useState,useEffect } from 'react';
import './RegisterationForm.css'
import { useParams ,useNavigate} from 'react-router-dom';

const RegistrationForm = ({competitions , setCompetitions}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    teamName: '',
    agreeTerms: false
  });
  const { id } = useParams();
  const [competition, setCompetition] = useState({});
  
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Form submission logic would go here
    //   alert(`Registration successful for ${competition.name}!`);
       setCompetitions(prevState => {
       return prevState?.map(item => {
            console.log(item , id);
            if(item?.id === parseInt(id, 10)){
                return {
                     ...item, status: item?.numberOfPeopleRegistered + 1< item?.totalAllowed ? "Open" : "Closed", numberOfPeopleRegistered: item?.numberOfPeopleRegistered + 1 
                }
            }
            else return item;
        })
       })
       navigate("/");
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  useEffect(() => {
    // Assuming you have the competitions data available here or imported from props
    const selectedCompetition = competitions.find((comp) => comp.id === parseInt(id));
    setCompetition(selectedCompetition);
  }, [id]);
  const renderFormStep = () => {
    switch(step) {
      case 1:
        return (
          <>
            <div className="form-group">
              <label htmlFor="fullName">Full Name <span className="required">*</span></label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address <span className="required">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email address"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number <span className="required">*</span></label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="Enter your phone number"
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="form-group">
              <label htmlFor="experience">Experience Level</label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
              >
                <option value="" disabled>Select your experience level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="teamName">Team Name (optional)</label>
              <input
                type="text"
                id="teamName"
                name="teamName"
                value={formData.teamName}
                onChange={handleInputChange}
                placeholder="Enter your team name if applicable"
              />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="summary">
              <h3>Registration Summary</h3>
              <p><strong>Competition:</strong> {competition.name}</p>
              <p><strong>Name:</strong> {formData.fullName}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Experience:</strong> {formData.experience || 'Not specified'}</p>
              <p><strong>Team Name:</strong> {formData.teamName || 'Not specified'}</p>
            </div>
            
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
              />
              <label htmlFor="agreeTerms">
                I agree to the terms and conditions <span className="required">*</span>
              </label>
            </div>
          </>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1>Registeration Form</h1>
        </div>
        
        <div className="competition-info">
          <div className="competition-name">{competition.name}</div>
          <div className="competition-slots">{competition.totalAllowed - competition.numberOfPeopleRegistered} slots available</div>
        </div>
        
        <div className="form-section">
          <div className="form-title">Registration Form - Step {step} of {totalSteps}</div>
          
          <form onSubmit={handleSubmit}>
            {renderFormStep()}
            
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress" 
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="button-group">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleBack}
                disabled={step === 1}
              >
                Previous
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={step === totalSteps && !formData.agreeTerms}
              >
                {step < totalSteps ? 'Next' : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
      

    </div>
  );
};

export default RegistrationForm;