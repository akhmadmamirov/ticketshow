import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Order } from "../../models/order";
import { OrderStatus } from "akhmadillobekcommon";
import { stripe } from "../../stripe";
import { Payment } from "../../models/payment";


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
      orderId: order.id,
    })
    .expect(201)

    const chargedOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];
    const chargeResult = await (stripe.charges.create as jest.Mock).mock
      .results[0].value;
   
    expect(chargedOptions.source).toEqual('tok_visa');
    expect(chargedOptions.amount).toEqual(order.price * 100);
    expect(chargedOptions.currency).toEqual('usd');
   
    const payment = await Payment.findOne({
      orderId: order.id,
      stripeId: chargeResult.id,
    });
   
    expect(payment).toBeDefined();
    expect(payment!.orderId).toEqual(order.id);
    expect(payment!.stripeId).toEqual(chargeResult.id);
})

