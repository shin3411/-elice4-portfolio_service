import { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
    {
      id: {
        type: String,
        required: true,
      },
      userId: {
          type: String,
          required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: false,
        default: "아직 설명이 없습니다. 추가해 주세요.",
      },
      fromDate: {
        type: Date,
        required: true,
      },
      toDate: {
        type: Date,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const ProjectModel = model('Project', ProjectSchema);

export { ProjectModel };