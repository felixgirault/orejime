import ConsentsEffect from './ConsentsEffect';
import ConsentsMap from './ConsentsMap';
import Purpose from './Purpose';
import updatePurposeElements from './utils/updatePurposeElements';

export default class DomConsentsEffect implements ConsentsEffect {
	private readonly singletonPurposes: ConsentsMap;
	private readonly alreadyExecuted: ConsentsMap;

	constructor(purposes: Purpose[]) {
		this.singletonPurposes = Object.fromEntries(
			purposes.map(({id, isSingleton}) => [id, !!isSingleton])
		);

		this.alreadyExecuted = Object.fromEntries(
			purposes.map(({id}) => [id, false])
		);
	}

	apply(consents: ConsentsMap) {
		Object.entries(consents)
			.filter(
				([id, consent]) =>
					!consent ||
					!this.singletonPurposes[id] ||
					!this.alreadyExecuted?.[id]
			)
			.forEach(([id, consent]) => {
				updatePurposeElements(id, consent);
				this.alreadyExecuted[id] = true;
			});
	}
}
