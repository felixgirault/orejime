import ConsentsMap from './ConsentsMap';

export default interface TrackersManager {
	toggle(consents: ConsentsMap): void;
}
