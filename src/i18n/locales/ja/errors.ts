import type { PartialMessages } from '../../en';

/** Translations of src/i18n/en/errors.ts. */
export default {
  // Generic
  'err.generic': '問題が発生しました。もう一度お試しください。',
  'err.unknown': '不明なエラー',

  // File validation
  'err.files.limit': 'ファイル数の上限（{max}個）に達しました。',
  'err.files.unsupportedType': '対応していないファイル形式です。対応形式：{types}。',
  'err.files.empty': 'ファイルが空です。',
  'err.files.tooLarge': '大きすぎます（{size}）。上限は{max}です。',
  'err.files.onlyOne': '一度に使用できるファイルは1つだけです。',

  // JSON
  'err.json.badUnicode': '無効なUnicodeエスケープです',
  'err.json.badEscape': '文字列内に無効なエスケープシーケンスがあります',
  'err.json.controlChar': '文字列内にエスケープされていない制御文字があります（改行には \\n を使ってください）',
  'err.json.unterminatedString': '文字列が閉じられていません',
  'err.json.invalidNumber': '無効な数値です',
  'err.json.unexpectedEnd': 'JSONが途中で終わっています',
  'err.json.trailingComma': 'JSONでは末尾のカンマは使用できません',
  'err.json.propertyName': 'ダブルクォートで囲んだプロパティ名が必要です',
  'err.json.doubleQuotes': '文字列にはダブルクォートを使用する必要があります',
  'err.json.unexpectedChar': '予期しない文字「{char}」があります',
  'err.json.trailingContent': 'JSON値の終わりの後に予期しない内容があります',
  'err.json.empty': '続けるにはJSONを入力してください。',
  'err.json.invalid': '無効なJSONです',

  // XML
  'err.xml.empty': '続けるにはXMLを入力してください。',
  'err.xml.unterminatedComment': 'コメントが閉じられていません',
  'err.xml.unterminatedPi': '処理命令が閉じられていません',
  'err.xml.unterminatedDeclaration': '宣言が閉じられていません',
  'err.xml.unterminatedAttribute': '属性値が閉じられていません',
  'err.xml.unterminatedTag': 'タグが閉じられていません',
  'err.xml.unexpectedClosing': '予期しない終了タグ </{name}> があります',
  'err.xml.mismatched': '終了タグが一致しません。</{expected}> が必要ですが、</{found}> が見つかりました',
  'err.xml.invalidTagName': '無効なタグ名「{name}」です',
  'err.xml.unclosedTag': 'タグ <{name}> が閉じられていません',
  'err.xml.noElement': 'XML要素が見つかりません',
  'err.xml.singleRoot': 'XML文書にはルート要素が1つだけ必要です',
  'err.xml.strayText': 'ルート要素の外側にテキストを置くことはできません',

  // Developer tools
  'err.dev.malformedPercent': 'テキストに不正なパーセントエンコードがあります（たとえば「%」の後に16進数が2桁続いていない場合など）。',
  'err.dev.badBase64': '有効なBase64ではありません。文字の不足、余分な文字、非対応の文字がないか確認してください。',
  'err.dev.notUtf8': 'デコードしたデータは有効なUTF-8テキストではありません。画像などのバイナリデータの可能性があります。',
  'err.dev.noCharType': '文字の種類を1つ以上選択してください。',
  'err.dev.timestampFormat': '1970-01-01 UTCからの経過秒数またはミリ秒数を入力してください。',
  'err.dev.timestampRange': 'そのタイムスタンプは、対応している日付の範囲外です。',
  'err.regex.invalid': '無効な正規表現です',
  'err.regex.timeout': 'このパターンは実行に時間がかかりすぎたため、停止されました。壊滅的なバックトラッキング（たとえば (a+)+ のような入れ子の繰り返し）が起きている可能性があります。',

  // GIF
  'err.gif.noImages': '画像を1枚以上追加してください。',
  'err.gif.tooManyFrames': 'GIFのフレーム数は最大{max}です。',
  'err.gif.sizeNotInteger': 'GIFのサイズは整数のピクセル数で指定してください。',
  'err.gif.tooLarge': 'GIFが大きすぎます。',
  'err.gif.tooLargeToBuild': 'このGIFは、ブラウザで作成するには大きすぎます。サイズを小さくするか、フレーム数を減らしてください。',
  'err.gif.colours': '色数は16、32、64、128、256のいずれかを選択してください。',
  'err.gif.frameMismatch': 'フレームがGIFのサイズと一致していません。',
  'err.gif.notGif': 'GIFファイルではありません。',
  'err.gif.damaged': 'GIFのデータが破損しています。',
  'err.gif.incomplete': 'GIFのデータが不完全です。',

  // Images
  'err.image.processingFailed': '処理に失敗しました。',
  'err.image.noCanvas': '描画領域を作成できませんでした。画像がこの端末には大きすぎる可能性があります。',
  'err.image.resultTooBig': '結果が{width} × {height} pxになり、このブラウザツールが安全に作成できる大きさ（1辺あたり最大{max} px）を超えます。',
  'err.image.watermarkTooSmall': '透かしが小さすぎて、並べて配置できません。サイズを大きくするか、単独の透かしにしてください。',
  'err.image.notLarger': '元の画像より大きいサイズを選択してください。画像を小さくするには、画像のリサイズをご利用ください。',
  'err.image.notSvg': 'このファイルはSVG画像ではないようです。',
  'err.image.svgFailed': 'このSVGを描画できませんでした。無効であるか、ブラウザが対応していない機能が使われている可能性があります。',
  'err.image.encodeFailed': 'ブラウザがこの画像をエンコードできませんでした。',
  'err.image.formatUnsupported': 'お使いのブラウザは{format}画像を保存できません。別の出力形式を選ぶか、Chrome、Edge、Firefoxの最新バージョンをお試しください。',
  'err.image.unreadable': 'このファイルを画像として読み込めませんでした。破損しているか、対応していない形式の可能性があります。',

  // OCR
  'err.ocr.engineStart': 'OCRエンジンを起動できませんでした。ページを再読み込みして、もう一度お試しください。それでも失敗する場合は、お使いのブラウザがWebAssemblyに対応していない可能性があります。',

  // Passwords
  'err.passwords.chooseCase': '大文字、小文字、またはその両方を選択してください。',
  'err.passwords.length': '長さは{min}から{max}の間で選択してください。',
  'err.passwords.chooseCategory': '単語のカテゴリを1つ以上選択してください。',
  'err.passwords.cannotBuild': 'この設定では、名前ベースのパスワードを作成できませんでした。長さを変えるか、数字や記号をオンにしてみてください。',

  // QR codes
  'err.qr.noText': '先にテキストまたはリンクを入力してください。',
  'err.qr.tooMuchData': 'この誤り訂正レベルでは、QRコードに入れるにはデータが多すぎます。テキストを短くするか、低いレベルを選択してください。',
  'err.qr.badColours': '有効な色を選択してください。',
  'err.qr.wifiName': 'ネットワーク名を入力してください。',
  'err.qr.wifiPassword': 'Wi-Fiのパスワードを入力するか、「パスワードなし」を選択してください。',
  'err.qr.email': '有効なメールアドレスを入力してください。',
  'err.qr.phone': '電話番号を数字で入力してください。先頭に + を付けることもできます。',
  'err.qr.unreadableImage': 'この画像を読み込めませんでした。この端末には大きすぎる可能性があります。',

  // PDF: reading and general
  'err.pdf.onlyOne': '一度に使用できるPDFは1つだけです。',
  'err.pdf.unreadable': 'このファイルをPDFとして読み込めませんでした。破損しているか、PDFではない可能性があります。',
  'err.pdf.passwordProtected': 'このPDFはパスワードで保護されています。先に「PDFのロック解除」ツールでパスワードを解除してから、もう一度お試しください。',
  'err.pdf.pageMissing': 'この文書に{page}ページ目は存在しません。',
  'err.pdf.noCanvas': 'ブラウザがこのページの描画領域を作成できませんでした。',
  'err.pdf.encodePage': 'ブラウザがこのページを画像としてエンコードできませんでした。',
  'err.pdf.encodePageImage': 'ブラウザがページの画像をエンコードできませんでした。',
  'err.pdf.renderTooLarge': 'このページは、選択した解像度で描画するには大きすぎます。DPIを下げてお試しください。',
  'err.pdf.previewTooLarge': 'このページはプレビューするには大きすぎます。',
  'err.pdf.flattenTooLarge': 'ページが大きすぎて、この品質では処理できません。品質の設定を下げてください。',
  'err.pdf.compareSize': '2つの画像は同じサイズである必要があります。',

  // PDF: merge, split, pages
  'err.pdf.mergeNeedTwo': '結合するには、PDFファイルを2つ以上追加してください。',
  'err.pdf.mergeFile': '{name}：{message}',
  'err.pdf.fileN': 'ファイル{n}',
  'err.pdf.selectPage': 'ページを1つ以上選択してください。',
  'err.pdf.selectedPageMissing': '選択したページが、このPDFに存在しません。',
  'err.pdf.enterPages': '必要なページを入力してください。例：1-3, 5',
  'err.pdf.enterRanges': '出力ファイルごとの範囲を入力してください。例：1-3, 4-6',
  'err.pdf.badRange': '「{token}」は有効なページまたは範囲ではありません。',
  'err.pdf.rangeOutside.other': '「{token}」は、{count}ページしかないこの文書の範囲外です。',
  'err.pdf.rangeBackwards': '「{token}」は逆順です。範囲は小さい方から大きい方へ、{example}のように書いてください。',
  'err.pdf.noImages': '画像を1枚以上追加してください。',
  'err.pdf.imageEmbed': '画像のうち1枚を埋め込めませんでした。破損しているか、対応していない種類の可能性があります。',

  // PDF: editing
  'err.pdf.latinOnly': 'PDFの標準フォントにはほかの文字体系が含まれていないため、ここではラテン文字、数字、一般的な記号のみ使用できます。',
  'err.pdf.badColour': '有効な色を選択してください。',
  'err.pdf.badPages': '有効なページを選択してください。',
  'err.pdf.numberFirst': '番号を付ける最初のページは、1から{count}の間で指定してください。',
  'err.pdf.numberLast': '番号を付ける最後のページは、{from}から{count}の間で指定してください。',
  'err.pdf.numberStart': '開始番号は、0から99,999までの整数で指定してください。',
  'err.pdf.fontSize72': 'フォントサイズは6から72の間で指定してください。',
  'err.pdf.fontSize300': 'フォントサイズは6から300の間で指定してください。',
  'err.pdf.margin': '余白は0から200の間で指定してください。',
  'err.pdf.opacity': '不透明度は5%から100%の間で指定してください。',
  'err.pdf.angle': '角度は-180度から180度の間で指定してください。',
  'err.pdf.watermarkText': '透かしのテキストを入力してください。',
  'err.pdf.watermarkLength': '透かしのテキストは100文字までです。',
  'err.pdf.imageScale': '画像サイズは、ページ幅の5%から100%の間で指定してください。',
  'err.pdf.watermarkImage': '透かしの画像を読み込めませんでした。有効なPNGまたはJPGファイルを使用してください。',
  'err.pdf.watermarkTile': '透かしが小さすぎて、並べて配置できません。サイズを大きくするか、中央配置のレイアウトにしてください。',
  'err.pdf.cropOutside': 'ページ内に収まるトリミング範囲を選択してください。',
  'err.pdf.cropSmall': '{page}ページ目のトリミング範囲が小さすぎます。',

  // PDF: protect and unlock
  'err.pdf.enterPassword': 'パスワードを入力してください。',
  'err.pdf.passwordLength': 'パスワードは127文字までです。',
  'err.pdf.passwordChars': 'どのPDFリーダーでもファイルを開けるよう、パスワードには標準的な文字、数字、記号のみを使用してください。',
  'err.pdf.alreadyPassword': 'このPDFはすでにパスワードで保護されています。先に「PDFのロック解除」ツールで解除してください。',
  'err.pdf.alreadyProtected': 'このPDFはすでに保護されています。先に「PDFのロック解除」ツールで解除してください。',
  'err.pdf.unlockUnsupported': 'このPDFのロックを解除できませんでした。対応していない種類の保護が使われている可能性があります。',
  'err.pdf.wrongPassword': 'パスワードが正しくありません。',
  'err.pdf.unlockDamaged': 'このPDFのロックを解除できませんでした。破損している可能性があります。',

  // PDF: forms
  'err.pdf.formRead': 'このPDFのフォーム欄を読み込めませんでした。特殊なフォーム構造が使われている可能性があります。',
  'err.pdf.formFieldChar': '「{name}」の値に、フォームのフォントで表示できない文字が含まれています。この欄には、ラテン文字、数字、一般的な記号を使用してください。',
  'err.pdf.formNoField': '欄「{name}」は、このPDFに存在しません。',
  'err.pdf.formMaxLength': '「{name}」は最大{max}文字までです。',
  'err.pdf.formFillFailed': '「{name}」に入力できませんでした：{message}。',
  'err.pdf.formChar': '欄に、フォームのフォントで表示できない文字が含まれています。ラテン文字、数字、一般的な記号を使用してください。',
  'err.pdf.formSaveFailed': '入力したフォームを保存できませんでした：{message}。',

  // PDF: redact and sign
  'err.pdf.redactNothing': '黒塗りする範囲または検索語を1つ以上指定してください。',
  'err.pdf.signNoPlacement': '署名を配置する場所を選択してください。',
  'err.pdf.signImageUnreadable': '署名の画像を読み込めませんでした。PNGまたはJPGの署名を、手書き、入力、またはアップロードで用意してください。',
  'err.pdf.signOutside': '署名はページ内に収まる必要があります。',
} as PartialMessages;
