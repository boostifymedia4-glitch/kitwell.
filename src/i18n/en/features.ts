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

  // Merge PDF
  'pdfMerge.outputName': 'Output file name',
  'pdfMerge.resultInfo': 'Pages: {pages} · Size: {size}',
};
