const express = require("express");
const {
  searchPolicy,
  policyAggregation,
} = require("../controllers/policy.controller");

const router = express.Router();

router.get("/policy/search", searchPolicy);
router.get("/policy/aggregate", policyAggregation);

module.exports = router;
