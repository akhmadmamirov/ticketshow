import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, 
  validateRequest, BadRequestError, 
  NotFoundError, NotAuthorizedError, OrderStatus 
} from "akhmadillobekcommon";
import { Order } from "../models/order";

const router = express.Router();

router.post("/api/payments",
  requireAuth, 
  [
    body("token")
      .not()
      .isEmpty(),
    body("orderId")
      .not()
      .isEmpty()
  ],
  validateRequest,
  async ( req: Request, res : Response ) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId)

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("Can not pay for cancelled order");
    }

    res.send({ succes: true })
})  

export {router as createChargeRouter}