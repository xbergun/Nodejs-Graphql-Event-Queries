const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const { locations, events, participants, users } = require("./data");

const {
  createUser,
  createEvent,
  createLocation,
  createParticipant,
} = require("./mutations/CreateMutations");

const { userQuery, userEventQuery } = require("./queries/UserQuery");
const {
  eventQuery,
  eventLocationQuery,
  eventParticipantsQuery,
} = require("./queries/EventQuery");
const { locationQuery } = require("./queries/LocationQuery");
const { participantQuery } = require("./queries/ParticipantQuery");

const {deleteUser,
  deleteAllUsers,
  deleteEvent,
  deleteAllEvents,
  deleteLocation,
  deleteAllLocations,
  deleteParticipant,
  deleteAllParticipants
} = require("./mutations/DeleteMutations");





const { typeDefsQuery } = require("./typeDefs");

const typeDefs = typeDefsQuery;

const resolvers = {
  Mutation: {
    //! Create Mutations
    createUser: createUser,
    deleteUser: deleteUser,
    deleteAllUsers: deleteAllUsers,
    createEvent: createEvent,
    deleteEvent: deleteEvent,
    deleteAllEvents: deleteAllEvents,
    createLocation: createLocation,
    deleteLocation: deleteLocation,
    deleteAllLocations: deleteAllLocations,
    createParticipant: createParticipant,
    deleteParticipant: deleteParticipant,
    deleteAllParticipants: deleteAllParticipants
  },

  Query: {
    //! User Queries
    users: () => users,
    user: userQuery,
    

    //! Events Queries
    events: () => events,
    event: eventQuery,

    //! Locations Queries
    locations: () => locations,
    location: locationQuery,

    //! Participants Queries
    participants: () => participants,
    participant: participantQuery,
  },
  User: {
    events: userEventQuery,
  },
  events: {
    location: eventLocationQuery,
    participants: eventParticipantsQuery,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      // options
    }),
  ],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
