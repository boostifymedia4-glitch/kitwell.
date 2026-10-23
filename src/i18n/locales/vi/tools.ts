import type { ToolTextMap } from '../../toolText';

const tools: ToolTextMap = {
  'jpg-to-png': {
    name: 'JPG sang PNG',
    description: 'Chuyển ảnh JPG và JPEG sang ảnh PNG không mất chất lượng chỉ bằng một cú nhấp.',
    metaDescription: 'Chuyển JPG sang PNG trực tuyến miễn phí. Chuyển hàng loạt ảnh JPEG sang PNG ngay trong trình duyệt, không cần tải lên và không cần đăng ký.',
    steps: [
      'Thả một hoặc nhiều tệp JPG vào công cụ, hoặc chọn chúng từ thiết bị của bạn.',
      'Xem lại bản xem trước, sau đó nhấn Chuyển đổi.',
      'Tải từng tệp PNG về, hoặc tải tất cả dưới dạng tệp ZIP.',
    ],
    faq: [
      { q: 'Chuyển JPG sang PNG có cải thiện chất lượng không?', a: 'Không. JPG là định dạng nén mất dữ liệu, nên chi tiết đã bị loại bỏ khi lưu JPG không thể khôi phục. PNG chỉ lưu các điểm ảnh hiện tại mà không mất thêm dữ liệu, điều này hữu ích khi chỉnh sửa hoặc làm việc với độ trong suốt.' },
      { q: 'Vì sao tệp PNG lớn hơn tệp JPG?', a: 'PNG không làm mất dữ liệu và thường lưu ảnh chụp kém hiệu quả hơn JPG. Hãy dùng JPG hoặc WebP khi dung lượng tệp quan trọng hơn độ chính xác từng điểm ảnh.' },
    ],
    limits: [
      'Tệp GIF hoặc WebP động chỉ được chuyển đổi bằng khung hình đầu tiên.',
      'Tối đa 25 MB mỗi tệp và 20 tệp mỗi lượt, để trình duyệt của bạn luôn hoạt động mượt.',
      'Siêu dữ liệu EXIF và hồ sơ màu nhúng không được giữ lại.',
    ],
  },
  "png-to-jpg": {
    name: "PNG sang JPG",
    description: "Chuyển ảnh PNG thành tệp JPG nhỏ hơn chỉ với một cú nhấp.",
    metaDescription: "Chuyển PNG sang JPG trực tuyến miễn phí. Vùng trong suốt được tô màu trắng. Xử lý ngay trong trình duyệt của bạn.",
    steps: [
      "Thêm các tệp PNG của bạn.",
      "Vùng trong suốt được tô màu trắng, vì JPG không thể lưu độ trong suốt.",
      "Nhấn Chuyển đổi và tải kết quả xuống.",
    ],
    faq: [
      { q: "Điều gì xảy ra với vùng trong suốt?", a: "JPG không có độ trong suốt, nên các điểm ảnh trong suốt được tô màu trắng." },
    ],
    limits: [
      "Tệp GIF hoặc WebP động chỉ được chuyển đổi từ khung hình đầu tiên.",
      "Tối đa 25 MB mỗi tệp và 20 tệp mỗi lô, để trình duyệt của bạn luôn mượt.",
      "Siêu dữ liệu EXIF và hồ sơ màu nhúng không được giữ lại.",
      "Vùng trong suốt được tô màu trắng vì JPG không thể lưu độ trong suốt.",
    ],
  },
  "jpg-to-webp": {
    name: "JPG sang WebP",
    description: "Chuyển ảnh JPG sang WebP hiện đại để có tệp nhỏ hơn và trang tải nhanh hơn.",
    metaDescription: "Chuyển JPG sang WebP trực tuyến miễn phí. Thu nhỏ ảnh cho web với chất lượng cố định, cân bằng, xử lý ngay trong trình duyệt của bạn.",
    steps: [
      "Thêm các tệp JPG của bạn.",
      "Không có gì cần cài đặt: công cụ dùng chất lượng cân bằng cho tệp WebP.",
      "Chuyển đổi và tải xuống.",
    ],
    faq: [
      { q: "WebP có nhỏ hơn JPG không?", a: "Thường nhỏ hơn 20–35% ở chất lượng hình ảnh tương đương, tuy kết quả còn tùy từng ảnh." },
      { q: "Trình duyệt nào cũng hỗ trợ WebP chứ?", a: "Mọi trình duyệt lớn hiện nay đều hiển thị được WebP. Mã hóa WebP trong trình duyệt được hỗ trợ ở Chrome, Edge, Firefox và Safari bản mới; nếu trình duyệt của bạn không làm được, công cụ sẽ báo cho bạn thay vì tạo ra tệp sai." },
    ],
    limits: [
      "Tệp GIF hoặc WebP động chỉ được chuyển đổi từ khung hình đầu tiên.",
      "Tối đa 25 MB mỗi tệp và 20 tệp mỗi lô, để trình duyệt của bạn luôn mượt.",
      "Siêu dữ liệu EXIF và hồ sơ màu nhúng không được giữ lại.",
      "Trình duyệt của bạn phải hỗ trợ mã hóa WebP; trình duyệt không hỗ trợ sẽ hiện lỗi.",
    ],
  },
  "png-to-webp": {
    name: "PNG sang WebP",
    description: "Chuyển ảnh PNG sang WebP và giữ độ trong suốt với dung lượng chỉ bằng một phần nhỏ.",
    metaDescription: "Chuyển PNG sang WebP trực tuyến miễn phí. Giữ độ trong suốt, giảm dung lượng tệp và chạy hoàn toàn trong trình duyệt của bạn.",
    steps: [
      "Thêm các tệp PNG của bạn.",
      "Không có gì cần cài đặt: công cụ dùng chất lượng cân bằng cho tệp WebP.",
      "Chuyển đổi và tải xuống.",
    ],
    faq: [
      { q: "Độ trong suốt có được giữ lại không?", a: "Có. WebP hỗ trợ kênh alpha, nên PNG trong suốt vẫn trong suốt." },
      { q: "Tôi có thể có kết quả không suy hao không?", a: "Công cụ mã hóa WebP với chất lượng cao, cân bằng. Trình duyệt mã hóa WebP có suy hao, vì vậy hãy dùng PNG nếu bạn cần một bản sao chính xác tuyệt đối." },
    ],
    limits: [
      "Tệp GIF hoặc WebP động chỉ được chuyển đổi từ khung hình đầu tiên.",
      "Tối đa 25 MB mỗi tệp và 20 tệp mỗi lô, để trình duyệt của bạn luôn mượt.",
      "Siêu dữ liệu EXIF và hồ sơ màu nhúng không được giữ lại.",
      "Trình duyệt của bạn phải hỗ trợ mã hóa WebP; trình duyệt không hỗ trợ sẽ hiện lỗi.",
    ],
  },
  "webp-to-jpg": {
    name: "WebP sang JPG",
    description: "Chuyển ảnh WebP thành tệp JPG tương thích rộng rãi.",
    metaDescription: "Chuyển WebP sang JPG trực tuyến miễn phí. Giúp ảnh WebP dùng được ở mọi nơi, chuyển đổi cục bộ ngay trong trình duyệt của bạn.",
    steps: [
      "Thêm các tệp WebP của bạn.",
      "Vùng trong suốt được tô màu trắng, vì JPG không thể lưu độ trong suốt.",
      "Chuyển đổi và tải xuống.",
    ],
    faq: [
      { q: "Vì sao nên chuyển WebP sang JPG?", a: "Một số phần mềm cũ, ứng dụng email và biểu mẫu tải lên vẫn từ chối WebP. JPG được chấp nhận gần như ở mọi nơi." },
    ],
    limits: [
      "Tệp GIF hoặc WebP động chỉ được chuyển đổi từ khung hình đầu tiên.",
      "Tối đa 25 MB mỗi tệp và 20 tệp mỗi lô, để trình duyệt của bạn luôn mượt.",
      "Siêu dữ liệu EXIF và hồ sơ màu nhúng không được giữ lại.",
      "Vùng trong suốt được tô màu trắng vì JPG không thể lưu độ trong suốt.",
    ],
  },
  'webp-to-png': {
    name: 'WebP sang PNG',
    description: 'Chuyển ảnh WebP sang PNG không mất chất lượng và giữ độ trong suốt.',
    metaDescription: 'Chuyển WebP sang PNG trực tuyến miễn phí. Giữ độ trong suốt và chạy hoàn toàn trong trình duyệt của bạn, không cần tải lên.',
    steps: [
      'Thêm các tệp WebP của bạn.',
      'Nhấn Chuyển đổi.',
      'Tải các tệp PNG về.',
    ],
    faq: [
      { q: 'Độ trong suốt có được giữ lại không?', a: 'Có. PNG hỗ trợ độ trong suốt, nên kênh alpha từ WebP được giữ nguyên.' },
    ],
    limits: [
      'Tệp GIF hoặc WebP động chỉ được chuyển đổi bằng khung hình đầu tiên.',
      'Tối đa 25 MB mỗi tệp và 20 tệp mỗi lượt, để trình duyệt của bạn luôn hoạt động mượt.',
      'Siêu dữ liệu EXIF và hồ sơ màu nhúng không được giữ lại.',
    ],
  },
  "image-compressor": {
    name: "Nén ảnh",
    description: "Giảm dung lượng tệp ảnh và xem chính xác mức tiết kiệm.",
    metaDescription: "Nén ảnh JPG, PNG và WebP trực tuyến miễn phí. Có thể giới hạn kích thước và so sánh dung lượng tệp. Chạy trong trình duyệt của bạn.",
    steps: [
      "Thêm các ảnh của bạn.",
      "Chọn định dạng đầu ra và, nếu muốn, chiều rộng hoặc chiều cao tối đa.",
      "Nén, so sánh dung lượng trước và sau, rồi tải xuống.",
    ],
    faq: [
      { q: "Bộ nén giảm dung lượng bằng cách nào?", a: "Nó mã hóa lại ảnh với chất lượng cố định, cân bằng và cũng có thể thu nhỏ ảnh. Đầu ra PNG không suy hao, nên chỉ nhỏ đi khi bạn cũng giảm kích thước." },
      { q: "Nếu kết quả lớn hơn bản gốc thì sao?", a: "Điều này có thể xảy ra với tệp đã được tối ưu. Khi đó công cụ giữ nguyên tệp gốc và cho bạn biết." },
      { q: "Dữ liệu EXIF hay vị trí có được giữ lại không?", a: "Không. Mã hóa lại qua canvas sẽ bỏ siêu dữ liệu EXIF như kiểu máy ảnh và vị trí GPS, điều thường là điều bạn muốn trước khi chia sẻ ảnh. Hồ sơ màu cũng không được giữ lại." },
    ],
    limits: [
      "Tệp GIF hoặc WebP động chỉ được chuyển đổi từ khung hình đầu tiên.",
      "Tối đa 25 MB mỗi tệp và 20 tệp mỗi lô, để trình duyệt của bạn luôn mượt.",
      "Siêu dữ liệu EXIF và hồ sơ màu nhúng không được giữ lại.",
      "Kết quả tốt nhất đến từ đầu ra JPG hoặc WebP; đầu ra PNG không suy hao và có thể không nhỏ đi.",
    ],
  },
  'image-resizer': {
    name: 'Đổi kích thước ảnh',
    description: 'Đổi kích thước ảnh theo số điểm ảnh chính xác hoặc theo phần trăm, giữ nguyên tỷ lệ khung hình.',
    metaDescription: 'Đổi kích thước ảnh trực tuyến miễn phí. Đặt chiều rộng và chiều cao chính xác hoặc theo phần trăm, giữ tỷ lệ khung hình và tải về JPG, PNG hoặc WebP.',
    steps: [
      'Thêm một hoặc nhiều ảnh.',
      'Chọn theo điểm ảnh hoặc phần trăm và nhập kích thước mới. Giữ khóa tỷ lệ khung hình bật để tránh biến dạng.',
      'Đổi kích thước và tải về.',
    ],
    faq: [
      { q: 'Tôi có thể phóng to ảnh không?', a: 'Có, nhưng phóng to không thể thêm chi tiết, nên kết quả sẽ trông mềm hơn. Thu nhỏ cho chất lượng tốt nhất.' },
      { q: 'Kích thước đầu ra tối đa là bao nhiêu?', a: 'Trình duyệt giới hạn kích thước canvas. Công cụ này giới hạn đầu ra ở 16.000 px mỗi cạnh và khoảng 100 megapixel.' },
      { q: 'EXIF hoặc dữ liệu vị trí có được giữ lại không?', a: 'Không. Mã hóa lại qua canvas sẽ loại bỏ siêu dữ liệu EXIF như kiểu máy ảnh và vị trí GPS, thường đúng là điều bạn muốn trước khi chia sẻ ảnh. Hồ sơ màu cũng không được giữ lại.' },
    ],
    limits: [
      'Tệp GIF hoặc WebP động chỉ được chuyển đổi bằng khung hình đầu tiên.',
      'Tối đa 25 MB mỗi tệp và 20 tệp mỗi lượt, để trình duyệt của bạn luôn hoạt động mượt.',
      'Siêu dữ liệu EXIF và hồ sơ màu nhúng không được giữ lại.',
      'Đầu ra bị giới hạn ở 16.000 px mỗi cạnh.',
    ],
  },
  "image-cropper": {
    name: "Cắt ảnh",
    description: "Cắt ảnh theo vùng chính xác hoặc tỷ lệ khung hình cố định với bản xem trước trực tiếp.",
    metaDescription: "Cắt ảnh trực tuyến miễn phí. Chọn tỷ lệ khung hình cố định hoặc đặt giá trị pixel chính xác với bản xem trước trực tiếp. Xử lý ngay trong trình duyệt của bạn.",
    steps: [
      "Thêm một ảnh.",
      "Chọn tỷ lệ khung hình hoặc kéo khung cắt, rồi tinh chỉnh vị trí và kích thước bằng các ô số.",
      "Nhấn Cắt và tải xuống.",
    ],
    faq: [
      { q: "Cắt ảnh có làm giảm chất lượng không?", a: "Việc cắt giữ nguyên các điểm ảnh gốc. Kết quả JPG và WebP được lưu ở chất lượng cố định cao, nên khi dùng bình thường không thấy suy giảm." },
    ],
    limits: [
      "Mỗi lần một ảnh.",
      "Tối đa 25 MB mỗi tệp.",
      "Ảnh động dùng khung hình đầu tiên.",
    ],
  },
  'image-rotator': {
    name: 'Xoay ảnh',
    description: 'Xoay ảnh 90°, 180°, 270° hoặc theo bất kỳ góc tùy chỉnh nào.',
    metaDescription: 'Xoay ảnh trực tuyến miễn phí. Xoay ảnh 90, 180 hoặc 270 độ, hoặc theo góc tùy chỉnh, ngay trong trình duyệt của bạn.',
    steps: [
      'Thêm ảnh của bạn.',
      'Chọn một kiểu xoay hoặc nhập góc tùy chỉnh.',
      'Áp dụng và tải về.',
    ],
    faq: [
      { q: 'Điều gì xảy ra với các góc xoay không phải góc vuông?', a: 'Canvas được mở rộng để chứa vừa ảnh đã xoay. Với đầu ra JPG, các góc trống được lấp bằng màu nền bạn chọn; PNG và WebP giữ chúng trong suốt.' },
    ],
    limits: [
      'Tệp GIF hoặc WebP động chỉ được chuyển đổi bằng khung hình đầu tiên.',
      'Tối đa 25 MB mỗi tệp và 20 tệp mỗi lượt, để trình duyệt của bạn luôn hoạt động mượt.',
      'Siêu dữ liệu EXIF và hồ sơ màu nhúng không được giữ lại.',
    ],
  },
  'image-flipper': {
    name: 'Lật ảnh',
    description: 'Lật đối xứng ảnh theo chiều ngang hoặc chiều dọc.',
    metaDescription: 'Lật ảnh theo chiều ngang hoặc chiều dọc trực tuyến miễn phí. Lật đối xứng ảnh ngay trong trình duyệt, không cần tải lên.',
    steps: [
      'Thêm ảnh của bạn.',
      'Chọn lật ngang, lật dọc hoặc cả hai.',
      'Áp dụng và tải về.',
    ],
    faq: [
      { q: 'Lật ngang và lật dọc khác nhau thế nào?', a: 'Lật ngang đối xứng trái và phải, như soi gương. Lật dọc đảo ngược ảnh theo trục ngang của nó.' },
    ],
    limits: [
      'Tệp GIF hoặc WebP động chỉ được chuyển đổi bằng khung hình đầu tiên.',
      'Tối đa 25 MB mỗi tệp và 20 tệp mỗi lượt, để trình duyệt của bạn luôn hoạt động mượt.',
      'Siêu dữ liệu EXIF và hồ sơ màu nhúng không được giữ lại.',
    ],
  },
  "image-format-converter": {
    name: "Chuyển định dạng ảnh",
    description: "Chuyển đổi giữa JPG, PNG và WebP bằng một công cụ linh hoạt.",
    metaDescription: "Chuyển ảnh giữa JPG, PNG và WebP trực tuyến miễn phí. Chọn định dạng đầu ra, xử lý ngay trong trình duyệt của bạn.",
    steps: [
      "Thêm ảnh ở bất kỳ định dạng nào được hỗ trợ.",
      "Chọn định dạng đầu ra.",
      "Chuyển đổi và tải xuống.",
    ],
    faq: [
      { q: "Tôi có thể dùng những định dạng nào?", a: "Đầu vào: JPG, PNG, WebP, GIF, BMP và AVIF nếu trình duyệt của bạn giải mã được. Đầu ra: JPG, PNG và WebP." },
      { q: "Còn HEIC hoặc TIFF thì sao?", a: "Trình duyệt không thể giải mã HEIC hay TIFF một cách tự nhiên, nên hiện chưa được hỗ trợ." },
    ],
    limits: [
      "Tệp GIF hoặc WebP động chỉ được chuyển đổi từ khung hình đầu tiên.",
      "Tối đa 25 MB mỗi tệp và 20 tệp mỗi lô, để trình duyệt của bạn luôn mượt.",
      "Siêu dữ liệu EXIF và hồ sơ màu nhúng không được giữ lại.",
      "Không hỗ trợ tệp HEIC/HEIF, TIFF và RAW.",
    ],
  },
  'image-to-base64': {
    name: 'Ảnh sang Base64',
    description: 'Mã hóa ảnh thành data URI Base64 để dùng trong CSS, HTML hoặc JSON.',
    metaDescription: 'Chuyển ảnh thành chuỗi Base64 hoặc data URI trực tuyến miễn phí. Sao chép sẵn đoạn mã HTML và CSS. Chạy trong trình duyệt của bạn.',
    steps: [
      'Thêm một ảnh.',
      'Chọn kiểu đầu ra: data URI, Base64 thuần, HTML <img> hoặc CSS.',
      'Sao chép kết quả.',
    ],
    faq: [
      { q: 'Khi nào nên dùng ảnh Base64?', a: 'Cho các biểu tượng rất nhỏ trong CSS hoặc email, nơi một yêu cầu bổ sung tốn kém hơn mức tăng dung lượng khoảng 33%. Tránh dùng cho ảnh chụp lớn.' },
    ],
    limits: [
      'Tối đa 5 MB mỗi ảnh, vì văn bản Base64 trở nên rất lớn.',
      'Mỗi lần một ảnh.',
    ],
  },
  'base64-to-image': {
    name: 'Base64 sang ảnh',
    description: 'Giải mã chuỗi Base64 hoặc data URI trở lại thành ảnh có thể tải về.',
    metaDescription: 'Chuyển chuỗi Base64 hoặc data URI thành ảnh trực tuyến miễn phí. Xem trước và tải về ảnh PNG, JPG, WebP hoặc GIF đã giải mã.',
    steps: [
      'Dán chuỗi Base64 hoặc một data URI đầy đủ.',
      'Ảnh được giải mã và xem trước ngay lập tức.',
      'Tải ảnh về.',
    ],
    faq: [
      { q: 'Tôi có cần tiền tố "data:image/png;base64," không?', a: 'Không. Nếu không có tiền tố, công cụ sẽ nhận biết định dạng từ chữ ký tệp (PNG, JPG, GIF, WebP).' },
      { q: 'Vì sao tôi gặp lỗi?', a: 'Có thể chuỗi bị cắt cụt, chứa ký tự thừa hoặc không phải là ảnh. Dữ liệu SVG cũng bị từ chối ở đây vì lý do an toàn.' },
    ],
    limits: [
      'Hỗ trợ PNG, JPG, GIF và WebP. SVG cố ý không được hiển thị.',
      'Tối đa 10 MB dữ liệu đã giải mã.',
    ],
  },
  'image-color-picker': {
    name: 'Chọn màu từ ảnh',
    description: 'Chọn màu chính xác từ bất kỳ ảnh nào và trích xuất bảng màu chủ đạo.',
    metaDescription: 'Chọn màu từ ảnh trực tuyến miễn phí. Nhấp vào bất kỳ điểm ảnh nào để lấy giá trị HEX, RGB và HSL và trích xuất bảng màu chủ đạo.',
    steps: [
      'Thêm một ảnh.',
      'Nhấp hoặc chạm vào bất kỳ đâu trên ảnh (hoặc dùng phím mũi tên) để lấy mẫu một điểm ảnh.',
      'Sao chép giá trị HEX, RGB hoặc HSL, hoặc sao chép từ bảng màu đã trích xuất.',
    ],
    faq: [
      { q: 'Bảng màu được tính như thế nào?', a: 'Ảnh được giảm mẫu và các màu của nó được gom vào các nhóm; những nhóm phổ biến nhất sẽ được hiển thị. Đây là phép xấp xỉ các màu chủ đạo, không phải danh sách đầy đủ.' },
    ],
    limits: [
      'Mỗi lần một ảnh.',
      'Màu được lấy mẫu từ các điểm ảnh sRGB đang hiển thị; hồ sơ màu bị bỏ qua.',
    ],
  },
  'image-watermark': {
    name: 'Thêm hình mờ vào ảnh',
    description: 'Thêm hình mờ dạng chữ hoặc logo vào nhiều ảnh cùng lúc, đơn lẻ hoặc lặp thành lưới.',
    metaDescription: 'Thêm hình mờ vào ảnh trực tuyến miễn phí. Đóng chữ hoặc logo lên ảnh JPG, PNG và WebP hàng loạt, với độ mờ và vị trí tùy chỉnh. Chạy trong trình duyệt của bạn.',
    steps: [
      'Thêm ảnh của bạn.',
      'Chọn chữ hoặc logo, sau đó đặt kích thước, độ mờ, vị trí và cách bố trí.',
      'Áp dụng và tải kết quả hoặc tệp ZIP về.',
    ],
    faq: [
      { q: 'Tôi có thể dùng tiếng Urdu hoặc các bảng chữ cái khác không?', a: 'Có. Hình mờ trên ảnh dùng phông chữ của thiết bị bạn, nên mọi hệ chữ mà hệ thống của bạn hiển thị được đều dùng được.' },
      { q: 'Nó có thay đổi ảnh gốc của tôi không?', a: 'Không. Các bản sao đã đóng dấu được lưu thành tệp mới.' },
      { q: 'EXIF hoặc dữ liệu vị trí có được giữ lại không?', a: 'Không. Mã hóa lại qua canvas sẽ loại bỏ siêu dữ liệu EXIF như kiểu máy ảnh và vị trí GPS, thường đúng là điều bạn muốn trước khi chia sẻ ảnh. Hồ sơ màu cũng không được giữ lại.' },
    ],
    limits: [
      'Tệp GIF hoặc WebP động chỉ được chuyển đổi bằng khung hình đầu tiên.',
      'Tối đa 25 MB mỗi tệp và 20 tệp mỗi lượt, để trình duyệt của bạn luôn hoạt động mượt.',
      'Siêu dữ liệu EXIF và hồ sơ màu nhúng không được giữ lại.',
      'Tệp logo: PNG, JPG hoặc WebP, tối đa 25 MB.',
    ],
  },
  'svg-converter': {
    name: 'SVG sang PNG / JPG',
    description: 'Chuyển đồ họa vector SVG thành ảnh PNG, JPG hoặc WebP ở bất kỳ kích thước nào.',
    metaDescription: 'Chuyển SVG sang PNG hoặc JPG trực tuyến miễn phí. Chọn tỷ lệ hoặc chiều rộng chính xác để có ảnh sắc nét; PNG giữ độ trong suốt. Chạy trong trình duyệt của bạn.',
    steps: [
      'Thêm các tệp SVG của bạn.',
      'Chọn PNG, JPG hoặc WebP và kích thước đầu ra.',
      'Chuyển đổi và tải về.',
    ],
    faq: [
      { q: 'Ảnh có giữ được độ sắc nét ở kích thước lớn không?', a: 'Có. SVG được vẽ ở đúng kích thước bạn chọn, nên bản xuất 4× sắc nét như bản 1×.' },
      { q: 'Vì sao SVG của tôi trông khác?', a: 'Trình duyệt không hỗ trợ mọi tính năng của SVG, và các SVG dựa vào phông chữ hoặc ảnh bên ngoài sẽ dùng giá trị mặc định. Hãy nhúng phông chữ và ảnh vào bên trong SVG để có kết quả tốt nhất.' },
      { q: 'Mở tệp SVG ở đây có an toàn không?', a: 'Có. SVG được vẽ như một bức ảnh, nên các tập lệnh bên trong nó không chạy.' },
    ],
    limits: [
      'Tối đa 25 MB mỗi tệp và 20 tệp mỗi lượt.',
      'Phông chữ, ảnh và kiểu dáng được liên kết từ bên ngoài SVG sẽ không được tải.',
      'SVG không có kích thước sẽ dùng viewBox của nó, hoặc 300 × 150 px nếu cả hai đều không được đặt.',
    ],
  },
  'enlarge-image': {
    name: 'Phóng to ảnh',
    description: 'Làm ảnh lớn hơn với phép lấy mẫu lại mượt và sắc nét, từ 2× đến 4× hoặc theo chiều rộng đã đặt.',
    metaDescription: 'Phóng to ảnh trực tuyến miễn phí. Phóng ảnh JPG, PNG và WebP lên 2×, 3×, 4× hoặc theo chiều rộng chính xác bằng lấy mẫu lại Lanczos và làm sắc nét tùy chọn.',
    steps: [
      'Thêm ảnh của bạn.',
      'Chọn hệ số hoặc chiều rộng mục tiêu, và có làm sắc nét hay không.',
      'Phóng to và tải về.',
    ],
    faq: [
      { q: 'Đây có phải là nâng cấp độ phân giải bằng AI không?', a: 'Không. Công cụ dùng phép lấy mẫu lại chất lượng cao, giúp ảnh phóng to mượt và sạch nhưng không thể tạo ra chi tiết còn thiếu. Ảnh rất nhỏ hoặc bị mờ vẫn sẽ trông mềm.' },
      { q: 'Kết quả có thể lớn đến mức nào?', a: 'Tối đa 16.000 px mỗi cạnh và khoảng 100 megapixel, tùy vào khả năng của trình duyệt.' },
      { q: 'EXIF hoặc dữ liệu vị trí có được giữ lại không?', a: 'Không. Mã hóa lại qua canvas sẽ loại bỏ siêu dữ liệu EXIF như kiểu máy ảnh và vị trí GPS, thường đúng là điều bạn muốn trước khi chia sẻ ảnh. Hồ sơ màu cũng không được giữ lại.' },
    ],
    limits: [
      'Tệp GIF hoặc WebP động chỉ được chuyển đổi bằng khung hình đầu tiên.',
      'Tối đa 25 MB mỗi tệp và 20 tệp mỗi lượt, để trình duyệt của bạn luôn hoạt động mượt.',
      'Siêu dữ liệu EXIF và hồ sơ màu nhúng không được giữ lại.',
      'Công cụ không thêm chi tiết, nên không phải nâng cấp bằng AI.',
      'Đầu ra bị giới hạn ở 16.000 px mỗi cạnh.',
    ],
  },
  'blur-image-area': {
    name: 'Làm mờ hoặc pixel hóa vùng ảnh',
    description: 'Che khuôn mặt, biển số hoặc chi tiết riêng tư bằng cách làm mờ, pixel hóa hoặc phủ kín các vùng.',
    metaDescription: 'Làm mờ hoặc pixel hóa một phần ảnh trực tuyến miễn phí. Vẽ khung lên khuôn mặt, biển số hoặc chữ để che chúng, ngay trong trình duyệt của bạn.',
    steps: [
      'Thêm một ảnh.',
      'Kéo trên ảnh để vẽ các khung lên phần bạn muốn che.',
      'Chọn làm mờ, pixel hóa hoặc ô đen, áp dụng và tải về.',
    ],
    faq: [
      { q: 'Làm mờ có an toàn cho các chi tiết nhạy cảm không?', a: 'Với bất cứ thứ gì phải được giữ kín, như số giấy tờ tùy thân hoặc biển số xe, hãy dùng ô đen. Làm mờ và pixel hóa đôi khi có thể bị khôi phục một phần.' },
      { q: 'Nó có tự động tìm khuôn mặt không?', a: 'Không. Bạn tự vẽ các khung. Nhận diện tự động cần một mô hình AI lớn không có sẵn trong công cụ.' },
      { q: 'Tôi có thể đổi ý không?', a: 'Có. Hãy xóa hoặc vẽ lại các khung trước khi áp dụng. Tệp gốc của bạn không bao giờ bị thay đổi.' },
      { q: 'EXIF hoặc dữ liệu vị trí có được giữ lại không?', a: 'Không. Mã hóa lại qua canvas sẽ loại bỏ siêu dữ liệu EXIF như kiểu máy ảnh và vị trí GPS, thường đúng là điều bạn muốn trước khi chia sẻ ảnh. Hồ sơ màu cũng không được giữ lại.' },
    ],
    limits: [
      'Mỗi lần một ảnh, tối đa 25 MB.',
      'Các vùng được chọn thủ công; không có tính năng nhận diện khuôn mặt.',
      'Ảnh động dùng khung hình đầu tiên.',
    ],
  },
  'qr-code-scanner': {
    name: 'Quét mã QR',
    description: 'Đọc mã QR từ ảnh chụp và ảnh màn hình và xem chính xác chúng chứa gì.',
    metaDescription: 'Quét mã QR từ ảnh trực tuyến miễn phí. Tải lên ảnh chụp hoặc ảnh màn hình để đọc liên kết, văn bản hoặc thông tin Wi-Fi. Chạy trong trình duyệt của bạn.',
    steps: [
      'Thêm một hoặc nhiều ảnh có chứa mã QR.',
      'Mã được đọc tự động.',
      'Sao chép kết quả, hoặc mở liên kết sau khi đã kiểm tra.',
    ],
    faq: [
      { q: 'Tôi có thể quét bằng camera không?', a: 'Chưa. Công cụ này đọc mã QR từ các tệp ảnh. Trên điện thoại, hãy chụp ảnh mã rồi chọn nó ở đây, hoặc dùng ứng dụng camera của bạn.' },
      { q: 'Mở các liên kết đã quét có an toàn không?', a: 'Hãy kiểm tra địa chỉ trước. Liên kết đầy đủ được hiển thị, và chỉ các liên kết web (http hoặc https) mới có thể mở từ đây. Liên kết tập lệnh và dữ liệu không bao giờ được mở.' },
      { q: 'Vì sao không tìm thấy mã?', a: 'Mã có thể bị mờ, bị cắt, quá nhỏ hoặc độ tương phản thấp. Hãy thử một ảnh nét hơn, gần hơn, thể hiện đầy đủ mã với lề rõ ràng xung quanh.' },
    ],
    limits: [
      'Tối đa 10 ảnh, mỗi ảnh 25 MB.',
      'Mỗi ảnh đọc một mã.',
      'Chỉ hỗ trợ mã QR tiêu chuẩn; các loại mã vạch khác không được hỗ trợ.',
    ],
  },
  'gif-maker': {
    name: 'Tạo GIF',
    description: 'Biến các bức ảnh của bạn thành ảnh GIF động với thời gian, kích thước và số lần lặp tùy chỉnh.',
    metaDescription: 'Tạo ảnh GIF động từ hình ảnh trực tuyến miễn phí. Sắp xếp lại khung hình, đặt thời gian mỗi khung, chọn kích thước và lặp, rồi tải GIF về. Tạo trong trình duyệt của bạn.',
    steps: [
      'Thêm hai hoặc nhiều ảnh (hoặc chỉ một ảnh để tạo GIF tĩnh).',
      'Kéo để sắp xếp thứ tự, đặt thời gian hiển thị mỗi khung hình, và chọn kích thước, vòng lặp và màu sắc.',
      'Tạo GIF, xem trước và tải về.',
    ],
    faq: [
      { q: 'Vì sao GIF của tôi lớn như vậy?', a: 'GIF lưu mỗi khung hình dưới dạng một bức ảnh giới hạn ở 256 màu. Ít khung hình hơn, chiều rộng nhỏ hơn và ít màu hơn đều làm tệp nhỏ đi. Công cụ hiển thị dung lượng ngay khi GIF được tạo.' },
      { q: 'Tôi có thể giữ các vùng trong suốt không?', a: 'Có, hãy bật "Giữ vùng trong suốt" cho ảnh PNG hoặc WebP có độ trong suốt. Độ trong suốt của GIF chỉ có bật hoặc tắt cho từng điểm ảnh, nên các cạnh mềm sẽ trở nên cứng.' },
    ],
    limits: [
      'Tối đa 100 khung hình; khung hình càng lớn, trình duyệt của bạn càng cần nhiều bộ nhớ.',
      'GIF giới hạn ở 256 màu mỗi khung hình, nên ảnh chụp có thể trông bị hạt.',
      'Đầu vào là ảnh động (GIF, WebP) chỉ đóng góp khung hình đầu tiên.',
    ],
  },
  'photo-editor': {
    name: 'Chỉnh sửa ảnh',
    description: 'Điều chỉnh, thêm bộ lọc, xoay, cắt và thêm chữ vào ảnh, với bản xem trước trực tiếp.',
    metaDescription: 'Trình chỉnh sửa ảnh trực tuyến miễn phí. Chỉnh màu, thêm bộ lọc, xoay, căn thẳng, cắt và thêm chữ, rồi tải về PNG, JPG hoặc WebP. Riêng tư, ngay trong trình duyệt.',
    steps: [
      'Thêm một ảnh.',
      'Dùng các tab để chỉnh màu, thêm bộ lọc, xoay hoặc cắt, và thêm chữ. Bản xem trước cập nhật ngay khi bạn làm.',
      'Chọn định dạng và tải ảnh đã chỉnh sửa về.',
    ],
    faq: [
      { q: 'Tệp gốc có bị thay đổi không?', a: 'Không. Tệp của bạn không bao giờ bị sửa; ảnh đã chỉnh sửa được tạo thành một bản tải xuống mới.' },
      { q: 'Xuất ảnh có làm mất chất lượng không?', a: 'PNG giữ nguyên mọi điểm ảnh. JPG và WebP nén mất dữ liệu; hãy dùng chất lượng từ 90 trở lên để ảnh trông như cũ. Các chỉnh sửa được áp dụng ở kích thước đầy đủ của ảnh, không phải kích thước xem trước.' },
    ],
    limits: [
      'Mỗi lần một ảnh, tối đa 25 MB và khoảng 50 megapixel.',
      'Các chỉnh sửa được áp dụng theo thứ tự cố định: xoay và cắt, chỉnh màu, làm mờ và làm nét, hiệu ứng tối góc, rồi đến chữ.',
      'Thông tin EXIF như vị trí không được sao chép sang ảnh đã chỉnh sửa.',
      'Không có lớp, cọ vẽ hay tính năng AI.',
    ],
  },
  'jpg-to-pdf': {
    name: 'JPG sang PDF',
    description: 'Chuyển ảnh JPG thành PDF, mỗi ảnh một trang.',
    metaDescription: 'Chuyển JPG sang PDF trực tuyến miễn phí. Chọn khổ giấy, hướng giấy và lề. Dữ liệu JPEG được nhúng mà không nén lại.',
    steps: [
      'Thêm các tệp JPG của bạn và kéo hoặc dùng các mũi tên để đặt thứ tự.',
      'Chọn khổ giấy, hướng giấy và lề.',
      'Tạo PDF và tải về.',
    ],
    faq: [
      { q: 'Chất lượng ảnh có giảm không?', a: 'Không. Các tệp JPG được nhúng vào PDF nguyên trạng, không nén lại.' },
    ],
    limits: [
      'Tối đa 25 MB mỗi ảnh và 100 ảnh mỗi PDF.',
      'Ở đây chỉ nhận ảnh JPG; hãy dùng Ảnh sang PDF cho nhiều định dạng.',
    ],
  },
  'png-to-pdf': {
    name: 'PNG sang PDF',
    description: 'Chuyển ảnh PNG thành PDF và giữ độ trong suốt.',
    metaDescription: 'Chuyển PNG sang PDF trực tuyến miễn phí. Chọn khổ giấy và lề; độ trong suốt được giữ nguyên. Chạy trong trình duyệt của bạn.',
    steps: [
      'Thêm các tệp PNG của bạn và đặt thứ tự.',
      'Chọn khổ giấy, hướng giấy và lề.',
      'Tạo PDF và tải về.',
    ],
    faq: [
      { q: 'Độ trong suốt có được giữ lại không?', a: 'Có. Ảnh PNG được nhúng cùng kênh alpha, nên các vùng trong suốt hiển thị nền trang màu trắng phía sau.' },
    ],
    limits: [
      'Tối đa 25 MB mỗi ảnh và 100 ảnh mỗi PDF.',
      'Ở đây chỉ nhận ảnh PNG; hãy dùng Ảnh sang PDF cho nhiều định dạng.',
    ],
  },
  'images-to-pdf': {
    name: 'Ảnh sang PDF',
    description: 'Kết hợp ảnh JPG và PNG thành một PDF duy nhất theo thứ tự bạn chọn.',
    metaDescription: 'Kết hợp nhiều ảnh thành một PDF trực tuyến miễn phí. Sắp xếp lại các trang, chọn khổ giấy và lề. Xử lý trong trình duyệt của bạn.',
    steps: [
      'Thêm ảnh JPG và PNG (thả nhiều ảnh cùng lúc).',
      'Sắp xếp lại chúng, và chọn khổ giấy, hướng giấy và lề.',
      'Tạo PDF và tải về.',
    ],
    faq: [
      { q: 'Những định dạng ảnh nào dùng được?', a: 'JPG và PNG được nhúng trực tiếp. WebP, GIF và BMP được chuyển sang PNG trước nếu trình duyệt của bạn giải mã được.' },
      { q: '"Vừa với ảnh" có tác dụng gì?', a: 'Mỗi trang có kích thước bằng ảnh của nó, nên không có gì bị thu phóng hay thêm viền. Chọn A4 hoặc Letter cho trang tài liệu tiêu chuẩn.' },
    ],
    limits: [
      'Tối đa 25 MB mỗi ảnh và 100 ảnh mỗi PDF.',
    ],
  },
  'merge-pdf': {
    name: 'Gộp PDF',
    description: 'Kết hợp nhiều tệp PDF thành một tài liệu theo thứ tự bạn chọn.',
    metaDescription: 'Gộp tệp PDF trực tuyến miễn phí. Kết hợp nhiều PDF thành một, sắp xếp lại thứ tự và tải về ngay. Xử lý trong trình duyệt của bạn.',
    steps: [
      'Thêm hai hoặc nhiều tệp PDF.',
      'Đặt chúng theo thứ tự bạn muốn bằng các mũi tên.',
      'Gộp và tải PDF đã kết hợp về.',
    ],
    faq: [
      { q: 'Dấu trang và trường biểu mẫu có được giữ lại không?', a: 'Các trang được sao chép cùng nội dung hiển thị và liên kết. Dấu trang ở cấp tài liệu và dữ liệu biểu mẫu tương tác không được chuyển sang.' },
      { q: 'Công cụ có mở được PDF có mật khẩu không?', a: 'Không. PDF được mã hóa sẽ được phát hiện và từ chối kèm thông báo rõ ràng. Hãy xóa mật khẩu trước bằng công cụ Mở khóa PDF của chúng tôi.' },
    ],
    limits: [
      'Tối đa 100 MB mỗi PDF.',
      'Không hỗ trợ PDF được bảo vệ bằng mật khẩu (đã mã hóa).',
      'PDF rất lớn hoặc phức tạp phụ thuộc vào bộ nhớ thiết bị của bạn.',
      'Dấu trang/mục lục và trường biểu mẫu của các tệp nguồn không được gộp.',
    ],
  },
  'split-pdf': {
    name: 'Tách PDF',
    description: 'Tách PDF theo phạm vi trang, thành từng trang đơn, hoặc thành các phần có kích thước cố định.',
    metaDescription: 'Tách PDF trực tuyến miễn phí. Tách theo phạm vi trang, từng trang, hoặc mỗi N trang và tải về dưới dạng ZIP. Chạy trong trình duyệt của bạn.',
    steps: [
      'Thêm một PDF.',
      'Chọn cách tách: phạm vi tùy chỉnh như 1-3, 4-6, từng trang, hoặc mỗi N trang.',
      'Tách và tải từng phần về, hoặc tải dưới dạng ZIP.',
    ],
    faq: [
      { q: 'Tôi viết phạm vi trang như thế nào?', a: 'Phân tách các tệp đầu ra bằng dấu phẩy. Mỗi tệp có thể là một phạm vi (1-3), một trang đơn (5), hoặc kết hợp phân tách bằng dấu cộng (1-2+7). Ví dụ: 1-3, 4-6, 7+9.' },
      { q: 'Công cụ có mở được PDF có mật khẩu không?', a: 'Không. PDF được mã hóa sẽ được phát hiện và từ chối kèm thông báo rõ ràng. Hãy xóa mật khẩu trước bằng công cụ Mở khóa PDF của chúng tôi.' },
    ],
    limits: [
      'Tối đa 100 MB mỗi PDF.',
      'Không hỗ trợ PDF được bảo vệ bằng mật khẩu (đã mã hóa).',
      'PDF rất lớn hoặc phức tạp phụ thuộc vào bộ nhớ thiết bị của bạn.',
    ],
  },
  'rotate-pdf': {
    name: 'Xoay PDF',
    description: 'Xoay từng trang hoặc cả PDF, với bản xem trước dạng hình thu nhỏ.',
    metaDescription: 'Xoay trang PDF trực tuyến miễn phí. Xoay một trang hoặc tất cả các trang 90, 180 hoặc 270 độ và lưu thành PDF mới. Chạy trong trình duyệt của bạn.',
    steps: [
      'Thêm một PDF; các trang của nó xuất hiện dưới dạng hình thu nhỏ.',
      'Xoay từng trang, hoặc xoay tất cả cùng lúc.',
      'Lưu PDF đã xoay.',
    ],
    faq: [
      { q: 'Việc xoay có vĩnh viễn không?', a: 'Nó được lưu trong PDF mới dưới dạng thuộc tính xoay trang. Nội dung trang không bị vẽ lại, nên không có gì bị mất.' },
      { q: 'Công cụ có mở được PDF có mật khẩu không?', a: 'Không. PDF được mã hóa sẽ được phát hiện và từ chối kèm thông báo rõ ràng. Hãy xóa mật khẩu trước bằng công cụ Mở khóa PDF của chúng tôi.' },
    ],
    limits: [
      'Tối đa 100 MB mỗi PDF.',
      'Không hỗ trợ PDF được bảo vệ bằng mật khẩu (đã mã hóa).',
      'PDF rất lớn hoặc phức tạp phụ thuộc vào bộ nhớ thiết bị của bạn.',
    ],
  },
  'extract-pdf-pages': {
    name: 'Trích xuất trang PDF',
    description: 'Chọn các trang bạn cần từ một PDF và lưu chúng thành tài liệu mới.',
    metaDescription: 'Trích xuất trang từ PDF trực tuyến miễn phí. Chọn trang trực quan hoặc theo phạm vi và lưu thành PDF mới. Xử lý trong trình duyệt của bạn.',
    steps: [
      'Thêm một PDF.',
      'Nhấp vào hình thu nhỏ của trang để chọn, hoặc nhập một phạm vi như 1-3, 8.',
      'Trích xuất và tải PDF mới về.',
    ],
    faq: [
      { q: 'Tôi có thể dùng công cụ này để xóa trang không?', a: 'Có. Hãy chọn các trang bạn muốn giữ và trích xuất chúng; những trang còn lại sẽ không có trong tệp mới.' },
      { q: 'Công cụ có mở được PDF có mật khẩu không?', a: 'Không. PDF được mã hóa sẽ được phát hiện và từ chối kèm thông báo rõ ràng. Hãy xóa mật khẩu trước bằng công cụ Mở khóa PDF của chúng tôi.' },
    ],
    limits: [
      'Tối đa 100 MB mỗi PDF.',
      'Không hỗ trợ PDF được bảo vệ bằng mật khẩu (đã mã hóa).',
      'PDF rất lớn hoặc phức tạp phụ thuộc vào bộ nhớ thiết bị của bạn.',
    ],
  },
  'reorder-pdf-pages': {
    name: 'Sắp xếp lại trang PDF',
    description: 'Sắp xếp lại, xóa và xoay các trang một cách trực quan, rồi lưu kết quả.',
    metaDescription: 'Sắp xếp lại trang PDF trực tuyến miễn phí. Kéo hoặc di chuyển trang, xóa các trang không cần và lưu thành PDF mới. Chạy trong trình duyệt của bạn.',
    steps: [
      'Thêm một PDF; các trang của nó xuất hiện dưới dạng hình thu nhỏ.',
      'Kéo các trang, hoặc dùng các nút mũi tên, để thay đổi thứ tự. Xóa các trang bạn không cần.',
      'Lưu PDF đã sắp xếp lại.',
    ],
    faq: [
      { q: 'Tôi có thể sắp xếp lại bằng bàn phím không?', a: 'Có. Hãy dùng các nút di chuyển lên trước và xuống sau trên mỗi trang.' },
      { q: 'Công cụ có mở được PDF có mật khẩu không?', a: 'Không. PDF được mã hóa sẽ được phát hiện và từ chối kèm thông báo rõ ràng. Hãy xóa mật khẩu trước bằng công cụ Mở khóa PDF của chúng tôi.' },
    ],
    limits: [
      'Tối đa 100 MB mỗi PDF.',
      'Không hỗ trợ PDF được bảo vệ bằng mật khẩu (đã mã hóa).',
      'PDF rất lớn hoặc phức tạp phụ thuộc vào bộ nhớ thiết bị của bạn.',
    ],
  },
  'pdf-to-jpg': {
    name: 'PDF sang JPG',
    description: 'Kết xuất các trang PDF thành ảnh JPG ở độ phân giải bạn chọn.',
    metaDescription: 'Chuyển PDF sang JPG trực tuyến miễn phí. Kết xuất mọi trang hoặc các trang đã chọn ở tối đa 300 DPI và tải về tệp ZIP. Chạy trong trình duyệt của bạn.',
    steps: [
      'Thêm một PDF.',
      'Chọn độ phân giải và, nếu muốn, những trang cần chuyển đổi.',
      'Chuyển đổi và tải từng ảnh về, hoặc tải dưới dạng ZIP.',
    ],
    faq: [
      { q: 'Tôi nên chọn độ phân giải nào?', a: '150 DPI phù hợp cho màn hình; 300 DPI cho in ấn. Giá trị cao hơn tạo ra ảnh lớn hơn và cần nhiều bộ nhớ hơn.' },
      { q: 'Các trang có được kết xuất chính xác không?', a: 'Việc kết xuất dùng PDF.js của Mozilla, xử lý tốt hầu hết các PDF. Phông chữ lạ hoặc đồ họa nâng cao có thể hơi khác so với các trình xem khác.' },
      { q: 'Công cụ có mở được PDF có mật khẩu không?', a: 'Không. PDF được mã hóa sẽ được phát hiện và từ chối kèm thông báo rõ ràng. Hãy xóa mật khẩu trước bằng công cụ Mở khóa PDF của chúng tôi.' },
    ],
    limits: [
      'Tối đa 100 MB mỗi PDF.',
      'Không hỗ trợ PDF được bảo vệ bằng mật khẩu (đã mã hóa).',
      'PDF rất lớn hoặc phức tạp phụ thuộc vào bộ nhớ thiết bị của bạn.',
      'Mỗi trang bị giới hạn ở khoảng 50 megapixel.',
    ],
  },
  'pdf-to-png': {
    name: 'PDF sang PNG',
    description: 'Kết xuất các trang PDF thành ảnh PNG sắc nét, không mất chất lượng.',
    metaDescription: 'Chuyển PDF sang PNG trực tuyến miễn phí. Kết xuất các trang ở tối đa 300 DPI thành ảnh không mất chất lượng và tải về tệp ZIP. Chạy trong trình duyệt của bạn.',
    steps: [
      'Thêm một PDF.',
      'Chọn độ phân giải và các trang.',
      'Chuyển đổi và tải từng ảnh về, hoặc tải dưới dạng ZIP.',
    ],
    faq: [
      { q: 'Vì sao nên chọn PNG thay vì JPG?', a: 'PNG giữ chữ và nét vẽ sắc nét và hỗ trợ độ trong suốt. Các tệp lớn hơn JPG.' },
      { q: 'Công cụ có mở được PDF có mật khẩu không?', a: 'Không. PDF được mã hóa sẽ được phát hiện và từ chối kèm thông báo rõ ràng. Hãy xóa mật khẩu trước bằng công cụ Mở khóa PDF của chúng tôi.' },
    ],
    limits: [
      'Tối đa 100 MB mỗi PDF.',
      'Không hỗ trợ PDF được bảo vệ bằng mật khẩu (đã mã hóa).',
      'PDF rất lớn hoặc phức tạp phụ thuộc vào bộ nhớ thiết bị của bạn.',
      'Mỗi trang bị giới hạn ở khoảng 50 megapixel.',
    ],
  },
  'pdf-viewer': {
    name: 'Trình xem PDF',
    description: 'Mở và đọc PDF riêng tư trong trình duyệt của bạn, với thu phóng và điều hướng trang.',
    metaDescription: 'Xem tệp PDF trực tuyến miễn phí. Thu phóng, chuyển đến một trang và đọc tài liệu trong trình duyệt mà không cần tải chúng lên đâu cả.',
    steps: [
      'Thêm một PDF.',
      'Cuộn hoặc dùng các nút điều khiển trang để di chuyển.',
      'Phóng to hoặc thu nhỏ khi cần.',
    ],
    faq: [
      { q: 'Tôi có thể chỉnh sửa hoặc chú thích PDF ở đây không?', a: 'Không. Đây là trình xem chỉ đọc. Hãy dùng các công cụ trang để xoay, sắp xếp lại hoặc trích xuất trang.' },
      { q: 'Công cụ có mở được PDF có mật khẩu không?', a: 'Không. PDF được mã hóa sẽ được phát hiện và từ chối kèm thông báo rõ ràng. Hãy xóa mật khẩu trước bằng công cụ Mở khóa PDF của chúng tôi.' },
    ],
    limits: [
      'Tối đa 100 MB mỗi PDF.',
      'Không hỗ trợ PDF được bảo vệ bằng mật khẩu (đã mã hóa).',
      'PDF rất lớn hoặc phức tạp phụ thuộc vào bộ nhớ thiết bị của bạn.',
      'Chỉ đọc: không có chú thích, điền biểu mẫu hay tìm kiếm văn bản.',
    ],
  },
  'pdf-metadata-viewer': {
    name: 'Xem siêu dữ liệu PDF',
    description: 'Kiểm tra tiêu đề, tác giả, ngày tạo, số trang, kích thước trang và phiên bản của PDF.',
    metaDescription: 'Xem siêu dữ liệu PDF trực tuyến miễn phí. Xem tiêu đề, tác giả, phần mềm tạo, ngày tháng, số trang và kích thước trang mà không cần tải tệp lên.',
    steps: [
      'Thêm một PDF.',
      'Xem lại các thuộc tính của tài liệu.',
      'Sao chép các chi tiết dưới dạng JSON nếu bạn cần.',
    ],
    faq: [
      { q: 'Vì sao thiếu một số siêu dữ liệu?', a: 'Nhiều PDF không đặt mọi trường. Chỉ những trường thực sự được lưu trong tệp mới được hiển thị.' },
      { q: 'Tôi có thể xóa siêu dữ liệu không?', a: 'Công cụ này chỉ đọc siêu dữ liệu. Nó không sửa đổi tệp.' },
      { q: 'Công cụ có mở được PDF có mật khẩu không?', a: 'Không. PDF được mã hóa sẽ được phát hiện và từ chối kèm thông báo rõ ràng. Hãy xóa mật khẩu trước bằng công cụ Mở khóa PDF của chúng tôi.' },
    ],
    limits: [
      'Tối đa 100 MB mỗi PDF.',
      'Không hỗ trợ PDF được bảo vệ bằng mật khẩu (đã mã hóa).',
      'PDF rất lớn hoặc phức tạp phụ thuộc vào bộ nhớ thiết bị của bạn.',
      'Chỉ đọc: không thể sửa hoặc xóa siêu dữ liệu ở đây.',
    ],
  },
  'remove-pdf-pages': {
    name: 'Xóa trang PDF',
    description: 'Xóa các trang bạn không cần và lưu phần còn lại thành PDF mới.',
    metaDescription: 'Xóa trang khỏi PDF trực tuyến miễn phí. Chọn trang trực quan hoặc theo phạm vi, xóa chúng và tải phần còn lại về. Xử lý trong trình duyệt của bạn.',
    steps: [
      'Thêm một PDF; các trang của nó xuất hiện dưới dạng hình thu nhỏ.',
      'Nhấp vào các trang bạn muốn xóa, hoặc nhập một phạm vi như 2, 5-7.',
      'Xóa chúng và tải PDF mới về.',
    ],
    faq: [
      { q: 'Công cụ có thay đổi tệp gốc của tôi không?', a: 'Không. Bạn nhận được một PDF mới không có các trang đã chọn. Tệp gốc của bạn vẫn như cũ.' },
      { q: 'Tôi có thể xóa mọi trang không?', a: 'Không. Phải giữ lại ít nhất một trang.' },
      { q: 'Công cụ có mở được PDF có mật khẩu không?', a: 'Không. PDF được mã hóa sẽ được phát hiện và từ chối kèm thông báo rõ ràng. Hãy xóa mật khẩu trước bằng công cụ Mở khóa PDF của chúng tôi.' },
    ],
    limits: [
      'Tối đa 100 MB mỗi PDF.',
      'Không hỗ trợ PDF được bảo vệ bằng mật khẩu (đã mã hóa).',
      'PDF rất lớn hoặc phức tạp phụ thuộc vào bộ nhớ thiết bị của bạn.',
    ],
  },
  'add-page-numbers': {
    name: 'Thêm số trang',
    description: 'Đánh số các trang của PDF với vị trí, định dạng và kiểu tùy chọn.',
    metaDescription: 'Thêm số trang vào PDF trực tuyến miễn phí. Chọn vị trí, định dạng như “Trang 1/10”, số bắt đầu và cỡ chữ. Chạy trong trình duyệt của bạn.',
    steps: [
      'Thêm một PDF.',
      'Chọn vị trí đặt số, định dạng và những trang cần đánh số.',
      'Thêm số và tải PDF về.',
    ],
    faq: [
      { q: 'Tôi có thể bỏ qua trang bìa không?', a: 'Có. Đặt “Trang đầu tiên cần đánh số” là 2, rồi chọn số mà nó sẽ hiển thị.' },
      { q: 'Công cụ có hoạt động với các trang bị xoay không?', a: 'Có. Số được đặt theo những gì bạn thấy trên màn hình, kể cả các trang bị xoay.' },
      { q: 'Công cụ dùng phông chữ nào?', a: 'Helvetica, bao gồm chữ số và chữ cái Latin.' },
      { q: 'Công cụ có mở được PDF có mật khẩu không?', a: 'Không. PDF được mã hóa sẽ được phát hiện và từ chối kèm thông báo rõ ràng. Hãy xóa mật khẩu trước bằng công cụ Mở khóa PDF của chúng tôi.' },
    ],
    limits: [
      'Tối đa 100 MB mỗi PDF.',
      'Không hỗ trợ PDF được bảo vệ bằng mật khẩu (đã mã hóa).',
      'PDF rất lớn hoặc phức tạp phụ thuộc vào bộ nhớ thiết bị của bạn.',
      'Số được vẽ lên trên mỗi trang, không bao giờ nằm phía sau nội dung hiện có.',
      'Dùng phông chữ Helvetica tích hợp sẵn.',
    ],
  },
  'watermark-pdf': {
    name: 'Thêm hình mờ vào PDF',
    description: 'Đóng chữ hoặc hình ảnh lên các trang PDF của bạn với độ mờ và góc xoay tùy chỉnh.',
    metaDescription: 'Thêm hình mờ vào PDF trực tuyến miễn phí. Đóng chữ hoặc hình ảnh, ở giữa hoặc lặp thành lưới, với độ mờ và góc xoay tùy chỉnh. Xử lý trong trình duyệt của bạn.',
    steps: [
      'Thêm một PDF.',
      'Chọn hình mờ dạng chữ hoặc hình ảnh, sau đó đặt kích thước, độ mờ, góc xoay và cách bố trí.',
      'Áp dụng cho mọi trang hoặc các trang đã chọn, rồi tải về.',
    ],
    faq: [
      { q: 'Hình mờ có thể bị xóa không?', a: 'Nó được vẽ lên trên trang và không phải là tính năng bảo mật. Bất kỳ ai có trình chỉnh sửa PDF đều có thể xóa nó. Để bảo vệ tốt hơn, hãy kết hợp với Bảo vệ PDF.' },
      { q: 'Tôi có thể dùng tiếng Urdu, tiếng Ả Rập hoặc các bảng chữ cái khác không?', a: 'Không thể dưới dạng chữ gõ, vì phông chữ tích hợp của PDF chỉ bao gồm chữ cái Latin. Hãy tạo một ảnh PNG trong suốt chứa chữ của bạn và dùng tùy chọn hình ảnh.' },
      { q: 'Hình mờ nằm trước hay sau chữ của trang?', a: 'Ở phía trước. Hãy giảm độ mờ để trang vẫn dễ đọc.' },
      { q: 'Công cụ có mở được PDF có mật khẩu không?', a: 'Không. PDF được mã hóa sẽ được phát hiện và từ chối kèm thông báo rõ ràng. Hãy xóa mật khẩu trước bằng công cụ Mở khóa PDF của chúng tôi.' },
    ],
    limits: [
      'Tối đa 100 MB mỗi PDF.',
      'Không hỗ trợ PDF được bảo vệ bằng mật khẩu (đã mã hóa).',
      'PDF rất lớn hoặc phức tạp phụ thuộc vào bộ nhớ thiết bị của bạn.',
      'Hình mờ dạng chữ chỉ hỗ trợ chữ cái Latin, chữ số và các ký hiệu thông dụng.',
      'Hình ảnh hình mờ: PNG hoặc JPG, tối đa 5 MB.',
      'Dấu được vẽ lên trên nội dung trang hiện có.',
    ],
  },
  'crop-pdf': {
    name: 'Cắt PDF',
    description: 'Cắt bớt lề hoặc giữ lại một vùng đã chọn trên mọi trang, với bản xem trước trang trực tiếp.',
    metaDescription: 'Cắt trang PDF trực tuyến miễn phí. Kéo khung cắt trên bản xem trước hoặc nhập giá trị lề, rồi áp dụng cho tất cả hoặc các trang đã chọn. Chạy trong trình duyệt của bạn.',
    steps: [
      'Thêm một PDF và chọn một trang để xem trước.',
      'Kéo khung hoặc nhập giá trị lề để chọn vùng cần giữ.',
      'Chọn những trang cần cắt, rồi tải về.',
    ],
    faq: [
      { q: 'Nội dung bị cắt đi có bị xóa không?', a: 'Không. Việc cắt chỉ thay đổi vùng hiển thị của mỗi trang, còn nội dung bên ngoài vẫn nằm trong tệp. Đừng dựa vào việc cắt để che thông tin nhạy cảm.' },
      { q: 'Nếu các trang của tôi có kích thước khác nhau thì sao?', a: 'Cùng một tỷ lệ được áp dụng cho mọi trang bạn chọn, nên các trang có kích thước khác nhau được cắt bớt cùng một phần trăm.' },
      { q: 'Công cụ có mở được PDF có mật khẩu không?', a: 'Không. PDF được mã hóa sẽ được phát hiện và từ chối kèm thông báo rõ ràng. Hãy xóa mật khẩu trước bằng công cụ Mở khóa PDF của chúng tôi.' },
    ],
    limits: [
      'Tối đa 100 MB mỗi PDF.',
      'Không hỗ trợ PDF được bảo vệ bằng mật khẩu (đã mã hóa).',
      'PDF rất lớn hoặc phức tạp phụ thuộc vào bộ nhớ thiết bị của bạn.',
      'Việc cắt chỉ ẩn nội dung; nó không xóa nội dung.',
      'Vùng cắt là một tỷ lệ của mỗi trang, không phải kích thước cố định tính bằng milimét.',
    ],
  },
  'edit-pdf-metadata': {
    name: 'Sửa siêu dữ liệu PDF',
    description: 'Thay đổi tiêu đề, tác giả, chủ đề và từ khóa của PDF, hoặc xóa toàn bộ siêu dữ liệu.',
    metaDescription: 'Sửa siêu dữ liệu PDF trực tuyến miễn phí. Thay đổi tiêu đề, tác giả, chủ đề và từ khóa, hoặc xóa toàn bộ thuộc tính tài liệu. Xử lý trong trình duyệt của bạn.',
    steps: [
      'Thêm một PDF; các thuộc tính hiện tại của nó được điền sẵn.',
      'Sửa các trường, hoặc chọn Xóa toàn bộ siêu dữ liệu.',
      'Lưu và tải PDF đã cập nhật về.',
    ],
    faq: [
      { q: '“Xóa toàn bộ siêu dữ liệu” xóa những gì?', a: 'Thông tin tài liệu (tiêu đề, tác giả, chủ đề, từ khóa, phần mềm tạo, phần mềm xuất và ngày tháng) cùng siêu dữ liệu XMP nhúng. Nó không động đến văn bản trang, hình ảnh hay ghi chú.' },
      { q: 'Vì sao nên sửa siêu dữ liệu?', a: 'Để sửa tiêu đề sai hiển thị trên tab trình duyệt và kết quả tìm kiếm, ghi đúng tên tác giả, hoặc loại bỏ thông tin cá nhân trước khi chia sẻ tệp.' },
      { q: 'Công cụ có hỗ trợ văn bản không phải chữ Latin không?', a: 'Có. Tiêu đề và tác giả bằng tiếng Urdu, tiếng Ả Rập, tiếng Trung và các hệ chữ khác được lưu đúng.' },
      { q: 'Công cụ có mở được PDF có mật khẩu không?', a: 'Không. PDF được mã hóa sẽ được phát hiện và từ chối kèm thông báo rõ ràng. Hãy xóa mật khẩu trước bằng công cụ Mở khóa PDF của chúng tôi.' },
    ],
    limits: [
      'Tối đa 100 MB mỗi PDF.',
      'Không hỗ trợ PDF được bảo vệ bằng mật khẩu (đã mã hóa).',
      'PDF rất lớn hoặc phức tạp phụ thuộc vào bộ nhớ thiết bị của bạn.',
      'Chỉ các thuộc tính ở cấp tài liệu được thay đổi. Ghi chú, dữ liệu biểu mẫu và nội dung trang được giữ nguyên.',
    ],
  },
  "protect-pdf": {
    name: "Bảo vệ PDF",
    description: "Khóa PDF bằng mật khẩu với mã hóa AES-256.",
    metaDescription: "Bảo vệ PDF bằng mật khẩu trực tuyến miễn phí. Mã hóa AES-256 diễn ra trong trình duyệt của bạn; tệp và mật khẩu không bao giờ được tải lên.",
    steps: [
      "Thêm một PDF.",
      "Nhập mật khẩu hai lần và chọn điều người đọc được phép làm (in, sao chép, chỉnh sửa).",
      "Bảo vệ và tải xuống bản đã mã hóa.",
    ],
    faq: [
      { q: "Mức bảo vệ mạnh đến đâu?", a: "Tệp được mã hóa bằng AES-256, chuẩn mã hóa PDF mạnh nhất. Trên thực tế, độ an toàn phụ thuộc vào mật khẩu của bạn: hãy dùng mật khẩu dài mà bạn không dùng ở nơi nào khác." },
      { q: "Nếu tôi quên mật khẩu thì sao?", a: "Không thể khôi phục và không có tính năng đặt lại mật khẩu. Hãy cất giữ tệp gốc và mật khẩu ở nơi an toàn." },
      { q: "Các tùy chọn in, sao chép và chỉnh sửa có được thực thi không?", a: "Đó là những yêu cầu mà hầu hết chương trình PDF tôn trọng, nhưng không phải không thể phá vỡ. Chính mật khẩu mới thực sự bảo vệ tệp." },
    ],
    limits: [
      "Tối đa 100 MB mỗi PDF.",
      "Mật khẩu: tối đa 127 ký tự tiêu chuẩn (chữ cái, chữ số và ký hiệu).",
      "PDF đã có mật khẩu phải được mở khóa trước.",
      "Các trình đọc PDF rất cũ (trước khoảng năm 2008) có thể không mở được tệp AES-256.",
    ],
  },
  'unlock-pdf': {
    name: 'Mở khóa PDF',
    description: 'Xóa mật khẩu khỏi PDF mà bạn có quyền truy cập, để mở tự do.',
    metaDescription: 'Mở khóa PDF có mật khẩu trực tuyến miễn phí. Nhập mật khẩu để lưu bản không được bảo vệ, xử lý trong trình duyệt của bạn và không bao giờ tải lên.',
    steps: [
      'Thêm PDF được bảo vệ.',
      'Nhập mật khẩu của nó nếu được yêu cầu. PDF chỉ hạn chế in hoặc sao chép thì không cần.',
      'Tải bản đã mở khóa về.',
    ],
    faq: [
      { q: 'Công cụ có mở khóa được PDF nếu tôi quên mật khẩu không?', a: 'Không. Công cụ này không bao giờ đoán hay bẻ khóa mật khẩu. Nó chỉ gỡ bảo vệ khi bạn cung cấp đúng mật khẩu, hoặc khi tệp chỉ hạn chế các thao tác như in.' },
      { q: 'Việc này có được phép không?', a: 'Chỉ dùng cho các tệp bạn sở hữu hoặc được phép mở. Bạn chịu trách nhiệm về cách sử dụng kết quả.' },
    ],
    limits: [
      'Tối đa 100 MB mỗi PDF.',
      'Hỗ trợ bảo vệ bằng mật khẩu PDF tiêu chuẩn (RC4 và AES).',
      'Chữ ký số sẽ không còn hợp lệ khi tệp được lưu lại.',
      'Không hỗ trợ tệp được bảo vệ bằng chứng chỉ hoặc DRM.',
    ],
  },
  'extract-pdf-text': {
    name: 'Trích xuất văn bản PDF',
    description: 'Sao chép toàn bộ văn bản chọn được từ PDF, từng trang một.',
    metaDescription: 'Trích xuất văn bản từ PDF trực tuyến miễn phí. Lấy văn bản chọn được của mọi trang hoặc một phạm vi, rồi sao chép hoặc lưu thành .txt. Chạy trong trình duyệt của bạn.',
    steps: [
      'Thêm một PDF.',
      'Chọn tất cả các trang hoặc một phạm vi, và có đánh dấu ngắt trang hay không.',
      'Sao chép văn bản hoặc tải về dưới dạng tệp .txt.',
    ],
    faq: [
      { q: 'Vì sao kết quả trống?', a: 'PDF có thể là bản quét, tức là ảnh của chữ chứ không phải văn bản thực. Để đọc nó cần OCR (nhận dạng văn bản), điều mà công cụ này không làm.' },
      { q: 'Bố cục có được giữ lại không?', a: 'Các dòng và đoạn văn được dựng lại tốt nhất có thể, nhưng cột, bảng và chú thích cuối trang có thể xuất hiện theo thứ tự khác.' },
      { q: 'Công cụ có mở được PDF có mật khẩu không?', a: 'Không. PDF được mã hóa sẽ được phát hiện và từ chối kèm thông báo rõ ràng. Hãy xóa mật khẩu trước bằng công cụ Mở khóa PDF của chúng tôi.' },
    ],
    limits: [
      'Tối đa 100 MB mỗi PDF.',
      'Không hỗ trợ PDF được bảo vệ bằng mật khẩu (đã mã hóa).',
      'PDF rất lớn hoặc phức tạp phụ thuộc vào bộ nhớ thiết bị của bạn.',
      'Chỉ trích xuất văn bản thực; các trang quét cần OCR.',
      'Thứ tự đọc theo PDF và có thể khác thứ tự hiển thị trong các bố cục phức tạp.',
    ],
  },
  "compress-pdf": {
    name: "Nén PDF",
    description: "Thu nhỏ PDF bằng cách nén lại các ảnh trong đó, trong khi văn bản vẫn chọn được.",
    metaDescription: "Nén PDF trực tuyến miễn phí. Chọn nén tối đa, khuyến nghị hoặc nhẹ để giảm dung lượng trong khi văn bản vẫn chọn được. Chạy trong trình duyệt của bạn.",
    steps: [
      "Thêm PDF của bạn.",
      "Chọn nén tối đa, khuyến nghị hoặc nhẹ. Văn bản vẫn chọn được; chỉ các ảnh được nén lại.",
      "Nén, kiểm tra dung lượng đã tiết kiệm và tải kết quả xuống.",
    ],
    faq: [
      { q: "Vì sao PDF của tôi gần như không nhỏ đi?", a: "Công cụ nén lại ảnh JPEG, nên hiệu quả nhất với PDF chứa nhiều ảnh chụp hoặc bản quét. PDF chủ yếu là văn bản, hoặc có ảnh vốn đã nhỏ, thì không thể nhỏ đi nhiều. Khi không thể tiết kiệm được gì, công cụ sẽ nói rõ và trả lại tệp gốc cho bạn thay vì một tệp lớn hơn." },
      { q: "Chất lượng có kém đi không?", a: "Ảnh mất một chút chi tiết để đổi lấy dung lượng; nén nhẹ giữ chúng gần như không đổi, còn nén tối đa làm chúng mềm đi rõ rệt. Văn bản và đồ họa vector không bị động đến, nên văn bản vẫn chọn được và tìm kiếm được." },
    ],
    limits: [
      "Chỉ ảnh JPEG nhúng được nén lại. Ảnh kiểu PNG (Flate), phông chữ và nội dung khác được giữ nguyên.",
      "Màu của ảnh được nén lại có thể lệch rất nhẹ.",
      "Tối đa 100 MB mỗi PDF. PDF có mật khẩu phải được mở khóa trước.",
    ],
  },
  'ocr-pdf': {
    name: 'OCR PDF',
    description: 'Nhận dạng văn bản trong PDF quét (tiếng Anh) và nhận về PDF có thể tìm kiếm.',
    metaDescription: 'OCR PDF trực tuyến miễn phí. Nhận dạng văn bản tiếng Anh trong PDF quét và tải về PDF có thể tìm kiếm hoặc văn bản thuần. Bộ máy OCR chạy cục bộ trong trình duyệt của bạn.',
    steps: [
      'Thêm một PDF quét.',
      'Chọn các trang và chất lượng. Có thể bỏ qua các trang đã có văn bản chọn được.',
      'Chạy OCR, xem lại văn bản đã nhận dạng và tải PDF có thể tìm kiếm hoặc tệp văn bản về.',
    ],
    faq: [
      { q: 'Hỗ trợ những ngôn ngữ nào?', a: 'Hiện chỉ có tiếng Anh. Văn bản bằng ngôn ngữ khác sẽ bị đọc sai. Có thể thêm ngôn ngữ sau này mà không thay đổi cách công cụ hoạt động.' },
      { q: 'Độ chính xác ra sao?', a: 'Bản quét sạch, thẳng của văn bản in ở 200 đến 300 DPI cho kết quả tốt nhất. Chữ viết tay, chữ in rất nhỏ, trang có độ tương phản thấp hoặc bị lệch sẽ có nhiều lỗi hơn. Hãy luôn kiểm tra các con số quan trọng.' },
    ],
    limits: [
      'Chỉ có tiếng Anh. Chữ viết tay không được nhận dạng đáng tin cậy.',
      'Các trang gốc được giữ nguyên hoàn toàn; một lớp văn bản vô hình được thêm vào để có thể tìm kiếm và sao chép văn bản.',
      'OCR chậm với tài liệu lớn (vài giây mỗi trang). Lần chạy đầu tiên cũng tải bộ máy (khoảng 3 MB).',
      'Tối đa 100 MB mỗi PDF. Các trang rất lớn có thể bị từ chối để bảo vệ trình duyệt của bạn.',
    ],
  },
  'sign-pdf': {
    name: 'Ký PDF',
    description: 'Vẽ, gõ hoặc tải lên chữ ký và đặt nó lên các trang PDF của bạn.',
    metaDescription: 'Ký PDF trực tuyến miễn phí. Vẽ, gõ hoặc tải lên chữ ký, đặt lên bất kỳ trang nào và tải PDF đã ký về. Chữ ký trực quan, ngay trong trình duyệt của bạn.',
    steps: [
      'Thêm PDF bạn cần ký.',
      'Tạo chữ ký bằng cách vẽ, gõ tên hoặc tải lên một hình ảnh.',
      'Kéo chữ ký đến đúng vị trí trên trang, chọn những trang được ký, rồi tải PDF đã ký về.',
    ],
    faq: [
      { q: 'Đây có phải là chữ ký số có giá trị pháp lý ràng buộc không?', a: 'Đây là chữ ký trực quan: một hình ảnh chữ ký của bạn được đặt lên trang. Nó không phải là chữ ký số mật mã, không kèm chứng chỉ, và không thể chứng minh ai đã ký hay phát hiện các thay đổi về sau. Việc nó có được chấp nhận hay không tùy vào bên yêu cầu. Một số tổ chức yêu cầu dịch vụ chữ ký điện tử được chứng nhận.' },
    ],
    limits: [
      'Chỉ là chữ ký trực quan: không có chứng chỉ, không có dấu thời gian, không phát hiện can thiệp.',
      'Chữ ký được đặt dưới dạng hình ảnh lên trên trang; nó không điền vào trường chữ ký của biểu mẫu.',
      'Tối đa 100 MB mỗi PDF. PDF có mật khẩu phải được mở khóa trước.',
    ],
  },
  "fill-pdf-forms": {
    name: "Điền biểu mẫu PDF",
    description: "Điền vào ô văn bản, hộp kiểm và menu của biểu mẫu PDF, hoặc viết lên bất kỳ PDF nào.",
    metaDescription: "Điền biểu mẫu PDF trực tuyến miễn phí. Nhập vào các trường, đánh dấu hộp kiểm và chọn tùy chọn trong PDF điền được, rồi tải xuống ở dạng chỉnh sửa được hoặc đã làm phẳng. Ngay trong trình duyệt của bạn.",
    steps: [
      "Thêm một biểu mẫu PDF. PDF không có trường có thể viết lên bằng cách nhấp vào trang.",
      "Điền các trường được liệt kê bên dưới tên tệp. Các trường được nhóm theo trang.",
      "Chọn giữ biểu mẫu chỉnh sửa được hay làm phẳng, rồi tải xuống PDF đã điền.",
    ],
    faq: [
      { q: "PDF của tôi không hiện trường nào. Vì sao?", a: "PDF không có trường biểu mẫu thực, ví dụ là một bản quét hoặc biểu mẫu chỉ là hình ảnh. Bạn vẫn có thể nhấp vào trang ở nơi văn bản cần nằm, nhập nó và lưu một bản sao có văn bản đã viết. Các trường của biểu mẫu XFA (một số biểu mẫu của chính phủ và ngân hàng) không thể điền được." },
      { q: "Làm phẳng để làm gì?", a: "Làm phẳng ghi cố định câu trả lời của bạn vào trang và xóa các trường biểu mẫu, nên câu trả lời không thể chỉnh sửa nữa. Hãy dùng cho bản sao bạn gửi đi; giữ lại một bản chỉnh sửa được cho riêng mình." },
    ],
    limits: [
      "Văn bản có thể dùng chữ Latin, chữ số và ký hiệu thông dụng (phông chữ của biểu mẫu không có bảng chữ cái khác).",
      "Trường chữ ký và nút được hiển thị nhưng không thể điền; hãy dùng Ký PDF cho chữ ký.",
      "Biểu mẫu XFA (động): không thể điền các trường, nhưng bạn có thể viết lên các trang.",
      "Văn bản viết lên PDF không có trường được ghi vào trang và sau đó không thể chỉnh sửa.",
      "Tối đa 100 MB mỗi PDF.",
    ],
  },
  'redact-pdf': {
    name: 'Che nội dung PDF',
    description: 'Che kín văn bản và vùng nội dung vĩnh viễn: các trang đã che được dựng lại thành hình ảnh.',
    metaDescription: 'Che nội dung PDF trực tuyến miễn phí. Che kín tên, số và vùng nội dung để văn bản bên dưới thực sự bị loại bỏ, không chỉ bị phủ lên. Chạy trong trình duyệt; không có gì được tải lên.',
    steps: [
      'Thêm PDF của bạn và chọn một trang.',
      'Vẽ khung lên phần cần biến mất, hoặc tìm kiếm từ, email và số để tự động đánh dấu chúng.',
      'Áp dụng việc che và tải về. Luôn kiểm tra kết quả trước khi chia sẻ.',
    ],
    faq: [
      { q: 'Văn bản bị ẩn có thực sự bị loại bỏ không?', a: 'Có. Mỗi trang có phần che được dựng lại thành một bức ảnh với các ô đen đã được vẽ vào, nên văn bản và đối tượng bên dưới không còn tồn tại trong tệp mới. Một hình chữ nhật đen vẽ lên trên văn bản, như nhiều công cụ vẫn làm, sẽ khiến văn bản vẫn chọn được. Các trang bạn không che được sao chép nguyên trạng.' },
      { q: 'Vì sao tôi không thể chọn văn bản trên các trang đã che nữa?', a: 'Vì những trang đó giờ là hình ảnh. Đó là cách nội dung bên dưới bị hủy. Hãy chạy OCR PDF sau đó nếu bạn cần văn bản có thể tìm kiếm; các từ đã che vẫn sẽ đen.' },
      { q: 'Công cụ có tự động tìm mọi kết quả khớp không?', a: 'Tìm kiếm đánh dấu các kết quả nằm trong một dòng văn bản. Một cụm từ bị PDF tách thành nhiều mảnh, hoặc văn bản là một phần của hình ảnh, có thể bị bỏ sót. Hãy xem lại từng trang và vẽ khung thủ công khi cần.' },
    ],
    limits: [
      'Các trang đã che trở thành hình ảnh: không có văn bản chọn được, liên kết hay trường biểu mẫu trên các trang đó.',
      'Tìm kiếm tự động chỉ hoạt động với văn bản chọn được và chỉ trong một đoạn văn bản; các trang quét cần vẽ khung thủ công.',
      'Thuộc tính tài liệu (tiêu đề, tác giả…) bị loại khỏi kết quả trừ khi bạn chọn giữ lại.',
      'Tối đa 100 MB mỗi PDF.',
    ],
  },
  'compare-pdf': {
    name: 'So sánh PDF',
    description: 'Xem điểm khác biệt giữa hai tệp PDF: khác biệt về văn bản và các trang được tô sáng.',
    metaDescription: 'So sánh hai tệp PDF trực tuyến miễn phí. Xem từ được thêm và bị xóa theo từng trang, tô sáng khác biệt trực quan giữa các phiên bản. Xử lý ngay trong trình duyệt.',
    steps: [
      'Thêm tệp PDF gốc và tệp PDF đã chỉnh sửa.',
      'So sánh chúng: các trang được liệt kê kèm số từ được thêm và bị xóa.',
      'Mở một trang để đọc các thay đổi văn bản, hoặc chuyển sang chế độ xem trực quan để thấy các vùng thay đổi màu đỏ.',
    ],
    faq: [
      { q: 'So sánh văn bản hiển thị những gì?', a: 'Với mỗi trang, công cụ hiển thị các từ được thêm (màu xanh lá) và bị xóa (màu đỏ) giữa tài liệu gốc và tài liệu đã chỉnh sửa, còn phần văn bản không đổi được thu gọn. Các trang được ghép theo số trang.' },
      { q: 'Còn các tệp PDF được quét thì sao?', a: 'Bản quét không có văn bản chọn được nên phần so sánh văn bản sẽ không tìm thấy gì. Hãy dùng so sánh trực quan, hoặc chạy OCR PDF cho cả hai tệp trước.' },
    ],
    limits: [
      'Các trang được so sánh theo số trang: nếu có một trang được chèn thêm, các trang sau đó sẽ hiển thị là đã thay đổi.',
      'So sánh trực quan hiển thị mỗi trang ở độ phân giải màn hình; những khác biệt rất nhỏ dưới mức đó có thể không hiện ra.',
      'Tối đa 100 trang mỗi tệp được so sánh. Tệp PDF có mật khẩu phải được mở khóa trước.',
    ],
  },
  'word-counter': {
    name: 'Đếm từ',
    description: 'Đếm từ, ký tự và câu, đồng thời ước tính thời gian đọc ngay khi bạn gõ.',
    metaDescription: 'Công cụ đếm từ trực tuyến miễn phí. Đếm từ, ký tự, câu và đoạn văn, ước tính thời gian đọc và thời gian nói ngay lập tức.',
    steps: [
      'Nhập hoặc dán văn bản của bạn.',
      'Xem thống kê trực tiếp phía trên khung soạn thảo.',
      'Nhấn Xóa để bắt đầu lại.',
    ],
    faq: [
      { q: 'Từ được đếm như thế nào?', a: 'Một từ là một chuỗi ký tự được ngăn cách bởi khoảng trắng. Từ có dấu gạch nối được tính là một từ và các con số cũng được tính là từ.' },
      { q: 'Thời gian đọc được tính như thế nào?', a: 'Thời gian đọc dựa trên 238 từ mỗi phút và thời gian nói dựa trên 150 từ mỗi phút, là mức trung bình thường gặp ở người trưởng thành.' },
    ],
    limits: [
      'Số liệu dựa trên khoảng trắng, nên với các ngôn ngữ viết không có khoảng trắng (như tiếng Trung hoặc tiếng Nhật), mỗi đoạn văn bản liền nhau sẽ được tính là một từ.',
    ],
  },
  'character-counter': {
    name: 'Đếm ký tự',
    description: 'Đếm ký tự có và không có khoảng trắng, đồng thời kiểm tra văn bản theo các giới hạn độ dài phổ biến.',
    metaDescription: 'Công cụ đếm ký tự trực tuyến miễn phí. Đếm ký tự có và không có khoảng trắng, byte và dòng, kiểm tra giới hạn cho bài đăng, thẻ meta và SMS.',
    steps: [
      'Nhập hoặc dán văn bản của bạn.',
      'Xem tổng số và các thanh giới hạn.',
      'Chỉnh sửa văn bản cho đến khi vừa giới hạn.',
    ],
    faq: [
      { q: 'Emoji có được tính là một ký tự không?', a: 'Có. Công cụ đếm các ký tự hiển thị (cụm grapheme), nên một emoji được tính là một ký tự dù nó dùng nhiều byte.' },
      { q: 'Vì sao giới hạn SMS của tôi khác?', a: 'Độ dài SMS phụ thuộc vào bảng mã. Tin nhắn có ký tự không phải Latin hoặc emoji có giới hạn ngắn hơn mức tham chiếu 160 ký tự hiển thị ở đây.' },
    ],
    limits: [
      'Các giới hạn hiển thị chỉ là hướng dẫn phổ biến và thay đổi theo thời gian; hãy xem quy định hiện hành của từng nền tảng.',
    ],
  },
  'case-converter': {
    name: 'Chuyển đổi kiểu chữ',
    description: 'Chuyển văn bản sang chữ hoa, chữ thường, viết hoa đầu từ, đầu câu, camel, snake, kebab và nhiều kiểu khác.',
    metaDescription: 'Công cụ chuyển đổi kiểu chữ trực tuyến miễn phí. Đổi văn bản sang CHỮ HOA, chữ thường, Title Case, Sentence case, camelCase, snake_case, kebab-case và nhiều kiểu khác.',
    steps: [
      'Dán văn bản của bạn.',
      'Chọn kiểu chữ bạn muốn.',
      'Sao chép kết quả đã chuyển đổi.',
    ],
    faq: [
      { q: 'Title Case có xử lý các từ nhỏ không?', a: 'Có. Các từ ngắn như “a”, “of” và “the” giữ nguyên chữ thường, trừ khi chúng đứng đầu hoặc cuối văn bản.' },
    ],
    limits: [
      'Title Case tuân theo quy tắc văn phong tiếng Anh phổ biến và có thể không phù hợp với mọi hướng dẫn văn phong.',
    ],
  },
  'remove-duplicate-lines': {
    name: 'Xóa dòng trùng lặp',
    description: 'Xóa các dòng lặp lại khỏi danh sách và vẫn giữ nguyên thứ tự ban đầu.',
    metaDescription: 'Công cụ xóa dòng trùng lặp trực tuyến miễn phí. Xóa các dòng lặp lại khỏi danh sách, với tùy chọn về hoa/thường, khoảng trắng và dòng trống.',
    steps: [
      'Dán danh sách của bạn, mỗi dòng một mục.',
      'Chọn xem hoa/thường và khoảng trắng có quan trọng hay không.',
      'Sao chép kết quả đã loại bỏ trùng lặp.',
    ],
    faq: [
      { q: 'Bản sao nào của dòng trùng được giữ lại?', a: 'Lần xuất hiện đầu tiên được giữ lại và các lần sau bị xóa, nên thứ tự ban đầu của bạn được bảo toàn.' },
    ],
    limits: [
      'Chỉ hoạt động trên toàn bộ dòng.',
    ],
  },
  'text-sorter': {
    name: 'Sắp xếp văn bản',
    description: 'Sắp xếp các dòng theo bảng chữ cái, theo số, theo độ dài hoặc ngẫu nhiên.',
    metaDescription: 'Công cụ sắp xếp văn bản trực tuyến miễn phí. Sắp xếp dòng A–Z, Z–A, theo số, theo độ dài hoặc xáo trộn, với tùy chọn bỏ qua hoa/thường và thứ tự tự nhiên.',
    steps: [
      'Dán các dòng của bạn.',
      'Chọn cách sắp xếp và các tùy chọn.',
      'Sao chép danh sách đã sắp xếp.',
    ],
    faq: [
      { q: 'Sắp xếp tự nhiên là gì?', a: 'Sắp xếp tự nhiên so sánh các số nằm trong chuỗi theo giá trị, nên “item2” đứng trước “item10”.' },
    ],
    limits: [
      'Việc sắp xếp theo bảng chữ cái dùng quy tắc ngôn ngữ của trình duyệt.',
    ],
  },
  'text-cleaner': {
    name: 'Làm sạch văn bản',
    description: 'Cắt khoảng trắng, gộp dấu cách, xóa dòng trống và loại bỏ ký tự ẩn.',
    metaDescription: 'Công cụ làm sạch văn bản trực tuyến miễn phí. Xóa dấu cách thừa, dòng trống, ngắt dòng, ký tự ẩn và dấu ngoặc kép cong khỏi văn bản đã dán.',
    steps: [
      'Dán văn bản của bạn.',
      'Đánh dấu các tùy chọn làm sạch bạn cần.',
      'Sao chép văn bản đã làm sạch.',
    ],
    faq: [
      { q: 'Ký tự ẩn là gì?', a: 'Khoảng trắng độ rộng bằng 0, dấu gạch nối mềm và dấu thứ tự byte thường lẫn vào khi sao chép từ trang web và có thể làm hỏng mã hoặc phép so sánh.' },
    ],
    limits: [
      'Các thao tác được áp dụng theo thứ tự cố định; hãy chạy công cụ hai lần nếu bạn cần trình tự khác.',
    ],
  },
  'text-diff-checker': {
    name: 'So sánh văn bản',
    description: 'So sánh hai văn bản và xem chính xác những dòng và từ nào đã thay đổi.',
    metaDescription: 'Công cụ so sánh văn bản trực tuyến miễn phí. So sánh hai phiên bản văn bản cạnh nhau và tô sáng các dòng hoặc từ được thêm, bị xóa và thay đổi.',
    steps: [
      'Dán văn bản gốc vào bên trái và văn bản đã thay đổi vào bên phải.',
      'Chọn so sánh theo dòng hoặc theo từ.',
      'Xem lại các thay đổi được tô sáng.',
    ],
    faq: [
      { q: 'Chế độ theo dòng và theo từ khác nhau thế nào?', a: 'Chế độ theo dòng đánh dấu toàn bộ các dòng đã thay đổi. Chế độ theo từ tô sáng chính xác các từ thay đổi trong văn bản, phù hợp với văn xuôi.' },
    ],
    limits: [
      'Dữ liệu quá lớn (trên khoảng 200.000 ký tự) có thể chạy chậm.',
    ],
  },
  'json-formatter': {
    name: 'Định dạng JSON',
    description: 'Định dạng và làm đẹp JSON với kiểu thụt lề và cách sắp xếp khóa do bạn chọn.',
    metaDescription: 'Công cụ định dạng và làm đẹp JSON trực tuyến miễn phí. Định dạng JSON với 2 hoặc 4 dấu cách hay tab, sắp xếp khóa và xem vị trí lỗi chính xác.',
    steps: [
      'Dán JSON của bạn.',
      'Chọn kiểu thụt lề và cách sắp xếp.',
      'Sao chép hoặc tải xuống kết quả đã định dạng.',
    ],
    faq: [
      { q: 'Vì sao công cụ từ chối JSON của tôi?', a: 'JSON chuẩn không cho phép chú thích, dấu phẩy thừa ở cuối hoặc dấu nháy đơn. Thông báo lỗi cho biết dòng và cột của vị trí có vấn đề.' },
    ],
    limits: [
      'Các số lớn hơn 2^53 bị mất độ chính xác vì trình duyệt phân tích chúng dưới dạng số dấu phẩy động.',
    ],
  },
  'json-validator': {
    name: 'Kiểm tra JSON',
    description: 'Kiểm tra JSON có hợp lệ không và biết chính xác dòng và cột của mọi lỗi.',
    metaDescription: 'Công cụ kiểm tra JSON trực tuyến miễn phí. Kiểm tra cú pháp JSON và tìm chính xác dòng và cột của lỗi, kèm tóm tắt cấu trúc.',
    steps: [
      'Dán JSON của bạn.',
      'Xem ngay JSON có hợp lệ hay không.',
      'Sửa lỗi được báo cáo và kiểm tra lại.',
    ],
    faq: [
      { q: 'Công cụ này có kiểm tra theo JSON Schema không?', a: 'Không. Công cụ chỉ kiểm tra cú pháp: tức là văn bản có phải JSON đúng định dạng hay không.' },
    ],
    limits: [
      'Chỉ kiểm tra cú pháp; không bao gồm kiểm tra bằng JSON Schema.',
    ],
  },
  'json-minifier': {
    name: 'Rút gọn JSON',
    description: 'Xóa khoảng trắng khỏi JSON để làm cho nó gọn nhất có thể.',
    metaDescription: 'Công cụ rút gọn JSON trực tuyến miễn phí. Loại bỏ khoảng trắng khỏi JSON để giảm dung lượng dữ liệu và xem bạn đã tiết kiệm được bao nhiêu byte.',
    steps: [
      'Dán JSON của bạn.',
      'Kết quả đã rút gọn xuất hiện cùng dung lượng tiết kiệm được.',
      'Sao chép hoặc tải xuống.',
    ],
    faq: [
      { q: 'Rút gọn có làm thay đổi dữ liệu không?', a: 'Không. Chỉ khoảng trắng không có ý nghĩa bị xóa; khóa, giá trị và thứ tự đều không đổi.' },
    ],
    limits: [
      'Các số lớn hơn 2^53 bị mất độ chính xác vì trình duyệt phân tích chúng dưới dạng số dấu phẩy động.',
    ],
  },
  'xml-formatter': {
    name: 'Định dạng XML',
    description: 'Làm đẹp hoặc rút gọn XML và phát hiện các thẻ không khớp hoặc chưa đóng.',
    metaDescription: 'Công cụ định dạng XML trực tuyến miễn phí. Làm đẹp hoặc rút gọn XML với độ thụt lề tùy chỉnh và phát hiện các thẻ không khớp hoặc chưa đóng.',
    steps: [
      'Dán XML của bạn.',
      'Chọn Định dạng hoặc Rút gọn và kiểu thụt lề.',
      'Sao chép kết quả.',
    ],
    faq: [
      { q: 'XML được kiểm tra kỹ đến mức nào?', a: 'Công cụ kiểm tra việc lồng thẻ, thẻ chưa đóng và chú thích hoặc CDATA chưa kết thúc. Công cụ không kiểm tra theo lược đồ DTD hay XSD.' },
    ],
    limits: [
      'Chỉ kiểm tra cấu trúc; không có kiểm tra DTD hay XSD.',
    ],
  },
  'url-encoder-decoder': {
    name: 'Mã hóa / Giải mã URL',
    description: 'Mã hóa phần trăm hoặc giải mã URL và các giá trị trong chuỗi truy vấn.',
    metaDescription: 'Công cụ mã hóa và giải mã URL trực tuyến miễn phí. Mã hóa phần trăm văn bản cho URL hoặc giải mã chuỗi đã mã hóa, cho URL đầy đủ hoặc từng thành phần.',
    steps: [
      'Chọn Mã hóa hoặc Giải mã.',
      'Dán văn bản hoặc URL của bạn.',
      'Sao chép kết quả.',
    ],
    faq: [
      { q: 'Thành phần hay URL đầy đủ?', a: 'Dùng Thành phần cho một giá trị riêng lẻ như tham số truy vấn; chế độ này mã hóa các ký tự như / ? & =. Dùng URL đầy đủ để giữ nguyên cấu trúc của URL.' },
    ],
    limits: [
      'Giải mã sẽ thất bại với chuỗi phần trăm sai định dạng, chẳng hạn một dấu % đứng riêng.',
    ],
  },
  'html-encoder-decoder': {
    name: 'Mã hóa / Giải mã HTML',
    description: 'Chuyển các ký tự đặc biệt thành thực thể HTML hoặc giải mã thực thể về lại văn bản.',
    metaDescription: 'Công cụ mã hóa và giải mã HTML trực tuyến miễn phí. Chuyển <, >, & và dấu ngoặc kép thành thực thể HTML, hoặc giải mã thực thể có tên và thực thể dạng số.',
    steps: [
      'Chọn Mã hóa hoặc Giải mã.',
      'Dán văn bản của bạn.',
      'Sao chép kết quả.',
    ],
    faq: [
      { q: 'Mã hóa có làm dữ liệu người dùng nhập an toàn cho HTML không?', a: 'Việc thoát năm ký tự đặc biệt giúp văn bản an toàn bên trong nội dung phần tử HTML và các thuộc tính có đặt trong dấu ngoặc kép. Đây không phải là giải pháp thay thế cho thư viện tạo mẫu hoặc bộ làm sạch phù hợp trong các ngữ cảnh khác.' },
    ],
    limits: [
      'Giải mã hỗ trợ các thực thể có tên phổ biến và tất cả thực thể dạng số.',
    ],
  },
  'base64-encoder-decoder': {
    name: 'Mã hóa / Giải mã Base64',
    description: 'Mã hóa văn bản sang Base64 hoặc giải mã Base64 về văn bản, hỗ trợ đầy đủ UTF-8.',
    metaDescription: 'Công cụ mã hóa và giải mã Base64 trực tuyến miễn phí. Chuyển văn bản sang Base64 và ngược lại, hỗ trợ UTF-8 và bảng ký tự an toàn cho URL tùy chọn.',
    steps: [
      'Chọn Mã hóa hoặc Giải mã.',
      'Dán văn bản của bạn.',
      'Sao chép kết quả.',
    ],
    faq: [
      { q: 'Base64 có phải là mã hóa bảo mật không?', a: 'Không. Base64 là một cách biểu diễn dữ liệu, không phải mã hóa bảo mật. Ai cũng có thể giải mã nó, vì vậy đừng bao giờ dùng nó để bảo vệ bí mật.' },
      { q: 'Base64 an toàn cho URL là gì?', a: 'Đó là biến thể thay + và / bằng - và _ và bỏ phần đệm =, để giá trị có thể nằm an toàn trong URL và tên tệp.' },
    ],
    limits: [
      'Với dữ liệu ảnh, hãy dùng Ảnh sang Base64 và Base64 sang ảnh.',
    ],
  },
  'regex-tester': {
    name: 'Kiểm tra biểu thức chính quy',
    description: 'Kiểm tra biểu thức chính quy JavaScript với tô sáng kết quả khớp trực tiếp và các nhóm bắt.',
    metaDescription: 'Công cụ kiểm tra regex JavaScript trực tuyến miễn phí. Xem kết quả khớp trực tiếp, nhóm bắt và nhóm có tên, đồng thời xem trước phép thay thế.',
    steps: [
      'Nhập mẫu và chọn các cờ.',
      'Dán văn bản cần kiểm tra.',
      'Xem lại các kết quả khớp, nhóm và bản xem trước phép thay thế.',
    ],
    faq: [
      { q: 'Công cụ dùng loại regex nào?', a: 'Biểu thức chính quy JavaScript (ECMAScript), theo cách trình duyệt của bạn triển khai. PCRE, Python và các loại khác có một số tính năng khác biệt.' },
      { q: 'Vì sao trang của tôi bị treo với một số mẫu?', a: 'Các mẫu có lặp lồng nhau có thể gây quay lui cực kỳ nặng. Việc đối chiếu chạy trong một worker nền và bị dừng sau 1,5 giây, nên một mẫu chạy mất kiểm soát không thể làm treo trang, nhưng bạn vẫn nên tránh các mẫu như (a+)+.' },
    ],
    limits: [
      'Chỉ hỗ trợ cú pháp regex JavaScript.',
      'Việc đối chiếu dừng sau 5.000 kết quả khớp hoặc 1,5 giây.',
    ],
  },
  'markdown-previewer': {
    name: 'Xem trước Markdown',
    description: 'Viết Markdown và xem bản xem trước trực tiếp an toàn, đã được làm sạch ngay bên cạnh.',
    metaDescription: 'Công cụ xem trước Markdown trực tuyến miễn phí. Viết Markdown kiểu GitHub và xem bản xem trước HTML trực tiếp đã được làm sạch, rồi sao chép HTML.',
    steps: [
      'Viết hoặc dán Markdown ở bên trái.',
      'Xem kết quả hiển thị ở bên phải.',
      'Sao chép Markdown hoặc HTML đã tạo.',
    ],
    faq: [
      { q: 'Bản xem trước có an toàn không?', a: 'Có. HTML được tạo ra sẽ được làm sạch bằng DOMPurify trước khi hiển thị, nên mã script và trình xử lý sự kiện đều bị loại bỏ.' },
    ],
    limits: [
      'Markdown kiểu GitHub thông qua thư viện marked; không có phần mở rộng cho công thức toán hay sơ đồ.',
    ],
  },
  'password-generator': {
    name: 'Tạo mật khẩu',
    description: 'Tạo mật khẩu mạnh: hoàn toàn ngẫu nhiên, hoặc dễ nhớ dựa trên tên và từ.',
    metaDescription: 'Công cụ tạo mật khẩu miễn phí: mật khẩu hoàn toàn ngẫu nhiên, hoặc dựa trên tên như Nvidia132@Star với số, chữ hoa và ký hiệu ngẫu nhiên. Chạy ngay trong trình duyệt.',
    steps: [
      'Chọn kiểu: Tên + từ để dễ nhớ, hoặc Hoàn toàn ngẫu nhiên để bảo mật tối đa.',
      'Đặt độ dài, số lượng mật khẩu bạn cần và các loại ký tự cần có.',
      'Sao chép mật khẩu và lưu nó trong trình quản lý mật khẩu.',
    ],
    faq: [
      { q: 'Mật khẩu như Tesla2026#Tech có an toàn không?', a: 'Nó tốt hơn một từ đơn giản, nhưng yếu hơn văn bản ngẫu nhiên. Người đoán có thể bắt đầu từ danh sách các tên nổi tiếng, nên độ mạnh thực sự đến từ số khả năng có thể xảy ra, được hiển thị bằng bit. Hãy dùng mật khẩu dựa trên tên cho các tài khoản ít rủi ro và mật khẩu hoàn toàn ngẫu nhiên cho email, ngân hàng và trình quản lý mật khẩu.' },
      { q: 'Vì sao chỉ có vài ký hiệu?', a: 'Mật khẩu được tạo chỉ dùng bốn ký hiệu @ # $ * vì hầu như mọi trang web đều chấp nhận chúng và dễ gõ trên mọi bàn phím.' },
      { q: 'Mật khẩu nên dài bao nhiêu?', a: 'Ít nhất 16 ký tự cho các tài khoản quan trọng. Độ dài quan trọng hơn độ phức tạp.' },
    ],
    limits: [
      'Mật khẩu dựa trên tên dễ nhớ hơn nhưng yếu hơn mật khẩu hoàn toàn ngẫu nhiên. Độ mạnh hiển thị giả định kẻ tấn công biết cách chúng được tạo ra.',
      'Cơ sở dữ liệu từ là danh sách tên đã được chọn lọc bằng chữ Latin; đây không phải danh sách các mật khẩu được dùng nhiều nhất.',
      'Ước tính độ mạnh dựa trên số tổ hợp có thể có, không dựa trên cơ sở dữ liệu rò rỉ.',
    ],
  },
  'uuid-generator': {
    name: 'Tạo UUID',
    description: 'Tạo hàng loạt UUID phiên bản 4 ngẫu nhiên với các tùy chọn định dạng.',
    metaDescription: 'Công cụ tạo UUID trực tuyến miễn phí. Tạo hàng loạt UUID v4 ngẫu nhiên, ở dạng chữ hoa, không có dấu gạch ngang hoặc có ngoặc nhọn, dùng tính ngẫu nhiên mật mã.',
    steps: [
      'Chọn số lượng UUID và định dạng.',
      'Nhấn Tạo mới.',
      'Sao chép danh sách.',
    ],
    faq: [
      { q: 'Hai UUID có thể trùng nhau không?', a: 'UUID phiên bản 4 có 122 bit ngẫu nhiên, nên khả năng trùng lặp là không đáng kể trong thực tế.' },
    ],
    limits: [
      'Chỉ tạo UUID phiên bản 4 (ngẫu nhiên).',
    ],
  },
  'timestamp-converter': {
    name: 'Chuyển đổi dấu thời gian',
    description: 'Chuyển dấu thời gian Unix thành ngày dễ đọc và ngược lại, theo bất kỳ múi giờ nào.',
    metaDescription: 'Công cụ chuyển đổi dấu thời gian Unix trực tuyến miễn phí. Chuyển giây hoặc mili giây epoch thành ngày theo UTC và giờ địa phương, và chuyển ngày về lại dấu thời gian.',
    steps: [
      'Nhập dấu thời gian Unix hoặc chọn một ngày.',
      'Xem kết quả theo UTC, múi giờ của bạn và ISO 8601.',
      'Sao chép giá trị bất kỳ.',
    ],
    faq: [
      { q: 'Giây hay mili giây?', a: 'Dấu thời gian có từ 13 chữ số trở lên được coi là mili giây, ngắn hơn thì là giây. Bạn có thể tự chọn lại thủ công.' },
    ],
    limits: [
      'Phạm vi hỗ trợ là phạm vi của ngày trong JavaScript: khoảng từ năm -271821 đến 275760.',
    ],
  },
  'color-converter': {
    name: 'Chuyển đổi màu',
    description: 'Chuyển đổi màu giữa HEX, RGB, HSL và HSV, kèm xem trước trực tiếp và kiểm tra độ tương phản.',
    metaDescription: 'Công cụ chuyển đổi màu trực tuyến miễn phí. Chuyển đổi giá trị HEX, RGB, HSL và HSV, xem trước màu và kiểm tra tỷ lệ tương phản WCAG.',
    steps: [
      'Nhập một màu ở bất kỳ định dạng nào hoặc dùng bộ chọn màu.',
      'Xem mọi định dạng được cập nhật.',
      'Sao chép giá trị bạn cần.',
    ],
    faq: [
      { q: 'Kiểm tra độ tương phản hiển thị gì?', a: 'Nó hiển thị tỷ lệ tương phản WCAG của màu so với chữ trắng và chữ đen, giúp bạn chọn các tổ hợp dễ đọc.' },
    ],
    limits: [
      'Chỉ hỗ trợ sRGB; các không gian CSS Color 4 như LAB, LCH và Display-P3 không được hỗ trợ.',
      'Giá trị độ trong suốt (alpha) được chấp nhận nhưng bị bỏ qua.',
    ],
  },
  'qr-code-generator': {
    name: 'Tạo mã QR',
    description: 'Tạo mã QR cho liên kết, văn bản, Wi-Fi, email hoặc số điện thoại, dưới dạng PNG hoặc SVG.',
    metaDescription: 'Công cụ tạo mã QR miễn phí. Tạo mã QR cho URL, văn bản, Wi-Fi, email và số điện thoại rồi tải xuống dưới dạng PNG hoặc SVG. Được tạo ngay trong trình duyệt.',
    steps: [
      'Chọn nội dung mã cần chứa và điền thông tin chi tiết.',
      'Điều chỉnh kích thước, màu sắc và mức sửa lỗi nếu bạn muốn.',
      'Tải xuống PNG hoặc SVG, và thử quét bằng điện thoại trước khi in.',
    ],
    faq: [
      { q: 'Mã có hết hạn không?', a: 'Không. Đây là các mã tĩnh: dữ liệu được lưu ngay trong mã, nên chúng dùng được mãi mãi và không có gì bị theo dõi.' },
      { q: 'Tôi nên chọn mức sửa lỗi nào?', a: 'Mức Trung bình phù hợp với hầu hết trường hợp. Hãy chọn Khá cao hoặc Cao nếu mã có thể bị bẩn hoặc hư hại, nhưng mức cao hơn làm mã dày đặc hơn và khó quét hơn ở kích thước nhỏ.' },
      { q: 'Tôi có thể dùng mã cho mục đích thương mại không?', a: 'Có. Tiêu chuẩn mã QR là mở, và các mã tạo ở đây không có phí, hình mờ hay theo dõi nào từ chúng tôi.' },
    ],
    limits: [
      'Chỉ có mã tĩnh: không theo dõi lượt quét và không có mã chỉnh sửa được.',
      'Văn bản quá dài tạo ra mã dày đặc, khó quét, vì vậy hãy giữ ngắn gọn.',
      'Màu tối trên nền sáng với độ tương phản mạnh sẽ quét tốt nhất.',
    ],
  },
  "scan-to-pdf": {
    name: "Quét sang PDF",
    description: "Biến ảnh chụp hoặc bản quét các trang giấy thành một PDF, kèm tùy chọn làm sạch để dễ đọc hơn.",
    metaDescription: "Quét sang PDF trực tuyến: gộp ảnh chụp hoặc bản quét các trang giấy thành một PDF, đặt thứ tự trang và làm đều bóng đổ bằng chế độ tài liệu đen trắng.",
    steps: [
      "Thêm ảnh chụp hoặc bản quét các trang của bạn, hoặc chụp ảnh nếu điện thoại hay máy tính bảng của bạn hỗ trợ.",
      "Sắp xếp các trang theo thứ tự rồi chọn khổ trang và kiểu làm sạch.",
      "Tạo PDF và tải xuống.",
    ],
    faq: [
      { q: "Công cụ có nhận dạng văn bản trên trang không?", a: "Không. Quét sang PDF biến hình ảnh thành các trang PDF và có thể làm sạch chúng, nhưng văn bản vẫn là một phần của hình ảnh. Để có thể tìm kiếm, hãy cho kết quả chạy qua OCR PDF." },
      { q: "Tôi có thể dùng camera điện thoại không?", a: "Trên điện thoại và máy tính bảng có trình duyệt hỗ trợ, nút “Chụp ảnh” sẽ mở camera. Nếu không, hãy chọn các ảnh đã lưu sẵn trên thiết bị của bạn." },
      { q: "Các kiểu làm sạch làm gì?", a: "“Gốc” giữ nguyên màu. “Thang xám” bỏ màu. “Tài liệu đen trắng” biến trang thành chữ đen thuần trên giấy trắng và làm đều bóng đổ cùng ánh sáng không đều, phù hợp với trang in và ghi chú nhưng không phù hợp với ảnh chụp." },
    ],
    limits: [
      "Tối đa 25 MB mỗi ảnh và 100 ảnh mỗi PDF.",
      "Ảnh lớn được thu nhỏ xuống khoảng cỡ A4 ở 300 dpi để PDF nhẹ.",
      "Một số định dạng của điện thoại như HEIC trình duyệt không đọc được; hãy lưu chúng sang JPG trước.",
    ],
  },
  "html-to-pdf": {
    name: "HTML sang PDF",
    description: "Chuyển một tệp HTML hoặc HTML đã dán thành PDF có văn bản chọn được.",
    metaDescription: "HTML sang PDF trực tuyến: chuyển một tệp HTML hoặc mã HTML đã dán thành PDF có văn bản thật, chọn được, kèm tiêu đề, danh sách, bảng và ảnh nhúng.",
    steps: [
      "Chọn một tệp HTML hoặc dán HTML của bạn.",
      "Chọn khổ trang.",
      "Chuyển đổi và tải PDF xuống.",
    ],
    faq: [
      { q: "Tôi có thể nhập địa chỉ một trang web không?", a: "Không. Việc lấy các trang web khác sẽ đòi hỏi gửi địa chỉ đến máy chủ, và một trang hiếm khi chuyển đổi tốt nếu thiếu các kiểu của nó. Hãy lưu trang thành tệp HTML trong trình duyệt rồi dùng tệp đó, hoặc dán HTML của trang." },
      { q: "PDF có giống trang web không?", a: "Không, không hoàn toàn. Công cụ đọc cấu trúc tài liệu (tiêu đề, đoạn văn, danh sách, bảng, liên kết, chữ đậm và nghiêng cùng ảnh nhúng) và dàn thành một tài liệu đơn giản. Kiểu CSS, script, phông web, cột và các thành phần định vị không được áp dụng." },
      { q: "Chuyển đổi HTML mà tôi không tin tưởng có an toàn không?", a: "HTML được đọc như văn bản vô hại: script không chạy và không có gì được tải từ internet. Chỉ các ảnh nhúng ngay trong HTML mới được dùng." },
      { q: "PDF hỗ trợ những ngôn ngữ và phông chữ nào?", a: "PDF được tạo bằng phông Noto Sans, bao phủ văn bản Latin (gồm cả các chữ cái Ba Lan, Séc, Rumani và Thổ Nhĩ Kỳ), Kirin, Hy Lạp, tiếng Việt và Devanagari. Văn bản tiếng Ả Rập, Do Thái, Thái, Trung, Nhật và Hàn chưa được hỗ trợ: các ký tự đó xuất hiện dưới dạng dấu hỏi và công cụ sẽ cho bạn biết có bao nhiêu ký tự bị ảnh hưởng. Phông chữ gốc của tài liệu không được giữ lại." },
    ],
    limits: [
      "Tối đa 10 MB HTML.",
      "Chỉ các ảnh nhúng trong HTML (địa chỉ data:) được đưa vào; ảnh và kiểu tải từ trang web khác bị bỏ qua, không được lấy về.",
      "Script, biểu mẫu, khung, canvas, video và đồ họa SVG không được chuyển đổi.",
    ],
  },
  "word-to-pdf": {
    name: "Word sang PDF",
    description: "Chuyển tài liệu Word (DOCX) sang PDF, giữ tiêu đề, danh sách, bảng và hình ảnh.",
    metaDescription: "Word sang PDF trực tuyến: chuyển tài liệu DOCX thành PDF có văn bản chọn được, tiêu đề, danh sách, bảng, liên kết và hình ảnh. Tệp được chuyển đổi trong trình duyệt của bạn.",
    steps: [
      "Chọn một tệp DOCX.",
      "Chọn khổ trang hoặc giữ khổ của tài liệu.",
      "Chuyển đổi và tải PDF xuống.",
    ],
    faq: [
      { q: "PDF có giống hệt tài liệu trong Word không?", a: "Không. Kitwell không dùng Microsoft Word hay LibreOffice. Nó đọc nội dung và cấu trúc của tài liệu rồi tự dàn trang, nên phông chữ, khoảng cách và ngắt trang khác với Word. Hãy kiểm tra kết quả trước khi gửi đi." },
      { q: "Những gì được chuyển đổi và những gì không?", a: "Được chuyển đổi: văn bản có chữ đậm, nghiêng, gạch chân và liên kết, tiêu đề, danh sách đầu dòng và đánh số, bảng, ảnh JPEG và PNG, ngắt dòng và ngắt trang, căn lề và hướng trang. Không được chuyển đổi: đầu trang và chân trang, chú thích cuối trang, hộp văn bản, phương trình, biểu đồ, hình khối và các định dạng ảnh khác." },
      { q: "Tôi có thể chuyển đổi tệp .doc cũ không?", a: "Không. Hãy mở nó trong Word và lưu thành tệp DOCX trước." },
      { q: "PDF hỗ trợ những ngôn ngữ và phông chữ nào?", a: "PDF được tạo bằng phông Noto Sans, bao phủ văn bản Latin (gồm cả các chữ cái Ba Lan, Séc, Rumani và Thổ Nhĩ Kỳ), Kirin, Hy Lạp, tiếng Việt và Devanagari. Văn bản tiếng Ả Rập, Do Thái, Thái, Trung, Nhật và Hàn chưa được hỗ trợ: các ký tự đó xuất hiện dưới dạng dấu hỏi và công cụ sẽ cho bạn biết có bao nhiêu ký tự bị ảnh hưởng. Phông chữ gốc của tài liệu không được giữ lại." },
    ],
    limits: [
      "Chỉ tệp DOCX, tối đa 50 MB. Tệp .doc cũ và tài liệu được bảo vệ bằng mật khẩu không được hỗ trợ.",
      "Bố cục chỉ gần đúng: cột, chữ bao quanh ảnh, đầu trang, chân trang và chú thích cuối trang không được tái tạo.",
      "Phông chữ gốc được thay bằng Noto Sans.",
    ],
  },
  "powerpoint-to-pdf": {
    name: "PowerPoint sang PDF",
    description: "Chuyển bản trình bày PowerPoint (PPTX) sang PDF, mỗi trang chiếu một trang.",
    metaDescription: "PowerPoint sang PDF trực tuyến: chuyển bản trình bày PPTX thành PDF với mỗi trang chiếu một trang, giữ kích thước trang chiếu, văn bản, hình ảnh và các hình khối đơn giản. Ngay trong trình duyệt của bạn.",
    steps: [
      "Chọn một tệp PPTX.",
      "Chuyển đổi nó.",
      "Kiểm tra các trang rồi tải PDF xuống.",
    ],
    faq: [
      { q: "Các trang chiếu có giống hệt trong PowerPoint không?", a: "Không hoàn toàn. Kitwell vẽ từng trang chiếu từ các hộp văn bản, hình ảnh, hình khối đơn giản và bảng của nó. Phông chữ, màu chuyển sắc, bóng đổ, hiệu ứng và cách vừa khít văn bản chính xác sẽ khác. Hãy luôn xem lại PDF trước khi sử dụng." },
      { q: "Những gì không được chuyển đổi?", a: "Biểu đồ, SmartArt, video và âm thanh, hoạt ảnh và hiệu ứng chuyển trang, ghi chú của người trình bày, màu chuyển sắc, đường kẻ và đầu nối, cùng hình ảnh ở định dạng khác JPEG và PNG. Công cụ sẽ cho bạn biết có bao nhiêu mục bị bỏ qua." },
      { q: "Tôi có thể chuyển đổi tệp .ppt cũ không?", a: "Không. Hãy mở nó trong PowerPoint và lưu thành tệp PPTX trước." },
      { q: "PDF hỗ trợ những ngôn ngữ và phông chữ nào?", a: "PDF được tạo bằng phông Noto Sans, bao phủ văn bản Latin (gồm cả các chữ cái Ba Lan, Séc, Rumani và Thổ Nhĩ Kỳ), Kirin, Hy Lạp, tiếng Việt và Devanagari. Văn bản tiếng Ả Rập, Do Thái, Thái, Trung, Nhật và Hàn chưa được hỗ trợ: các ký tự đó xuất hiện dưới dạng dấu hỏi và công cụ sẽ cho bạn biết có bao nhiêu ký tự bị ảnh hưởng. Phông chữ gốc của tài liệu không được giữ lại." },
    ],
    limits: [
      "Chỉ tệp PPTX, tối đa 100 MB và 300 trang chiếu. Tệp .ppt cũ và bản trình bày được bảo vệ bằng mật khẩu không được hỗ trợ.",
      "Mỗi trang chiếu trở thành một trang có kích thước và hướng riêng của trang chiếu.",
      "Văn bản không vừa khung sẽ được thu nhỏ, tối đa còn một nửa cỡ chữ.",
    ],
  },
  "excel-to-pdf": {
    name: "Excel sang PDF",
    description: "Chuyển sổ làm việc Excel (XLSX) sang PDF, mỗi trang tính hiển thị là một bảng.",
    metaDescription: "Excel sang PDF trực tuyến: chuyển sổ làm việc XLSX thành PDF trong đó mỗi trang tính hiển thị là một bảng giá trị, số và ngày đã lưu. Ngay trong trình duyệt của bạn.",
    steps: [
      "Chọn một tệp XLSX.",
      "Chuyển đổi nó.",
      "Kiểm tra các bảng rồi tải PDF xuống.",
    ],
    faq: [
      { q: "Công thức có được tính không?", a: "Không. PDF hiển thị các giá trị mà Excel đã lưu trong tệp. Nếu một ô công thức không có giá trị đã lưu, ô đó để trống và công cụ sẽ báo cho bạn; hãy mở tệp trong Excel, để nó tính toán, lưu lại rồi chuyển đổi lần nữa." },
      { q: "Kết quả có giống bố cục in trong Excel không?", a: "Không. Mỗi trang tính hiển thị trở thành một bảng đơn giản được vừa với chiều rộng trang. Màu ô, ô gộp, độ rộng cột, biểu đồ, hình ảnh, vùng in và ngắt trang không được giữ lại." },
      { q: "Tôi có thể chuyển đổi tệp .xls cũ không?", a: "Không. Hãy mở nó trong Excel và lưu thành tệp XLSX trước." },
      { q: "PDF hỗ trợ những ngôn ngữ và phông chữ nào?", a: "PDF được tạo bằng phông Noto Sans, bao phủ văn bản Latin (gồm cả các chữ cái Ba Lan, Séc, Rumani và Thổ Nhĩ Kỳ), Kirin, Hy Lạp, tiếng Việt và Devanagari. Văn bản tiếng Ả Rập, Do Thái, Thái, Trung, Nhật và Hàn chưa được hỗ trợ: các ký tự đó xuất hiện dưới dạng dấu hỏi và công cụ sẽ cho bạn biết có bao nhiêu ký tự bị ảnh hưởng. Phông chữ gốc của tài liệu không được giữ lại." },
    ],
    limits: [
      "Chỉ tệp XLSX, tối đa 50 MB. Tệp .xls cũ và sổ làm việc được bảo vệ bằng mật khẩu không được hỗ trợ.",
      "Tối đa 5.000 hàng và 60 cột mỗi trang tính; phần vượt quá bị bỏ qua và công cụ sẽ báo.",
      "Các trang tính ẩn bị bỏ qua.",
    ],
  },
  "pdf-to-markdown": {
    name: "PDF sang Markdown",
    description: "Biến văn bản của PDF thành tệp Markdown có tiêu đề, đoạn văn và danh sách.",
    metaDescription: "PDF sang Markdown trực tuyến: trích xuất văn bản của PDF và tải xuống thành tệp Markdown (.md) có tiêu đề, đoạn văn và danh sách. Chạy ngay trong trình duyệt của bạn.",
    steps: [
      "Chọn một PDF.",
      "Chọn có xóa đầu trang, chân trang và số trang lặp lại hay không.",
      "Chuyển đổi, kiểm tra kết quả và tải tệp .md xuống.",
    ],
    faq: [
      { q: "Tiêu đề và danh sách được nhận ra như thế nào?", a: "Tiêu đề là các dòng có cỡ chữ lớn hơn văn bản chính, danh sách là các dòng bắt đầu bằng dấu đầu dòng hoặc số, còn các đoạn văn được tách bởi khoảng cách giữa các dòng. Đây là ước đoán tốt chứ không phải bảo đảm, vì vậy hãy kiểm tra kết quả." },
      { q: "Vì sao kết quả trống với PDF quét của tôi?", a: "Bản quét là hình ảnh của trang và không có văn bản để trích xuất. Hãy chạy OCR PDF trước để thêm lớp văn bản, rồi chuyển đổi kết quả." },
      { q: "Còn bảng, cột và hình ảnh thì sao?", a: "Bảng và cột không được dựng lại: văn bản của chúng xuất hiện như các dòng thông thường, theo thứ tự đọc khi có thể. Hình ảnh, liên kết, chữ đậm và nghiêng, chú thích cuối trang và phương trình không được mang theo." },
    ],
    limits: [
      "Tối đa 100 MB mỗi PDF. PDF được bảo vệ bằng mật khẩu cần được mở khóa trước.",
      "Chỉ văn bản thực sự là văn bản trong PDF mới được chuyển đổi; các trang quét cần OCR PDF trước.",
      "Cấu trúc được ước tính từ cỡ chữ và khoảng cách, có thể sai với bố cục phức tạp.",
    ],
  },
  "repair-pdf": {
    name: "Sửa PDF",
    description: "Thử sửa một PDF không mở được bằng cách dựng lại cấu trúc bên trong của nó.",
    metaDescription: "Sửa PDF trực tuyến: dựng lại cấu trúc của một PDF bị hỏng không mở được, ví dụ khi bảng tham chiếu chéo hỏng hoặc phần cuối bị cắt cụt. Chạy ngay trong trình duyệt của bạn.",
    steps: [
      "Chọn PDF bị hỏng.",
      "Bắt đầu sửa.",
      "Nếu công cụ tạo ra tệp, hãy kiểm tra và tải xuống.",
    ],
    faq: [
      { q: "Có thể sửa những loại hỏng hóc nào?", a: "Hỏng cấu trúc của tệp: chỉ mục đối tượng (bảng tham chiếu chéo) bị thiếu hoặc sai, thiếu trailer, rác ở phía trước hoặc danh sách trang bị hỏng. Nếu tệp bị cắt cụt, các trang đã lưu trước chỗ cắt có thể được khôi phục." },
      { q: "Điều gì không thể khôi phục?", a: "Nội dung không còn trong tệp. Các trang, hình ảnh hay phông chữ bị thiếu hoặc hỏng không thể lấy lại, và một số tệp không thể cứu được. Công cụ cho bạn biết đã giữ lại bao nhiêu trang và nói rõ khi không tạo được tệp dùng được; nó không bao giờ đưa ra bản tải xuống mà nó chưa tạo." },
      { q: "Nếu PDF của tôi mở bình thường thì sao?", a: "Khi đó không có gì để sửa. Công cụ sẽ cho bạn biết và cung cấp một bản sao đã làm sạch của tệp." },
    ],
    limits: [
      "Tối đa 100 MB mỗi PDF. PDF được bảo vệ bằng mật khẩu cần được mở khóa trước.",
      "Công cụ này không thể dựng lại hỏng hóc bên trong các luồng đối tượng đã nén.",
      "Tệp đã sửa có thể có ít trang hơn bản gốc, và thứ tự trang có thể thay đổi sau một lần sửa nặng.",
    ],
  },
  "pdf-to-pdfa": {
    name: "PDF sang PDF/A",
    description: "Chuẩn bị PDF thành PDF/A (1b, 2b, 2u, 3b, 3u hoặc 4) để lưu trữ, giữ văn bản hoặc dùng ảnh của các trang.",
    metaDescription: "PDF sang PDF/A trực tuyến: chuẩn bị PDF thành PDF/A-1b, 2b, 2u, 3b, 3u hoặc 4 để lưu trữ, kèm nhận diện PDF/A, siêu dữ liệu và hồ sơ màu. Giữ văn bản khi có thể. Chạy trong trình duyệt của bạn.",
    steps: [
      "Chọn một PDF. Tệp có mật khẩu phải được mở khóa trước.",
      "Chọn phiên bản PDF/A, rồi chọn cách chuyển đổi: giữ văn bản và phông chữ, hoặc chuyển các trang thành hình ảnh.",
      "Chuyển đổi, đọc những gì đã làm và tải xuống tệp PDF/A.",
    ],
    faq: [
      { q: "Kết quả có phải là tệp PDF/A được chứng nhận không?", a: "Không. Kitwell chuẩn bị PDF của bạn theo phiên bản PDF/A bạn chọn và tự kiểm tra công việc của mình theo các quy tắc nó áp dụng. Các tệp thử nghiệm được chuyển đổi theo cách này đã vượt qua trình xác thực veraPDF, nhưng bản thân công cụ trong trình duyệt không có trình xác thực PDF/A đầy đủ. Nếu cần chứng minh sự tuân thủ, hãy kiểm tra tệp của bạn bằng trình xác thực như veraPDF." },
      { q: "Tôi nên chọn phiên bản PDF/A nào?", a: "PDF/A-2b được chấp nhận rộng rãi nhất và là mặc định. PDF/A-1b cũ nhất và nghiêm ngặt nhất: không cho phép độ trong suốt hay các lớp. Các phiên bản “u” (2u, 3u) còn đảm bảo văn bản có thể sao chép đáng tin cậy, nên yêu cầu mọi phông chữ đều có ánh xạ văn bản. PDF/A-3b có cùng quy tắc với 2b, còn PDF/A-4 mới nhất, dựa trên PDF 2.0. Các cấp “a” (1a, 2a, 3a) cần cấu trúc tài liệu được gắn thẻ mà không thể tạo tự động, còn 4e và 4f dành cho 3D và tệp đính kèm, nên không được cung cấp." },
      { q: "Hai cách chuyển đổi khác nhau thế nào?", a: "“Giữ văn bản và phông chữ” chỉ thay đổi cấu trúc và siêu dữ liệu của tệp, nên văn bản vẫn chọn được. Cách này chỉ hoạt động khi mọi phông chữ đều được nhúng và tệp không dùng màu CMYK. “Chuyển các trang thành hình ảnh” dựng mỗi trang thành một ảnh và tạo PDF/A mới từ chúng. Cách này luôn hoạt động, nhưng văn bản không còn chọn được và tệp lớn hơn." },
      { q: "Vì sao PDF của tôi bị từ chối khi tôi chọn giữ văn bản?", a: "PDF/A yêu cầu mọi phông chữ phải được nhúng trong tệp, và không cho phép màu CMYK khi không có hồ sơ CMYK, nén LZW hay chú thích không có hình dạng hiển thị. PDF/A-1b còn từ chối độ trong suốt, các lớp và ảnh JPEG 2000, và các phiên bản “u” cùng PDF/A-4 cần ánh xạ văn bản cho mỗi phông chữ. Những điều này không thể sửa nếu không thay đổi các trang, nên công cụ liệt kê những gì nó tìm thấy thay vì giả vờ có kết quả. Bạn vẫn có thể dùng chế độ hình ảnh." },
      { q: "Công cụ thay đổi gì trong tệp?", a: "Nó thêm nhận diện PDF/A và siêu dữ liệu XMP, hồ sơ màu sRGB làm ý định đầu ra và mã nhận dạng tệp. Nó loại bỏ JavaScript, hành động bị cấm, tệp đính kèm, thông tin tài liệu thừa và các thiết lập chú thích mà PDF/A không cho phép." },
    ],
    limits: [
      "Tối đa 100 MB mỗi PDF. PDF có mật khẩu phải được mở khóa trước, vì tệp PDF/A không thể bị mã hóa.",
      "“Giữ văn bản và phông chữ” chỉ hoạt động khi mọi phông chữ đều được nhúng và tệp không có màu CMYK hay nén LZW.",
      "Chuyển các trang thành hình ảnh bị giới hạn ở 200 trang. Văn bản không còn chọn được và tệp lớn hơn.",
      "Kết quả do Kitwell chuẩn bị và được kiểm tra theo các quy tắc nó áp dụng; nó không được trình xác thực PDF/A đầy đủ trong trình duyệt của bạn xác thực.",
      "Các phiên bản có sẵn: PDF/A-1b, 2b, 2u, 3b, 3u và 4. Các cấp “a” (PDF gắn thẻ) và 4e/4f không được cung cấp.",
    ],
  },
};
export default tools;
