import langList from './langs'

export const CURRENT_VERSION = '19.0.0'

export const MAIN_API = 'https://api.bonjourr.fr'

export const FALLBACK_API = ['https://bonjourr-apis.victr.workers.dev', 'https://bonjourr-apis.victrme.workers.dev']

export const ENVIRONNEMENT: 'PROD' | 'DEV' | 'TEST' = 'PROD'

export const SYSTEM_OS = window.navigator.userAgent.toLowerCase().includes('mac')
	? 'mac'
	: window.navigator.userAgent.toLowerCase().includes('windows')
	? 'windows'
	: window.navigator.userAgent.toLowerCase().includes('Android')
	? 'android'
	: ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
	  (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
	? 'ios'
	: 'unknown'

export const PLATFORM =
	window.location.protocol === 'moz-extension:'
		? 'firefox'
		: window.location.protocol === 'chrome-extension:'
		? 'chrome'
		: window.location.protocol === 'safari-web-extension:'
		? 'safari'
		: 'online'

export const BROWSER =
	window.navigator.userAgent.toLowerCase().indexOf('edg/' || 'edge') > -1
		? 'edge'
		: window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1
		? 'chrome'
		: window.navigator.userAgent.toLowerCase().indexOf('firefox') > -1
		? 'firefox'
		: window.navigator.userAgent.toLowerCase().indexOf('safari') > -1
		? 'safari'
		: 'other'

export const IS_MOBILE = navigator.userAgentData
	? navigator.userAgentData.mobile
	: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

const DEFAULT_LANG = (() => {
	for (const code of Object.keys(langList)) {
		if (navigator.language.replace('-', '_').includes(code)) {
			return code as keyof typeof langList
		}
	}
	return 'ar'
})()

export const SEARCHBAR_ENGINES = <const>[
	'ddg',
	'startpage',
	'qwant',
	'google',
	'yahoo',
	'bing',
	'brave',
	'ecosia',
	'lilo',
	'baidu',
	'custom',
]

export const SYNC_DEFAULT: Sync.Storage = {
	about: {
		browser: PLATFORM,
		version: CURRENT_VERSION,
	},
	showall: false,
	lang: DEFAULT_LANG,
	dark: 'system',
	favicon: '',
	tabtitle: '',
	greeting: 'هلا ومرحب',
	pagegap: 1,
	pagewidth: 1600,
	time: true,
	main: true,
	dateformat: 'eu',
	background_blur: 15,
	background_bright: 0.8,
	background_type: 'unsplash',
	quicklinks: true,
	syncbookmarks: undefined,
	textShadow: 0.2,
	announcements: 'major',
	review: 0,
	cssHeight: 80,
	css: '',
	hide: {},
	linkstyle: 'large',
	linknewtab: false,
	linksrow: 6,
	linktabs: {
		active: false,
		selected: 0,
		titles: [''],
	},
	clock: {
		size: 1,
		ampm: false,
		analog: false,
		seconds: false,
		face: 'none',
		style: 'round',
		timezone: 'auto',
	},
	unsplash: {
		every: 'hour',
		collection: '',
		lastCollec: 'day',
		pausedImage: undefined,
		time: undefined,
	},
	weather: {
		ccode: undefined,
		city: undefined,
		unit: 'metric',
		provider: '',
		moreinfo: 'windy',
		forecast: 'auto',
		temperature: 'actual',
		geolocation: 'approximate',
	},
	notes: {
		on: true,
		width: 40,
		opacity: 0.1,
		align: 'left',
	},
	searchbar: {
		on: false,
		opacity: 0.1,
		newtab: false,
		suggestions: true,
		engine: 'google',
		request: '',
		placeholder: '',
	},
	quotes: {
		on: true,
		author: false,
		type: 'classic',
		frequency: 'day',
		last: 1650516688,
	},
	font: {
		family: 'Cairo',
		size: '14',
		system: true,
		weightlist: [],
		weight: SYSTEM_OS === 'windows' ? '400' : '300',
	},
	bookmarks: {
		on: true,
		opacity: 0.1,
		width: 40,
		align: 'left',
	},
	rss: {
		on: false,
		opacity: 0.1,
		width: 40,
		align: 'left',
	},
	move: {
		selection: 'single',
		layouts: {
			single: {
				grid: [['time'], ['main'], ['quicklinks']],
				items: {},
			},
			double: {
				grid: [
					['time', '.'],
					['main', '.'],
					['quicklinks', '.'],
				],
				items: {},
			},
			triple: {
				grid: [
					['.', 'time', '.'],
					['.', 'main', '.'],
					['.', 'quicklinks', '.'],
				],
				items: {},
			},
		},
	},
}

export const LOCAL_DEFAULT: Local.Storage = {
	userQuoteSelection: 0,
	translations: {
		lang: DEFAULT_LANG,
	},
	selectedId: '',
	idsList: [],
	quotesCache: [],
	unsplashCache: {
		noon: [],
		day: [],
		evening: [],
		night: [],
		user: [],
	},
}
