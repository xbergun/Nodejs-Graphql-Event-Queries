const { events } = require("../data");


const eventQuery = (parent, args, context, info) => {
    const event = events.find(event => event.id === args.id);
    if(!event){
        throw Error("Event not found")
    }
    return event;
}

const eventLocationQuery = (parent) => {
    return locations.find(location => location.id === parent.location_id);

}

const eventParticipantsQuery = (parent) => {
    return participants.filter(
        participant => participant.event_id === parent.id
      );
}
module.exports = {
    eventQuery,
    eventLocationQuery,
    eventParticipantsQuery
}