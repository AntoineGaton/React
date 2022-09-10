const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: [true, "Name is required..."],
        minLength: [3, "Name must be at least 3 characters long..."]
    },

    type:{
        type: String,
        required: [true, "Type is required..."],
        minLength: [3, "Type must be at least 3 characters long..."]
    },

    description:{
        type: String,
        required: [true, "Description is required..."],
        minLength: [3, "Description must be at least 3 characters long..."]
    },

    skillOne:{
        type: String
    },

    skillTwo: {
        type: String
    },
    
    skillThree: {
        type: String
    },

    likes: {
        type: Number,
    }
})

const Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;