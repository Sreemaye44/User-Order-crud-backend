import express from 'express';
import { userController } from './user.controller';


const router=express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getAllUser);
router.get('/:userId', userController.getSingleUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);
router.put('/:userId/orders', userController.addOrder);
router.get("/:userId/orders", userController.getSingleUserOrder);
router.get("/:userId/orders/total-price", userController.getTotalPrice);


export const UserRoute=router;