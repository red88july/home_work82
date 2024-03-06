import { Request, Response, NextFunction } from "express";
import { HydratedDocument } from "mongoose";

import User from "../models/User";
import { UserDataExtendsSchema } from "../types";

export interface RequestUser extends Request {
    user?: HydratedDocument<UserDataExtendsSchema>
}

const findUser = async (req: RequestUser, res: Response, next: NextFunction) => {

    const headerValue = req.get( 'Authorization' );

    if (!headerValue) {
        return next();
    }

    const [_bearer, token] = headerValue.split(' ');

    const user = await User.findOne({token});

    if (!user) {
        return next();
    }

    req.user = user;
    next();

}

export default findUser;