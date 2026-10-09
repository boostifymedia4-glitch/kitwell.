import type { ToolTextMap } from '../../toolText';

/** Translated names, descriptions, steps, FAQ and limits of the tools, keyed by tool slug. */
const tools: ToolTextMap = {
  'jpg-to-png': {
    name: 'JPG a PNG',
    description: 'Convierte fotos JPG y JPEG a imágenes PNG sin pérdida con un solo clic.',
    metaDescription: 'Convierte JPG a PNG online y gratis. Convierte fotos JPEG a PNG por lotes directamente en tu navegador, sin subir archivos ni registrarte.',
    steps: [
      'Arrastra uno o varios archivos JPG a la herramienta, o elígelos desde tu dispositivo.',
      'Revisa las vistas previas y pulsa Convertir.',
      'Descarga cada PNG, o descarga todo en un ZIP.',
    ],
    faq: [
      { q: '¿Mejora la calidad al convertir JPG a PNG?', a: 'No. JPG es un formato con pérdida, así que el detalle que se descartó al guardar el JPG no se puede recuperar. PNG simplemente guarda los píxeles actuales sin más pérdidas, lo que resulta útil para editar o trabajar con transparencias.' },
      { q: '¿Por qué el PNG pesa más que el JPG?', a: 'PNG es un formato sin pérdida y suele almacenar las fotografías de forma menos eficiente que JPG. Usa JPG o WebP cuando el tamaño del archivo importe más que los píxeles exactos.' },
      { q: '¿Se suben mis imágenes a un servidor?', a: 'No. Tu navegador decodifica y vuelve a codificar la imagen con la API Canvas. Esta herramienta no envía el archivo a ningún sitio.' },
    ],
    limits: [
      'Los archivos GIF o WebP animados se convierten usando solo su primer fotograma.',
      'Máximo 25 MB por archivo y 20 archivos por lote, para que tu navegador siga respondiendo bien.',
      'Los metadatos EXIF y los perfiles de color incrustados no se conservan.',
    ],
  },
  'png-to-jpg': {
    name: 'PNG a JPG',
    description: 'Convierte imágenes PNG en archivos JPG más pequeños con calidad ajustable.',
    metaDescription: 'Convierte PNG a JPG online y gratis. Elige la calidad y el color de fondo para imágenes transparentes. Se procesa en tu navegador.',
    steps: [
      'Añade tus archivos PNG.',
      'Ajusta la calidad del JPG y el color de fondo con el que se rellenarán las zonas transparentes.',
      'Pulsa Convertir y descarga los resultados.',
    ],
    faq: [
      { q: '¿Qué ocurre con las zonas transparentes?', a: 'JPG no admite transparencia, así que los píxeles transparentes se rellenan con el color de fondo que elijas (blanco de forma predeterminada).' },
      { q: '¿Qué ajuste de calidad debo usar?', a: 'Entre 80 y 90 es un buen equilibrio para la mayoría de las imágenes. Por debajo de 60, aproximadamente, los artefactos de compresión se notan en el texto y en los bordes nítidos.' },
      { q: '¿Se suben mis imágenes a un servidor?', a: 'No. Tu navegador decodifica y vuelve a codificar la imagen con la API Canvas. Esta herramienta no envía el archivo a ningún sitio.' },
    ],
    limits: [
      'Los archivos GIF o WebP animados se convierten usando solo su primer fotograma.',
      'Máximo 25 MB por archivo y 20 archivos por lote, para que tu navegador siga respondiendo bien.',
      'Los metadatos EXIF y los perfiles de color incrustados no se conservan.',
      'La transparencia se aplana sobre un color sólido porque JPG no puede almacenarla.',
    ],
  },
  'jpg-to-webp': {
    name: 'JPG a WebP',
    description: 'Convierte fotos JPG al moderno formato WebP para obtener archivos más pequeños y páginas más rápidas.',
    metaDescription: 'Convierte JPG a WebP online y gratis. Reduce el tamaño de las fotos para la web con calidad ajustable, procesadas en local en tu navegador.',
    steps: [
      'Añade tus archivos JPG.',
      'Elige la calidad de WebP (80 es un valor predeterminado razonable).',
      'Convierte y descarga.',
    ],
    faq: [
      { q: '¿Es WebP más pequeño que JPG?', a: 'Normalmente entre un 20 % y un 35 % más pequeño con una calidad visual similar, aunque el resultado depende de la imagen.' },
      { q: '¿Todos los navegadores admiten WebP?', a: 'Todos los navegadores principales actuales pueden mostrar WebP. La codificación de WebP en el navegador es compatible con Chrome, Edge, Firefox y las versiones recientes de Safari; si el tuyo no puede, la herramienta te lo indica en lugar de generar un archivo incorrecto.' },
      { q: '¿Se suben mis imágenes a un servidor?', a: 'No. Tu navegador decodifica y vuelve a codificar la imagen con la API Canvas. Esta herramienta no envía el archivo a ningún sitio.' },
    ],
    limits: [
      'Los archivos GIF o WebP animados se convierten usando solo su primer fotograma.',
      'Máximo 25 MB por archivo y 20 archivos por lote, para que tu navegador siga respondiendo bien.',
      'Los metadatos EXIF y los perfiles de color incrustados no se conservan.',
      'Tu navegador debe admitir la codificación de WebP; los navegadores no compatibles muestran un error.',
    ],
  },
  'png-to-webp': {
    name: 'PNG a WebP',
    description: 'Convierte imágenes PNG a WebP conservando la transparencia con una fracción del tamaño.',
    metaDescription: 'Convierte PNG a WebP online y gratis. Conserva la transparencia, reduce el tamaño del archivo y funciona por completo en tu navegador.',
    steps: [
      'Añade tus archivos PNG.',
      'Elige la calidad de WebP.',
      'Convierte y descarga.',
    ],
    faq: [
      { q: '¿Se conserva la transparencia?', a: 'Sí. WebP admite canal alfa, así que los PNG transparentes siguen siendo transparentes.' },
      { q: '¿Puedo obtener un resultado sin pérdida?', a: 'Ajusta la calidad a 100 para obtener la máxima fidelidad. Los navegadores codifican WebP con pérdida, así que usa PNG si necesitas una copia matemáticamente exacta.' },
      { q: '¿Se suben mis imágenes a un servidor?', a: 'No. Tu navegador decodifica y vuelve a codificar la imagen con la API Canvas. Esta herramienta no envía el archivo a ningún sitio.' },
    ],
    limits: [
      'Los archivos GIF o WebP animados se convierten usando solo su primer fotograma.',
      'Máximo 25 MB por archivo y 20 archivos por lote, para que tu navegador siga respondiendo bien.',
      'Los metadatos EXIF y los perfiles de color incrustados no se conservan.',
      'Tu navegador debe admitir la codificación de WebP; los navegadores no compatibles muestran un error.',
    ],
  },
  'webp-to-jpg': {
    name: 'WebP a JPG',
    description: 'Convierte imágenes WebP en archivos JPG de amplia compatibilidad.',
    metaDescription: 'Convierte WebP a JPG online y gratis. Haz que tus imágenes WebP funcionen en todas partes, convertidas en local en tu navegador.',
    steps: [
      'Añade tus archivos WebP.',
      'Ajusta la calidad y el color de fondo para las zonas transparentes.',
      'Convierte y descarga.',
    ],
    faq: [
      { q: '¿Por qué convertir WebP a JPG?', a: 'Algunos programas antiguos, clientes de correo y formularios de subida todavía rechazan WebP. JPG se acepta casi en todas partes.' },
      { q: '¿Se suben mis imágenes a un servidor?', a: 'No. Tu navegador decodifica y vuelve a codificar la imagen con la API Canvas. Esta herramienta no envía el archivo a ningún sitio.' },
    ],
    limits: [
      'Los archivos GIF o WebP animados se convierten usando solo su primer fotograma.',
      'Máximo 25 MB por archivo y 20 archivos por lote, para que tu navegador siga respondiendo bien.',
      'Los metadatos EXIF y los perfiles de color incrustados no se conservan.',
      'La transparencia se aplana sobre un color sólido porque JPG no puede almacenarla.',
    ],
  },
  'webp-to-png': {
    name: 'WebP a PNG',
    description: 'Convierte imágenes WebP a PNG sin pérdida y conserva la transparencia.',
    metaDescription: 'Convierte WebP a PNG online y gratis. Conserva la transparencia y funciona por completo en tu navegador, sin subir archivos.',
    steps: [
      'Añade tus archivos WebP.',
      'Pulsa Convertir.',
      'Descarga los archivos PNG.',
    ],
    faq: [
      { q: '¿Se conserva la transparencia?', a: 'Sí. PNG admite transparencia, así que el canal alfa del WebP se mantiene.' },
      { q: '¿Se suben mis imágenes a un servidor?', a: 'No. Tu navegador decodifica y vuelve a codificar la imagen con la API Canvas. Esta herramienta no envía el archivo a ningún sitio.' },
    ],
    limits: [
      'Los archivos GIF o WebP animados se convierten usando solo su primer fotograma.',
      'Máximo 25 MB por archivo y 20 archivos por lote, para que tu navegador siga respondiendo bien.',
      'Los metadatos EXIF y los perfiles de color incrustados no se conservan.',
    ],
  },
  'image-compressor': {
    name: 'Comprimir imagen',
    description: 'Reduce el tamaño de las imágenes con calidad ajustable y consulta el ahorro exacto.',
    metaDescription: 'Comprime imágenes JPG, PNG y WebP online y gratis. Ajusta la calidad, limita las dimensiones si quieres y compara tamaños. Funciona en tu navegador.',
    steps: [
      'Añade tus imágenes.',
      'Elige un formato de salida y la calidad, y, si quieres, un ancho o alto máximo.',
      'Comprime, compara los tamaños antes y después y descarga.',
    ],
    faq: [
      { q: '¿Cómo reduce el tamaño el compresor?', a: 'Vuelve a codificar la imagen con la calidad que elijas y también puede reducir su escala. La salida PNG es sin pérdida, por lo que solo se encoge si además reduces las dimensiones.' },
      { q: '¿Qué pasa si el resultado pesa más que el original?', a: 'Puede ocurrir con archivos que ya están optimizados. La herramienta lo señala para que puedas conservar el original.' },
      { q: '¿Se conservan los datos EXIF o de ubicación?', a: 'No. Al volver a codificar mediante un canvas se eliminan los metadatos EXIF, como el modelo de cámara y la ubicación GPS, algo que suele convenir antes de compartir una foto. Los perfiles de color tampoco se conservan.' },
    ],
    limits: [
      'Los archivos GIF o WebP animados se convierten usando solo su primer fotograma.',
      'Máximo 25 MB por archivo y 20 archivos por lote, para que tu navegador siga respondiendo bien.',
      'Los metadatos EXIF y los perfiles de color incrustados no se conservan.',
      'Los mejores resultados se obtienen con salida JPG o WebP; la salida PNG es sin pérdida y puede no reducirse.',
    ],
  },
  'image-resizer': {
    name: 'Cambiar tamaño de imagen',
    description: 'Cambia el tamaño de las imágenes en píxeles exactos o en porcentaje, manteniendo la proporción.',
    metaDescription: 'Cambia el tamaño de imágenes online y gratis. Define el ancho y el alto exactos o un porcentaje, mantén la proporción y descarga en JPG, PNG o WebP.',
    steps: [
      'Añade una o varias imágenes.',
      'Elige píxeles o porcentaje e introduce el nuevo tamaño. Mantén activado el bloqueo de proporción para evitar deformaciones.',
      'Cambia el tamaño y descarga.',
    ],
    faq: [
      { q: '¿Puedo ampliar una imagen?', a: 'Sí, pero ampliar no puede añadir detalle, así que el resultado se verá más suave. Reducir la escala da la mejor calidad.' },
      { q: '¿Cuál es el tamaño máximo de salida?', a: 'Los navegadores limitan el tamaño del canvas. Esta herramienta limita la salida a 16 000 px por lado y unos 100 megapíxeles.' },
      { q: '¿Se conservan los datos EXIF o de ubicación?', a: 'No. Al volver a codificar mediante un canvas se eliminan los metadatos EXIF, como el modelo de cámara y la ubicación GPS, algo que suele convenir antes de compartir una foto. Los perfiles de color tampoco se conservan.' },
    ],
    limits: [
      'Los archivos GIF o WebP animados se convierten usando solo su primer fotograma.',
      'Máximo 25 MB por archivo y 20 archivos por lote, para que tu navegador siga respondiendo bien.',
      'Los metadatos EXIF y los perfiles de color incrustados no se conservan.',
      'La salida está limitada a 16 000 px por lado.',
    ],
  },
  'image-cropper': {
    name: 'Recortar imagen',
    description: 'Recorta una imagen a una región exacta o a una proporción fija con vista previa en directo.',
    metaDescription: 'Recorta imágenes online y gratis. Elige una proporción fija o define valores exactos en píxeles con vista previa en directo. Se procesa en tu navegador.',
    steps: [
      'Añade una imagen.',
      'Elige una proporción o arrastra el cuadro de recorte y ajusta con precisión la posición y el tamaño en los campos numéricos.',
      'Pulsa Recortar y descarga.',
    ],
    faq: [
      { q: '¿Recortar reduce la calidad?', a: 'El recorte conserva los píxeles originales. La calidad solo cambia si guardas como JPG o WebP con un ajuste de calidad más bajo.' },
      { q: '¿Se suben mis imágenes a un servidor?', a: 'No. Tu navegador decodifica y vuelve a codificar la imagen con la API Canvas. Esta herramienta no envía el archivo a ningún sitio.' },
    ],
    limits: [
      'Una imagen a la vez.',
      'Máximo 25 MB por archivo.',
      'Las imágenes animadas usan el primer fotograma.',
    ],
  },
  'image-rotator': {
    name: 'Girar imagen',
    description: 'Gira imágenes 90°, 180°, 270° o en cualquier ángulo personalizado.',
    metaDescription: 'Gira imágenes online y gratis. Gira fotos 90, 180 o 270 grados, o en un ángulo personalizado, directamente en tu navegador.',
    steps: [
      'Añade tus imágenes.',
      'Elige un giro o escribe un ángulo personalizado.',
      'Aplica y descarga.',
    ],
    faq: [
      { q: '¿Qué ocurre con los giros que no son de ángulo recto?', a: 'El canvas se amplía para ajustarse a la imagen girada. En la salida JPG las esquinas vacías se rellenan con el fondo que elijas; PNG y WebP las mantienen transparentes.' },
      { q: '¿Se suben mis imágenes a un servidor?', a: 'No. Tu navegador decodifica y vuelve a codificar la imagen con la API Canvas. Esta herramienta no envía el archivo a ningún sitio.' },
    ],
    limits: [
      'Los archivos GIF o WebP animados se convierten usando solo su primer fotograma.',
      'Máximo 25 MB por archivo y 20 archivos por lote, para que tu navegador siga respondiendo bien.',
      'Los metadatos EXIF y los perfiles de color incrustados no se conservan.',
    ],
  },
  'image-flipper': {
    name: 'Voltear imagen',
    description: 'Refleja imágenes en horizontal o en vertical.',
    metaDescription: 'Voltea imágenes en horizontal o en vertical online y gratis. Refleja fotos en tu navegador sin subir archivos.',
    steps: [
      'Añade tus imágenes.',
      'Elige horizontal, vertical o ambas.',
      'Aplica y descarga.',
    ],
    faq: [
      { q: '¿Cuál es la diferencia entre voltear en horizontal y en vertical?', a: 'El volteo horizontal refleja la izquierda y la derecha, como un espejo. El volteo vertical pone la imagen boca abajo a lo largo de su eje horizontal.' },
      { q: '¿Se suben mis imágenes a un servidor?', a: 'No. Tu navegador decodifica y vuelve a codificar la imagen con la API Canvas. Esta herramienta no envía el archivo a ningún sitio.' },
    ],
    limits: [
      'Los archivos GIF o WebP animados se convierten usando solo su primer fotograma.',
      'Máximo 25 MB por archivo y 20 archivos por lote, para que tu navegador siga respondiendo bien.',
      'Los metadatos EXIF y los perfiles de color incrustados no se conservan.',
    ],
  },
  'image-format-converter': {
    name: 'Convertidor de formato de imagen',
    description: 'Convierte entre JPG, PNG y WebP con una sola herramienta flexible.',
    metaDescription: 'Convierte imágenes entre JPG, PNG y WebP online y gratis. Elige el formato de salida y la calidad, con procesamiento local en tu navegador.',
    steps: [
      'Añade imágenes en cualquier formato compatible.',
      'Elige el formato de salida y la calidad.',
      'Convierte y descarga.',
    ],
    faq: [
      { q: '¿Qué formatos puedo usar?', a: 'Entrada: JPG, PNG, WebP, GIF, BMP y AVIF si tu navegador puede decodificarlos. Salida: JPG, PNG y WebP.' },
      { q: '¿Y HEIC o TIFF?', a: 'Los navegadores no pueden decodificar HEIC ni TIFF de forma nativa, así que todavía no son compatibles.' },
      { q: '¿Se suben mis imágenes a un servidor?', a: 'No. Tu navegador decodifica y vuelve a codificar la imagen con la API Canvas. Esta herramienta no envía el archivo a ningún sitio.' },
    ],
    limits: [
      'Los archivos GIF o WebP animados se convierten usando solo su primer fotograma.',
      'Máximo 25 MB por archivo y 20 archivos por lote, para que tu navegador siga respondiendo bien.',
      'Los metadatos EXIF y los perfiles de color incrustados no se conservan.',
      'No se admiten archivos HEIC/HEIF, TIFF ni RAW.',
    ],
  },
  'image-to-base64': {
    name: 'Imagen a Base64',
    description: 'Codifica una imagen como URI de datos Base64 para CSS, HTML o JSON.',
    metaDescription: 'Convierte una imagen en una cadena Base64 o URI de datos online y gratis. Copia fragmentos de HTML y CSS ya preparados. Funciona en tu navegador.',
    steps: [
      'Añade una imagen.',
      'Elige el estilo de salida: URI de datos, Base64 sin formato, HTML <img> o CSS.',
      'Copia el resultado.',
    ],
    faq: [
      { q: '¿Cuándo debo usar imágenes en Base64?', a: 'Para iconos pequeños en CSS o en correos, donde una solicitud adicional cuesta más que el aumento de tamaño de aproximadamente un 33 %. Evítalo con fotos grandes.' },
      { q: '¿Se suben mis imágenes a un servidor?', a: 'No. Tu navegador decodifica y vuelve a codificar la imagen con la API Canvas. Esta herramienta no envía el archivo a ningún sitio.' },
    ],
    limits: [
      'Máximo 5 MB por imagen, ya que el texto Base64 se vuelve muy grande.',
      'Una imagen a la vez.',
    ],
  },
  'base64-to-image': {
    name: 'Base64 a imagen',
    description: 'Decodifica una cadena Base64 o URI de datos y conviértela de nuevo en una imagen descargable.',
    metaDescription: 'Convierte una cadena Base64 o URI de datos en imagen online y gratis. Previsualiza y descarga el PNG, JPG, WebP o GIF decodificado.',
    steps: [
      'Pega una cadena Base64 o un URI de datos completo.',
      'La imagen se decodifica y se previsualiza al instante.',
      'Descarga la imagen.',
    ],
    faq: [
      { q: '¿Necesito el prefijo «data:image/png;base64,»?', a: 'No. Sin prefijo, la herramienta detecta el formato a partir de la firma del archivo (PNG, JPG, GIF, WebP).' },
      { q: '¿Por qué me aparece un error?', a: 'Probablemente la cadena está truncada, contiene caracteres de más o no es una imagen. Por seguridad, aquí también se rechazan los datos SVG.' },
    ],
    limits: [
      'Admite PNG, JPG, GIF y WebP. SVG no se muestra de forma intencionada.',
      'Máximo 10 MB de datos decodificados.',
    ],
  },
  'image-color-picker': {
    name: 'Selector de color de imagen',
    description: 'Elige colores exactos de cualquier imagen y extrae su paleta dominante.',
    metaDescription: 'Elige colores de una imagen online y gratis. Haz clic en cualquier píxel para obtener valores HEX, RGB y HSL y extrae una paleta de colores dominantes.',
    steps: [
      'Añade una imagen.',
      'Haz clic o toca en cualquier punto (o usa las teclas de flecha) para muestrear un píxel.',
      'Copia el valor HEX, RGB o HSL, o copia desde la paleta extraída.',
    ],
    faq: [
      { q: '¿Cómo se calcula la paleta?', a: 'La imagen se reduce de tamaño y sus colores se agrupan en intervalos; se muestran los más comunes. Es una aproximación de los colores dominantes, no una lista exhaustiva.' },
      { q: '¿Se suben mis imágenes a un servidor?', a: 'No. Tu navegador decodifica y vuelve a codificar la imagen con la API Canvas. Esta herramienta no envía el archivo a ningún sitio.' },
    ],
    limits: [
      'Una imagen a la vez.',
      'Los colores se muestrean a partir de los píxeles sRGB mostrados; los perfiles de color se ignoran.',
    ],
  },
  'image-watermark': {
    name: 'Marca de agua en imagen',
    description: 'Añade una marca de agua de texto o logotipo a muchas imágenes a la vez, única o en mosaico.',
    metaDescription: 'Añade una marca de agua a imágenes online y gratis. Estampa texto o un logotipo en fotos JPG, PNG y WebP por lotes, con opacidad y posición. Funciona en tu navegador.',
    steps: [
      'Añade tus imágenes.',
      'Elige texto o un logotipo y ajusta su tamaño, opacidad, posición y disposición.',
      'Aplícala y descarga los resultados o un ZIP.',
    ],
    faq: [
      { q: '¿Puedo usar urdu u otros alfabetos?', a: 'Sí. Las marcas de agua de imagen usan las fuentes de tu dispositivo, así que funciona cualquier escritura que tu sistema pueda mostrar.' },
      { q: '¿Modifica mis originales?', a: 'No. Las copias con marca de agua se guardan como archivos nuevos.' },
      { q: '¿Se conservan los datos EXIF o de ubicación?', a: 'No. Al volver a codificar mediante un canvas se eliminan los metadatos EXIF, como el modelo de cámara y la ubicación GPS, algo que suele convenir antes de compartir una foto. Los perfiles de color tampoco se conservan.' },
    ],
    limits: [
      'Los archivos GIF o WebP animados se convierten usando solo su primer fotograma.',
      'Máximo 25 MB por archivo y 20 archivos por lote, para que tu navegador siga respondiendo bien.',
      'Los metadatos EXIF y los perfiles de color incrustados no se conservan.',
      'Archivos de logotipo: PNG, JPG o WebP, de hasta 25 MB.',
    ],
  },
  'svg-converter': {
    name: 'SVG a PNG / JPG',
    description: 'Convierte gráficos vectoriales SVG en imágenes PNG, JPG o WebP de cualquier tamaño.',
    metaDescription: 'Convierte SVG a PNG o JPG online y gratis. Elige una escala o un ancho exacto para obtener resultados nítidos; PNG conserva la transparencia. Funciona en tu navegador.',
    steps: [
      'Añade tus archivos SVG.',
      'Elige PNG, JPG o WebP y el tamaño de salida.',
      'Convierte y descarga.',
    ],
    faq: [
      { q: '¿La imagen se mantendrá nítida en tamaños grandes?', a: 'Sí. El SVG se dibuja al tamaño que elijas, así que una exportación a 4× es tan nítida como una a 1×.' },
      { q: '¿Por qué mi SVG se ve diferente?', a: 'Los navegadores no admiten todas las funciones de SVG, y los SVG que dependen de fuentes o imágenes externas recurren a valores predeterminados. Incrusta las fuentes y las imágenes dentro del SVG para obtener el mejor resultado.' },
      { q: '¿Es seguro abrir archivos SVG aquí?', a: 'Sí. El SVG se dibuja como una imagen, por lo que los scripts que contenga no se ejecutan.' },
      { q: '¿Se suben mis imágenes a un servidor?', a: 'No. Tu navegador decodifica y vuelve a codificar la imagen con la API Canvas. Esta herramienta no envía el archivo a ningún sitio.' },
    ],
    limits: [
      'Máximo 25 MB por archivo y 20 archivos por lote.',
      'Las fuentes, imágenes y estilos enlazados desde fuera del SVG no se cargan.',
      'Un SVG sin tamaño usa su viewBox, o 300 × 150 px si no hay ninguno definido.',
    ],
  },
  'enlarge-image': {
    name: 'Ampliar imagen',
    description: 'Haz las imágenes más grandes con un remuestreo suave y nítido, de 2× a 4× o hasta un ancho determinado.',
    metaDescription: 'Amplía imágenes online y gratis. Aumenta JPG, PNG y WebP 2×, 3×, 4× o hasta un ancho exacto con remuestreo Lanczos y enfoque opcional.',
    steps: [
      'Añade tus imágenes.',
      'Elige un factor o un ancho de destino, y si quieres aplicar enfoque.',
      'Amplía y descarga.',
    ],
    faq: [
      { q: '¿Es un escalado con IA?', a: 'No. Usa un remuestreo de alta calidad, que deja las imágenes ampliadas suaves y limpias, pero no puede inventar el detalle que falta. Las fotos muy pequeñas o borrosas seguirán viéndose suaves.' },
      { q: '¿Qué tamaño puede tener el resultado?', a: 'Hasta 16 000 px por lado y unos 100 megapíxeles, según lo que tu navegador pueda manejar.' },
      { q: '¿Se conservan los datos EXIF o de ubicación?', a: 'No. Al volver a codificar mediante un canvas se eliminan los metadatos EXIF, como el modelo de cámara y la ubicación GPS, algo que suele convenir antes de compartir una foto. Los perfiles de color tampoco se conservan.' },
    ],
    limits: [
      'Los archivos GIF o WebP animados se convierten usando solo su primer fotograma.',
      'Máximo 25 MB por archivo y 20 archivos por lote, para que tu navegador siga respondiendo bien.',
      'Los metadatos EXIF y los perfiles de color incrustados no se conservan.',
      'No añade detalle, por lo que no es un escalado con IA.',
      'La salida está limitada a 16 000 px por lado.',
    ],
  },
  'blur-image-area': {
    name: 'Desenfocar o pixelar zona',
    description: 'Oculta caras, matrículas o datos privados desenfocando, pixelando o tapando zonas.',
    metaDescription: 'Desenfoca o pixela una parte de una imagen online y gratis. Dibuja cuadros sobre caras, matrículas o texto para ocultarlos, directamente en tu navegador.',
    steps: [
      'Añade una imagen.',
      'Arrastra sobre la imagen para dibujar cuadros sobre lo que quieras ocultar.',
      'Elige desenfoque, pixelado o un cuadro negro, aplícalo y descarga.',
    ],
    faq: [
      { q: '¿Es seguro desenfocar datos sensibles?', a: 'Para todo lo que deba seguir siendo privado, como números de documentos de identidad o matrículas, usa el cuadro negro. El desenfoque y el pixelado a veces pueden revertirse en parte.' },
      { q: '¿Detecta caras automáticamente?', a: 'No. Tú dibujas los cuadros. La detección automática requiere un modelo de IA de gran tamaño que no está incluido.' },
      { q: '¿Puedo cambiar de opinión?', a: 'Sí. Elimina o vuelve a dibujar los cuadros antes de aplicar. Tu archivo original nunca se modifica.' },
      { q: '¿Se conservan los datos EXIF o de ubicación?', a: 'No. Al volver a codificar mediante un canvas se eliminan los metadatos EXIF, como el modelo de cámara y la ubicación GPS, algo que suele convenir antes de compartir una foto. Los perfiles de color tampoco se conservan.' },
    ],
    limits: [
      'Una imagen a la vez, de hasta 25 MB.',
      'Las zonas se eligen a mano; no hay detección de caras.',
      'Las imágenes animadas usan el primer fotograma.',
    ],
  },
  'qr-code-scanner': {
    name: 'Escáner de códigos QR',
    description: 'Lee códigos QR de fotos y capturas de pantalla y consulta exactamente qué contienen.',
    metaDescription: 'Escanea un código QR desde una imagen online y gratis. Sube una foto o captura para leer su enlace, texto o datos de Wi-Fi. Funciona en tu navegador.',
    steps: [
      'Añade una o varias imágenes que contengan un código QR.',
      'El código se lee automáticamente.',
      'Copia el resultado, o abre un enlace después de comprobarlo.',
    ],
    faq: [
      { q: '¿Puede escanear con mi cámara?', a: 'Todavía no. Esta herramienta lee códigos QR de archivos de imagen. En un teléfono, haz una foto del código y elígela aquí, o usa la aplicación de la cámara.' },
      { q: '¿Es seguro abrir los enlaces escaneados?', a: 'Comprueba primero la dirección. Se muestra el enlace completo y desde aquí solo se pueden abrir enlaces web (http o https). Los enlaces de script y de datos nunca se abren.' },
      { q: '¿Por qué no se encontró ningún código?', a: 'Puede que el código esté borroso, recortado, demasiado pequeño o con poco contraste. Prueba con una imagen más nítida y cercana que muestre el código completo con un margen claro alrededor.' },
      { q: '¿Se suben mis imágenes?', a: 'No. La imagen se lee en tu navegador y esta herramienta no la envía a ningún sitio.' },
    ],
    limits: [
      'Hasta 10 imágenes, de 25 MB cada una.',
      'Se lee un código por imagen.',
      'Solo códigos QR estándar; no se admiten otros códigos de barras.',
    ],
  },
  'gif-maker': {
    name: 'Creador de GIF',
    description: 'Convierte tus imágenes en un GIF animado con tiempos, tamaño y repetición personalizados.',
    metaDescription: 'Crea un GIF animado a partir de imágenes online y gratis. Reordena los fotogramas, define el retardo de cada uno, elige tamaño y repetición y descarga el GIF. Se crea en tu navegador.',
    steps: [
      'Añade dos o más imágenes (o solo una para un GIF estático).',
      'Arrástralas para ordenarlas, define cuánto tiempo se muestra cada fotograma y elige el tamaño, la repetición y los colores.',
      'Crea el GIF, previsualízalo y descárgalo.',
    ],
    faq: [
      { q: '¿Por qué mi GIF pesa tanto?', a: 'Los GIF almacenan cada fotograma como una imagen limitada a 256 colores. Menos fotogramas, un ancho menor y menos colores reducen el archivo. La herramienta muestra el tamaño en cuanto se crea el GIF.' },
      { q: '¿Puedo conservar las zonas transparentes?', a: 'Sí, activa «Conservar zonas transparentes» para imágenes PNG o WebP con transparencia. La transparencia en GIF es de todo o nada por píxel, así que los bordes suaves se vuelven duros.' },
      { q: '¿Se suben mis imágenes a un servidor?', a: 'No. Tu navegador decodifica y vuelve a codificar la imagen con la API Canvas. Esta herramienta no envía el archivo a ningún sitio.' },
    ],
    limits: [
      'Hasta 100 fotogramas; cuanto más grandes sean, más memoria necesitará tu navegador.',
      'Los GIF están limitados a 256 colores por fotograma, por lo que las fotos pueden verse granuladas.',
      'Las entradas animadas (GIF, WebP) aportan solo su primer fotograma.',
    ],
  },
  'photo-editor': {
    name: 'Editor de fotos',
    description: 'Ajusta, aplica filtros, gira, recorta y añade texto a una foto, con vista previa en directo.',
    metaDescription: 'Editor de fotos online gratuito. Ajusta el color, aplica filtros, gira, endereza, recorta y añade texto, y descarga un PNG, JPG o WebP. Privado, en tu navegador.',
    steps: [
      'Añade una foto.',
      'Usa las pestañas para ajustar los colores, aplicar un filtro, girar o recortar y añadir texto. La vista previa se actualiza sobre la marcha.',
      'Elige el formato y descarga tu foto editada.',
    ],
    faq: [
      { q: '¿Se modifica el archivo original?', a: 'No. Tu archivo nunca se modifica; la imagen editada se crea como una descarga nueva.' },
      { q: '¿Se pierde calidad al exportar?', a: 'PNG conserva cada píxel. JPG y WebP son con pérdida; usa una calidad de 90 o superior para que las fotos se vean igual. Las ediciones se aplican al tamaño completo de tu imagen, no al de la vista previa.' },
      { q: '¿Se suben mis imágenes a un servidor?', a: 'No. Tu navegador decodifica y vuelve a codificar la imagen con la API Canvas. Esta herramienta no envía el archivo a ningún sitio.' },
    ],
    limits: [
      'Una foto a la vez, de hasta 25 MB y unos 50 megapíxeles.',
      'Las ediciones se aplican en un orden fijo: girar y recortar, ajustes de color, desenfoque y enfoque, viñeta y, por último, texto.',
      'Los datos EXIF, como la ubicación, no se copian a la imagen editada.',
      'Sin capas, pinceles ni funciones de IA.',
    ],
  },
  'jpg-to-pdf': {
    name: 'JPG a PDF',
    description: 'Convierte fotos JPG en un PDF, con una imagen por página.',
    metaDescription: 'Convierte JPG a PDF online y gratis. Elige el tamaño de página, la orientación y los márgenes. Los datos JPEG se incrustan sin recomprimir.',
    steps: [
      'Añade tus archivos JPG y arrástralos o usa las flechas para definir su orden.',
      'Elige el tamaño de página, la orientación y el margen.',
      'Crea el PDF y descárgalo.',
    ],
    faq: [
      { q: '¿Baja la calidad de la imagen?', a: 'No. Los archivos JPG se incrustan en el PDF tal cual, sin recomprimir.' },
      { q: '¿Se sube mi PDF a algún sitio?', a: 'No. Tu navegador lee y reescribe el PDF. Esta herramienta no envía el archivo a ningún servidor.' },
    ],
    limits: [
      'Máximo 25 MB por imagen y 100 imágenes por PDF.',
      'Aquí solo se aceptan imágenes JPG; usa Imágenes a PDF para formatos mixtos.',
    ],
  },
  'png-to-pdf': {
    name: 'PNG a PDF',
    description: 'Convierte imágenes PNG en un PDF conservando la transparencia.',
    metaDescription: 'Convierte PNG a PDF online y gratis. Elige el tamaño de página y los márgenes; la transparencia se conserva. Funciona en tu navegador.',
    steps: [
      'Añade tus archivos PNG y define su orden.',
      'Elige el tamaño de página, la orientación y el margen.',
      'Crea el PDF y descárgalo.',
    ],
    faq: [
      { q: '¿Se conserva la transparencia?', a: 'Sí. Las imágenes PNG se incrustan con su canal alfa, así que las zonas transparentes dejan ver la página blanca que hay detrás.' },
      { q: '¿Se sube mi PDF a algún sitio?', a: 'No. Tu navegador lee y reescribe el PDF. Esta herramienta no envía el archivo a ningún servidor.' },
    ],
    limits: [
      'Máximo 25 MB por imagen y 100 imágenes por PDF.',
      'Aquí solo se aceptan imágenes PNG; usa Imágenes a PDF para formatos mixtos.',
    ],
  },
  'images-to-pdf': {
    name: 'Imágenes a PDF',
    description: 'Combina imágenes JPG y PNG en un único PDF en el orden que elijas.',
    metaDescription: 'Combina varias imágenes en un solo PDF online y gratis. Reordena las páginas y elige el tamaño de página y los márgenes. Se procesa en tu navegador.',
    steps: [
      'Añade imágenes JPG y PNG (puedes soltar varias a la vez).',
      'Reordénalas y elige el tamaño de página, la orientación y el margen.',
      'Crea el PDF y descárgalo.',
    ],
    faq: [
      { q: '¿Qué formatos de imagen funcionan?', a: 'JPG y PNG se incrustan directamente. WebP, GIF y BMP se convierten primero a PNG si tu navegador puede decodificarlos.' },
      { q: '¿Qué hace «Ajustar a la imagen»?', a: 'Cada página tiene el tamaño de su imagen, de modo que nada se escala ni se rellena. Elige A4 o Carta para páginas de documento estándar.' },
      { q: '¿Se sube mi PDF a algún sitio?', a: 'No. Tu navegador lee y reescribe el PDF. Esta herramienta no envía el archivo a ningún servidor.' },
    ],
    limits: [
      'Máximo 25 MB por imagen y 100 imágenes por PDF.',
    ],
  },
  'merge-pdf': {
    name: 'Unir PDF',
    description: 'Combina varios archivos PDF en un solo documento en el orden que elijas.',
    metaDescription: 'Une archivos PDF online y gratis. Combina varios PDF en uno, reordénalos y descarga al instante. Se procesa en tu navegador.',
    steps: [
      'Añade dos o más archivos PDF.',
      'Colócalos en el orden que quieras con las flechas.',
      'Une y descarga el PDF combinado.',
    ],
    faq: [
      { q: '¿Se conservan los marcadores y los campos de formulario?', a: 'Las páginas se copian con su contenido visible y sus enlaces. Los marcadores a nivel de documento y los datos interactivos de formulario no se trasladan.' },
      { q: '¿Puede abrir PDF protegidos con contraseña?', a: 'No. Los PDF cifrados se detectan y se rechazan con un mensaje claro. Quita primero la contraseña con nuestra herramienta Desbloquear PDF.' },
      { q: '¿Se sube mi PDF a algún sitio?', a: 'No. Tu navegador lee y reescribe el PDF. Esta herramienta no envía el archivo a ningún servidor.' },
    ],
    limits: [
      'Máximo 100 MB por PDF.',
      'No se admiten PDF protegidos con contraseña (cifrados).',
      'Los PDF muy grandes o complejos dependen de la memoria de tu dispositivo.',
      'Los marcadores/esquemas y los campos de formulario de los archivos de origen no se unen.',
    ],
  },
  'split-pdf': {
    name: 'Dividir PDF',
    description: 'Divide un PDF por rangos de páginas, en páginas individuales o en bloques de tamaño fijo.',
    metaDescription: 'Divide un PDF online y gratis. Sepáralo por rangos de páginas, página por página o cada N páginas y descarga un ZIP. Funciona en tu navegador.',
    steps: [
      'Añade un PDF.',
      'Elige cómo dividirlo: rangos personalizados como 1-3, 4-6, cada página o cada N páginas.',
      'Divide y descarga las partes por separado o en un ZIP.',
    ],
    faq: [
      { q: '¿Cómo escribo los rangos?', a: 'Separa los archivos de salida con comas. Cada archivo puede ser un rango (1-3), una sola página (5) o una combinación separada por un signo más (1-2+7). Ejemplo: 1-3, 4-6, 7+9.' },
      { q: '¿Puede abrir PDF protegidos con contraseña?', a: 'No. Los PDF cifrados se detectan y se rechazan con un mensaje claro. Quita primero la contraseña con nuestra herramienta Desbloquear PDF.' },
    ],
    limits: [
      'Máximo 100 MB por PDF.',
      'No se admiten PDF protegidos con contraseña (cifrados).',
      'Los PDF muy grandes o complejos dependen de la memoria de tu dispositivo.',
    ],
  },
  'rotate-pdf': {
    name: 'Girar PDF',
    description: 'Gira páginas individuales o todo el PDF, con vistas previas en miniatura.',
    metaDescription: 'Gira páginas de PDF online y gratis. Gira páginas sueltas o todas 90, 180 o 270 grados y guarda un PDF nuevo. Funciona en tu navegador.',
    steps: [
      'Añade un PDF; sus páginas aparecen como miniaturas.',
      'Gira páginas individuales o gira todas a la vez.',
      'Guarda el PDF girado.',
    ],
    faq: [
      { q: '¿Es permanente el giro?', a: 'Se guarda en el nuevo PDF como un atributo de rotación de página. El contenido de la página no se vuelve a dibujar, así que no se pierde nada.' },
      { q: '¿Puede abrir PDF protegidos con contraseña?', a: 'No. Los PDF cifrados se detectan y se rechazan con un mensaje claro. Quita primero la contraseña con nuestra herramienta Desbloquear PDF.' },
    ],
    limits: [
      'Máximo 100 MB por PDF.',
      'No se admiten PDF protegidos con contraseña (cifrados).',
      'Los PDF muy grandes o complejos dependen de la memoria de tu dispositivo.',
    ],
  },
  'extract-pdf-pages': {
    name: 'Extraer páginas de PDF',
    description: 'Elige las páginas que necesitas de un PDF y guárdalas como un documento nuevo.',
    metaDescription: 'Extrae páginas de un PDF online y gratis. Selecciona las páginas visualmente o por rango y guarda un PDF nuevo. Se procesa en tu navegador.',
    steps: [
      'Añade un PDF.',
      'Haz clic en las miniaturas de las páginas para seleccionarlas, o escribe un rango como 1-3, 8.',
      'Extrae y descarga el nuevo PDF.',
    ],
    faq: [
      { q: '¿Puedo usarlo para eliminar páginas?', a: 'Sí. Selecciona las páginas que quieres conservar y extráelas; las demás quedan fuera del archivo nuevo.' },
      { q: '¿Puede abrir PDF protegidos con contraseña?', a: 'No. Los PDF cifrados se detectan y se rechazan con un mensaje claro. Quita primero la contraseña con nuestra herramienta Desbloquear PDF.' },
    ],
    limits: [
      'Máximo 100 MB por PDF.',
      'No se admiten PDF protegidos con contraseña (cifrados).',
      'Los PDF muy grandes o complejos dependen de la memoria de tu dispositivo.',
    ],
  },
  'reorder-pdf-pages': {
    name: 'Reordenar páginas de PDF',
    description: 'Reorganiza, elimina y gira páginas de forma visual y guarda el resultado.',
    metaDescription: 'Reordena páginas de PDF online y gratis. Arrastra o mueve páginas, elimina las que no necesites y guarda un PDF nuevo. Funciona en tu navegador.',
    steps: [
      'Añade un PDF; sus páginas aparecen como miniaturas.',
      'Arrastra las páginas, o usa los botones de flecha, para cambiar su orden. Elimina las páginas que no necesites.',
      'Guarda el PDF reordenado.',
    ],
    faq: [
      { q: '¿Puedo reordenar con el teclado?', a: 'Sí. Usa los botones de mover antes y mover después de cada página.' },
      { q: '¿Puede abrir PDF protegidos con contraseña?', a: 'No. Los PDF cifrados se detectan y se rechazan con un mensaje claro. Quita primero la contraseña con nuestra herramienta Desbloquear PDF.' },
    ],
    limits: [
      'Máximo 100 MB por PDF.',
      'No se admiten PDF protegidos con contraseña (cifrados).',
      'Los PDF muy grandes o complejos dependen de la memoria de tu dispositivo.',
    ],
  },
  'pdf-to-jpg': {
    name: 'PDF a JPG',
    description: 'Convierte las páginas de un PDF en imágenes JPG con la resolución que elijas.',
    metaDescription: 'Convierte PDF a JPG online y gratis. Genera todas las páginas o una selección hasta 300 DPI y descarga un ZIP. Funciona en tu navegador.',
    steps: [
      'Añade un PDF.',
      'Elige la resolución y, si quieres, qué páginas convertir.',
      'Convierte y descarga las imágenes por separado o en un ZIP.',
    ],
    faq: [
      { q: '¿Qué resolución debo elegir?', a: '150 DPI es adecuado para pantallas; 300 DPI para imprimir. Los valores más altos crean imágenes más grandes y necesitan más memoria.' },
      { q: '¿Las páginas se representan con fidelidad?', a: 'La representación usa PDF.js de Mozilla, que maneja bien la mayoría de los PDF. Las fuentes poco habituales o los gráficos avanzados pueden diferir ligeramente de otros visores.' },
      { q: '¿Puede abrir PDF protegidos con contraseña?', a: 'No. Los PDF cifrados se detectan y se rechazan con un mensaje claro. Quita primero la contraseña con nuestra herramienta Desbloquear PDF.' },
    ],
    limits: [
      'Máximo 100 MB por PDF.',
      'No se admiten PDF protegidos con contraseña (cifrados).',
      'Los PDF muy grandes o complejos dependen de la memoria de tu dispositivo.',
      'Cada página está limitada a unos 50 megapíxeles.',
    ],
  },
  'pdf-to-png': {
    name: 'PDF a PNG',
    description: 'Convierte las páginas de un PDF en imágenes PNG nítidas y sin pérdida.',
    metaDescription: 'Convierte PDF a PNG online y gratis. Genera páginas de hasta 300 DPI como imágenes sin pérdida y descarga un ZIP. Funciona en tu navegador.',
    steps: [
      'Añade un PDF.',
      'Elige la resolución y las páginas.',
      'Convierte y descarga las imágenes por separado o en un ZIP.',
    ],
    faq: [
      { q: '¿Por qué elegir PNG en lugar de JPG?', a: 'PNG se mantiene nítido en el texto y los dibujos de líneas, y admite transparencia. Los archivos son más grandes que los JPG.' },
      { q: '¿Puede abrir PDF protegidos con contraseña?', a: 'No. Los PDF cifrados se detectan y se rechazan con un mensaje claro. Quita primero la contraseña con nuestra herramienta Desbloquear PDF.' },
    ],
    limits: [
      'Máximo 100 MB por PDF.',
      'No se admiten PDF protegidos con contraseña (cifrados).',
      'Los PDF muy grandes o complejos dependen de la memoria de tu dispositivo.',
      'Cada página está limitada a unos 50 megapíxeles.',
    ],
  },
  'pdf-viewer': {
    name: 'Visor de PDF',
    description: 'Abre y lee un PDF de forma privada en tu navegador, con zoom y navegación por páginas.',
    metaDescription: 'Visualiza archivos PDF online y gratis. Haz zoom, ve a una página y lee documentos en tu navegador sin subirlos a ningún sitio.',
    steps: [
      'Añade un PDF.',
      'Desplázate o usa los controles de página para navegar.',
      'Acerca o aleja el zoom según necesites.',
    ],
    faq: [
      { q: '¿Puedo editar o anotar el PDF aquí?', a: 'No. Este es un visor de solo lectura. Usa las herramientas de páginas para girar, reordenar o extraer páginas.' },
      { q: '¿Puede abrir PDF protegidos con contraseña?', a: 'No. Los PDF cifrados se detectan y se rechazan con un mensaje claro. Quita primero la contraseña con nuestra herramienta Desbloquear PDF.' },
    ],
    limits: [
      'Máximo 100 MB por PDF.',
      'No se admiten PDF protegidos con contraseña (cifrados).',
      'Los PDF muy grandes o complejos dependen de la memoria de tu dispositivo.',
      'Solo lectura: sin anotaciones, sin rellenar formularios y sin búsqueda de texto.',
    ],
  },
  'pdf-metadata-viewer': {
    name: 'Visor de metadatos de PDF',
    description: 'Consulta el título, el autor, las fechas de creación, el número de páginas, los tamaños de página y la versión de un PDF.',
    metaDescription: 'Consulta los metadatos de un PDF online y gratis. Mira el título, el autor, el productor, las fechas, el número de páginas y sus tamaños sin subir el archivo.',
    steps: [
      'Añade un PDF.',
      'Revisa las propiedades del documento.',
      'Copia los detalles como JSON si los necesitas.',
    ],
    faq: [
      { q: '¿Por qué faltan algunos metadatos?', a: 'Muchos PDF no definen todos los campos. Solo se muestran los campos que realmente están guardados en el archivo.' },
      { q: '¿Puedo eliminar los metadatos?', a: 'Esta herramienta solo lee los metadatos. No modifica el archivo.' },
      { q: '¿Puede abrir PDF protegidos con contraseña?', a: 'No. Los PDF cifrados se detectan y se rechazan con un mensaje claro. Quita primero la contraseña con nuestra herramienta Desbloquear PDF.' },
    ],
    limits: [
      'Máximo 100 MB por PDF.',
      'No se admiten PDF protegidos con contraseña (cifrados).',
      'Los PDF muy grandes o complejos dependen de la memoria de tu dispositivo.',
      'Solo lectura: aquí no se pueden editar ni eliminar los metadatos.',
    ],
  },
  'remove-pdf-pages': {
    name: 'Eliminar páginas de PDF',
    description: 'Elimina las páginas que no necesites y guarda el resto como un PDF nuevo.',
    metaDescription: 'Elimina páginas de un PDF online y gratis. Selecciona las páginas visualmente o por rango, bórralas y descarga el resto. Se procesa en tu navegador.',
    steps: [
      'Añade un PDF; sus páginas aparecen como miniaturas.',
      'Haz clic en las páginas que quieras eliminar, o escribe un rango como 2, 5-7.',
      'Elimínalas y descarga el nuevo PDF.',
    ],
    faq: [
      { q: '¿Modifica mi archivo original?', a: 'No. Obtienes un PDF nuevo sin las páginas seleccionadas. Tu original se queda como estaba.' },
      { q: '¿Puedo eliminar todas las páginas?', a: 'No. Debe quedar al menos una página.' },
      { q: '¿Puede abrir PDF protegidos con contraseña?', a: 'No. Los PDF cifrados se detectan y se rechazan con un mensaje claro. Quita primero la contraseña con nuestra herramienta Desbloquear PDF.' },
    ],
    limits: [
      'Máximo 100 MB por PDF.',
      'No se admiten PDF protegidos con contraseña (cifrados).',
      'Los PDF muy grandes o complejos dependen de la memoria de tu dispositivo.',
    ],
  },
  'add-page-numbers': {
    name: 'Añadir números de página',
    description: 'Numera las páginas de un PDF con la posición, el formato y el estilo que prefieras.',
    metaDescription: 'Añade números de página a un PDF online y gratis. Elige la posición, un formato como «Página 1 de 10», el número inicial y el tamaño de fuente. Funciona en tu navegador.',
    steps: [
      'Añade un PDF.',
      'Elige dónde van los números, su formato y qué páginas numerar.',
      'Añade los números y descarga el PDF.',
    ],
    faq: [
      { q: '¿Puedo omitir la portada?', a: 'Sí. Establece «Primera página a numerar» en 2 y luego elige qué número debe mostrar.' },
      { q: '¿Funciona en páginas giradas?', a: 'Sí. Los números se colocan según lo que ves en pantalla, incluidas las páginas que están giradas.' },
      { q: '¿Qué fuente se usa?', a: 'Helvetica, que cubre dígitos y letras latinas.' },
      { q: '¿Puede abrir PDF protegidos con contraseña?', a: 'No. Los PDF cifrados se detectan y se rechazan con un mensaje claro. Quita primero la contraseña con nuestra herramienta Desbloquear PDF.' },
    ],
    limits: [
      'Máximo 100 MB por PDF.',
      'No se admiten PDF protegidos con contraseña (cifrados).',
      'Los PDF muy grandes o complejos dependen de la memoria de tu dispositivo.',
      'Los números se dibujan encima de cada página, nunca detrás del contenido existente.',
      'Usa la fuente Helvetica integrada.',
    ],
  },
  'watermark-pdf': {
    name: 'Marca de agua en PDF',
    description: 'Estampa texto o una imagen en las páginas de tu PDF con opacidad y ángulo ajustables.',
    metaDescription: 'Añade una marca de agua a un PDF online y gratis. Estampa texto o una imagen, centrada o en mosaico, con opacidad y rotación personalizadas. Se procesa en tu navegador.',
    steps: [
      'Añade un PDF.',
      'Elige una marca de agua de texto o de imagen y ajusta su tamaño, opacidad, ángulo y disposición.',
      'Aplícala a todas las páginas o a una selección y descarga.',
    ],
    faq: [
      { q: '¿Se puede quitar la marca de agua?', a: 'Se dibuja encima de la página y no es una medida de seguridad. Cualquiera con un editor de PDF puede quitarla. Para una protección más sólida, combínala con Proteger PDF.' },
      { q: '¿Puedo usar urdu, árabe u otros alfabetos?', a: 'No como texto escrito, porque las fuentes integradas del PDF solo cubren letras latinas. Crea un PNG transparente con tu texto y usa la opción de imagen.' },
      { q: '¿La marca de agua queda delante o detrás del texto de la página?', a: 'Delante. Reduce la opacidad para que la página siga siendo legible.' },
      { q: '¿Puede abrir PDF protegidos con contraseña?', a: 'No. Los PDF cifrados se detectan y se rechazan con un mensaje claro. Quita primero la contraseña con nuestra herramienta Desbloquear PDF.' },
    ],
    limits: [
      'Máximo 100 MB por PDF.',
      'No se admiten PDF protegidos con contraseña (cifrados).',
      'Los PDF muy grandes o complejos dependen de la memoria de tu dispositivo.',
      'Las marcas de agua de texto solo admiten letras latinas, dígitos y símbolos comunes.',
      'Imágenes de marca de agua: PNG o JPG, de hasta 5 MB.',
      'La marca se dibuja encima del contenido existente de la página.',
    ],
  },
  'crop-pdf': {
    name: 'Recortar PDF',
    description: 'Recorta los márgenes o conserva un área elegida en cada página, con vista previa de la página en directo.',
    metaDescription: 'Recorta páginas de PDF online y gratis. Arrastra un cuadro de recorte sobre la vista previa o escribe los márgenes y aplícalo a todas las páginas o a una selección. Funciona en tu navegador.',
    steps: [
      'Añade un PDF y elige una página para previsualizar.',
      'Arrastra el cuadro o escribe los márgenes para seleccionar el área que se conserva.',
      'Elige qué páginas recortar y descarga.',
    ],
    faq: [
      { q: '¿Se elimina el contenido recortado?', a: 'No. El recorte cambia el área visible de cada página, pero el contenido que queda fuera sigue dentro del archivo. No confíes en el recorte para ocultar información sensible.' },
      { q: '¿Qué pasa si mis páginas tienen tamaños diferentes?', a: 'Se aplican las mismas proporciones a todas las páginas que elijas, de modo que las páginas de distinto tamaño se recortan en el mismo porcentaje.' },
      { q: '¿Puede abrir PDF protegidos con contraseña?', a: 'No. Los PDF cifrados se detectan y se rechazan con un mensaje claro. Quita primero la contraseña con nuestra herramienta Desbloquear PDF.' },
    ],
    limits: [
      'Máximo 100 MB por PDF.',
      'No se admiten PDF protegidos con contraseña (cifrados).',
      'Los PDF muy grandes o complejos dependen de la memoria de tu dispositivo.',
      'El recorte oculta el contenido; no lo elimina.',
      'El área de recorte es una proporción de cada página, no un tamaño fijo en milímetros.',
    ],
  },
  'edit-pdf-metadata': {
    name: 'Editar metadatos de PDF',
    description: 'Cambia el título, el autor, el asunto y las palabras clave de un PDF, o elimina todos los metadatos.',
    metaDescription: 'Edita los metadatos de un PDF online y gratis. Cambia el título, el autor, el asunto y las palabras clave, o elimina todas las propiedades del documento. Se procesa en tu navegador.',
    steps: [
      'Añade un PDF; sus propiedades actuales se rellenan automáticamente.',
      'Edita los campos o elige Eliminar todos los metadatos.',
      'Guarda y descarga el PDF actualizado.',
    ],
    faq: [
      { q: '¿Qué elimina «Eliminar todos los metadatos»?', a: 'La información del documento (título, autor, asunto, palabras clave, creador, productor y fechas) y los metadatos XMP incrustados. No toca el texto de las páginas, las imágenes ni los comentarios.' },
      { q: '¿Por qué editar los metadatos?', a: 'Para corregir un título erróneo que aparece en las pestañas del navegador y en los resultados de búsqueda, para atribuir el autor correcto o para quitar datos personales antes de compartir un archivo.' },
      { q: '¿Admite texto que no sea latino?', a: 'Sí. Los títulos y autores en urdu, árabe, chino y otras escrituras se guardan correctamente.' },
      { q: '¿Puede abrir PDF protegidos con contraseña?', a: 'No. Los PDF cifrados se detectan y se rechazan con un mensaje claro. Quita primero la contraseña con nuestra herramienta Desbloquear PDF.' },
    ],
    limits: [
      'Máximo 100 MB por PDF.',
      'No se admiten PDF protegidos con contraseña (cifrados).',
      'Los PDF muy grandes o complejos dependen de la memoria de tu dispositivo.',
      'Solo se modifican las propiedades a nivel de documento. Los comentarios, los datos de formulario y el contenido de las páginas se mantienen como están.',
    ],
  },
  'protect-pdf': {
    name: 'Proteger PDF',
    description: 'Bloquea un PDF con una contraseña mediante cifrado AES-256.',
    metaDescription: 'Protege un PDF con contraseña online y gratis. El cifrado AES-256 se realiza en tu navegador; tu archivo y tu contraseña nunca se suben.',
    steps: [
      'Añade un PDF.',
      'Escribe una contraseña dos veces y elige lo que pueden hacer los lectores (imprimir, copiar, editar).',
      'Protégelo y descarga la copia cifrada.',
    ],
    faq: [
      { q: '¿Qué tan sólida es la protección?', a: 'Los archivos se cifran con AES-256, el estándar de cifrado de PDF más fuerte. En la práctica, la seguridad depende de tu contraseña: usa una larga que no utilices en ningún otro sitio.' },
      { q: '¿Qué pasa si olvido la contraseña?', a: 'No se puede recuperar. No se almacena ni se envía nada a ningún sitio, y no hay forma de restablecerla. Guarda tu archivo original y la contraseña en un lugar seguro.' },
      { q: '¿Se aplican de forma estricta las opciones de imprimir, copiar y editar?', a: 'Son solicitudes que la mayoría de los programas de PDF respetan, pero no son infranqueables. Lo que realmente protege el archivo es la contraseña.' },
      { q: '¿Se sube mi contraseña?', a: 'No. El cifrado se realiza en tu navegador.' },
    ],
    limits: [
      'Máximo 100 MB por PDF.',
      'Contraseñas: hasta 127 caracteres estándar (letras, dígitos y símbolos).',
      'Un PDF que ya tiene contraseña debe desbloquearse primero.',
      'Los lectores de PDF muy antiguos (anteriores a 2008, aproximadamente) pueden no abrir archivos AES-256.',
    ],
  },
  'unlock-pdf': {
    name: 'Desbloquear PDF',
    description: 'Quita la contraseña de un PDF al que tienes acceso para que se abra libremente.',
    metaDescription: 'Desbloquea un PDF protegido con contraseña online y gratis. Introduce la contraseña para guardar una copia sin protección, procesada en tu navegador y sin subirla.',
    steps: [
      'Añade el PDF protegido.',
      'Introduce su contraseña si se te pide. Los PDF que solo restringen la impresión o la copia no la necesitan.',
      'Descarga la copia desbloqueada.',
    ],
    faq: [
      { q: '¿Puede desbloquear un PDF si olvidé la contraseña?', a: 'No. Esta herramienta nunca adivina ni descifra contraseñas. Quita la protección solo cuando proporcionas la contraseña correcta o cuando el archivo se limita a restringir acciones como la impresión.' },
      { q: '¿Está permitido?', a: 'Úsala solo en archivos que te pertenezcan o que tengas permiso para abrir. Eres responsable del uso que hagas del resultado.' },
      { q: '¿Se sube mi contraseña?', a: 'No. Todo ocurre en tu navegador.' },
    ],
    limits: [
      'Máximo 100 MB por PDF.',
      'Admite la protección estándar de PDF con contraseña (RC4 y AES).',
      'Una firma digital deja de ser válida una vez que el archivo se vuelve a guardar.',
      'No se admiten archivos protegidos por certificado o DRM.',
    ],
  },
  'extract-pdf-text': {
    name: 'Extraer texto de PDF',
    description: 'Copia todo el texto seleccionable de un PDF, página por página.',
    metaDescription: 'Extrae el texto de un PDF online y gratis. Obtén el texto seleccionable de todas las páginas o de un rango, y cópialo o guárdalo como .txt. Funciona en tu navegador.',
    steps: [
      'Añade un PDF.',
      'Elige todas las páginas o un rango, y si quieres marcar los saltos de página.',
      'Copia el texto o descárgalo como archivo .txt.',
    ],
    faq: [
      { q: '¿Por qué el resultado está vacío?', a: 'Probablemente el PDF es un escaneo, es decir, una imagen del texto y no texto real. Para leerlo hace falta OCR (reconocimiento de texto), que esta herramienta no hace.' },
      { q: '¿Se conserva el diseño?', a: 'Las líneas y los párrafos se reconstruyen lo mejor posible, pero las columnas, las tablas y las notas al pie pueden salir en otro orden.' },
      { q: '¿Puede abrir PDF protegidos con contraseña?', a: 'No. Los PDF cifrados se detectan y se rechazan con un mensaje claro. Quita primero la contraseña con nuestra herramienta Desbloquear PDF.' },
    ],
    limits: [
      'Máximo 100 MB por PDF.',
      'No se admiten PDF protegidos con contraseña (cifrados).',
      'Los PDF muy grandes o complejos dependen de la memoria de tu dispositivo.',
      'Solo se extrae texto real; las páginas escaneadas necesitan OCR.',
      'El orden de lectura sigue el del PDF y, en diseños complejos, puede diferir del orden visual.',
    ],
  },
  'compress-pdf': {
    name: 'Comprimir PDF',
    description: 'Reduce el tamaño de un PDF recomprimiendo sus imágenes mientras el texto sigue siendo seleccionable.',
    metaDescription: 'Comprime un PDF online y gratis. Recomprime las imágenes incrustadas para reducir el tamaño del archivo con el texto seleccionable, o aplana las páginas para el archivo más pequeño. Funciona en tu navegador.',
    steps: [
      'Añade tu PDF.',
      'Elige cómo comprimirlo y con qué intensidad: el modo predeterminado mantiene el texto seleccionable y solo recomprime las imágenes.',
      'Comprime, comprueba el tamaño que has ahorrado y descarga el resultado.',
    ],
    faq: [
      { q: '¿Por qué mi PDF apenas se redujo?', a: 'El modo estándar recomprime las imágenes JPEG, así que ayuda más con PDF llenos de fotos o escaneos. Un PDF que es sobre todo texto, o cuyas imágenes ya son pequeñas, no puede reducirse mucho. La herramienta te avisa cuando no ha podido ahorrar nada en lugar de fingir.' },
      { q: '¿Empeorará la calidad?', a: 'Las imágenes pierden algo de detalle a cambio de tamaño; Ligera las deja casi sin cambios y Fuerte las hace visiblemente más suaves. El texto y los gráficos vectoriales no se tocan en el modo estándar. El modo «Máxima» convierte cada página en una imagen, por lo que el texto ya no se puede seleccionar ni buscar.' },
      { q: '¿Se sube mi PDF a algún sitio?', a: 'No. Tu navegador lee y reescribe el PDF. Esta herramienta no envía el archivo a ningún servidor.' },
    ],
    limits: [
      'Solo se recomprimen las imágenes JPEG incrustadas. Las imágenes de tipo PNG (Flate), las fuentes y el resto del contenido se mantienen como están.',
      'El modo Máxima convierte cada página en una imagen: el texto, los enlaces y los campos de formulario dejan de funcionar y no se puede buscar en el archivo.',
      'Los colores de las imágenes recomprimidas pueden variar muy ligeramente.',
      'Máximo 100 MB por PDF. Los PDF protegidos con contraseña deben desbloquearse primero.',
    ],
  },
  'ocr-pdf': {
    name: 'OCR de PDF',
    description: 'Reconoce el texto de PDF escaneados (en inglés) y obtén un PDF con búsqueda.',
    metaDescription: 'Aplica OCR a un PDF online y gratis. Reconoce texto en inglés en PDF escaneados y descarga un PDF con búsqueda o texto sin formato. El motor de OCR se ejecuta en local en tu navegador.',
    steps: [
      'Añade un PDF escaneado.',
      'Elige las páginas y la calidad. Se pueden omitir las páginas que ya contienen texto seleccionable.',
      'Ejecuta el OCR, revisa el texto reconocido y descarga el PDF con búsqueda o un archivo de texto.',
    ],
    faq: [
      { q: '¿Qué idiomas son compatibles?', a: 'Por ahora, solo inglés. El texto en otros idiomas se leerá mal. Se podrán añadir más idiomas más adelante sin cambiar el funcionamiento de la herramienta.' },
      { q: '¿Se envía mi documento a un servicio de OCR?', a: 'No. El motor de reconocimiento (Tesseract, compilado a WebAssembly) y sus datos en inglés se sirven desde este sitio web y se ejecutan dentro de tu navegador. El documento no se sube.' },
      { q: '¿Qué tan preciso es?', a: 'Los mejores resultados se obtienen con escaneos limpios y rectos de texto impreso a 200 o 300 DPI. La escritura a mano, la letra muy pequeña y las páginas de bajo contraste o torcidas producen más errores. Comprueba siempre los números importantes.' },
    ],
    limits: [
      'Solo inglés. La escritura a mano no se reconoce de forma fiable.',
      'Las páginas originales se conservan exactamente como están; se añade una capa de texto invisible para poder buscar y copiar el texto.',
      'El OCR es lento en documentos grandes (varios segundos por página). La primera ejecución también carga el motor (unos 3 MB).',
      'Máximo 100 MB por PDF. Las páginas muy grandes pueden rechazarse para proteger tu navegador.',
    ],
  },
  'sign-pdf': {
    name: 'Firmar PDF',
    description: 'Dibuja, escribe o sube una firma y colócala en las páginas de tu PDF.',
    metaDescription: 'Firma un PDF online y gratis. Dibuja, escribe o sube tu firma, colócala en cualquier página y descarga el PDF firmado. Firma visual, en tu navegador.',
    steps: [
      'Añade el PDF que necesitas firmar.',
      'Crea tu firma dibujándola, escribiendo tu nombre o subiendo una imagen.',
      'Arrastra la firma al lugar correcto de la página, elige en qué páginas se coloca y descarga el PDF firmado.',
    ],
    faq: [
      { q: '¿Es una firma digital con validez legal?', a: 'Es una firma visual: una imagen de tu firma colocada en la página. No es una firma digital criptográfica, no incluye ningún certificado y no puede demostrar quién firmó ni detectar cambios posteriores. Que se acepte o no depende de quien la solicite. Algunas organizaciones exigen servicios de firma electrónica certificados.' },
      { q: '¿Se guarda mi firma en algún sitio?', a: 'No. Se crea en tu navegador, solo se usa para este archivo y se olvida cuando sales de la página o la recargas.' },
      { q: '¿Se sube mi PDF a algún sitio?', a: 'No. Tu navegador lee y reescribe el PDF. Esta herramienta no envía el archivo a ningún servidor.' },
    ],
    limits: [
      'Solo firma visual: sin certificado, sin marca de tiempo y sin detección de manipulación.',
      'La firma se coloca como una imagen encima de la página; no rellena un campo de firma de formulario.',
      'Máximo 100 MB por PDF. Los PDF protegidos con contraseña deben desbloquearse primero.',
    ],
  },
  'fill-pdf-forms': {
    name: 'Completar formularios PDF',
    description: 'Completa los cuadros de texto, las casillas y los menús de un formulario PDF rellenable.',
    metaDescription: 'Completa formularios PDF online y gratis. Escribe en los campos, marca casillas y elige opciones en un PDF rellenable, y descárgalo editable o aplanado. En tu navegador.',
    steps: [
      'Añade un formulario PDF rellenable.',
      'Completa los campos que aparecen bajo el nombre del archivo. Los campos están agrupados por página.',
      'Elige si quieres mantener el formulario editable o aplanarlo, y descarga el PDF completado.',
    ],
    faq: [
      { q: 'Mi PDF no muestra campos. ¿Por qué?', a: 'Aquí solo se pueden completar los PDF con campos de formulario reales. Un formulario que es solo una imagen o texto simple no tiene campos; usa Firmar PDF para colocar una firma, o la herramienta de marca de agua para añadir texto. No se admiten los formularios creados con XFA (algunos formularios de gobiernos y bancos).' },
      { q: '¿Qué hace aplanar?', a: 'Aplanar fija tus respuestas en la página y elimina los campos del formulario, de modo que las respuestas ya no se pueden editar. Úsalo para la copia que envíes; conserva una copia editable para ti.' },
      { q: '¿Se sube mi PDF a algún sitio?', a: 'No. Tu navegador lee y reescribe el PDF. Esta herramienta no envía el archivo a ningún servidor.' },
    ],
    limits: [
      'El texto puede usar letras latinas, dígitos y símbolos comunes (la fuente del formulario no tiene otros alfabetos).',
      'Los campos de firma y los botones se muestran pero no se pueden completar; usa Firmar PDF para las firmas.',
      'No se admiten los formularios XFA (dinámicos).',
      'Máximo 100 MB por PDF.',
    ],
  },
  'redact-pdf': {
    name: 'Tachar PDF',
    description: 'Tacha texto y zonas de forma definitiva: las páginas tachadas se reconstruyen como imágenes.',
    metaDescription: 'Tacha un PDF online y gratis. Oculta nombres, números y zonas para que el texto de debajo se elimine de verdad, no solo se tape. Todo en tu navegador, sin subir nada.',
    steps: [
      'Añade tu PDF y elige una página.',
      'Dibuja recuadros sobre lo que debe desaparecer, o busca palabras, correos y números para marcarlos automáticamente.',
      'Aplica los tachados y descarga el archivo. Revisa siempre el resultado antes de compartirlo.',
    ],
    faq: [
      { q: '¿Se elimina de verdad el texto oculto?', a: 'Sí. Cada página con un tachado se reconstruye como una imagen con los recuadros negros pintados, de modo que el texto y los objetos de debajo no existen en el archivo nuevo. Un rectángulo negro dibujado encima del texto, como hacen muchas herramientas, dejaría el texto seleccionable. Las páginas que no tachaste se copian sin cambios.' },
      { q: '¿Por qué ya no puedo seleccionar texto en las páginas tachadas?', a: 'Porque esas páginas ahora son imágenes. Así es como se destruye el contenido que había debajo. Usa después OCR de PDF si necesitas texto con el que se pueda buscar; las palabras tachadas seguirán en negro.' },
      { q: '¿Encuentra todas las coincidencias automáticamente?', a: 'La búsqueda marca las coincidencias que están dentro de una sola línea de texto. Puede que no detecte una frase que el PDF divide en fragmentos ni el texto que forma parte de una imagen. Revisa todas las páginas y dibuja recuadros a mano donde haga falta.' },
    ],
    limits: [
      'Las páginas tachadas se convierten en imágenes: en ellas no hay texto seleccionable, enlaces ni campos de formulario.',
      'La búsqueda automática solo funciona con texto seleccionable y dentro de un mismo fragmento de texto; en las páginas escaneadas hay que dibujar los recuadros a mano.',
      'Las propiedades del documento (título, autor…) se eliminan del resultado, salvo que elijas conservarlas.',
      'Máximo 100 MB por PDF.',
    ],
  },
  'compare-pdf': {
    name: 'Comparar PDF',
    description: 'Mira qué ha cambiado entre dos PDF: diferencias de texto y páginas resaltadas.',
    metaDescription: 'Compara dos archivos PDF online y gratis. Mira las palabras añadidas y eliminadas página por página y resalta las diferencias visuales entre versiones. Se procesa en tu navegador.',
    steps: [
      'Añade el PDF original y el PDF revisado.',
      'Compáralos: las páginas se muestran con el número de palabras añadidas y eliminadas.',
      'Abre una página para leer los cambios de texto, o cambia a la vista visual para ver en rojo las zonas modificadas.',
    ],
    faq: [
      { q: '¿Qué muestra la comparación de texto?', a: 'Para cada página, las palabras que se añadieron (en verde) y se eliminaron (en rojo) entre el documento original y el revisado, con el texto sin cambios contraído. Las páginas se emparejan por número.' },
      { q: '¿Qué pasa con los PDF escaneados?', a: 'Los escaneos no tienen texto seleccionable, así que la comparación de texto no encuentra nada. Usa la comparación visual, o ejecuta antes OCR de PDF en ambos archivos.' },
      { q: '¿Se sube mi PDF a algún sitio?', a: 'No. Tu navegador lee y reescribe el PDF. Esta herramienta no envía el archivo a ningún servidor.' },
    ],
    limits: [
      'Las páginas se comparan por número: si se insertó una página, las siguientes aparecerán como modificadas.',
      'La comparación visual dibuja cada página con la resolución de pantalla; las diferencias minúsculas por debajo de ella pueden no verse.',
      'Se comparan hasta 100 páginas por archivo. Los PDF protegidos con contraseña deben desbloquearse antes.',
    ],
  },
  'word-counter': {
    name: 'Contador de palabras',
    description: 'Cuenta palabras, caracteres y frases, y calcula el tiempo de lectura mientras escribes.',
    metaDescription: 'Contador de palabras online y gratis. Cuenta palabras, caracteres, frases y párrafos y calcula al instante el tiempo de lectura y de locución.',
    steps: [
      'Escribe o pega tu texto.',
      'Consulta las estadísticas en directo sobre el editor.',
      'Usa Borrar para empezar de nuevo.',
    ],
    faq: [
      { q: '¿Cómo se cuentan las palabras?', a: 'Una palabra es cualquier secuencia de caracteres separada por espacios en blanco. Las palabras con guion cuentan como una y los números cuentan como palabras.' },
      { q: '¿Cómo se calcula el tiempo de lectura?', a: 'El tiempo de lectura supone 238 palabras por minuto y el de locución 150 palabras por minuto, que son promedios habituales en adultos.' },
    ],
    limits: [
      'El recuento se basa en los espacios en blanco, así que los idiomas que se escriben sin espacios (como el chino o el japonés) mostrarán una palabra por cada secuencia de texto.',
    ],
  },
  'character-counter': {
    name: 'Contador de caracteres',
    description: 'Cuenta caracteres con y sin espacios y comprueba el texto frente a los límites de longitud habituales.',
    metaDescription: 'Contador de caracteres online y gratis. Cuenta caracteres con y sin espacios, bytes y líneas, y comprueba los límites de publicaciones, metaetiquetas y SMS.',
    steps: [
      'Escribe o pega tu texto.',
      'Consulta los totales y las barras de límite.',
      'Ajusta el texto hasta que quepa.',
    ],
    faq: [
      { q: '¿Un emoji cuenta como un solo carácter?', a: 'Sí. El contador cuenta los caracteres visibles (grupos de grafemas), así que un emoji cuenta como uno aunque use varios bytes.' },
      { q: '¿Por qué los límites de SMS son distintos?', a: 'La longitud de un SMS depende de la codificación. Los mensajes con caracteres no latinos o emojis tienen un límite menor que la referencia de 160 caracteres que se muestra aquí.' },
    ],
    limits: [
      'Los límites mostrados son pautas habituales y cambian con el tiempo; consulta la norma vigente de cada plataforma.',
    ],
  },
  'case-converter': {
    name: 'Convertidor de mayúsculas y minúsculas',
    description: 'Convierte el texto a mayúsculas, minúsculas, título, frase, camel, snake, kebab y más.',
    metaDescription: 'Convertidor de mayúsculas y minúsculas online y gratis. Cambia el texto a MAYÚSCULAS, minúsculas, Title Case, Sentence case, camelCase, snake_case, kebab-case y más.',
    steps: [
      'Pega tu texto.',
      'Elige el formato de mayúsculas que quieras.',
      'Copia el resultado convertido.',
    ],
    faq: [
      { q: '¿Title Case tiene en cuenta las palabras cortas?', a: 'Sí. Las palabras cortas como «a», «of» y «the» se quedan en minúsculas, salvo que estén al principio o al final del texto.' },
    ],
    limits: [
      'Title Case sigue las reglas de estilo habituales del inglés y puede no ajustarse a todas las guías de estilo.',
    ],
  },
  'remove-duplicate-lines': {
    name: 'Eliminar líneas duplicadas',
    description: 'Elimina las líneas repetidas de una lista conservando el orden original.',
    metaDescription: 'Eliminador de líneas duplicadas online y gratis. Borra las líneas repetidas de tus listas, con opciones para mayúsculas, espacios y líneas vacías.',
    steps: [
      'Pega tu lista, con un elemento por línea.',
      'Elige si importan las mayúsculas y los espacios.',
      'Copia el resultado sin duplicados.',
    ],
    faq: [
      { q: '¿Qué copia de un duplicado se conserva?', a: 'Se conserva la primera aparición y se eliminan las siguientes, así que se mantiene tu orden original.' },
    ],
    limits: [
      'Solo funciona con líneas completas.',
    ],
  },
  'text-sorter': {
    name: 'Ordenador de texto',
    description: 'Ordena líneas alfabéticamente, numéricamente, por longitud o al azar.',
    metaDescription: 'Ordenador de texto online y gratis. Ordena líneas de la A a la Z, de la Z a la A, numéricamente, por longitud o al azar, sin distinguir mayúsculas y con orden natural.',
    steps: [
      'Pega tus líneas.',
      'Elige un método de ordenación y las opciones.',
      'Copia la lista ordenada.',
    ],
    faq: [
      { q: '¿Qué es la ordenación natural?', a: 'La ordenación natural compara por su valor los números incluidos en el texto, de modo que «item2» va antes que «item10».' },
    ],
    limits: [
      'La ordenación alfabética usa las reglas de idioma de tu navegador.',
    ],
  },
  'text-cleaner': {
    name: 'Limpiador de texto',
    description: 'Recorta espacios, reduce los espacios repetidos, elimina líneas en blanco y quita caracteres invisibles.',
    metaDescription: 'Limpiador de texto online y gratis. Elimina espacios sobrantes, líneas vacías, saltos de línea, caracteres invisibles y comillas tipográficas del texto pegado.',
    steps: [
      'Pega tu texto.',
      'Marca las opciones de limpieza que necesites.',
      'Copia el texto limpio.',
    ],
    faq: [
      { q: '¿Qué son los caracteres invisibles?', a: 'Los espacios de ancho cero, los guiones suaves y las marcas de orden de bytes suelen colarse al copiar desde páginas web y pueden romper el código o las comparaciones.' },
    ],
    limits: [
      'Las operaciones se aplican en un orden fijo; ejecuta la herramienta dos veces si necesitas otra secuencia.',
    ],
  },
  'text-diff-checker': {
    name: 'Comparador de textos',
    description: 'Compara dos textos y mira exactamente qué líneas y palabras han cambiado.',
    metaDescription: 'Comparador de textos online y gratis. Compara dos versiones de un texto lado a lado y resalta las líneas o palabras añadidas, eliminadas y modificadas.',
    steps: [
      'Pega el texto original a la izquierda y el texto modificado a la derecha.',
      'Elige la comparación por líneas o por palabras.',
      'Revisa los cambios resaltados.',
    ],
    faq: [
      { q: '¿Qué diferencia hay entre el modo por líneas y el modo por palabras?', a: 'El modo por líneas marca las líneas completas que han cambiado. El modo por palabras resalta las palabras exactas dentro del texto, lo que resulta más adecuado para prosa.' },
    ],
    limits: [
      'Las entradas muy grandes (de más de unos 200 000 caracteres) pueden ser lentas.',
    ],
  },
  'json-formatter': {
    name: 'Formateador de JSON',
    description: 'Da formato a JSON con la sangría y la ordenación de claves que elijas.',
    metaDescription: 'Formateador y embellecedor de JSON online y gratis. Da formato a JSON con 2 o 4 espacios o tabuladores, ordena las claves y ve la ubicación exacta de los errores.',
    steps: [
      'Pega tu JSON.',
      'Elige la sangría y la ordenación.',
      'Copia o descarga el resultado con formato.',
    ],
    faq: [
      { q: '¿Se envía mi JSON a un servidor?', a: 'No. El análisis y el formato se hacen en tu navegador con el analizador de JSON integrado.' },
      { q: '¿Por qué rechaza mi JSON?', a: 'El JSON estricto no admite comentarios, comas finales ni comillas simples. El mensaje de error indica la línea y la columna del problema.' },
    ],
    limits: [
      'Los números mayores que 2^53 pierden precisión porque el navegador los analiza como coma flotante.',
    ],
  },
  'json-validator': {
    name: 'Validador de JSON',
    description: 'Comprueba si un JSON es válido y obtén la línea y la columna exactas de cualquier error.',
    metaDescription: 'Validador de JSON online y gratis. Comprueba la sintaxis del JSON y encuentra la línea y la columna exactas de los errores, con un resumen de la estructura.',
    steps: [
      'Pega tu JSON.',
      'Comprueba al instante si es válido.',
      'Corrige el error indicado y vuelve a comprobarlo.',
    ],
    faq: [
      { q: '¿Valida con un esquema JSON?', a: 'No. Solo comprueba la sintaxis: si el texto es un JSON bien formado.' },
    ],
    limits: [
      'Solo valida la sintaxis; no incluye la validación con esquemas JSON.',
    ],
  },
  'json-minifier': {
    name: 'Minificador de JSON',
    description: 'Elimina los espacios en blanco de un JSON para dejarlo lo más compacto posible.',
    metaDescription: 'Minificador de JSON online y gratis. Quita los espacios en blanco del JSON para reducir su tamaño y mira cuántos bytes has ahorrado.',
    steps: [
      'Pega tu JSON.',
      'El resultado minificado aparece junto con el tamaño ahorrado.',
      'Cópialo o descárgalo.',
    ],
    faq: [
      { q: '¿Minificar cambia los datos?', a: 'No. Solo se eliminan los espacios en blanco sin importancia; las claves, los valores y el orden no cambian.' },
    ],
    limits: [
      'Los números mayores que 2^53 pierden precisión porque el navegador los analiza como coma flotante.',
    ],
  },
  'xml-formatter': {
    name: 'Formateador de XML',
    description: 'Da formato o minifica XML y detecta etiquetas que no coinciden o que no están cerradas.',
    metaDescription: 'Formateador de XML online y gratis. Embellece o minifica XML con sangría ajustable y detecta las etiquetas que no coinciden o que no están cerradas.',
    steps: [
      'Pega tu XML.',
      'Elige Formatear o Minificar y la sangría.',
      'Copia el resultado.',
    ],
    faq: [
      { q: '¿Hasta qué punto se valida el XML?', a: 'La herramienta comprueba el anidamiento de las etiquetas, las etiquetas sin cerrar y los comentarios o secciones CDATA sin terminar. No valida con un esquema DTD o XSD.' },
    ],
    limits: [
      'Solo comprobaciones estructurales; sin validación DTD ni XSD.',
    ],
  },
  'url-encoder-decoder': {
    name: 'Codificador / decodificador de URL',
    description: 'Codifica o decodifica con porcentajes URL y valores de cadenas de consulta.',
    metaDescription: 'Codificador y decodificador de URL online y gratis. Codifica texto con porcentajes para URL o decodifica cadenas codificadas, para URL completas o componentes sueltos.',
    steps: [
      'Elige Codificar o Decodificar.',
      'Pega tu texto o URL.',
      'Copia el resultado.',
    ],
    faq: [
      { q: '¿Componente o URL completa?', a: 'Usa Componente para un valor individual, como un parámetro de consulta; codifica caracteres como / ? & =. Usa URL completa para dejar intacta la estructura de la URL.' },
    ],
    limits: [
      'La decodificación falla con secuencias de porcentaje mal formadas, como un % suelto.',
    ],
  },
  'html-encoder-decoder': {
    name: 'Codificador / decodificador de HTML',
    description: 'Escapa caracteres especiales como entidades HTML o decodifica entidades para volver al texto.',
    metaDescription: 'Codificador y decodificador de HTML online y gratis. Escapa <, >, & y comillas como entidades HTML, o decodifica entidades con nombre y numéricas.',
    steps: [
      'Elige Codificar o Decodificar.',
      'Pega tu texto.',
      'Copia el resultado.',
    ],
    faq: [
      { q: '¿Codificar hace seguro para HTML lo que escribe el usuario?', a: 'Escapar los cinco caracteres especiales hace que el texto sea seguro dentro del contenido de los elementos HTML y de los atributos entrecomillados. No sustituye a una biblioteca de plantillas ni a un sanitizador adecuados en otros contextos.' },
    ],
    limits: [
      'La decodificación admite las entidades con nombre más comunes y todas las entidades numéricas.',
    ],
  },
  'base64-encoder-decoder': {
    name: 'Codificador / decodificador de Base64',
    description: 'Codifica texto a Base64 o decodifica Base64 a texto, con compatibilidad total con UTF-8.',
    metaDescription: 'Codificador y decodificador de Base64 online y gratis. Convierte texto a Base64 y viceversa, con compatibilidad con UTF-8 y un alfabeto opcional seguro para URL.',
    steps: [
      'Elige Codificar o Decodificar.',
      'Pega tu texto.',
      'Copia el resultado.',
    ],
    faq: [
      { q: '¿Base64 es un cifrado?', a: 'No. Base64 es una codificación, no un cifrado. Cualquiera puede decodificarlo, así que nunca lo uses para proteger secretos.' },
      { q: '¿Qué es Base64 seguro para URL?', a: 'Cambia + y / por - y _ y elimina el relleno =, para que el valor pueda ir sin problemas en URL y nombres de archivo.' },
    ],
    limits: [
      'Para datos de imagen usa Imagen a Base64 y Base64 a imagen.',
    ],
  },
  'regex-tester': {
    name: 'Probador de regex',
    description: 'Prueba expresiones regulares de JavaScript con resaltado de coincidencias en directo y grupos de captura.',
    metaDescription: 'Probador de regex para JavaScript online y gratis. Mira las coincidencias en directo, los grupos de captura y los grupos con nombre, y previsualiza los reemplazos.',
    steps: [
      'Introduce un patrón y elige los indicadores.',
      'Pega el texto que quieres probar.',
      'Revisa las coincidencias, los grupos y la vista previa del reemplazo.',
    ],
    faq: [
      { q: '¿Qué variante de regex se usa?', a: 'Expresiones regulares de JavaScript (ECMAScript), tal como las implementa tu navegador. PCRE, Python y otras variantes difieren en algunas funciones.' },
      { q: '¿Por qué se me bloquea la página con algunos patrones?', a: 'Los patrones con repeticiones anidadas pueden provocar un retroceso catastrófico. La búsqueda se ejecuta en un proceso en segundo plano y se detiene a los 1,5 segundos, así que un patrón descontrolado no puede bloquear la página, pero aun así conviene evitar patrones como (a+)+.' },
    ],
    limits: [
      'Solo admite la sintaxis de regex de JavaScript.',
      'La búsqueda se detiene tras 5000 coincidencias o 1,5 segundos.',
    ],
  },
  'markdown-previewer': {
    name: 'Vista previa de Markdown',
    description: 'Escribe Markdown y mira al lado una vista previa en directo, segura y depurada.',
    metaDescription: 'Vista previa de Markdown online y gratis. Escribe Markdown al estilo de GitHub y mira una vista previa HTML depurada en directo; después copia el HTML.',
    steps: [
      'Escribe o pega Markdown a la izquierda.',
      'Mira el resultado renderizado a la derecha.',
      'Copia el Markdown o el HTML generado.',
    ],
    faq: [
      { q: '¿Es segura la vista previa?', a: 'Sí. El HTML generado se depura con DOMPurify antes de mostrarse, así que se eliminan los scripts y los controladores de eventos.' },
    ],
    limits: [
      'Markdown al estilo de GitHub mediante la biblioteca marked; sin extensiones de fórmulas ni de diagramas.',
    ],
  },
  'password-generator': {
    name: 'Generador de contraseñas',
    description: 'Crea contraseñas seguras: totalmente aleatorias o fáciles de recordar, basadas en nombres y palabras.',
    metaDescription: 'Generador de contraseñas gratis: contraseñas totalmente aleatorias o basadas en nombres, como Nvidia132@Star, con números, mayúsculas y símbolos aleatorios. En tu navegador.',
    steps: [
      'Elige un estilo: Nombre + palabra para algo fácil de recordar, o Totalmente aleatoria para la máxima seguridad.',
      'Define la longitud, cuántas contraseñas necesitas y qué tipos de caracteres incluir.',
      'Copia una contraseña y guárdala en un gestor de contraseñas.',
    ],
    faq: [
      { q: '¿Se guardan o se envían a algún sitio las contraseñas generadas?', a: 'No. Las contraseñas se generan en tu navegador con crypto.getRandomValues y nunca se transmiten ni se guardan.' },
      { q: '¿Es segura una contraseña como Tesla2026#Tech?', a: 'Es mejor que una palabra sin más, pero más débil que un texto aleatorio. Quien intente adivinarla puede partir de listas de nombres conocidos, así que la fortaleza real depende del número de posibilidades, que se muestra en bits. Usa contraseñas basadas en nombres para cuentas de bajo riesgo y totalmente aleatorias para el correo, la banca y los gestores de contraseñas.' },
      { q: '¿Por qué solo unos pocos símbolos?', a: 'Las contraseñas generadas solo usan los cuatro símbolos @ # $ * porque casi todos los sitios web los aceptan y son fáciles de escribir en cualquier teclado.' },
      { q: '¿Qué longitud debe tener una contraseña?', a: 'Al menos 16 caracteres para las cuentas importantes. La longitud importa más que la complejidad.' },
    ],
    limits: [
      'Las contraseñas basadas en nombres son más fáciles de recordar, pero más débiles que las totalmente aleatorias. La fortaleza mostrada supone un atacante que sabe cómo se construyen.',
      'La base de palabras es una lista seleccionada de nombres en letras latinas; no es una lista de las contraseñas más usadas.',
      'La estimación de fortaleza se basa en las combinaciones posibles, no en bases de datos de filtraciones.',
    ],
  },
  'uuid-generator': {
    name: 'Generador de UUID',
    description: 'Genera UUID aleatorios de versión 4 en lote, con opciones de formato.',
    metaDescription: 'Generador de UUID online y gratis. Crea UUID v4 aleatorios en lote, en mayúsculas, sin guiones o con llaves, usando aleatoriedad criptográfica.',
    steps: [
      'Elige cuántos UUID quieres y el formato.',
      'Genera.',
      'Copia la lista.',
    ],
    faq: [
      { q: '¿Pueden coincidir dos UUID?', a: 'Los UUID de versión 4 tienen 122 bits aleatorios, así que en la práctica la probabilidad de colisión es despreciable.' },
    ],
    limits: [
      'Solo se generan UUID de versión 4 (aleatorios).',
    ],
  },
  'timestamp-converter': {
    name: 'Convertidor de marcas de tiempo',
    description: 'Convierte marcas de tiempo Unix a fechas legibles y viceversa, en cualquier zona horaria.',
    metaDescription: 'Convertidor de marcas de tiempo Unix online y gratis. Convierte segundos o milisegundos de la época a fechas en UTC y hora local, y las fechas de nuevo a marcas de tiempo.',
    steps: [
      'Introduce una marca de tiempo Unix o elige una fecha.',
      'Consulta el resultado en UTC, en tu zona local y en ISO 8601.',
      'Copia el valor que quieras.',
    ],
    faq: [
      { q: '¿Segundos o milisegundos?', a: 'Las marcas de tiempo de 13 o más dígitos se tratan como milisegundos y las más cortas como segundos. Puedes cambiarlo manualmente.' },
    ],
    limits: [
      'El intervalo admitido es el de las fechas de JavaScript: aproximadamente de los años -271821 a 275760.',
    ],
  },
  'color-converter': {
    name: 'Convertidor de colores',
    description: 'Convierte colores entre HEX, RGB, HSL y HSV, con vista previa en directo y comprobación de contraste.',
    metaDescription: 'Convertidor de colores online y gratis. Convierte valores HEX, RGB, HSL y HSV, previsualiza el color y comprueba las relaciones de contraste WCAG.',
    steps: [
      'Introduce un color en cualquier formato o usa el selector.',
      'Mira cómo se actualizan todos los formatos.',
      'Copia el valor que necesites.',
    ],
    faq: [
      { q: '¿Qué muestra la comprobación de contraste?', a: 'Muestra la relación de contraste WCAG del color frente a texto blanco y negro, lo que te ayuda a elegir combinaciones legibles.' },
    ],
    limits: [
      'Solo sRGB; no se admiten los espacios de CSS Color 4, como LAB, LCH y Display-P3.',
      'Los valores de transparencia (alfa) se aceptan, pero se ignoran.',
    ],
  },
  'qr-code-generator': {
    name: 'Generador de códigos QR',
    description: 'Crea códigos QR para enlaces, texto, Wi-Fi, correo o números de teléfono, en PNG o SVG.',
    metaDescription: 'Generador de códigos QR gratis. Crea códigos QR para URL, texto, Wi-Fi, correo y números de teléfono y descárgalos en PNG o SVG. Se crean en tu navegador.',
    steps: [
      'Elige qué debe contener el código y rellena los datos.',
      'Ajusta el tamaño, los colores y la corrección de errores si lo deseas.',
      'Descarga el PNG o el SVG y pruébalo con tu teléfono antes de imprimirlo.',
    ],
    faq: [
      { q: '¿Caducan los códigos?', a: 'No. Son códigos estáticos: los datos se guardan en el propio código, así que funcionan para siempre y no se rastrea nada.' },
      { q: '¿Qué nivel de corrección de errores debo elegir?', a: 'Medio sirve para la mayoría de los usos. Elige Cuartil o Alto si el código puede ensuciarse o dañarse, pero los niveles más altos hacen el código más denso y más difícil de escanear en tamaños pequeños.' },
      { q: '¿Puedo usar los códigos con fines comerciales?', a: 'Sí. El estándar del código QR es abierto, y los códigos creados aquí no llevan tarifas, marcas de agua ni rastreo por nuestra parte.' },
      { q: '¿Se envían mis datos a algún sitio?', a: 'No. El código se genera en tu navegador, y las contraseñas de Wi-Fi que introduces se quedan en tu dispositivo.' },
    ],
    limits: [
      'Solo códigos estáticos: sin seguimiento de escaneos ni códigos editables.',
      'Un texto muy largo genera un código denso y difícil de escanear, así que procura que sea corto.',
      'Los colores oscuros sobre fondo claro y con mucho contraste se escanean mejor.',
    ],
  },
};
export default tools;
