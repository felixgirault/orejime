import setup from '../core/setup';
import type {Config, Translations} from '../ui';
import translationImports from '../ui/translations';
import {purposesOnly} from '../ui/utils/config';
import {deepMerge} from '../ui/utils/objects';
import umd from '../umd';

umd(async (config: Config) => {
	const manager = setup(purposesOnly(config.purposes), config.cookie);

	const preload = () => import('../ui');

	const loadUi = async () => {
		const [ui, translations] = await Promise.all([
			import('../ui'),
			translationImports[
				(config.lang || 'en') as keyof typeof translationImports
			]
		]);

		return ui.setup(
			deepMerge(config, {
				translations: (await translations()) as unknown as Translations
			} as Config),
			manager
		);
	};

	const show = async () => {
		(await loadUi()).show();
	};

	manager.on('dirty', (isDirty) => {
		if (isDirty) {
			show();
		}
	});

	if (!manager.isDirty()) {
		return {
			config,
			manager,
			show,
			preload
		};
	}

	return {
		...(await loadUi()),
		manager,
		preload
	};
});
