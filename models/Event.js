
export default class Event{
  constructor(id, category, start, duration, qualifier, description, size, timeStamp){
    this.id = id
    this.category = category
    this.startTime = start
    this.end = start + duration
    this.duration = duration
    this.qualifier = qualifier
    this.description = description
    this.size = size
    this.timeStamp = timeStamp
  }
}
