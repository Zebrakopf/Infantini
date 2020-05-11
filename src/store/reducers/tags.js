import {DELETE_TAG, ADD_TAG, REVERT_TAGS} from '../actions/tags'


const initialState = {
  allTags: {
    defaultTags:{
      cry: [],
      sleep: [],
      soothing: ["Swaddle","Holding","Music","Walking",],
      diapers: ["Poop", "Pee"],
      food: ["Solid","Blended"],
      positives: []
    },
    extraTags:{
      cry: ["grumpy", "crying","outside"],
      sleep: ["loud noises","coffee"],
      soothing: [],
      diapers: [],
      food: [],
      positives: []
    }

  }
}


export default  (state = initialState, action) => {
  let tempState = null
  switch (action.type){
    case ADD_TAG:
      if(action.tagData.tagGroup){
        tempState = state.allTags.defaultTags
      }else{
        tempState = state.allTags.extraTags
      }
      switch (action.tagData.category){
        case "Cry":
        tempState.cry =  tempState.cry.concat(action.tagData.name)
          break;
        case "Sleep":
        tempState.sleep = tempState.sleep.concat(action.tagData.name)
          break;
        case "Soothing":
        tempState.soothing = tempState.soothing.concat(action.tagData.name)
          break;
        case "Diapers":
        tempState.diapers = tempState.diapers.concat(action.tagData.name)
          break;
        case "Food":
        tempState.food = tempState.food.concat(action.tagData.name)
          break;
        case "Positives":
        tempState.positives = tempState.positives.concat(action.tagData.name)
          break;
      }
      return{
        ...state,
        allTags: {
          defaultTags: action.tagData.tagGroup ? tempState : state.allTags.defaultTags,
          extraTags: !action.tagData.tagGroup ? tempState : state.allTags.extraTags
        }
      }
    case DELETE_TAG:
      let newState = {...state}
        if(action.tagData.tagGroup){
          tempState = state.allTags.defaultTags
        }else{
          tempState = state.allTags.extraTags
        }
      switch (action.tagData.category){
        case "Cry":
          tempState.cry =  tempState.cry.filter(evt => evt !== action.tagData.name)
          break;
        case "Sleep":
          tempState.sleep = tempState.sleep.filter(evt => evt !== action.tagData.name)
          break;
        case "Soothing":
          tempState.soothing = tempState.soothing.filter(evt => evt !== action.tagData.name)
          break;
        case "Diapers":
          tempState.diapers = tempState.diapers.filter(evt => evt !== action.tagData.name)
          break;
        case "Food":
          tempState.food = tempState.food.filter(evt => evt !== action.tagData.name)
          break;
        case "Positives":
          tempState.positives = tempState.positives.filter(evt => evt !== action.tagData.name)
          break;
      }
        if(action.tagData.tagGroup){
          newState.allTags.defaultTags = tempState
        }else{
          newState.allTags.extraTags = tempState
        }
        return{
          ...newState
        }
      case REVERT_TAGS:
        return{
          ...initialState
        }
  }

  return state;
}
