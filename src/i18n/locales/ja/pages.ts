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
  'contact.form.page': 'ツールまたはページ（任意）',
  'contact.form.pagePlaceholder': '例：PDFを結合',
  'contact.form.message': 'メッセージ',
  'contact.form.messageHint': '{min}文字以上で入力してください。パスワードや機密文書は含めないでください。',
  'contact.form.send': 'メッセージを送信',
  'contact.form.sending': '送信中…',
  'contact.form.honeypot': 'この欄は空のままにしてください',
  'contact.err.name': 'お名前を入力してください。',
  'contact.err.email': '有効なメールアドレスを入力してください。',
  'contact.err.summary': '強調表示された項目を修正してください。',
  'contact.sent.h': 'メッセージを送信しました',
  'contact.sent.p': 'ありがとうございます。メッセージを受け付けました。すべてのメッセージに目を通しますが、返信までの時間はお約束できません。',
  'contact.sent.another': '別のメッセージを送る',
  'contact.fail.rate': 'お使いの接続からのメッセージが多すぎます。数分待ってから、もう一度お試しください。',
  'contact.fail.delivery': '現在、メッセージを配信できませんでした。送信されていません。しばらくしてからもう一度お試しください。',
  'contact.fail.network': '接続に失敗したため、メッセージを送信できませんでした。インターネット接続を確認して、もう一度お試しください。',
} as PartialMessages;
