import React, { useState, useEffect, useRef } from 'react';
import {
  Shield, Zap, Server, CheckCircle, ArrowRight,
  Mail, MessageCircle, Phone, Linkedin, ChevronDown, Star,
  Bot, Workflow, Cloud, Lock, Heart, Compass
} from 'lucide-react';

const translations: Record<string, any> = {
  ru: {
    navAbout: 'О компании', navDirector: 'Руководство', navProducts: 'Экосистема', navServices: 'Возможности', navContact: 'Контакты',
    heroBadge: 'Инжиниринг полного цикла • Резидент СНГ',
    heroTitle: 'Сократите time‑to‑market на 40% с отказоустойчивыми архитектурами',
    heroSubtitle: 'Проектируем GenAI-решения, высоконагруженные сервисы и защищённые банковские ядра. Доступность 99.99%, полный compliance.',
    heroBtn: 'Запросить аудит архитектуры',
    heroSecondaryBtn: 'Смотреть кейсы',
    trustTitle: 'Нам доверяют',
    trustIndustries: ['MedTech', 'FinTech', 'Промышленность', 'E‑commerce'],
    directorTitle: 'Технологическое лидерство',
    directorPost: 'Основатель • CEO • CTO',
    directorBio: 'Мы создаём сложные цифровые экосистемы с 2023 года. Мой путь опирается на железнодорожное инженерное образование — это сформировало парадигму абсолютной отказоустойчивости, которую я перенёс в архитектуру NEXACORE.',
    directorStack: 'Ключевые компетенции: Rust (Tokio), Python (FastAPI), отказоустойчивые БД, AI-агенты, GenAI, Zero Trust криптография.',
    servicesTitle: 'Наши возможности',
    servicesSubtitle: '',
    priceFrom: 'от',
    projectsTitle: 'Продукты в реальном секторе',
    projectsSubtitle: 'Эксплуатируются в MedTech, FinTech, Industrial',
    processTitle: 'Процесс сотрудничества',
    step1Title: 'Заявка', step1Desc: 'Заполните спецификацию или напишите в мессенджер.',
    step2Title: 'ИТ-аудит', step2Desc: 'Анализируем инфраструктуру и потребности.',
    step3Title: 'Архитектура', step3Desc: 'Проектируем детальный план решения.',
    step4Title: 'Разработка', step4Desc: 'Поэтапная реализация с сопровождением.',
    testimonialsTitle: 'Отзывы партнёров',
    testimonial1Text: 'С NEXACORE перешли на микросервисы за 3 месяца без остановки бизнеса. Надёжность выросла кратно.',
    testimonial1Author: 'CTO, FinTech компания',
    testimonial2Text: 'GenAI-агент снизил операционные затраты на 35%. Команда глубоко понимает бизнес-процессы.',
    testimonial2Author: 'Директор по инновациям, MedTech',
    faqTitle: 'Частые вопросы',
    faq1Q: 'Почему такие цены?', faq1A: 'Мы предлагаем конкурентоспособные стартовые цены в 2026 году, работая на стыке high‑level архитектуры и промышленной надёжности. Каждый проект проходит многоступенчатый аудит, исключая дорогие ошибки в будущем.',
    faq2Q: 'Как гарантируете безопасность?', faq2A: 'Принципы Zero Trust, пентесты, Rust для критических компонентов — исключаем целые классы уязвимостей.',
    faq3Q: 'Сроки?', faq3A: 'MVP — от 4 недель. Полный цикл интеграции — от 8 недель.',
    contactTitle: 'Центр обработки заявок',
    contactSubtitle: 'Заполните спецификацию для первичного ИТ-аудита или свяжитесь через проверенные каналы.',
    formName: 'Организация / Имя заказчика',
    formContact: 'Email или Telegram',
    formMessage: 'Краткое описание ТЗ...',
    formBtn: 'Отправить спецификацию',
    successTitle: 'Заявка верифицирована!',
    successText: 'Данные отправлены на ваш email через защищённый шлюз. Архитектор уже анализирует вводные.',
    successBtn: 'Новая заявка',
    footerRights: 'Все права защищены.',
    clientTypes: ['Частные лица', 'ИП', 'Юридические лица (B2B)'],
    services: [
      { title: 'Архитектура Core-систем', desc: 'Высоконагруженные ядра, отказоустойчивые БД, Zero Trust протоколы.', price: '1 750', icon: Server },
      { title: 'Интеграция ИИ и GenAI', desc: 'Автономные агенты, тонкая настройка LLM под индустриальные задачи.', price: '2 250', icon: Zap },
      { title: 'Промышленный бэкенд', desc: 'Высокопроизводительные сервисы на Rust и Python, микросервисы.', price: '1 500', icon: Shield },
      { title: 'Чат-боты и AI-ассистенты', desc: 'Умные боты для поддержки, продаж, HR на базе LLM с интеграцией.', price: '1 400', icon: Bot },
      { title: 'B2B-автоматизация и интеграция', desc: 'Связывание CRM, ERP, логистики, платёжных систем через API/webhooks.', price: '2 250', icon: Workflow },
      { title: 'Автоматизация бизнес-процессов', desc: 'Цифровизация ручных операций, RPA, оптимизация документооборота.', price: '1 250', icon: Compass },
      { title: 'DevOps и облачная инфраструктура', desc: 'CI/CD, Kubernetes, Terraform, миграция в облако (AWS/GCP/Azure).', price: '900', icon: Cloud },
      { title: 'Security-аудит и пентестинг', desc: 'Поиск уязвимостей в коде и инфраструктуре, рекомендации по защите.', price: '750', icon: Lock },
      { title: 'Долгосрочное сопровождение (SLA)', desc: 'Мониторинг, исправление инцидентов, обновления безопасности, архитектор в доступе.', price: '500 / мес', icon: Heart }
    ],
    projects: [
      { name: 'Nexacore', tag: 'MedTech Ecosystem', desc: 'Распределённая медицинская платформа для агрегации данных и управления клиническими процессами.' },
      { name: 'CNCera', tag: 'Industrial AI / ЧПУ', desc: 'Автоматизация металлообработки на станках с ЧПУ — точность и скорость.' },
      { name: 'AIGIS CORE', tag: 'FinTech Core / Security', desc: 'Модульное банковское ядро корпоративного уровня на Zero Trust.' },
      { name: 'DropUZ', tag: 'B2B & B2C Marketplace', desc: 'Гипермаркет прямых поставок, соединяющий фабрики с бизнесом и розницей.' }
    ]
  },
  uz: {
    navAbout: 'Kompaniya', navDirector: 'Raxbariyat', navProducts: 'Ekotizim', navServices: 'Imkoniyatlar', navContact: 'Aloqa',
    heroBadge: 'To\'liq siklli injiniring • MDH rezidenti',
    heroTitle: 'Biznesingizni 40% tezroq ishga tushiring — nosozliklarga chidamli arxitekturalar bilan',
    heroSubtitle: 'GenAI yechimlar, yuqori yuklamali xizmatlar va himoyalangan bank yadrolarini loyihalashtiramiz va joriy qilamiz. Kafolatlangan mavjudlik 99,99%.',
    heroBtn: 'Arxitektura auditini so\'rang', heroSecondaryBtn: 'Keyslarni ko\'rish',
    trustTitle: 'Ishonch bildirgan sohalar', trustIndustries: ['MedTech', 'FinTech', 'Sanoat', 'E-tijorat'],
    directorTitle: 'Texnologik yetakchilik', directorPost: 'Asoschi • CEO • CTO',
    directorBio: 'Biz 2023-yildan buyon murakkab raqamli ekotizimlarni yaratib kelmoqdamiz. Mening muhandislik yo\'lim temir yo\'l texnik muhandisligiga asoslangan — bu mutlaq ishonchlilik tamoyilini NEXACORE dasturiy arxitekturasiga ko\'chirdim.',
    directorStack: 'Asosiy kompetensiyalar: Rust (Tokio), Python (FastAPI), nosozlikka chidamli DB, AI-agentlar, GenAI, xavfsizlik protokollari.',
    servicesTitle: 'Bizning imkoniyatlarimiz',
    servicesSubtitle: '',
    priceFrom: 'dan',
    projectsTitle: 'Haqiqiy sektorda ishlab chiqilgan mahsulotlar',
    projectsSubtitle: 'MedTech, FinTech, Industrial sohalarda qo\'llaniladi',
    processTitle: 'Hamkorlik jarayoni',
    step1Title: 'So\'rov', step1Desc: 'Spetsifikatsiyani to\'ldiring yoki messenjerda yozing.',
    step2Title: 'IT-audit', step2Desc: 'Infratuzilma va ehtiyojlarni tahlil qilamiz.',
    step3Title: 'Arxitektura', step3Desc: 'Batafsil yechim rejasini loyihalashtiramiz.',
    step4Title: 'Ishlab chiqish', step4Desc: 'Bosqichma-bosqich amalga oshirib, qo\'llab-quvvatlaymiz.',
    testimonialsTitle: 'Hamkorlar fikrlari',
    testimonial1Text: 'NEXACORE bilan mikroservislarga 3 oyda biznesni to\'xtatmasdan o\'tdik. Ishonchlilik sezilarli oshdi.',
    testimonial1Author: 'CTO, FinTech kompaniya',
    testimonial2Text: 'GenAI-agent operatsion xarajatlarni 35% kamaytirdi. Jamoa biznes jarayonlarni chuqur tushunadi.',
    testimonial2Author: 'Innovatsiyalar direktori, MedTech',
    faqTitle: 'Ko\'p beriladigan savollar',
    faq1Q: 'Nima uchun bunday narxlar?', faq1A: '2026-yilda raqobatbardosh boshlang\'ich narxlarni taklif qilamiz. Yuqori darajadagi arxitektura va sanoat ishonchliligi kesishmasida ishlaymiz. Ko\'p bosqichli audit kelajakdagi qimmat xatolarni bartaraf etadi.',
    faq2Q: 'Xavfsizlik kafolati?', faq2A: 'Zero Trust, pentestlar, Rust — zaifliklarning butun sinfini yo\'q qiladi.',
    faq3Q: 'Muddatlar?', faq3A: 'MVP — 4 haftadan. To\'liq integratsiya — murakkabligiga qarab 8 haftadan.',
    contactTitle: 'So\'rovlarni qayta ishlash markazi',
    contactSubtitle: 'Boshlang\'ich IT-audit uchun texnik talablarni to\'ldiring yoki tasdiqlangan kanallar orqali bog\'laning.',
    formName: 'Tashkilot / Buyurtmachi nomi', formContact: 'Email yoki Telegram', formMessage: 'Texnik vazifaning qisqacha tavsifi...', formBtn: 'So\'rovni yuborish',
    successTitle: 'So\'rov qabul qilindi!', successText: 'Ma\'lumotlar ishchi pochtangizga yuborildi. Arxitektor tahlilni boshladi.', successBtn: 'Yangi so\'rov',
    footerRights: 'Barcha huquqlar himoyalangan.',
    clientTypes: ['Jismoniy shaxslar', 'YTT', 'Yuridik shaxslar (B2B)'],
    services: [
      { title: 'Core tizimlar arxitekturasi', desc: 'Yuqori yuklamali yadrolar, nosozlikka chidamli DB, Zero Trust.', price: '1 750', icon: Server },
      { title: 'AI va GenAI integratsiyasi', desc: 'Avtonom agentlar, LLM modellarini sanoatga moslashtirish.', price: '2 250', icon: Zap },
      { title: 'Sanoat Backend tizimlari', desc: 'Rust va Python\'da yuqori unumdor mikroservislar.', price: '1 500', icon: Shield },
      { title: 'Chat-botlar va AI-assistentlar', desc: 'LLM asosida qo\'llab-quvvatlash, savdo, HR uchun aqlli botlar.', price: '1 400', icon: Bot },
      { title: 'B2B avtomatlashtirish va integratsiya', desc: 'CRM, ERP, logistika, to\'lov tizimlarini API/webhook orqali bog\'lash.', price: '2 250', icon: Workflow },
      { title: 'Biznes jarayonlarni avtomatlashtirish', desc: 'Qo\'l operatsiyalarini raqamlashtirish, RPA, hujjat aylanishini optimallashtirish.', price: '1 250', icon: Compass },
      { title: 'DevOps va bulut infratuzilmasi', desc: 'CI/CD, Kubernetes, Terraform, bulutga migratsiya.', price: '900', icon: Cloud },
      { title: 'Xavfsizlik auditi va pentest', desc: 'Kod va infratuzilmadagi zaifliklarni qidirish, himoya bo\'yicha tavsiyalar.', price: '750', icon: Lock },
      { title: 'Uzoq muddatli qo\'llab-quvvatlash (SLA)', desc: 'Monitoring, insidentlarni tuzatish, xavfsizlik yangilanishlari, arxitektor bilan aloqa.', price: '500 / oy', icon: Heart }
    ],
    projects: [
      { name: 'Nexacore', tag: 'MedTech Ecosystem', desc: 'Klinik jarayonlarni boshqarish uchun universal tibbiy platforma.' },
      { name: 'CNCera', tag: 'Industrial AI / CHPU', desc: 'CNC dastgohlarida metallga yuqori aniqlikda ishlov berish.' },
      { name: 'AIGIS CORE', tag: 'FinTech Core / Security', desc: 'Zero Trust asosidagi ultra-himoyalangan bank yadrosi.' },
      { name: 'DropUZ', tag: 'B2B & B2C Marketplace', desc: 'Zavodlardan to\'g\'ridan-to\'g\'ri ulgurji va chakana savdo gipermarketi.' }
    ]
  },
  kk: {
    navAbout: 'Компания туралы', navDirector: 'Басшылық', navProducts: 'Экожүйе', navServices: 'Мүмкіндіктер', navContact: 'Байланыс',
    heroBadge: 'Толық циклді инжиниринг • ТМД резиденті',
    heroTitle: 'Бизнесіңізді 40% жылдамырақ іске қосыңыз – іркіліссіз архитектуралармен',
    heroSubtitle: 'GenAI шешімдерін, жоғары жүктемелі сервистерді және қорғалған банк ядроларын жобалап енгіземіз. 99,99% қолжетімділік.',
    heroBtn: 'Архитектура аудитін сұрау', heroSecondaryBtn: 'Кейстерді көру',
    trustTitle: 'Сенім білдірген салалар', trustIndustries: ['MedTech', 'FinTech', 'Өнеркәсіп', 'Электронды коммерция'],
    directorTitle: 'Технологиялық көшбасшылық', directorPost: 'Құрылтайшы • CEO • CTO',
    directorBio: 'Біз 2023 жылдан бері күрделі цифрлық экожүйелерді құрып келеміз. Менің теміржол инженерлік білімім абсолютті іркіліссіздік парадигмасын NEXACORE архитектурасына енгізуге мүмкіндік берді.',
    directorStack: 'Негізгі құзыреттер: Rust (Tokio), Python (FastAPI), іркіліссіз ДҚ, AI-агенттер, GenAI, криптографиялық қорғау.',
    servicesTitle: 'Біздің мүмкіндіктеріміз',
    servicesSubtitle: '',
    priceFrom: 'бастап',
    projectsTitle: 'Нақты сектордағы өнімдер',
    projectsSubtitle: 'MedTech, FinTech, Өнеркәсіпте қолданылады',
    processTitle: 'Ынтымақтастық процесі',
    step1Title: 'Өтінім', step1Desc: 'Сипаттаманы толтырыңыз немесе мессенджерге жазыңыз.',
    step2Title: 'ІТ-аудит', step2Desc: 'Инфрақұрылым мен қажеттіліктерді талдаймыз.',
    step3Title: 'Архитектура', step3Desc: 'Егжей-тегжейлі шешім жоспарын жасаймыз.',
    step4Title: 'Әзірлеу', step4Desc: 'Кезең-кезеңмен іске асырып, сүйемелдейміз.',
    testimonialsTitle: 'Серіктестердің пікірлері',
    testimonial1Text: 'NEXACORE арқасында микросервистерге 3 айда бизнесті тоқтатпай көштік. Сенімділік едәуір өсті.',
    testimonial1Author: 'CTO, FinTech компания',
    testimonial2Text: 'GenAI-агент операциялық шығындарды 35% төмендетті. Команда бизнес-процестерді терең түсінеді.',
    testimonial2Author: 'Инновациялар жөніндегі директор, MedTech',
    faqTitle: 'Жиі қойылатын сұрақтар',
    faq1Q: 'Неге мұндай бағалар?', faq1A: '2026 жылы бәсекеге қабілетті бастапқы бағаларды ұсынамыз. Жоғары деңгейлі архитектура мен өнеркәсіптік сенімділік қиылысында жұмыс істейміз. Көп сатылы аудит болашақтағы қымбат қателерді болдырмайды.',
    faq2Q: 'Қауіпсіздік кепілдігі?', faq2A: 'Zero Trust, пентесттер, Rust — осалдықтардың тұтас класын жояды.',
    faq3Q: 'Мерзімдер?', faq3A: 'MVP — 4 аптадан. Толық интеграция — күрделілігіне байланысты 8 аптадан.',
    contactTitle: 'Өтінімдерді өңдеу орталығы',
    contactSubtitle: 'Бастапқы ІТ-аудит үшін техникалық талаптарды толтырыңыз немесе тексерілген арналар арқылы хабарласыңыз.',
    formName: 'Ұйым / Тапсырыс беруші', formContact: 'Email немесе Telegram', formMessage: 'ТЖ қысқаша сипаттамасы...', formBtn: 'Сипаттаманы жіберу',
    successTitle: 'Өтінім верификацияланды!', successText: 'Деректер жұмыс поштаңызға жіберілді. Архитектор талдауды бастады.', successBtn: 'Жаңа өтінім',
    footerRights: 'Барлық құқықтар қорғалған.',
    clientTypes: ['Жеке тұлғалар', 'ЖК', 'Заңды тұлғалар (B2B)'],
    services: [
      { title: 'Core-жүйелер архитектурасы', desc: 'Жоғары жүктемелі ядролар, іркіліссіз ДҚ, Zero Trust.', price: '1 750', icon: Server },
      { title: 'ЖИ және GenAI интеграциясы', desc: 'Автономды агенттер, LLM-ді өндірістік тапсырмаларға бейімдеу.', price: '2 250', icon: Zap },
      { title: 'Өнеркәсіптік бэкенд', desc: 'Rust пен Python-да жоғары өнімді микросервистер.', price: '1 500', icon: Shield },
      { title: 'Чат-боттар және AI-ассистенттер', desc: 'LLM негізінде қолдау, сату, HR үшін ақылды боттар.', price: '1 400', icon: Bot },
      { title: 'B2B автоматтандыру және интеграция', desc: 'CRM, ERP, логистика, төлем жүйелерін API/webhook арқылы байланыстыру.', price: '2 250', icon: Workflow },
      { title: 'Бизнес-процестерді автоматтандыру', desc: 'Қол операцияларын цифрландыру, RPA, құжат айналымын оңтайландыру.', price: '1 250', icon: Compass },
      { title: 'DevOps және бұлтты инфрақұрылым', desc: 'CI/CD, Kubernetes, Terraform, бұлтқа көшіру.', price: '900', icon: Cloud },
      { title: 'Қауіпсіздік аудиті және пентест', desc: 'Код пен инфрақұрылымдағы осалдықтарды іздеу, қорғау бойынша ұсыныстар.', price: '750', icon: Lock },
      { title: 'Ұзақ мерзімді қолдау (SLA)', desc: 'Мониторинг, оқиғаларды түзету, қауіпсіздік жаңартулары, архитектормен байланыс.', price: '500 / ай', icon: Heart }
    ],
    projects: [
      { name: 'Nexacore', tag: 'MedTech Ecosystem', desc: 'Клиникалық процестерді басқаруға арналған әмбебап медициналық платформа.' },
      { name: 'CNCera', tag: 'Industrial AI / ЧПУ', desc: 'Металды жоғары дәлдікпен өңдеуге арналған өнеркәсіптік кешен.' },
      { name: 'AIGIS CORE', tag: 'FinTech Core / Security', desc: 'Zero Trust негізіндегі аса қорғалған банктік ядро.' },
      { name: 'DropUZ', tag: 'B2B & B2C Marketplace', desc: 'Тікелей жеткізілімдердің көтерме-бөлшек гипермаркеті.' }
    ]
  },
  be: {
    navAbout: 'Пра кампанію', navDirector: 'Кіраўніцтва', navProducts: 'Экасістэма', navServices: 'Магчымасці', navContact: 'Кантакты',
    heroBadge: 'Інжынірынг поўнага цыклу • Рэзідэнт СНД',
    heroTitle: 'Скараціце time‑to‑market на 40% з надзейнымі архітэктурамі',
    heroSubtitle: 'Праектуем GenAI-рашэнні, высоканагружаныя сэрвісы і абароненыя банкаўскія ядры. Даступнасць 99,99%, поўны комплаенс.',
    heroBtn: 'Запытаць аўдыт архітэктуры', heroSecondaryBtn: 'Глядзець кейсы',
    trustTitle: 'Нам давяраюць', trustIndustries: ['MedTech', 'FinTech', 'Прамысловасць', 'Электронная камерцыя'],
    directorTitle: 'Тэхналагічнае лідэрства', directorPost: 'Заснавальнік • CEO • CTO',
    directorBio: 'Мы ствараем складаныя лічбавыя экасістэмы з 2023 года. Мая чыгуначная інжынерная адукацыя сфармавала падыход абсалютнай надзейнасці, перанесены ў архітэктуру NEXACORE.',
    directorStack: 'Ключавыя кампетэнцыі: Rust (Tokio), Python (FastAPI), надзейныя БД, AI-агенты, GenAI, крыптаграфічная абарона.',
    servicesTitle: 'Нашы магчымасці',
    servicesSubtitle: '',
    priceFrom: 'ад',
    projectsTitle: 'Прадукты ў рэальным сектары',
    projectsSubtitle: 'Выкарыстоўваюцца ў MedTech, FinTech, Прамысловасці',
    processTitle: 'Працэс супрацоўніцтва',
    step1Title: 'Заяўка', step1Desc: 'Запоўніце спецыфікацыю або напішыце ў месенджар.',
    step2Title: 'ІТ-аўдыт', step2Desc: 'Аналізуем інфраструктуру і патрэбы.',
    step3Title: 'Архітэктура', step3Desc: 'Праектуем дэталёвы план рашэння.',
    step4Title: 'Распрацоўка', step4Desc: 'Паэтапная рэалізацыя з суправаджэннем.',
    testimonialsTitle: 'Водгукі партнёраў',
    testimonial1Text: 'З NEXACORE перайшлі на мікрасэрвісы за 3 месяцы без прыпынку бізнесу. Надзейнасць узрасла.',
    testimonial1Author: 'CTO, FinTech кампанія',
    testimonial2Text: 'GenAI-агент знізіў аперацыйныя выдаткі на 35%. Каманда разумее бізнес-працэсы.',
    testimonial2Author: 'Дырэктар па інавацыях, MedTech',
    faqTitle: 'Частыя пытанні',
    faq1Q: 'Чаму такія кошты?', faq1A: 'Мы прапануем канкурэнтаздольныя стартавыя кошты ў 2026 годзе, працуючы на стыку high‑level архітэктуры і прамысловай надзейнасці. Шматузроўневы аўдыт выключае дарагія памылкі.',
    faq2Q: 'Як гарантуеце бяспеку?', faq2A: 'Zero Trust, пен-тэсты, Rust — выключаем цэлыя класы ўразлівасцей.',
    faq3Q: 'Тэрміны?', faq3A: 'MVP — ад 4 тыдняў. Поўная інтэграцыя — ад 8 тыдняў.',
    contactTitle: 'Цэнтр апрацоўкі заявак',
    contactSubtitle: 'Запоўніце спецыфікацыю для першаснага ІТ-аўдыту або звяжыцеся праз правераныя каналы.',
    formName: 'Арганізацыя / Імя заказчыка', formContact: 'Email або Telegram', formMessage: 'Кароткае апісанне ТЗ...', formBtn: 'Адправіць спецыфікацыю',
    successTitle: 'Заяўка верыфікавана!', successText: 'Дадзеныя адпраўлены на ваш email праз абаронены шлюз. Архітэктар пачаў аналіз.', successBtn: 'Новая заяўка',
    footerRights: 'Усе правы абаронены.',
    clientTypes: ['Прыватныя асобы', 'ІП', 'Юрыдычныя асобы (B2B)'],
    services: [
      { title: 'Архітэктура Core-сістэм', desc: 'Высоканагружаныя ядры, надзейныя БД, пратаколы Zero Trust.', price: '1 750', icon: Server },
      { title: 'Інтэграцыя ШІ і GenAI', desc: 'Аўтаномныя агенты, настройка LLM пад індустрыяльныя задачы.', price: '2 250', icon: Zap },
      { title: 'Прамысловы бэкенд', desc: 'Высокапрадукцыйныя сэрвісы на Rust і Python, мікрасэрвісы.', price: '1 500', icon: Shield },
      { title: 'Распрацоўка чат-ботаў і AI-асістэнтаў', desc: 'Разумныя боты для падтрымкі, продажаў, HR на аснове LLM.', price: '1 400', icon: Bot },
      { title: 'B2B-аўтаматызацыя і інтэграцыя', desc: 'Звязванне CRM, ERP, лагістыкі, плацежных сістэм праз API/webhooks.', price: '2 250', icon: Workflow },
      { title: 'Аўтаматызацыя бізнес-працэсаў', desc: 'Лічбавізацыя ручных аперацый, RPA, аптымізацыя дакументазвароту.', price: '1 250', icon: Compass },
      { title: 'DevOps і воблачная інфраструктура', desc: 'CI/CD, Kubernetes, Terraform, міграцыя ў воблака.', price: '900', icon: Cloud },
      { title: 'Аўдыт бяспекі і пен-тэсты', desc: 'Пошук уразлівасцей у кодзе і інфраструктуры, рэкамендацыі па абароне.', price: '750', icon: Lock },
      { title: 'Доўгатэрміновае суправаджэнне (SLA)', desc: 'Маніторынг, выпраўленне інцыдэнтаў, абнаўленні бяспекі, доступ да архітэктара.', price: '500 / мес', icon: Heart }
    ],
    projects: [
      { name: 'Nexacore', tag: 'MedTech Ecosystem', desc: 'Універсальная медыцынская платформа для агрэгацыі дадзеных і кіравання клінічнымі працэсамі.' },
      { name: 'CNCera', tag: 'Industrial AI / ЧПУ', desc: 'Апрацоўка металу на станках з ЧПУ з высокай дакладнасцю.' },
      { name: 'AIGIS CORE', tag: 'FinTech Core / Security', desc: 'Звышабароненае модульнае банкаўскае ядро на Zero Trust.' },
      { name: 'DropUZ', tag: 'B2B & B2C Marketplace', desc: 'Гіпермаркет прамых паставак, які злучае фабрыкі з бізнесам.' }
    ]
  },
  en: {
    navAbout: 'Company', navDirector: 'Leadership', navProducts: 'Ecosystem', navServices: 'Capabilities', navContact: 'Contact',
    heroBadge: 'Full‑Cycle Engineering • CIS Resident',
    heroTitle: 'Cut time‑to‑market by 40% with fault‑tolerant architectures',
    heroSubtitle: 'We design GenAI solutions, high‑load services, and secure banking kernels. 99.99% uptime, full compliance.',
    heroBtn: 'Request Architecture Audit', heroSecondaryBtn: 'View Cases',
    trustTitle: 'Trusted by', trustIndustries: ['MedTech', 'FinTech', 'Industry', 'E‑commerce'],
    directorTitle: 'Technological Leadership', directorPost: 'Founder • CEO • CTO',
    directorBio: 'We have been engineering complex digital architectures since 2023. My railway systems engineering background instilled a paradigm of absolute resilience, which I embedded into NEXACORE.',
    directorStack: 'Core capabilities: Rust (Tokio), Python (FastAPI), resilient DBs, AI agents, GenAI, Zero Trust cryptography.',
    servicesTitle: 'Our Capabilities',
    servicesSubtitle: '',
    priceFrom: 'from',
    projectsTitle: 'Deployed Software Systems',
    projectsSubtitle: 'Operational in MedTech, FinTech, Industrial sectors',
    processTitle: 'Collaboration Process',
    step1Title: 'Request', step1Desc: 'Fill specification or message us.',
    step2Title: 'IT Audit', step2Desc: 'Analyze infrastructure and needs.',
    step3Title: 'Architecture', step3Desc: 'Design a detailed solution plan.',
    step4Title: 'Development', step4Desc: 'Phased implementation with support.',
    testimonialsTitle: 'Partner Testimonials',
    testimonial1Text: 'With NEXACORE we migrated to microservices in 3 months with zero downtime. Reliability improved dramatically.',
    testimonial1Author: 'CTO, FinTech company',
    testimonial2Text: 'The GenAI agent reduced operational costs by 35%. The team deeply understands business processes.',
    testimonial2Author: 'Director of Innovation, MedTech',
    faqTitle: 'FAQ',
    faq1Q: 'Why these prices?', faq1A: 'We offer competitive starter prices in 2026, operating at the intersection of high‑level architecture and industrial reliability. Multi‑stage audit prevents future costly errors.',
    faq2Q: 'How do you guarantee security?', faq2A: 'Zero Trust, pentests, Rust for critical components — eliminating whole vulnerability classes.',
    faq3Q: 'Timelines?', faq3A: 'MVP — from 4 weeks. Full integration — from 8 weeks depending on complexity.',
    contactTitle: 'Request Center',
    contactSubtitle: 'Submit your technical specification for an initial IT audit or contact us via verified channels.',
    formName: 'Organization / Representative', formContact: 'Email or Telegram', formMessage: 'Brief technical requirements...', formBtn: 'Submit Specification',
    successTitle: 'Request Verified!', successText: 'Your data has been sent via secure gateway. Our architect is reviewing the inputs.', successBtn: 'New Request',
    footerRights: 'All rights reserved.',
    clientTypes: ['Individuals', 'Sole Proprietors', 'Corporate (B2B)'],
    services: [
      { title: 'Core Systems Architecture', desc: 'High-throughput kernels, fault-tolerant DBs, Zero Trust protocols.', price: '1,750', icon: Server },
      { title: 'AI & GenAI Integration', desc: 'Autonomous agents, LLM fine‑tuning for industrial tasks.', price: '2,250', icon: Zap },
      { title: 'Enterprise Backend', desc: 'High‑performance services in Rust & Python, microservices.', price: '1,500', icon: Shield },
      { title: 'Chatbot & AI Assistant Development', desc: 'Smart bots for support, sales, HR powered by LLMs with integration.', price: '1,400', icon: Bot },
      { title: 'B2B Automation & Integration', desc: 'Connecting CRM, ERP, logistics, payment systems via APIs/webhooks.', price: '2,250', icon: Workflow },
      { title: 'Business Process Automation', desc: 'Digitizing manual operations, RPA, document workflow optimization.', price: '1,250', icon: Compass },
      { title: 'DevOps & Cloud Infrastructure', desc: 'CI/CD, Kubernetes, Terraform, cloud migration (AWS/GCP/Azure).', price: '900', icon: Cloud },
      { title: 'Security Audit & Pentesting', desc: 'Vulnerability assessment in code and infrastructure with recommendations.', price: '750', icon: Lock },
      { title: 'Long‑term Support (SLA)', desc: 'Monitoring, incident resolution, security updates, architect on call.', price: '500 / mo', icon: Heart }
    ],
    projects: [
      { name: 'Nexacore', tag: 'MedTech Ecosystem', desc: 'Distributed medical platform for data aggregation and clinical workflow management.' },
      { name: 'CNCera', tag: 'Industrial AI / CNC', desc: 'Industrial suite for precision metalwork on CNC machinery.' },
      { name: 'AIGIS CORE', tag: 'FinTech Core / Security', desc: 'Hyper‑secure modular banking kernel under Zero Trust.' },
      { name: 'DropUZ', tag: 'B2B & B2C Marketplace', desc: 'Direct‑to‑consumer factory hypermarket cutting intermediaries.' }
    ]
  }
};

