// controllers/teamController.js
import Team from '../models/TeamSchema.js';

export const getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        res.json(teams);
    } catch (error) {
        console.error('Error fetching teams:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createTeam = async (req, res) => {
    try {
        if (req.user && req.user.role === 'admin') {
            const newTeam = new Team(req.body);
            await newTeam.save();
            res.json(newTeam);
        } else {
            res.status(403).json({ error: 'Forbidden: Admin access required' });
        }
    } catch (error) {
        console.error('Error creating team:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateTeam = async (req, res) => {
    const teamId = req.params.teamId;
    try {
        if (req.user && req.user.role === 'admin') {
            const team = await Team.findByIdAndUpdate(teamId, req.body, { new: true });
            if (!team) {
                return res.status(404).json({ error: 'Team not found' });
            }
            res.json(team);
        } else {
            res.status(403).json({ error: 'Forbidden: Admin access required' });
        }
    } catch (error) {
        console.error('Error updating team:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteTeam = async (req, res) => {
    const teamId = req.params.teamId;
    try {
        if (req.user && req.user.role === 'admin') {
            const team = await Team.findByIdAndRemove(teamId);
            if (!team) {
                return res.status(404).json({ error: 'Team not found' });
            }
            res.json({ success: true });
        } else {
            res.status(403).json({ error: 'Forbidden: Admin access required' });
        }
    } catch (error) {
        console.error('Error deleting team:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
