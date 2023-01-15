const express = require("express");

//const route = require("./routes/route");

const mongoose = require('mongoose')

const app=express();

app.use(express.json());
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://devendra_29:I28Cx63EjuXQjHtQ@devendra.ytysqub.mongodb.net/crypto")
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )



//app.use('/',route)


app.listen(3000, function () {
    console.log('Express app running on port ' +  3000)
});