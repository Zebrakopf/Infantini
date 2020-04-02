export const DELETE_TAG = 'DELETE_TAG'
export const ADD_TAG = 'ADD_TAG'

export const deleteTag = (name, category) => {
  return { type: DELETE_TAG, tagData:{
    name: name,
    category: category
  }}
}

//qualifier could for example be inesity with crying or kind of feeding in food or ease of falling asleep
export const addTag = (name, category) =>{
  return {type: ADD_TAG, tagData:{
    name: name,
    category: category
  }}
}
