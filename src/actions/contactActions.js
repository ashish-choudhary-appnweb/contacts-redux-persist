import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  GET_CONTACT,
  UPDATE_CONTACT
} from './types';

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0
    var v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}


export const getContacts = () => async dispatch => {
  dispatch({
    type: GET_CONTACTS,
  });
};

export const getContact = id => async dispatch => {
  dispatch({
    type: GET_CONTACT,
    payload: id
  });
};

export const addContact = contact => async dispatch => {
  dispatch({
    type: ADD_CONTACT,
    payload: {...contact, id: uuidv4()}
  });
};

export const deleteContact = id => async dispatch => {
  dispatch({
    type: DELETE_CONTACT,
    payload: id
  });
};

export const updateContact = contact => async dispatch => {
  dispatch({
    type: UPDATE_CONTACT,
    payload: contact
  });
};
