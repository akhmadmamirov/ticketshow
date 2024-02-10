import { Publisher, OrderCreatedEvent, Subjects} from "akhmadillobekcommon";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject : Subjects.OrderCreated = Subjects.OrderCreated;
}