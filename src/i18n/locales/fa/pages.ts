import type { PartialMessages } from '../../en';

export default {
  // Home

  // 404, category, all tools
  'notFound.text': 'این صفحه را پیدا نکردیم. ممکن است جابه‌جا شده باشد یا نشانی را اشتباه نوشته باشید.',
  'notFound.home': 'بازگشت به صفحه اصلی',
  'notFound.popular': 'ابزارهای محبوب',
  'category.count': '{count} ابزار.',
  'category.sections': 'بخش‌های {name}',
  'category.more': 'دسته‌بندی‌های دیگر ابزارها',
  'tools.title': 'همه ابزارها',
  'tools.jump': 'رفتن به یک دسته‌بندی',

  // About

  // Help chrome
  'help.title': 'راهنما و پرسش‌های متداول',

  // Legal pages
  'legal.privacy.title': 'سیاست حفظ حریم خصوصی',
  'legal.terms.title': 'شرایط و ضوابط',
  'legal.cookies.title': 'اطلاعات کوکی‌ها و فضای ذخیره‌سازی مرورگر',

  // Contact
  'contact.title': 'تماس با ما',
  'contact.lead': 'پرسش‌ها، گزارش اشکال‌ها و پیشنهاد ابزارها پذیرفته می‌شود.',
  'contact.form.h': 'ارسال پیام',
  'contact.form.name': 'نام شما',
  'contact.form.email': 'نشانی ایمیل شما',
  'contact.form.emailHint': 'فقط برای پاسخ دادن به شما استفاده می‌شود.',
  'contact.form.page': 'ابزار یا صفحه (اختیاری)',
  'contact.form.pagePlaceholder': 'مثلاً: ادغام PDF',
  'contact.form.message': 'پیام',
  'contact.form.messageHint': 'دست‌کم {min} نویسه. لطفاً گذرواژه یا سند حساس ارسال نکنید.',
  'contact.form.counter': '{count} / {max}',
  'contact.form.send': 'ارسال پیام',
  'contact.form.sending': 'در حال ارسال…',
  'contact.form.honeypot': 'این فیلد را خالی بگذارید',
  'contact.err.name': 'نام خود را وارد کنید.',
  'contact.err.email': 'یک نشانی ایمیل معتبر وارد کنید.',
  'contact.err.message': 'پیامی دست‌کم با {min} نویسه (و حداکثر {max}) بنویسید.',
  'contact.err.summary': 'لطفاً فیلدهای مشخص‌شده را اصلاح کنید.',
  'contact.sent.h': 'پیام ارسال شد',
  'contact.sent.p': 'سپاسگزاریم. پیام شما تحویل داده شد. ما همه پیام‌ها را می‌خوانیم، اما نمی‌توانیم زمان پاسخ را تضمین کنیم.',
  'contact.sent.another': 'ارسال پیام دیگر',
  'contact.fail.notConfigured': 'فرم تماس هنوز به صندوق ایمیلی در این سایت متصل نشده است، بنابراین پیام شما ارسال نشد. چیزی ذخیره نشد.',
  'contact.fail.rate': 'تعداد پیام‌ها از اتصال شما بیش از حد است. لطفاً چند دقیقه صبر کنید و دوباره تلاش کنید.',
  'contact.fail.delivery': 'در حال حاضر نتوانستیم پیام شما را تحویل دهیم. ارسال نشد. لطفاً بعداً دوباره تلاش کنید.',
  'contact.fail.network': 'به دلیل قطع اتصال، پیام ارسال نشد. اتصال اینترنت خود را بررسی کنید و دوباره تلاش کنید.',
  'contact.unavailable.h': 'فرم تماس هنوز در دسترس نیست',
  'contact.unavailable.p': 'این سایت هنوز به صندوق ایمیلی متصل نشده است، بنابراین نمی‌توان از این صفحه پیام ارسال کرد.',
  'contact.report.h': 'گزارش یک مشکل',
  'contact.report.intro': 'برای کمک به بازتولید مشکل، لطفاً این موارد را بنویسید:',
  'contact.report.1': 'نام ابزار و نشانی صفحه.',
  'contact.report.2': 'مرورگر و دستگاه شما (مثلاً «Chrome 130 در Windows 11»).',
  'contact.report.3': 'آنچه انتظار داشتید و آنچه در عمل رخ داد، از جمله هر پیام خطا.',
  'contact.report.4': 'نوع فایل و حجم تقریبی آن. لطفاً سند حساس ارسال نکنید.',
  'contact.privacy': 'پیامی که اینجا می‌نویسید برای ما ارسال می‌شود و فقط برای پاسخ دادن به شما استفاده می‌شود. فایل‌ها و متنی که در ابزارها استفاده می‌کنید هرگز بخشی از آن نیستند. <privacy>سیاست حفظ حریم خصوصی</privacy> را ببینید.',
} as PartialMessages;
