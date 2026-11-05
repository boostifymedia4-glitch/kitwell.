import type { PartialMessages } from '../../en';

export default {
  // Home

  // 404, category, all tools
  'notFound.text': 'Нам не удалось найти эту страницу. Возможно, она была перемещена или в адресе есть опечатка.',
  'notFound.home': 'На главную',
  'notFound.popular': 'Популярные инструменты',
  'category.count': 'Инструментов: {count}.',
  'category.sections': 'Разделы: {name}',
  'category.more': 'Другие категории инструментов',
  'tools.title': 'Все инструменты',
  'tools.jump': 'Перейти к категории',

  // About

  // Help chrome
  'help.title': 'Помощь и вопросы',

  // Legal pages
  'legal.privacy.title': 'Политика конфиденциальности',
  'legal.terms.title': 'Условия использования',
  'legal.cookies.title': 'Информация о файлах cookie и хранилище браузера',

  // Contact
  'contact.title': 'Связаться с нами',
  'contact.lead': 'Мы будем рады вопросам, сообщениям об ошибках и предложениям новых инструментов.',
  'contact.form.h': 'Отправить сообщение',
  'contact.form.name': 'Ваше имя',
  'contact.form.email': 'Ваш адрес электронной почты',
  'contact.form.page': 'Инструмент или страница (необязательно)',
  'contact.form.pagePlaceholder': 'Например: Объединить PDF',
  'contact.form.message': 'Сообщение',
  'contact.form.messageHint': 'Не менее {min} символов. Пожалуйста, не указывайте пароли и не прикладывайте конфиденциальные документы.',
  'contact.form.send': 'Отправить сообщение',
  'contact.form.sending': 'Отправка…',
  'contact.form.honeypot': 'Оставьте это поле пустым',
  'contact.err.name': 'Введите ваше имя.',
  'contact.err.email': 'Введите корректный адрес электронной почты.',
  'contact.err.summary': 'Исправьте выделенные поля.',
  'contact.sent.h': 'Сообщение отправлено',
  'contact.sent.p': 'Спасибо. Ваше сообщение доставлено. Мы читаем каждое сообщение, но не можем обещать срок ответа.',
  'contact.sent.another': 'Отправить ещё одно сообщение',
  'contact.fail.rate': 'С вашего подключения отправлено слишком много сообщений. Подождите несколько минут и повторите попытку.',
  'contact.fail.delivery': 'Сейчас нам не удалось доставить ваше сообщение. Оно не отправлено. Повторите попытку позже.',
  'contact.fail.network': 'Не удалось отправить сообщение из-за сбоя соединения. Проверьте подключение к интернету и повторите попытку.',
} as PartialMessages;
