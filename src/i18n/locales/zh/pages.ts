import type { PartialMessages } from '../../en';

export default {
  // Home

  // 404, category, all tools
  'notFound.text': '我们找不到该页面。它可能已被移动，或者网址输入有误。',
  'notFound.home': '返回首页',
  'notFound.popular': '热门工具',
  'category.count': '{count} 个工具。',
  'category.sections': '{name}中的分区',
  'category.more': '更多工具分类',
  'tools.title': '全部工具',
  'tools.jump': '跳转到分类',

  // About

  // Help chrome
  'help.title': '帮助与常见问题',

  // Legal pages
  'legal.privacy.title': '隐私政策',
  'legal.terms.title': '条款与条件',
  'legal.cookies.title': 'Cookie 与浏览器存储说明',

  // Contact
  'contact.title': '联系我们',
  'contact.lead': '欢迎提出问题、报告错误和建议新工具。',
  'contact.form.h': '发送消息',
  'contact.form.name': '您的姓名',
  'contact.form.email': '您的电子邮件地址',
  'contact.form.emailHint': '仅用于回复您。',
  'contact.form.page': '工具或页面（可选）',
  'contact.form.pagePlaceholder': '例如：合并 PDF',
  'contact.form.message': '消息',
  'contact.form.messageHint': '至少 {min} 个字符。请勿包含密码或敏感文档。',
  'contact.form.counter': '{count} / {max}',
  'contact.form.send': '发送消息',
  'contact.form.sending': '正在发送…',
  'contact.form.honeypot': '请将此字段留空',
  'contact.err.name': '请输入您的姓名。',
  'contact.err.email': '请输入有效的电子邮件地址。',
  'contact.err.message': '请填写至少 {min} 个字符的消息（最多 {max} 个）。',
  'contact.err.summary': '请修正标出的字段。',
  'contact.sent.h': '消息已发送',
  'contact.sent.p': '谢谢。您的消息已送达。我们会阅读每一条消息，但无法承诺回复时间。',
  'contact.sent.another': '再发送一条消息',
  'contact.fail.notConfigured': '本站的联系表单尚未连接到邮箱，因此您的消息未能发送。没有保存任何内容。',
  'contact.fail.rate': '您的网络发送的消息过多。请等待几分钟后重试。',
  'contact.fail.delivery': '我们目前无法送达您的消息，消息未发送。请稍后重试。',
  'contact.fail.network': '由于连接失败，消息无法发送。请检查您的网络连接后重试。',
  'contact.unavailable.h': '联系表单暂不可用',
  'contact.unavailable.p': '本站尚未连接到邮箱，因此无法通过此页面发送消息。',
  'contact.report.h': '报告问题',
  'contact.report.intro': '为了帮助我们重现问题，请附上：',
  'contact.report.1': '工具名称和页面地址。',
  'contact.report.2': '您的浏览器和设备（例如“Windows 11 上的 Chrome 130”）。',
  'contact.report.3': '您期望的结果和实际发生的情况，包括任何错误信息。',
  'contact.report.4': '文件类型和大致大小。请勿发送敏感文档。',
  'contact.privacy': '您在此处写下的消息会发送给我们，并且仅用于回复您。您在工具中使用的文件和文本绝不会包含在内。请参阅<privacy>隐私政策</privacy>。',
} as PartialMessages;
