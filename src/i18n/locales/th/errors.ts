import type { PartialMessages } from '../../en';

export default {
  // Generic
  'err.generic': 'เกิดข้อผิดพลาดบางอย่าง โปรดลองอีกครั้ง',
  'err.unknown': 'ข้อผิดพลาดที่ไม่ทราบสาเหตุ',

  // File validation
  'err.files.limit': 'ถึงขีดจำกัด {max} ไฟล์แล้ว',
  'err.files.unsupportedType': 'ไม่รองรับประเภทไฟล์นี้ ที่ยอมรับ: {types}',
  'err.files.empty': 'ไฟล์ว่างเปล่า',
  'err.files.tooLarge': 'ใหญ่เกินไป ({size}) ขนาดสูงสุดคือ {max}',
  'err.files.onlyOne': 'ใช้ได้ครั้งละหนึ่งไฟล์เท่านั้น',

  // JSON
  'err.json.badUnicode': 'Unicode escape ไม่ถูกต้อง',
  'err.json.badEscape': 'ลำดับ escape ในสตริงไม่ถูกต้อง',
  'err.json.controlChar': 'มีอักขระควบคุมที่ไม่ได้ escape ในสตริง (ใช้ \\n สำหรับการขึ้นบรรทัดใหม่)',
  'err.json.unterminatedString': 'สตริงไม่มีตัวปิด',
  'err.json.invalidNumber': 'ตัวเลขไม่ถูกต้อง',
  'err.json.unexpectedEnd': 'JSON จบอย่างไม่คาดคิด',
  'err.json.trailingComma': 'JSON ไม่อนุญาตให้มีเครื่องหมายจุลภาคท้ายสุด',
  'err.json.propertyName': 'ต้องมีชื่อพร็อพเพอร์ตีอยู่ในเครื่องหมายอัญประกาศคู่',
  'err.json.doubleQuotes': 'สตริงต้องใช้เครื่องหมายอัญประกาศคู่',
  'err.json.unexpectedChar': 'พบอักขระที่ไม่คาดคิด "{char}"',
  'err.json.trailingContent': 'พบเนื้อหาที่ไม่คาดคิดหลังจบค่า JSON',
  'err.json.empty': 'ป้อน JSON เพื่อดำเนินการต่อ',
  'err.json.invalid': 'JSON ไม่ถูกต้อง',

  // XML
  'err.xml.empty': 'ป้อน XML เพื่อดำเนินการต่อ',
  'err.xml.unterminatedComment': 'ความคิดเห็นไม่มีตัวปิด',
  'err.xml.unterminatedPi': 'คำสั่งประมวลผลไม่มีตัวปิด',
  'err.xml.unterminatedDeclaration': 'การประกาศไม่มีตัวปิด',
  'err.xml.unterminatedAttribute': 'ค่าแอตทริบิวต์ไม่มีตัวปิด',
  'err.xml.unterminatedTag': 'แท็กไม่มีตัวปิด',
  'err.xml.unexpectedClosing': 'พบแท็กปิดที่ไม่คาดคิด </{name}>',
  'err.xml.mismatched': 'แท็กปิดไม่ตรงกัน: คาดว่าจะเป็น </{expected}> แต่พบ </{found}>',
  'err.xml.invalidTagName': 'ชื่อแท็กไม่ถูกต้อง "{name}"',
  'err.xml.unclosedTag': 'แท็ก <{name}> ไม่ได้ปิด',
  'err.xml.noElement': 'ไม่พบองค์ประกอบ XML',
  'err.xml.singleRoot': 'เอกสาร XML ต้องมีองค์ประกอบรากเพียงหนึ่งเดียว',
  'err.xml.strayText': 'ไม่อนุญาตให้มีข้อความนอกองค์ประกอบราก',

  // Developer tools
  'err.dev.malformedPercent': 'ข้อความมีลำดับเปอร์เซ็นต์ที่ไม่ถูกต้อง (เช่น "%" ที่ไม่ตามด้วยเลขฐานสิบหกสองหลัก)',
  'err.dev.badBase64': 'นี่ไม่ใช่ Base64 ที่ถูกต้อง ตรวจสอบอักขระที่ขาด เกิน หรือไม่รองรับ',
  'err.dev.notUtf8': 'ข้อมูลที่ถอดรหัสแล้วไม่ใช่ข้อความ UTF-8 ที่ถูกต้อง อาจเป็นข้อมูลไบนารี เช่น รูปภาพ',
  'err.dev.noCharType': 'เลือกประเภทอักขระอย่างน้อยหนึ่งประเภท',
  'err.dev.timestampFormat': 'ป้อนจำนวนวินาทีหรือมิลลิวินาทีนับจาก 1970-01-01 UTC',
  'err.dev.timestampRange': 'timestamp นั้นอยู่นอกช่วงวันที่ที่รองรับ',
  'err.regex.invalid': 'นิพจน์ปกติ (regular expression) ไม่ถูกต้อง',
  'err.regex.timeout': 'รูปแบบนี้ใช้เวลาทำงานนานเกินไปและถูกหยุด อาจทำให้เกิด catastrophic backtracking (เช่น การทำซ้ำซ้อนกันอย่าง (a+)+)',

  // GIF
  'err.gif.noImages': 'เพิ่มรูปภาพอย่างน้อยหนึ่งรูป',
  'err.gif.tooManyFrames': 'GIF มีได้สูงสุด {max} เฟรม',
  'err.gif.sizeNotInteger': 'ขนาด GIF ต้องเป็นจำนวนเต็มของพิกเซล',
  'err.gif.tooLarge': 'GIF ใหญ่เกินไป',
  'err.gif.tooLargeToBuild': 'GIF นี้จะใหญ่เกินกว่าที่เบราว์เซอร์ของคุณจะสร้างได้ ใช้ขนาดที่เล็กลงหรือจำนวนเฟรมที่น้อยลง',
  'err.gif.colours': 'เลือก 16, 32, 64, 128 หรือ 256 สี',
  'err.gif.frameMismatch': 'เฟรมไม่ตรงกับขนาดของ GIF',
  'err.gif.notGif': 'ไม่ใช่ไฟล์ GIF',
  'err.gif.damaged': 'ข้อมูล GIF เสียหาย',
  'err.gif.incomplete': 'ข้อมูล GIF ไม่สมบูรณ์',

  // Images
  'err.image.processingFailed': 'การประมวลผลล้มเหลว',
  'err.image.noCanvas': 'ไม่สามารถสร้างพื้นผิวสำหรับวาดภาพได้ รูปภาพอาจใหญ่เกินไปสำหรับอุปกรณ์นี้',
  'err.image.resultTooBig': 'ผลลัพธ์จะมีขนาด {width} × {height} px ซึ่งใหญ่กว่าที่เครื่องมือบนเบราว์เซอร์นี้สร้างได้อย่างปลอดภัย (สูงสุด {max} px ต่อด้าน)',
  'err.image.watermarkTooSmall': 'ลายน้ำเล็กเกินไปที่จะเรียงต่อกัน ใช้ขนาดที่ใหญ่ขึ้นหรือใช้เครื่องหมายเดียว',
  'err.image.notLarger': 'เลือกขนาดที่ใหญ่กว่าต้นฉบับ ใช้เครื่องมือปรับขนาดรูปภาพเพื่อทำให้รูปภาพเล็กลง',
  'err.image.notSvg': 'ไฟล์นี้ดูไม่เหมือนรูปภาพ SVG',
  'err.image.svgFailed': 'ไม่สามารถวาด SVG นี้ได้ อาจไม่ถูกต้องหรือใช้ฟีเจอร์ที่เบราว์เซอร์ไม่รองรับ',
  'err.image.encodeFailed': 'เบราว์เซอร์ไม่สามารถเข้ารหัสรูปภาพนี้ได้',
  'err.image.formatUnsupported': 'เบราว์เซอร์ของคุณไม่สามารถบันทึกรูปภาพ {format} ได้ ลองใช้รูปแบบเอาต์พุตอื่น หรือ Chrome, Edge หรือ Firefox เวอร์ชันปัจจุบัน',
  'err.image.unreadable': 'ไม่สามารถอ่านไฟล์นี้เป็นรูปภาพได้ ไฟล์อาจเสียหายหรืออยู่ในรูปแบบที่ไม่รองรับ',

  // OCR
  'err.ocr.engineStart': 'ไม่สามารถเริ่มเอนจิน OCR ได้ โหลดหน้าใหม่แล้วลองอีกครั้ง หากยังล้มเหลว เบราว์เซอร์ของคุณอาจไม่รองรับ WebAssembly',

  // Passwords
  'err.passwords.chooseCase': 'เลือกตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก หรือทั้งสองแบบ',
  'err.passwords.length': 'เลือกความยาวระหว่าง {min} ถึง {max}',
  'err.passwords.chooseCategory': 'เลือกหมวดหมู่คำอย่างน้อยหนึ่งหมวด',
  'err.passwords.cannotBuild': 'ไม่สามารถสร้างรหัสผ่านแบบอิงชื่อด้วยการตั้งค่านี้ได้ ลองใช้ความยาวอื่น หรือเปิดใช้ตัวเลขหรือสัญลักษณ์',

  // QR codes
  'err.qr.noText': 'ป้อนข้อความหรือลิงก์ก่อน',
  'err.qr.tooMuchData': 'ข้อมูลมากเกินไปสำหรับรหัส QR ที่ระดับการแก้ไขข้อผิดพลาดนี้ ย่อข้อความให้สั้นลงหรือเลือกระดับที่ต่ำลง',
  'err.qr.badColours': 'เลือกสีที่ถูกต้อง',
  'err.qr.wifiName': 'ป้อนชื่อเครือข่าย',
  'err.qr.wifiPassword': 'ป้อนรหัสผ่าน Wi-Fi หรือเลือก “ไม่มีรหัสผ่าน”',
  'err.qr.email': 'ป้อนที่อยู่อีเมลที่ถูกต้อง',
  'err.qr.phone': 'ป้อนหมายเลขโทรศัพท์เป็นตัวเลข โดยอาจมี + นำหน้าได้',
  'err.qr.unreadableImage': 'ไม่สามารถอ่านรูปภาพนี้ได้ อาจใหญ่เกินไปสำหรับอุปกรณ์นี้',

  // PDF: reading and general
  'err.pdf.onlyOne': 'ใช้ PDF ได้ครั้งละหนึ่งไฟล์เท่านั้น',
  'err.pdf.unreadable': 'ไม่สามารถอ่านไฟล์นี้เป็น PDF ได้ ไฟล์อาจเสียหายหรือไม่ใช่ PDF เลย',
  'err.pdf.passwordProtected': 'PDF นี้ป้องกันด้วยรหัสผ่าน ลบรหัสผ่านด้วยเครื่องมือปลดล็อก PDF ของเราก่อน แล้วลองอีกครั้ง',
  'err.pdf.pageMissing': 'ไม่มีหน้า {page} ในเอกสารนี้',
  'err.pdf.noCanvas': 'เบราว์เซอร์ของคุณไม่สามารถสร้างพื้นผิวสำหรับวาดภาพของหน้านี้ได้',
  'err.pdf.encodePage': 'เบราว์เซอร์ไม่สามารถเข้ารหัสหน้านี้เป็นรูปภาพได้',
  'err.pdf.encodePageImage': 'เบราว์เซอร์ไม่สามารถเข้ารหัสรูปภาพของหน้าได้',
  'err.pdf.renderTooLarge': 'หน้านี้ใหญ่เกินไปที่จะแสดงผลที่ความละเอียดที่เลือก ลองใช้ DPI ที่ต่ำลง',
  'err.pdf.previewTooLarge': 'หน้านี้ใหญ่เกินไปที่จะแสดงตัวอย่าง',
  'err.pdf.flattenTooLarge': 'มีหน้าที่ใหญ่เกินไปที่จะประมวลผลที่คุณภาพนี้ เลือกการตั้งค่าคุณภาพที่ต่ำลง',
  'err.pdf.compareSize': 'รูปภาพทั้งสองต้องมีขนาดเท่ากัน',

  // PDF: merge, split, pages
  'err.pdf.mergeNeedTwo': 'เพิ่มไฟล์ PDF อย่างน้อยสองไฟล์เพื่อรวม',
  'err.pdf.mergeFile': '{name}: {message}',
  'err.pdf.fileN': 'ไฟล์ที่ {n}',
  'err.pdf.selectPage': 'เลือกอย่างน้อยหนึ่งหน้า',
  'err.pdf.selectedPageMissing': 'ไม่มีหน้าที่เลือกใน PDF นี้',
  'err.pdf.enterPages': 'ป้อนหน้าที่คุณต้องการ เช่น 1-3, 5',
  'err.pdf.enterRanges': 'ป้อนช่วงสำหรับแต่ละไฟล์เอาต์พุต เช่น 1-3, 4-6',
  'err.pdf.badRange': '"{token}" ไม่ใช่หน้าหรือช่วงที่ถูกต้อง',
  'err.pdf.rangeOutside.other': '"{token}" อยู่นอกเอกสารนี้ ซึ่งมี {count} หน้า',
  'err.pdf.rangeBackwards': '"{token}" เรียงย้อนกลับ เขียนช่วงจากน้อยไปมาก เช่น {example}',
  'err.pdf.noImages': 'เพิ่มรูปภาพอย่างน้อยหนึ่งรูป',
  'err.pdf.imageEmbed': 'ไม่สามารถฝังรูปภาพรูปใดรูปหนึ่งได้ รูปภาพอาจเสียหายหรือใช้รูปแบบย่อยที่ไม่รองรับ',

  // PDF: editing
  'err.pdf.latinOnly': 'ใช้ได้เฉพาะตัวอักษรละติน ตัวเลข และสัญลักษณ์ทั่วไปที่นี่ เนื่องจากฟอนต์ในตัวของ PDF ไม่รวมอักษรอื่น',
  'err.pdf.badColour': 'เลือกสีที่ถูกต้อง',
  'err.pdf.badPages': 'เลือกหน้าที่ถูกต้อง',
  'err.pdf.numberFirst': 'หน้าแรกที่จะใส่หมายเลขต้องอยู่ระหว่าง 1 ถึง {count}',
  'err.pdf.numberLast': 'หน้าสุดท้ายที่จะใส่หมายเลขต้องอยู่ระหว่าง {from} ถึง {count}',
  'err.pdf.numberStart': 'เริ่มใส่หมายเลขที่จำนวนเต็มตั้งแต่ 0 ถึง 99,999',
  'err.pdf.fontSize72': 'ขนาดฟอนต์ต้องอยู่ระหว่าง 6 ถึง 72',
  'err.pdf.fontSize300': 'ขนาดฟอนต์ต้องอยู่ระหว่าง 6 ถึง 300',
  'err.pdf.margin': 'ระยะขอบต้องอยู่ระหว่าง 0 ถึง 200',
  'err.pdf.opacity': 'ความทึบต้องอยู่ระหว่าง 5% ถึง 100%',
  'err.pdf.angle': 'มุมต้องอยู่ระหว่าง -180 ถึง 180 องศา',
  'err.pdf.watermarkText': 'ป้อนข้อความลายน้ำ',
  'err.pdf.watermarkLength': 'ข้อความลายน้ำยาวได้สูงสุด 100 ตัวอักษร',
  'err.pdf.imageScale': 'ขนาดรูปภาพต้องอยู่ระหว่าง 5% ถึง 100% ของความกว้างหน้า',
  'err.pdf.watermarkImage': 'ไม่สามารถอ่านรูปภาพลายน้ำได้ ใช้ไฟล์ PNG หรือ JPG ที่ถูกต้อง',
  'err.pdf.watermarkTile': 'ลายน้ำเล็กเกินไปที่จะเรียงต่อกัน ใช้ขนาดที่ใหญ่ขึ้นหรือการจัดวางตรงกลาง',
  'err.pdf.cropOutside': 'เลือกพื้นที่ครอบตัดภายในหน้า',
  'err.pdf.cropSmall': 'พื้นที่ครอบตัดเล็กเกินไปในหน้า {page}',

  // PDF: protect and unlock
  'err.pdf.enterPassword': 'ป้อนรหัสผ่าน',
  'err.pdf.passwordLength': 'รหัสผ่านยาวได้สูงสุด 127 ตัวอักษร',
  'err.pdf.passwordChars': 'ใช้เฉพาะตัวอักษร ตัวเลข และสัญลักษณ์มาตรฐานในรหัสผ่าน เพื่อให้โปรแกรมอ่าน PDF ทุกตัวเปิดไฟล์ได้',
  'err.pdf.alreadyPassword': 'PDF นี้ป้องกันด้วยรหัสผ่านอยู่แล้ว ปลดล็อกก่อนด้วยเครื่องมือปลดล็อก PDF',
  'err.pdf.alreadyProtected': 'PDF นี้ได้รับการป้องกันอยู่แล้ว ปลดล็อกก่อนด้วยเครื่องมือปลดล็อก PDF',
  'err.pdf.unlockUnsupported': 'ไม่สามารถปลดล็อก PDF นี้ได้ อาจใช้การป้องกันประเภทที่ไม่รองรับ',
  'err.pdf.wrongPassword': 'รหัสผ่านไม่ถูกต้อง',
  'err.pdf.unlockDamaged': 'ไม่สามารถปลดล็อก PDF นี้ได้ อาจเสียหาย',

  // PDF: forms
  'err.pdf.formRead': 'ไม่สามารถอ่านช่องแบบฟอร์มใน PDF นี้ได้ ไฟล์อาจใช้โครงสร้างแบบฟอร์มที่ไม่ปกติ',
  'err.pdf.formFieldChar': 'ค่าของ “{name}” มีอักขระที่ฟอนต์ของแบบฟอร์มแสดงไม่ได้ ใช้ตัวอักษรละติน ตัวเลข และสัญลักษณ์ทั่วไปในช่องนี้',
  'err.pdf.formNoField': 'ไม่มีช่อง “{name}” ใน PDF นี้',
  'err.pdf.formMaxLength': '“{name}” อนุญาตสูงสุด {max} ตัวอักษร',
  'err.pdf.formFillFailed': 'ไม่สามารถกรอก “{name}” ได้: {message}',
  'err.pdf.formChar': 'มีช่องที่มีอักขระที่ฟอนต์ของแบบฟอร์มแสดงไม่ได้ ใช้ตัวอักษรละติน ตัวเลข และสัญลักษณ์ทั่วไป',
  'err.pdf.formSaveFailed': 'ไม่สามารถบันทึกแบบฟอร์มที่กรอกแล้วได้: {message}',

  // PDF: redact and sign
  'err.pdf.redactNothing': 'ทำเครื่องหมายอย่างน้อยหนึ่งพื้นที่หรือคำค้นหาที่จะปกปิด',
  'err.pdf.signNoPlacement': 'เลือกตำแหน่งที่จะวางลายเซ็น',
  'err.pdf.signImageUnreadable': 'ไม่สามารถอ่านรูปภาพลายเซ็นได้ วาด พิมพ์ หรืออัปโหลดลายเซ็นแบบ PNG หรือ JPG',
  'err.pdf.signOutside': 'ลายเซ็นต้องอยู่ภายในหน้า',
} as PartialMessages;
