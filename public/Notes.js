import _ from 'lodash';

// Array Based Approach
const streamReducer = (state=[], action) => {
  switch (action.type) {
    case 'EDIT_STREAM':
      return state.map(stream => {
        if(stream.id === action.payload.id) {
          return action.payload;
        }else {
          return stream
        }
      })
    default: return state
  }
};


// Object Based Approach
const streamReducer = (state={}, action) => {
  switch (action.type) {
    case 'EDIT_STREAM':
      // const newState = {...state};
      // newState[action.payload.id] = action.payload;
      // return newState;
      return {...state, [action.payload.id]: action.payload}
    default: return state;
  }
}


// Using key interpolation syntax, the [] below is not an Array
// it is used to make a key out of a value when the code is run since
// it doesnt know what the key will be until that time
// return {...state, [action.payload.id]: action.payload}

/* alternate example of key interpolation

const animalSounds = { cat: 'meow', dog: 'bark' };
const animal = 'lion';
const sound = 'roar';
{ ...animalsounds, [animal]: sound }
console.log(animalSounds) // returns { cat: 'meow', dog: 'bark', lion: 'roar' }

*/



// Using mapKeys from lodash library
const colors = [
  { hue: 'green' },
  { hue: 'yellow' },
  { hue: 'blue' }
];
const ids = [
  { id: 2 },
  { id: 4 },
  { id: 7 }
]

_.mapKeys(colors, 'hue') 
/*
{
 "green":{"hue":"green"},
 "yellow":{"hue":"yellow"},
 "blue":{"hue":"blue"}
}
*/


_.mapKeys(ids, 'id') 
/*
{
  "2":{"id":2},
  "4":{"id":4},
  "7":{"id":7}
}
*/