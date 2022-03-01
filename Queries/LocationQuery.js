const { locations } = require("../data");


const locationQuery = (parent, args, context, info) => {
    const location = locations.find(location => location.id === args.id);
    if(!location){
        throw Error("Location not found")
    }
    return location;}


module.exports = {
    locationQuery,
    
}