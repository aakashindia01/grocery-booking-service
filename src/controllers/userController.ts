import { Request, Response } from 'express';
import { User } from '../models/user'

class UserController {
    public async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async createUser(req: Request, res: Response) {
        try {
            const { username, email } = req.body;
            const user = await User.create({ username, email });
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default new UserController();