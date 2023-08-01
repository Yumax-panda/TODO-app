import { Request, Response, Router } from 'express';

import { authenticate, createUser } from '../models/user';

const router = Router();

router.post("/create", async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;
        const user = await createUser({ name, email, password });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.post("/authenticate", async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, password } = req.body;
        const user = await authenticate({ id, password });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

export default router;