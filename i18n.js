(function () {
  // BCP 47 tags. Mobile apps may pass underscore forms (e.g. "zh_TW") via ?lang=,
  // and navigator.language uses dashes ("zh-TW"); both are normalised below.
  const SUPPORTED = [
    "en", "zh-Hant", "zh-Hans", "ja", "ko", "es", "fr", "de",
    "pt-BR", "it", "ru", "th", "tr", "ar", "vi", "id"
  ];
  const RTL = ["ar"];

  function normalizeLocale(tag) {
    if (!tag) return null;
    const t = String(tag).toLowerCase().replace(/_/g, "-");

    // Chinese: script/region disambiguation. Default unspecified `zh` to Simplified.
    if (t === "zh" || t.startsWith("zh-")) {
      if (t.includes("hant") || /-(tw|hk|mo)(-|$)/.test(t)) return "zh-Hant";
      return "zh-Hans";
    }
    // Portuguese: only Brazilian variant ships, treat all pt-* as pt-BR.
    if (t === "pt" || t.startsWith("pt-")) return "pt-BR";
    // Indonesian: legacy code "in" still appears in some Android stacks.
    if (t === "in" || t.startsWith("in-")) return "id";

    for (const s of SUPPORTED) {
      if (s.toLowerCase() === t) return s;
    }
    const lang = t.split("-")[0];
    for (const s of SUPPORTED) {
      if (s.toLowerCase() === lang) return s;
    }
    return null;
  }

  function resolveLocale() {
    const param = new URLSearchParams(location.search).get("lang");
    const fromUrl = normalizeLocale(param);
    if (fromUrl) return fromUrl;

    const langs = (navigator.languages && navigator.languages.length)
      ? navigator.languages
      : [navigator.language || "en"];
    for (const tag of langs) {
      const norm = normalizeLocale(tag);
      if (norm) return norm;
    }
    return "en";
  }

  const EXT_URL = "https://chromewebstore.google.com/detail/vibe-reader/kbikkdaihbmodkofbcebllhklkjpmemn";
  const EXT_LINK = (text) => '<a href="' + EXT_URL + '" target="_blank" rel="noopener">' + text + '</a>';

  const STRINGS = {
    common: {
      en: {
        title: "Why does my summary look incomplete?",
        intro: "Some websites block access to their full content. When this happens, Vibe Reader can only summarize what's available.",
        whyHeading: "Why this happens",
        whyPaywall: 'The article is behind a <code>paywall</code> (paid subscription needed)',
        whyLogin: 'The website requires <code>login</code>',
        whyBlocks: 'The website <code>blocks external access</code>',
        paywallAlt: "Example of a paywall blocking article content",
        paywallCaption: "Example: A paywall on Medium.com",
        fixHeading: "How to fix it"
      },
      "zh-Hant": {
        title: "為什麼摘要看起來不完整？",
        intro: "有些網站會限制完整內容的存取。發生這種情況時，Vibe Reader 只能根據能讀到的部分產生摘要。",
        whyHeading: "為什麼會這樣",
        whyPaywall: '文章在 <code>付費牆</code> 後面（需要付費訂閱）',
        whyLogin: '網站需要 <code>登入</code>',
        whyBlocks: '網站 <code>禁止外部存取</code>',
        paywallAlt: "付費牆阻擋文章內容的範例",
        paywallCaption: "範例：Medium.com 的付費牆",
        fixHeading: "如何解決"
      },
      "zh-Hans": {
        title: "为什么摘要看起来不完整？",
        intro: "有些网站会限制完整内容的访问。遇到这种情况时，Vibe Reader 只能根据可读取的部分生成摘要。",
        whyHeading: "为什么会这样",
        whyPaywall: '文章在 <code>付费墙</code> 后面（需要付费订阅）',
        whyLogin: '网站需要 <code>登录</code>',
        whyBlocks: '网站 <code>禁止外部访问</code>',
        paywallAlt: "付费墙阻挡文章内容的示例",
        paywallCaption: "示例：Medium.com 上的付费墙",
        fixHeading: "如何解决"
      },
      ja: {
        title: "要約が不完全に見えるのはなぜ？",
        intro: "一部のウェブサイトはコンテンツ全文へのアクセスを制限しています。その場合、Vibe Reader は読み取れる範囲しか要約できません。",
        whyHeading: "考えられる原因",
        whyPaywall: '記事が <code>ペイウォール</code> の向こう側にある（有料購読が必要）',
        whyLogin: 'サイトが <code>ログイン</code> を要求している',
        whyBlocks: 'サイトが <code>外部アクセスをブロック</code> している',
        paywallAlt: "ペイウォールが記事の内容をブロックしている例",
        paywallCaption: "例：Medium.com のペイウォール",
        fixHeading: "解決方法"
      },
      ko: {
        title: "요약이 왜 불완전해 보이나요?",
        intro: "일부 웹사이트는 전체 콘텐츠 접근을 차단합니다. 이런 경우 Vibe Reader는 읽을 수 있는 부분만 요약할 수 있습니다.",
        whyHeading: "이유",
        whyPaywall: '기사가 <code>페이월</code> 뒤에 있습니다 (유료 구독 필요)',
        whyLogin: '웹사이트에 <code>로그인</code>이 필요합니다',
        whyBlocks: '웹사이트가 <code>외부 접근을 차단</code>합니다',
        paywallAlt: "페이월이 기사 콘텐츠를 차단하는 예시",
        paywallCaption: "예시: Medium.com의 페이월",
        fixHeading: "해결 방법"
      },
      es: {
        title: "¿Por qué mi resumen parece incompleto?",
        intro: "Algunos sitios web bloquean el acceso a su contenido completo. Cuando esto ocurre, Vibe Reader solo puede resumir lo que está disponible.",
        whyHeading: "Por qué ocurre esto",
        whyPaywall: 'El artículo está detrás de un <code>muro de pago</code> (se requiere suscripción)',
        whyLogin: 'El sitio web requiere <code>iniciar sesión</code>',
        whyBlocks: 'El sitio web <code>bloquea el acceso externo</code>',
        paywallAlt: "Ejemplo de un muro de pago bloqueando el contenido del artículo",
        paywallCaption: "Ejemplo: Un muro de pago en Medium.com",
        fixHeading: "Cómo solucionarlo"
      },
      fr: {
        title: "Pourquoi mon résumé semble-t-il incomplet ?",
        intro: "Certains sites web bloquent l'accès à leur contenu complet. Dans ce cas, Vibe Reader ne peut résumer que ce qui est accessible.",
        whyHeading: "Pourquoi cela arrive",
        whyPaywall: "L'article est derrière un <code>paywall</code> (abonnement payant requis)",
        whyLogin: 'Le site demande une <code>connexion</code>',
        whyBlocks: "Le site <code>bloque l'accès externe</code>",
        paywallAlt: "Exemple d'un paywall bloquant le contenu d'un article",
        paywallCaption: "Exemple : un paywall sur Medium.com",
        fixHeading: "Comment résoudre"
      },
      de: {
        title: "Warum sieht meine Zusammenfassung unvollständig aus?",
        intro: "Manche Websites blockieren den Zugriff auf ihre vollständigen Inhalte. In diesem Fall kann Vibe Reader nur das zusammenfassen, was verfügbar ist.",
        whyHeading: "Warum passiert das",
        whyPaywall: 'Der Artikel befindet sich hinter einer <code>Paywall</code> (Bezahl-Abo erforderlich)',
        whyLogin: 'Die Website erfordert eine <code>Anmeldung</code>',
        whyBlocks: 'Die Website <code>blockiert externen Zugriff</code>',
        paywallAlt: "Beispiel einer Paywall, die Artikelinhalte blockiert",
        paywallCaption: "Beispiel: Eine Paywall auf Medium.com",
        fixHeading: "So lösen Sie das"
      },
      "pt-BR": {
        title: "Por que meu resumo parece incompleto?",
        intro: "Alguns sites bloqueiam o acesso ao conteúdo completo. Quando isso acontece, o Vibe Reader só consegue resumir o que está disponível.",
        whyHeading: "Por que isso acontece",
        whyPaywall: 'O artigo está atrás de um <code>paywall</code> (assinatura paga necessária)',
        whyLogin: 'O site exige <code>login</code>',
        whyBlocks: 'O site <code>bloqueia o acesso externo</code>',
        paywallAlt: "Exemplo de um paywall bloqueando o conteúdo do artigo",
        paywallCaption: "Exemplo: Um paywall no Medium.com",
        fixHeading: "Como resolver"
      },
      it: {
        title: "Perché il mio riepilogo sembra incompleto?",
        intro: "Alcuni siti web bloccano l'accesso al contenuto completo. In questo caso, Vibe Reader può riassumere solo ciò che è disponibile.",
        whyHeading: "Perché succede",
        whyPaywall: "L'articolo è dietro un <code>paywall</code> (abbonamento a pagamento necessario)",
        whyLogin: 'Il sito richiede il <code>login</code>',
        whyBlocks: "Il sito <code>blocca l'accesso esterno</code>",
        paywallAlt: "Esempio di paywall che blocca il contenuto di un articolo",
        paywallCaption: "Esempio: un paywall su Medium.com",
        fixHeading: "Come risolvere"
      },
      ru: {
        title: "Почему моё резюме выглядит неполным?",
        intro: "Некоторые сайты блокируют доступ к полному содержимому. В таких случаях Vibe Reader может суммировать только то, что доступно.",
        whyHeading: "Почему так происходит",
        whyPaywall: 'Статья находится за <code>платной стеной</code> (требуется платная подписка)',
        whyLogin: 'Сайт требует <code>входа</code>',
        whyBlocks: 'Сайт <code>блокирует внешний доступ</code>',
        paywallAlt: "Пример платной стены, блокирующей содержимое статьи",
        paywallCaption: "Пример: платная стена на Medium.com",
        fixHeading: "Как исправить"
      },
      th: {
        title: "ทำไมสรุปของฉันถึงดูไม่สมบูรณ์?",
        intro: "บางเว็บไซต์บล็อกการเข้าถึงเนื้อหาเต็ม เมื่อเป็นเช่นนั้น Vibe Reader จะสามารถสรุปได้เฉพาะส่วนที่อ่านได้เท่านั้น",
        whyHeading: "ทำไมจึงเป็นเช่นนี้",
        whyPaywall: 'บทความอยู่หลัง <code>paywall</code> (ต้องสมัครสมาชิกแบบเสียเงิน)',
        whyLogin: 'เว็บไซต์ต้อง <code>เข้าสู่ระบบ</code>',
        whyBlocks: 'เว็บไซต์ <code>บล็อกการเข้าถึงจากภายนอก</code>',
        paywallAlt: "ตัวอย่างของ paywall ที่บล็อกเนื้อหาบทความ",
        paywallCaption: "ตัวอย่าง: paywall บน Medium.com",
        fixHeading: "วิธีแก้ไข"
      },
      tr: {
        title: "Özetim neden eksik görünüyor?",
        intro: "Bazı web siteleri tam içeriğe erişimi engeller. Bu durumda Vibe Reader yalnızca erişilebilen kısmı özetleyebilir.",
        whyHeading: "Bunun nedeni",
        whyPaywall: 'Makale bir <code>ödeme duvarının</code> arkasında (ücretli abonelik gerekiyor)',
        whyLogin: 'Web sitesi <code>giriş</code> gerektiriyor',
        whyBlocks: 'Web sitesi <code>dış erişimi engelliyor</code>',
        paywallAlt: "Makale içeriğini engelleyen bir ödeme duvarı örneği",
        paywallCaption: "Örnek: Medium.com'daki bir ödeme duvarı",
        fixHeading: "Nasıl çözülür"
      },
      ar: {
        title: "لماذا يبدو ملخصي غير مكتمل؟",
        intro: "بعض المواقع تحظر الوصول إلى محتواها الكامل. في هذه الحالة، يمكن لـ Vibe Reader تلخيص ما هو متاح فقط.",
        whyHeading: "سبب حدوث ذلك",
        whyPaywall: 'المقال خلف <code>جدار دفع</code> (يلزم اشتراك مدفوع)',
        whyLogin: 'يتطلب الموقع <code>تسجيل الدخول</code>',
        whyBlocks: 'الموقع <code>يحظر الوصول الخارجي</code>',
        paywallAlt: "مثال على جدار دفع يحجب محتوى المقال",
        paywallCaption: "مثال: جدار دفع على Medium.com",
        fixHeading: "كيفية الحل"
      },
      vi: {
        title: "Vì sao bản tóm tắt của tôi trông không đầy đủ?",
        intro: "Một số trang web chặn truy cập vào toàn bộ nội dung. Khi đó, Vibe Reader chỉ có thể tóm tắt những gì đọc được.",
        whyHeading: "Vì sao điều này xảy ra",
        whyPaywall: 'Bài viết nằm sau <code>paywall</code> (yêu cầu đăng ký trả phí)',
        whyLogin: 'Trang web yêu cầu <code>đăng nhập</code>',
        whyBlocks: 'Trang web <code>chặn truy cập từ bên ngoài</code>',
        paywallAlt: "Ví dụ về paywall chặn nội dung bài viết",
        paywallCaption: "Ví dụ: Một paywall trên Medium.com",
        fixHeading: "Cách khắc phục"
      },
      id: {
        title: "Mengapa ringkasan saya terlihat tidak lengkap?",
        intro: "Beberapa situs web memblokir akses ke konten lengkap. Saat ini terjadi, Vibe Reader hanya dapat meringkas apa yang tersedia.",
        whyHeading: "Mengapa hal ini terjadi",
        whyPaywall: 'Artikel berada di balik <code>paywall</code> (perlu langganan berbayar)',
        whyLogin: 'Situs web mewajibkan <code>login</code>',
        whyBlocks: 'Situs web <code>memblokir akses eksternal</code>',
        paywallAlt: "Contoh paywall yang memblokir konten artikel",
        paywallCaption: "Contoh: Paywall di Medium.com",
        fixHeading: "Cara memperbaikinya"
      }
    },
    ios: {
      en: {
        step1: 'Tap <strong>"Open Link"</strong> → go to the original page',
        step2: '<strong>Sign in</strong> or unlock the article',
        step3: 'Tap the <strong>Share</strong> button ↑ → send it back to Vibe Reader',
        step4: "Done — you'll get a <strong>complete summary</strong>",
        stepsAlt: "Steps to open the original page, sign in, and share back to Vibe Reader"
      },
      "zh-Hant": {
        step1: '點選 <strong>「開啟連結」</strong> → 前往原始網頁',
        step2: '<strong>登入</strong>或解鎖該文章',
        step3: '點選 <strong>分享</strong> 按鈕 ↑ → 把文章傳回 Vibe Reader',
        step4: '完成——你會得到<strong>完整摘要</strong>',
        stepsAlt: "開啟原始網頁、登入、再分享回 Vibe Reader 的步驟"
      },
      "zh-Hans": {
        step1: '点击 <strong>「打开链接」</strong> → 打开原始网页',
        step2: '<strong>登录</strong>或解锁该文章',
        step3: '点击 <strong>分享</strong> 按钮 ↑ → 把文章发回 Vibe Reader',
        step4: '完成——你将获得<strong>完整摘要</strong>',
        stepsAlt: "打开原始网页、登录，再分享回 Vibe Reader 的步骤"
      },
      ja: {
        step1: '<strong>「リンクを開く」</strong> をタップ → 元のページを開く',
        step2: '記事に <strong>サインイン</strong> またはロックを解除する',
        step3: '<strong>共有</strong> ボタン ↑ をタップ → Vibe Reader に送り返す',
        step4: '完了——<strong>完全な要約</strong>が得られます',
        stepsAlt: "元のページを開き、サインインして、Vibe Reader に共有し直す手順"
      },
      ko: {
        step1: '<strong>"링크 열기"</strong>를 탭 → 원본 페이지로 이동',
        step2: '<strong>로그인</strong>하거나 기사 잠금 해제',
        step3: '<strong>공유</strong> 버튼 ↑을 탭 → Vibe Reader로 다시 전송',
        step4: '완료 — <strong>완전한 요약</strong>을 받을 수 있습니다',
        stepsAlt: "원본 페이지를 열고, 로그인하고, Vibe Reader로 다시 공유하는 단계"
      },
      es: {
        step1: 'Toca <strong>"Abrir enlace"</strong> → ve a la página original',
        step2: '<strong>Inicia sesión</strong> o desbloquea el artículo',
        step3: 'Toca el botón <strong>Compartir</strong> ↑ → envíalo de vuelta a Vibe Reader',
        step4: 'Listo — obtendrás un <strong>resumen completo</strong>',
        stepsAlt: "Pasos para abrir la página original, iniciar sesión y compartir de vuelta a Vibe Reader"
      },
      fr: {
        step1: 'Touchez <strong>« Ouvrir le lien »</strong> → ouvrez la page d’origine',
        step2: '<strong>Connectez-vous</strong> ou déverrouillez l’article',
        step3: 'Touchez le bouton <strong>Partager</strong> ↑ → renvoyez-le à Vibe Reader',
        step4: 'Terminé — vous obtiendrez un <strong>résumé complet</strong>',
        stepsAlt: "Étapes pour ouvrir la page d’origine, se connecter et la repartager vers Vibe Reader"
      },
      de: {
        step1: 'Tippe auf <strong>„Link öffnen"</strong> → öffne die Originalseite',
        step2: '<strong>Melde dich an</strong> oder schalte den Artikel frei',
        step3: 'Tippe auf die <strong>Teilen</strong>-Taste ↑ → sende ihn zurück an Vibe Reader',
        step4: 'Fertig — du erhältst eine <strong>vollständige Zusammenfassung</strong>',
        stepsAlt: "Schritte zum Öffnen der Originalseite, Anmelden und erneuten Teilen mit Vibe Reader"
      },
      "pt-BR": {
        step1: 'Toque em <strong>"Abrir link"</strong> → vá para a página original',
        step2: '<strong>Faça login</strong> ou desbloqueie o artigo',
        step3: 'Toque no botão <strong>Compartilhar</strong> ↑ → envie de volta para o Vibe Reader',
        step4: 'Pronto — você terá um <strong>resumo completo</strong>',
        stepsAlt: "Passos para abrir a página original, fazer login e compartilhar de volta para o Vibe Reader"
      },
      it: {
        step1: 'Tocca <strong>"Apri link"</strong> → vai alla pagina originale',
        step2: "<strong>Accedi</strong> o sblocca l'articolo",
        step3: 'Tocca il pulsante <strong>Condividi</strong> ↑ → invialo di nuovo a Vibe Reader',
        step4: 'Fatto — otterrai un <strong>riepilogo completo</strong>',
        stepsAlt: "Passaggi per aprire la pagina originale, accedere e condividere di nuovo con Vibe Reader"
      },
      ru: {
        step1: 'Нажмите <strong>«Открыть ссылку»</strong> → перейдите на исходную страницу',
        step2: '<strong>Войдите</strong> или разблокируйте статью',
        step3: 'Нажмите кнопку <strong>Поделиться</strong> ↑ → отправьте её обратно в Vibe Reader',
        step4: 'Готово — вы получите <strong>полное резюме</strong>',
        stepsAlt: "Шаги: открыть исходную страницу, войти и поделиться снова в Vibe Reader"
      },
      th: {
        step1: 'แตะ <strong>"เปิดลิงก์"</strong> → ไปที่หน้าต้นฉบับ',
        step2: '<strong>เข้าสู่ระบบ</strong> หรือปลดล็อกบทความ',
        step3: 'แตะปุ่ม <strong>แชร์</strong> ↑ → ส่งกลับไปที่ Vibe Reader',
        step4: 'เสร็จสิ้น — คุณจะได้รับ<strong>สรุปฉบับสมบูรณ์</strong>',
        stepsAlt: "ขั้นตอนการเปิดหน้าต้นฉบับ เข้าสู่ระบบ และแชร์กลับไปที่ Vibe Reader"
      },
      tr: {
        step1: '<strong>"Bağlantıyı Aç"</strong> öğesine dokunun → orijinal sayfaya gidin',
        step2: 'Makaleye <strong>giriş yapın</strong> veya kilidini açın',
        step3: "<strong>Paylaş</strong> düğmesine ↑ dokunun → Vibe Reader'a geri gönderin",
        step4: 'Tamam — <strong>tam özeti</strong> alacaksınız',
        stepsAlt: "Orijinal sayfayı açma, giriş yapma ve Vibe Reader'a tekrar paylaşma adımları"
      },
      ar: {
        step1: 'انقر على <strong>"فتح الرابط"</strong> ← اذهب إلى الصفحة الأصلية',
        step2: '<strong>سجّل الدخول</strong> أو افتح قفل المقال',
        step3: 'انقر على زر <strong>المشاركة</strong> ↑ ← أعِد إرساله إلى Vibe Reader',
        step4: 'تم — ستحصل على <strong>ملخص كامل</strong>',
        stepsAlt: "خطوات فتح الصفحة الأصلية، تسجيل الدخول، والمشاركة مرة أخرى إلى Vibe Reader"
      },
      vi: {
        step1: 'Nhấn <strong>"Mở liên kết"</strong> → đi đến trang gốc',
        step2: '<strong>Đăng nhập</strong> hoặc mở khóa bài viết',
        step3: 'Nhấn nút <strong>Chia sẻ</strong> ↑ → gửi lại về Vibe Reader',
        step4: 'Xong — bạn sẽ nhận được <strong>bản tóm tắt đầy đủ</strong>',
        stepsAlt: "Các bước mở trang gốc, đăng nhập và chia sẻ lại về Vibe Reader"
      },
      id: {
        step1: 'Ketuk <strong>"Buka Tautan"</strong> → buka halaman aslinya',
        step2: '<strong>Masuk</strong> atau buka kunci artikel',
        step3: 'Ketuk tombol <strong>Bagikan</strong> ↑ → kirim kembali ke Vibe Reader',
        step4: 'Selesai — kamu akan mendapatkan <strong>ringkasan lengkap</strong>',
        stepsAlt: "Langkah-langkah membuka halaman asli, masuk, dan membagikan kembali ke Vibe Reader"
      }
    },
    android: {
      en: {
        androidFixIntro: "Android can't yet send articles back from the browser. For now, the easiest fix is to use the <strong>Vibe Reader Chrome extension</strong> on your desktop — articles you save there will sync back to your Android app.",
        androidStep1: 'Install the ' + EXT_LINK("Vibe Reader Chrome extension"),
        androidStep2: 'On your desktop, open the article in Chrome and <strong>sign in</strong> or unlock it',
        androidStep3: 'Click the <strong>Vibe Reader</strong> icon in the toolbar → the page is sent to your account',
        androidStep4: "Open Vibe Reader on Android — you'll see the <strong>complete summary</strong>"
      },
      "zh-Hant": {
        androidFixIntro: 'Android 目前還無法從瀏覽器把文章傳回 app。最方便的做法是在桌機使用 <strong>Vibe Reader Chrome 擴充功能</strong>——在那邊儲存的文章會同步回 Android app。',
        androidStep1: '安裝 ' + EXT_LINK("Vibe Reader Chrome 擴充功能"),
        androidStep2: '在桌機用 Chrome 開啟文章，並先<strong>登入</strong>或解鎖內容',
        androidStep3: '點擊工具列上的 <strong>Vibe Reader</strong> 圖示 → 文章會送到你的帳號',
        androidStep4: '打開 Android 上的 Vibe Reader——就能看到<strong>完整摘要</strong>'
      },
      "zh-Hans": {
        androidFixIntro: 'Android 目前还无法从浏览器把文章发回 app。最方便的做法是在桌面端使用 <strong>Vibe Reader Chrome 扩展</strong>——在那边保存的文章会同步回你的 Android app。',
        androidStep1: '安装 ' + EXT_LINK("Vibe Reader Chrome 扩展"),
        androidStep2: '在桌面端用 Chrome 打开文章，并先<strong>登录</strong>或解锁内容',
        androidStep3: '点击工具栏上的 <strong>Vibe Reader</strong> 图标 → 文章会发送到你的账户',
        androidStep4: '打开 Android 上的 Vibe Reader——你将看到<strong>完整摘要</strong>'
      },
      ja: {
        androidFixIntro: 'Android はブラウザから記事を送り返す機能にまだ対応していません。当面は、デスクトップで <strong>Vibe Reader Chrome 拡張機能</strong> を使うのが最も簡単です——そこで保存した記事は Android アプリに同期されます。',
        androidStep1: EXT_LINK("Vibe Reader Chrome 拡張機能") + ' をインストール',
        androidStep2: 'デスクトップの Chrome で記事を開き、<strong>サインイン</strong> またはロックを解除',
        androidStep3: 'ツールバーの <strong>Vibe Reader</strong> アイコンをクリック → ページがアカウントに送信されます',
        androidStep4: 'Android で Vibe Reader を開く——<strong>完全な要約</strong>が表示されます'
      },
      ko: {
        androidFixIntro: 'Android는 아직 브라우저에서 기사를 다시 보내는 기능을 지원하지 않습니다. 현재 가장 쉬운 방법은 데스크톱에서 <strong>Vibe Reader Chrome 확장 프로그램</strong>을 사용하는 것입니다 — 거기서 저장한 기사가 Android 앱으로 동기화됩니다.',
        androidStep1: EXT_LINK("Vibe Reader Chrome 확장 프로그램") + ' 설치',
        androidStep2: '데스크톱 Chrome에서 기사를 열고 <strong>로그인</strong>하거나 잠금 해제',
        androidStep3: '툴바의 <strong>Vibe Reader</strong> 아이콘 클릭 → 페이지가 계정으로 전송됩니다',
        androidStep4: 'Android에서 Vibe Reader를 열면 — <strong>완전한 요약</strong>이 표시됩니다'
      },
      es: {
        androidFixIntro: 'Android todavía no permite enviar artículos de vuelta desde el navegador. Por ahora, la solución más sencilla es usar la <strong>extensión Vibe Reader para Chrome</strong> en tu escritorio — los artículos que guardes ahí se sincronizarán con tu app de Android.',
        androidStep1: 'Instala la ' + EXT_LINK("extensión Vibe Reader para Chrome"),
        androidStep2: 'En tu escritorio, abre el artículo en Chrome e <strong>inicia sesión</strong> o desbloquéalo',
        androidStep3: 'Haz clic en el icono de <strong>Vibe Reader</strong> en la barra de herramientas → la página se envía a tu cuenta',
        androidStep4: 'Abre Vibe Reader en Android — verás el <strong>resumen completo</strong>'
      },
      fr: {
        androidFixIntro: "Android ne permet pas encore de renvoyer des articles depuis le navigateur. Pour l’instant, la solution la plus simple est d’utiliser l’<strong>extension Chrome Vibe Reader</strong> sur votre ordinateur — les articles que vous y enregistrez seront synchronisés avec votre app Android.",
        androidStep1: "Installez l’" + EXT_LINK("extension Chrome Vibe Reader"),
        androidStep2: "Sur votre ordinateur, ouvrez l’article dans Chrome et <strong>connectez-vous</strong> ou déverrouillez-le",
        androidStep3: "Cliquez sur l’icône <strong>Vibe Reader</strong> dans la barre d’outils → la page est envoyée à votre compte",
        androidStep4: 'Ouvrez Vibe Reader sur Android — vous verrez le <strong>résumé complet</strong>'
      },
      de: {
        androidFixIntro: 'Android kann Artikel noch nicht aus dem Browser zurücksenden. Im Moment ist die einfachste Lösung, die <strong>Vibe Reader Chrome-Erweiterung</strong> auf deinem Desktop zu verwenden — dort gespeicherte Artikel werden mit deiner Android-App synchronisiert.',
        androidStep1: 'Installiere die ' + EXT_LINK("Vibe Reader Chrome-Erweiterung"),
        androidStep2: 'Öffne den Artikel auf deinem Desktop in Chrome und <strong>melde dich an</strong> oder schalte ihn frei',
        androidStep3: 'Klicke auf das <strong>Vibe Reader</strong>-Symbol in der Symbolleiste → die Seite wird an dein Konto gesendet',
        androidStep4: 'Öffne Vibe Reader auf Android — du siehst die <strong>vollständige Zusammenfassung</strong>'
      },
      "pt-BR": {
        androidFixIntro: 'O Android ainda não permite enviar artigos de volta a partir do navegador. Por enquanto, a solução mais fácil é usar a <strong>extensão Vibe Reader para Chrome</strong> no seu desktop — os artigos que você salvar ali serão sincronizados com o app Android.',
        androidStep1: 'Instale a ' + EXT_LINK("extensão Vibe Reader para Chrome"),
        androidStep2: 'No seu desktop, abra o artigo no Chrome e <strong>faça login</strong> ou desbloqueie-o',
        androidStep3: 'Clique no ícone do <strong>Vibe Reader</strong> na barra de ferramentas → a página é enviada para sua conta',
        androidStep4: 'Abra o Vibe Reader no Android — você verá o <strong>resumo completo</strong>'
      },
      it: {
        androidFixIntro: "Android non permette ancora di rimandare gli articoli dal browser. Per ora, la soluzione più semplice è usare l'<strong>estensione Vibe Reader per Chrome</strong> sul desktop — gli articoli salvati lì verranno sincronizzati con la tua app Android.",
        androidStep1: "Installa l'" + EXT_LINK("estensione Vibe Reader per Chrome"),
        androidStep2: 'Sul desktop, apri l’articolo in Chrome e <strong>accedi</strong> o sbloccalo',
        androidStep3: "Clicca sull'icona <strong>Vibe Reader</strong> nella barra degli strumenti → la pagina viene inviata al tuo account",
        androidStep4: 'Apri Vibe Reader su Android — vedrai il <strong>riepilogo completo</strong>'
      },
      ru: {
        androidFixIntro: 'Android пока не позволяет отправлять статьи из браузера обратно. Сейчас самое простое решение — использовать <strong>расширение Vibe Reader для Chrome</strong> на компьютере. Статьи, сохранённые там, синхронизируются с приложением Android.',
        androidStep1: 'Установите ' + EXT_LINK("расширение Vibe Reader для Chrome"),
        androidStep2: 'На компьютере откройте статью в Chrome и <strong>войдите</strong> или разблокируйте её',
        androidStep3: 'Нажмите значок <strong>Vibe Reader</strong> на панели инструментов → страница будет отправлена в ваш аккаунт',
        androidStep4: 'Откройте Vibe Reader на Android — вы увидите <strong>полное резюме</strong>'
      },
      th: {
        androidFixIntro: 'Android ยังไม่รองรับการส่งบทความกลับจากเบราว์เซอร์ ขณะนี้วิธีที่ง่ายที่สุดคือใช้ <strong>ส่วนขยาย Vibe Reader สำหรับ Chrome</strong> บนเดสก์ท็อป — บทความที่คุณบันทึกที่นั่นจะซิงค์กลับมาที่แอป Android',
        androidStep1: 'ติดตั้ง ' + EXT_LINK("ส่วนขยาย Vibe Reader สำหรับ Chrome"),
        androidStep2: 'บนเดสก์ท็อป เปิดบทความใน Chrome และ <strong>เข้าสู่ระบบ</strong> หรือปลดล็อก',
        androidStep3: 'คลิกไอคอน <strong>Vibe Reader</strong> ในแถบเครื่องมือ → หน้าจะถูกส่งไปยังบัญชีของคุณ',
        androidStep4: 'เปิด Vibe Reader บน Android — คุณจะเห็น<strong>สรุปฉบับสมบูรณ์</strong>'
      },
      tr: {
        androidFixIntro: "Android henüz makaleleri tarayıcıdan geri göndermeyi desteklemiyor. Şu an için en kolay çözüm, masaüstünüzde <strong>Vibe Reader Chrome uzantısını</strong> kullanmaktır — orada kaydettiğiniz makaleler Android uygulamanıza senkronize olur.",
        androidStep1: EXT_LINK("Vibe Reader Chrome uzantısını") + ' yükleyin',
        androidStep2: "Masaüstünüzde makaleyi Chrome'da açın ve <strong>giriş yapın</strong> veya kilidini açın",
        androidStep3: 'Araç çubuğundaki <strong>Vibe Reader</strong> simgesine tıklayın → sayfa hesabınıza gönderilir',
        androidStep4: "Android'de Vibe Reader'ı açın — <strong>tam özeti</strong> göreceksiniz"
      },
      ar: {
        androidFixIntro: 'لا يدعم Android بعد إعادة إرسال المقالات من المتصفح. حالياً، الحل الأسهل هو استخدام <strong>إضافة Vibe Reader لـ Chrome</strong> على سطح المكتب — المقالات التي تحفظها هناك ستتم مزامنتها مع تطبيق Android.',
        androidStep1: 'ثبّت ' + EXT_LINK("إضافة Vibe Reader لـ Chrome"),
        androidStep2: 'على سطح المكتب، افتح المقال في Chrome و<strong>سجّل الدخول</strong> أو افتح قفله',
        androidStep3: 'انقر على أيقونة <strong>Vibe Reader</strong> في شريط الأدوات ← ستُرسل الصفحة إلى حسابك',
        androidStep4: 'افتح Vibe Reader على Android — سترى <strong>الملخص الكامل</strong>'
      },
      vi: {
        androidFixIntro: 'Android vẫn chưa hỗ trợ gửi bài viết trở lại từ trình duyệt. Hiện tại, cách dễ nhất là sử dụng <strong>tiện ích mở rộng Vibe Reader cho Chrome</strong> trên máy tính — các bài viết bạn lưu ở đó sẽ đồng bộ về app Android.',
        androidStep1: 'Cài đặt ' + EXT_LINK("tiện ích mở rộng Vibe Reader cho Chrome"),
        androidStep2: 'Trên máy tính, mở bài viết trong Chrome và <strong>đăng nhập</strong> hoặc mở khóa',
        androidStep3: 'Nhấp vào biểu tượng <strong>Vibe Reader</strong> trên thanh công cụ → trang sẽ được gửi đến tài khoản của bạn',
        androidStep4: 'Mở Vibe Reader trên Android — bạn sẽ thấy <strong>bản tóm tắt đầy đủ</strong>'
      },
      id: {
        androidFixIntro: 'Android belum mendukung pengiriman artikel kembali dari browser. Saat ini, solusi termudah adalah menggunakan <strong>ekstensi Vibe Reader untuk Chrome</strong> di desktop — artikel yang kamu simpan di sana akan tersinkronisasi dengan app Android.',
        androidStep1: 'Pasang ' + EXT_LINK("ekstensi Vibe Reader untuk Chrome"),
        androidStep2: 'Di desktop, buka artikel di Chrome dan <strong>masuk</strong> atau buka kuncinya',
        androidStep3: 'Klik ikon <strong>Vibe Reader</strong> di toolbar → halaman akan dikirim ke akunmu',
        androidStep4: 'Buka Vibe Reader di Android — kamu akan melihat <strong>ringkasan lengkap</strong>'
      }
    }
  };

  window.applyI18n = function (pageKey) {
    const locale = resolveLocale();
    const fallback = "en";
    const commonHas = !!STRINGS.common[locale];
    const pageHas = !!(STRINGS[pageKey] && STRINGS[pageKey][locale]);
    const effective = (commonHas && pageHas) ? locale : fallback;

    const dict = Object.assign(
      {},
      STRINGS.common[effective],
      (STRINGS[pageKey] && STRINGS[pageKey][effective]) || {}
    );

    document.documentElement.lang = effective;
    if (RTL.indexOf(effective) !== -1) {
      document.documentElement.dir = "rtl";
    }
    if (dict.title) {
      document.title = dict.title + " — Vibe Reader";
    }

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      const value = dict[key];
      if (value == null) return;
      const attr = el.getAttribute("data-i18n-attr");
      if (attr) el.setAttribute(attr, value);
      else el.innerHTML = value;
    });

    document.documentElement.classList.remove("i18n-loading");
  };
})();
