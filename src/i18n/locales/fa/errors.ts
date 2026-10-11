import type { PartialMessages } from '../../en';

export default {
  // Generic
  'err.generic': 'مشکلی پیش آمد. لطفاً دوباره تلاش کنید.',
  'err.unknown': 'خطای ناشناخته',

  // File validation
  'err.files.limit': 'به حد مجاز {max} فایل رسیده‌اید.',
  'err.files.unsupportedType': 'نوع فایل پشتیبانی نمی‌شود. قالب‌های قابل قبول: {types}.',
  'err.files.empty': 'فایل خالی است.',
  'err.files.tooLarge': 'بیش از حد بزرگ است ({size}). حداکثر {max} است.',
  'err.files.onlyOne': 'هر بار فقط یک فایل قابل استفاده است.',

  // JSON
  'err.json.badUnicode': 'دنباله گریز یونیکد نامعتبر است',
  'err.json.badEscape': 'دنباله گریز نامعتبر در رشته',
  'err.json.controlChar': 'نویسه کنترلی بدون گریز در رشته (برای رفتن به خط بعد از \\n استفاده کنید)',
  'err.json.unterminatedString': 'رشته پایان نیافته است',
  'err.json.invalidNumber': 'عدد نامعتبر است',
  'err.json.unexpectedEnd': 'پایان غیرمنتظره JSON',
  'err.json.trailingComma': 'ویرگول انتهایی در JSON مجاز نیست',
  'err.json.propertyName': 'نام ویژگی باید داخل گیومه دوتایی باشد',
  'err.json.doubleQuotes': 'رشته‌ها باید از گیومه دوتایی استفاده کنند',
  'err.json.unexpectedChar': 'نویسه غیرمنتظره "{char}"',
  'err.json.trailingContent': 'محتوای غیرمنتظره پس از پایان مقدار JSON',
  'err.json.empty': 'برای ادامه مقداری JSON وارد کنید.',
  'err.json.invalid': 'JSON نامعتبر است',

  // XML
  'err.xml.empty': 'برای ادامه مقداری XML وارد کنید.',
  'err.xml.unterminatedComment': 'توضیح پایان نیافته است',
  'err.xml.unterminatedPi': 'دستور پردازش پایان نیافته است',
  'err.xml.unterminatedDeclaration': 'اعلان پایان نیافته است',
  'err.xml.unterminatedAttribute': 'مقدار ویژگی پایان نیافته است',
  'err.xml.unterminatedTag': 'تگ پایان نیافته است',
  'err.xml.unexpectedClosing': 'تگ پایانی غیرمنتظره </{name}>',
  'err.xml.mismatched': 'تگ پایانی ناهماهنگ: انتظار </{expected}> بود اما </{found}> پیدا شد',
  'err.xml.invalidTagName': 'نام تگ "{name}" نامعتبر است',
  'err.xml.unclosedTag': 'تگ <{name}> بسته نشده است',
  'err.xml.noElement': 'هیچ عنصر XML پیدا نشد',
  'err.xml.singleRoot': 'یک سند XML باید دقیقاً یک عنصر ریشه داشته باشد',
  'err.xml.strayText': 'متن بیرون از عنصر ریشه مجاز نیست',

  // Developer tools
  'err.dev.malformedPercent': 'متن شامل یک دنباله درصدی نادرست است (مثلاً «%» که دو رقم هگزادسیمال بعد از آن نیامده است).',
  'err.dev.badBase64': 'این Base64 معتبر نیست. نویسه‌های جاافتاده، اضافه یا پشتیبانی‌نشده را بررسی کنید.',
  'err.dev.notUtf8': 'داده رمزگشایی‌شده متن UTF-8 معتبر نیست. ممکن است داده دودویی مانند یک تصویر باشد.',
  'err.dev.noCharType': 'دست‌کم یک نوع نویسه انتخاب کنید.',
  'err.dev.timestampFormat': 'تعداد ثانیه یا میلی‌ثانیه از 1970-01-01 UTC را وارد کنید.',
  'err.dev.timestampRange': 'این برچسب زمانی خارج از بازه تاریخ پشتیبانی‌شده است.',
  'err.regex.invalid': 'عبارت منظم نامعتبر است',
  'err.regex.timeout': 'اجرای این الگو بیش از حد طول کشید و متوقف شد. ممکن است باعث بازگشت به عقب فاجعه‌بار شود (مثلاً تکرار تو در تو مانند (a+)+).',

  // GIF
  'err.gif.noImages': 'دست‌کم یک تصویر اضافه کنید.',
  'err.gif.tooManyFrames': 'یک GIF حداکثر می‌تواند {max} فریم داشته باشد.',
  'err.gif.sizeNotInteger': 'اندازه GIF باید تعداد صحیحی از پیکسل‌ها باشد.',
  'err.gif.tooLarge': 'GIF بیش از حد بزرگ است.',
  'err.gif.tooLargeToBuild': 'ساخت این GIF برای مرورگر شما بیش از حد بزرگ است. اندازه کوچک‌تر یا فریم‌های کمتری انتخاب کنید.',
  'err.gif.colours': '16، 32، 64، 128 یا 256 رنگ انتخاب کنید.',
  'err.gif.frameMismatch': 'یکی از فریم‌ها با اندازه GIF مطابقت ندارد.',
  'err.gif.notGif': 'فایل GIF نیست.',
  'err.gif.damaged': 'داده GIF آسیب دیده است.',
  'err.gif.incomplete': 'داده GIF ناقص است.',

  // Images
  'err.image.processingFailed': 'پردازش ناموفق بود.',
  'err.image.noCanvas': 'ساخت سطح ترسیم ممکن نشد. ممکن است تصویر برای این دستگاه بیش از حد بزرگ باشد.',
  'err.image.resultTooBig': 'نتیجه {width} × {height} px می‌شود که بزرگ‌تر از حد امن این ابزار مرورگری است (حداکثر {max} px در هر ضلع).',
  'err.image.watermarkTooSmall': 'واترمارک برای کاشی‌کاری بیش از حد کوچک است. اندازه بزرگ‌تر یا یک نشان تکی انتخاب کنید.',
  'err.image.notLarger': 'اندازه‌ای بزرگ‌تر از اصل انتخاب کنید. برای کوچک کردن تصاویر از «تغییر اندازه تصویر» استفاده کنید.',
  'err.image.notSvg': 'این فایل شبیه یک تصویر SVG نیست.',
  'err.image.svgFailed': 'ترسیم این SVG ممکن نشد. ممکن است نامعتبر باشد یا از قابلیت‌هایی استفاده کند که مرورگرها پشتیبانی نمی‌کنند.',
  'err.image.encodeFailed': 'مرورگر نتوانست این تصویر را کدگذاری کند.',
  'err.image.formatUnsupported': 'مرورگر شما نمی‌تواند تصاویر {format} را ذخیره کند. قالب خروجی دیگری را امتحان کنید یا از نسخه فعلی Chrome، Edge یا Firefox استفاده کنید.',
  'err.image.unreadable': 'خواندن این فایل به‌عنوان تصویر ممکن نشد. ممکن است خراب باشد یا قالب آن پشتیبانی نشود.',

  // OCR
  'err.ocr.engineStart': 'راه‌اندازی موتور OCR ممکن نشد. صفحه را دوباره بارگذاری کنید و تلاش کنید؛ اگر باز هم ناموفق بود، ممکن است مرورگر شما از WebAssembly پشتیبانی نکند.',

  // Passwords
  'err.passwords.chooseCase': 'حروف بزرگ، حروف کوچک یا هر دو را انتخاب کنید.',
  'err.passwords.length': 'طولی بین {min} و {max} انتخاب کنید.',
  'err.passwords.chooseCategory': 'دست‌کم یک دسته کلمه انتخاب کنید.',
  'err.passwords.cannotBuild': 'با این تنظیمات نمی‌توان گذرواژه مبتنی بر نام ساخت. طول دیگری را امتحان کنید یا اعداد یا نمادها را روشن کنید.',

  // QR codes
  'err.qr.noText': 'ابتدا مقداری متن یا پیوند وارد کنید.',
  'err.qr.tooMuchData': 'این مقدار داده برای کد QR در این سطح تصحیح خطا بیش از حد است. متن را کوتاه کنید یا سطح پایین‌تری انتخاب کنید.',
  'err.qr.badColours': 'رنگ‌های معتبر انتخاب کنید.',
  'err.qr.wifiName': 'نام شبکه را وارد کنید.',
  'err.qr.wifiPassword': 'گذرواژه Wi-Fi را وارد کنید یا «بدون گذرواژه» را انتخاب کنید.',
  'err.qr.email': 'یک نشانی ایمیل معتبر وارد کنید.',
  'err.qr.phone': 'شماره تلفن را با ارقام و در صورت نیاز با + در ابتدا وارد کنید.',
  'err.qr.unreadableImage': 'خواندن این تصویر ممکن نشد. ممکن است برای این دستگاه بیش از حد بزرگ باشد.',

  // PDF: reading and general
  'err.pdf.onlyOne': 'هر بار فقط یک PDF قابل استفاده است.',
  'err.pdf.unreadable': 'خواندن این فایل به‌عنوان PDF ممکن نشد. ممکن است خراب باشد یا اصلاً PDF نباشد.',
  'err.pdf.passwordProtected': 'این PDF با گذرواژه محافظت شده است. ابتدا گذرواژه را با ابزار «باز کردن قفل PDF» بردارید و دوباره تلاش کنید.',
  'err.pdf.pageMissing': 'صفحه {page} در این سند وجود ندارد.',
  'err.pdf.noCanvas': 'مرورگر شما نتوانست برای این صفحه سطح ترسیم بسازد.',
  'err.pdf.encodePage': 'مرورگر نتوانست این صفحه را به‌صورت تصویر کدگذاری کند.',
  'err.pdf.encodePageImage': 'مرورگر نتوانست تصویر یک صفحه را کدگذاری کند.',
  'err.pdf.renderTooLarge': 'این صفحه برای نمایش با وضوح انتخابی بیش از حد بزرگ است. DPI پایین‌تری را امتحان کنید.',
  'err.pdf.previewTooLarge': 'این صفحه برای پیش‌نمایش بیش از حد بزرگ است.',
  'err.pdf.flattenTooLarge': 'یکی از صفحه‌ها برای پردازش با این کیفیت بیش از حد بزرگ است. کیفیت پایین‌تری انتخاب کنید.',
  'err.pdf.compareSize': 'هر دو تصویر باید اندازه یکسان داشته باشند.',

  // PDF: merge, split, pages
  'err.pdf.mergeNeedTwo': 'برای ادغام، دست‌کم دو فایل PDF اضافه کنید.',
  'err.pdf.mergeFile': '{name}: {message}',
  'err.pdf.fileN': 'فایل {n}',
  'err.pdf.selectPage': 'دست‌کم یک صفحه انتخاب کنید.',
  'err.pdf.selectedPageMissing': 'یکی از صفحه‌های انتخاب‌شده در این PDF وجود ندارد.',
  'err.pdf.enterPages': 'صفحه‌های مورد نظر را وارد کنید، مثلاً 1-3, 5.',
  'err.pdf.enterRanges': 'بازه‌های هر فایل خروجی را وارد کنید، مثلاً 1-3, 4-6.',
  'err.pdf.badRange': '"{token}" صفحه یا بازه معتبری نیست.',
  'err.pdf.rangeOutside.one': '"{token}" خارج از این سند است که {count} صفحه دارد.',
  'err.pdf.rangeOutside.other': '"{token}" خارج از این سند است که {count} صفحه دارد.',
  'err.pdf.rangeBackwards': '"{token}" برعکس است. بازه‌ها را از کوچک به بزرگ بنویسید، مثل {example}.',
  'err.pdf.noImages': 'دست‌کم یک تصویر اضافه کنید.',
  'err.pdf.imageEmbed': 'جاسازی یکی از تصاویر ممکن نشد. ممکن است خراب باشد یا از گونه پشتیبانی‌نشده‌ای استفاده کند.',

  // PDF: editing
  'err.pdf.latinOnly': 'اینجا فقط حروف لاتین، ارقام و نمادهای رایج قابل استفاده است، زیرا فونت‌های داخلی PDF الفبای دیگر را شامل نمی‌شوند.',
  'err.pdf.badColour': 'یک رنگ معتبر انتخاب کنید.',
  'err.pdf.badPages': 'صفحه‌های معتبر انتخاب کنید.',
  'err.pdf.numberFirst': 'اولین صفحه برای شماره‌گذاری باید بین 1 و {count} باشد.',
  'err.pdf.numberLast': 'آخرین صفحه برای شماره‌گذاری باید بین {from} و {count} باشد.',
  'err.pdf.numberStart': 'شماره‌گذاری را از یک عدد صحیح بین 0 تا 99,999 شروع کنید.',
  'err.pdf.fontSize72': 'اندازه فونت باید بین 6 و 72 باشد.',
  'err.pdf.fontSize300': 'اندازه فونت باید بین 6 و 300 باشد.',
  'err.pdf.margin': 'حاشیه باید بین 0 و 200 باشد.',
  'err.pdf.opacity': 'کدری باید بین 5% و 100% باشد.',
  'err.pdf.angle': 'زاویه باید بین -180 و 180 درجه باشد.',
  'err.pdf.watermarkText': 'متن واترمارک را وارد کنید.',
  'err.pdf.watermarkLength': 'متن واترمارک حداکثر می‌تواند 100 نویسه باشد.',
  'err.pdf.imageScale': 'اندازه تصویر باید بین 5% و 100% عرض صفحه باشد.',
  'err.pdf.watermarkImage': 'خواندن تصویر واترمارک ممکن نشد. از یک فایل PNG یا JPG معتبر استفاده کنید.',
  'err.pdf.watermarkTile': 'واترمارک برای کاشی‌کاری بیش از حد کوچک است. اندازه بزرگ‌تر یا چیدمان وسط‌چین را انتخاب کنید.',
  'err.pdf.cropOutside': 'ناحیه برش را داخل صفحه انتخاب کنید.',
  'err.pdf.cropSmall': 'ناحیه برش در صفحه {page} بیش از حد کوچک است.',

  // PDF: protect and unlock
  'err.pdf.enterPassword': 'یک گذرواژه وارد کنید.',
  'err.pdf.passwordLength': 'گذرواژه حداکثر می‌تواند 127 نویسه باشد.',
  'err.pdf.passwordChars': 'در گذرواژه فقط از حروف، ارقام و نمادهای استاندارد استفاده کنید تا هر نمایشگر PDF بتواند فایل را باز کند.',
  'err.pdf.alreadyPassword': 'این PDF از قبل با گذرواژه محافظت شده است. ابتدا با ابزار «باز کردن قفل PDF» قفل آن را باز کنید.',
  'err.pdf.alreadyProtected': 'این PDF از قبل محافظت شده است. ابتدا با ابزار «باز کردن قفل PDF» قفل آن را باز کنید.',
  'err.pdf.unlockUnsupported': 'باز کردن قفل این PDF ممکن نشد. ممکن است از نوع حفاظتی پشتیبانی‌نشده استفاده کند.',
  'err.pdf.wrongPassword': 'این گذرواژه درست نیست.',
  'err.pdf.unlockDamaged': 'باز کردن قفل این PDF ممکن نشد. ممکن است آسیب دیده باشد.',

  // PDF: forms
  'err.pdf.formRead': 'خواندن فیلدهای فرم این PDF ممکن نشد. ممکن است فایل از ساختار فرم غیرمعمولی استفاده کند.',
  'err.pdf.formFieldChar': 'مقدار «{name}» شامل نویسه‌ای است که فونت فرم نمی‌تواند نمایش دهد. در این فیلد از حروف لاتین ساده، ارقام و نمادهای رایج استفاده کنید.',
  'err.pdf.formNoField': 'فیلد «{name}» در این PDF وجود ندارد.',
  'err.pdf.formMaxLength': '«{name}» حداکثر {max} نویسه را می‌پذیرد.',
  'err.pdf.formFillFailed': 'پر کردن «{name}» ممکن نشد: {message}.',
  'err.pdf.formChar': 'یکی از فیلدها شامل نویسه‌ای است که فونت فرم نمی‌تواند نمایش دهد. از حروف لاتین ساده، ارقام و نمادهای رایج استفاده کنید.',
  'err.pdf.formSaveFailed': 'ذخیره فرم پرشده ممکن نشد: {message}.',

  // PDF: redact and sign
  'err.pdf.redactNothing': 'دست‌کم یک ناحیه یا عبارت جستجو را برای سانسور علامت بزنید.',
  'err.pdf.signNoPlacement': 'مکان قرارگیری امضا را انتخاب کنید.',
  'err.pdf.signImageUnreadable': 'خواندن تصویر امضا ممکن نشد. یک امضای PNG یا JPG بکشید، تایپ کنید یا بارگذاری کنید.',
  'err.pdf.signOutside': 'امضا باید داخل صفحه جا شود.',
} as PartialMessages;
