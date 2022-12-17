const { JobModel } = require("../models/job.model");


const addJobs = async (req, res) => {
  var utc = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
  const { company, city, location, role, level, contract, position, language } =
    req.body;
  const postedAt = utc;
  const job = new JobModel({
    company,
    postedAt,
    city,
    location,
    role,
    level,
    contract,
    position,
    language,
  });
  await job.save();
  console.log(job);
  res.send("Job Posted Successful");
};

const getJobs = async (req, res) => {
  try {
    const search = req.query.search || "";
    let sort = req.query.sort || "postedAt";
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    const sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "desc";
    }

    const job = await await JobModel.find({
      postedAt: { $regex: search, $options: "i" },
    }).sort(sortBy);

    const response = {
      job,
    };

    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const searchParticular = async (req, res) => {
  const searchResult = await JobModel.find(req.body);
  try {
    res.status(200).send(searchResult);
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports = {
  getJobs,
  searchParticular,
  addJobs
};
