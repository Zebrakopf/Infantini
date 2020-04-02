import {DELETE_TAG, ADD_TAG} from '../actions/tags'


const initialState = {
  allTags: {
    cry: ["grumpy", "crying","outside"],
    sleep: ["loud noises","coffee"],
    soothing: ["Swaddle","Holding","Music","Walking",],
    diapers: ["Poop", "Pee"],
    food: ["Solid","Blended"],
    positives: []
  }
}


export default  (state = initialState, action) => {
  let tempState = state.allTags
  switch (action.type){
    case ADD_TAG:
      switch (action.tagData.category){
        case "Cry":
        tempState.cry =  state.allTags.cry.concat(action.tagData.name)
          break;
        case "Sleep":
        tempState.sleep = state.allTags.sleep.concat(action.tagData.name)
          break;
        case "Soothing":
        tempState.soothing = state.allTags.soothing.concat(action.tagData.name)
          break;
        case "Diapers":
        tempState.diapers = state.allTags.diapers.concat(action.tagData.name)
          break;
        case "Food":
        tempState.food = state.allTags.food.concat(action.tagData.name)
          break;
        case "Positives":
        tempState.positives = state.allTags.positives.concat(action.tagData.name)
          break;
      }
      return{
        ...state,
        allTags: state.allTags
      }
    case DELETE_TAG:
    let newState = {...state}
    switch (action.tagData.category){
      case "Cry":
        newState.allTags.cry =  state.allTags.cry.filter(evt => evt !== action.tagData.name)
        break;
      case "Sleep":
        newState.allTags.sleep = state.allTags.sleep.filter(evt => evt !== action.tagData.name)
        break;
      case "Soothing":
        newState.allTags.soothing = state.allTags.soothing.filter(evt => evt !== action.tagData.name)
        break;
      case "Diapers":
        newState.allTags.diapers = state.allTags.diapers.filter(evt => evt !== action.tagData.name)
        break;
      case "Food":
        newState.allTags.food = state.allTags.food.filter(evt => evt !== action.tagData.name)
        break;
      case "Positives":
        newState.allTags.positives = state.allTags.positives.filter(evt => evt !== action.tagData.name)
        break;
    }
      return{
        ...newState
      }
  }
  return state;
}
