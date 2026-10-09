import type { PartialMessages } from '../../en';

export default {
  // Generic
  'err.generic': '出了点问题，请重试。',
  'err.unknown': '未知错误',

  // File validation
  'err.files.limit': '已达到 {max} 个文件的上限。',
  'err.files.unsupportedType': '不支持的文件类型。支持：{types}。',
  'err.files.empty': '文件为空。',
  'err.files.tooLarge': '文件过大（{size}）。最大为 {max}。',
  'err.files.onlyOne': '一次只能使用一个文件。',

  // JSON
  'err.json.badUnicode': 'Unicode 转义无效',
  'err.json.badEscape': '字符串中的转义序列无效',
  'err.json.controlChar': '字符串中有未转义的控制字符（换行请使用 \\n）',
  'err.json.unterminatedString': '字符串未结束',
  'err.json.invalidNumber': '数字无效',
  'err.json.unexpectedEnd': 'JSON 意外结束',
  'err.json.trailingComma': 'JSON 中不允许末尾逗号',
  'err.json.propertyName': '应为用双引号括起的属性名',
  'err.json.doubleQuotes': '字符串必须使用双引号',
  'err.json.unexpectedChar': '意外的字符“{char}”',
  'err.json.trailingContent': 'JSON 值结束后还有多余内容',
  'err.json.empty': '请输入 JSON 后继续。',
  'err.json.invalid': 'JSON 无效',

  // XML
  'err.xml.empty': '请输入 XML 后继续。',
  'err.xml.unterminatedComment': '注释未结束',
  'err.xml.unterminatedPi': '处理指令未结束',
  'err.xml.unterminatedDeclaration': '声明未结束',
  'err.xml.unterminatedAttribute': '属性值未结束',
  'err.xml.unterminatedTag': '标签未结束',
  'err.xml.unexpectedClosing': '意外的结束标签 </{name}>',
  'err.xml.mismatched': '结束标签不匹配：应为 </{expected}>，但找到的是 </{found}>',
  'err.xml.invalidTagName': '标签名“{name}”无效',
  'err.xml.unclosedTag': '标签 <{name}> 未关闭',
  'err.xml.noElement': '未找到 XML 元素',
  'err.xml.singleRoot': 'XML 文档必须只有一个根元素',
  'err.xml.strayText': '根元素之外不允许出现文本',

  // Developer tools
  'err.dev.malformedPercent': '文本中包含格式错误的百分号序列（例如“%”后面没有跟两位十六进制数字）。',
  'err.dev.badBase64': '这不是有效的 Base64。请检查是否有缺失、多余或不支持的字符。',
  'err.dev.notUtf8': '解码后的数据不是有效的 UTF-8 文本，可能是图片等二进制数据。',
  'err.dev.noCharType': '请至少选择一种字符类型。',
  'err.dev.timestampFormat': '请输入自 1970-01-01 UTC 以来的秒数或毫秒数。',
  'err.dev.timestampRange': '该时间戳超出了支持的日期范围。',
  'err.regex.invalid': '正则表达式无效',
  'err.regex.timeout': '此模式运行时间过长，已被停止。它可能导致灾难性回溯（例如 (a+)+ 这样的嵌套重复）。',

  // GIF
  'err.gif.noImages': '请至少添加一张图片。',
  'err.gif.tooManyFrames': 'GIF 最多只能有 {max} 帧。',
  'err.gif.sizeNotInteger': 'GIF 的尺寸必须是整数像素。',
  'err.gif.tooLarge': 'GIF 过大。',
  'err.gif.tooLargeToBuild': '此 GIF 太大，您的浏览器无法生成。请使用更小的尺寸或更少的帧数。',
  'err.gif.colours': '请选择 16、32、64、128 或 256 种颜色。',
  'err.gif.frameMismatch': '有一帧与 GIF 尺寸不符。',
  'err.gif.notGif': '不是 GIF 文件。',
  'err.gif.damaged': 'GIF 数据已损坏。',
  'err.gif.incomplete': 'GIF 数据不完整。',

  // Images
  'err.image.processingFailed': '处理失败。',
  'err.image.noCanvas': '无法创建绘图画布。图片对此设备来说可能过大。',
  'err.image.resultTooBig': '结果将为 {width} × {height} px，超出了此浏览器工具能够安全创建的范围（每边最大 {max} px）。',
  'err.image.watermarkTooSmall': '水印太小，无法平铺。请使用更大的尺寸或单个水印。',
  'err.image.notLarger': '请选择比原图更大的尺寸。如需缩小图片，请使用“调整图片大小”。',
  'err.image.notSvg': '此文件看起来不是 SVG 图片。',
  'err.image.svgFailed': '无法绘制此 SVG。它可能无效，或使用了浏览器不支持的功能。',
  'err.image.encodeFailed': '浏览器无法编码此图片。',
  'err.image.formatUnsupported': '您的浏览器无法保存 {format} 图片。请尝试其他输出格式，或使用最新版本的 Chrome、Edge 或 Firefox。',
  'err.image.unreadable': '无法将此文件作为图片读取。它可能已损坏，或格式不受支持。',

  // OCR
  'err.ocr.engineStart': '无法启动 OCR 引擎。请重新加载页面后重试；如果仍然失败，可能是您的浏览器不支持 WebAssembly。',

  // Passwords
  'err.passwords.chooseCase': '请选择大写字母、小写字母，或两者都选。',
  'err.passwords.length': '请选择 {min} 到 {max} 之间的长度。',
  'err.passwords.chooseCategory': '请至少选择一个单词类别。',
  'err.passwords.cannotBuild': '无法按这些设置生成基于姓名的密码。请尝试其他长度，或开启数字或符号。',

  // QR codes
  'err.qr.noText': '请先输入文本或链接。',
  'err.qr.tooMuchData': '在此纠错级别下，数据量对二维码来说太大了。请缩短文本或选择较低的级别。',
  'err.qr.badColours': '请选择有效的颜色。',
  'err.qr.wifiName': '请输入网络名称。',
  'err.qr.wifiPassword': '请输入 Wi-Fi 密码，或选择“无密码”。',
  'err.qr.email': '请输入有效的电子邮件地址。',
  'err.qr.phone': '请使用数字输入电话号码，开头可以有 +。',
  'err.qr.unreadableImage': '无法读取此图片。它对此设备来说可能过大。',

  // PDF: reading and general
  'err.pdf.onlyOne': '一次只能使用一个 PDF。',
  'err.pdf.unreadable': '无法将此文件作为 PDF 读取。它可能已损坏，或根本不是 PDF。',
  'err.pdf.passwordProtected': '此 PDF 受密码保护。请先使用我们的“解锁 PDF”工具移除密码，然后重试。',
  'err.pdf.pageMissing': '此文档中不存在第 {page} 页。',
  'err.pdf.noCanvas': '您的浏览器无法为此页面创建绘图画布。',
  'err.pdf.encodePage': '浏览器无法将此页面编码为图片。',
  'err.pdf.encodePageImage': '浏览器无法编码页面图片。',
  'err.pdf.renderTooLarge': '此页面太大，无法按所选分辨率渲染。请尝试较低的 DPI。',
  'err.pdf.previewTooLarge': '此页面太大，无法预览。',
  'err.pdf.flattenTooLarge': '有一页太大，无法按此质量处理。请选择较低的质量设置。',
  'err.pdf.compareSize': '两张图片的尺寸必须相同。',

  // PDF: merge, split, pages
  'err.pdf.mergeNeedTwo': '请至少添加两个 PDF 文件进行合并。',
  'err.pdf.mergeFile': '{name}：{message}',
  'err.pdf.fileN': '文件 {n}',
  'err.pdf.selectPage': '请至少选择一页。',
  'err.pdf.selectedPageMissing': '所选页面在此 PDF 中不存在。',
  'err.pdf.enterPages': '请输入您需要的页面，例如 1-3, 5。',
  'err.pdf.enterRanges': '请输入每个输出文件的页码范围，例如 1-3, 4-6。',
  'err.pdf.badRange': '“{token}”不是有效的页码或范围。',
  'err.pdf.rangeOutside.other': '“{token}”超出了此文档的范围，文档共有 {count} 页。',
  'err.pdf.rangeBackwards': '“{token}”的顺序颠倒了。范围请从小到大书写，例如 {example}。',
  'err.pdf.noImages': '请至少添加一张图片。',
  'err.pdf.imageEmbed': '其中一张图片无法嵌入。它可能已损坏，或使用了不受支持的变体。',

  // PDF: editing
  'err.pdf.latinOnly': '此处只能使用拉丁字母、数字和常用符号，因为 PDF 内置字体不包含其他文字。',
  'err.pdf.badColour': '请选择有效的颜色。',
  'err.pdf.badPages': '请选择有效的页面。',
  'err.pdf.numberFirst': '要编号的第一页必须在 1 到 {count} 之间。',
  'err.pdf.numberLast': '要编号的最后一页必须在 {from} 到 {count} 之间。',
  'err.pdf.numberStart': '起始编号必须是 0 到 99,999 之间的整数。',
  'err.pdf.fontSize72': '字号必须在 6 到 72 之间。',
  'err.pdf.fontSize300': '字号必须在 6 到 300 之间。',
  'err.pdf.margin': '边距必须在 0 到 200 之间。',
  'err.pdf.opacity': '不透明度必须在 5% 到 100% 之间。',
  'err.pdf.angle': '角度必须在 -180 到 180 度之间。',
  'err.pdf.watermarkText': '请输入水印文字。',
  'err.pdf.watermarkLength': '水印文字最多 100 个字符。',
  'err.pdf.imageScale': '图片大小必须为页面宽度的 5% 到 100%。',
  'err.pdf.watermarkImage': '无法读取水印图片。请使用有效的 PNG 或 JPG 文件。',
  'err.pdf.watermarkTile': '水印太小，无法平铺。请使用更大的尺寸或居中布局。',
  'err.pdf.cropOutside': '请在页面内选择裁剪区域。',
  'err.pdf.cropSmall': '第 {page} 页的裁剪区域太小。',

  // PDF: protect and unlock
  'err.pdf.enterPassword': '请输入密码。',
  'err.pdf.passwordLength': '密码最多 127 个字符。',
  'err.pdf.passwordChars': '密码中请只使用标准字母、数字和符号，以便所有 PDF 阅读器都能打开该文件。',
  'err.pdf.alreadyPassword': '此 PDF 已受密码保护。请先用“解锁 PDF”工具将其解锁。',
  'err.pdf.alreadyProtected': '此 PDF 已受保护。请先用“解锁 PDF”工具将其解锁。',
  'err.pdf.unlockUnsupported': '无法解锁此 PDF。它可能使用了不受支持的保护方式。',
  'err.pdf.wrongPassword': '密码不正确。',
  'err.pdf.unlockDamaged': '无法解锁此 PDF。它可能已损坏。',

  // PDF: forms
  'err.pdf.formRead': '无法读取此 PDF 中的表单字段。该文件可能使用了不常见的表单结构。',
  'err.pdf.formFieldChar': '“{name}”的值包含表单字体无法显示的字符。请在此字段中使用普通拉丁字母、数字和常用符号。',
  'err.pdf.formNoField': '此 PDF 中不存在字段“{name}”。',
  'err.pdf.formMaxLength': '“{name}”最多允许 {max} 个字符。',
  'err.pdf.formFillFailed': '无法填写“{name}”：{message}。',
  'err.pdf.formChar': '有一个字段包含表单字体无法显示的字符。请使用普通拉丁字母、数字和常用符号。',
  'err.pdf.formSaveFailed': '无法保存已填写的表单：{message}。',

  // PDF: redact and sign
  'err.pdf.redactNothing': '请至少标记一个要涂黑的区域或搜索词。',
  'err.pdf.signNoPlacement': '请选择签名的放置位置。',
  'err.pdf.signImageUnreadable': '无法读取签名图片。请手绘、键入或上传 PNG 或 JPG 签名。',
  'err.pdf.signOutside': '签名必须位于页面之内。',
} as PartialMessages;
