const { locations, events, participants, users } = require("../data");

const deleteUser = (parent, args) => {
    const userIndex = users.findIndex(user => user.id === args.id);
    if (userIndex === -1) {
        throw new Error("User not found");
    }
    const deletedUser = users[userIndex];
    users.splice(userIndex, 1);
    return deletedUser;
}

const deleteAllUsers = () => {
    users.splice(0, users.length);
    return users;
}

const deleteEvent = (parent, args) => {
    const eventIndex = events.findIndex(event => event.id === args.id);
    if (eventIndex === -1) {
        throw new Error("Event not found");
    }
    const deletedEvent = events[eventIndex];
    events.splice(eventIndex, 1);
    return deletedEvent;
}

const deleteAllEvents = () => {
    events.splice(0, events.length);
    return events;
}

const deleteLocation = (parent, args) => {
    const locationIndex = locations.findIndex(location => location.id === args.id);
    if (locationIndex === -1) {
        throw new Error("Location not found");
    }
    const deletedLocation = locations[locationIndex];
    locations.splice(locationIndex, 1);
    return deletedLocation;
}
const deleteAllLocations = () => {
    locations.splice(0, locations.length);
    return locations;
}
const deleteParticipant = (parent, args) => {
    const participantIndex = participants.findIndex(participant => participant.id === args.id);
    if (participantIndex === -1) {
        throw new Error("Participant not found");
    }
    const deletedParticipant = participants[participantIndex];
    participants.splice(participantIndex, 1);
    return deletedParticipant;
}
const deleteAllParticipants = () => {
    participants.splice(0, participants.length);
    return participants;
}


module.exports = {
    deleteUser,
    deleteAllUsers,
    deleteEvent,
    deleteAllEvents,
    deleteLocation,
    deleteAllLocations,
    deleteParticipant,
    deleteAllParticipants
}



