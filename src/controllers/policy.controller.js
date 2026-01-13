const User = require("../models/User");
const Policy = require("../models/Policy");

/**
 * @desc    Search policy info by username
 * @route   GET /api/policy/search?username=Aamir
 */
exports.searchPolicy = async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    // Find user
    const user = await User.findOne({
      firstName: new RegExp(`^${username}$`, "i"),
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find policies of that user
    const policies = await Policy.find({ user_id: user._id })
      .populate("category_id", "category_name")
      .populate("company_id", "company_name")
      .populate("user_id", "firstName email");

    return res.json({
      user: {
        id: user._id,
        name: user.firstName,
        email: user.email,
      },
      totalPolicies: policies.length,
      policies,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * @desc    Aggregate policies by each user
 * @route   GET /api/policy/aggregate
 */
exports.policyAggregation = async (req, res) => {
  try {
    const result = await Policy.aggregate([
      {
        $group: {
          _id: "$user_id",
          totalPolicies: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 0,
          userId: "$user._id",
          userName: "$user.firstName",
          email: "$user.email",
          totalPolicies: 1,
        },
      },
    ]);

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
