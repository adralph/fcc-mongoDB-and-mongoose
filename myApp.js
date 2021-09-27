require('dotenv').config();
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
let personSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});
let arrayOfPeople = [
  {name: 'Garry', age: 35, favoriteFoods: ['fried chicken', 'chicken wings', 'chicken nuggets']},
  {name: 'Hannah', age: 24, favoriteFoods: ['watermelon', 'mango']},
  {name: 'Igor', age: 52, favoriteFoods: ['vegetable soup']}
]
let Person = mongoose.model('Person', personSchema);
let dave = new Person({
  name: 'Dave',
  age: 27,
  favoriteFoods: ['pizza','chips']
})

const createAndSavePerson = (done) => {
  let francesca = new Person({name: 'Francesca', age: 20, favoriteFoods: ['sushi', 'katsu']});
  francesca.save((error, data) => {
    if(error){
      console.log(error);
    }else{
      done(null, data);
    }
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error, createdPeople) => {
    if(error){
      console.log(error)
    }else{
      done(null,createdPeople);
    }
  });
};

Person.find({name: 'Kris'}, (error,data) => {
  if(error){
    console.log(error)
  }else{
    console.log(data)
  }
});
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (error,data) => {
    if(error){
      console.log(error)
    }else{
      done(null, data);
    }
  });
  
};

Person.findOne({favoriteFoods: {$all: ['prawns']}}, (error,data) => {
  if(error){
    console.log(error)
  }else{
    console.log(data)
  }
});
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: {$all: [food]}}, (error,data) => {
    if(error){
      console.log(error)
    }else{
      done(null, data);
    }
  });
};


const findPersonById = (personId, done) => {
  Person.findById(personId, (error,data)=> {
    if(error){
      console.log(error)
    }else{
      done(null,data)
    }
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (error,data)=> {
    if(error){
      console.log(error)
    }else{
      data.favoriteFoods.push(foodToAdd);
      data.save((error, updatedResult) => {
        if(error){
          console.log(erorr)
        }else{
          done(null,updatedResult)
        }
      })
    }
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (error, updatedRecord) => {
    if(error){
      console.log(error)
    }else{
      done(null,updatedRecord)
    }
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (error,deletedRecord) => {
    if(error){
      console.log(error)
    }else{
      done(null, deletedRecord)
    }
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (error, JSONStatus) => {
    if(error){
      console.log(error)
    }else{
      done(null,JSONStatus)
    }
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: {$all: foodToSearch}})
    .sort({name: 'asc'})
    .limit(2)
    .select('-age')
    .exec((error,filteredResults) => {
      if(error){
        console.log(error)
      }else{
        done(null, filteredResults)
      }
    })
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
