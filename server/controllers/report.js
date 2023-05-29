const { Report } = require("../model/report");

const { ctrlWrapper } = require("../helpers/controllerWrapper");
const { reportPostValidator } = require("../model/reportJoi");

const getReport = async (req, res) => {
  const result = await Report.find({});
  return res.status(200).json(result);
};

const addReport = async (req, res, next) => {
  const { error } = reportPostValidator(req.body);
  if (error) return res.status(400).json({ message: "missing required field" });
  const { fileName, filePath } = req.body;
  const report = await Report.create({ fileName, filePath });
  if (report) return res.status(201).json(report);
};

const removeReport = async (req, res, next) => {
  const { reportId } = req.params;
  const reportToRemove = await Report.findByIdAndRemove(reportId);
  if (!reportToRemove) {
    res.status(404).json({ message: "Report not found" });
  }
  res.status(200).json({ message: "Report deleted" });
};

module.exports = {
  getReport: ctrlWrapper(getReport),
  addReport: ctrlWrapper(addReport),
  removeReport: ctrlWrapper(removeReport),
};
