import { Publisher, OrderCreatedEvent, Subjects} from "akhmadillobekcommon";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}