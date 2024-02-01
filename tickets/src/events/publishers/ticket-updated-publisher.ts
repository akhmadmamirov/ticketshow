import { Publisher, Subjects, TicketUpdatedEvent } from 'akhmadillobekcommon';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
