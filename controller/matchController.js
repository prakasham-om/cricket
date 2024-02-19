// controllers/matchController.js
import Match from '../models/MatchScema.js';

export const getAllMatches = async (req, res) => {
    try {
        const matches = await Match.find();
        res.json(matches);
    } catch (error) {
        console.error('Error fetching matches:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createMatch = async (req, res) => {
    try {
        // Check if the user is an admin
        if (req.user && req.user.role === 'admin') {
            const { teams, venue, date } = req.body;

            // Check if both teams exist
            if (teams.length !== 2) {
                return res.status(400).json({ error: 'A match must have exactly two teams' });
            }

            const newMatch = new Match({ teams, venue, date });
            await newMatch.save();
            res.json(newMatch);
        } else {
            res.status(403).json({ error: 'Forbidden: Admin access required' });
        }
    } catch (error) {
        console.error('Error creating match:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateMatch = async (req, res) => {
    const matchId = req.params.matchId;
    try {
        // Check if the user is an admin
        if (req.user && req.user.role === 'admin') {
            const match = await Match.findByIdAndUpdate(matchId, req.body, { new: true });
            if (!match) {
                return res.status(404).json({ error: 'Match not found' });
            }
            res.json(match);
        } else {
            res.status(403).json({ error: 'Forbidden: Admin access required' });
        }
    } catch (error) {
        console.error('Error updating match:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteMatch = async (req, res) => {
    const matchId = req.params.matchId;
    try {
        
        if (req.user && req.user.role === 'admin') {
            const match = await Match.findByIdAndRemove(matchId);
            if (!match) {
                return res.status(404).json({ error: 'Match not found' });
            }
            res.json({ success: true });
        } else {
            res.status(403).json({ error: 'Forbidden: Admin access required' });
        }
    } catch (error) {
        console.error('Error deleting match:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
