const { Router } = require("express");
const { getJobs, searchParticular, addJobs } = require("../controller/jobs.controller");


const jobRouter = Router();

jobRouter.get("/",getJobs);
jobRouter.get("/filter",searchParticular);
jobRouter.post("/addJobs",addJobs)

module.exports={jobRouter};