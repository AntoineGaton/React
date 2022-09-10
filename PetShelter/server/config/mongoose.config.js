const mongoose = require('mongoose');

//MONGOOSE CONNECTION
const db_name = "belt-exam-pet-shelter-db"
mongoose.connect(`mongodb://localhost/${db_name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Found the mongoose!'))
    .catch(err => console.log('Cannot find the mongoose!', err));