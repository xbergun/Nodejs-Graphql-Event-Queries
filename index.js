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

const typeDefs = gql`
type User {
  id: ID!
  username: String!
  email: String!
  events: [events]!
  
}
type events {
  id: ID!
  title: String!
  desc: String!
  date: String!
  from: String!
  to: String!
  location_id: String!
  user_id: String!
  location: locations
  participants: [participants]!
  user: User
}
type locations {
  id: ID!
  name: String!
  desc: String!
  lat: String!
  lng: String!
}

type participants {
  id: ID!
  user_id: String!
  event_id: String!
}

type Query {
   # users
   users: [User!]!
   user (id: ID!): User!

  # events
  events: [events!]!
  event(id: ID!): events!

  # locations
  locations: [locations!]!
  location(id: ID!): locations

  # participants
  participants: [participants!]!
  participant(id: ID!): participants
 
}
type Mutation {
  # users
  createUser(username: String!, email: String!): User!

  updateUser(id: ID!, username: String!, email: String!, password: String!): User!
  
  deleteUser(id: ID!): User!
  deleteAllUsers: [User!]!
  
  # events
  createEvent(title: String!, desc: String!, date: String!, from: String!, to: String!, location_id: String!, user_id: String!): events!

  updateEvent(id: ID!, title: String!, desc: String!, date: String!, from: String!, to: String!, location_id: String!, user_id: String!): events!

  deleteEvent(id: ID!): events!
  deleteAllEvents: [events!]!

  # locations
  createLocation(name: String!, desc: String!, lat: String!, lng: String!): locations!

  updateLocation(id: ID!, name: String!, desc: String!, lat: String!, lng: String!): locations!

  deleteLocation(id: ID!): locations!
  deleteAllLocations: [locations!]!

  # participants
  createParticipant(user_id: String!, event_id: String!): participants!

  updateParticipant(id: ID!, user_id: String!, event_id: String!): participants!

  deleteParticipant(id: ID!): participants!
  deleteAllParticipants: [participants!]!



}
`;

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
    user: (parent, args) => {
      const user = users.find(user => user.id === args.id);
      if(!user){
          throw Error("User not found")
      }
      return user;
  },
    

    //! Events Queries
    events: () => events,
    event: (parent, args, context, info) => {
      const event = events.find(event => event.id === args.id);
      if(!event){
          throw Error("Event not found")
      }
      return event;
  },

    //! Locations Queries
    locations: () => locations,
    location: (parent, args, context, info) => {
      const location = locations.find(location => location.id === args.id);
      if(!location){
          throw Error("Location not found")
      }
      return location},

    //! Participants Queries
    participants: () => participants,
    participant:  (parent, args, context, info) => {
      const participant = participants.find(participant => participant.id === args.id);
              if(!participant){
                  throw Error("Participant not found")
              }
              return participant;
  }
  
  },
  User: {
    events: (parent) => {
      return events.filter(event => event.user_id === parent.id);
  
  },
  },
  events: {
    location: (parent) => {
      return locations.find(location => location.id === parent.location_id);
  
  },
    participants: (parent) => {
      return participants.filter(
          participant => participant.event_id === parent.id
        );
  },
    user:(parent) => {
      return users.find(user => user.id === parent.user_id);
    }
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
