// models/Player.js
import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Batsman', 'Bowler', 'All-Rounder', 'Wicketkeeper'],
        required: true,
    },
    battingStyle: {
        type: String,
        required: true,
    },
    bowlingStyle: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    debutDate: {
        type: Date,
    },
    matches: {
        type: Number,
        default: 0,
    },
    runs: {
        type: Number,
        default: 0,
    },
    wickets: {
        type: Number,
        default: 0,
    },
    average: {
        type: Number,
        default: 0,
    },
    strikeRate: {
        type: Number,
        default: 0,
    },
    highestScore: {
        type: Number,
        default: 0,
    },
});


playerSchema.pre('save', function (next) {
   
    if (this.matches > 0 && this.runs > 0) {
        this.average = this.runs / this.matches;
        this.strikeRate = (this.runs / this.matches) * 100;
    }


    next();
});

const Player = mongoose.model('Player', playerSchema);

export default Player;
