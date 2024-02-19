// controllers/playerController.js
import Player from '../models/playerModel.js';

export const getAllPlayers = async (req, res) => {
    try {
        const players = await Player.find();
        res.json(players);
    } catch (error) {
        console.error('Error fetching players:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createPlayer = async (req, res) => {
    try {
        // Check if the user is an admin
        if (req.user && req.user.role === 'admin') {
            const newPlayer = new Player(req.body);
            await newPlayer.save();
            res.json(newPlayer);
        } else {
            res.status(403).json({ error: 'Forbidden: Admin access required' });
        }
    } catch (error) {
        console.error('Error creating player:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updatePlayer = async (req, res) => {
    const playerId = req.params.playerId;
    try {
        // Check if the user is an admin
        if (req.user && req.user.role === 'admin') {
            const player = await Player.findByIdAndUpdate(playerId, req.body, { new: true });
            if (!player) {
                return res.status(404).json({ error: 'Player not found' });
            }
            res.json(player);
        } else {
            res.status(403).json({ error: 'Forbidden: Admin access required' });
        }
    } catch (error) {
        console.error('Error updating player:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deletePlayer = async (req, res) => {
    const playerId = req.params.playerId;
    try {
        // Check if the user is an admin
        if (req.user && req.user.role === 'admin') {
            const player = await Player.findByIdAndRemove(playerId);
            if (!player) {
                return res.status(404).json({ error: 'Player not found' });
            }
            res.json({ success: true });
        } else {
            res.status(403).json({ error: 'Forbidden: Admin access required' });
        }
    } catch (error) {
        console.error('Error deleting player:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
