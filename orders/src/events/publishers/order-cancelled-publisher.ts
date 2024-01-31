import { Publisher, OrderCancelledEvent, Subjects} from "akhmadillobekcommon";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}