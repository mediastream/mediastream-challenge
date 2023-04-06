const User = require('../models/User')

const usersCSV = async (req, res) => {
  try {
    const usersData = await User.find()
    const csvContent = `Name, Email,${usersData.map(
      (user) => `\n${user?.name}, ${user?.email}`
    )}`

    return res
      .status(200)
      .set({
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="users.csv"',
      })
      .send(Buffer.from(csvContent))
  } catch (err) {
    return res.status(500).send(err)
  }
}

module.exports = {
  usersCSV,
}
