import DomainEvent from './DomainEvent';

export default interface Handler {
  name: string;
  handle(event: DomainEvent): Promise<void>;
}
