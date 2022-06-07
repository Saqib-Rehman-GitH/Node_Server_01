const express = require('express');
const ProductRoutes = require('./ServerFolder/Routes/Products.route');
const AuthRoutes = require('./ServerFolder/Routes/Auth/auth.routes');
const mongoose = require('mongoose');



mongoose.connect('mongodb+srv://cluster0.e7vikd6.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "AppDB",
    pass: "saqib",
    user: "Saqib"
})
    .then(() => {
        console.log("Mongoose Connected ... ")
    })

const app = express();

// MIDDLE-WARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// MIDDLE-WARES
app.use('/products', ProductRoutes);
app.use('/auth',AuthRoutes);




//ERROR HANDLING MIDDLEWARES- IF NO ROUTE AVAILIBLE 
app.use(function (req, res, next) {
    const err = new Error();
    err.message = "Not Found";
    err.status = 404;
    err.errors.push(`No endpoint found of route`)
    next(err)
})
app.use(function (err, req, res, next) {
    res.status(err?.status || 500);
    res.send({
        status: err?.status || 500,
        error: err?.message || "Some Internal Issue",
        errors: err?.errors || [],
    });
})

app.listen(3000, () => {
    console.log(`Server Started Listening on Port 3000`)
})