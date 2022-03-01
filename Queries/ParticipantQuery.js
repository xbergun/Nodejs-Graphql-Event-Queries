const { participants } = require("../data");


const participantQuery = (parent, args, context, info) => {
    const participant = participants.find(participant => participant.id === args.id);
            if(!participant){
                throw Error("Participant not found")
            }
            return participant;
}


module.exports = {
    participantQuery,

}