import React, { useState } from "react";
import "./jobForm.scss";
import Button1 from "../Button/Button1";
import { createInterview } from "../../redux/testSlice";
import { useDispatch } from "react-redux";

const JobForm = () => {
  const [candidate, setCandidate] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const dispatch = useDispatch();

  const handleCandidateChange = (e) => {
    setCandidate(e.target.value);
  };

  const handleExperienceChange = (e) => {
    setExperienceLevel(e.target.value);
  };

  const handleSubmit = () => {
    // console.log({
    //   jobTitle,
    //   jobDescription,
    //   experienceLevel,
    //   candidate,
    //   endDate,
    // });
    dispatch(
      createInterview({
        jobTitle,
        jobDescription,
        experienceLevel,
        endDate,
        candidates: [
          {
            email: candidate,
          },
        ],
      })
    );
  };

  return (
    <form className="job-form">
      <div className="form-group">
        <label htmlFor="job-title" className="job-form__label">
          Job Title
        </label>
        <input
          type="text"
          id="job-title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Enter Job Title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="job-description" className="job-form__label">
          Job Description
        </label>
        <textarea
          id="job-description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Enter Job Description"
        />
      </div>

      <div className="form-group">
        <label htmlFor="experience-level" className="job-form__label">
          Experience Level
        </label>
        <select
          id="experience-level"
          value={experienceLevel}
          onChange={handleExperienceChange}
        >
          <option value="" disabled>
            Select Experience Level
          </option>
          <option value="Junior">Junior</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="candidate" className="job-form__label">
          Add Candidate
        </label>
        <input
          type="email"
          id="candidate"
          value={candidate}
          onChange={handleCandidateChange}
          placeholder="xyz@gmail.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="end-date" className="job-form__label">
          End Date
        </label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <Button1 text={"Send"} onClickFunction={() => handleSubmit()} />
    </form>
  );
};

export default JobForm;
