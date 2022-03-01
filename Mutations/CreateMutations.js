const { locations, events, participants, users } = require("../data");

const createUser = (parent, {username, email}, context, info) => {
    const user = {
        id: users.length + 1,
        username,
        email,
      
      };
      users.push(user);
      return user;
}

const createEvent = (parent, {title,desc,date,from,to,location_id, user_id}, context, info) => {
    const event = {
        id: events.length + 1,
        title,
        desc,
        date,
        from,
        to,
        location_id,
        user_id,
      };
      events.push(event);
      return event;
}
const createLocation = (parent, {name, desc, lat, lng}, context, info) => {
    const location = {
        id: locations.length + 1,
        name,
        desc,
        lat,
        lng,
      };
      locations.push(location);
      return location;
}
const createParticipant = (parent, {user_id, event_id}, context, info) => {
    const participant = {
        id: participants.length + 1,
        user_id,
        event_id,
      };
      participants.push(participant);
      return participant;
}

module.exports = {
    createUser,
    createEvent,
    createLocation,
    createParticipant
}