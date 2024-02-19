const commentarySchema = new mongoose.Schema({
    match: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match',
    },
    ballNumber: {
        type: Number,
        required: true,
    },
    batsman: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
    },
    bowler: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
    },
    runsScored: {
        type: Number,
    },
    extras: {
        type: Number,
    },
    dismissal: {
        type: String,
    },
    comment: {
        type: String,
    },
});

 const Comment =mongoose.model('Comment',commentarySchema);

 export default Comment;