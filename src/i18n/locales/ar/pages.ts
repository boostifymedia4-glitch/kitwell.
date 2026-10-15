import type { PartialMessages } from '../../en';

export default {
  // Home

  // 404, category, all tools
  'notFound.text': 'لم نعثر على هذه الصفحة. ربما نُقلت، أو ربما كُتب العنوان بشكل خاطئ.',
  'notFound.home': 'العودة إلى الرئيسية',
  'notFound.popular': 'الأدوات الشائعة',
  'category.count': '{count} أداة.',
  'category.sections': 'أقسام {name}',
  'category.more': 'فئات أدوات أخرى',
  'tools.title': 'كل الأدوات',
  'tools.jump': 'انتقل إلى فئة',

  // About

  // Help chrome
  'help.title': 'المساعدة والأسئلة الشائعة',

  // Legal pages
  'legal.privacy.title': 'سياسة الخصوصية',
  'legal.terms.title': 'الشروط والأحكام',
  'legal.cookies.title': 'معلومات ملفات تعريف الارتباط وتخزين المتصفح',

  // Contact
  'contact.title': 'اتصل بنا',
  'contact.lead': 'نرحّب بالأسئلة وتقارير الأخطاء واقتراحات الأدوات.',
  'contact.form.h': 'أرسل رسالة',
  'contact.form.name': 'اسمك',
  'contact.form.email': 'عنوان بريدك الإلكتروني',
  'contact.form.emailHint': 'يُستخدم فقط للرد عليك.',
  'contact.form.page': 'الأداة أو الصفحة (اختياري)',
  'contact.form.pagePlaceholder': 'مثال: دمج PDF',
  'contact.form.message': 'الرسالة',
  'contact.form.messageHint': '{min} أحرف على الأقل. يُرجى عدم تضمين كلمات مرور أو مستندات حساسة.',
  'contact.form.counter': '{count} / {max}',
  'contact.form.send': 'إرسال الرسالة',
  'contact.form.sending': 'جارٍ الإرسال…',
  'contact.form.honeypot': 'اترك هذا الحقل فارغًا',
  'contact.err.name': 'أدخل اسمك.',
  'contact.err.email': 'أدخل عنوان بريد إلكتروني صالحًا.',
  'contact.err.message': 'اكتب رسالة لا تقل عن {min} أحرف (وبحد أقصى {max}).',
  'contact.err.summary': 'يُرجى تصحيح الحقول المميّزة.',
  'contact.sent.h': 'تم إرسال الرسالة',
  'contact.sent.p': 'شكرًا لك. تم تسليم رسالتك. نقرأ كل رسالة لكننا لا نستطيع الوعد بموعد للرد.',
  'contact.sent.another': 'إرسال رسالة أخرى',
  'contact.fail.notConfigured': 'نموذج الاتصال غير مربوط بصندوق بريد في هذا الموقع بعد، لذا لم تُرسَل رسالتك. ولم يُخزَّن شيء.',
  'contact.fail.rate': 'عدد الرسائل من اتصالك كبير جدًا. يُرجى الانتظار بضع دقائق ثم المحاولة مرة أخرى.',
  'contact.fail.delivery': 'تعذّر تسليم رسالتك الآن. لم تُرسَل. يُرجى المحاولة لاحقًا.',
  'contact.fail.network': 'تعذّر إرسال الرسالة بسبب فشل الاتصال. تحقق من اتصالك بالإنترنت وحاول مرة أخرى.',
  'contact.unavailable.h': 'نموذج الاتصال غير متاح بعد',
  'contact.unavailable.p': 'لم يُربط هذا الموقع بصندوق بريد، لذا لا يمكن إرسال الرسائل من هذه الصفحة.',
  'contact.report.h': 'الإبلاغ عن مشكلة',
  'contact.report.intro': 'لمساعدتنا على إعادة إنتاج المشكلة، يُرجى ذكر ما يلي:',
  'contact.report.1': 'اسم الأداة وعنوان الصفحة.',
  'contact.report.2': 'متصفحك وجهازك (مثل «Chrome 130 على Windows 11»).',
  'contact.report.3': 'ما كنت تتوقعه وما حدث بدلًا من ذلك، بما في ذلك أي رسالة خطأ.',
  'contact.report.4': 'نوع الملف وحجمه التقريبي. يُرجى عدم إرسال مستندات حساسة.',
  'contact.privacy': 'الرسالة التي تكتبها هنا تُرسَل إلينا وتُستخدم فقط للرد عليك. أما الملفات والنصوص التي تستخدمها في الأدوات فلا تكون جزءًا منها أبدًا. راجع <privacy>سياسة الخصوصية</privacy>.',
} as PartialMessages;
