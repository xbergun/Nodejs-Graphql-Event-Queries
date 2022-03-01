const { gql } = require("apollo-server");


const typeDefsQuery =gql`
type User {
  id: ID!
  username: String!
  email: String!
  events: [events!]!
  
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
  location: locations!
  participants: [participants!]!
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
  
  # events
  createEvent(title: String!, desc: String!, date: String!, from: String!, to: String!, location_id: String!, user_id: String!): events!

  updateEvent(id: ID!, title: String!, desc: String!, date: String!, from: String!, to: String!, location_id: String!, user_id: String!): events!

  deleteEvent(id: ID!): events!

  # locations
  createLocation(name: String!, desc: String!, lat: String!, lng: String!): locations!

  updateLocation(id: ID!, name: String!, desc: String!, lat: String!, lng: String!): locations!

  deleteLocation(id: ID!): locations!

  # participants
  createParticipant(user_id: String!, event_id: String!): participants!

  updateParticipant(id: ID!, user_id: String!, event_id: String!): participants!

  deleteParticipant(id: ID!): participants!



}
`;

module.exports = {typeDefsQuery};