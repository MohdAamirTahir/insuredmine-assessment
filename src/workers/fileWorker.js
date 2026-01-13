const { workerData, parentPort } = require("worker_threads");
const fs = require("fs");
const csv = require("csv-parser");
require("dotenv").config();

const connectDB = require("../config/db");
const Agent = require("../models/Agent");
const User = require("../models/User");
const Account = require("../models/Account");
const LOB = require("../models/LOB");
const Carrier = require("../models/Carrier");
const Policy = require("../models/Policy");

(async () => {
  await connectDB();

  fs.createReadStream(workerData.filePath)
    .pipe(csv())
    .on("data", async (row) => {
      try {
        // 1️⃣ Agent
        const agent = await Agent.findOneAndUpdate(
          { agentName: row.agent },
          { agentName: row.agent },
          { upsert: true, new: true }
        );

        // 2️⃣ User
        const user = await User.findOneAndUpdate(
          { email: row.email },
          {
            firstName: row.firstname,
            dob: new Date(row.dob),
            address: row.address,
            phone: row.phone,
            state: row.state,
            zip: row.zip,
            gender: row.gender,
            userType: row.userType,
          },
          { upsert: true, new: true }
        );

        // 3️⃣ Account
        const account = await Account.findOneAndUpdate(
          { accountName: row.account_name },
          { accountName: row.account_name },
          { upsert: true, new: true }
        );

        // 4️⃣ Policy Category (LOB)
        const lob = await LOB.findOneAndUpdate(
          { category_name: row.category_name },
          { category_name: row.category_name },
          { upsert: true, new: true }
        );

        // 5️⃣ Carrier
        const carrier = await Carrier.findOneAndUpdate(
          { company_name: row.company_name },
          { company_name: row.company_name },
          { upsert: true, new: true }
        );

        // 6️⃣ Policy
        await Policy.findOneAndUpdate(
          { policy_number: row.policy_number },
          {
            policy_number: row.policy_number,
            start_date: new Date(row.policy_start_date),
            end_date: new Date(row.policy_end_date),
            category_id: lob._id,
            company_id: carrier._id,
            user_id: user._id,
          },
          { upsert: true }
        );
      } catch (err) {
        console.error("Row processing error:", err.message);
      }
    })
    .on("end", () => {
      parentPort.postMessage("File processed successfully");
    });
})();
