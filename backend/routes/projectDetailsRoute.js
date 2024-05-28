import express from "express";
import { Project } from "../models/projectModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const {
      companyLog,
      companyName,
      projectTitle,
      projectDescription,
      location,
      projectCategory,
      projectDuration,
      filter,
      requiredSkills,
      projectBudget,
      deadline,
      contactInformation,
      additionalNotes,
      agreedToTerms,
      posted,
      taken,
      completed,
      applicants,
      PIC,
      review,
    } = req.body;

    // Create a new project details document
    //NOT SURE HAVE TO RETRIEVE THE LOGO HERE OR NOT
    const newProject = new Project({
      companyLog,
      companyName,
      projectTitle,
      projectDescription,
      location,
      projectCategory,
      projectDuration,
      filter,
      requiredSkills,
      deadline,
      projectBudget,
      contactInformation,
      additionalNotes,
      agreedToTerms,
      posted,
      taken,
      completed,
      applicants,
      PIC,
      review,
    });

    // Save the project details to MongoDB
    const savedProject = await newProject.save();
    console.log("Project details uploaded:", savedProject);

    return res.status(201).json(savedProject);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const project = await Project.find();
    res.json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
