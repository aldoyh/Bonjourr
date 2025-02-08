import { getLang, tradThis } from '../utils/translations'
import { BROWSER } from '../defaults'
import storage from '../storage'

type PopupInit = {
	old?: string
	new: string
	review: number
	announce: Sync.Storage['announcements']
}

type PopupUpdate = {
	announcements?: string
}

const ANNOUNCEMENT_URL = 'https://github.com/victrme/Bonjourr/releases/tag/v20.3.0'
const ANNOUNCEMENT_VERSION = '20.3.0'
const ANNOUNCEMENT_URL = 'https://github.com/victrme/Bonjourr/releases/tag/v20.4.0'
const ANNOUNCEMENT_VERSION = '20.4.0'

const ANNOUNCEMENT_TRNS = {
	en: '<b>Version 20.3 ✨</b> New settings sync methods, weather location suggestions, Korean translations, and backend improvements!',
	fr: '<b>Version 20.3 ✨</b> Nouvelles méthodes de synchronisation des paramètres, suggestions de localisation météo, traductions coréennes et améliorations du backend !',
	de: '<b>Version 20.3 ✨</b> Neue Methoden zur Einstellungssynchronisation, Wetterlokationsvorschläge, koreanische Übersetzungen und Backend-Verbesserungen!',
	it: '<b>Versione 20.3 ✨</b> Nuovi metodi di sincronizzazione delle impostazioni, suggerimenti per la posizione meteo, traduzioni in coreano e miglioramenti backend!',
	es: '<b>Versión 20.3 ✨</b> Nuevos métodos de sincronización de configuración, sugerencias de ubicación meteorológica, traducciones en coreano y mejoras en el backend!',
	en: '<b>Version 20.4 ✨</b> New supporters notification, Gist synchronisation improvements and small interaction fixes!',
	fr: "<b>Version 20.4 ✨</b> Nouvelle notification pour les supporters, améliorations de la synchronisation Gist et petites corrections d'interaction !",
	de: '<b>Version 20.4 ✨</b> Neue Unterstützer-Benachrichtigung, Gist-Synchronisationsverbesserungen und kleine Interaktionskorrekturen!',
	it: '<b>Versione 20.4 ✨</b> Nuova notifica per i sostenitori, miglioramenti alla sincronizzazione Gist e piccole correzioni di interazione!',
	es: '<b>Versión 20.4 ✨</b> Nueva notificación para seguidores, mejoras en la sincronización de Gist y pequeñas correcciones de interacción!',
	'pt-BR':
		'<b>Versão 20.3 ✨</b> Novos métodos de sincronização de configurações, sugestões de localização meteorológica, traduções em coreano e melhorias de backend!',
	'<b>Versão 20.4 ✨</b> Nova notificação de apoiadores, melhorias na sincronização do Gist e pequenas correções de interação!',
	'pt-PT':
		'<b>Versão 20.3 ✨</b> Novos métodos de sincronização de definições, sugestões de localização meteorológica, traduções em coreano e melhorias de backend!',
	nl: '<b>Versie 20.3 ✨</b> Nieuwe methoden voor synchronisatie van instellingen, suggesties voor weerlocatie, Koreaanse vertalingen en backend-verbeteringen!',
	da: '<b>Version 20.3 ✨</b> Nye metoder til synkronisering af indstillinger, vejrlokalitetsforslag, koreanske oversættelser og backend-forbedringer!',
	sv: '<b>Version 20.3 ✨</b> Nya metoder för inställningssynkronisering, förslag på väderplats, koreanska översättningar och backend-förbättringar!',
	nb: '<b>Versjon 20.3 ✨</b> Nye metoder for synkronisering av innstillinger, forslag til værlokalitet, koreanske oversettelser og backend-forbedringer!',
	fi: '<b>Versio 20.3 ✨</b> Uudet asetusten synkronointimenetelmät, sääsijainnin ehdotukset, korealaiset käännökset ja taustapalvelun parannukset!',
	pl: '<b>Wersja 20.3 ✨</b> Nowe metody synchronizacji ustawień, propozycje lokalizacji pogody, tłumaczenia koreańskie i ulepszenia zaplecza!',
	cs: '<b>Verze 20.3 ✨</b> Nové metody synchronizace nastavení, návrhy umístění počasí, korejské překlady a vylepšení backendu!',
	hr: '<b>Verzija 20.3 ✨</b> Nove metode sinkronizacije postavki, prijedlozi lokacije vremena, korejski prijevodi i poboljšanja pozadinskog sustava!',
	sk: '<b>Verzia 20.3 ✨</b> Nové metódy synchronizácie nastavení, návrhy polohy počasia, kórejské preklady a vylepšenia backendu!',
	hu: '<b>20.3 verzió ✨</b> Új beállítás-szinkronizálási módszerek, időjárási helyszín javaslatai, koreai fordítások és háttérrendszer-fejlesztések!',
	ro: '<b>Versiunea 20.3 ✨</b> Noi metode de sincronizare a setărilor, sugestii de locație meteo, traduceri în coreeană și îmbunătățiri backend!',
	el: '<b>Έκδοση 20.3 ✨</b> Νέες μέθοδοι συγχρονισμού ρυθμίσεων, προτάσεις τοποθεσίας καιρού, μεταφράσεις στα Κορεάτικα και βελτιώσεις backend!',
	hy: '<b>Տարբերակ 20.3 ✨</b> Կարգավորումների սինքրոնացման նոր մեթոդներ, եղանակի տեղանքի առաջարկներ, կորեական թարգմանություններ և հետին մասի բարելավումներ!',
	sr: '<b>Верзија 20.3 ✨</b> Нове методе синхронизације подешавања, предлози локације времена, корејски преводи и побољшања backend-а!',
	'<b>Versão 20.4 ✨</b> Nova notificação de apoiantes, melhorias na sincronização do Gist e pequenas correções de interação!',
	nl: '<b>Versie 20.4 ✨</b> Nieuwe ondersteuners-notificatie, Gist-synchronisatie verbeteringen en kleine interactie-fixes!',
	da: '<b>Version 20.4 ✨</b> Ny supporter-notifikation, Gist-synkroniseringsforbedringer og små interaktionsrettelser!',
	sv: '<b>Version 20.4 ✨</b> Ny supporternotifikation, förbättringar av Gist-synkronisering och små interaktionskorrigeringar!',
	nb: '<b>Versjon 20.4 ✨</b> Ny støttespiller-varsling, Gist-synkroniseringsforbedringer og små interaksjonsforbedringer!',
	fi: '<b>Versio 20.4 ✨</b> Uusi tukijoiden ilmoitus, Gist-synkronoinnin parannuksia ja pieniä vuorovaikutuskorjauksia!',
	pl: '<b>Wersja 20.4 ✨</b> Nowe powiadomienie dla wspierających, ulepszenia synchronizacji Gist i drobne poprawki interakcji!',
	cs: '<b>Verze 20.4 ✨</b> Nové oznámení pro podporovatele, vylepšení synchronizace Gist a drobné opravy interakcí!',
	hr: '<b>Verzija 20.4 ✨</b> Nova obavijest za podržavatelje, poboljšanja Gist sinkronizacije i male popravke interakcije!',
	sk: '<b>Verzia 20.4 ✨</b> Nové upozornenie pre podporovateľov, vylepšenia synchronizácie Gist a drobné opravy interakcií!',
	hu: '<b>20.4 verzió ✨</b> Új támogatói értesítés, Gist szinkronizációs fejlesztések és apró interakciós javítások!',
	ro: '<b>Versiunea 20.4 ✨</b> Notificare nouă pentru susținători, îmbunătățiri la sincronizarea Gist și mici corecții de interacțiune!',
	el: '<b>Έκδοση 20.4 ✨</b> Νέα ειδοποίηση υποστηρικτών, βελτιώσεις συγχρονισμού Gist και μικρές διορθώσεις αλληλεπίδρασης!',
	hy: '<b>Տարբերակ 20.4 ✨</b> Աջակիցների նոր ծանուցում, Gist սինքրոնացման բարելավումներ և փոքր փոխազդեցության ուղղումներ!',
	sr: '<b>Верзија 20.4 ✨</b> Ново обавештење за подржаваоце, побољшања Gist синхронизације и мале исправке интеракције!',
	'sr-YU':
		'<b>Verzija 20.3 ✨</b> Nove metode sinhronizacije podešavanja, predlozi lokacije vremena, korejski prevodi i poboljšanja backend-a!',
	uk: '<b>Версія 20.3 ✨</b> Нові методи синхронізації налаштувань, пропозиції розташування погоди, корейські переклади та покращення backend!',
	ru: '<b>Версия 20.3 ✨</b> Новые методы синхронизации настроек, предложения по местоположению погоды, корейские переводы и улучшения backend!',
	tr: '<b>Sürüm 20.3 ✨</b> Yeni ayar senkronizasyon yöntemleri, hava konumu önerileri, Korece çeviriler ve arka uç iyileştirmeleri!',
	ar: '<b>الإصدار 20.3 ✨</b> طرق جديدة لمزامنة الإعدادات، واقتراحات موقع الطقس، وترجمات كورية، وتحسينات الخلفية!',
	fa: '<b>نسخه 20.3 ✨</b> روش‌های جدید همگام‌سازی تنظیمات، پیشنهادات موقعیت آب و هوایی، ترجمه‌های کره‌ای و بهبودهای پس‌زمینه!',
	'zh-CN': '<b>版本 20.3 ✨</b> 新的设置同步方法、天气位置建议、韩语翻译和后端改进！',
	'zh-HK': '<b>版本 20.3 ✨</b> 新的設置同步方法、天氣位置建議、韓語翻譯和後端改進！',
	'zh-TW': '<b>版本 20.3 ✨</b> 新的設置同步方法、天氣位置建議、韓語翻譯和後端改進！',
	ja: '<b>バージョン 20.3 ✨</b> 新しい設定同期方法、天気位置の提案、韓国語の翻訳、バックエンドの改善！',
	id: '<b>Versi 20.3 ✨</b> Metode sinkronisasi pengaturan baru, saran lokasi cuaca, terjemahan Korea, dan perbaikan backend!',
	ca: '<b>Versió 20.3 ✨</b> Nous mètodes de sincronització de configuració, suggeriments de localització meteorològica, traduccions en coreà i millores de backend!',
	vi: '<b>Phiên bản 20.3 ✨</b> Các phương pháp đồng bộ hóa cài đặt mới, đề xuất vị trí thời tiết, bản dịch tiếng Hàn và cải tiến backend!',
	'<b>Verzija 20.4 ✨</b> Novo obaveštenje za podržavaoce, poboljšanja Gist sinhronizacije i male ispravke interakcije!',
	uk: '<b>Версія 20.4 ✨</b> Нове сповіщення для прихильників, покращення синхронізації Gist та дрібні виправлення взаємодії!',
	ru: '<b>Версия 20.4 ✨</b> Новое уведомление для поддерживающих, улучшения синхронизации Gist и мелкие исправления взаимодействия!',
	tr: '<b>Sürüm 20.4 ✨</b> Yeni destekçi bildirimi, Gist senkronizasyon iyileştirmeleri ve küçük etkileşim düzeltmeleri!',
	ar: '<b>الإصدار 20.4 ✨</b> إشعار جديد للداعمين، تحسينات مزامنة Gist وإصلاحات صغيرة للتفاعل!',
	fa: '<b>نسخه 20.4 ✨</b> اعلان جدید برای حامیان، بهبود همگام‌سازی Gist و اصلاحات کوچک تعاملی!',
	'zh-CN': '<b>版本 20.4 ✨</b> 新的支持者通知、Gist同步改进和小互动修复！',
	'zh-HK': '<b>版本 20.4 ✨</b> 新的支持者通知、Gist同步改進和小互動修復！',
	'zh-TW': '<b>版本 20.4 ✨</b> 新的支持者通知、Gist同步改進和小互動修復！',
	ja: '<b>バージョン 20.4 ✨</b> 新しいサポーター通知、Gist同期の改善、および小さな対話の修正！',
	id: '<b>Versi 20.4 ✨</b> Notifikasi pendukung baru, peningkatan sinkronisasi Gist dan perbaikan interaksi kecil!',
	ca: "<b>Versió 20.4 ✨</b> Nova notificació per a seguidors, millores en la sincronització de Gist i petites correccions d'interacció!",
	vi: '<b>Phiên bản 20.4 ✨</b> Thông báo người ủng hộ mới, cải tiến đồng bộ hóa Gist và sửa lỗi tương tác nhỏ!',
}

