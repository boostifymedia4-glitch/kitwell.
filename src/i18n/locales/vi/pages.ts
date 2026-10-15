import type { PartialMessages } from '../../en';

export default {
  // Home

  // 404, category, all tools
  'notFound.text': 'Chúng tôi không tìm thấy trang đó. Có thể trang đã được chuyển đi, hoặc địa chỉ bị gõ sai.',
  'notFound.home': 'Về trang chủ',
  'notFound.popular': 'Công cụ phổ biến',
  'category.count': '{count} công cụ.',
  'category.sections': 'Các mục trong {name}',
  'category.more': 'Các danh mục công cụ khác',
  'tools.title': 'Tất cả công cụ',
  'tools.jump': 'Chuyển đến một danh mục',

  // About
  'about.title': 'Giới thiệu {site}',
  'about.lead': 'Những công cụ đơn giản, đáng tin cậy cho các tác vụ hằng ngày với tệp, PDF, văn bản và lập trình.',
  'about.what.h': 'Chúng tôi làm gì',
  'about.what.p': '{site} là một bộ sưu tập các tiện ích nhỏ: chuyển đổi và nén hình ảnh, gộp và tách PDF, làm sạch văn bản, và định dạng hoặc mã hóa dữ liệu. Mỗi công cụ có một trang riêng, chỉ làm một việc, và nói rõ ràng những gì nó hỗ trợ và không hỗ trợ.',
  'about.how.h': 'Các công cụ hoạt động như thế nào',
  'about.how.p': 'Các công cụ chạy bên trong trình duyệt web của bạn. Khi bạn thêm một ảnh hoặc PDF, trình duyệt sẽ đọc nó từ thiết bị của bạn, xử lý cục bộ, rồi đưa kết quả để bạn tải xuống. Các công cụ của chúng tôi không gửi tệp hay văn bản bạn dán đến máy chủ của chúng tôi. Vì công việc diễn ra trên thiết bị của bạn, tốc độ và dung lượng tệp tối đa phụ thuộc vào máy tính hoặc điện thoại của bạn.',
  'about.not.h': 'Những gì chúng tôi không làm',
  'about.not.1': 'Chúng tôi không yêu cầu tài khoản hay thêm hình mờ vào kết quả của bạn.',
  'about.not.2': 'Chúng tôi không viết lại văn bản có sẵn bên trong PDF. Các công cụ PDF gộp, tách, nén, ký, điền, che, so sánh và nhận dạng chữ trong tài liệu, nhưng không thay đổi những từ đã có sẵn.',
  'about.not.3': 'Chúng tôi không cung cấp các công cụ cần mô hình AI lớn hoặc dịch vụ trả phí, chẳng hạn xóa nền, cho đến khi chúng có thể được thực hiện một cách đáng tin cậy và riêng tư. Công cụ duy nhất chúng tôi đi kèm, dành cho OCR, là mã nguồn mở và chạy bên trong trình duyệt của bạn.',
  'about.who.h': 'Ai đứng sau {site}',
  'about.who.placeholder': 'Hãy thêm một mô tả ngắn, trung thực về người hoặc công ty vận hành trang web này: tên, quốc gia và động lực của dự án.',
  'about.touch.h': 'Liên hệ với chúng tôi',
  'about.touch.p': 'Bạn thấy lỗi hoặc muốn thêm một công cụ? Xem <contact>trang liên hệ</contact>. Để biết cách chúng tôi xử lý dữ liệu, hãy đọc <privacy>Chính sách quyền riêng tư</privacy>.',

  // Help chrome
  'help.title': 'Trợ giúp & câu hỏi thường gặp',

  // Legal pages
  'legal.privacy.title': 'Chính sách quyền riêng tư',
  'legal.terms.title': 'Điều khoản & điều kiện',
  'legal.cookies.title': 'Thông tin về cookie và bộ nhớ trình duyệt',

  // Contact
  'contact.title': 'Liên hệ với chúng tôi',
  'contact.lead': 'Chúng tôi hoan nghênh câu hỏi, báo lỗi và đề xuất công cụ.',
  'contact.form.h': 'Gửi tin nhắn',
  'contact.form.name': 'Tên của bạn',
  'contact.form.email': 'Địa chỉ email của bạn',
  'contact.form.emailHint': 'Chỉ dùng để trả lời bạn.',
  'contact.form.page': 'Công cụ hoặc trang (không bắt buộc)',
  'contact.form.pagePlaceholder': 'Ví dụ: Gộp PDF',
  'contact.form.message': 'Tin nhắn',
  'contact.form.messageHint': 'Ít nhất {min} ký tự. Vui lòng không đưa mật khẩu hoặc tài liệu nhạy cảm vào.',
  'contact.form.counter': '{count} / {max}',
  'contact.form.send': 'Gửi tin nhắn',
  'contact.form.sending': 'Đang gửi…',
  'contact.form.honeypot': 'Để trống trường này',
  'contact.err.name': 'Hãy nhập tên của bạn.',
  'contact.err.email': 'Hãy nhập địa chỉ email hợp lệ.',
  'contact.err.message': 'Hãy viết tin nhắn có ít nhất {min} ký tự (tối đa {max}).',
  'contact.err.summary': 'Vui lòng sửa các trường được đánh dấu.',
  'contact.sent.h': 'Đã gửi tin nhắn',
  'contact.sent.p': 'Cảm ơn bạn. Tin nhắn của bạn đã được gửi đi. Chúng tôi đọc mọi tin nhắn nhưng không thể hứa thời gian phản hồi.',
  'contact.sent.another': 'Gửi tin nhắn khác',
  'contact.fail.notConfigured': 'Biểu mẫu liên hệ chưa được kết nối với hộp thư trên trang web này, nên tin nhắn của bạn chưa được gửi. Không có gì được lưu lại.',
  'contact.fail.rate': 'Có quá nhiều tin nhắn từ kết nối của bạn. Vui lòng đợi vài phút rồi thử lại.',
  'contact.fail.delivery': 'Hiện chúng tôi không thể gửi tin nhắn của bạn. Tin nhắn chưa được gửi. Vui lòng thử lại sau.',
  'contact.fail.network': 'Không thể gửi tin nhắn vì kết nối bị lỗi. Hãy kiểm tra kết nối internet và thử lại.',
  'contact.unavailable.h': 'Biểu mẫu liên hệ chưa khả dụng',
  'contact.unavailable.p': 'Trang web này chưa được kết nối với hộp thư, nên không thể gửi tin nhắn từ trang này.',
  'contact.report.h': 'Báo cáo sự cố',
  'contact.report.intro': 'Để giúp chúng tôi tái hiện sự cố, vui lòng cung cấp:',
  'contact.report.1': 'Tên công cụ và địa chỉ trang.',
  'contact.report.2': 'Trình duyệt và thiết bị của bạn (ví dụ “Chrome 130 trên Windows 11”).',
  'contact.report.3': 'Điều bạn mong đợi và điều đã xảy ra, kể cả mọi thông báo lỗi.',
  'contact.report.4': 'Loại tệp và dung lượng xấp xỉ. Vui lòng không gửi tài liệu nhạy cảm.',
  'contact.privacy': 'Tin nhắn bạn viết ở đây được gửi đến chúng tôi và chỉ dùng để trả lời bạn. Các tệp và văn bản bạn dùng trong công cụ không bao giờ là một phần của nó. Xem <privacy>Chính sách quyền riêng tư</privacy>.',
} as PartialMessages;
