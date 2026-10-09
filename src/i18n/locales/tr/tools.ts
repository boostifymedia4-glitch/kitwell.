import type { ToolTextMap } from '../../toolText';

/** Translated names, descriptions, steps, FAQ and limits of the tools, keyed by tool slug. */
const tools: ToolTextMap = {
  'jpg-to-png': {
    name: 'JPG’den PNG’ye',
    description: 'JPG ve JPEG fotoğraflarını tek tıkla kayıpsız PNG görsellerine dönüştürün.',
    metaDescription: 'JPG’yi çevrimiçi ve ücretsiz olarak PNG’ye dönüştürün. JPEG fotoğraflarını doğrudan tarayıcınızda toplu çevirin; yükleme ve üyelik gerekmez.',
    steps: [
      'Bir veya daha fazla JPG dosyasını araca sürükleyin ya da cihazınızdan seçin.',
      'Önizlemeleri kontrol edin, ardından Dönüştür’e basın.',
      'Her PNG’yi ayrı ayrı veya hepsini ZIP olarak indirin.',
    ],
    faq: [
      {
        q: 'JPG’yi PNG’ye dönüştürmek kaliteyi artırır mı?',
        a: 'Hayır. JPG kayıplıdır; JPG kaydedilirken atılan ayrıntılar geri getirilemez. PNG yalnızca mevcut pikselleri ek kayıp olmadan saklar, bu da düzenleme veya saydamlık çalışmaları için kullanışlıdır.',
      },
      {
        q: 'PNG neden JPG’den daha büyük?',
        a: 'PNG kayıpsızdır ve fotoğrafları genellikle JPG’den daha verimsiz saklar. Dosya boyutu birebir piksellerden daha önemliyse JPG veya WebP kullanın.',
      },
      {
        q: 'Görsellerim bir sunucuya yükleniyor mu?',
        a: 'Hayır. Görsel, tarayıcınız tarafından Canvas API kullanılarak çözülür ve yeniden kodlanır. Bu araç dosyayı hiçbir yere göndermez.',
      },
    ],
    limits: [
      'Animasyonlu GIF veya WebP dosyaları yalnızca ilk karesi kullanılarak dönüştürülür.',
      'Tarayıcınızın yanıt vermeye devam etmesi için dosya başına en fazla 25 MB ve toplu işlemde en fazla 20 dosya.',
      'EXIF üst verileri ve gömülü renk profilleri korunmaz.',
    ],
  },
  'png-to-jpg': {
    name: 'PNG’den JPG’ye',
    description: 'PNG görsellerini ayarlanabilir kaliteyle daha küçük JPG dosyalarına dönüştürün.',
    metaDescription: 'PNG’yi çevrimiçi ve ücretsiz olarak JPG’ye dönüştürün. Kaliteyi ve saydam görseller için arka plan rengini seçin. Tarayıcınızda işlenir.',
    steps: [
      'PNG dosyalarınızı ekleyin.',
      'JPG kalitesini ve saydam alanları doldurmak için kullanılacak arka plan rengini ayarlayın.',
      'Dönüştür’e basın ve sonuçları indirin.',
    ],
    faq: [
      {
        q: 'Saydam alanlara ne olur?',
        a: 'JPG saydamlığı desteklemez; bu yüzden saydam pikseller seçtiğiniz arka plan rengiyle doldurulur (varsayılan beyazdır).',
      },
      {
        q: 'Hangi kalite ayarını kullanmalıyım?',
        a: 'Çoğu görsel için 80–90 iyi bir dengedir. Yaklaşık 60’ın altında metinlerde ve keskin kenarlarda sıkıştırma kusurları görünür hale gelir.',
      },
      {
        q: 'Görsellerim bir sunucuya yükleniyor mu?',
        a: 'Hayır. Görsel, tarayıcınız tarafından Canvas API kullanılarak çözülür ve yeniden kodlanır. Bu araç dosyayı hiçbir yere göndermez.',
      },
    ],
    limits: [
      'Animasyonlu GIF veya WebP dosyaları yalnızca ilk karesi kullanılarak dönüştürülür.',
      'Tarayıcınızın yanıt vermeye devam etmesi için dosya başına en fazla 25 MB ve toplu işlemde en fazla 20 dosya.',
      'EXIF üst verileri ve gömülü renk profilleri korunmaz.',
      'JPG saydamlığı saklayamadığı için saydamlık düz bir renge dönüştürülür.',
    ],
  },
  'jpg-to-webp': {
    name: 'JPG’den WebP’ye',
    description: 'JPG fotoğraflarını modern WebP biçimine dönüştürerek dosyaları küçültün ve sayfaları hızlandırın.',
    metaDescription: 'JPG’yi çevrimiçi ve ücretsiz olarak WebP’ye dönüştürün. Fotoğrafları web için ayarlanabilir kaliteyle küçültün; tarayıcınızda yerel olarak işlenir.',
    steps: [
      'JPG dosyalarınızı ekleyin.',
      'Bir WebP kalitesi seçin (80 makul bir varsayılandır).',
      'Dönüştürün ve indirin.',
    ],
    faq: [
      {
        q: 'WebP, JPG’den küçük müdür?',
        a: 'Benzer görsel kalitede genellikle %20–35 daha küçüktür; ancak sonuç görsele göre değişir.',
      },
      {
        q: 'Her tarayıcı WebP’yi destekler mi?',
        a: 'Güncel tüm büyük tarayıcılar WebP görüntüleyebilir. Tarayıcıda WebP kodlama Chrome, Edge, Firefox ve yeni Safari sürümlerinde desteklenir; sizinki desteklemiyorsa araç hatalı bir dosya üretmek yerine bunu size bildirir.',
      },
      {
        q: 'Görsellerim bir sunucuya yükleniyor mu?',
        a: 'Hayır. Görsel, tarayıcınız tarafından Canvas API kullanılarak çözülür ve yeniden kodlanır. Bu araç dosyayı hiçbir yere göndermez.',
      },
    ],
    limits: [
      'Animasyonlu GIF veya WebP dosyaları yalnızca ilk karesi kullanılarak dönüştürülür.',
      'Tarayıcınızın yanıt vermeye devam etmesi için dosya başına en fazla 25 MB ve toplu işlemde en fazla 20 dosya.',
      'EXIF üst verileri ve gömülü renk profilleri korunmaz.',
      'Tarayıcınız WebP kodlamasını desteklemelidir; desteklemeyen tarayıcılar hata gösterir.',
    ],
  },
  'png-to-webp': {
    name: 'PNG’den WebP’ye',
    description: 'PNG görsellerini WebP’ye dönüştürün; saydamlığı koruyup boyutu çok daha küçültün.',
    metaDescription: 'PNG’yi çevrimiçi ve ücretsiz olarak WebP’ye dönüştürün. Saydamlık korunur, dosya boyutu küçülür ve her şey tarayıcınızda çalışır.',
    steps: [
      'PNG dosyalarınızı ekleyin.',
      'WebP kalitesini seçin.',
      'Dönüştürün ve indirin.',
    ],
    faq: [
      {
        q: 'Saydamlık korunuyor mu?',
        a: 'Evet. WebP alfa kanalını desteklediği için saydam PNG’ler saydam kalır.',
      },
      {
        q: 'Kayıpsız bir sonuç alabilir miyim?',
        a: 'En yüksek doğruluk için kaliteyi 100 yapın. Tarayıcılar WebP’yi kayıplı olarak kodlar; bu nedenle matematiksel olarak birebir bir kopya gerekiyorsa PNG kullanın.',
      },
      {
        q: 'Görsellerim bir sunucuya yükleniyor mu?',
        a: 'Hayır. Görsel, tarayıcınız tarafından Canvas API kullanılarak çözülür ve yeniden kodlanır. Bu araç dosyayı hiçbir yere göndermez.',
      },
    ],
    limits: [
      'Animasyonlu GIF veya WebP dosyaları yalnızca ilk karesi kullanılarak dönüştürülür.',
      'Tarayıcınızın yanıt vermeye devam etmesi için dosya başına en fazla 25 MB ve toplu işlemde en fazla 20 dosya.',
      'EXIF üst verileri ve gömülü renk profilleri korunmaz.',
      'Tarayıcınız WebP kodlamasını desteklemelidir; desteklemeyen tarayıcılar hata gösterir.',
    ],
  },
  'webp-to-jpg': {
    name: 'WebP’den JPG’ye',
    description: 'WebP görsellerini geniş uyumluluğa sahip JPG dosyalarına dönüştürün.',
    metaDescription: 'WebP’yi çevrimiçi ve ücretsiz olarak JPG’ye dönüştürün. WebP görsellerini her yerde kullanılabilir hale getirin; tarayıcınızda yerel olarak dönüştürülür.',
    steps: [
      'WebP dosyalarınızı ekleyin.',
      'Kaliteyi ve saydam alanlar için arka plan rengini ayarlayın.',
      'Dönüştürün ve indirin.',
    ],
    faq: [
      {
        q: 'WebP neden JPG’ye dönüştürülür?',
        a: 'Bazı eski yazılımlar, e-posta istemcileri ve yükleme formları hâlâ WebP’yi kabul etmez. JPG neredeyse her yerde kabul edilir.',
      },
      {
        q: 'Görsellerim bir sunucuya yükleniyor mu?',
        a: 'Hayır. Görsel, tarayıcınız tarafından Canvas API kullanılarak çözülür ve yeniden kodlanır. Bu araç dosyayı hiçbir yere göndermez.',
      },
    ],
    limits: [
      'Animasyonlu GIF veya WebP dosyaları yalnızca ilk karesi kullanılarak dönüştürülür.',
      'Tarayıcınızın yanıt vermeye devam etmesi için dosya başına en fazla 25 MB ve toplu işlemde en fazla 20 dosya.',
      'EXIF üst verileri ve gömülü renk profilleri korunmaz.',
      'JPG saydamlığı saklayamadığı için saydamlık düz bir renge dönüştürülür.',
    ],
  },
  'webp-to-png': {
    name: 'WebP’den PNG’ye',
    description: 'WebP görsellerini saydamlığı koruyarak kayıpsız PNG’ye dönüştürün.',
    metaDescription: 'WebP’yi çevrimiçi ve ücretsiz olarak PNG’ye dönüştürün. Saydamlık korunur ve her şey yükleme yapılmadan tarayıcınızda çalışır.',
    steps: [
      'WebP dosyalarınızı ekleyin.',
      'Dönüştür’e basın.',
      'PNG dosyalarını indirin.',
    ],
    faq: [
      {
        q: 'Saydamlık korunuyor mu?',
        a: 'Evet. PNG saydamlığı desteklediği için WebP’deki alfa kanalı aktarılır.',
      },
      {
        q: 'Görsellerim bir sunucuya yükleniyor mu?',
        a: 'Hayır. Görsel, tarayıcınız tarafından Canvas API kullanılarak çözülür ve yeniden kodlanır. Bu araç dosyayı hiçbir yere göndermez.',
      },
    ],
    limits: [
      'Animasyonlu GIF veya WebP dosyaları yalnızca ilk karesi kullanılarak dönüştürülür.',
      'Tarayıcınızın yanıt vermeye devam etmesi için dosya başına en fazla 25 MB ve toplu işlemde en fazla 20 dosya.',
      'EXIF üst verileri ve gömülü renk profilleri korunmaz.',
    ],
  },
  'image-compressor': {
    name: 'Görsel Sıkıştırıcı',
    description: 'Görsel dosya boyutunu ayarlanabilir kaliteyle küçültün ve tam olarak ne kadar kazandığınızı görün.',
    metaDescription: 'JPG, PNG ve WebP görsellerini çevrimiçi ve ücretsiz sıkıştırın. Kaliteyi ayarlayın, isterseniz boyutları sınırlayın ve dosya boyutlarını karşılaştırın. Tarayıcınızda çalışır.',
    steps: [
      'Görsellerinizi ekleyin.',
      'Bir çıktı biçimi ve kalite seçin; isterseniz en büyük genişlik veya yükseklik de belirleyin.',
      'Sıkıştırın, önceki ve sonraki boyutları karşılaştırın, ardından indirin.',
    ],
    faq: [
      {
        q: 'Sıkıştırıcı boyutu nasıl küçültüyor?',
        a: 'Görseli seçtiğiniz kaliteyle yeniden kodlar ve isterse küçültür de. PNG çıktısı kayıpsız olduğundan, yalnızca boyutları da azalttığınızda küçülür.',
      },
      {
        q: 'Sonuç orijinalden büyük çıkarsa ne olur?',
        a: 'Önceden optimize edilmiş dosyalarda bu olabilir. Araç bunu işaretler, böylece orijinali saklamayı tercih edebilirsiniz.',
      },
      {
        q: 'EXIF veya konum verileri korunuyor mu?',
        a: 'Hayır. Canvas üzerinden yeniden kodlama, kamera modeli ve GPS konumu gibi EXIF üst verilerini siler; bu, bir fotoğrafı paylaşmadan önce çoğu zaman istediğiniz şeydir. Renk profilleri de korunmaz.',
      },
    ],
    limits: [
      'Animasyonlu GIF veya WebP dosyaları yalnızca ilk karesi kullanılarak dönüştürülür.',
      'Tarayıcınızın yanıt vermeye devam etmesi için dosya başına en fazla 25 MB ve toplu işlemde en fazla 20 dosya.',
      'EXIF üst verileri ve gömülü renk profilleri korunmaz.',
      'En iyi sonuçlar JPG veya WebP çıktısıyla alınır; PNG çıktısı kayıpsızdır ve küçülmeyebilir.',
    ],
  },
  'image-resizer': {
    name: 'Görsel Boyutlandırıcı',
    description: 'Görselleri en boy oranını koruyarak tam piksel veya yüzde değeriyle yeniden boyutlandırın.',
    metaDescription: 'Görselleri çevrimiçi ve ücretsiz yeniden boyutlandırın. Tam genişlik ve yükseklik ya da yüzde belirleyin, en boy oranını koruyun; JPG, PNG veya WebP indirin.',
    steps: [
      'Bir veya daha fazla görsel ekleyin.',
      'Piksel veya yüzde seçin ve yeni boyutu girin. Bozulmayı önlemek için en boy oranı kilidini açık tutun.',
      'Yeniden boyutlandırın ve indirin.',
    ],
    faq: [
      {
        q: 'Bir görseli büyütebilir miyim?',
        a: 'Evet; ancak büyütme ayrıntı ekleyemez, bu yüzden sonuç daha yumuşak görünür. En iyi kalite küçültmede elde edilir.',
      },
      {
        q: 'En büyük çıktı boyutu nedir?',
        a: 'Tarayıcılar canvas boyutunu sınırlar. Bu araç çıktıyı kenar başına 16.000 piksel ve yaklaşık 100 megapiksel ile sınırlar.',
      },
      {
        q: 'EXIF veya konum verileri korunuyor mu?',
        a: 'Hayır. Canvas üzerinden yeniden kodlama, kamera modeli ve GPS konumu gibi EXIF üst verilerini siler; bu, bir fotoğrafı paylaşmadan önce çoğu zaman istediğiniz şeydir. Renk profilleri de korunmaz.',
      },
    ],
    limits: [
      'Animasyonlu GIF veya WebP dosyaları yalnızca ilk karesi kullanılarak dönüştürülür.',
      'Tarayıcınızın yanıt vermeye devam etmesi için dosya başına en fazla 25 MB ve toplu işlemde en fazla 20 dosya.',
      'EXIF üst verileri ve gömülü renk profilleri korunmaz.',
      'Çıktı kenar başına 16.000 pikselle sınırlıdır.',
    ],
  },
  'image-cropper': {
    name: 'Görsel Kırpıcı',
    description: 'Bir görseli canlı önizlemeyle tam bir bölgeye veya sabit bir en boy oranına göre kırpın.',
    metaDescription: 'Görselleri çevrimiçi ve ücretsiz kırpın. Canlı önizlemeyle sabit bir en boy oranı seçin ya da tam piksel değerleri girin. Tarayıcınızda işlenir.',
    steps: [
      'Bir görsel ekleyin.',
      'Bir en boy oranı seçin veya kırpma kutusunu sürükleyin, ardından konumu ve boyutu sayısal alanlarla ince ayarlayın.',
      'Kırp’a basın ve indirin.',
    ],
    faq: [
      {
        q: 'Kırpma kaliteyi düşürür mü?',
        a: 'Kırpma orijinal pikselleri korur. Kalite yalnızca JPG veya WebP olarak daha düşük kalite ayarıyla kaydederseniz değişir.',
      },
      {
        q: 'Görsellerim bir sunucuya yükleniyor mu?',
        a: 'Hayır. Görsel, tarayıcınız tarafından Canvas API kullanılarak çözülür ve yeniden kodlanır. Bu araç dosyayı hiçbir yere göndermez.',
      },
    ],
    limits: [
      'Aynı anda tek görsel.',
      'Dosya başına en fazla 25 MB.',
      'Animasyonlu görsellerde ilk kare kullanılır.',
    ],
  },
  'image-rotator': {
    name: 'Görsel Döndürücü',
    description: 'Görselleri 90°, 180°, 270° veya istediğiniz herhangi bir açıyla döndürün.',
    metaDescription: 'Görselleri çevrimiçi ve ücretsiz döndürün. Fotoğrafları 90, 180 veya 270 derece ya da özel bir açıyla doğrudan tarayıcınızda çevirin.',
    steps: [
      'Görsellerinizi ekleyin.',
      'Bir döndürme seçin veya özel bir açı yazın.',
      'Uygulayın ve indirin.',
    ],
    faq: [
      {
        q: 'Dik açı olmayan döndürmelerde ne olur?',
        a: 'Canvas, döndürülen görsele sığacak şekilde büyür. JPG çıktısında boş köşeler seçtiğiniz arka planla doldurulur; PNG ve WebP bunları saydam bırakır.',
      },
      {
        q: 'Görsellerim bir sunucuya yükleniyor mu?',
        a: 'Hayır. Görsel, tarayıcınız tarafından Canvas API kullanılarak çözülür ve yeniden kodlanır. Bu araç dosyayı hiçbir yere göndermez.',
      },
    ],
    limits: [
      'Animasyonlu GIF veya WebP dosyaları yalnızca ilk karesi kullanılarak dönüştürülür.',
      'Tarayıcınızın yanıt vermeye devam etmesi için dosya başına en fazla 25 MB ve toplu işlemde en fazla 20 dosya.',
      'EXIF üst verileri ve gömülü renk profilleri korunmaz.',
    ],
  },
  'image-flipper': {
    name: 'Görsel Çevirici',
    description: 'Görselleri yatay veya dikey olarak yansıtın.',
    metaDescription: 'Görselleri çevrimiçi ve ücretsiz yatay veya dikey çevirin. Fotoğrafları yükleme yapmadan tarayıcınızda yansıtın.',
    steps: [
      'Görsellerinizi ekleyin.',
      'Yatay, dikey veya her ikisini seçin.',
      'Uygulayın ve indirin.',
    ],
    faq: [
      {
        q: 'Yatay ve dikey çevirme arasındaki fark nedir?',
        a: 'Yatay çevirme, bir ayna gibi sol ile sağı yansıtır. Dikey çevirme ise görseli yatay ekseni boyunca baş aşağı çevirir.',
      },
      {
        q: 'Görsellerim bir sunucuya yükleniyor mu?',
        a: 'Hayır. Görsel, tarayıcınız tarafından Canvas API kullanılarak çözülür ve yeniden kodlanır. Bu araç dosyayı hiçbir yere göndermez.',
      },
    ],
    limits: [
      'Animasyonlu GIF veya WebP dosyaları yalnızca ilk karesi kullanılarak dönüştürülür.',
      'Tarayıcınızın yanıt vermeye devam etmesi için dosya başına en fazla 25 MB ve toplu işlemde en fazla 20 dosya.',
      'EXIF üst verileri ve gömülü renk profilleri korunmaz.',
    ],
  },
  'image-format-converter': {
    name: 'Görsel Biçim Dönüştürücü',
    description: 'JPG, PNG ve WebP arasında tek bir esnek araçla dönüştürme yapın.',
    metaDescription: 'Görselleri JPG, PNG ve WebP arasında çevrimiçi ve ücretsiz dönüştürün. Çıktı biçimini ve kaliteyi seçin; tarayıcınızda yerel olarak işlenir.',
    steps: [
      'Desteklenen herhangi bir biçimdeki görselleri ekleyin.',
      'Çıktı biçimini ve kaliteyi seçin.',
      'Dönüştürün ve indirin.',
    ],
    faq: [
      {
        q: 'Hangi biçimleri kullanabilirim?',
        a: 'Girdi: JPG, PNG, WebP, GIF, BMP ve tarayıcınız çözebiliyorsa AVIF. Çıktı: JPG, PNG ve WebP.',
      },
      {
        q: 'HEIC veya TIFF ne olacak?',
        a: 'Tarayıcılar HEIC veya TIFF’i yerel olarak çözemez; bu nedenle şimdilik desteklenmiyorlar.',
      },
      {
        q: 'Görsellerim bir sunucuya yükleniyor mu?',
        a: 'Hayır. Görsel, tarayıcınız tarafından Canvas API kullanılarak çözülür ve yeniden kodlanır. Bu araç dosyayı hiçbir yere göndermez.',
      },
    ],
    limits: [
      'Animasyonlu GIF veya WebP dosyaları yalnızca ilk karesi kullanılarak dönüştürülür.',
      'Tarayıcınızın yanıt vermeye devam etmesi için dosya başına en fazla 25 MB ve toplu işlemde en fazla 20 dosya.',
      'EXIF üst verileri ve gömülü renk profilleri korunmaz.',
      'HEIC/HEIF, TIFF ve RAW dosyaları desteklenmez.',
    ],
  },
  'image-to-base64': {
    name: 'Görselden Base64’e',
    description: 'Bir görseli CSS, HTML veya JSON için Base64 data URI olarak kodlayın.',
    metaDescription: 'Bir görseli çevrimiçi ve ücretsiz Base64 dizesine veya data URI’ye dönüştürün. Hazır HTML ve CSS kod parçalarını kopyalayın. Tarayıcınızda çalışır.',
    steps: [
      'Bir görsel ekleyin.',
      'Çıktı stilini seçin: data URI, ham Base64, HTML <img> veya CSS.',
      'Sonucu kopyalayın.',
    ],
    faq: [
      {
        q: 'Base64 görselleri ne zaman kullanmalıyım?',
        a: 'Ek bir isteğin, yaklaşık %33’lük boyut artışından daha pahalıya geldiği CSS veya e-postalardaki küçük simgeler için. Büyük fotoğraflarda kullanmaktan kaçının.',
      },
      {
        q: 'Görsellerim bir sunucuya yükleniyor mu?',
        a: 'Hayır. Görsel, tarayıcınız tarafından Canvas API kullanılarak çözülür ve yeniden kodlanır. Bu araç dosyayı hiçbir yere göndermez.',
      },
    ],
    limits: [
      'Base64 metni çok büyüdüğü için görsel başına en fazla 5 MB.',
      'Aynı anda tek görsel.',
    ],
  },
  'base64-to-image': {
    name: 'Base64’ten Görsele',
    description: 'Bir Base64 dizesini veya data URI’yi indirilebilir bir görsele geri çözün.',
    metaDescription: 'Bir Base64 dizesini veya data URI’yi çevrimiçi ve ücretsiz görsele dönüştürün. Çözülen PNG, JPG, WebP veya GIF dosyasını önizleyin ve indirin.',
    steps: [
      'Bir Base64 dizesi veya tam bir data URI yapıştırın.',
      'Görsel anında çözülür ve önizlenir.',
      'Görseli indirin.',
    ],
    faq: [
      {
        q: '“data:image/png;base64,” önekine ihtiyacım var mı?',
        a: 'Hayır. Önek yoksa araç biçimi dosya imzasından algılar (PNG, JPG, GIF, WebP).',
      },
      {
        q: 'Neden hata alıyorum?',
        a: 'Dize büyük olasılıkla eksik, fazladan karakterler içeriyor veya bir görsel değil. SVG verileri de güvenlik nedeniyle burada reddedilir.',
      },
    ],
    limits: [
      'PNG, JPG, GIF ve WebP desteklenir. SVG bilerek görüntülenmez.',
      'Çözülmüş veri için en fazla 10 MB.',
    ],
  },
  'image-color-picker': {
    name: 'Görselden Renk Seçici',
    description: 'Herhangi bir görselden tam renkleri seçin ve baskın renk paletini çıkarın.',
    metaDescription: 'Bir görselden çevrimiçi ve ücretsiz renk seçin. HEX, RGB ve HSL değerleri için herhangi bir piksele tıklayın ve baskın renk paletini çıkarın.',
    steps: [
      'Bir görsel ekleyin.',
      'Bir piksel örneklemek için görselin üzerinde herhangi bir yere tıklayın ya da dokunun (veya ok tuşlarını kullanın).',
      'HEX, RGB veya HSL değerini kopyalayın ya da çıkarılan paletten kopyalayın.',
    ],
    faq: [
      {
        q: 'Palet nasıl hesaplanıyor?',
        a: 'Görselin çözünürlüğü düşürülür ve renkleri gruplara ayrılır; en yaygın gruplar gösterilir. Bu, baskın renklerin bir yaklaşımıdır, eksiksiz bir liste değildir.',
      },
      {
        q: 'Görsellerim bir sunucuya yükleniyor mu?',
        a: 'Hayır. Görsel, tarayıcınız tarafından Canvas API kullanılarak çözülür ve yeniden kodlanır. Bu araç dosyayı hiçbir yere göndermez.',
      },
    ],
    limits: [
      'Aynı anda tek görsel.',
      'Renkler görüntülenen sRGB piksellerinden örneklenir; renk profilleri yok sayılır.',
    ],
  },
  'image-watermark': {
    name: 'Görsele Filigran Ekle',
    description: 'Birçok görsele aynı anda tek veya döşenmiş metin ya da logo filigranı ekleyin.',
    metaDescription: 'Görsellere çevrimiçi ve ücretsiz filigran ekleyin. JPG, PNG ve WebP fotoğraflarına toplu olarak metin veya logo basın; opaklık ve konum ayarlanabilir. Tarayıcınızda çalışır.',
    steps: [
      'Görsellerinizi ekleyin.',
      'Metin veya logo seçin, ardından boyutunu, opaklığını, konumunu ve düzenini ayarlayın.',
      'Uygulayın ve sonuçları ya da bir ZIP dosyasını indirin.',
    ],
    faq: [
      {
        q: 'Urduca veya başka alfabeler kullanabilir miyim?',
        a: 'Evet. Görsel filigranlar cihazınızın yazı tiplerini kullanır; sisteminizin gösterebildiği her yazı sistemi çalışır.',
      },
      {
        q: 'Orijinallerimi değiştiriyor mu?',
        a: 'Hayır. Filigranlı kopyalar yeni dosyalar olarak kaydedilir.',
      },
      {
        q: 'EXIF veya konum verileri korunuyor mu?',
        a: 'Hayır. Canvas üzerinden yeniden kodlama, kamera modeli ve GPS konumu gibi EXIF üst verilerini siler; bu, bir fotoğrafı paylaşmadan önce çoğu zaman istediğiniz şeydir. Renk profilleri de korunmaz.',
      },
    ],
    limits: [
      'Animasyonlu GIF veya WebP dosyaları yalnızca ilk karesi kullanılarak dönüştürülür.',
      'Tarayıcınızın yanıt vermeye devam etmesi için dosya başına en fazla 25 MB ve toplu işlemde en fazla 20 dosya.',
      'EXIF üst verileri ve gömülü renk profilleri korunmaz.',
      'Logo dosyaları: PNG, JPG veya WebP, en fazla 25 MB.',
    ],
  },
  'svg-converter': {
    name: 'SVG’den PNG / JPG’ye',
    description: 'SVG vektör grafiklerini istediğiniz boyutta PNG, JPG veya WebP görsellerine dönüştürün.',
    metaDescription: 'SVG’yi çevrimiçi ve ücretsiz PNG veya JPG’ye dönüştürün. Keskin sonuçlar için ölçek ya da tam genişlik seçin; PNG saydamlığı korur. Tarayıcınızda çalışır.',
    steps: [
      'SVG dosyalarınızı ekleyin.',
      'PNG, JPG veya WebP’yi ve çıktı boyutunu seçin.',
      'Dönüştürün ve indirin.',
    ],
    faq: [
      {
        q: 'Görsel büyük boyutlarda keskin kalır mı?',
        a: 'Evet. SVG seçtiğiniz boyutta çizilir; bu yüzden 4× dışa aktarım 1× kadar net olur.',
      },
      {
        q: 'SVG’m neden farklı görünüyor?',
        a: 'Tarayıcılar her SVG özelliğini desteklemez; harici yazı tiplerine veya görsellere dayanan SVG’ler varsayılanlara döner. En iyi sonuç için yazı tiplerini ve görselleri SVG’nin içine gömün.',
      },
      {
        q: 'SVG dosyalarını burada açmak güvenli mi?',
        a: 'Evet. SVG bir resim olarak çizilir, bu yüzden içindeki komut dosyaları çalışmaz.',
      },
      {
        q: 'Görsellerim bir sunucuya yükleniyor mu?',
        a: 'Hayır. Görsel, tarayıcınız tarafından Canvas API kullanılarak çözülür ve yeniden kodlanır. Bu araç dosyayı hiçbir yere göndermez.',
      },
    ],
    limits: [
      'Dosya başına en fazla 25 MB ve toplu işlemde en fazla 20 dosya.',
      'SVG’nin dışından bağlanan yazı tipleri, görseller ve stiller yüklenmez.',
      'Boyutu olmayan bir SVG viewBox değerini, o da yoksa 300 × 150 px boyutunu kullanır.',
    ],
  },
  'enlarge-image': {
    name: 'Görseli Büyüt',
    description: 'Görselleri yumuşak ve keskin yeniden örneklemeyle 2× ile 4× arasında veya belirlediğiniz genişliğe büyütün.',
    metaDescription: 'Görselleri çevrimiçi ve ücretsiz büyütün. JPG, PNG ve WebP görsellerini Lanczos yeniden örnekleme ve isteğe bağlı keskinleştirmeyle 2×, 3×, 4× veya tam bir genişliğe ölçekleyin.',
    steps: [
      'Görsellerinizi ekleyin.',
      'Bir katsayı veya hedef genişlik seçin ve keskinleştirme isteyip istemediğinize karar verin.',
      'Büyütün ve indirin.',
    ],
    faq: [
      {
        q: 'Bu yapay zekâ ile büyütme mi?',
        a: 'Hayır. Yüksek kaliteli yeniden örnekleme kullanır; bu, büyütülen görselleri pürüzsüz ve temiz yapar ancak eksik ayrıntıyı uyduramaz. Çok küçük veya bulanık fotoğraflar yine yumuşak görünür.',
      },
      {
        q: 'Sonuç ne kadar büyük olabilir?',
        a: 'Tarayıcınızın kaldırabildiğine bağlı olarak kenar başına 16.000 piksele ve yaklaşık 100 megapiksele kadar.',
      },
      {
        q: 'EXIF veya konum verileri korunuyor mu?',
        a: 'Hayır. Canvas üzerinden yeniden kodlama, kamera modeli ve GPS konumu gibi EXIF üst verilerini siler; bu, bir fotoğrafı paylaşmadan önce çoğu zaman istediğiniz şeydir. Renk profilleri de korunmaz.',
      },
    ],
    limits: [
      'Animasyonlu GIF veya WebP dosyaları yalnızca ilk karesi kullanılarak dönüştürülür.',
      'Tarayıcınızın yanıt vermeye devam etmesi için dosya başına en fazla 25 MB ve toplu işlemde en fazla 20 dosya.',
      'EXIF üst verileri ve gömülü renk profilleri korunmaz.',
      'Ayrıntı eklemez; bu yüzden yapay zekâ ile büyütme değildir.',
      'Çıktı kenar başına 16.000 pikselle sınırlıdır.',
    ],
  },
  'blur-image-area': {
    name: 'Alanı Bulanıklaştır veya Pikselleştir',
    description: 'Yüzleri, plakaları veya özel ayrıntıları bulanıklaştırarak, pikselleştirerek ya da kapatarak gizleyin.',
    metaDescription: 'Bir görselin bir bölümünü çevrimiçi ve ücretsiz bulanıklaştırın veya pikselleştirin. Yüzlerin, plakaların ya da metnin üzerine kutu çizip doğrudan tarayıcınızda gizleyin.',
    steps: [
      'Bir görsel ekleyin.',
      'Gizlemek istediğiniz yerlerin üzerine kutu çizmek için resim üzerinde sürükleyin.',
      'Bulanıklaştır, pikselleştir veya siyah kutu seçeneğini seçin, uygulayın ve indirin.',
    ],
    faq: [
      {
        q: 'Bulanıklaştırma hassas ayrıntılar için güvenli mi?',
        a: 'Kimlik numaraları veya plakalar gibi gizli kalması gereken her şey için siyah kutuyu kullanın. Bulanıklaştırma ve pikselleştirme bazen kısmen geri alınabilir.',
      },
      {
        q: 'Yüzleri otomatik olarak buluyor mu?',
        a: 'Hayır. Kutuları kendiniz çizersiniz. Otomatik algılama, pakete dahil olmayan büyük bir yapay zekâ modeli gerektirir.',
      },
      {
        q: 'Fikrimi değiştirebilir miyim?',
        a: 'Evet. Uygulamadan önce kutuları kaldırın veya yeniden çizin. Orijinal dosyanız asla değiştirilmez.',
      },
      {
        q: 'EXIF veya konum verileri korunuyor mu?',
        a: 'Hayır. Canvas üzerinden yeniden kodlama, kamera modeli ve GPS konumu gibi EXIF üst verilerini siler; bu, bir fotoğrafı paylaşmadan önce çoğu zaman istediğiniz şeydir. Renk profilleri de korunmaz.',
      },
    ],
    limits: [
      'Aynı anda tek görsel, en fazla 25 MB.',
      'Alanlar elle seçilir; yüz algılama yoktur.',
      'Animasyonlu görsellerde ilk kare kullanılır.',
    ],
  },
  'qr-code-scanner': {
    name: 'QR Kod Tarayıcı',
    description: 'Fotoğraflardaki ve ekran görüntülerindeki QR kodlarını okuyun ve içeriklerini tam olarak görün.',
    metaDescription: 'Bir görseldeki QR kodunu çevrimiçi ve ücretsiz tarayın. Bağlantısını, metnini veya Wi-Fi bilgilerini okumak için bir fotoğraf ya da ekran görüntüsü ekleyin. Tarayıcınızda çalışır.',
    steps: [
      'İçinde QR kodu bulunan bir veya daha fazla görsel ekleyin.',
      'Kod otomatik olarak okunur.',
      'Sonucu kopyalayın veya kontrol ettikten sonra bir bağlantıyı açın.',
    ],
    faq: [
      {
        q: 'Kameramla tarayabilir miyim?',
        a: 'Henüz değil. Bu araç QR kodlarını görsel dosyalarından okur. Telefonda kodun fotoğrafını çekip burada seçebilir veya kamera uygulamanızı kullanabilirsiniz.',
      },
      {
        q: 'Taranan bağlantıları açmak güvenli mi?',
        a: 'Önce adresi kontrol edin. Bağlantının tamamı gösterilir ve buradan yalnızca web (http veya https) bağlantıları açılabilir. Komut dosyası ve veri bağlantıları asla açılmaz.',
      },
      {
        q: 'Neden kod bulunamadı?',
        a: 'Kod bulanık, kırpılmış, çok küçük veya kontrastı düşük olabilir. Kodun tamamını etrafında net bir boşlukla gösteren, daha keskin ve daha yakın bir görsel deneyin.',
      },
      {
        q: 'Görsellerim yükleniyor mu?',
        a: 'Hayır. Görsel tarayıcınızda okunur ve bu araç onu hiçbir yere göndermez.',
      },
    ],
    limits: [
      'Her biri 25 MB olmak üzere en fazla 10 görsel.',
      'Görsel başına bir kod okunur.',
      'Yalnızca standart QR kodları; diğer barkodlar desteklenmez.',
    ],
  },
  'gif-maker': {
    name: 'GIF Oluşturucu',
    description: 'Resimlerinizi özel zamanlama, boyut ve döngüyle animasyonlu bir GIF’e dönüştürün.',
    metaDescription: 'Görsellerden çevrimiçi ve ücretsiz animasyonlu GIF oluşturun. Kareleri yeniden sıralayın, kare başına gecikmeyi, boyutu ve döngüyü belirleyin, GIF’i indirin. Tarayıcınızda oluşturulur.',
    steps: [
      'İki veya daha fazla resim ekleyin (ya da sabit bir GIF için yalnızca bir tane).',
      'Resimleri sürükleyerek sıralayın, her karenin ne kadar süre görüneceğini belirleyin; boyutu, döngüyü ve renkleri seçin.',
      'GIF’i oluşturun, önizleyin ve indirin.',
    ],
    faq: [
      {
        q: 'GIF’im neden bu kadar büyük?',
        a: 'GIF’ler her kareyi 256 renkle sınırlı bir resim olarak saklar. Daha az kare, daha küçük genişlik ve daha az renk dosyayı küçültür. Araç, GIF oluşturulur oluşturulmaz boyutu gösterir.',
      },
      {
        q: 'Saydam alanları koruyabilir miyim?',
        a: 'Evet; saydamlığı olan PNG veya WebP resimleri için “Saydam alanları koru” seçeneğini açın. GIF saydamlığı piksel başına açık ya da kapalıdır, bu yüzden yumuşak kenarlar sertleşir.',
      },
      {
        q: 'Görsellerim bir sunucuya yükleniyor mu?',
        a: 'Hayır. Görsel, tarayıcınız tarafından Canvas API kullanılarak çözülür ve yeniden kodlanır. Bu araç dosyayı hiçbir yere göndermez.',
      },
    ],
    limits: [
      'En fazla 100 kare; kareler büyüdükçe tarayıcınızın ihtiyaç duyduğu bellek artar.',
      'GIF’ler kare başına 256 renkle sınırlıdır, bu yüzden fotoğraflar tanecikli görünebilir.',
      'Animasyonlu girdiler (GIF, WebP) yalnızca ilk karesiyle katkıda bulunur.',
    ],
  },
  'photo-editor': {
    name: 'Fotoğraf Düzenleyici',
    description: 'Bir fotoğrafı canlı önizlemeyle ayarlayın, filtreleyin, döndürün, kırpın ve üzerine metin ekleyin.',
    metaDescription: 'Ücretsiz çevrimiçi fotoğraf düzenleyici. Rengi ayarlayın, filtre uygulayın, döndürün, düzeltin, kırpın ve metin ekleyin; ardından PNG, JPG veya WebP indirin. Gizlidir, tarayıcınızda çalışır.',
    steps: [
      'Bir fotoğraf ekleyin.',
      'Renkleri ayarlamak, filtre uygulamak, döndürmek veya kırpmak ve metin eklemek için sekmeleri kullanın. Önizleme siz ilerledikçe güncellenir.',
      'Biçimi seçin ve düzenlenmiş fotoğrafınızı indirin.',
    ],
    faq: [
      {
        q: 'Orijinal dosya değişiyor mu?',
        a: 'Hayır. Dosyanız asla değiştirilmez; düzenlenmiş resim yeni bir indirme olarak oluşturulur.',
      },
      {
        q: 'Dışa aktarmak kaliteyi düşürür mü?',
        a: 'PNG her pikseli korur. JPG ve WebP kayıplıdır; fotoğrafların aynı görünmesi için 90 veya daha yüksek bir kalite kullanın. Düzenlemeler önizleme boyutunda değil, resminizin tam boyutunda uygulanır.',
      },
      {
        q: 'Görsellerim bir sunucuya yükleniyor mu?',
        a: 'Hayır. Görsel, tarayıcınız tarafından Canvas API kullanılarak çözülür ve yeniden kodlanır. Bu araç dosyayı hiçbir yere göndermez.',
      },
    ],
    limits: [
      'Aynı anda tek fotoğraf, en fazla 25 MB ve yaklaşık 50 megapiksel.',
      'Düzenlemeler sabit bir sırayla uygulanır: döndürme ve kırpma, renk ayarları, bulanıklaştırma ve keskinleştirme, vinyet, ardından metin.',
      'Konum gibi EXIF ayrıntıları düzenlenmiş resme kopyalanmaz.',
      'Katman, fırça veya yapay zekâ özelliği yoktur.',
    ],
  },
  'jpg-to-pdf': {
    name: 'JPG’den PDF’ye',
    description: 'JPG fotoğraflarını sayfa başına bir görsel olacak şekilde PDF’ye dönüştürün.',
    metaDescription: 'JPG’yi çevrimiçi ve ücretsiz PDF’ye dönüştürün. Sayfa boyutunu, yönünü ve kenar boşluklarını seçin. JPEG verisi yeniden sıkıştırılmadan gömülür.',
    steps: [
      'JPG dosyalarınızı ekleyin ve sıralarını sürükleyerek ya da oklarla ayarlayın.',
      'Sayfa boyutunu, yönünü ve kenar boşluğunu seçin.',
      'PDF’yi oluşturun ve indirin.',
    ],
    faq: [
      {
        q: 'Görsel kalitesi düşer mi?',
        a: 'Hayır. JPG dosyaları PDF’ye olduğu gibi, yeniden sıkıştırılmadan gömülür.',
      },
      {
        q: 'PDF’im bir yere yükleniyor mu?',
        a: 'Hayır. PDF, tarayıcınız tarafından okunur ve yeniden yazılır. Bu araç dosyayı bir sunucuya göndermez.',
      },
    ],
    limits: [
      'Görsel başına en fazla 25 MB ve PDF başına en fazla 100 görsel.',
      'Burada yalnızca JPG görseller kabul edilir; karışık biçimler için Görsellerden PDF’ye aracını kullanın.',
    ],
  },
  'png-to-pdf': {
    name: 'PNG’den PDF’ye',
    description: 'PNG görsellerini saydamlığı koruyarak PDF’ye dönüştürün.',
    metaDescription: 'PNG’yi çevrimiçi ve ücretsiz PDF’ye dönüştürün. Sayfa boyutunu ve kenar boşluklarını seçin; saydamlık korunur. Tarayıcınızda çalışır.',
    steps: [
      'PNG dosyalarınızı ekleyin ve sıralarını ayarlayın.',
      'Sayfa boyutunu, yönünü ve kenar boşluğunu seçin.',
      'PDF’yi oluşturun ve indirin.',
    ],
    faq: [
      {
        q: 'Saydamlık korunuyor mu?',
        a: 'Evet. PNG görseller alfa kanallarıyla gömülür; bu yüzden saydam alanlarda arkadaki beyaz sayfa görünür.',
      },
      {
        q: 'PDF’im bir yere yükleniyor mu?',
        a: 'Hayır. PDF, tarayıcınız tarafından okunur ve yeniden yazılır. Bu araç dosyayı bir sunucuya göndermez.',
      },
    ],
    limits: [
      'Görsel başına en fazla 25 MB ve PDF başına en fazla 100 görsel.',
      'Burada yalnızca PNG görseller kabul edilir; karışık biçimler için Görsellerden PDF’ye aracını kullanın.',
    ],
  },
  'images-to-pdf': {
    name: 'Görsellerden PDF’ye',
    description: 'JPG ve PNG görsellerini seçtiğiniz sırayla tek bir PDF’de birleştirin.',
    metaDescription: 'Birden çok görseli çevrimiçi ve ücretsiz tek bir PDF’de birleştirin. Sayfaları yeniden sıralayın, sayfa boyutunu ve kenar boşluklarını seçin. Tarayıcınızda işlenir.',
    steps: [
      'JPG ve PNG görsellerini ekleyin (birkaçını aynı anda bırakabilirsiniz).',
      'Görselleri yeniden sıralayın; sayfa boyutunu, yönünü ve kenar boşluğunu seçin.',
      'PDF’yi oluşturun ve indirin.',
    ],
    faq: [
      {
        q: 'Hangi görsel biçimleri çalışır?',
        a: 'JPG ve PNG doğrudan gömülür. WebP, GIF ve BMP, tarayıcınız çözebiliyorsa önce PNG’ye dönüştürülür.',
      },
      {
        q: '“Görsele sığdır” ne yapar?',
        a: 'Her sayfa kendi görselinin boyutunda olur; bu yüzden hiçbir şey ölçeklenmez veya boşlukla doldurulmaz. Standart belge sayfaları için A4 veya Letter’ı seçin.',
      },
      {
        q: 'PDF’im bir yere yükleniyor mu?',
        a: 'Hayır. PDF, tarayıcınız tarafından okunur ve yeniden yazılır. Bu araç dosyayı bir sunucuya göndermez.',
      },
    ],
    limits: [
      'Görsel başına en fazla 25 MB ve PDF başına en fazla 100 görsel.',
    ],
  },
  'merge-pdf': {
    name: 'PDF Birleştir',
    description: 'Birkaç PDF dosyasını seçtiğiniz sırayla tek bir belgede birleştirin.',
    metaDescription: 'PDF dosyalarını çevrimiçi ve ücretsiz birleştirin. Birden çok PDF’yi tek dosyada toplayın, sıralayın ve anında indirin. Tarayıcınızda işlenir.',
    steps: [
      'İki veya daha fazla PDF dosyası ekleyin.',
      'Okları kullanarak dosyaları istediğiniz sıraya koyun.',
      'Birleştirin ve birleşik PDF’yi indirin.',
    ],
    faq: [
      {
        q: 'Yer imleri ve form alanları korunuyor mu?',
        a: 'Sayfalar görünen içerikleri ve bağlantılarıyla kopyalanır. Belge düzeyindeki yer imleri ve etkileşimli form verileri aktarılmaz.',
      },
      {
        q: 'Parola korumalı PDF’leri açabilir mi?',
        a: 'Hayır. Şifreli PDF’ler algılanır ve net bir mesajla reddedilir. Önce PDF Kilidini Aç aracımızla parolayı kaldırın.',
      },
      {
        q: 'PDF’im bir yere yükleniyor mu?',
        a: 'Hayır. PDF, tarayıcınız tarafından okunur ve yeniden yazılır. Bu araç dosyayı bir sunucuya göndermez.',
      },
    ],
    limits: [
      'PDF başına en fazla 100 MB.',
      'Parola korumalı (şifreli) PDF’ler desteklenmez.',
      'Çok büyük veya karmaşık PDF’ler cihazınızın belleğine bağlıdır.',
      'Kaynak dosyaların yer imleri/ana hatları ve form alanları birleştirilmez.',
    ],
  },
  'split-pdf': {
    name: 'PDF Böl',
    description: 'Bir PDF’yi sayfa aralıklarına, tek tek sayfalara veya sabit boyutlu parçalara bölün.',
    metaDescription: 'PDF’yi çevrimiçi ve ücretsiz bölün. Sayfa aralıklarına, her sayfaya ya da her N sayfaya göre ayırın ve ZIP olarak indirin. Tarayıcınızda çalışır.',
    steps: [
      'Bir PDF ekleyin.',
      'Nasıl böleceğinizi seçin: 1-3, 4-6 gibi özel aralıklar, her sayfa veya her N sayfa.',
      'Bölün ve parçaları tek tek ya da ZIP olarak indirin.',
    ],
    faq: [
      {
        q: 'Aralıkları nasıl yazarım?',
        a: 'Çıktı dosyalarını virgülle ayırın. Her dosya bir aralık (1-3), tek bir sayfa (5) veya artıyla ayrılmış bir karışım (1-2+7) olabilir. Örnek: 1-3, 4-6, 7+9.',
      },
      {
        q: 'Parola korumalı PDF’leri açabilir mi?',
        a: 'Hayır. Şifreli PDF’ler algılanır ve net bir mesajla reddedilir. Önce PDF Kilidini Aç aracımızla parolayı kaldırın.',
      },
    ],
    limits: [
      'PDF başına en fazla 100 MB.',
      'Parola korumalı (şifreli) PDF’ler desteklenmez.',
      'Çok büyük veya karmaşık PDF’ler cihazınızın belleğine bağlıdır.',
    ],
  },
  'rotate-pdf': {
    name: 'PDF Döndür',
    description: 'Tek tek sayfaları veya tüm PDF’yi küçük resim önizlemeleriyle döndürün.',
    metaDescription: 'PDF sayfalarını çevrimiçi ve ücretsiz döndürün. Tek sayfaları ya da tüm sayfaları 90, 180 veya 270 derece çevirip yeni bir PDF kaydedin. Tarayıcınızda çalışır.',
    steps: [
      'Bir PDF ekleyin; sayfaları küçük resimler olarak görünür.',
      'Sayfaları tek tek döndürün ya da hepsini bir kerede döndürün.',
      'Döndürülmüş PDF’yi kaydedin.',
    ],
    faq: [
      {
        q: 'Döndürme kalıcı mı?',
        a: 'Yeni PDF’de bir sayfa döndürme özniteliği olarak saklanır. Sayfa içeriği yeniden çizilmez, bu yüzden hiçbir şey kaybolmaz.',
      },
      {
        q: 'Parola korumalı PDF’leri açabilir mi?',
        a: 'Hayır. Şifreli PDF’ler algılanır ve net bir mesajla reddedilir. Önce PDF Kilidini Aç aracımızla parolayı kaldırın.',
      },
    ],
    limits: [
      'PDF başına en fazla 100 MB.',
      'Parola korumalı (şifreli) PDF’ler desteklenmez.',
      'Çok büyük veya karmaşık PDF’ler cihazınızın belleğine bağlıdır.',
    ],
  },
  'extract-pdf-pages': {
    name: 'PDF Sayfalarını Ayıkla',
    description: 'Bir PDF’den ihtiyacınız olan sayfaları seçin ve yeni bir belge olarak kaydedin.',
    metaDescription: 'PDF’den sayfaları çevrimiçi ve ücretsiz ayıklayın. Sayfaları görsel olarak ya da aralıkla seçin ve yeni bir PDF kaydedin. Tarayıcınızda işlenir.',
    steps: [
      'Bir PDF ekleyin.',
      'Seçmek için sayfa küçük resimlerine tıklayın ya da 1-3, 8 gibi bir aralık yazın.',
      'Ayıklayın ve yeni PDF’yi indirin.',
    ],
    faq: [
      {
        q: 'Bunu sayfa silmek için kullanabilir miyim?',
        a: 'Evet. Tutmak istediğiniz sayfaları seçip ayıklayın; geri kalanlar yeni dosyaya alınmaz.',
      },
      {
        q: 'Parola korumalı PDF’leri açabilir mi?',
        a: 'Hayır. Şifreli PDF’ler algılanır ve net bir mesajla reddedilir. Önce PDF Kilidini Aç aracımızla parolayı kaldırın.',
      },
    ],
    limits: [
      'PDF başına en fazla 100 MB.',
      'Parola korumalı (şifreli) PDF’ler desteklenmez.',
      'Çok büyük veya karmaşık PDF’ler cihazınızın belleğine bağlıdır.',
    ],
  },
  'reorder-pdf-pages': {
    name: 'PDF Sayfalarını Yeniden Sırala',
    description: 'Sayfaları görsel olarak yeniden düzenleyin, kaldırın ve döndürün, ardından sonucu kaydedin.',
    metaDescription: 'PDF sayfalarını çevrimiçi ve ücretsiz yeniden sıralayın. Sayfaları sürükleyin veya taşıyın, gereksiz sayfaları silin ve yeni bir PDF kaydedin. Tarayıcınızda çalışır.',
    steps: [
      'Bir PDF ekleyin; sayfaları küçük resimler olarak görünür.',
      'Sıralarını değiştirmek için sayfaları sürükleyin veya ok düğmelerini kullanın. İhtiyacınız olmayan sayfaları kaldırın.',
      'Yeniden sıralanmış PDF’yi kaydedin.',
    ],
    faq: [
      {
        q: 'Klavyeyle yeniden sıralayabilir miyim?',
        a: 'Evet. Her sayfadaki “öne taşı” ve “sona taşı” düğmelerini kullanın.',
      },
      {
        q: 'Parola korumalı PDF’leri açabilir mi?',
        a: 'Hayır. Şifreli PDF’ler algılanır ve net bir mesajla reddedilir. Önce PDF Kilidini Aç aracımızla parolayı kaldırın.',
      },
    ],
    limits: [
      'PDF başına en fazla 100 MB.',
      'Parola korumalı (şifreli) PDF’ler desteklenmez.',
      'Çok büyük veya karmaşık PDF’ler cihazınızın belleğine bağlıdır.',
    ],
  },
  'pdf-to-jpg': {
    name: 'PDF’den JPG’ye',
    description: 'PDF sayfalarını seçtiğiniz çözünürlükte JPG görselleri olarak oluşturun.',
    metaDescription: 'PDF’yi çevrimiçi ve ücretsiz JPG’ye dönüştürün. Her sayfayı veya seçtiğiniz sayfaları 300 DPI’a kadar oluşturun ve ZIP indirin. Tarayıcınızda çalışır.',
    steps: [
      'Bir PDF ekleyin.',
      'Çözünürlüğü ve isterseniz hangi sayfaların dönüştürüleceğini seçin.',
      'Dönüştürün ve görselleri tek tek ya da ZIP olarak indirin.',
    ],
    faq: [
      {
        q: 'Hangi çözünürlüğü seçmeliyim?',
        a: 'Ekranlar için 150 DPI uygundur; baskı için 300 DPI. Daha yüksek değerler daha büyük görseller üretir ve daha fazla bellek gerektirir.',
      },
      {
        q: 'Sayfalar doğru biçimde oluşturuluyor mu?',
        a: 'Oluşturma için Mozilla’nın PDF.js kütüphanesi kullanılır; çoğu PDF’yi iyi işler. Alışılmadık yazı tipleri veya gelişmiş grafikler diğer görüntüleyicilerden biraz farklı görünebilir.',
      },
      {
        q: 'Parola korumalı PDF’leri açabilir mi?',
        a: 'Hayır. Şifreli PDF’ler algılanır ve net bir mesajla reddedilir. Önce PDF Kilidini Aç aracımızla parolayı kaldırın.',
      },
    ],
    limits: [
      'PDF başına en fazla 100 MB.',
      'Parola korumalı (şifreli) PDF’ler desteklenmez.',
      'Çok büyük veya karmaşık PDF’ler cihazınızın belleğine bağlıdır.',
      'Her sayfa yaklaşık 50 megapiksel ile sınırlıdır.',
    ],
  },
  'pdf-to-png': {
    name: 'PDF’den PNG’ye',
    description: 'PDF sayfalarını keskin, kayıpsız PNG görselleri olarak oluşturun.',
    metaDescription: 'PDF’yi çevrimiçi ve ücretsiz PNG’ye dönüştürün. Sayfaları 300 DPI’a kadar kayıpsız görseller olarak oluşturun ve ZIP indirin. Tarayıcınızda çalışır.',
    steps: [
      'Bir PDF ekleyin.',
      'Çözünürlüğü ve sayfaları seçin.',
      'Dönüştürün ve görselleri tek tek ya da ZIP olarak indirin.',
    ],
    faq: [
      {
        q: 'Neden JPG yerine PNG seçmeliyim?',
        a: 'PNG, metinde ve çizgi çizimlerde keskin kalır ve saydamlığı destekler. Dosyalar JPG’den daha büyüktür.',
      },
      {
        q: 'Parola korumalı PDF’leri açabilir mi?',
        a: 'Hayır. Şifreli PDF’ler algılanır ve net bir mesajla reddedilir. Önce PDF Kilidini Aç aracımızla parolayı kaldırın.',
      },
    ],
    limits: [
      'PDF başına en fazla 100 MB.',
      'Parola korumalı (şifreli) PDF’ler desteklenmez.',
      'Çok büyük veya karmaşık PDF’ler cihazınızın belleğine bağlıdır.',
      'Her sayfa yaklaşık 50 megapiksel ile sınırlıdır.',
    ],
  },
  'pdf-viewer': {
    name: 'PDF Görüntüleyici',
    description: 'Bir PDF’yi tarayıcınızda özel olarak açıp okuyun; yakınlaştırma ve sayfa gezintisi vardır.',
    metaDescription: 'PDF dosyalarını çevrimiçi ve ücretsiz görüntüleyin. Yakınlaştırın, bir sayfaya atlayın ve belgeleri hiçbir yere yüklemeden tarayıcınızda okuyun.',
    steps: [
      'Bir PDF ekleyin.',
      'Gezinmek için kaydırın veya sayfa denetimlerini kullanın.',
      'Gerektiğinde yakınlaştırın veya uzaklaştırın.',
    ],
    faq: [
      {
        q: 'PDF’yi burada düzenleyebilir veya not ekleyebilir miyim?',
        a: 'Hayır. Bu, salt okunur bir görüntüleyicidir. Sayfaları döndürmek, yeniden sıralamak veya ayıklamak için sayfa araçlarını kullanın.',
      },
      {
        q: 'Parola korumalı PDF’leri açabilir mi?',
        a: 'Hayır. Şifreli PDF’ler algılanır ve net bir mesajla reddedilir. Önce PDF Kilidini Aç aracımızla parolayı kaldırın.',
      },
    ],
    limits: [
      'PDF başına en fazla 100 MB.',
      'Parola korumalı (şifreli) PDF’ler desteklenmez.',
      'Çok büyük veya karmaşık PDF’ler cihazınızın belleğine bağlıdır.',
      'Salt okunur: not ekleme, form doldurma veya metin arama yoktur.',
    ],
  },
  'pdf-metadata-viewer': {
    name: 'PDF Üst Veri Görüntüleyici',
    description: 'Bir PDF’nin başlığını, yazarını, oluşturma tarihlerini, sayfa sayısını, sayfa boyutlarını ve sürümünü inceleyin.',
    metaDescription: 'PDF üst verilerini çevrimiçi ve ücretsiz görüntüleyin. Dosyayı yüklemeden başlığı, yazarı, üreticiyi, tarihleri, sayfa sayısını ve sayfa boyutlarını görün.',
    steps: [
      'Bir PDF ekleyin.',
      'Belge özelliklerini inceleyin.',
      'Gerekirse ayrıntıları JSON olarak kopyalayın.',
    ],
    faq: [
      {
        q: 'Bazı üst veriler neden eksik?',
        a: 'Birçok PDF her alanı ayarlamaz. Yalnızca dosyada gerçekten saklanan alanlar gösterilir.',
      },
      {
        q: 'Üst verileri kaldırabilir miyim?',
        a: 'Bu araç yalnızca üst verileri okur. Dosyayı değiştirmez.',
      },
      {
        q: 'Parola korumalı PDF’leri açabilir mi?',
        a: 'Hayır. Şifreli PDF’ler algılanır ve net bir mesajla reddedilir. Önce PDF Kilidini Aç aracımızla parolayı kaldırın.',
      },
    ],
    limits: [
      'PDF başına en fazla 100 MB.',
      'Parola korumalı (şifreli) PDF’ler desteklenmez.',
      'Çok büyük veya karmaşık PDF’ler cihazınızın belleğine bağlıdır.',
      'Salt okunur: üst veriler burada düzenlenemez veya kaldırılamaz.',
    ],
  },
  'remove-pdf-pages': {
    name: 'PDF Sayfalarını Kaldır',
    description: 'İhtiyacınız olmayan sayfaları silin ve geri kalanını yeni bir PDF olarak kaydedin.',
    metaDescription: 'PDF’den sayfaları çevrimiçi ve ücretsiz kaldırın. Sayfaları görsel olarak ya da aralıkla seçin, silin ve geri kalanını indirin. Tarayıcınızda işlenir.',
    steps: [
      'Bir PDF ekleyin; sayfaları küçük resimler olarak görünür.',
      'Silmek istediğiniz sayfalara tıklayın ya da 2, 5-7 gibi bir aralık yazın.',
      'Kaldırın ve yeni PDF’yi indirin.',
    ],
    faq: [
      {
        q: 'Orijinal dosyamı değiştiriyor mu?',
        a: 'Hayır. Seçilen sayfalar olmadan yeni bir PDF elde edersiniz. Orijinaliniz olduğu gibi kalır.',
      },
      {
        q: 'Tüm sayfaları kaldırabilir miyim?',
        a: 'Hayır. En az bir sayfa kalmalıdır.',
      },
      {
        q: 'Parola korumalı PDF’leri açabilir mi?',
        a: 'Hayır. Şifreli PDF’ler algılanır ve net bir mesajla reddedilir. Önce PDF Kilidini Aç aracımızla parolayı kaldırın.',
      },
    ],
    limits: [
      'PDF başına en fazla 100 MB.',
      'Parola korumalı (şifreli) PDF’ler desteklenmez.',
      'Çok büyük veya karmaşık PDF’ler cihazınızın belleğine bağlıdır.',
    ],
  },
  'add-page-numbers': {
    name: 'Sayfa Numarası Ekle',
    description: 'Bir PDF’nin sayfalarını istediğiniz konum, biçim ve stille numaralandırın.',
    metaDescription: 'PDF’ye çevrimiçi ve ücretsiz sayfa numarası ekleyin. Konumu, “Sayfa 1 / 10” gibi bir biçimi, başlangıç numarasını ve yazı boyutunu seçin. Tarayıcınızda çalışır.',
    steps: [
      'Bir PDF ekleyin.',
      'Numaraların nereye gideceğini, biçimini ve hangi sayfaların numaralandırılacağını seçin.',
      'Numaraları ekleyin ve PDF’yi indirin.',
    ],
    faq: [
      {
        q: 'Kapak sayfasını atlayabilir miyim?',
        a: 'Evet. “Numaralandırılacak ilk sayfa” değerini 2 yapın, ardından hangi numarayı göstermesi gerektiğini seçin.',
      },
      {
        q: 'Döndürülmüş sayfalarda çalışır mı?',
        a: 'Evet. Numaralar, döndürülmüş sayfalar dahil ekranda gördüğünüze göre yerleştirilir.',
      },
      {
        q: 'Hangi yazı tipi kullanılıyor?',
        a: 'Rakamları ve Latin harflerini kapsayan Helvetica.',
      },
      {
        q: 'Parola korumalı PDF’leri açabilir mi?',
        a: 'Hayır. Şifreli PDF’ler algılanır ve net bir mesajla reddedilir. Önce PDF Kilidini Aç aracımızla parolayı kaldırın.',
      },
    ],
    limits: [
      'PDF başına en fazla 100 MB.',
      'Parola korumalı (şifreli) PDF’ler desteklenmez.',
      'Çok büyük veya karmaşık PDF’ler cihazınızın belleğine bağlıdır.',
      'Numaralar her sayfanın üzerine çizilir, mevcut içeriğin arkasına asla yerleştirilmez.',
      'Yerleşik Helvetica yazı tipini kullanır.',
    ],
  },
  'watermark-pdf': {
    name: 'PDF’ye Filigran Ekle',
    description: 'PDF sayfalarınıza ayarlanabilir opaklık ve açıyla metin veya görsel damgası ekleyin.',
    metaDescription: 'PDF’ye çevrimiçi ve ücretsiz filigran ekleyin. Ortalanmış veya döşenmiş metin ya da görsel damgası basın; opaklık ve döndürme ayarlanabilir. Tarayıcınızda işlenir.',
    steps: [
      'Bir PDF ekleyin.',
      'Metin veya görsel filigranı seçin, ardından boyutunu, opaklığını, açısını ve düzenini ayarlayın.',
      'Tüm sayfalara veya bir seçime uygulayın, ardından indirin.',
    ],
    faq: [
      {
        q: 'Filigran kaldırılabilir mi?',
        a: 'Sayfanın üzerine çizilir ve bir güvenlik özelliği değildir. PDF düzenleyicisi olan herkes kaldırabilir. Daha güçlü koruma için PDF Koru ile birlikte kullanın.',
      },
      {
        q: 'Urduca, Arapça veya başka alfabeler kullanabilir miyim?',
        a: 'Yazılmış metin olarak hayır, çünkü PDF’nin yerleşik yazı tipleri yalnızca Latin harflerini kapsar. Metninizin saydam bir PNG’sini hazırlayıp bunun yerine görsel seçeneğini kullanın.',
      },
      {
        q: 'Filigran sayfa metninin önünde mi, arkasında mı?',
        a: 'Önünde. Sayfanın okunaklı kalması için opaklığı düşürün.',
      },
      {
        q: 'Parola korumalı PDF’leri açabilir mi?',
        a: 'Hayır. Şifreli PDF’ler algılanır ve net bir mesajla reddedilir. Önce PDF Kilidini Aç aracımızla parolayı kaldırın.',
      },
    ],
    limits: [
      'PDF başına en fazla 100 MB.',
      'Parola korumalı (şifreli) PDF’ler desteklenmez.',
      'Çok büyük veya karmaşık PDF’ler cihazınızın belleğine bağlıdır.',
      'Metin filigranları yalnızca Latin harflerini, rakamları ve yaygın simgeleri destekler.',
      'Filigran görselleri: PNG veya JPG, en fazla 5 MB.',
      'Damga, sayfadaki mevcut içeriğin üzerine çizilir.',
    ],
  },
  'crop-pdf': {
    name: 'PDF Kırp',
    description: 'Kenar boşluklarını kırpın veya her sayfada seçtiğiniz alanı tutun; canlı sayfa önizlemesi vardır.',
    metaDescription: 'PDF sayfalarını çevrimiçi ve ücretsiz kırpın. Sayfa önizlemesinde kırpma kutusunu sürükleyin veya kenar boşluklarını yazın, ardından tüm sayfalara ya da seçtiklerinize uygulayın. Tarayıcınızda çalışır.',
    steps: [
      'Bir PDF ekleyin ve önizlemek için bir sayfa seçin.',
      'Tutulacak alanı seçmek için kutuyu sürükleyin veya kenar boşluklarını yazın.',
      'Hangi sayfaların kırpılacağını seçin, ardından indirin.',
    ],
    faq: [
      {
        q: 'Kırpılan içerik silinir mi?',
        a: 'Hayır. Kırpma her sayfanın görünen alanını değiştirir, ancak dışarıda kalan içerik hâlâ dosyanın içindedir. Hassas bilgileri gizlemek için kırpmaya güvenmeyin.',
      },
      {
        q: 'Sayfalarımın boyutları farklıysa ne olur?',
        a: 'Seçtiğiniz her sayfaya aynı oranlar uygulanır; bu nedenle farklı boyutlardaki sayfalar aynı yüzdeyle kırpılır.',
      },
      {
        q: 'Parola korumalı PDF’leri açabilir mi?',
        a: 'Hayır. Şifreli PDF’ler algılanır ve net bir mesajla reddedilir. Önce PDF Kilidini Aç aracımızla parolayı kaldırın.',
      },
    ],
    limits: [
      'PDF başına en fazla 100 MB.',
      'Parola korumalı (şifreli) PDF’ler desteklenmez.',
      'Çok büyük veya karmaşık PDF’ler cihazınızın belleğine bağlıdır.',
      'Kırpma içeriği gizler; silmez.',
      'Kırpma alanı, milimetre cinsinden sabit bir boyut değil, her sayfanın bir oranıdır.',
    ],
  },
  'edit-pdf-metadata': {
    name: 'PDF Üst Verilerini Düzenle',
    description: 'Bir PDF’nin başlığını, yazarını, konusunu ve anahtar sözcüklerini değiştirin ya da tüm üst verileri kaldırın.',
    metaDescription: 'PDF üst verilerini çevrimiçi ve ücretsiz düzenleyin. Başlığı, yazarı, konuyu ve anahtar sözcükleri değiştirin ya da tüm belge özelliklerini temizleyin. Tarayıcınızda işlenir.',
    steps: [
      'Bir PDF ekleyin; mevcut özellikleri otomatik doldurulur.',
      'Alanları düzenleyin veya Tüm üst verileri kaldır’ı seçin.',
      'Güncellenmiş PDF’yi kaydedin ve indirin.',
    ],
    faq: [
      {
        q: '“Tüm üst verileri kaldır” neleri kaldırır?',
        a: 'Belge bilgilerini (başlık, yazar, konu, anahtar sözcükler, oluşturan, üretici ve tarihler) ve gömülü XMP üst verilerini. Sayfa metnine, görsellere veya yorumlara dokunmaz.',
      },
      {
        q: 'Üst veriler neden düzenlenir?',
        a: 'Tarayıcı sekmelerinde ve arama sonuçlarında görünen yanlış bir başlığı düzeltmek, doğru yazarı belirtmek ya da bir dosyayı paylaşmadan önce kişisel ayrıntıları temizlemek için.',
      },
      {
        q: 'Latin olmayan metni destekliyor mu?',
        a: 'Evet. Urduca, Arapça, Çince ve diğer yazı sistemlerindeki başlıklar ve yazarlar doğru kaydedilir.',
      },
      {
        q: 'Parola korumalı PDF’leri açabilir mi?',
        a: 'Hayır. Şifreli PDF’ler algılanır ve net bir mesajla reddedilir. Önce PDF Kilidini Aç aracımızla parolayı kaldırın.',
      },
    ],
    limits: [
      'PDF başına en fazla 100 MB.',
      'Parola korumalı (şifreli) PDF’ler desteklenmez.',
      'Çok büyük veya karmaşık PDF’ler cihazınızın belleğine bağlıdır.',
      'Yalnızca belge düzeyindeki özellikler değiştirilir. Yorumlar, form verileri ve sayfa içeriği olduğu gibi kalır.',
    ],
  },
  'protect-pdf': {
    name: 'PDF Koru',
    description: 'Bir PDF’yi AES-256 şifrelemesiyle parolayla kilitleyin.',
    metaDescription: 'PDF’yi çevrimiçi ve ücretsiz parolayla koruyun. AES-256 şifreleme tarayıcınızda yapılır; dosyanız ve parolanız asla yüklenmez.',
    steps: [
      'Bir PDF ekleyin.',
      'Parolayı iki kez yazın ve okuyucuların neler yapabileceğini seçin (yazdırma, kopyalama, düzenleme).',
      'Koruyun ve şifrelenmiş kopyayı indirin.',
    ],
    faq: [
      {
        q: 'Koruma ne kadar güçlü?',
        a: 'Dosyalar, standart PDF şifrelemelerinin en güçlüsü olan AES-256 ile şifrelenir. Uygulamada güvenlik parolanıza bağlıdır: uzun ve başka hiçbir yerde kullanmadığınız bir parola seçin.',
      },
      {
        q: 'Parolayı unutursam ne olur?',
        a: 'Geri alınamaz. Hiçbir şey saklanmaz veya bir yere gönderilmez ve sıfırlama yoktur. Orijinal dosyanızı ve parolayı güvenli bir yerde tutun.',
      },
      {
        q: 'Yazdırma, kopyalama ve düzenleme seçenekleri zorunlu tutuluyor mu?',
        a: 'Bunlar çoğu PDF programının uyduğu isteklerdir, ancak aşılamaz değildir. Dosyayı asıl koruyan paroladır.',
      },
      {
        q: 'Parolam yükleniyor mu?',
        a: 'Hayır. Şifreleme tarayıcınızda yapılır.',
      },
    ],
    limits: [
      'PDF başına en fazla 100 MB.',
      'Parolalar: en fazla 127 standart karakter (harf, rakam ve simge).',
      'Zaten parolası olan bir PDF’nin önce kilidi açılmalıdır.',
      'Çok eski PDF okuyucuları (yaklaşık 2008 öncesi) AES-256 dosyalarını açamayabilir.',
    ],
  },
  'unlock-pdf': {
    name: 'PDF Kilidini Aç',
    description: 'Erişiminiz olan bir PDF’nin parolasını kaldırın, böylece serbestçe açılsın.',
    metaDescription: 'Parola korumalı bir PDF’nin kilidini çevrimiçi ve ücretsiz açın. Korumasız bir kopya kaydetmek için parolayı girin; tarayıcınızda işlenir ve asla yüklenmez.',
    steps: [
      'Korumalı PDF’yi ekleyin.',
      'İstenirse parolasını girin. Yalnızca yazdırmayı veya kopyalamayı kısıtlayan PDF’ler parola gerektirmez.',
      'Kilidi açılmış kopyayı indirin.',
    ],
    faq: [
      {
        q: 'Parolayı unuttuysam PDF’nin kilidini açabilir mi?',
        a: 'Hayır. Bu araç parolaları asla tahmin etmez veya kırmaz. Korumayı yalnızca doğru parolayı verdiğinizde ya da dosya yalnızca yazdırma gibi işlemleri kısıtladığında kaldırır.',
      },
      {
        q: 'Buna izin var mı?',
        a: 'Yalnızca size ait olan veya açma izniniz bulunan dosyalarda kullanın. Sonucu nasıl kullandığınızdan siz sorumlusunuz.',
      },
      {
        q: 'Parolam yükleniyor mu?',
        a: 'Hayır. Her şey tarayıcınızda gerçekleşir.',
      },
    ],
    limits: [
      'PDF başına en fazla 100 MB.',
      'Standart PDF parola korumasını destekler (RC4 ve AES).',
      'Dosya yeniden kaydedildiğinde dijital imza geçersiz olur.',
      'Sertifika tabanlı veya DRM korumalı dosyalar desteklenmez.',
    ],
  },
  'extract-pdf-text': {
    name: 'PDF’den Metin Ayıkla',
    description: 'Bir PDF’deki seçilebilir metnin tamamını sayfa sayfa kopyalayın.',
    metaDescription: 'PDF’den metni çevrimiçi ve ücretsiz ayıklayın. Her sayfanın veya bir aralığın seçilebilir metnini alın, ardından kopyalayın ya da .txt olarak kaydedin. Tarayıcınızda çalışır.',
    steps: [
      'Bir PDF ekleyin.',
      'Tüm sayfaları veya bir aralığı seçin ve sayfa sonlarının işaretlenip işaretlenmeyeceğine karar verin.',
      'Metni kopyalayın veya .txt dosyası olarak indirin.',
    ],
    faq: [
      {
        q: 'Sonuç neden boş?',
        a: 'PDF büyük olasılıkla bir taramadır; yani gerçek metin değil, metnin bir resmidir. Okumak için OCR (metin tanıma) gerekir; bu araç bunu yapmaz.',
      },
      {
        q: 'Düzen korunuyor mu?',
        a: 'Satırlar ve paragraflar elden geldiğince yeniden oluşturulur, ancak sütunlar, tablolar ve dipnotlar farklı bir sırayla çıkabilir.',
      },
      {
        q: 'Parola korumalı PDF’leri açabilir mi?',
        a: 'Hayır. Şifreli PDF’ler algılanır ve net bir mesajla reddedilir. Önce PDF Kilidini Aç aracımızla parolayı kaldırın.',
      },
    ],
    limits: [
      'PDF başına en fazla 100 MB.',
      'Parola korumalı (şifreli) PDF’ler desteklenmez.',
      'Çok büyük veya karmaşık PDF’ler cihazınızın belleğine bağlıdır.',
      'Yalnızca gerçek metin ayıklanır; taranmış sayfalar için OCR gerekir.',
      'Okuma sırası PDF’yi izler ve karmaşık düzenlerde görsel sıradan farklı olabilir.',
    ],
  },
  'compress-pdf': {
    name: 'PDF Sıkıştır',
    description: 'Görsellerini yeniden sıkıştırarak bir PDF’yi küçültün; metin seçilebilir kalır.',
    metaDescription: 'PDF’yi çevrimiçi ve ücretsiz sıkıştırın. Gömülü görselleri yeniden sıkıştırarak dosya boyutunu küçültün, metin seçilebilir kalsın; en küçük dosya için sayfaları düzleştirin. Tarayıcınızda çalışır.',
    steps: [
      'PDF’nizi ekleyin.',
      'Nasıl ve ne kadar güçlü sıkıştırılacağını seçin: varsayılan mod metni seçilebilir tutar ve yalnızca görselleri yeniden sıkıştırır.',
      'Sıkıştırın, kazandığınız boyutu kontrol edin ve sonucu indirin.',
    ],
    faq: [
      {
        q: 'PDF’im neden neredeyse hiç küçülmedi?',
        a: 'Standart mod JPEG görselleri yeniden sıkıştırır; bu yüzden en çok fotoğraf veya tarama dolu PDF’lerde işe yarar. Çoğunlukla metinden oluşan ya da görselleri zaten küçük olan bir PDF fazla küçülemez. Araç, bir şey kazandıramadığında bunu gizlemek yerine size söyler.',
      },
      {
        q: 'Kalite düşer mi?',
        a: 'Görseller boyut karşılığında bir miktar ayrıntı kaybeder; Hafif onları neredeyse değiştirmeden bırakır, Güçlü ise gözle görülür biçimde yumuşatır. Standart modda metne ve vektör grafiklere dokunulmaz. “Maksimum” modu her sayfayı bir resme dönüştürür, bu yüzden metin artık seçilemez ve aranamaz.',
      },
      {
        q: 'PDF’im bir yere yükleniyor mu?',
        a: 'Hayır. PDF, tarayıcınız tarafından okunur ve yeniden yazılır. Bu araç dosyayı bir sunucuya göndermez.',
      },
    ],
    limits: [
      'Yalnızca gömülü JPEG görseller yeniden sıkıştırılır. PNG tarzı (Flate) görseller, yazı tipleri ve diğer içerik olduğu gibi korunur.',
      'Maksimum modu her sayfayı görsele dönüştürür: bu sayfalarda metin, bağlantılar ve form alanları çalışmaz ve dosyada arama yapılamaz.',
      'Yeniden sıkıştırılan görsellerin renkleri çok hafif kayabilir.',
      'PDF başına en fazla 100 MB. Parola korumalı PDF’lerin önce kilidi açılmalıdır.',
    ],
  },
  'ocr-pdf': {
    name: 'OCR PDF',
    description: 'Taranmış PDF’lerdeki metni (İngilizce) tanıyın ve aranabilir bir PDF elde edin.',
    metaDescription: 'PDF’ye çevrimiçi ve ücretsiz OCR uygulayın. Taranmış PDF’lerdeki İngilizce metni tanıyın, aranabilir PDF veya düz metin indirin. OCR motoru tarayıcınızda yerel olarak çalışır.',
    steps: [
      'Taranmış bir PDF ekleyin.',
      'Sayfaları ve kaliteyi seçin. Seçilebilir metin içeren sayfalar atlanabilir.',
      'OCR’yi çalıştırın, tanınan metni gözden geçirin ve aranabilir PDF’yi ya da bir metin dosyasını indirin.',
    ],
    faq: [
      {
        q: 'Hangi diller destekleniyor?',
        a: 'Şimdilik yalnızca İngilizce. Diğer dillerdeki metin yanlış okunur. Araç çalışma şekli değişmeden ileride daha fazla dil eklenebilir.',
      },
      {
        q: 'Belgem bir OCR hizmetine gönderiliyor mu?',
        a: 'Hayır. Tanıma motoru (WebAssembly olarak derlenmiş Tesseract) ve İngilizce verileri bu web sitesinden sunulur ve tarayıcınızın içinde çalışır. Belge yüklenmez.',
      },
      {
        q: 'Ne kadar doğru?',
        a: '200–300 DPI’da, düz ve temiz taranmış basılı metinlerde en iyi sonucu verir. El yazısı, çok küçük yazı, düşük kontrastlı veya eğik sayfalarda daha fazla hata çıkar. Önemli sayıları her zaman kontrol edin.',
      },
    ],
    limits: [
      'Yalnızca İngilizce. El yazısı güvenilir biçimde tanınmaz.',
      'Orijinal sayfalar olduğu gibi korunur; metnin aranabilmesi ve kopyalanabilmesi için görünmez bir metin katmanı eklenir.',
      'OCR büyük belgelerde yavaştır (sayfa başına birkaç saniye). İlk çalıştırmada motor da yüklenir (yaklaşık 3 MB).',
      'PDF başına en fazla 100 MB. Tarayıcınızı korumak için çok büyük sayfalar reddedilebilir.',
    ],
  },
  'sign-pdf': {
    name: 'PDF İmzala',
    description: 'Bir imza çizin, yazın veya yükleyin ve PDF sayfalarınıza yerleştirin.',
    metaDescription: 'PDF’yi çevrimiçi ve ücretsiz imzalayın. İmzanızı çizin, yazın veya yükleyin, istediğiniz sayfalara yerleştirin ve imzalı PDF’yi indirin. Görsel imza, tarayıcınızda.',
    steps: [
      'İmzalamanız gereken PDF’yi ekleyin.',
      'İmzanızı çizerek, adınızı yazarak veya bir resim yükleyerek oluşturun.',
      'İmzayı sayfada doğru yere sürükleyin, hangi sayfalara ekleneceğini seçin ve imzalı PDF’yi indirin.',
    ],
    faq: [
      {
        q: 'Bu, yasal olarak bağlayıcı bir dijital imza mı?',
        a: 'Bu bir görsel imzadır: imzanızın sayfaya yerleştirilmiş bir resmi. Kriptografik bir dijital imza değildir, sertifika taşımaz, kimin imzaladığını kanıtlayamaz ve sonradan yapılan değişiklikleri algılayamaz. Kabul edilip edilmeyeceği sizden isteyen tarafa bağlıdır. Bazı kurumlar sertifikalı e-imza hizmetleri ister.',
      },
      {
        q: 'İmzam bir yerde saklanıyor mu?',
        a: 'Hayır. Tarayıcınızda oluşturulur, yalnızca bu dosya için kullanılır ve sayfadan ayrıldığınızda ya da sayfayı yenilediğinizde unutulur.',
      },
      {
        q: 'PDF’im bir yere yükleniyor mu?',
        a: 'Hayır. PDF, tarayıcınız tarafından okunur ve yeniden yazılır. Bu araç dosyayı bir sunucuya göndermez.',
      },
    ],
    limits: [
      'Yalnızca görsel imza: sertifika, zaman damgası veya kurcalama algılama yoktur.',
      'İmza sayfanın üzerine bir resim olarak yerleştirilir; bir imza form alanını doldurmaz.',
      'PDF başına en fazla 100 MB. Parola korumalı PDF’lerin önce kilidi açılmalıdır.',
    ],
  },
  'fill-pdf-forms': {
    name: 'PDF Formlarını Doldur',
    description: 'Doldurulabilir bir PDF formunun metin kutularını, onay kutularını ve menülerini doldurun.',
    metaDescription: 'PDF formlarını çevrimiçi ve ücretsiz doldurun. Doldurulabilir bir PDF’de alanlara yazın, onay kutularını işaretleyin, seçenekleri belirleyin; düzenlenebilir veya düzleştirilmiş olarak indirin. Tarayıcınızda.',
    steps: [
      'Doldurulabilir bir PDF formu ekleyin.',
      'Dosya adının altında listelenen alanları doldurun. Alanlar sayfaya göre gruplanır.',
      'Formun düzenlenebilir mi kalacağını yoksa düzleştirilecek mi seçin, ardından doldurulmuş PDF’yi indirin.',
    ],
    faq: [
      {
        q: 'PDF’imde hiç alan görünmüyor. Neden?',
        a: 'Burada yalnızca gerçek form alanları olan PDF’ler doldurulabilir. Yalnızca bir resimden veya düz metinden oluşan formda alan yoktur; imza eklemek için PDF İmzala’yı, metin eklemek için PDF’ye Filigran Ekle aracını kullanın. XFA ile hazırlanmış formlar (bazı kamu ve banka formları) desteklenmez.',
      },
      {
        q: 'Düzleştirme ne yapar?',
        a: 'Düzleştirme yanıtlarınızı sayfaya işler ve form alanlarını kaldırır; böylece yanıtlar artık düzenlenemez. Göndereceğiniz kopya için kullanın; düzenlenebilir bir kopyayı kendiniz için saklayın.',
      },
      {
        q: 'PDF’im bir yere yükleniyor mu?',
        a: 'Hayır. PDF, tarayıcınız tarafından okunur ve yeniden yazılır. Bu araç dosyayı bir sunucuya göndermez.',
      },
    ],
    limits: [
      'Metin Latin harflerini, rakamları ve yaygın simgeleri içerebilir (form yazı tipinde başka alfabeler yoktur).',
      'İmza alanları ve düğmeler gösterilir ancak doldurulamaz; imzalar için PDF İmzala’yı kullanın.',
      'XFA (dinamik) formlar desteklenmez.',
      'PDF başına en fazla 100 MB.',
    ],
  },
  'redact-pdf': {
    name: 'PDF Karart',
    description: 'Metni ve alanları kalıcı olarak karartın: karartılan sayfalar görsel olarak yeniden oluşturulur.',
    metaDescription: 'PDF’yi çevrimiçi ve ücretsiz karartın. Adları, numaraları ve alanları karartın; alttaki metin yalnızca kapatılmaz, gerçekten kaldırılır. Tarayıcınızda çalışır; hiçbir şey yüklenmez.',
    steps: [
      'PDF’nizi ekleyin ve bir sayfa seçin.',
      'Kaybolması gereken yerlerin üzerine kutu çizin ya da otomatik işaretlemek için sözcük, e-posta ve numara arayın.',
      'Karartmaları uygulayın ve indirin. Paylaşmadan önce sonucu her zaman kontrol edin.',
    ],
    faq: [
      {
        q: 'Gizlenen metin gerçekten kaldırılıyor mu?',
        a: 'Evet. Karartma yapılan her sayfa, siyah kutular boyanmış bir resim olarak yeniden oluşturulur; böylece alttaki metin ve nesneler yeni dosyada bulunmaz. Birçok aracın yaptığı gibi metnin üzerine siyah bir dikdörtgen çizmek metni seçilebilir bırakırdı. Karartmadığınız sayfalar değiştirilmeden kopyalanır.',
      },
      {
        q: 'Karartılan sayfalarda neden artık metin seçemiyorum?',
        a: 'Çünkü bu sayfalar artık birer resimdir. Alttaki içerik bu şekilde yok edilir. Aranabilir metne ihtiyacınız varsa sonrasında OCR PDF’yi çalıştırın; karartılan sözcükler siyah kalır.',
      },
      {
        q: 'Tüm eşleşmeleri otomatik olarak buluyor mu?',
        a: 'Arama, tek bir metin satırı içinde bulunan eşleşmeleri işaretler. PDF’nin parçalara böldüğü bir ifade ya da bir görselin parçası olan metin gözden kaçabilir. Her sayfayı gözden geçirin ve gerekli yerlere elle kutu çizin.',
      },
    ],
    limits: [
      'Karartılan sayfalar görsele dönüşür: bu sayfalarda seçilebilir metin, bağlantı veya form alanı kalmaz.',
      'Otomatik arama yalnızca seçilebilir metinde ve yalnızca tek bir metin parçası içinde çalışır; taranmış sayfalar için kutuların elle çizilmesi gerekir.',
      'Korumayı seçmediğiniz sürece belge özellikleri (başlık, yazar…) sonuçtan kaldırılır.',
      'PDF başına en fazla 100 MB.',
    ],
  },
  'compare-pdf': {
    name: 'PDF Karşılaştır',
    description: 'İki PDF arasında nelerin değiştiğini görün: metin farkları ve vurgulanan sayfalar.',
    metaDescription: 'İki PDF dosyasını çevrimiçi ve ücretsiz karşılaştırın. Eklenen ve kaldırılan sözcükleri sayfa sayfa görün, sürümler arasındaki görsel farkları vurgulayın. Tarayıcınızda işlenir.',
    steps: [
      'Orijinal PDF’yi ve gözden geçirilmiş PDF’yi ekleyin.',
      'Karşılaştırın: sayfalar, eklenen ve kaldırılan sözcük sayısıyla listelenir.',
      'Metin değişikliklerini okumak için bir sayfayı açın ya da değişen alanları kırmızıyla görmek için görsel görünüme geçin.',
    ],
    faq: [
      {
        q: 'Metin karşılaştırması neyi gösterir?',
        a: 'Her sayfa için orijinal ile gözden geçirilmiş belge arasında eklenen (yeşil) ve kaldırılan (kırmızı) sözcükleri gösterir; değişmeyen metin daraltılır. Sayfalar numaralarına göre eşleştirilir.',
      },
      {
        q: 'Taranmış PDF’lerde ne olur?',
        a: 'Taramalarda seçilebilir metin olmadığından metin karşılaştırması hiçbir şey bulamaz. Görsel karşılaştırmayı kullanın veya önce her iki dosyaya da OCR PDF uygulayın.',
      },
      {
        q: 'PDF’im bir yere yükleniyor mu?',
        a: 'Hayır. PDF, tarayıcınız tarafından okunur ve yeniden yazılır. Bu araç dosyayı bir sunucuya göndermez.',
      },
    ],
    limits: [
      'Sayfalar numaralarına göre karşılaştırılır: bir sayfa eklendiyse sonraki sayfalar değişmiş görünür.',
      'Görsel karşılaştırma her sayfayı ekran çözünürlüğünde oluşturur; bunun altındaki çok küçük farklar görünmeyebilir.',
      'Dosya başına en fazla 100 sayfa karşılaştırılır. Parola korumalı PDF’lerin önce kilidi açılmalıdır.',
    ],
  },
  'word-counter': {
    name: 'Kelime Sayacı',
    description: 'Siz yazdıkça kelimeleri, karakterleri ve cümleleri sayın, okuma süresini tahmin edin.',
    metaDescription: 'Ücretsiz çevrimiçi kelime sayacı. Kelimeleri, karakterleri, cümleleri ve paragrafları sayın; okuma ve konuşma süresini anında tahmin edin.',
    steps: [
      'Metninizi yazın veya yapıştırın.',
      'Düzenleyicinin üstündeki canlı istatistikleri okuyun.',
      'Baştan başlamak için Temizle’yi kullanın.',
    ],
    faq: [
      {
        q: 'Kelimeler nasıl sayılıyor?',
        a: 'Kelime, boşlukla ayrılmış her karakter dizisidir. Tireli kelimeler tek sayılır ve sayılar da kelime olarak sayılır.',
      },
      {
        q: 'Okuma süresi nasıl hesaplanıyor?',
        a: 'Okuma süresi dakikada 238, konuşma süresi dakikada 150 kelime varsayar; bunlar yetişkinler için tipik ortalamalardır.',
      },
    ],
    limits: [
      'Sayımlar boşluklara dayanır; bu yüzden boşluksuz yazılan diller (Çince veya Japonca gibi) her metin dizisi için bir kelime gösterir.',
    ],
  },
  'character-counter': {
    name: 'Karakter Sayacı',
    description: 'Karakterleri boşluklu ve boşluksuz sayın, metni yaygın uzunluk sınırlarına göre kontrol edin.',
    metaDescription: 'Ücretsiz çevrimiçi karakter sayacı. Karakterleri boşluklu ve boşluksuz, bayt ve satır olarak sayın; gönderi, meta etiketi ve SMS sınırlarını kontrol edin.',
    steps: [
      'Metninizi yazın veya yapıştırın.',
      'Toplamları ve sınır çubuklarını okuyun.',
      'Sığana kadar metninizi düzenleyin.',
    ],
    faq: [
      {
        q: 'Emojiler tek karakter olarak sayılıyor mu?',
        a: 'Evet. Sayaç görünen karakterleri (grafem kümelerini) sayar; bu yüzden bir emoji birkaç bayt kullansa da tek sayılır.',
      },
      {
        q: 'SMS sınırlarım neden farklı?',
        a: 'SMS uzunluğu kodlamaya bağlıdır. Latin olmayan karakterler veya emoji içeren mesajlar, burada gösterilen 160 karakterlik referanstan daha kısa bir sınır kullanır.',
      },
    ],
    limits: [
      'Gösterilen sınırlar yaygın yönergelerdir ve zamanla değişir; güncel kural için her platformu kontrol edin.',
    ],
  },
  'case-converter': {
    name: 'Büyük/Küçük Harf Dönüştürücü',
    description: 'Metni büyük, küçük, başlık, cümle, camel, snake, kebab ve daha fazla biçime dönüştürün.',
    metaDescription: 'Ücretsiz çevrimiçi büyük/küçük harf dönüştürücü. Metni BÜYÜK HARF, küçük harf, Başlık Biçimi, Cümle biçimi, camelCase, snake_case, kebab-case ve daha fazlasına çevirin.',
    steps: [
      'Metninizi yapıştırın.',
      'İstediğiniz harf biçimini seçin.',
      'Dönüştürülen sonucu kopyalayın.',
    ],
    faq: [
      {
        q: 'Başlık Biçimi küçük sözcükleri doğru işliyor mu?',
        a: 'Evet. “a”, “of” ve “the” gibi kısa sözcükler, metnin başında veya sonunda olmadıkça küçük harf kalır.',
      },
    ],
    limits: [
      'Başlık biçimi yaygın İngilizce stil kurallarını izler ve her yazım kılavuzuna uymayabilir.',
    ],
  },
  'remove-duplicate-lines': {
    name: 'Yinelenen Satırları Kaldır',
    description: 'Bir listedeki tekrarlanan satırları özgün sırayı koruyarak kaldırın.',
    metaDescription: 'Ücretsiz çevrimiçi yinelenen satır kaldırıcı. Listelerdeki tekrarlanan satırları silin; büyük/küçük harf, boşluk ve boş satırlar için seçenekler vardır.',
    steps: [
      'Listenizi, her satırda bir öğe olacak şekilde yapıştırın.',
      'Büyük/küçük harfin ve boşlukların önemli olup olmadığını seçin.',
      'Yinelenenleri ayıklanmış sonucu kopyalayın.',
    ],
    faq: [
      {
        q: 'Yinelenenlerden hangisi tutuluyor?',
        a: 'İlk görünen tutulur, sonrakiler kaldırılır; böylece özgün sıranız korunur.',
      },
    ],
    limits: [
      'Yalnızca tam satırlar üzerinde çalışır.',
    ],
  },
  'text-sorter': {
    name: 'Metin Sıralayıcı',
    description: 'Satırları alfabetik, sayısal, uzunluğa göre veya rastgele sıralayın.',
    metaDescription: 'Ücretsiz çevrimiçi metin sıralayıcı. Satırları A–Z, Z–A, sayısal, uzunluğa göre sıralayın ya da karıştırın; büyük/küçük harf duyarsız ve doğal sıralama seçenekleriyle.',
    steps: [
      'Satırlarınızı yapıştırın.',
      'Bir sıralama yöntemi ve seçenekler belirleyin.',
      'Sıralanmış listeyi kopyalayın.',
    ],
    faq: [
      {
        q: 'Doğal sıralama nedir?',
        a: 'Doğal sıralama, içindeki sayıları değerlerine göre karşılaştırır; böylece “item2”, “item10”dan önce gelir.',
      },
    ],
    limits: [
      'Alfabetik sıralama tarayıcınızın yerel ayar kurallarını kullanır.',
    ],
  },
  'text-cleaner': {
    name: 'Metin Temizleyici',
    description: 'Boşlukları kırpın, boşlukları birleştirin, boş satırları kaldırın ve görünmez karakterleri temizleyin.',
    metaDescription: 'Ücretsiz çevrimiçi metin temizleyici. Yapıştırılan metindeki fazla boşlukları, boş satırları, satır sonlarını, görünmez karakterleri ve akıllı tırnakları kaldırın.',
    steps: [
      'Metninizi yapıştırın.',
      'İhtiyacınız olan temizleme seçeneklerini işaretleyin.',
      'Temizlenmiş metni kopyalayın.',
    ],
    faq: [
      {
        q: 'Görünmez karakterler nedir?',
        a: 'Sıfır genişlikli boşluklar, yumuşak tireler ve bayt sırası işaretleri web sayfalarından kopyalarken sıklıkla metne karışır ve kodu ya da karşılaştırmaları bozabilir.',
      },
    ],
    limits: [
      'İşlemler sabit bir sırayla uygulanır; farklı bir sıra gerekiyorsa aracı iki kez çalıştırın.',
    ],
  },
  'text-diff-checker': {
    name: 'Metin Fark Denetleyici',
    description: 'İki metni karşılaştırın ve hangi satırların ve sözcüklerin değiştiğini tam olarak görün.',
    metaDescription: 'Ücretsiz çevrimiçi metin fark denetleyici. İki metin sürümünü yan yana karşılaştırın; eklenen, kaldırılan ve değişen satırları veya sözcükleri vurgulayın.',
    steps: [
      'Özgün metni sola, değiştirilmiş metni sağa yapıştırın.',
      'Satır ya da sözcük karşılaştırmasını seçin.',
      'Vurgulanan değişiklikleri inceleyin.',
    ],
    faq: [
      {
        q: 'Satır ve sözcük modu arasındaki fark nedir?',
        a: 'Satır modu, değişen satırların tamamını işaretler. Sözcük modu, metin içindeki tam sözcükleri vurgular; bu da düzyazı için uygundur.',
      },
    ],
    limits: [
      'Çok büyük girdiler (yaklaşık 200.000 karakterin üzeri) yavaş olabilir.',
    ],
  },
  'json-formatter': {
    name: 'JSON Biçimlendirici',
    description: 'JSON’u seçtiğiniz girinti ve anahtar sıralamasıyla biçimlendirin ve okunur hale getirin.',
    metaDescription: 'Ücretsiz çevrimiçi JSON biçimlendirici ve güzelleştirici. JSON’u 2 veya 4 boşluk ya da sekmeyle düzenleyin, anahtarları sıralayın ve hataların tam konumunu görün.',
    steps: [
      'JSON’unuzu yapıştırın.',
      'Girintiyi ve sıralamayı seçin.',
      'Biçimlendirilmiş sonucu kopyalayın veya indirin.',
    ],
    faq: [
      {
        q: 'JSON’um bir sunucuya gönderiliyor mu?',
        a: 'Hayır. Ayrıştırma ve biçimlendirme tarayıcınızda, yerleşik JSON ayrıştırıcısıyla yapılır.',
      },
      {
        q: 'JSON’um neden reddediliyor?',
        a: 'Katı JSON yorumlara, sondaki virgüllere veya tek tırnaklara izin vermez. Hata mesajı sorunun satırını ve sütununu gösterir.',
      },
    ],
    limits: [
      'Tarayıcı kayan noktalı sayı olarak ayrıştırdığı için 2^53’ten büyük sayılar hassasiyet kaybeder.',
    ],
  },
  'json-validator': {
    name: 'JSON Doğrulayıcı',
    description: 'JSON’un geçerli olup olmadığını kontrol edin ve her hatanın tam satır ve sütununu alın.',
    metaDescription: 'Ücretsiz çevrimiçi JSON doğrulayıcı. JSON sözdizimini kontrol edin, hataların tam satır ve sütununu bulun; yapının bir özetini görün.',
    steps: [
      'JSON’unuzu yapıştırın.',
      'Geçerli olup olmadığını anında görün.',
      'Bildirilen hataları düzeltin ve yeniden kontrol edin.',
    ],
    faq: [
      {
        q: 'Bu, bir JSON Şemasına göre doğrulama yapıyor mu?',
        a: 'Hayır. Yalnızca sözdizimini denetler: metnin düzgün biçimlendirilmiş JSON olup olmadığına bakar.',
      },
    ],
    limits: [
      'Yalnızca sözdizimi doğrulaması; JSON Şeması doğrulaması dahil değildir.',
    ],
  },
  'json-minifier': {
    name: 'JSON Küçültücü',
    description: 'JSON’daki boşlukları kaldırarak olabildiğince kompakt hale getirin.',
    metaDescription: 'Ücretsiz çevrimiçi JSON küçültücü. Veri yüklerini küçültmek için JSON’daki boşlukları kaldırın ve kaç bayt kazandığınızı görün.',
    steps: [
      'JSON’unuzu yapıştırın.',
      'Küçültülmüş çıktı, kazanılan boyutla birlikte görünür.',
      'Kopyalayın veya indirin.',
    ],
    faq: [
      {
        q: 'Küçültme verileri değiştiriyor mu?',
        a: 'Hayır. Yalnızca anlamsız boşluklar kaldırılır; anahtarlar, değerler ve sıra değişmez.',
      },
    ],
    limits: [
      'Tarayıcı kayan noktalı sayı olarak ayrıştırdığı için 2^53’ten büyük sayılar hassasiyet kaybeder.',
    ],
  },
  'xml-formatter': {
    name: 'XML Biçimlendirici',
    description: 'XML’i biçimlendirin veya küçültün; eşleşmeyen ya da kapatılmamış etiketleri yakalayın.',
    metaDescription: 'Ücretsiz çevrimiçi XML biçimlendirici. XML’i ayarlanabilir girintiyle güzelleştirin veya küçültün; eşleşmeyen ya da kapatılmamış etiketleri algılayın.',
    steps: [
      'XML’inizi yapıştırın.',
      'Biçimlendir veya Küçült’ü ve girintiyi seçin.',
      'Sonucu kopyalayın.',
    ],
    faq: [
      {
        q: 'XML ne kadar kapsamlı doğrulanıyor?',
        a: 'Araç etiket iç içeliğini, kapatılmamış etiketleri ve sonlandırılmamış yorumları ya da CDATA bölümlerini denetler. DTD veya XSD şemasına göre doğrulama yapmaz.',
      },
    ],
    limits: [
      'Yalnızca yapısal denetimler; DTD veya XSD doğrulaması yoktur.',
    ],
  },
  'url-encoder-decoder': {
    name: 'URL Kodlayıcı / Çözücü',
    description: 'URL’leri ve sorgu dizesi değerlerini yüzde kodlamasıyla kodlayın veya çözün.',
    metaDescription: 'Ücretsiz çevrimiçi URL kodlayıcı ve çözücü. Metni URL’ler için yüzde kodlamasıyla kodlayın veya kodlanmış dizeleri çözün; tam URL’ler ya da tek bileşenler için.',
    steps: [
      'Kodla veya Çöz’ü seçin.',
      'Metninizi ya da URL’nizi yapıştırın.',
      'Sonucu kopyalayın.',
    ],
    faq: [
      {
        q: 'Bileşen mi, tam URL mi?',
        a: 'Sorgu parametresi gibi tek bir değer için Bileşen’i kullanın; / ? & = gibi karakterleri kodlar. URL yapısını bozmamak için Tam URL’yi kullanın.',
      },
    ],
    limits: [
      'Tek başına duran % gibi hatalı yüzde dizilerinde çözme başarısız olur.',
    ],
  },
  'html-encoder-decoder': {
    name: 'HTML Kodlayıcı / Çözücü',
    description: 'Özel karakterleri HTML varlıkları olarak kaçırın veya varlıkları tekrar metne çözün.',
    metaDescription: 'Ücretsiz çevrimiçi HTML kodlayıcı ve çözücü. <, >, & ve tırnakları HTML varlıkları olarak kaçırın ya da adlandırılmış ve sayısal varlıkları çözün.',
    steps: [
      'Kodla veya Çöz’ü seçin.',
      'Metninizi yapıştırın.',
      'Sonucu kopyalayın.',
    ],
    faq: [
      {
        q: 'Kodlama, kullanıcı girdisini HTML için güvenli yapar mı?',
        a: 'Beş özel karakteri kaçırmak, metni HTML öğe içeriğinde ve tırnaklı özniteliklerde güvenli kılar. Diğer bağlamlarda uygun bir şablon kütüphanesinin veya temizleyicinin yerini tutmaz.',
      },
    ],
    limits: [
      'Çözme, yaygın adlandırılmış varlıkları ve tüm sayısal varlıkları destekler.',
    ],
  },
  'base64-encoder-decoder': {
    name: 'Base64 Kodlayıcı / Çözücü',
    description: 'Metni Base64’e kodlayın veya Base64’ü tekrar metne çözün; tam UTF-8 desteği vardır.',
    metaDescription: 'Ücretsiz çevrimiçi Base64 kodlayıcı ve çözücü. Metni Base64’e ve geri çevirin; UTF-8 desteği ve isteğe bağlı URL-güvenli alfabe sunar.',
    steps: [
      'Kodla veya Çöz’ü seçin.',
      'Metninizi yapıştırın.',
      'Sonucu kopyalayın.',
    ],
    faq: [
      {
        q: 'Base64 şifreleme midir?',
        a: 'Hayır. Base64 bir kodlamadır, şifreleme değildir. Herkes çözebilir; bu yüzden sırları korumak için asla kullanmayın.',
      },
      {
        q: 'URL-güvenli Base64 nedir?',
        a: '+ ve / yerine - ve _ kullanır, = dolgusunu kaldırır; böylece değer URL’lerde ve dosya adlarında güvenle durabilir.',
      },
    ],
    limits: [
      'Görsel verileri için Görselden Base64’e ve Base64’ten Görsele araçlarını kullanın.',
    ],
  },
  'regex-tester': {
    name: 'Regex Test Aracı',
    description: 'JavaScript düzenli ifadelerini canlı eşleşme vurgulama ve yakalama gruplarıyla test edin.',
    metaDescription: 'JavaScript için ücretsiz çevrimiçi regex test aracı. Canlı eşleşmeleri, yakalama gruplarını ve adlandırılmış grupları görün; değiştirmelerin önizlemesini inceleyin.',
    steps: [
      'Bir desen girin ve bayrakları seçin.',
      'Test edilecek metni yapıştırın.',
      'Eşleşmeleri, grupları ve değiştirme önizlemesini inceleyin.',
    ],
    faq: [
      {
        q: 'Hangi regex türü kullanılıyor?',
        a: 'Tarayıcınızın uyguladığı biçimiyle JavaScript (ECMAScript) düzenli ifadeleri. PCRE, Python ve diğer türler bazı özelliklerde farklılık gösterir.',
      },
      {
        q: 'Sayfam bazı desenlerde neden donuyor?',
        a: 'İç içe tekrar içeren desenler felaket düzeyinde geri izleme yapabilir. Eşleştirme bir arka plan çalışanında yürür ve 1,5 saniye sonra durdurulur; bu yüzden denetimsiz bir desen sayfayı donduramaz, yine de (a+)+ gibi desenlerden kaçınmalısınız.',
      },
    ],
    limits: [
      'Yalnızca JavaScript regex sözdizimi.',
      'Eşleştirme 5.000 eşleşmeden veya 1,5 saniyeden sonra durur.',
    ],
  },
  'markdown-previewer': {
    name: 'Markdown Önizleyici',
    description: 'Markdown yazın ve yanında güvenli, temizlenmiş bir canlı önizleme görün.',
    metaDescription: 'Ücretsiz çevrimiçi Markdown önizleyici. GitHub tarzı Markdown yazın ve canlı, temizlenmiş HTML önizlemesini görün; ardından HTML’i kopyalayın.',
    steps: [
      'Markdown’ı solda yazın veya yapıştırın.',
      'Oluşturulan sonucu sağda görün.',
      'Markdown’ı ya da oluşturulan HTML’i kopyalayın.',
    ],
    faq: [
      {
        q: 'Önizleme güvenli mi?',
        a: 'Evet. Oluşturulan HTML, görüntülenmeden önce DOMPurify ile temizlenir; böylece komut dosyaları ve olay işleyicileri kaldırılır.',
      },
    ],
    limits: [
      'marked kütüphanesiyle GitHub tarzı Markdown; matematik veya diyagram eklentileri yoktur.',
    ],
  },
  'password-generator': {
    name: 'Parola Oluşturucu',
    description: 'Güçlü parolalar oluşturun: tamamen rastgele veya isimlere ve sözcüklere dayalı akılda kalıcı olanlar.',
    metaDescription: 'Ücretsiz parola oluşturucu: tamamen rastgele parolalar ya da rastgele sayılar, büyük harfler ve simgelerle Nvidia132@Star gibi isim tabanlı parolalar. Tarayıcınızda çalışır.',
    steps: [
      'Bir stil seçin: akılda kalıcı olması için İsim + sözcük, azami güvenlik için Tamamen rastgele.',
      'Uzunluğu, kaç parola gerektiğini ve hangi karakter türlerinin dahil edileceğini ayarlayın.',
      'Bir parolayı kopyalayın ve bir parola yöneticisinde saklayın.',
    ],
    faq: [
      {
        q: 'Oluşturulan parolalar saklanıyor veya bir yere gönderiliyor mu?',
        a: 'Hayır. Parolalar tarayıcınızda crypto.getRandomValues kullanılarak oluşturulur ve asla iletilmez ya da kaydedilmez.',
      },
      {
        q: 'Tesla2026#Tech gibi bir parola güvenli mi?',
        a: 'Sıradan bir sözcükten iyidir ancak rastgele metinden zayıftır. Tahmin etmeye çalışan biri iyi bilinen isim listelerinden başlayabilir; bu yüzden gerçek güç, bit olarak gösterilen olasılık sayısından gelir. İsim tabanlı parolaları düşük riskli hesaplar için, tamamen rastgele olanları e-posta, bankacılık ve parola yöneticileri için kullanın.',
      },
      {
        q: 'Neden yalnızca birkaç simge var?',
        a: 'Oluşturulan parolalar yalnızca @ # $ * simgelerini kullanır; çünkü bunlar neredeyse her web sitesinde kabul edilir ve her klavyede kolayca yazılır.',
      },
      {
        q: 'Bir parola ne kadar uzun olmalı?',
        a: 'Önemli hesaplar için en az 16 karakter. Uzunluk, karmaşıklıktan daha önemlidir.',
      },
    ],
    limits: [
      'İsim tabanlı parolaların akılda tutulması daha kolaydır ancak tamamen rastgele olanlardan zayıftır. Gösterilen güç, nasıl oluşturulduklarını bilen bir saldırgan varsayar.',
      'Sözcük veritabanı, Latin harfleriyle yazılmış seçilmiş bir isim listesidir; en çok kullanılan parolaların listesi değildir.',
      'Güç tahmini, veri ihlali veritabanlarına değil, olası kombinasyonlara dayanır.',
    ],
  },
  'uuid-generator': {
    name: 'UUID Oluşturucu',
    description: 'Biçim seçenekleriyle toplu olarak rastgele sürüm 4 UUID’leri oluşturun.',
    metaDescription: 'Ücretsiz çevrimiçi UUID oluşturucu. Kriptografik rastgelelik kullanarak toplu olarak rastgele v4 UUID’leri büyük harfli, tiresiz veya süslü parantezli biçimde oluşturun.',
    steps: [
      'Kaç UUID gerektiğini ve biçimi seçin.',
      'Oluşturun.',
      'Listeyi kopyalayın.',
    ],
    faq: [
      {
        q: 'İki UUID çakışabilir mi?',
        a: 'Sürüm 4 UUID’leri 122 rastgele bit içerir; bu yüzden çakışma olasılığı uygulamada ihmal edilebilir düzeydedir.',
      },
    ],
    limits: [
      'Yalnızca sürüm 4 (rastgele) UUID’ler oluşturulur.',
    ],
  },
  'timestamp-converter': {
    name: 'Zaman Damgası Dönüştürücü',
    description: 'Unix zaman damgalarını okunabilir tarihlere ve geri dönüştürün; istediğiniz saat diliminde.',
    metaDescription: 'Ücretsiz çevrimiçi Unix zaman damgası dönüştürücü. Epoch saniyelerini veya milisaniyelerini UTC ve yerel saatte tarihe, tarihleri de zaman damgasına dönüştürün.',
    steps: [
      'Bir Unix zaman damgası girin veya bir tarih seçin.',
      'Sonucu UTC, yerel saat diliminiz ve ISO 8601 olarak okuyun.',
      'Herhangi bir değeri kopyalayın.',
    ],
    faq: [
      {
        q: 'Saniye mi, milisaniye mi?',
        a: '13 veya daha fazla haneli zaman damgaları milisaniye, daha kısa olanlar saniye olarak ele alınır. Bunu elle değiştirebilirsiniz.',
      },
    ],
    limits: [
      'Desteklenen aralık JavaScript tarihlerinin aralığıdır: yaklaşık -271821 ile 275760 yılları arası.',
    ],
  },
  'color-converter': {
    name: 'Renk Dönüştürücü',
    description: 'Renkleri HEX, RGB, HSL ve HSV arasında dönüştürün; canlı önizleme ve kontrast denetimi vardır.',
    metaDescription: 'Ücretsiz çevrimiçi renk dönüştürücü. HEX, RGB, HSL ve HSV değerlerini dönüştürün, rengi önizleyin ve WCAG kontrast oranlarını kontrol edin.',
    steps: [
      'Bir rengi herhangi bir biçimde girin veya seçiciyi kullanın.',
      'Tüm biçimlerin güncellendiğini görün.',
      'İhtiyacınız olan değeri kopyalayın.',
    ],
    faq: [
      {
        q: 'Kontrast denetimi ne gösterir?',
        a: 'Rengin beyaz ve siyah metne karşı WCAG kontrast oranını gösterir; bu, okunabilir kombinasyonlar seçmenize yardımcı olur.',
      },
    ],
    limits: [
      'Yalnızca sRGB; LAB, LCH ve Display-P3 gibi CSS Color 4 uzayları desteklenmez.',
      'Saydamlık (alfa) değerleri kabul edilir ancak yok sayılır.',
    ],
  },
  'qr-code-generator': {
    name: 'QR Kod Oluşturucu',
    description: 'Bağlantılar, metin, Wi-Fi, e-posta veya telefon numaraları için PNG ya da SVG olarak QR kodları oluşturun.',
    metaDescription: 'Ücretsiz QR kod oluşturucu. URL’ler, metin, Wi-Fi, e-posta ve telefon numaraları için QR kodları yapın ve PNG veya SVG olarak indirin. Tarayıcınızda oluşturulur.',
    steps: [
      'Kodun neyi içereceğini seçin ve ayrıntıları doldurun.',
      'İsterseniz boyutu, renkleri ve hata düzeltmeyi ayarlayın.',
      'PNG veya SVG dosyasını indirin ve yazdırmadan önce telefonunuzla test edin.',
    ],
    faq: [
      {
        q: 'Kodların süresi doluyor mu?',
        a: 'Hayır. Bunlar statik kodlardır: veri kodun içinde saklanır, bu yüzden sonsuza dek çalışırlar ve hiçbir şey izlenmez.',
      },
      {
        q: 'Hangi hata düzeltme düzeyini seçmeliyim?',
        a: 'Orta, çoğu kullanım için uygundur. Kodun kirlenme veya zarar görme ihtimali varsa Çeyrek ya da Yüksek’i seçin; ancak yüksek düzeyler kodu daha yoğun yapar ve küçük boyutlarda taramayı zorlaştırır.',
      },
      {
        q: 'Kodları ticari amaçla kullanabilir miyim?',
        a: 'Evet. QR kod standardı açıktır ve burada oluşturulan kodlarda bizden ücret, filigran veya izleme yoktur.',
      },
      {
        q: 'Verilerim bir yere gönderiliyor mu?',
        a: 'Hayır. Kod tarayıcınızda oluşturulur ve girdiğiniz Wi-Fi parolaları cihazınızda kalır.',
      },
    ],
    limits: [
      'Yalnızca statik kodlar: tarama izleme ve düzenlenebilir kod yoktur.',
      'Çok uzun metin taranması zor, yoğun bir kod oluşturur; bu yüzden kısa tutun.',
      'Güçlü kontrastlı koyu-açık renkler en iyi taranır.',
    ],
  },
};
export default tools;
