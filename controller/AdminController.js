// controllers/adminController.js
import Admin from '../models/adminModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerAdmin = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const newAdmin = new Admin({ username, password, email });
        await newAdmin.save();
        res.json(newAdmin);
    } catch (error) {
        console.error('Error registering admin:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body)
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ username: username, role: 'admin' }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Set an appropriate expiration time
        });

        res.json({ token });
    } catch (error) {
        console.error('Error logging in admin:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
