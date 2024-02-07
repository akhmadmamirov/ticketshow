import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Order } from "../../models/order";
import { OrderStatus } from "akhmadillobekcommon";
import { stripe } from "../../stripe";

jest.mock("../../stripe")

it("return 404 when purchasing order that does not exist", async () => {
  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin())
    .send({
      token: "dsfdsdf", 
      orderId: new mongoose.Types.ObjectId().toHexString()
    })
    .expect(404)
})

it("returns 401 when purchasing order that does not belong to the user", async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(), 
    version: 1, 
    userId: new mongoose.Types.ObjectId().toHexString(), 
    price: 45,
    status: OrderStatus.Created,
  })

  await order.save()

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin())
    .send({
      token: "dsfdsdf", 
      orderId: order.id
    })
    .expect(401)

})

it("return 400 when purchasing a cancelled order", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString()

  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(), 
    version: 1, 
    userId, 
    price: 45,
    status: OrderStatus.Cancelled,
  })

  await order.save()

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin(userId))
    .send({
      token: "dsfdsdf", 
      orderId: order.id
    })
    .expect(400)
})

it("returns 204 with valid inputs", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString()

  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(), 
    version: 1, 
    userId, 
    price: 45,
    status: OrderStatus.Created,
  })

  await order.save()

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin(userId))
    .send({
      token : "tok_visa",
      orderId: order.id
    })
    .expect(201)

  const chargeOptions = ( stripe.charges.create as jest.Mock ).mock.calls[0][0];

  expect(chargeOptions.source).toEqual('tok_visa')
  expect(chargeOptions.amount).toEqual(4500)
  expect(chargeOptions.currency).toEqual("usd")
})

