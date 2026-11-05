/**
 * Strings added with the file selection upgrade, the contact page, the theme switch and the blog list.
 * Each area has its own comment so that the translations can be checked area by area.
 */
export const features: Record<string, string> = {
  // File selection (shared by every tool that accepts files)
  'ui.chooseFiles': 'Choose files',
  'ui.chooseFile': 'Choose file',
  'ui.addMoreFiles': 'Add more files',
  'ui.pagesCount': 'Pages: {pages}',
  'ui.passwordProtected': 'Password protected',
  'ui.moveEarlier': 'Move {name} earlier',
  'ui.moveLater': 'Move {name} later',
  'ui.summary': 'Files: {files} · Total size: {size}',
  'ui.summaryPages': 'Files: {files} · Pages: {pages} · Total size: {size}',
  'ui.clearAll': 'Clear all',
  'ui.orderHint': 'Drag files to change their order, or use the arrow buttons.',
  'err.files.totalTooLarge': 'The selected files add up to {size}. One batch can hold at most {max} in total.',

  // Contact page
  'contact.form.emailPlaceholder': 'name@example.com',
  'contact.err.messageMin': 'Write a message of at least {min} characters.',
  'contact.err.messageLong': 'Your message is too long. Please shorten it.',
  'contact.err.agree': 'Please agree to the Terms & Conditions and Privacy Policy.',
  'contact.attach.label': 'Attachment (optional)',
  'contact.attach.button': 'Attach file',
  'contact.attach.hint': 'Pictures, PDF, Word or text files, up to {size}.',
  'contact.attach.remove': 'Remove {name}',
  'contact.attach.errType': 'This file type is not supported. Choose a picture, PDF, Word or text file.',
  'contact.attach.errSize': 'This file is too large. The limit is {size}.',
  'contact.attach.errEmpty': 'This file is empty.',
  'contact.agree': 'I agree to the <terms>Terms & Conditions</terms> and <privacy>Privacy Policy</privacy>.',
  'contact.notice.h': 'The contact form is under development',
  'contact.notice.p': 'We are still building this form. It will become available when the website is fully live, and messages cannot be sent until then. Thank you for your patience.',
  'contact.fail.soon': 'The contact form is still under development, so your message was not sent. Nothing was stored. Please try again when the website is fully live.',
  'contact.fail.invalid': 'Some details in your message could not be accepted. Please check the form and try again.',

  // Merge PDF
  'pdfMerge.outputName': 'Output file name',
  'pdfMerge.resultInfo': 'Pages: {pages} · Size: {size}',
};
