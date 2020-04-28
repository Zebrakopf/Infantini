export const DELETE_TAG = 'DELETE_TAG'
export const ADD_TAG = 'ADD_TAG'
export const REVERT_TAGS = 'REVERT_TAGS'

export const deleteTag = (name, category, defaultInfo) => {
  return { type: DELETE_TAG, tagData:{
    name: name,
    category: category,
    tagGroup:defaultInfo
  }}
}

//qualifier could for example be inesity with crying or kind of feeding in food or ease of falling asleep
export const addTag = (name, category, defaultInfo) =>{
  return {type: ADD_TAG, tagData:{
    name: name,
    category: category,
    tagGroup: defaultInfo
  }}
}

export const revertTags = () =>{
  return {type: REVERT_TAGS, tagData:{
  }}
}
