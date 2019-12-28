const env = process.env.NODE_ENV || 'development';
global.__basedir = __dirname;

const cubeModel = require('./models/cube.js');
cubeModel.insert({ name: 'test', desc: 'test' })
.then(insertedCube=>{
    console.log(insertedCube);
    return cubeModel.del(insertedCube.id);
})
.then((del)=>{
    console.log(del);
    console.log('lastindex 1');
})
// const config = require('./config/config')[env];
// const app = require('express')();

// require('./config/express')(app);
// require('./config/routes')(app);

// app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));