import type { PartialMessages } from '../../en';

export default {
  // Home

  // 404, category, all tools
  'notFound.text': 'ページが見つかりませんでした。移動したか、アドレスが間違っている可能性があります。',
  'notFound.home': 'ホームに戻る',
  'notFound.popular': '人気のツール',
  'category.count': '{count}個のツール。',
  'category.sections': '{name}のセクション',
  'category.more': 'その他のツールカテゴリ',
  'tools.title': 'すべてのツール',
  'tools.jump': 'カテゴリへ移動',

  // About

  // Help chrome
  'help.title': 'ヘルプとよくある質問',

  // Legal pages
  'legal.privacy.title': 'プライバシーポリシー',
  'legal.terms.title': '利用規約',
  'legal.cookies.title': 'Cookieとブラウザのストレージについて',

  // Contact
  'contact.title': 'お問い合わせ',
  'contact.lead': 'ご質問、不具合の報告、ツールのご提案をお待ちしています。',
  'contact.form.h': 'メッセージを送る',
  'contact.form.name': 'お名前',
  'contact.form.email': 'メールアドレス',
  'contact.form.emailHint': '返信にのみ使用します。',
  'contact.form.page': 'ツールまたはページ（任意）',
  'contact.form.pagePlaceholder': '例：PDFを結合',
  'contact.form.message': 'メッセージ',
  'contact.form.messageHint': '{min}文字以上で入力してください。パスワードや機密文書は含めないでください。',
  'contact.form.counter': '{count} / {max}',
  'contact.form.send': 'メッセージを送信',
  'contact.form.sending': '送信中…',
  'contact.form.honeypot': 'この欄は空のままにしてください',
  'contact.err.name': 'お名前を入力してください。',
  'contact.err.email': '有効なメールアドレスを入力してください。',
  'contact.err.message': '{min}文字以上、{max}文字以内でメッセージを入力してください。',
  'contact.err.summary': '強調表示された項目を修正してください。',
  'contact.sent.h': 'メッセージを送信しました',
  'contact.sent.p': 'ありがとうございます。メッセージを受け付けました。すべてのメッセージに目を通しますが、返信までの時間はお約束できません。',
  'contact.sent.another': '別のメッセージを送る',
  'contact.fail.notConfigured': 'このサイトのお問い合わせフォームはまだメールボックスに接続されていないため、メッセージは送信されませんでした。内容は保存されていません。',
  'contact.fail.rate': 'お使いの接続からのメッセージが多すぎます。数分待ってから、もう一度お試しください。',
  'contact.fail.delivery': '現在、メッセージを配信できませんでした。送信されていません。しばらくしてからもう一度お試しください。',
  'contact.fail.network': '接続に失敗したため、メッセージを送信できませんでした。インターネット接続を確認して、もう一度お試しください。',
  'contact.unavailable.h': 'お問い合わせフォームはまだ利用できません',
  'contact.unavailable.p': 'このサイトはまだメールボックスに接続されていないため、このページからメッセージを送信できません。',
  'contact.report.h': '問題を報告するには',
  'contact.report.intro': '問題を再現するために、次の情報を含めてください：',
  'contact.report.1': 'ツールの名前とページのアドレス。',
  'contact.report.2': 'お使いのブラウザと端末（例：「Windows 11のChrome 130」）。',
  'contact.report.3': '期待していた動作と実際に起きたこと（エラーメッセージがあればそれも）。',
  'contact.report.4': 'ファイルの種類とおおよそのサイズ。機密文書は送らないでください。',
  'contact.privacy': 'ここに書いたメッセージは当方に送信され、お返事のためにのみ使用されます。ツールで使用したファイルやテキストが含まれることはありません。<privacy>プライバシーポリシー</privacy>をご覧ください。',
} as PartialMessages;
