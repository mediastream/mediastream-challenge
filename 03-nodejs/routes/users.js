const { Router } = require('express');
const os = require('os');
const mongoose = require('mongoose');

function transformDocumentToCsv(document) {
  return `${Object.values(document).join(', ')}${os.EOL}`;
}

function usersRouter(app) {
  const router = Router();
  app.use('/users', router);

  router.get('/', async function (req, res) {
    const streamUsers = mongoose.connection.db
      .collection('users')
      .find()
      .stream({ transform: transformDocumentToCsv });

    const streamUsersFinished = new Promise((resolve) =>
      streamUsers.on('end', resolve)
    );

    res.setHeader('Content-Disposition', 'attachment; filename=users.csv');
    streamUsers.pipe(res);
    await streamUsersFinished;
  });
}

module.exports = usersRouter;
