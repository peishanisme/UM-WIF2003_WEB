import mongoose from "mongoose";


const getDefaultFilter = function() {
    return [this.projectCategory, this.projectDuration, this.location];
};

// accept input from recruiter from FORM
//i not sure how to get the user's data, like company logo & name
const projectDetailsSchema = mongoose.Schema(
    {
      //maybe have to get userID
        companyLogo: { data: Buffer, contentType: String }, // Company logo as binary data
        companyName: String, // Company name as string
        projectTitle: { type: String, required: true },
        projectDescription: { type: String, required: true },
        location: { type: String, require: true},
        projectCategory: { type: String, required: true },
        projectDuration: { type: String, required: true },
        filter: { type: [String], required: true, default: getDefaultFilter },
        requiredSkills: { type: [String], required: true },
        deadline: { type: Date, required: true },
        projectBudget: { type: Number, required: true },
        contactInformation: { type: String, required: true },
        additionalNotes: String,
        agreedToTerms: { type: Boolean, required: true },
        posted:{ type: Boolean, default: true },
        taken: { type: Boolean, default: false },
        completed: { type: Boolean, default: false},
        applicants: { type: [String] }, //should store freelancer userID
        // PIC: { type: Schema.Types.ObjectId, ref: "FakeUser" }, I renamed it to serviceProvider
        review: [{
    satisfactionRating: Number,
    projectRating: Number,
    projectFeedback: String,
    collaboratorRating: Number,
    collaboratorFeedback: String,
    _id: false,
  }]
    },
    { timestamps: true }
);
export const ProjectDetails = mongoose.model("ProjectDetails", projectDetailsSchema);