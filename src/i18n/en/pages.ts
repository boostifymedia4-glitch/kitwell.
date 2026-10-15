/**
 * Pages: home FAQ, 404, category, tools, about, help chrome, contact and legal-page chrome.
 * Keys are `<area>.<name>`; values are the English source text. `{name}` marks a value filled in at run time
 * and `<tag>…</tag>` marks words that become a link or emphasis: keep the tags and translate the words inside.
 */
export const pages = {
  // Home

  // 404, category, all tools
  'notFound.text': 'We couldn’t find that page. It may have moved, or the address may be mistyped.',
  'notFound.home': 'Back to home',
  'notFound.popular': 'Popular tools',
  'category.count': '{count} tools.',
  'category.sections': 'Sections in {name}',
  'category.more': 'More tool categories',
  'tools.title': 'All tools',
  'tools.lead': "{count} tools for images, PDFs, text and development. Search, or browse by category.",
  'tools.jump': 'Jump to a category',

  // About

  // Help chrome

  // Legal pages: the chrome is translated; the legal text itself stays in English (see ui.legalNotice)
  'legal.privacy.title': 'Privacy Policy',
  'legal.terms.title': 'Terms & Conditions',
  'legal.cookies.title': 'Cookie & browser storage information',

  // Contact
  'contact.title': 'Contact us',
  'contact.lead': 'Questions, bug reports and tool suggestions are welcome.',
  'contact.form.h': 'Send a message',
  'contact.form.name': 'Your name',
  'contact.form.email': 'Your email address',
  'contact.form.emailHint': 'Only used to reply to you.',
  'contact.form.subject': 'Subject',
  'contact.form.chooseSubject': 'Select a subject',
  'contact.form.topicOption.general': 'General Question',
  'contact.form.topicOption.technical': 'Technical Issue',
  'contact.form.topicOption.toolError': 'Tool Error',
  'contact.form.topicOption.feature': 'Feature Suggestion',
  'contact.form.topicOption.privacy': 'Privacy Request',
  'contact.form.topicOption.misc': 'Other',
  'contact.form.namePlaceholder': 'Ubaid Ullah',
  'contact.form.messagePlaceholder': 'Tell us what happened, which tool you were using and what you expected.',
  'contact.form.page': 'Tool or page (optional)',
  'contact.form.pagePlaceholder': 'For example: Merge PDF',
  'contact.form.message': 'Message',
  'contact.form.messageHint': 'At least {min} characters. Please do not include passwords or sensitive documents.',
  'contact.form.counter': '{count} / {max}',
  'contact.form.send': 'Send message',
  'contact.form.sending': 'Sending…',
  'contact.form.honeypot': 'Leave this field empty',
  'contact.err.subject': 'Select a subject.',
  'contact.err.name': 'Enter your name.',
  'contact.err.email': 'Enter a valid email address.',
  'contact.err.message': 'Write a message of at least {min} characters (at most {max}).',
  'contact.err.summary': 'Please fix the highlighted fields.',
  'contact.sent.h': 'Message sent',
  'contact.sent.p': 'Thank you. Your message was delivered. We read every message but cannot promise a reply time.',
  'contact.sent.another': 'Send another message',
  'contact.fail.notConfigured': 'The contact form is not connected to a mailbox on this site yet, so your message was not sent. Nothing was stored.',
  'contact.fail.rate': 'Too many messages from your connection. Please wait a few minutes and try again.',
  'contact.fail.delivery': 'We could not deliver your message right now. It was not sent. Please try again later.',
  'contact.fail.network': 'The message could not be sent because the connection failed. Check your internet connection and try again.',
  'contact.unavailable.h': 'The contact form is not available yet',
  'contact.unavailable.p': 'This site has not been connected to a mailbox, so messages cannot be sent from this page.',
  'contact.report.h': 'Reporting a problem',
  'contact.report.intro': 'To help us reproduce an issue, please include:',
  'contact.report.1': 'The name of the tool and the page address.',
  'contact.report.2': 'Your browser and device (for example “Chrome 130 on Windows 11”).',
  'contact.report.3': 'What you expected and what happened instead, including any error message.',
  'contact.report.4': 'The file type and approximate size. Please do not send sensitive documents.',
  'contact.privacy': 'The message you write here is sent to us and used only to answer you. Files and text you use in the tools are never part of it. See the <privacy>Privacy Policy</privacy>.',
} as Record<string, string>;
