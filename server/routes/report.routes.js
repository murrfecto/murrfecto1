const express = require("express");
const router = express.Router();

const { getReport, addReport, removeReport } = require("../controllers/report");

router.get("/report", getReport);

router.post("/report", addReport);
router.delete("/report/:reportId", removeReport);

module.exports = { reportRouter: router };
