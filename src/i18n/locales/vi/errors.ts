import type { PartialMessages } from '../../en';

export default {
  // Generic
  'err.generic': 'Đã xảy ra lỗi. Vui lòng thử lại.',
  'err.unknown': 'lỗi không xác định',

  // File validation
  'err.files.limit': 'Đã đạt giới hạn {max} tệp.',
  'err.files.unsupportedType': 'Loại tệp không được hỗ trợ. Chấp nhận: {types}.',
  'err.files.empty': 'Tệp trống.',
  'err.files.tooLarge': 'Quá lớn ({size}). Tối đa là {max}.',
  'err.files.onlyOne': 'Mỗi lần chỉ có thể dùng một tệp.',

  // JSON
  'err.json.badUnicode': 'Chuỗi thoát unicode không hợp lệ',
  'err.json.badEscape': 'Chuỗi thoát không hợp lệ trong chuỗi',
  'err.json.controlChar': 'Ký tự điều khiển chưa được thoát trong chuỗi (dùng \\n để xuống dòng)',
  'err.json.unterminatedString': 'Chuỗi chưa được đóng',
  'err.json.invalidNumber': 'Số không hợp lệ',
  'err.json.unexpectedEnd': 'JSON kết thúc đột ngột',
  'err.json.trailingComma': 'JSON không cho phép dấu phẩy ở cuối',
  'err.json.propertyName': 'Cần một tên thuộc tính đặt trong dấu nháy kép',
  'err.json.doubleQuotes': 'Chuỗi phải dùng dấu nháy kép',
  'err.json.unexpectedChar': 'Ký tự không mong đợi "{char}"',
  'err.json.trailingContent': 'Có nội dung không mong đợi sau phần kết thúc của giá trị JSON',
  'err.json.empty': 'Hãy nhập JSON để tiếp tục.',
  'err.json.invalid': 'JSON không hợp lệ',

  // XML
  'err.xml.empty': 'Hãy nhập XML để tiếp tục.',
  'err.xml.unterminatedComment': 'Chú thích chưa được đóng',
  'err.xml.unterminatedPi': 'Chỉ thị xử lý chưa được đóng',
  'err.xml.unterminatedDeclaration': 'Khai báo chưa được đóng',
  'err.xml.unterminatedAttribute': 'Giá trị thuộc tính chưa được đóng',
  'err.xml.unterminatedTag': 'Thẻ chưa được đóng',
  'err.xml.unexpectedClosing': 'Thẻ đóng không mong đợi </{name}>',
  'err.xml.mismatched': 'Thẻ đóng không khớp: cần </{expected}> nhưng tìm thấy </{found}>',
  'err.xml.invalidTagName': 'Tên thẻ không hợp lệ "{name}"',
  'err.xml.unclosedTag': 'Thẻ chưa đóng <{name}>',
  'err.xml.noElement': 'Không tìm thấy phần tử XML nào',
  'err.xml.singleRoot': 'Tài liệu XML phải có đúng một phần tử gốc',
  'err.xml.strayText': 'Không cho phép văn bản nằm ngoài phần tử gốc',

  // Developer tools
  'err.dev.malformedPercent': 'Văn bản chứa chuỗi phần trăm sai định dạng (ví dụ dấu "%" không theo sau bởi hai chữ số thập lục phân).',
  'err.dev.badBase64': 'Đây không phải Base64 hợp lệ. Hãy kiểm tra các ký tự bị thiếu, thừa hoặc không được hỗ trợ.',
  'err.dev.notUtf8': 'Dữ liệu sau khi giải mã không phải văn bản UTF-8 hợp lệ. Có thể đó là dữ liệu nhị phân như hình ảnh.',
  'err.dev.noCharType': 'Hãy chọn ít nhất một loại ký tự.',
  'err.dev.timestampFormat': 'Hãy nhập số giây hoặc mili giây kể từ 1970-01-01 UTC.',
  'err.dev.timestampRange': 'Dấu thời gian đó nằm ngoài phạm vi ngày được hỗ trợ.',
  'err.regex.invalid': 'Biểu thức chính quy không hợp lệ',
  'err.regex.timeout': 'Mẫu này chạy quá lâu và đã bị dừng. Nó có thể gây ra hiện tượng quay lui thảm khốc (catastrophic backtracking), ví dụ lặp lồng nhau như (a+)+.',

  // GIF
  'err.gif.noImages': 'Hãy thêm ít nhất một ảnh.',
  'err.gif.tooManyFrames': 'Ảnh GIF có tối đa {max} khung hình.',
  'err.gif.sizeNotInteger': 'Kích thước GIF phải là số nguyên pixel.',
  'err.gif.tooLarge': 'Ảnh GIF quá lớn.',
  'err.gif.tooLargeToBuild': 'Ảnh GIF này sẽ quá lớn để trình duyệt của bạn tạo ra. Hãy dùng kích thước nhỏ hơn hoặc ít khung hình hơn.',
  'err.gif.colours': 'Hãy chọn 16, 32, 64, 128 hoặc 256 màu.',
  'err.gif.frameMismatch': 'Một khung hình không khớp với kích thước GIF.',
  'err.gif.notGif': 'Không phải tệp GIF.',
  'err.gif.damaged': 'Dữ liệu GIF bị hỏng.',
  'err.gif.incomplete': 'Dữ liệu GIF không đầy đủ.',

  // Images
  'err.image.processingFailed': 'Xử lý thất bại.',
  'err.image.noCanvas': 'Không thể tạo bề mặt vẽ. Ảnh có thể quá lớn đối với thiết bị này.',
  'err.image.resultTooBig': 'Kết quả sẽ có kích thước {width} × {height} px, lớn hơn mức mà công cụ trình duyệt này có thể tạo an toàn (tối đa {max} px mỗi cạnh).',
  'err.image.watermarkTooSmall': 'Hình mờ quá nhỏ để lát kín. Hãy dùng kích thước lớn hơn hoặc một dấu duy nhất.',
  'err.image.notLarger': 'Hãy chọn kích thước lớn hơn bản gốc. Dùng Đổi kích thước ảnh để làm ảnh nhỏ lại.',
  'err.image.notSvg': 'Tệp này có vẻ không phải ảnh SVG.',
  'err.image.svgFailed': 'Không thể vẽ SVG này. Có thể nó không hợp lệ hoặc dùng các tính năng mà trình duyệt không hỗ trợ.',
  'err.image.encodeFailed': 'Trình duyệt không thể mã hóa ảnh này.',
  'err.image.formatUnsupported': 'Trình duyệt của bạn không thể lưu ảnh {format}. Hãy thử định dạng đầu ra khác hoặc phiên bản hiện tại của Chrome, Edge hoặc Firefox.',
  'err.image.unreadable': 'Không thể đọc tệp này như một hình ảnh. Tệp có thể bị hỏng hoặc có định dạng không được hỗ trợ.',

  // OCR
  'err.ocr.engineStart': 'Không thể khởi động công cụ OCR. Hãy tải lại trang và thử lại; nếu vẫn lỗi, trình duyệt của bạn có thể không hỗ trợ WebAssembly.',

  // Passwords
  'err.passwords.chooseCase': 'Hãy chọn chữ hoa, chữ thường, hoặc cả hai.',
  'err.passwords.length': 'Hãy chọn độ dài từ {min} đến {max}.',
  'err.passwords.chooseCategory': 'Hãy chọn ít nhất một nhóm từ.',
  'err.passwords.cannotBuild': 'Không thể tạo mật khẩu dựa trên tên với các thiết lập này. Hãy thử độ dài khác hoặc bật số hay ký hiệu.',

  // QR codes
  'err.qr.noText': 'Hãy nhập văn bản hoặc liên kết trước.',
  'err.qr.tooMuchData': 'Lượng dữ liệu này quá lớn cho mã QR ở mức sửa lỗi này. Hãy rút ngắn văn bản hoặc chọn mức thấp hơn.',
  'err.qr.badColours': 'Hãy chọn màu hợp lệ.',
  'err.qr.wifiName': 'Hãy nhập tên mạng.',
  'err.qr.wifiPassword': 'Hãy nhập mật khẩu Wi-Fi, hoặc chọn “Không có mật khẩu”.',
  'err.qr.email': 'Hãy nhập địa chỉ email hợp lệ.',
  'err.qr.phone': 'Hãy nhập số điện thoại bằng chữ số, có thể bắt đầu bằng dấu +.',
  'err.qr.unreadableImage': 'Không thể đọc ảnh này. Ảnh có thể quá lớn đối với thiết bị này.',

  // PDF: reading and general
  'err.pdf.onlyOne': 'Mỗi lần chỉ có thể dùng một tệp PDF.',
  'err.pdf.unreadable': 'Không thể đọc tệp này như một PDF. Tệp có thể bị hỏng hoặc hoàn toàn không phải PDF.',
  'err.pdf.passwordProtected': 'PDF này được bảo vệ bằng mật khẩu. Hãy gỡ mật khẩu bằng công cụ Mở khóa PDF của chúng tôi trước, rồi thử lại.',
  'err.pdf.pageMissing': 'Trang {page} không tồn tại trong tài liệu này.',
  'err.pdf.noCanvas': 'Trình duyệt của bạn không thể tạo bề mặt vẽ cho trang này.',
  'err.pdf.encodePage': 'Trình duyệt không thể mã hóa trang này thành hình ảnh.',
  'err.pdf.encodePageImage': 'Trình duyệt không thể mã hóa ảnh của một trang.',
  'err.pdf.renderTooLarge': 'Trang này quá lớn để kết xuất ở độ phân giải đã chọn. Hãy thử DPI thấp hơn.',
  'err.pdf.previewTooLarge': 'Trang này quá lớn để xem trước.',
  'err.pdf.flattenTooLarge': 'Một trang quá lớn để xử lý ở chất lượng này. Hãy chọn thiết lập chất lượng thấp hơn.',
  'err.pdf.compareSize': 'Hai ảnh phải có cùng kích thước.',

  // PDF: merge, split, pages
  'err.pdf.mergeNeedTwo': 'Hãy thêm ít nhất hai tệp PDF để gộp.',
  'err.pdf.mergeFile': '{name}: {message}',
  'err.pdf.fileN': 'Tệp {n}',
  'err.pdf.selectPage': 'Hãy chọn ít nhất một trang.',
  'err.pdf.selectedPageMissing': 'Một trang đã chọn không tồn tại trong PDF này.',
  'err.pdf.enterPages': 'Hãy nhập các trang bạn muốn, ví dụ 1-3, 5.',
  'err.pdf.enterRanges': 'Hãy nhập các khoảng trang cho từng tệp đầu ra, ví dụ 1-3, 4-6.',
  'err.pdf.badRange': '"{token}" không phải là trang hoặc khoảng trang hợp lệ.',
  'err.pdf.rangeOutside.other': '"{token}" nằm ngoài tài liệu này, tài liệu có {count} trang.',
  'err.pdf.rangeBackwards': '"{token}" bị ngược. Hãy viết khoảng trang từ thấp đến cao, như {example}.',
  'err.pdf.noImages': 'Hãy thêm ít nhất một ảnh.',
  'err.pdf.imageEmbed': 'Không thể nhúng một trong các ảnh. Ảnh có thể bị hỏng hoặc dùng biến thể không được hỗ trợ.',

  // PDF: editing
  'err.pdf.latinOnly': 'Ở đây chỉ có thể dùng chữ cái Latin, chữ số và các ký hiệu thông dụng, vì phông chữ tích hợp của PDF không bao gồm các bảng chữ cái khác.',
  'err.pdf.badColour': 'Hãy chọn màu hợp lệ.',
  'err.pdf.badPages': 'Hãy chọn các trang hợp lệ.',
  'err.pdf.numberFirst': 'Trang đầu tiên cần đánh số phải nằm trong khoảng từ 1 đến {count}.',
  'err.pdf.numberLast': 'Trang cuối cùng cần đánh số phải nằm trong khoảng từ {from} đến {count}.',
  'err.pdf.numberStart': 'Hãy bắt đầu đánh số từ một số nguyên từ 0 đến 99.999.',
  'err.pdf.fontSize72': 'Cỡ chữ phải nằm trong khoảng từ 6 đến 72.',
  'err.pdf.fontSize300': 'Cỡ chữ phải nằm trong khoảng từ 6 đến 300.',
  'err.pdf.margin': 'Lề phải nằm trong khoảng từ 0 đến 200.',
  'err.pdf.opacity': 'Độ mờ đục phải nằm trong khoảng từ 5% đến 100%.',
  'err.pdf.angle': 'Góc phải nằm trong khoảng từ -180 đến 180 độ.',
  'err.pdf.watermarkText': 'Hãy nhập văn bản hình mờ.',
  'err.pdf.watermarkLength': 'Văn bản hình mờ có tối đa 100 ký tự.',
  'err.pdf.imageScale': 'Kích thước ảnh phải nằm trong khoảng từ 5% đến 100% chiều rộng trang.',
  'err.pdf.watermarkImage': 'Không thể đọc ảnh hình mờ. Hãy dùng tệp PNG hoặc JPG hợp lệ.',
  'err.pdf.watermarkTile': 'Hình mờ quá nhỏ để lát kín. Hãy dùng kích thước lớn hơn hoặc bố cục ở giữa.',
  'err.pdf.cropOutside': 'Hãy chọn vùng cắt nằm bên trong trang.',
  'err.pdf.cropSmall': 'Vùng cắt quá nhỏ ở trang {page}.',

  // PDF: protect and unlock
  'err.pdf.enterPassword': 'Hãy nhập mật khẩu.',
  'err.pdf.passwordLength': 'Mật khẩu có tối đa 127 ký tự.',
  'err.pdf.passwordChars': 'Chỉ dùng chữ cái, chữ số và ký hiệu chuẩn trong mật khẩu để mọi trình đọc PDF đều có thể mở tệp.',
  'err.pdf.alreadyPassword': 'PDF này đã được bảo vệ bằng mật khẩu. Hãy mở khóa trước bằng công cụ Mở khóa PDF.',
  'err.pdf.alreadyProtected': 'PDF này đã được bảo vệ. Hãy mở khóa trước bằng công cụ Mở khóa PDF.',
  'err.pdf.unlockUnsupported': 'Không thể mở khóa PDF này. Có thể nó dùng một kiểu bảo vệ không được hỗ trợ.',
  'err.pdf.wrongPassword': 'Mật khẩu đó không đúng.',
  'err.pdf.unlockDamaged': 'Không thể mở khóa PDF này. Có thể nó bị hỏng.',

  // PDF: forms
  'err.pdf.formRead': 'Không thể đọc các trường biểu mẫu trong PDF này. Tệp có thể dùng cấu trúc biểu mẫu khác thường.',
  'err.pdf.formFieldChar': 'Giá trị của “{name}” chứa một ký tự mà phông chữ của biểu mẫu không thể hiển thị. Hãy dùng chữ cái Latin thông thường, chữ số và ký hiệu phổ biến trong trường này.',
  'err.pdf.formNoField': 'Trường “{name}” không tồn tại trong PDF này.',
  'err.pdf.formMaxLength': '“{name}” cho phép tối đa {max} ký tự.',
  'err.pdf.formFillFailed': 'Không thể điền “{name}”: {message}.',
  'err.pdf.formChar': 'Một trường chứa ký tự mà phông chữ của biểu mẫu không thể hiển thị. Hãy dùng chữ cái Latin thông thường, chữ số và ký hiệu phổ biến.',
  'err.pdf.formSaveFailed': 'Không thể lưu biểu mẫu đã điền: {message}.',

  // PDF: redact and sign
  'err.pdf.redactNothing': 'Hãy đánh dấu ít nhất một vùng hoặc cụm từ tìm kiếm để che.',
  'err.pdf.signNoPlacement': 'Hãy chọn vị trí đặt chữ ký.',
  'err.pdf.signImageUnreadable': 'Không thể đọc ảnh chữ ký. Hãy vẽ, gõ hoặc tải lên chữ ký dạng PNG hoặc JPG.',
  'err.pdf.signOutside': 'Chữ ký phải nằm gọn bên trong trang.',
} as PartialMessages;
