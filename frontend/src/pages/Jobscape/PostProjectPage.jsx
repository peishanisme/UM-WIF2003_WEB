import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../pages-css/Jobscape/PostProjectPage.css";
import SmallTitle from "../../components/jobscape/SmallTitle";
import "../../components-css/jobscape/Notification.css";

const Notification = ({ message, onClose }) => (
  <div className="overlay">
    <div className="post-project-notification">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

const PostProjectPage = () => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [location, setLocation] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [projectDuration, setProjectDuration] = useState("");
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [projectBudget, setProjectBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [contactInformation, setContactInformation] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [validationMessages, setValidationMessages] = useState({
    projectTitle: "",
    projectDescription: "",
    location: "",
    projectCategory: "",
    projectDuration: "",
    requiredSkills: "",
    projectBudget: "",
    deadline: "",
    contactInformation: "",
    additionalNotes: "",
    agreedToTerms: "",
  });

  const validateFields = () => {
    const messages = {};
    let isValid = true;

    if (!projectTitle) {
      messages.projectTitle = "Project Title is required";
      isValid = false;
    }
    if (!projectDescription) {
      messages.projectDescription = "Project Description is required";
      isValid = false;
    }
    if (!location) {
      messages.location = "Location is required";
      isValid = false;
    }
    if (!projectCategory) {
      messages.projectCategory = "Project Category is required";
      isValid = false;
    }
    if (!projectDuration) {
      messages.projectDuration = "Project Duration is required";
      isValid = false;
    }
    if (requiredSkills.length === 0) {
      messages.requiredSkills = "At least one Required Skill is required";
      isValid = false;
    }
    if (!projectBudget) {
      messages.projectBudget = "Project Budget is required";
      isValid = false;
    }
    if (!deadline) {
      messages.deadline = "Deadline for Completion is required";
      isValid = false;
    }
    if (!agreedToTerms) {
      messages.agreedToTerms = "You must agree to the terms and conditions";
      isValid = false;
    }

    // Validate contact information
    const contactRegex = /^\d{10}$/; // Assumes a 10-digit phone number
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !contactInformation ||
      (!contactRegex.test(contactInformation) &&
        !emailRegex.test(contactInformation))
    ) {
      messages.contactInformation =
        "Please enter a valid phone number or email address.";
      isValid = false;
    }

    setValidationMessages(messages);
    return isValid;
  };

  const handleSkillsChange = (e) => {
    const value = e.target.value;
    setNewSkill(value);
  };

  const handleSkillsRemove = (index) => {
    setRequiredSkills((prevSkills) =>
      prevSkills.filter((skill, i) => i !== index)
    );
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setRequiredSkills((prevSkills) => [...prevSkills, newSkill]);
      setNewSkill("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return; // Stop submission if validation fails
    }

    try {
      const response = await axios.post("http://localhost:5050/recruite", {
        projectTitle,
        projectDescription,
        location,
        projectCategory,
        projectDuration,
        requiredSkills,
        projectBudget,
        deadline,
        contactInformation,
        additionalNotes,
        agreedToTerms,
      });

      if (response.status === 201) {
        // Clear form fields and show notification
        setIsFormSubmitted(true);
        setShowNotification(true);
        setProjectTitle("");
        setProjectDescription("");
        setLocation("");
        setProjectCategory("");
        setProjectDuration("");
        setRequiredSkills([]);
        setNewSkill("");
        setProjectBudget("");
        setDeadline("");
        setContactInformation("");
        setAdditionalNotes("");
        setAgreedToTerms(false);
      }
    } catch (error) {
      console.error("Error:", error.message);
      // Display a generic error message to the user
      alert("An error occurred. Please try again later.");
    }
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
    if (isFormSubmitted) {
      setIsFormSubmitted(false);
      navigate("/SeekTalentPage");
    }
  };

  return (
    <div className="PostProjectPage">
      <div className="PostBackBtn">
        <Button className="BackBtn" onClick={() => navigate(-1)}>
          <p>
            <i className="bi-chevron-left" />
            Back
          </p>
        </Button>
      </div>
      <div className="PostHeader">
        <SmallTitle
          className="SmallTitle"
          title="Project Details"
          fontWeight="700"
          fontSize="36px"
        />
      </div>
      <div className="FormContainer">
        <p>
          To ensure clarity and accuracy in project submissions, please adhere
          to the following guidelines: Provide a descriptive title and detailed
          description of the project, outlining its objectives, scope, and
          deliverables. Specify the required skills and technologies needed to
          complete the project, ensuring compatibility with potential
          candidates' expertise. Clearly state the project duration, budget, and
          deadline for completion to manage expectations and facilitate
          efficient project planning. Include accurate contact information for
          communication purposes and any additional notes or requirements
          relevant to the project.
        </p>
        <form className="ProjectForm" onSubmit={handleSubmit}>
          <div className="FormRow">
            <label htmlFor="projectTitle">Project Title:</label>
            <input
              type="text"
              id="projectTitle"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
            />
            {validationMessages.projectTitle && (
              <span className="ErrorMessage">
                {validationMessages.projectTitle}
              </span>
            )}
          </div>
          <div className="FormRow">
            <label htmlFor="projectDescription">Project Description:</label>
            <textarea
              id="projectDescription"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
            {validationMessages.projectDescription && (
              <span className="ErrorMessage">
                {validationMessages.projectDescription}
              </span>
            )}
          </div>
          <div className="FormRow">
            <label htmlFor="location">Location:</label>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Select Location</option>
              <option value="Kuala Lumpur">Kuala Lumpur</option>
              <option value="Selangor">Selangor</option>
              <option value="Negeri Sembilan">Negeri Sembilan</option>
              <option value="Melaka">Melaka</option>
              <option value="Johore">Johore</option>
              <option value="Kelantan">Kelantan</option>
              <option value="Terengganu">Terengganu</option>
              <option value="Perak">Perak</option>
              <option value="Pahang">Pahang</option>
              <option value="Remote">Remote</option>
            </select>
            {validationMessages.location && (
              <span className="ErrorMessage">
                {validationMessages.location}
              </span>
            )}
          </div>
          <div className="FormRow">
            <label htmlFor="projectCategory">Project Category:</label>
            <select
              id="projectCategory"
              value={projectCategory}
              onChange={(e) => setProjectCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option value="Tech & IT">Tech & IT</option>
              <option value="Creative & Design">Creative & Design</option>
              <option value="Content Writing">Content Writing</option>
              <option value="Education & Training">Education & Training</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Engineering">Engineering</option>
            </select>
            {validationMessages.projectCategory && (
              <span className="ErrorMessage">
                {validationMessages.projectCategory}
              </span>
            )}
          </div>
          <div className="FormRow">
            <label htmlFor="projectDuration">Project Duration:</label>
            <select
              id="projectDuration"
              value={projectDuration}
              onChange={(e) => setProjectDuration(e.target.value)}
            >
              <option value="">Select duration</option>
              <option value="Short Term">Short Term</option>
              <option value="Long Term">Long Term</option>
              <option value="OnGoing">OnGoing</option>
            </select>
            {validationMessages.projectDuration && (
              <span className="ErrorMessage">
                {validationMessages.projectDuration}
              </span>
            )}
          </div>
          <div className="FormRow">
            <label>Required Skills:</label>
            <div className="SkillsContainer">
              {requiredSkills.map((skill, index) => (
                <div key={index} className="SkillBox">
                  <div>{skill}</div>
                  <button
                    className="XBtn"
                    type="button"
                    onClick={() => handleSkillsRemove(index)}
                  >
                    X
                  </button>
                </div>
              ))}
              <input
                type="text"
                placeholder="Add skill"
                value={newSkill}
                onChange={handleSkillsChange}
              />
              <button className="AddBtn" type="button" onClick={handleAddSkill}>
                Add
              </button>
            </div>
            {validationMessages.requiredSkills && (
              <span className="ErrorMessage">
                {validationMessages.requiredSkills}
              </span>
            )}
          </div>
          <div className="FormRow">
            <label htmlFor="projectBudget">Project Budget:</label>
            <input
              type="text"
              id="projectBudget"
              value={projectBudget}
              onChange={(e) => setProjectBudget(e.target.value)}
            />
            {validationMessages.projectBudget && (
              <span className="ErrorMessage">
                {validationMessages.projectBudget}
              </span>
            )}
          </div>
          <div className="FormRow">
            <label htmlFor="deadline">Deadline for Completion:</label>
            <input
              type="date"
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            {validationMessages.deadline && (
              <span className="ErrorMessage">
                {validationMessages.deadline}
              </span>
            )}
          </div>
          <div className="FormRow">
            <label htmlFor="contactInformation">Contact Information:</label>
            <input
              type="text"
              id="contactInformation"
              value={contactInformation}
              onChange={(e) => setContactInformation(e.target.value)}
              pattern="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$|^[\d\s()-]+$"
            />
            {validationMessages.contactInformation && (
              <span className="ErrorMessage">
                {validationMessages.contactInformation}
              </span>
            )}
          </div>
          <div className="FormRow">
            <label htmlFor="additionalNotes">Additional Notes:</label>
            <textarea
              id="additionalNotes"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
            />
            {validationMessages.additionalNotes && (
              <span className="ErrorMessage">
                {validationMessages.additionalNotes}
              </span>
            )}
          </div>
          <div className="FormRow">
            <label htmlFor="termsCheckbox">
              <input
                type="checkbox"
                id="termsCheckbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
              />
              By selecting this, you agree to our terms and conditions.
            </label>
            {validationMessages.agreedToTerms && (
              <span className="ErrorMessage">
                {validationMessages.agreedToTerms}
              </span>
            )}
          </div>
          <button type="submit" className="SubmitButton">
            Submit
          </button>
        </form>
        {/* Notification */}
        {showNotification && (
          <Notification
            message="Your project details have been successfully submitted!"
            onClose={handleNotificationClose}
          />
        )}
      </div>
    </div>
  );
};

export default PostProjectPage;
