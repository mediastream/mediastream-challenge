'use strict';

/*console.log(`
3.
---

We need to create a route that downloads the entire database to a .csv file.
The endpoint must be set to: GET /users

Make sure to have an instance of MongoDB running at: mongodb://localhost

Run the database seed with:
$ node utils/seed.js

-> Warning: It contains hundreds of entities and our production server is quite small
`);*/

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path')
const Json2csvTransform = require('json2csv').Transform;


// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge')
    .then(
        () => {console.log('Database is connected') },
        err => { console.log('Can not connect to the database' +err)
        });

const User = require('./models/User');

// Setup Express.js app
const app = express(),
router = express.Router();
app.use('/public' , express.static('public'))


const inputFile = path.join(__dirname, './public/users.json')
const outputFile = path.join(__dirname, './public/users.csv')

const readDB = ( callback ) => {
    console.log("readDB");
    User.find( ( err , data ) => {
        if(err) callback(err , null);

        callback(null , data);
    });
}

const createFileJson = ( data , callback) => {
    console.log("createFileJson");
    const inputFile = path.join(__dirname, '/public/users.json')

    fs.writeFile(inputFile, JSON.stringify(data) , 'utf8' , ( err ) => {
        if(err) callback(err);

        callback( null );
    });
}

const createCsv = ( callback ) => {
    console.log("createCsv");
    try{
        const fields = ['name', 'email'];
        const transformOpts = { highWaterMark: 16384, encoding: 'utf-8' };

        const input = fs.createReadStream(inputFile, { encoding: 'utf8' });
        const output = fs.createWriteStream(outputFile, { encoding: 'utf8' });
        const json2csv = new Json2csvTransform({fields}, transformOpts);
        input.pipe(json2csv).pipe(output);

        callback(null);
    }
    catch (e) {
        callback(e);
    }
}


router.get('/users' , ( req , res ) =>{

    try {
        readDB( ( err , data ) => {
            if(!err)
            {
                console.log("readDB ok");
                createFileJson( data , ( err ) => {
                    if(!err)
                    {
                        console.log("createFileJson ok");
                        createCsv( (err , data) => {
                            if(!err)
                            {
                                console.log("createCsv ok");
                                //console.log(outputFile);


                                res.download(outputFile , 'users.csv' , (err) =>{
                                    if(err)
                                    {
                                        throw err ;
                                    }
                                    else
                                    {
                                        console.log("Se descargo!!!!");
                                        fs.unlinkSync(outputFile);
                                        fs.unlinkSync(inputFile);
                                    }
                                });
                            }
                            else
                            {
                                throw err;
                            }
                        })
                    }
                    else
                    {
                        throw err;
                    }
                })
            }
            else
            {
                throw err;
            }

        });
    }
    catch (e) {
        console.log({e});
    }


    /*
    res.download('./public/users.csv' , (err) =>{
        if(err)
        {
            console.log("ERROR!!!!");
        }
        else
        {
            console.log("Se descargo!!!!");
        }
    });*/
/*
    User.find( ( err , data ) => {
        if(err)
        {
            console.log(err);
        }
        else
        {
            const result = main(data)
                .then( ( response ) => {console.log({response})});

            /*
            const fields = ['name', 'email'];
            const transformOpts = { highWaterMark: 16384, encoding: 'utf-8' };

            const inputFile = path.join(__dirname, './public/users.json')
            const outputFile = path.join(__dirname, './public/users.csv')

            fs.writeFileSync(inputFile, JSON.stringify(data) , 'utf8' , async ( err ) => {
                if(err) throw err;

                console.log("convirtiendo de json a csv");
                const input = fs.createReadStream(inputFile, { encoding: 'utf8' });
                const output = fs.createWriteStream(outputFile, { encoding: 'utf8' });
                const json2csv = new Json2csvTransform({fields}, transformOpts);
                const processor = await input.pipe(json2csv).pipe(output);
                console.log("se creo el csv");

                res.download(outputFile , (err) =>{
                    if(err)
                    {
                        console.log("ERROR!!!!");
                    }
                    else
                    {
                        console.log("Se descargo!!!!");
                    }
                });
            });
            console.log("porque aqui??");
            *//*
        }
    });
*/
});


app.use(router);

app.use(morgan('combined'))
// TODO


app.listen(3000);
