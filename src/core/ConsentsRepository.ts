import ConsentsMap from './ConsentsMap';

export default interface ConsentsRepository {
	read(): ConsentsMap;
	write(consents: ConsentsMap): void;
	clear(): void;
}
