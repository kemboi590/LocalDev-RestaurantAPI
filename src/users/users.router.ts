import { Hono } from 'hono'
import { getUsersController, getUserByIdController, createUserController, updateUserController, deleteUserController } from './users.controller'
import { zValidator } from '@hono/zod-validator';
import { userSchema } from '../validators';

export const userRouter = new Hono()

// get all users
userRouter
    .get("users", getUsersController)
    .post("users", zValidator('json', userSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), createUserController)

// get user by id
userRouter
    .get("users/:id", getUserByIdController)
    .put("users/:id", zValidator('json', userSchema, (result, c) => {
        if (!result.success) {
            return c.json(result.error, 400);
        }
    }), updateUserController)
    .delete("users/:id", deleteUserController)