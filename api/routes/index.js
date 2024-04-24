import express from "express";

const router = express.Router();

import {userRouterIndex} from "./ActualUsersRoutes/index.js";

router.use('/user', userRouterIndex)

export {router}