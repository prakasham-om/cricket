import mongoose from "mongoose";
const matchSchema = new mongoose.Schema({
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    }],
    venue: {
        type: String,
    },
    date: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['Upcomming', 'In Progress', 'Completed'],
        default: 'Upcomming',
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    },
    result: {
        type: String,
    },
});

const Match=mongoose.model('Match',matchSchema);

export default Match;