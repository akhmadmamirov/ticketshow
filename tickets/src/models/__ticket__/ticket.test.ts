import { Ticket } from "../ticket";

it("implements an optimistic concurrency control", async() => {
  //Create an instance of a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 5,
    userId: "2423"
  })
  //Save the ticket to the database
  await ticket.save()

  //fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id)
  const secondInstance = await Ticket.findById(ticket.id)

  //make the two separtate changes to the tickets fetched
  firstInstance!.set({ price: 10 })
  secondInstance!.set({ price: 15})

  //save the first fetched ticket
  await firstInstance!.save()

   // save the second fetched ticket and expect an error
  try {
    await secondInstance!.save();
  } catch (err) {
    return;
  }
  throw new Error("Should not reach this point")
})