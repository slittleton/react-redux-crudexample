 import _ from 'lodash';
import {
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from '../actions/types';
// import streams from '../apis/streams';


export default (state = {}, action) =>{
  switch (action.type) {
    case FETCH_STREAMS: // lodash func mapKeys takes an array and returns an object
    return { ...state, ..._.mapKeys(action.payload, 'id')} // creates an object with ids {"1":{"id":1}}
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM: //the payload is the id in this case
      return _.omit(state, action.payload);// uses omit func from lodash library 
    default: 
      return state;
  }

}

