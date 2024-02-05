import { ExpirationCompleteListener } from "../expiration-complete-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Order } from "../../../models/order";
import { Ticket } from "../../../models/ticket";
import mongoose, { set } from "mongoose";
import { OrderStatus, ExpirationCompleteEvent } from "akhmadillobekcommon";
import { Message } from "node-nats-streaming";

const setup = async () => {
  const listener = new ExpirationCompleteListener(natsWrapper.client)

  const ticket = Ticket.build({
    id : new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20
  })

  await ticket.save();

  const order = Order.build({
    status: OrderStatus.Created,
    userId: "sdfasdfs",
    expiresAt: new Date(),
    ticket
  })

  await order.save();

  const data: ExpirationCompleteEvent["data"] = {
    orderId: order.id
  }

  //@ts-ignore
  const msg : Message = {
    ack: jest.fn()
  };

  return { listener, ticket, data, msg, order }
}

it("updates the order status to cancelled", async () => {
  const { listener, data, msg, order } = await setup()

  await listener.onMessage(data, msg)

  const updatedOrder = await Order.findById(order.id)

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled)
})


it("emits order cancelled event", async () => {
  const { listener, data, msg, order } = await setup()

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled()

  const eventData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[1][1]);
  
  expect(eventData.id).toEqual(order.id);
})


it("acks the message",async () => {
  const { listener, ticket, data, msg, order } = await setup()

  await listener.onMessage(data, msg)

  expect(msg.ack).toHaveBeenCalled();
})