
import express from 'express';
import { Project } from '../models/projectModel.js';


const router = express.Router();

// Route to fetch projects based on status (posted, in progress or completed)
router.get("/:status", async (req, res) => {
  try {
    const { status } = req.params;
    let projects;

    if (status === "posted") {
      projects = await Project.find({ taken: false, completed: false });
    } else if (status === "in-progress") {
      projects = await Project.find({ taken: true, completed: false });
    } else if (status === "completed") {
      projects = await Project.find({ completed: true });
    } else {
      return res.status(400).json({ message: "Invalid status parameter" });
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to fetch applicants for a specific project
router.get("/posted/:projectId/applicants", async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project.applicants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/posted/:projectId/confirm", async (req, res) => {
  const { projectId } = req.params;
  const { userID } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Confirm the applicant by removing others and updating the project document
    project.applicants = [userID];
    project.taken = true;
    await project.save();

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Remove applicant route
router.put("/posted/:projectId/remove", async (req, res) => {
  const { projectId } = req.params;
  const { userID } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Remove the applicant from the applicants array
    project.applicants = project.applicants.filter((id) => id !== userID);
    await project.save();

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/:projectId/saveReview", async (req, res) => {
  try {
    const { projectId } = req.params;

    // Extract review data from the request body
    const {
      satisfactionRating,
      projectRating,
      projectFeedback,
      collaboratorRating,
      collaboratorFeedback,
    } = req.body;

    // Find the project by its ID
    const project = await Project.findById(projectId);

    // If the project is not found, return an error
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Update the project's review data
    project.review = {
      satisfactionRating,
      projectRating,
      projectFeedback,
      collaboratorRating,
      collaboratorFeedback,
    };

    // Save the updated project
    const updatedProject = await project.save();
    console.log("review saved");

    // Return the updated project with the review data
    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
