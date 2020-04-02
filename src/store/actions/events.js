export const DELETE_EVENT = 'DELETE_EVENT'
export const ADD_EVENT = 'ADD_EVENT'
export const UPDATE_EVENT = 'UPDATE_EVENT'

export const deleteEvent = eventId => {
  return { type: DELETE_EVENT, eid: eventId}
}

//qualifier could for example be inesity with crying or kind of feeding in food or ease of falling asleep
export const addEvent = (category, start, duration, qualifier, description, size, timeStamp) =>{
  return {type: ADD_EVENT, eventData:{
    category,
    start,
    duration,
    qualifier,
    description,
    size,
    timeStamp
  }}
}

export const updateEvent = (id, category, start, duration, qualifier, description, size, timeStamp) =>{
  return {type: UPDATE_EVENT, eid: id, eventData:{
    category,
    start,
    duration,
    qualifier,
    description,
    size,
    timeStamp
  }}
}
