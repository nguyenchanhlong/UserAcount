import express from "express";

import {userRouter} from "./PersonalInfomation/User.routes.js";

const userRouterIndex = express.Router();

userRouterIndex.use('/', userRouter);

export {userRouterIndex}
