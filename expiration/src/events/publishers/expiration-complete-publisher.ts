import { Subjects, Publisher, ExpirationCompleteEvent } from "akhmadillobekcommon";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}