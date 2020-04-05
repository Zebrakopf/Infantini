//import posible dummy data later?
import {DELETE_EVENT, ADD_EVENT, UPDATE_EVENT} from '../actions/events'
import Event from '../../../models/Event'


const initialState = {
  allEvents: []
}


export default  (state = initialState, action) => {
  switch (action.type){
    case ADD_EVENT:
      console.log("reducer info",
      action.eventData.category,
      action.eventData.start,
      action.eventData.duration,
      action.eventData.qualifier,
      action.eventData.intensity,
      action.eventData.fallAsleep,
      action.eventData.success,
      action.eventData.description,
      action.eventData.size,
      action.eventData.timeStamp
      )
      let allEvents = [...state.allEvents]
      const newEvent = new Event(new Date().toString(),
                                  action.eventData.category,
                                  action.eventData.start,
                                  action.eventData.duration,
                                  action.eventData.qualifier,
                                  action.eventData.intensity,
                                  action.eventData.fallAsleep,
                                  action.eventData.success,
                                  action.eventData.description,
                                  action.eventData.size,
                                  action.eventData.timeStamp)
      return{
        allEvents: allEvents.concat(newEvent),
      }
    case UPDATE_EVENT:
      const eventIndex = state.allEvents.findIndex(evt => evt.id === action.eid)
      const updatedEvent =new Event(new Date().toString(),
                                  action.eventData.category,
                                  action.eventData.start,
                                  action.eventData.duration,
                                  action.eventData.qualifier,
                                  action.eventData.intensity,
                                  action.eventData.fallAsleep,
                                  action.eventData.success,
                                  action.eventData.description,
                                  action.eventData.size,
                                  action.eventData.timeStamp)

      const updatedEvents = [...state.allEvents]
      updatedEvents[eventIndex] = updatedEvent

      return{
        ...state,
        allEvents: updatedEvents,
      }
    case DELETE_EVENT:
      console.log("attempts delete", action.eid)
    return{
      allEvents: state.allEvents.filter(evt => evt.id !== action.eid)

    }
  }
  return state;
}
