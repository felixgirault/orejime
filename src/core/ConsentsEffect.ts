import ConsentsMap from './ConsentsMap';

export default interface ConsentsEffect {
	apply(consents: ConsentsMap): void;
}
