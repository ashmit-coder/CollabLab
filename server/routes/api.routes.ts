import { Router } from "express";
const router = Router();
import { createUser, validateUser } from "../database/data"
import * as jwt from "jsonwebtoken";

router.post("/login", async (req, res) => {
    const { password, email }: { password: string, email: string } = req.body;
    if (!password || !email) {
        return res.status(401).json({"success":false,"message":"Please provide all required fields"});
    }
    if(await validateUser(req.body)){
        
        const token = jwt.sign({ user: email }, (process.env.SECRET_KEY as string), { expiresIn: 60 * 60 })
        
        return res.status(200).json({
            "success": true,
            "message": "Login successful",
            "token": token
        });
    }

    return res.status(401).json({"success":false,"message":"Username or password incorrect"});
});

router.post("/register", async (req, res) => {

    const { password, email, name }: { password: string, email: string, name: string } = req.body;
    if (!password || !email || !name) {
        return res.status(401).json({
            "success": false,
            "message": "Provide required fields"
        });
    }
    try {

        if (await createUser({ password, name, email })) {

            const token = jwt.sign({ user: email }, (process.env.SECRET_KEY as string), { expiresIn: 60 * 60 })

            return res.status(200).json({
                "success": true,
                "message": "Registered successful",
                "token": token
            });
        }

        else
            throw new Error("Failed to register");
    }
    catch (err: any) {
        return res.status(401).json({
            "success": false,
            "message": (err as Error).message
        });
    }

});

export default router;