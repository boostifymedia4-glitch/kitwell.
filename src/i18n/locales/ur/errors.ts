import type { PartialMessages } from '../../en';

export default {
  // Generic
  'err.generic': 'کچھ غلط ہو گیا۔ براہِ کرم دوبارہ کوشش کریں۔',
  'err.unknown': 'نامعلوم خرابی',

  // File validation
  'err.files.limit': '{max} فائلوں کی حد پوری ہو گئی۔',
  'err.files.unsupportedType': 'غیر معاون فائل کی قسم۔ قابلِ قبول: {types}۔',
  'err.files.empty': 'فائل خالی ہے۔',
  'err.files.tooLarge': 'بہت بڑی ({size})۔ زیادہ سے زیادہ {max} ہے۔',
  'err.files.onlyOne': 'ایک وقت میں صرف ایک فائل استعمال کی جا سکتی ہے۔',

  // JSON
  'err.json.badUnicode': 'غلط یونی کوڈ ایسکیپ',
  'err.json.badEscape': 'اسٹرنگ میں غلط ایسکیپ سیکوئنس',
  'err.json.controlChar': 'اسٹرنگ میں بغیر ایسکیپ کے کنٹرول کریکٹر (لائن بریک کے لیے \\n استعمال کریں)',
  'err.json.unterminatedString': 'اسٹرنگ ختم نہیں کی گئی',
  'err.json.invalidNumber': 'غلط نمبر',
  'err.json.unexpectedEnd': 'JSON کا غیر متوقع اختتام',
  'err.json.trailingComma': 'JSON میں آخر میں کوما کی اجازت نہیں',
  'err.json.propertyName': 'پراپرٹی کا نام ڈبل کوٹس میں ہونا چاہیے',
  'err.json.doubleQuotes': 'اسٹرنگز میں ڈبل کوٹس استعمال ہونے چاہییں',
  'err.json.unexpectedChar': 'غیر متوقع کریکٹر "{char}"',
  'err.json.trailingContent': 'JSON ویلیو کے اختتام کے بعد غیر متوقع مواد',
  'err.json.empty': 'جاری رکھنے کے لیے کچھ JSON درج کریں۔',
  'err.json.invalid': 'غلط JSON',

  // XML
  'err.xml.empty': 'جاری رکھنے کے لیے کچھ XML درج کریں۔',
  'err.xml.unterminatedComment': 'تبصرہ ختم نہیں کیا گیا',
  'err.xml.unterminatedPi': 'پروسیسنگ انسٹرکشن ختم نہیں کی گئی',
  'err.xml.unterminatedDeclaration': 'ڈیکلریشن ختم نہیں کی گئی',
  'err.xml.unterminatedAttribute': 'ایٹریبیوٹ کی ویلیو ختم نہیں کی گئی',
  'err.xml.unterminatedTag': 'ٹیگ ختم نہیں کیا گیا',
  'err.xml.unexpectedClosing': 'غیر متوقع اختتامی ٹیگ </{name}>',
  'err.xml.mismatched': 'اختتامی ٹیگ میل نہیں کھاتا: </{expected}> متوقع تھا مگر </{found}> ملا',
  'err.xml.invalidTagName': 'ٹیگ کا غلط نام "{name}"',
  'err.xml.unclosedTag': 'ٹیگ <{name}> بند نہیں کیا گیا',
  'err.xml.noElement': 'کوئی XML ایلیمنٹ نہیں ملا',
  'err.xml.singleRoot': 'XML دستاویز میں ایک ہی روٹ ایلیمنٹ ہونا ضروری ہے',
  'err.xml.strayText': 'روٹ ایلیمنٹ کے باہر متن کی اجازت نہیں',

  // Developer tools
  'err.dev.malformedPercent': 'متن میں غلط فیصد (percent) سیکوئنس ہے (مثلاً "%" کے بعد دو ہیکس ہندسے نہ ہوں)۔',
  'err.dev.badBase64': 'یہ درست Base64 نہیں ہے۔ غائب، اضافی یا غیر معاون کریکٹرز چیک کریں۔',
  'err.dev.notUtf8': 'ڈی کوڈ کیا گیا ڈیٹا درست UTF-8 متن نہیں ہے۔ یہ بائنری ڈیٹا ہو سکتا ہے، جیسے تصویر۔',
  'err.dev.noCharType': 'کم از کم ایک کریکٹر کی قسم منتخب کریں۔',
  'err.dev.timestampFormat': '1970-01-01 UTC کے بعد سے سیکنڈز یا ملی سیکنڈز کی تعداد درج کریں۔',
  'err.dev.timestampRange': 'یہ ٹائم اسٹیمپ معاون تاریخوں کی حد سے باہر ہے۔',
  'err.regex.invalid': 'غلط ریگولر ایکسپریشن',
  'err.regex.timeout': 'اس پیٹرن کو چلنے میں بہت وقت لگا اور اسے روک دیا گیا۔ اس سے تباہ کن بیک ٹریکنگ ہو سکتی ہے (مثلاً (a+)+ جیسی تہہ دار تکرار)۔',

  // GIF
  'err.gif.noImages': 'کم از کم ایک تصویر شامل کریں۔',
  'err.gif.tooManyFrames': 'GIF میں زیادہ سے زیادہ {max} فریم ہو سکتے ہیں۔',
  'err.gif.sizeNotInteger': 'GIF کا سائز پکسلز کی پوری تعداد ہونا چاہیے۔',
  'err.gif.tooLarge': 'GIF بہت بڑی ہے۔',
  'err.gif.tooLargeToBuild': 'یہ GIF آپ کے براؤزر کے لیے بنانے میں بہت بڑی ہوگی۔ چھوٹا سائز یا کم فریم استعمال کریں۔',
  'err.gif.colours': '16، 32، 64، 128 یا 256 رنگ منتخب کریں۔',
  'err.gif.frameMismatch': 'ایک فریم GIF کے سائز سے میل نہیں کھاتا۔',
  'err.gif.notGif': 'یہ GIF فائل نہیں ہے۔',
  'err.gif.damaged': 'GIF کا ڈیٹا خراب ہے۔',
  'err.gif.incomplete': 'GIF کا ڈیٹا نامکمل ہے۔',

  // Images
  'err.image.processingFailed': 'پروسیسنگ ناکام ہو گئی۔',
  'err.image.noCanvas': 'ڈرائنگ کی سطح نہیں بنائی جا سکی۔ تصویر اس ڈیوائس کے لیے بہت بڑی ہو سکتی ہے۔',
  'err.image.resultTooBig': 'نتیجہ {width} × {height} px کا ہوگا، جو اس براؤزر ٹول کے محفوظ طور پر بنانے کی حد سے بڑا ہے (ہر طرف زیادہ سے زیادہ {max} px)۔',
  'err.image.watermarkTooSmall': 'واٹر مارک ٹائل کرنے کے لیے بہت چھوٹا ہے۔ بڑا سائز یا ایک ہی نشان استعمال کریں۔',
  'err.image.notLarger': 'اصل سے بڑا سائز منتخب کریں۔ تصاویر چھوٹی کرنے کے لیے تصویر ری سائز کریں استعمال کریں۔',
  'err.image.notSvg': 'یہ فائل SVG تصویر نہیں لگتی۔',
  'err.image.svgFailed': 'یہ SVG نہیں بنائی جا سکی۔ یہ غلط ہو سکتی ہے یا ایسی خصوصیات استعمال کرتی ہو جنہیں براؤزر معاونت نہیں دیتے۔',
  'err.image.encodeFailed': 'براؤزر اس تصویر کو انکوڈ نہیں کر سکا۔',
  'err.image.formatUnsupported': 'آپ کا براؤزر {format} تصاویر محفوظ نہیں کر سکتا۔ کوئی دوسرا آؤٹ پٹ فارمیٹ آزمائیں یا Chrome، Edge یا Firefox کا موجودہ ورژن استعمال کریں۔',
  'err.image.unreadable': 'اس فائل کو تصویر کے طور پر نہیں پڑھا جا سکا۔ یہ خراب ہو سکتی ہے یا غیر معاون فارمیٹ میں ہو سکتی ہے۔',

  // OCR
  'err.ocr.engineStart': 'OCR انجن شروع نہیں ہو سکا۔ صفحہ دوبارہ لوڈ کر کے کوشش کریں؛ اگر پھر بھی ناکام رہے تو ہو سکتا ہے آپ کا براؤزر WebAssembly کو سپورٹ نہ کرتا ہو۔',

  // Passwords
  'err.passwords.chooseCase': 'بڑے حروف، چھوٹے حروف، یا دونوں منتخب کریں۔',
  'err.passwords.length': '{min} اور {max} کے درمیان لمبائی منتخب کریں۔',
  'err.passwords.chooseCategory': 'کم از کم ایک لفظی زمرہ منتخب کریں۔',
  'err.passwords.cannotBuild': 'ان ترتیبات کے ساتھ نام پر مبنی پاس ورڈ نہیں بن سکا۔ کوئی دوسری لمبائی آزمائیں یا اعداد یا علامات آن کریں۔',

  // QR codes
  'err.qr.noText': 'پہلے کچھ متن یا لنک درج کریں۔',
  'err.qr.tooMuchData': 'غلطی درست کرنے کی اس سطح پر QR کوڈ کے لیے یہ بہت زیادہ ڈیٹا ہے۔ متن مختصر کریں یا کم سطح منتخب کریں۔',
  'err.qr.badColours': 'درست رنگ منتخب کریں۔',
  'err.qr.wifiName': 'نیٹ ورک کا نام درج کریں۔',
  'err.qr.wifiPassword': 'Wi-Fi کا پاس ورڈ درج کریں، یا «کوئی پاس ورڈ نہیں» منتخب کریں۔',
  'err.qr.email': 'درست ای میل ایڈریس درج کریں۔',
  'err.qr.phone': 'ہندسوں میں فون نمبر درج کریں، شروع میں اختیاری +۔',
  'err.qr.unreadableImage': 'یہ تصویر نہیں پڑھی جا سکی۔ یہ اس ڈیوائس کے لیے بہت بڑی ہو سکتی ہے۔',

  // PDF: reading and general
  'err.pdf.onlyOne': 'ایک وقت میں صرف ایک PDF استعمال کی جا سکتی ہے۔',
  'err.pdf.unreadable': 'اس فائل کو PDF کے طور پر نہیں پڑھا جا سکا۔ یہ خراب ہو سکتی ہے یا PDF ہی نہ ہو۔',
  'err.pdf.passwordProtected': 'یہ PDF پاس ورڈ سے محفوظ ہے۔ پہلے ہمارے PDF انلاک کریں ٹول سے پاس ورڈ ہٹائیں، پھر دوبارہ کوشش کریں۔',
  'err.pdf.pageMissing': 'صفحہ {page} اس دستاویز میں موجود نہیں۔',
  'err.pdf.noCanvas': 'آپ کا براؤزر اس صفحے کے لیے ڈرائنگ کی سطح نہیں بنا سکا۔',
  'err.pdf.encodePage': 'براؤزر اس صفحے کو تصویر کے طور پر انکوڈ نہیں کر سکا۔',
  'err.pdf.encodePageImage': 'براؤزر صفحے کی تصویر کو انکوڈ نہیں کر سکا۔',
  'err.pdf.renderTooLarge': 'یہ صفحہ منتخب ریزولوشن پر بنانے کے لیے بہت بڑا ہے۔ کم DPI آزمائیں۔',
  'err.pdf.previewTooLarge': 'یہ صفحہ پیش منظر کے لیے بہت بڑا ہے۔',
  'err.pdf.flattenTooLarge': 'ایک صفحہ اس معیار پر پروسیس کرنے کے لیے بہت بڑا ہے۔ کم معیار کی ترتیب منتخب کریں۔',
  'err.pdf.compareSize': 'دونوں تصاویر کا سائز ایک جیسا ہونا چاہیے۔',

  // PDF: merge, split, pages
  'err.pdf.mergeNeedTwo': 'جوڑنے کے لیے کم از کم دو PDF فائلیں شامل کریں۔',
  'err.pdf.mergeFile': '{name}: {message}',
  'err.pdf.fileN': 'فائل {n}',
  'err.pdf.selectPage': 'کم از کم ایک صفحہ منتخب کریں۔',
  'err.pdf.selectedPageMissing': 'منتخب کردہ ایک صفحہ اس PDF میں موجود نہیں۔',
  'err.pdf.enterPages': 'مطلوبہ صفحات درج کریں، مثلاً 1-3, 5۔',
  'err.pdf.enterRanges': 'ہر آؤٹ پٹ فائل کے لیے رینجز درج کریں، مثلاً 1-3, 4-6۔',
  'err.pdf.badRange': '"{token}" درست صفحہ یا رینج نہیں ہے۔',
  'err.pdf.rangeOutside.one': '"{token}" اس دستاویز سے باہر ہے، جس میں {count} صفحہ ہے۔',
  'err.pdf.rangeOutside.other': '"{token}" اس دستاویز سے باہر ہے، جس میں {count} صفحات ہیں۔',
  'err.pdf.rangeBackwards': '"{token}" الٹی ہے۔ رینجز کو چھوٹے سے بڑے کی طرف لکھیں، جیسے {example}۔',
  'err.pdf.noImages': 'کم از کم ایک تصویر شامل کریں۔',
  'err.pdf.imageEmbed': 'ایک تصویر شامل نہیں کی جا سکی۔ یہ خراب ہو سکتی ہے یا غیر معاون قسم کی ہو سکتی ہے۔',

  // PDF: editing
  'err.pdf.latinOnly': 'یہاں صرف لاطینی حروف، ہندسے اور عام علامات استعمال ہو سکتی ہیں، کیونکہ PDF کے اندرونی فونٹس میں دوسری رسم الخط شامل نہیں ہیں۔',
  'err.pdf.badColour': 'درست رنگ منتخب کریں۔',
  'err.pdf.badPages': 'درست صفحات منتخب کریں۔',
  'err.pdf.numberFirst': 'نمبر لگانے کا پہلا صفحہ 1 اور {count} کے درمیان ہونا چاہیے۔',
  'err.pdf.numberLast': 'نمبر لگانے کا آخری صفحہ {from} اور {count} کے درمیان ہونا چاہیے۔',
  'err.pdf.numberStart': 'نمبرنگ 0 سے 99,999 تک کسی پورے عدد سے شروع کریں۔',
  'err.pdf.fontSize72': 'فونٹ کا سائز 6 اور 72 کے درمیان ہونا چاہیے۔',
  'err.pdf.fontSize300': 'فونٹ کا سائز 6 اور 300 کے درمیان ہونا چاہیے۔',
  'err.pdf.margin': 'حاشیہ 0 اور 200 کے درمیان ہونا چاہیے۔',
  'err.pdf.opacity': 'دھندلاپن (opacity) 5% اور 100% کے درمیان ہونا چاہیے۔',
  'err.pdf.angle': 'زاویہ -180 اور 180 ڈگری کے درمیان ہونا چاہیے۔',
  'err.pdf.watermarkText': 'واٹر مارک کا متن درج کریں۔',
  'err.pdf.watermarkLength': 'واٹر مارک کا متن زیادہ سے زیادہ 100 حروف کا ہو سکتا ہے۔',
  'err.pdf.imageScale': 'تصویر کا سائز صفحے کی چوڑائی کے 5% اور 100% کے درمیان ہونا چاہیے۔',
  'err.pdf.watermarkImage': 'واٹر مارک کی تصویر نہیں پڑھی جا سکی۔ درست PNG یا JPG فائل استعمال کریں۔',
  'err.pdf.watermarkTile': 'واٹر مارک ٹائل کرنے کے لیے بہت چھوٹا ہے۔ بڑا سائز یا وسط والی ترتیب استعمال کریں۔',
  'err.pdf.cropOutside': 'صفحے کے اندر کراپ کا حصہ منتخب کریں۔',
  'err.pdf.cropSmall': 'صفحہ {page} پر کراپ کا حصہ بہت چھوٹا ہے۔',

  // PDF: protect and unlock
  'err.pdf.enterPassword': 'پاس ورڈ درج کریں۔',
  'err.pdf.passwordLength': 'پاس ورڈ زیادہ سے زیادہ 127 حروف کا ہو سکتا ہے۔',
  'err.pdf.passwordChars': 'پاس ورڈ میں صرف معیاری حروف، ہندسے اور علامات استعمال کریں تاکہ ہر PDF ریڈر فائل کھول سکے۔',
  'err.pdf.alreadyPassword': 'یہ PDF پہلے ہی پاس ورڈ سے محفوظ ہے۔ پہلے اسے PDF انلاک کریں ٹول سے کھولیں۔',
  'err.pdf.alreadyProtected': 'یہ PDF پہلے ہی محفوظ ہے۔ پہلے اسے PDF انلاک کریں ٹول سے کھولیں۔',
  'err.pdf.unlockUnsupported': 'یہ PDF انلاک نہیں کی جا سکی۔ ہو سکتا ہے یہ غیر معاون قسم کا تحفظ استعمال کرتی ہو۔',
  'err.pdf.wrongPassword': 'یہ پاس ورڈ درست نہیں ہے۔',
  'err.pdf.unlockDamaged': 'یہ PDF انلاک نہیں کی جا سکی۔ یہ خراب ہو سکتی ہے۔',

  // PDF: forms
  'err.pdf.formRead': 'اس PDF کے فارم کے خانے نہیں پڑھے جا سکے۔ ہو سکتا ہے فائل غیر معمولی فارم ساخت استعمال کرتی ہو۔',
  'err.pdf.formFieldChar': '“{name}” کی ویلیو میں ایسا کریکٹر ہے جسے فارم کا فونٹ دکھا نہیں سکتا۔ اس خانے میں سادہ لاطینی حروف، ہندسے اور عام علامات استعمال کریں۔',
  'err.pdf.formNoField': 'خانہ “{name}” اس PDF میں موجود نہیں۔',
  'err.pdf.formMaxLength': '“{name}” میں زیادہ سے زیادہ {max} حروف کی اجازت ہے۔',
  'err.pdf.formFillFailed': '“{name}” بھرا نہیں جا سکا: {message}۔',
  'err.pdf.formChar': 'ایک خانے میں ایسا کریکٹر ہے جسے فارم کا فونٹ دکھا نہیں سکتا۔ سادہ لاطینی حروف، ہندسے اور عام علامات استعمال کریں۔',
  'err.pdf.formSaveFailed': 'بھرا ہوا فارم محفوظ نہیں ہو سکا: {message}۔',

  // PDF: redact and sign
  'err.pdf.redactNothing': 'مواد چھپانے کے لیے کم از کم ایک حصہ یا تلاش کا لفظ منتخب کریں۔',
  'err.pdf.signNoPlacement': 'منتخب کریں کہ دستخط کہاں رکھنا ہے۔',
  'err.pdf.signImageUnreadable': 'دستخط کی تصویر نہیں پڑھی جا سکی۔ PNG یا JPG دستخط بنائیں، ٹائپ کریں یا اپ لوڈ کریں۔',
  'err.pdf.signOutside': 'دستخط صفحے کے اندر پورا آنا چاہیے۔',
} as PartialMessages;