const REVIEW_TEXT = 'Love using Bonjourr? Consider giving us a review or donating, that would help a lot! 😇'
const REVIEW_URLS = {
	chrome: 'https://chrome.google.com/webstore/detail/bonjourr-%C2%B7-minimalist-lig/dlnejlppicbjfcfcedcflplfjajinajd/reviews',
	opera: 'https://chrome.google.com/webstore/detail/bonjourr-%C2%B7-minimalist-lig/dlnejlppicbjfcfcedcflplfjajinajd/reviews',
	firefox: 'https://addons.mozilla.org/en-US/firefox/addon/bonjourr-startpage/',
	safari: 'https://apps.apple.com/fr/app/bonjourr-startpage/id1615431236',
	edge: 'https://microsoftedge.microsoft.com/addons/detail/bonjourr/dehmmlejmefjphdeoagelkpaoolicmid',
	other: 'https://bonjourr.fr/help#%EF%B8%8F-reviews',
}

export default function interfacePopup(init?: PopupInit, event?: PopupUpdate) {
	if (event?.announcements) {
		storage.sync.set({ announcements: event?.announcements })
		return
	}

	// Announcements

	if (!init || init?.announce === 'off') {
		return
	}

	if (init.old && (init.review === -1 || init.review > 30)) {
		const major = (s: string) => parseInt(s.split('.')[0])
		const isMajorUpdate = major(init.new) > major(init.old)
		const isNewVersion = init.new !== init.old && init.new === ANNOUNCEMENT_VERSION

		const announceMajor = init.announce === 'major' && isMajorUpdate
		const announceAny = init.announce === 'all' && isNewVersion
		const canAnnounce = localStorage.hasUpdated === 'true' || announceAny || announceMajor

		if (canAnnounce) {
			localStorage.hasUpdated = 'true'
			displayPopup('announce')
			return
		}
	}

	// Reviews

	if (init.review === -1) {
		return
	}

	if (init.review > 30) {
		displayPopup('review')
	} else {
		storage.sync.set({ review: init.review + 1 })
	}
}

