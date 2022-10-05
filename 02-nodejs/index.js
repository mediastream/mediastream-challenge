'use strict'

const express = require('express')

const User = require('./models/User')

// Setup Express.js app
const app = express()

const fs = require('fs');
const { parse } = require('json2csv');

app.use('/public', express.static(__dirname + '/public'));

app.get('/users', async (req, res) => {
    let limit = 100;
    let countUsers = await getCountUsers();
    let countPage = countUsers / limit;
    fs.unlinkSync('./02-nodejs/public/users.csv');
    for (let i = 1; i <= countPage; i++) {
        let users = await getUsers({page: i, limit: limit});
        await appendUsers(users);
    }
    res.send("<a href='/public/users.csv' download='usersd.csv' id='dd'></a><script>document.getElementById('dd').click()</script>");
});

const getUsers = (options) => {
    return new Promise((resolve, reject) => {
        User.paginate({}, options, (err, data) => {
            if (err)
                reject(err);
            resolve(data.docs);
        });
    });
}

const getCountUsers = () => {
    return new Promise((resolve, reject) => {
        User.count({}, (err, count) => {
            if (err)
                reject(err);
            resolve(count);
        });
    });
}

const appendUsers = (users) => {
    const fields = ['name', 'email'];
    const opts = { fields };
    //console.log('DATA ', data.docs);
    const csv = parse(users, opts);
    return new Promise((resolve, reject) => {
        fs.appendFile('./02-nodejs/public/users.csv', csv, (err) => {
            if (err)
                reject(err);
            resolve(true);
        });
    });
};

app.listen(3000, () => {
    console.log('listening 3000')
})
