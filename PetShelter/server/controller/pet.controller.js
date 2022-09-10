const Pet = require('../model/pet.model')

module.exports.helloWorld = (req,res) => {
    res.json({ message:"HELLO WORLD!"})
}

module.exports.findAllPet = (req,res) => {
    Pet.find()
        .then(allPets => {
            res.json({results: allPets})
        })
        .catch(err=>res.json({err: err}))
}

module.exports.findOnePet = (req,res) => {
    Pet.findOne({_id: req.params.id})
        .then(foundOnePet => {
            res.json({results: foundOnePet})
        })
        .catch(err=>res.json({err: err}))
}

module.exports.createPet = (req,res) => {
    Pet.create(req.body)
        .then(newlyCreatedPet => {
            res.json({ results: newlyCreatedPet})
        })
        .catch(err=>res.json({err: err}))
}

module.exports.updatePet = (req,res) => {
    Pet.findOneAndUpdate({_id:req.params.id},req.body,{new:true, runValidators:true})
        .then(updatedPet => {
            res.json({ results: updatedPet})
        })
        .catch(err=>res.json({err: err}))
}

module.exports.deletePet = (req,res) => {
    Pet.deleteOne({_id:req.params.id})
        .then(deletedPet => {
            res.json({ results: deletedPet})
        })
        .catch(err=>res.json({err: err}))
}

module.exports.likePet = (request, response) => {
    Pet.findOneAndUpdate(
        {_id: request.params._id},
        {$inc: {likes: 1}}

    )
        .then(() => response.json({msg: "WE ARE LINKING THIS!", response}))
        .catch(err => response.json(err));
    }