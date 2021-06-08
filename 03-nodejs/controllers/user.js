const fs = require('fs');
const path = require('path');

const User = require('../models/User');

function getResultIntoChunks(result) {
  const totalLength = result.length;
  let chunkArray = [];

  const chunkSize = Math.round(totalLength / 1000);

  let start = 0;
  let end = 1000;

  for (let i = 1; i <= chunkSize; i++) {
    const tempResult = result.slice(start, end);
    start = end;
    end += 1000;

    if (tempResult) {
      chunkArray.push(tempResult); 
    }
  }

  return chunkArray;
}

async function convertToCsv (request, response) {
  const result = await User.find({}).lean();
  const filePath = path.join(__dirname, '..', 'database.csv');
  const headers = ['Name', 'Email'].join(',');

  fs.writeFileSync(filePath, headers + '\n');

  const chunks = getResultIntoChunks(result);

  chunks.forEach((chunk) => {
    if (chunk && chunk.length > 0) {
      const fd = fs.openSync(filePath);
      chunk.forEach((user) => {
        if (user) {
          const { name, email } = user;
          const mergedJson = [name, email].join(',') + '\n';
          fs.appendFileSync(filePath, mergedJson);
        }
      });
      fs.closeSync(fd);
    }
  });

  return response.json({ message: 'success' });
}

module.exports = {
  convertToCsv,
};
