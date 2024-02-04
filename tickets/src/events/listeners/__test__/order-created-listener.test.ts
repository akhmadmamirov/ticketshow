import { OrderCreatedEvent, OrderStatus } from "akhmadillobekcommon";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper"
import { OrderCreatedListener } from "../order-created-listener"
import mongoose, { set } from "mongoose";
import { Message } from "node-nats-streaming";

const setup = async () => {
  //Create the instance of the listner
  const listener = new OrderCreatedListener(natsWrapper.client);

  //Create and save ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 99,
    userId: "sdfsdfsdf"
  })

  await ticket.save()

  //create fake data object
  const data: OrderCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: 'sdfdsfs',
    expiresAt: 'adsf',
    ticket: {
        id: ticket.id,
        price: ticket.price,
    }
  }

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn()
  }

  return { listener, data, msg, ticket }
}

it("sets the userId of the ticket", async () => {
  const { listener, ticket, data, msg } = await setup()

  await listener.onMessage(data, msg)

  const updatedTicket = await Ticket.findById(ticket.id)

  expect(updatedTicket!.orderId).toEqual(data.id)
})

it("acks the message", async () => {
  const { listener, ticket, data, msg } = await setup()

  await listener.onMessage(data, msg)

  expect(msg.ack).toHaveBeenCalled()
})

it("publishes a ticket updated event", async () => {
  const { ticket, data, msg, listener } = await setup()

  await listener.onMessage(data, msg)

  expect(natsWrapper.client.publish).toHaveBeenCalled()
})