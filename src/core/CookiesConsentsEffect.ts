import ConsentsEffect from './ConsentsEffect';
import ConsentsMap from './ConsentsMap';
import Purpose from './Purpose';
import indexBy from './utils/indexBy';
import updatePurposeCookies from './utils/updatePurposeCookies';

export default class CookiesConsentsEffect implements ConsentsEffect {
	private readonly purposes: Record<Purpose['id'], Purpose>;

	constructor(purposes: Purpose[]) {
		this.purposes = indexBy(purposes, 'id');
	}

	apply(consents: ConsentsMap) {
		Object.entries(consents)
			.filter(([_, consent]) => !consent)
			.map(([id]) => this.purposes[id].cookies)
			.filter((cookies) => cookies?.length)
			.forEach(updatePurposeCookies);
	}
}
