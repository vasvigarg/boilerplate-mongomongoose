require('dotenv').config();

//install and setup mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//create a model
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
let Person = mongoose.model("Person", personSchema);

//create and save a record of a model
const createAndSavePerson = function(done) {
  const janeFonda = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});
  janeFonda.save( function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

//create many records with model.create()
const arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];
const createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function(err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

//use model.find() to search your database
const findPeopleByName = function(personName, done) {
  Person.find({name: personName}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

//use model.findOne() to return a single matching document from your database
const findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

//use model.findById() to search your database by _id
const findPersonById = function(personId, done) {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

//perform classic updates by running find, edit, then save
const findEditThenSave = function(personId, done) {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, person) {
    if(err) return console.log(err); 
    person.favoriteFoods.push(foodToAdd);
    person.save( function(err, updatedPerson) {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

//perform new updates on a document using model.findOneAndUpdate()
const findAndUpdate = function(personName, done) {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function(err, updatedDoc) {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

//delete one document using model.findByIdAndRemove
const removeById = function(personId, done) {
  Person.findByIdAndRemove(
    personId,
    function(err, removedDoc) {
      if(err) return console.log(err);
      done(null, removedDoc);
    }
  ); 
};

//delete many documents with model.remove()
const removeManyPeople = function(done) {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, response) {
    if(err) return console.log(err);
    done(null, response);
  })
};

//chain search query helpers to narrow search results
const queryChain = function(done) {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods : foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec(function(err, people) {
      if(err) return console.error(err);
      done(null, people);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
