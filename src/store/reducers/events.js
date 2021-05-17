//import posible dummy data later?
import {DELETE_EVENT, ADD_EVENT, UPDATE_EVENT,PULL_CURRENT_EVENTS} from '../actions/events'
import Event from '../../../models/Event'

import moment from 'moment'


const isToday = (evt,currentDateStart,currentDateEnd) => {return moment(evt.timeStamp.startDateObj).isBetween(currentDateStart, currentDateEnd) ||  moment(evt.timeStamp.endDateObj).isBetween(currentDateStart, currentDateEnd) || ( moment(evt.timeStamp.startDateObj).isSame(currentDateStart) ||  moment(evt.timeStamp.endDateObj).isSame(currentDateEnd))}

const initialState = {
  allEvents: [],
  todaysEvents:[]//now includes 3 days, current,before and after
}


export default  (state = initialState, action) => {
    let currentDateStart = moment().hour(0).minute(0).add(moment().utcOffset(),"m").subtract(1,'d')
    let currentDateEnd = moment().hour(23).minute(59).add(moment().utcOffset(),"m").add(1,'d')
  switch (action.type){
    case ADD_EVENT:
      console.log('reducer start',currentDateStart,currentDateEnd)
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
      let tempArray3 = state.todaysEvents ? state.todaysEvents : []
      let updatedArray = tempArray3.concat(newEvent)

      return{
        ...state,
        allEvents: allEvents.concat(newEvent),
        todaysEvents:updatedArray ? updatedArray : tempArray3
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
      let tempArray = state.allEvents.filter(evt => evt.id !== action.eid)
      let tempArray2 = state.todaysEvents ? state.todaysEvents.filter(evt => evt.id !== action.eid) : tempArray.filter((evt)=>isToday(evt, currentDateStart, currentDateEnd))
    return{
      ...state,
      allEvents: [...tempArray],
      todaysEvents: [...tempArray2]

    }
    case PULL_CURRENT_EVENTS:
      currentDateStart = action.day ? moment(action.day).clone().hour(0).minute(0).add(moment().utcOffset(),"m").subtract(1,'d') : currentDateStart
      currentDateEnd = action.day ? moment(action.day).clone().hour(23).minute(59).add(moment().utcOffset(),"m").add(1,'d') : currentDateEnd
      console.log("inside pull current event",currentDateStart,currentDateEnd,moment(action.day).add(moment().utcOffset(),"m").date())
      let todaysEvents = state.allEvents.filter((evt)=>isToday(evt, currentDateStart, currentDateEnd))
      return{
        ...state,
        todaysEvents: todaysEvents
      }
  }
  return state;
}
