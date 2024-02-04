import { Ticket } from "../../../models/ticket"
import { ticketUpdatedListener } from "../ticket-updated-listener"
import { TicketUpdatedEvent } from "akhmadillobekcommon"
import { natsWrapper } from "../../../nats-wrapper"
import mongoose from "mongoose"


const setup = async () => {
  //Create a listener
  const listener = new ticketUpdatedListener(natsWrapper.client)

  //Create and save a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20
  }) 

  await ticket.save()
  
  //Creat a fake data
  const data: TicketUpdatedEvent["data"] = {
    id : ticket.id,
    version: ticket.version + 1,
    title: "updated title",
    price: 25,
    userId: "adsfsfsd"
  }

  //Create a fake msg object
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn()
  }

  //return all
  return { listener, ticket, data, msg }
}

it("finds, updates, and saves a ticket", async () => {
  const {msg, data, ticket, listener } = await setup()

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id)

  expect(updatedTicket!.title).toEqual(data.title)
  expect(updatedTicket!.price).toEqual(data.price)
  expect(updatedTicket!.version).toEqual(data.version)
})


it("acks the message", async () => {
  
  const { msg, data, listener } = await setup()

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
})


it("does not ack for a skipped version of the ticket", async () => {
  const { data, msg, listener, ticket } = await setup();

  data.version = 10

  try{
    await listener.onMessage(data, msg);
  }
  catch(err) {
    
  }
  

  expect(msg.ack).not.toHaveBeenCalled();
})
