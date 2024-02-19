// models/Team.js
import mongoose from 'mongoose';
import Player from './playerModel.js'; 

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
    },
    coach: {
        type: String,
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
    }],
    foundedYear: {
        type: Number,
    },
    homeGround: {
        type: String,
    },
});


teamSchema.statics.populatePlayersByCountry = async function () {
    try {
        const teams = await this.find();
        for (const team of teams) {
            const players = await Player.find({ country: team.name });
            const playerIdsToAdd = players.map(player => player._id);
            const existingPlayerIds = team.players.map(player => player.toString());

            // Add player IDs to the team's players property
            const newPlayerIds = playerIdsToAdd.filter(playerId => !existingPlayerIds.includes(playerId.toString()));
            team.players.push(...newPlayerIds);
            await team.save();
        }
        console.log('Players populated for all teams successfully');
    } catch (error) {
        console.error('Error populating players for teams:', error);
    }
};

const Team = mongoose.model('Team', teamSchema);

export default Team;
