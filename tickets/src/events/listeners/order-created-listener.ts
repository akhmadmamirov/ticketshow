import { Listener, Subjects } from "akhmadillobekcommon";
import { OrderCreatedEvent } from "akhmadillobekcommon";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    // Find the ticket Order is reserving
    const ticket = await Ticket.findById(data.ticket.id)
    //If no ticket throw err
    if (!ticket) {
      throw new Error("Ticket not found")
    }
    //Mark the ticket being reserved by setting orderId
    ticket.set({ orderId: data.id})
    
    //Save the ticket
    await ticket.save()

    //Ack the message
    msg.ack()
  }
}