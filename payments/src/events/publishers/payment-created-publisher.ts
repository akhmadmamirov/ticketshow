import { Subjects, Publisher, PaymentCreatedEvent } from "akhmadillobekcommon";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}