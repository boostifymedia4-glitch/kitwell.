import type { PartialMessages } from '../../en';

export default {
  // Generic
  'err.generic': 'حدث خطأ ما. يُرجى المحاولة مرة أخرى.',
  'err.unknown': 'خطأ غير معروف',

  // File validation
  'err.files.limit': 'تم بلوغ حد {max} ملفات.',
  'err.files.unsupportedType': 'نوع الملف غير مدعوم. الأنواع المقبولة: {types}.',
  'err.files.empty': 'الملف فارغ.',
  'err.files.tooLarge': 'الملف كبير جدًا ({size}). الحد الأقصى {max}.',
  'err.files.onlyOne': 'يمكن استخدام ملف واحد فقط في كل مرة.',

  // JSON
  'err.json.badUnicode': 'تسلسل هروب Unicode غير صالح',
  'err.json.badEscape': 'تسلسل هروب غير صالح في السلسلة النصية',
  'err.json.controlChar': 'حرف تحكم بلا هروب في السلسلة النصية (استخدم \\n لفواصل الأسطر)',
  'err.json.unterminatedString': 'سلسلة نصية غير منتهية',
  'err.json.invalidNumber': 'رقم غير صالح',
  'err.json.unexpectedEnd': 'نهاية غير متوقعة لـ JSON',
  'err.json.trailingComma': 'الفاصلة الزائدة في النهاية غير مسموح بها في JSON',
  'err.json.propertyName': 'يُتوقع اسم خاصية بين علامتي اقتباس مزدوجتين',
  'err.json.doubleQuotes': 'يجب أن تستخدم السلاسل النصية علامات اقتباس مزدوجة',
  'err.json.unexpectedChar': 'حرف غير متوقع "{char}"',
  'err.json.trailingContent': 'محتوى غير متوقع بعد نهاية قيمة JSON',
  'err.json.empty': 'أدخل JSON للمتابعة.',
  'err.json.invalid': 'JSON غير صالح',

  // XML
  'err.xml.empty': 'أدخل XML للمتابعة.',
  'err.xml.unterminatedComment': 'تعليق غير منتهٍ',
  'err.xml.unterminatedPi': 'تعليمة معالجة غير منتهية',
  'err.xml.unterminatedDeclaration': 'تصريح غير منتهٍ',
  'err.xml.unterminatedAttribute': 'قيمة سمة غير منتهية',
  'err.xml.unterminatedTag': 'وسم غير منتهٍ',
  'err.xml.unexpectedClosing': 'وسم إغلاق غير متوقع </{name}>',
  'err.xml.mismatched': 'وسم إغلاق غير مطابق: المتوقع </{expected}> لكن وُجد </{found}>',
  'err.xml.invalidTagName': 'اسم وسم غير صالح "{name}"',
  'err.xml.unclosedTag': 'وسم غير مغلق <{name}>',
  'err.xml.noElement': 'لم يُعثر على أي عنصر XML',
  'err.xml.singleRoot': 'يجب أن يحتوي مستند XML على عنصر جذر واحد',
  'err.xml.strayText': 'النص غير مسموح به خارج عنصر الجذر',

  // Developer tools
  'err.dev.malformedPercent': 'يحتوي النص على تسلسل نسبة مئوية غير صحيح (مثل "%" لا يتبعه رقمان سداسيان عشريان).',
  'err.dev.badBase64': 'هذا ليس Base64 صالحًا. تحقق من وجود أحرف ناقصة أو زائدة أو غير مدعومة.',
  'err.dev.notUtf8': 'البيانات المفكوكة ليست نص UTF-8 صالحًا. قد تكون بيانات ثنائية مثل صورة.',
  'err.dev.noCharType': 'اختر نوعًا واحدًا على الأقل من الأحرف.',
  'err.dev.timestampFormat': 'أدخل عددًا من الثواني أو الميلي ثانية منذ 1970-01-01 UTC.',
  'err.dev.timestampRange': 'هذا الطابع الزمني خارج نطاق التواريخ المدعوم.',
  'err.regex.invalid': 'تعبير نمطي غير صالح',
  'err.regex.timeout': 'استغرق هذا النمط وقتًا طويلًا في التنفيذ فتم إيقافه. قد يسبب تراجعًا كارثيًا (مثل التكرار المتداخل كـ (a+)+).',

  // GIF
  'err.gif.noImages': 'أضف صورة واحدة على الأقل.',
  'err.gif.tooManyFrames': 'يمكن أن يحتوي GIF على {max} إطارًا كحد أقصى.',
  'err.gif.sizeNotInteger': 'يجب أن يكون حجم GIF عددًا صحيحًا من البكسلات.',
  'err.gif.tooLarge': 'ملف GIF كبير جدًا.',
  'err.gif.tooLargeToBuild': 'سيكون هذا GIF أكبر من أن يبنيه متصفحك. استخدم حجمًا أصغر أو إطارات أقل.',
  'err.gif.colours': 'اختر 16 أو 32 أو 64 أو 128 أو 256 لونًا.',
  'err.gif.frameMismatch': 'أحد الإطارات لا يطابق حجم GIF.',
  'err.gif.notGif': 'ليس ملف GIF.',
  'err.gif.damaged': 'بيانات GIF تالفة.',
  'err.gif.incomplete': 'بيانات GIF غير مكتملة.',

  // Images
  'err.image.processingFailed': 'فشلت المعالجة.',
  'err.image.noCanvas': 'تعذّر إنشاء سطح رسم. قد تكون الصورة أكبر من أن يتحملها هذا الجهاز.',
  'err.image.resultTooBig': 'ستكون النتيجة {width} × {height} px، وهو أكبر مما تستطيع أداة المتصفح هذه إنشاءه بأمان (الحد الأقصى {max} px لكل ضلع).',
  'err.image.watermarkTooSmall': 'العلامة المائية صغيرة جدًا للتكرار. استخدم حجمًا أكبر أو علامة واحدة.',
  'err.image.notLarger': 'اختر حجمًا أكبر من الأصلي. استخدم أداة تغيير حجم الصورة لتصغير الصور.',
  'err.image.notSvg': 'لا يبدو أن هذا الملف صورة SVG.',
  'err.image.svgFailed': 'تعذّر رسم ملف SVG هذا. قد يكون غير صالح أو يستخدم ميزات لا تدعمها المتصفحات.',
  'err.image.encodeFailed': 'تعذّر على المتصفح ترميز هذه الصورة.',
  'err.image.formatUnsupported': 'لا يستطيع متصفحك حفظ صور {format}. جرّب صيغة إخراج أخرى أو إصدارًا حديثًا من Chrome أو Edge أو Firefox.',
  'err.image.unreadable': 'تعذّرت قراءة هذا الملف كصورة. قد يكون تالفًا أو بصيغة غير مدعومة.',

  // OCR
  'err.ocr.engineStart': 'تعذّر تشغيل محرك OCR. أعد تحميل الصفحة وحاول مرة أخرى، وإذا استمر الفشل فقد لا يدعم متصفحك WebAssembly.',

  // Passwords
  'err.passwords.chooseCase': 'اختر الأحرف الكبيرة أو الصغيرة أو كليهما.',
  'err.passwords.length': 'اختر طولًا بين {min} و{max}.',
  'err.passwords.chooseCategory': 'اختر فئة كلمات واحدة على الأقل.',
  'err.passwords.cannotBuild': 'تعذّر إنشاء كلمة مرور مبنية على الأسماء بهذه الإعدادات. جرّب طولًا مختلفًا أو فعّل الأرقام أو الرموز.',

  // QR codes
  'err.qr.noText': 'أدخل نصًا أو رابطًا أولًا.',
  'err.qr.tooMuchData': 'هذه بيانات أكثر من اللازم لرمز QR عند مستوى تصحيح الأخطاء هذا. اختصر النص أو اختر مستوى أقل.',
  'err.qr.badColours': 'اختر ألوانًا صالحة.',
  'err.qr.wifiName': 'أدخل اسم الشبكة.',
  'err.qr.wifiPassword': 'أدخل كلمة مرور Wi-Fi، أو اختر «بلا كلمة مرور».',
  'err.qr.email': 'أدخل عنوان بريد إلكتروني صالحًا.',
  'err.qr.phone': 'أدخل رقم هاتف بالأرقام، مع + اختيارية في البداية.',
  'err.qr.unreadableImage': 'تعذّرت قراءة هذه الصورة. قد تكون أكبر من أن يتحملها هذا الجهاز.',

  // PDF: reading and general
  'err.pdf.onlyOne': 'يمكن استخدام ملف PDF واحد فقط في كل مرة.',
  'err.pdf.unreadable': 'تعذّرت قراءة هذا الملف كـ PDF. قد يكون تالفًا أو ليس ملف PDF أصلًا.',
  'err.pdf.passwordProtected': 'ملف PDF هذا محمي بكلمة مرور. أزل كلمة المرور أولًا باستخدام أداة «فتح قفل PDF» ثم حاول مرة أخرى.',
  'err.pdf.pageMissing': 'الصفحة {page} غير موجودة في هذا المستند.',
  'err.pdf.noCanvas': 'تعذّر على متصفحك إنشاء سطح رسم لهذه الصفحة.',
  'err.pdf.encodePage': 'تعذّر على المتصفح ترميز هذه الصفحة كصورة.',
  'err.pdf.encodePageImage': 'تعذّر على المتصفح ترميز صورة صفحة.',
  'err.pdf.renderTooLarge': 'هذه الصفحة أكبر من أن تُعرض بالدقة المحددة. جرّب قيمة DPI أقل.',
  'err.pdf.previewTooLarge': 'هذه الصفحة أكبر من أن تُعاين.',
  'err.pdf.flattenTooLarge': 'إحدى الصفحات أكبر من أن تُعالَج بهذه الجودة. اختر إعداد جودة أقل.',
  'err.pdf.compareSize': 'يجب أن تكون الصورتان بالحجم نفسه.',

  // PDF: merge, split, pages
  'err.pdf.mergeNeedTwo': 'أضف ملفي PDF على الأقل للدمج.',
  'err.pdf.mergeFile': '{name}: {message}',
  'err.pdf.fileN': 'الملف {n}',
  'err.pdf.selectPage': 'حدد صفحة واحدة على الأقل.',
  'err.pdf.selectedPageMissing': 'إحدى الصفحات المحددة غير موجودة في ملف PDF هذا.',
  'err.pdf.enterPages': 'أدخل الصفحات التي تريدها، مثل 1-3, 5.',
  'err.pdf.enterRanges': 'أدخل النطاقات لكل ملف إخراج، مثل 1-3, 4-6.',
  'err.pdf.badRange': '"{token}" ليست صفحة أو نطاقًا صالحًا.',
  'err.pdf.rangeOutside.zero': '"{token}" خارج هذا المستند الذي لا يحتوي على صفحات.',
  'err.pdf.rangeOutside.one': '"{token}" خارج هذا المستند الذي يحتوي على صفحة واحدة.',
  'err.pdf.rangeOutside.two': '"{token}" خارج هذا المستند الذي يحتوي على صفحتين.',
  'err.pdf.rangeOutside.few': '"{token}" خارج هذا المستند الذي يحتوي على {count} صفحات.',
  'err.pdf.rangeOutside.many': '"{token}" خارج هذا المستند الذي يحتوي على {count} صفحة.',
  'err.pdf.rangeOutside.other': '"{token}" خارج هذا المستند الذي يحتوي على {count} صفحة.',
  'err.pdf.rangeBackwards': '"{token}" معكوس. اكتب النطاقات من الأصغر إلى الأكبر، مثل {example}.',
  'err.pdf.noImages': 'أضف صورة واحدة على الأقل.',
  'err.pdf.imageEmbed': 'تعذّر تضمين إحدى الصور. قد تكون تالفة أو بصيغة فرعية غير مدعومة.',

  // PDF: editing
  'err.pdf.latinOnly': 'يمكن استخدام الأحرف اللاتينية والأرقام والرموز الشائعة فقط هنا، لأن خطوط PDF المضمّنة لا تتضمن أبجديات أخرى.',
  'err.pdf.badColour': 'اختر لونًا صالحًا.',
  'err.pdf.badPages': 'اختر صفحات صالحة.',
  'err.pdf.numberFirst': 'يجب أن تكون أول صفحة للترقيم بين 1 و{count}.',
  'err.pdf.numberLast': 'يجب أن تكون آخر صفحة للترقيم بين {from} و{count}.',
  'err.pdf.numberStart': 'ابدأ الترقيم برقم صحيح من 0 إلى 99,999.',
  'err.pdf.fontSize72': 'يجب أن يكون حجم الخط بين 6 و72.',
  'err.pdf.fontSize300': 'يجب أن يكون حجم الخط بين 6 و300.',
  'err.pdf.margin': 'يجب أن يكون الهامش بين 0 و200.',
  'err.pdf.opacity': 'يجب أن تكون الشفافية بين 5% و100%.',
  'err.pdf.angle': 'يجب أن تكون الزاوية بين -180 و180 درجة.',
  'err.pdf.watermarkText': 'أدخل نص العلامة المائية.',
  'err.pdf.watermarkLength': 'يمكن أن يصل نص العلامة المائية إلى 100 حرف كحد أقصى.',
  'err.pdf.imageScale': 'يجب أن يكون حجم الصورة بين 5% و100% من عرض الصفحة.',
  'err.pdf.watermarkImage': 'تعذّرت قراءة صورة العلامة المائية. استخدم ملف PNG أو JPG صالحًا.',
  'err.pdf.watermarkTile': 'العلامة المائية صغيرة جدًا للتكرار. استخدم حجمًا أكبر أو التخطيط المركزي.',
  'err.pdf.cropOutside': 'اختر منطقة اقتصاص داخل الصفحة.',
  'err.pdf.cropSmall': 'منطقة الاقتصاص صغيرة جدًا في الصفحة {page}.',

  // PDF: protect and unlock
  'err.pdf.enterPassword': 'أدخل كلمة مرور.',
  'err.pdf.passwordLength': 'يمكن أن تصل كلمة المرور إلى 127 حرفًا كحد أقصى.',
  'err.pdf.passwordChars': 'استخدم في كلمة المرور الأحرف والأرقام والرموز القياسية فقط ليتمكن أي قارئ PDF من فتح الملف.',
  'err.pdf.alreadyPassword': 'ملف PDF هذا محمي بكلمة مرور بالفعل. افتح قفله أولًا باستخدام أداة «فتح قفل PDF».',
  'err.pdf.alreadyProtected': 'ملف PDF هذا محمي بالفعل. افتح قفله أولًا باستخدام أداة «فتح قفل PDF».',
  'err.pdf.unlockUnsupported': 'تعذّر فتح قفل ملف PDF هذا. قد يستخدم نوعًا غير مدعوم من الحماية.',
  'err.pdf.wrongPassword': 'كلمة المرور هذه غير صحيحة.',
  'err.pdf.unlockDamaged': 'تعذّر فتح قفل ملف PDF هذا. قد يكون تالفًا.',

  // PDF: forms
  'err.pdf.formRead': 'تعذّرت قراءة حقول النموذج في ملف PDF هذا. قد يستخدم الملف بنية نموذج غير معتادة.',
  'err.pdf.formFieldChar': 'تحتوي قيمة «{name}» على حرف لا يستطيع خط النموذج عرضه. استخدم أحرفًا لاتينية عادية وأرقامًا ورموزًا شائعة في هذا الحقل.',
  'err.pdf.formNoField': 'الحقل «{name}» غير موجود في ملف PDF هذا.',
  'err.pdf.formMaxLength': '«{name}» يسمح بـ {max} حرفًا كحد أقصى.',
  'err.pdf.formFillFailed': 'تعذّر ملء «{name}»: {message}.',
  'err.pdf.formChar': 'يحتوي أحد الحقول على حرف لا يستطيع خط النموذج عرضه. استخدم أحرفًا لاتينية عادية وأرقامًا ورموزًا شائعة.',
  'err.pdf.formSaveFailed': 'تعذّر حفظ النموذج المملوء: {message}.',

  // PDF: redact and sign
  'err.pdf.redactNothing': 'حدد منطقة واحدة على الأقل أو عبارة بحث لحجبها.',
  'err.pdf.signNoPlacement': 'اختر مكان وضع التوقيع.',
  'err.pdf.signImageUnreadable': 'تعذّرت قراءة صورة التوقيع. ارسم توقيعًا أو اكتبه أو ارفع توقيعًا بصيغة PNG أو JPG.',
  'err.pdf.signOutside': 'يجب أن يتسع التوقيع داخل الصفحة.',
} as PartialMessages;
