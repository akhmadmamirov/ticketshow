import { Publisher, Subjects, TicketCreatedEvent } from 'akhmadillobekcommon';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
