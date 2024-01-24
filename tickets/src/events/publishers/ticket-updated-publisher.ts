import { Publisher, Subjects, TicketUpdatedEvent } from 'akhmadillobekcommon';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
