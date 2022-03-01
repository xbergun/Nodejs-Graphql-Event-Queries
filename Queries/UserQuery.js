const { users } = require("../data");


const userQuery = (parent, args, context, info) => {
    const user = users.find(user => user.id === args.id);
    if(!user){
        throw Error("User not found")
    }
    return user;
}

const userEventQuery = (parent) => {
    return events.filter(event => event.user_id === parent.id);

}


module.exports = {
    userQuery,
    userEventQuery
}