// Хук для анимации при скролле
const useInView = (threshold = 0.2) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible] as const;
};

const AnimatedSection = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const [ref, isVisible] = useInView(0.15);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState<string>('ru');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const t = translations[lang] || translations.ru;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.heroTitle?.split('.')[0] || 'NEXACORE';
  }, [lang, t.heroTitle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return;
    const web3FormData = new FormData();
    web3FormData.append("access_key", "d3ab1f9b-3963-492a-8f26-2d4d135371e6");
    web3FormData.append("subject", `🔥 Новая заявка от ${formData.name}`);
    web3FormData.append("from_name", "NEXACORE Website");
    web3FormData.append("Name", formData.name);
    web3FormData.append("Contact", formData.contact);
    web3FormData.append("Message", formData.message);
    web3FormData.append("Language", lang.toUpperCase());
    if (formData.contact.includes('@')) web3FormData.append("reply_to", formData.contact);
    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: web3FormData });
      const data = await response.json();
      if (data.success) {
        setFormSubmitted(true);
        setFormData({ name: '', contact: '', message: '' });
      } else {
        alert("Ошибка отправки. Пожалуйста, используйте прямые контакты.");
      }
    } catch (error) {
      alert("Ошибка сети. Проверьте соединение.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white font-sans relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-0" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="font-mono text-xl font-black tracking-tighter text-slate-900 hover:opacity-80">NEXACORE<span className="text-blue-600">.</span></a>
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider font-bold text-slate-500">
            <a href="#about" className="hover:text-slate-950">{t.navAbout}</a>
            <a href="#director" className="hover:text-slate-950">{t.navDirector}</a>
            <a href="#products" className="hover:text-slate-950">{t.navProducts}</a>
            <a href="#services" className="hover:text-slate-950">{t.navServices}</a>
            <a href="#contact" className="hover:text-slate-950">{t.navContact}</a>
          </nav>
          <div className="flex bg-slate-200/60 p-0.5 rounded border border-slate-200/40 text-[10px] font-mono font-bold">
            {['ru', 'uz', 'kk', 'be', 'en'].map((l) => (
              <button key={l} onClick={() => setLang(l)} className={`px-2.5 py-1 rounded-sm uppercase ${lang === l ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-950'}`}>{l}</button>
            ))}
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section id="about" className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-24 md:py-36 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE4aC0ydi0yaDJ2MnpNMzYgMzRoLTJ2LTJoMnYyek0yMiAyOGgtMnYtMmgyek0yNCAxOGgydi0yaC0ydjJ6TTI2IDI4aDJ2LTJoLTJ2MnpNMTAgMThoMnYtMmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center relative">
            <div className="md:col-span-8 space-y-8">
              <span className="inline-flex items-center px-4 py-1.5 bg-blue-600/30 border border-blue-400/40 text-blue-100 text-[10px] font-mono font-bold uppercase tracking-widest rounded-full backdrop-blur-sm">{t.heroBadge}</span>
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[1.1]">{t.heroTitle}</h1>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">{t.heroSubtitle}</p>
              <div className="flex flex-wrap gap-5 pt-4">
                <a href="#contact" className="group inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white text-sm font-mono font-bold uppercase tracking-wider hover:bg-blue-500 hover:scale-[1.02] active:scale-95 transition-all rounded-full shadow-lg shadow-blue-600/25">
                  {t.heroBtn} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#products" className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-mono font-bold uppercase tracking-wider hover:bg-white/20 transition-all rounded-full">{t.heroSecondaryBtn}</a>
              </div>
            </div>
            <div className="md:col-span-4 flex justify-center">
              <div className="w-64 h-80 md:w-72 md:h-96 bg-slate-800 border border-slate-700 p-3 shadow-2xl rounded-3xl group overflow-hidden">
                <div className="w-full h-full bg-slate-700 rounded-2xl overflow-hidden">
                  <img src="https://i.postimg.cc/CLgDSfNV/my-photo.jpg" alt="CEO & CTO NEXACORE" className="w-full h-full object-cover transition-all duration-700 grayscale-[30%] group-hover:scale-105 group-hover:grayscale-0" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-6 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
              <span className="text-slate-500">{t.trustTitle}</span>
              {t.trustIndustries.map((ind: string) => <span key={ind} className="flex items-center gap-2 text-slate-600"><CheckCircle className="w-4 h-4 text-blue-600" />{ind}</span>)}
            </div>
          </div>
        </section>

        <AnimatedSection id="director" className="py-24 max-w-7xl mx-auto px-6 border-b border-slate-200/60">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <h2 className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold mb-2">01 // {t.navDirector}</h2>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{t.directorTitle}</h3>
              <p className="text-sm font-mono text-slate-400 mt-3 font-bold uppercase tracking-wider">{t.directorPost}</p>
            </div>
            <div className="md:col-span-8 space-y-6">
              <p className="text-base md:text-lg text-slate-600 leading-relaxed font-medium">{t.directorBio}</p>
              <div className="p-6 bg-slate-50 border border-slate-200/60 rounded-2xl font-mono text-xs text-slate-600 leading-relaxed">
                <div className="text-slate-900 font-bold uppercase tracking-wider mb-2.5 text-[10px]">// ARCHITECTURAL STACK</div>
                {t.directorStack}
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="products" className="py-24 max-w-7xl mx-auto px-6 border-b border-slate-200/60">
          <div className="mb-16">
            <h2 className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold mb-2">02 // {t.navProducts}</h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{t.projectsTitle}</h3>
            <p className="text-lg text-slate-500 mt-2">{t.projectsSubtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {t.projects.map((project: any, i: number) => (
              <div key={i} className="group bg-white border border-slate-200/80 p-8 rounded-3xl shadow-sm hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] uppercase font-bold text-slate-400 tracking-wider">{project.tag}</span>
                  <span className="w-2 h-2 bg-slate-900 rounded-full group-hover:bg-blue-600 transition-colors" />
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-3">{project.name}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{project.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="services" className="py-24 max-w-7xl mx-auto px-6 border-b border-slate-200/60">
          <div className="mb-16">
            <h2 className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold mb-2">03 // {t.navServices}</h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{t.servicesTitle}</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {t.services.map((service: any, i: number) => {
              const IconComponent = service.icon || Server;
              return (
                <div key={i} className="group bg-white border border-slate-200/80 p-8 rounded-3xl shadow-sm hover:border-blue-300 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">{service.desc}</p>
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-end justify-between">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">{t.priceFrom}</span>
                    <span className="font-mono text-xl font-black text-slate-900">${service.price}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedSection>

        <AnimatedSection className="py-24 max-w-7xl mx-auto px-6 border-b border-slate-200/60">
          <div className="mb-16">
            <h2 className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold mb-2">{t.processTitle}</h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900">{t.processTitle}</h3>
          </div>
          <div className="grid md:grid-cols-4 gap-10">
            {[1,2,3,4].map(i => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-3xl flex items-center justify-center mx-auto mb-5 font-mono text-3xl font-black shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
                  {String(i).padStart(2,'0')}
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{t[`step${i}Title`]}</h4>
                <p className="text-sm text-slate-500">{t[`step${i}Desc`]}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="py-24 max-w-7xl mx-auto px-6 border-b border-slate-200/60 bg-slate-50/50">
          <div className="mb-16">
            <h2 className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold mb-2">{t.testimonialsTitle}</h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900">{t.testimonialsTitle}</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white border border-slate-200/80 p-10 rounded-3xl shadow-sm">
              <div className="flex gap-1 mb-5 text-yellow-400">{[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}</div>
              <p className="text-slate-600 italic text-lg mb-6">«{t.testimonial1Text}»</p>
              <p className="text-sm font-bold text-slate-900">— {t.testimonial1Author}</p>
            </div>
            <div className="bg-white border border-slate-200/80 p-10 rounded-3xl shadow-sm">
              <div className="flex gap-1 mb-5 text-yellow-400">{[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}</div>
              <p className="text-slate-600 italic text-lg mb-6">«{t.testimonial2Text}»</p>
              <p className="text-sm font-bold text-slate-900">— {t.testimonial2Author}</p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="py-24 max-w-7xl mx-auto px-6 border-b border-slate-200/60">
          <div className="mb-16">
            <h2 className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold mb-2">FAQ</h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900">{t.faqTitle}</h3>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {[0,1,2].map(idx => (
              <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden">
                <button className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 hover:bg-slate-50 transition-colors" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                  <span>{t[`faq${idx+1}Q`]}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && <div className="px-5 pb-5 text-slate-600">{t[`faq${idx+1}A`]}</div>}
              </div>
            ))}
          </div>
        </AnimatedSection>

        <section id="contact" className="py-24 max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold mb-2">04 // {t.navContact}</h2>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900">{t.contactTitle}</h3>
              <p className="text-lg text-slate-500 mt-2">{t.contactSubtitle}</p>
            </div>
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5 space-y-4">
                <a href="mailto:precisionworks2022@gmail.com" className="flex items-center p-5 bg-white border border-slate-200/80 rounded-2xl hover:border-blue-400 hover:shadow-md transition-all group">
                  <div className="w-12 h-12 bg-slate-50 text-slate-700 rounded-full flex items-center justify-center mr-5 group-hover:bg-blue-50 group-hover:text-blue-600"><Mail className="w-5 h-5" /></div>
                  <div><p className="text-[10px] font-mono text-slate-400 font-bold uppercase">Email</p><p className="text-sm font-semibold">precisionworks2022@gmail.com</p></div>
                </a>
                <a href="https://t.me/Anton_199X" target="_blank" rel="noopener noreferrer" className="flex items-center p-5 bg-white border border-slate-200/80 rounded-2xl hover:border-blue-400 hover:shadow-md transition-all group">
                  <div className="w-12 h-12 bg-slate-50 text-slate-700 rounded-full flex items-center justify-center mr-5 group-hover:bg-blue-50 group-hover:text-blue-600"><MessageCircle className="w-5 h-5" /></div>
                  <div><p className="text-[10px] font-mono text-slate-400 font-bold uppercase">Telegram</p><p className="text-sm font-semibold">@Anton_199X</p></div>
                </a>
                <a href="https://www.linkedin.com/in/anton-vylderov-nexacoreai-medtech/" target="_blank" rel="noopener noreferrer" className="flex items-center p-5 bg-white border border-slate-200/80 rounded-2xl hover:border-blue-400 hover:shadow-md transition-all group">
                  <div className="w-12 h-12 bg-slate-50 text-slate-700 rounded-full flex items-center justify-center mr-5 group-hover:bg-blue-50 group-hover:text-blue-600"><Linkedin className="w-5 h-5" /></div>
                  <div><p className="text-[10px] font-mono text-slate-400 font-bold uppercase">LinkedIn</p><p className="text-sm font-semibold">Anton Vylderov</p></div>
                </a>
                <a href="tel:+998931974100" className="flex items-center p-5 bg-white border border-slate-200/80 rounded-2xl hover:border-blue-400 hover:shadow-md transition-all group">
                  <div className="w-12 h-12 bg-slate-50 text-slate-700 rounded-full flex items-center justify-center mr-5 group-hover:bg-blue-50 group-hover:text-blue-600"><Phone className="w-5 h-5" /></div>
                  <div><p className="text-[10px] font-mono text-slate-400 font-bold uppercase">Phone</p><p className="text-sm font-semibold">+998 93 197 41 00</p></div>
                </a>
              </div>
              <div className="lg:col-span-7">
                <div className="bg-white border border-slate-200/80 p-8 rounded-3xl shadow-sm">
                  {formSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-8 h-8" /></div>
                      <h3 className="text-2xl font-black mb-2">{t.successTitle}</h3>
                      <p className="text-slate-500 mb-8">{t.successText}</p>
                      <button onClick={() => setFormSubmitted(false)} className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-bold uppercase rounded-full">{t.successBtn}</button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-slate-500 font-bold mb-2">{t.formName}</label>
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="NEXACORE Enterprise" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-slate-500 font-bold mb-2">{t.formContact}</label>
                        <input type="text" required value={formData.contact} onChange={(e) => setFormData({...formData, contact: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="cto@example.com / @username" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-slate-500 font-bold mb-2">Message / Specs</label>
                        <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none" placeholder={t.formMessage} />
                      </div>
                      <button type="submit" className="w-full py-4 bg-blue-600 text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 active:scale-[0.98] transition-all rounded-xl flex items-center justify-center gap-2">
                        {t.formBtn} <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>
      </main>

      <footer className="border-t border-slate-200/60 bg-white py-10 px-6 mt-12 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-sm font-black text-slate-900">NEXACORE<span className="text-blue-600">.</span></div>
          <div className="flex gap-6 text-slate-400 text-xs font-mono uppercase tracking-wider">
            <a href="https://t.me/Anton_199X" className="hover:text-blue-600">Telegram</a>
            <a href="https://www.linkedin.com/in/anton-vylderov-nexacoreai-medtech/" className="hover:text-blue-600">LinkedIn</a>
            <a href="mailto:precisionworks2022@gmail.com" className="hover:text-blue-600">Email</a>
          </div>
          <p className="text-xs text-slate-400 font-medium">© {new Date().getFullYear()} NEXACORE. {t.footerRights}</p>
        </div>
      </footer>
    </div>
  );
}