function displayPopup(type: 'review' | 'announce') {
	const template = document.getElementById('popup-template') as HTMLTemplateElement
	const doc = document.importNode(template.content, true)
	const popup = doc.getElementById('popup')
	const desc = doc.getElementById('popup_desc') as HTMLElement
	const close = doc.getElementById('popup_close') as HTMLElement
	const buttons = doc.getElementById('popup_buttons') as HTMLElement

	if (!popup) {
		return
	}

	if (type === 'review') {
		desc.textContent = tradThis(REVIEW_TEXT)
		buttons.appendChild(createPopupButton(REVIEW_URLS[BROWSER], tradThis('Review')))
		buttons.appendChild(createPopupButton('https://ko-fi.com/bonjourr', tradThis('Donate')))
	}

	if (type === 'announce') {
		const lang = getLang() as keyof typeof ANNOUNCEMENT_TRNS
		const description = ANNOUNCEMENT_TRNS[lang] ?? ANNOUNCEMENT_TRNS.en
		const buttontext = tradThis('Read the release notes') + ' 📝'
		desc.innerHTML = description
		buttons.appendChild(createPopupButton(ANNOUNCEMENT_URL, buttontext))
	}

	close?.addEventListener('click', closePopup)
	document.body.appendChild(popup)
	popup.classList.add(type)
	openPopup()
}

function createPopupButton(href: string, text: string): HTMLAnchorElement {
	const anchor = document.createElement('a')

	anchor.href = href
	anchor.rel = 'noreferrer'
	anchor.textContent = text
	anchor.addEventListener('pointerdown', removePopupTrigger)

	return anchor
}

//

function removePopupTrigger() {
	storage.sync.set({ review: -1 })
	localStorage.removeItem('hasUpdated')
}

function openPopup() {
	setTimeout(() => document.getElementById('popup')?.classList.add('shown'), 800)
	setTimeout(() => document.getElementById('credit-container')?.setAttribute('style', 'opacity: 0'), 400)
}

function closePopup() {
	setTimeout(() => document.getElementById('popup')?.remove(), 200)
	setTimeout(() => document.getElementById('credit-container')?.removeAttribute('style'), 600)
	document.getElementById('popup')?.classList.remove('shown')
	removePopupTrigger()
}
