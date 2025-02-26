// Uses ISO 639
// https://wikipedia.org/wiki/List_of_ISO_639_language_codes

export default {
	en: 'English',
	fr: 'Français',
	de: 'Deutsch',
	it: 'Italiano',
	es: 'Español',
	'pt-BR': 'Português (Brasil)',
	'pt-PT': 'Português (Portugal)',
	nl: 'Nederlands',
	da: 'Dansk',
	sv: 'Svenska',
	nb: 'Norsk',
	fi: 'suomi',
	pl: 'Polski',
	cs: 'Čeština',
	hr: 'Hrvatski',
	sk: 'Slovenský',
	hu: 'Magyar',
	ro: 'Română',
	el: 'Ελληνικά',
	hy: 'Հայերեն',
	sr: 'Српски (ћирилица)',
	'sr-YU': 'Srpski (latinica)',
	uk: 'Українська',
	ru: 'Русский',
	tr: 'Türkçe',
	ar: 'العربية',
	fa: 'فارسی',
	'zh-CN': '简体中文',
	'zh-HK': '繁體中文',
	'zh-TW': '正體中文',
	ja: '日本語',
	id: 'Indonesia',
	ca: 'Català',
	vi: 'Tiếng Việt',
	ko: '한국어',
}

// uses basic latin characters if not included
export const subsets = {
	el: 'greek',
	ar: 'arabic',
	fa: 'arabic',
	ru: 'cyrillic',
	uk: 'cyrillic',
	sr: 'cyrillic',
	sk: 'latin-ext',
	hr: 'latin-ext',
	cs: 'latin-ext',
	pl: 'latin-ext',
	ro: 'latin-ext',
	tr: 'latin-ext',
	hu: 'latin-ext',
	vi: 'latin-ext',
	ja: 'japanese',
	hy: 'armenian',
	'zh-CN': 'chinese-simplified',
	'zh-HK': 'chinese-traditional',
	'zh-TW': 'chinese-traditional',
	ko: 'korean',
}
