// routes.js
import express from 'express';
import * as playerController from '../controller/playerController.js';
import * as teamController from '../controller/teamController.js';
import * as matchController from '../controller/matchController.js';
import * as adminController from '../controller/AdminController.js';
import { authenticateToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Player Routes
router.get('/players',playerController.getAllPlayers);
router.post('/players', authenticateToken, isAdmin, playerController.createPlayer);
router.put('/players/:playerId', authenticateToken, isAdmin, playerController.updatePlayer);
router.delete('/players/:playerId', authenticateToken, isAdmin, playerController.deletePlayer);

// Team Routes
router.get('/teams',  teamController.getAllTeams);
router.post('/teams', authenticateToken, isAdmin, teamController.createTeam);
router.put('/teams/:teamId', authenticateToken, isAdmin, teamController.updateTeam);
router.delete('/teams/:teamId', authenticateToken, isAdmin, teamController.deleteTeam);

// Match Routes
router.get('/matches',  matchController.getAllMatches);
router.post('/matches', authenticateToken, isAdmin, matchController.createMatch);
router.put('/matches/:matchId', authenticateToken, isAdmin, matchController.updateMatch);
router.delete('/matches/:matchId', authenticateToken, isAdmin, matchController.deleteMatch);

// Admin Routes
router.post('/admin/register', adminController.registerAdmin);
router.post('/admin/login', adminController.loginAdmin);

export default router;
