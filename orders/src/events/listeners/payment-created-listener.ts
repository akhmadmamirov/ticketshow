import { Subjects, Listener, PaymentCreatedEvent } from "akhmadillobekcommon";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { OrderStatus } from "akhmadillobekcommon";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;

  async onMessage( data: PaymentCreatedEvent["data"], msg: Message ) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.set({
      status: OrderStatus.Complete
    })

    await order.save();

    msg.ack();
  } 
}