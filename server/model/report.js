const { Schema, model } = require("mongoose");

const reportSchema = Schema(
  {
    fileName: String,
    filePath: String,
  },
  { versionKey: false, timestamps: true }
);

const Report = model("report", reportSchema);

module.exports = Report;
