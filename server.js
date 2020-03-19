const express = require('express');
const mongoose = require('mongoose');
const app = express();

//connecting to the database
mongoose.connect('mongodb://localhost:27017/fruitDB', { useNewUrlParser: true, useUnifiedTopology: true });

//fruit schema - a blueprint for the object that will be saved in the database

//schema before validation
// const fruitSchema = new mongoose.Schema({
//     name: String, //a fruit object will have a name property of String type
//     rating: Number, //rating as a Number
//     review: String //review as some text
// });

const fruitSchema = new mongoose.Schema({
 name:  {
     type: String,
     required: [true, "Error: no name specified" ]//the property name must not be empty
 },
    rating: {
        type: Number, //must be a number
        min: 1, //minimum value allowed 1
        max: 10 //maximum value allowed 10
    }, 
    review: String 
});

//schema with data validation

//use the schema to create a Mongoose model
const Fruit = mongoose.model("Fruit", fruitSchema);

//create a fruit document
const fruit = new Fruit({
    name: "Apple",
    rating: 10,
    review: "Sweet and crunchy"
});

const orange = new Fruit({
    name: "orange",
    rating: 8
});

//orange.save();

//saving the object to the database
//fruit.save();


const personSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number    
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
    firstName: 'John',
    lastName: 'Doe',
    age: 29
});

//person.save();


// const banana = new Fruit({
//     name: "Banana",
//     rating: 5,
//     review: "Soft texture"
// });

// const lemon = new Fruit({
//     name: "Lemon",
//     rating: 5,
//     review: "Sour as hell"
// });

//to add all the fruit in bulk
// Fruit.insertMany([banana, lemon], (error)=> {
//     if(error){
//         console.log(err);
//     } else {
//         console.log("Fruit successfully added to the fruitDB");
//     }
// });

//Reading from the database
//let's read from the Fruits collection

//we access the fruits collection through the Fruit model
Fruit.find(function(error, fruits) {
    if(error){
        console.log(error);
    } else {

        mongoose.disconnect();
        //console.log(fruits);
        fruits.forEach(fruit => {
            console.log(fruit.name);
        });

    }

    //Let's close the connection with the database after the last operation

});


//update a record
// Fruit.updateOne({_id: "5e73e31f9fe75b5240186cd2"}, {review: "Juicy fruit"}, function(error){
//     if(error){
//         console.log(error);
//     } else {
//         console.log("Record successfully updated.");
//     }
// });

//delete a record
Fruit.deleteOne({name: "Banana"}, function(error){
    if(error){
         console.log(error);
     } else {
         console.log("Item successfully deleted.");
     }
});


app.listen(3000, ()=>{
    console.log("Server is Running on Port 3000");
});