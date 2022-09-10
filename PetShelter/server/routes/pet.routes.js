const PetController = require('../controller/pet.controller');

module.exports = app => {
    app.get("/", PetController.helloWorld)
        
    //FIND ALL
    app.get("/api/pets", PetController.findAllPet)

    //FIND ONE
    app.get("/api/pet/:id", PetController.findOnePet)

    //CREATE ONE
    app.post("/api/pet", PetController.createPet)

    //UPDATE
    app.put("/api/pet/:id", PetController.updatePet)

    //DELETE
    app.delete("/api/pet/delete/:id", PetController.deletePet)

    //LIKES
    app.put('/api/like/:_id', PetController.likePet);
}