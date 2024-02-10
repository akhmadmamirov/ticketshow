import { Publisher, OrderCancelledEvent, Subjects} from "akhmadillobekcommon";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject : Subjects.OrderCancelled = Subjects.OrderCancelled;
}