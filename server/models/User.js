import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },

    displayName: { type: String, default: "" },
    headline: { type: String, default: "" }, // "Hey I'm Dhaya"
    about: { type: String, default: "" },
    avatarUrl: { type: String, default: "" },

    theme: { type: String, default: "default" }, // future template selection

    projects: [
      {
        title: String,
        description: String,
        link: String,
        thumbnailUrl: String,
        tech: [String],
        createdAt: { type: Date, default: Date.now },
      },
    ],

    experience: [
      {
        role: String,
        company: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],

    skills: [String],

    contactEmail: { type: String, default: "" },
    contactPhone: { type: String, default: "" },

    social: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
    },

    isPublic: { type: Boolean, default: true },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
