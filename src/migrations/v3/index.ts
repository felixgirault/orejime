import type {Config, Purpose, PurposeList, Translations} from '../../ui';
import type {V2App, V2Category, V2Config, V2Translations} from '../v2/types';

export const migrateTranslations = (
	translations: Partial<V2Translations>
): Translations => {
	return {
		banner: {
			title: translations?.consentNotice?.title,
			description: `${translations?.consentNotice?.description} ${translations?.consentNotice?.privacyPolicy?.text}`,
			privacyPolicyLabel: translations?.consentNotice?.privacyPolicy?.name,
			accept: translations?.accept,
			acceptTitle: translations?.acceptTitle,
			decline: translations?.decline,
			declineTitle: translations?.decline,
			configure: translations?.consentNotice?.learnMore,
			configureTitle: translations?.consentNotice?.learnMore
		},
		modal: {
			title: translations?.consentModal?.title,
			description: `${translations?.consentModal?.description} ${translations?.consentModal?.privacyPolicy?.text}`,
			privacyPolicyLabel: translations?.consentModal?.privacyPolicy?.name,
			close: translations?.close,
			closeTitle: translations?.close,
			globalPreferences: undefined,
			acceptAll: translations?.acceptAll,
			declineAll: translations?.declineAll,
			save: translations?.save,
			saveTitle: translations?.saveData,
			poweredBy: translations?.poweredBy,
			newWindowTitle: translations?.newWindow
		},
		purpose: {
			mandatory: translations?.app?.required?.title,
			mandatoryTitle: translations?.app?.required?.description,
			optOut: translations?.app?.optOut?.title,
			optOutTitle: translations?.app?.optOut?.description,
			showMore: undefined,
			accept: translations?.accept,
			decline: translations?.decline
		},
		common: {
			changesNotice: translations?.consentNotice?.changeDescription
		}
	};
};

export const migrateApp = (
	app: V2App,
	translations: Partial<V2Translations>
): Purpose => ({
	id: app?.name,
	title: translations?.[app?.name]?.title ?? app?.title,
	description: translations?.[app?.name]?.description ?? app?.description,
	cookies: app?.cookies,
	default: app?.default,
	isMandatory: app?.required,
	isSingleton: app?.onlyOnce
});

export const migrateApps = (
	apps: V2App[],
	categories: V2Category[],
	translations: Partial<V2Translations>
): PurposeList => {
	const purposes = apps.map((app) => migrateApp(app, translations));

	if (!categories) {
		return purposes as PurposeList;
	}

	return categories.reduce((p, category) => {
		return [
			{
				id: category?.name,
				title:
					translations?.categories?.[category?.name]?.title ??
					category?.title,
				description:
					translations?.categories?.[category?.name]?.description ??
					category?.description,
				purposes: category.apps.map((name) =>
					migrateApp(
						apps.find((app) => app.name === name),
						translations
					)
				)
			},
			...p.filter((purpose) => !category.apps.includes(purpose.id))
		] as PurposeList;
	}, purposes as PurposeList);
};

export const migrateConfig = (config: V2Config): Config => {
	const translations = config?.translations?.[config?.lang] ?? {};

	return {
		appElement: config?.appElement,
		orejimeElement: config?.elementID,
		debug: config?.debug,
		defaultConsent: config?.default,
		lang: config?.lang,
		logo: config?.logo,
		forceConsent: config?.mustConsent,
		preventNavigation: config?.mustNotice,
		privacyPolicyUrl: config?.privacyPolicy,
		stylePrefix: config?.stylePrefix,
		cookie: {
			name: config?.cookieName,
			domain: config?.cookieDomain,
			duration: config?.cookieExpiresAfterDays,
			parse: config?.parseCookie,
			stringify: config?.stringifyCookie
		},
		purposes:
			'apps' in config
				? migrateApps(config.apps, config.categories, translations)
				: undefined,
		translations: migrateTranslations(translations)
	};
};
