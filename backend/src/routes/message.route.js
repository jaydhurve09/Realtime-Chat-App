import express from 'express';
import { getMessages, sendMessage, getUsersForSidebar } from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

// Apply protectRoute middleware to all message routes
router.use(protectRoute);

// Get all users for the sidebar
router.get('/users', getUsersForSidebar);

// Get messages with a specific user
router.get('/:id', getMessages);

// Send message to a user - make sure this matches your frontend request
router.post('/send/:id', sendMessage);

export default router;