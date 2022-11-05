const User = require("../models/User");

const userController = {
  download: async (req, res) => {
    try {
      const fileName = Date.now();
      res.setHeader("Content-Encoding", "UTF-8");
      res.setHeader("Content-Type", "text/csv; charset=UTF-8");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${fileName}.csv`
      );
      res.status(200);

      await User.find()
        .lean()
        .cursor()
        .on("data", (user) => {
          res.write(`${user.name},${user.email}\n`);
        })
        .on("end", () => {
          res.end();
        });
    } catch (e) {
      res.status(500).send("Internal Error").end();
    }
  },
};

module.exports = userController;
