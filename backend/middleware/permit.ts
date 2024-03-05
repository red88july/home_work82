import {NextFunction, Response} from "express";
import {RequestUser} from "./auth";

const permit = (...roles: string[]) => {
    return async (req: RequestUser, res: Response, next: NextFunction) => {
        if(!req.user) {
            return res.status(401).send({message: 'Not authenticated'});
        }

        if(!roles.includes(req.user.role)) {
            return res.status(403).send({error: 'Not authorized'});
        }

        next();
    }
};

export default permit;