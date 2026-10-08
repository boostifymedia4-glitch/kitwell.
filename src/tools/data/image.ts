import type { FaqItem, ToolDef } from '../types';

const privacyFaq: FaqItem = {
  q: 'Are my images uploaded to a server?',
  a: 'No. The image is decoded and re-encoded by your browser using the Canvas API. The file is not sent anywhere by this tool.',
};

const metadataFaq: FaqItem = {
  q: 'Is EXIF or location data kept?',
  a: 'No. Re-encoding through a canvas drops EXIF metadata such as camera model and GPS location, which is often what you want before sharing a photo. Colour profiles are also not preserved.',
};

const common = { category: 'image' as const, fileTool: true };

const convertLimits = [
  'Animated GIF or WebP files are converted using their first frame only.',
  'Maximum 25 MB per file and 20 files per batch, to keep your browser responsive.',
  'EXIF metadata and embedded colour profiles are not preserved.',
];

export const imageTools: ToolDef[] = [
  {
    ...common,
    slug: 'jpg-to-png',
    group: 'Convert images',
    convert: ['JPG', 'PNG'],
    name: 'JPG to PNG',
    icon: 'file-image',
    impl: 'image-convert',
    config: { from: 'jpeg', to: 'png' },
    description: 'Convert JPG and JPEG photos to lossless PNG images in one click.',
    metaDescription:
      'Convert JPG to PNG online for free. Batch-convert JPEG photos to PNG directly in your browser, no upload and no sign-up.',
    keywords: ['jpeg to png', 'convert jpg', 'jpg png converter'],
    steps: [
      'Drop one or more JPG files onto the tool, or choose them from your device.',
      'Check the previews, then press Convert.',
      'Download each PNG, or download everything as a ZIP.',
    ],
    faq: [
      {
        q: 'Will converting JPG to PNG improve quality?',
        a: 'No. JPG is lossy, so detail that was discarded when the JPG was saved cannot be recovered. PNG simply stores the current pixels without further loss, which is useful for editing or transparency work.',
      },
      {
        q: 'Why is the PNG larger than the JPG?',
        a: 'PNG is lossless and usually stores photographs less efficiently than JPG. Use JPG or WebP when file size matters more than exact pixels.',
      },
      privacyFaq,
    ],
    limits: convertLimits,
    related: ['png-to-jpg', 'image-compressor', 'image-resizer', 'image-format-converter', 'jpg-to-webp'],
  },
  {
    ...common,
    slug: 'png-to-jpg',
    group: 'Convert images',
    convert: ['PNG', 'JPG'],
    name: 'PNG to JPG',
    icon: 'file-image',
    impl: 'image-convert',
    config: { from: 'png', to: 'jpeg' },
    description: 'Turn PNG images into smaller JPG files with adjustable quality.',
    metaDescription:
      'Convert PNG to JPG online for free. Choose quality and background colour for transparent images. Processed in your browser.',
    keywords: ['png to jpeg', 'convert png', 'png jpg converter'],
    steps: [
      'Add your PNG files.',
      'Set the JPG quality and the background colour used to fill any transparent areas.',
      'Press Convert and download the results.',
    ],
    faq: [
      {
        q: 'What happens to transparent areas?',
        a: 'JPG has no transparency, so transparent pixels are filled with the background colour you choose (white by default).',
      },
      {
        q: 'Which quality setting should I use?',
        a: '80–90 is a good balance for most images. Below about 60 compression artifacts become visible on text and sharp edges.',
      },
      privacyFaq,
    ],
    limits: [...convertLimits, 'Transparency is flattened onto a solid colour because JPG cannot store it.'],
    related: ['jpg-to-png', 'image-compressor', 'image-resizer', 'png-to-webp', 'image-format-converter'],
  },
  {
    ...common,
    slug: 'jpg-to-webp',
    group: 'Convert images',
    convert: ['JPG', 'WEBP'],
    name: 'JPG to WebP',
    icon: 'file-image',
    impl: 'image-convert',
    config: { from: 'jpeg', to: 'webp' },
    description: 'Convert JPG photos to modern WebP for smaller files and faster pages.',
    metaDescription:
      'Convert JPG to WebP online for free. Shrink photos for the web with adjustable quality, processed locally in your browser.',
    keywords: ['jpeg to webp', 'webp converter'],
    steps: ['Add your JPG files.', 'Pick a WebP quality (80 is a sensible default).', 'Convert and download.'],
    faq: [
      {
        q: 'Is WebP smaller than JPG?',
        a: 'Typically 20–35% smaller at similar visual quality, though results depend on the image.',
      },
      {
        q: 'Does every browser support WebP?',
        a: 'All current major browsers can display WebP. Encoding WebP in the browser is supported in Chrome, Edge, Firefox and recent Safari; if yours cannot, the tool tells you instead of producing a wrong file.',
      },
      privacyFaq,
    ],
    limits: [...convertLimits, 'Your browser must support WebP encoding; unsupported browsers show an error.'],
    related: ['png-to-webp', 'webp-to-jpg', 'image-compressor', 'image-format-converter', 'jpg-to-png'],
  },
  {
    ...common,
    slug: 'png-to-webp',
    group: 'Convert images',
    convert: ['PNG', 'WEBP'],
    name: 'PNG to WebP',
    icon: 'file-image',
    impl: 'image-convert',
    config: { from: 'png', to: 'webp' },
    description: 'Convert PNG images to WebP and keep transparency at a fraction of the size.',
    metaDescription:
      'Convert PNG to WebP online for free. Keeps transparency, reduces file size, and runs entirely in your browser.',
    keywords: ['png to webp converter', 'convert png webp'],
    steps: ['Add your PNG files.', 'Choose the WebP quality.', 'Convert and download.'],
    faq: [
      {
        q: 'Is transparency preserved?',
        a: 'Yes. WebP supports an alpha channel, so transparent PNGs stay transparent.',
      },
      {
        q: 'Can I get a lossless result?',
        a: 'Set quality to 100 for the highest fidelity. Browsers encode WebP as lossy, so use PNG if you need a mathematically exact copy.',
      },
      privacyFaq,
    ],
    limits: [...convertLimits, 'Your browser must support WebP encoding; unsupported browsers show an error.'],
    related: ['jpg-to-webp', 'webp-to-png', 'png-to-jpg', 'image-compressor', 'image-format-converter'],
  },
  {
    ...common,
    slug: 'webp-to-jpg',
    group: 'Convert images',
    convert: ['WEBP', 'JPG'],
    name: 'WebP to JPG',
    icon: 'file-image',
    impl: 'image-convert',
    config: { from: 'webp', to: 'jpeg' },
    description: 'Convert WebP images to widely compatible JPG files.',
    metaDescription:
      'Convert WebP to JPG online for free. Make WebP images work everywhere, converted locally in your browser.',
    keywords: ['webp to jpeg', 'open webp'],
    steps: ['Add your WebP files.', 'Set quality and background colour for transparent areas.', 'Convert and download.'],
    faq: [
      {
        q: 'Why convert WebP to JPG?',
        a: 'Some older software, email clients and upload forms still reject WebP. JPG is accepted almost everywhere.',
      },
      privacyFaq,
    ],
    limits: [...convertLimits, 'Transparency is flattened onto a solid colour because JPG cannot store it.'],
    related: ['webp-to-png', 'jpg-to-webp', 'image-compressor', 'image-format-converter', 'png-to-jpg'],
  },
  {
    ...common,
    slug: 'webp-to-png',
    group: 'Convert images',
    convert: ['WEBP', 'PNG'],
    name: 'WebP to PNG',
    icon: 'file-image',
    impl: 'image-convert',
    config: { from: 'webp', to: 'png' },
    description: 'Convert WebP images to lossless PNG and keep transparency.',
    metaDescription:
      'Convert WebP to PNG online for free. Keeps transparency and runs entirely in your browser with no upload.',
    keywords: ['webp to png converter'],
    steps: ['Add your WebP files.', 'Press Convert.', 'Download the PNG files.'],
    faq: [
      {
        q: 'Is transparency kept?',
        a: 'Yes. PNG supports transparency, so alpha from the WebP is carried over.',
      },
      privacyFaq,
    ],
    limits: convertLimits,
    related: ['webp-to-jpg', 'png-to-webp', 'jpg-to-png', 'image-resizer', 'image-format-converter'],
  },
  {
    ...common,
    slug: 'image-compressor',
    group: 'Optimize and edit',
    name: 'Image Compressor',
    icon: 'minimize',
    impl: 'image-compress',
    description: 'Reduce image file size with adjustable quality and see the exact savings.',
    metaDescription:
      'Compress JPG, PNG and WebP images online for free. Adjust quality, optionally limit dimensions, and compare file sizes. Runs in your browser.',
    keywords: ['compress image', 'reduce image size', 'shrink jpg'],
    steps: [
      'Add your images.',
      'Choose an output format and quality, and optionally a maximum width or height.',
      'Compress and compare the before and after sizes, then download.',
    ],
    faq: [
      {
        q: 'How does the compressor reduce size?',
        a: 'It re-encodes the image at the quality you choose and can also scale it down. PNG output is lossless, so it only shrinks when you also reduce the dimensions.',
      },
      {
        q: 'What if the result is bigger than the original?',
        a: 'That can happen with already-optimised files. The tool flags it so you can keep the original instead.',
      },
      metadataFaq,
    ],
    limits: [...convertLimits, 'Best results come from JPG or WebP output; PNG output is lossless and may not shrink.'],
    related: ['image-resizer', 'jpg-to-webp', 'png-to-jpg', 'image-format-converter', 'image-cropper'],
  },
  {
    ...common,
    slug: 'image-resizer',
    group: 'Optimize and edit',
    name: 'Image Resizer',
    icon: 'scaling',
    impl: 'image-resize',
    description: 'Resize images by exact pixels or percentage while keeping the aspect ratio.',
    metaDescription:
      'Resize images online for free. Set exact width and height or a percentage, keep the aspect ratio, and download JPG, PNG or WebP.',
    keywords: ['resize image', 'change image dimensions', 'scale photo'],
    steps: [
      'Add one or more images.',
      'Choose pixels or percentage and enter the new size. Keep the aspect-ratio lock on to avoid distortion.',
      'Resize and download.',
    ],
    faq: [
      {
        q: 'Can I enlarge an image?',
        a: 'Yes, but enlarging cannot add detail, so the result will look softer. Downscaling gives the best quality.',
      },
      {
        q: 'What is the maximum output size?',
        a: 'Browsers limit canvas size. This tool caps output at 16,000 px per side and about 100 megapixels.',
      },
      metadataFaq,
    ],
    limits: [...convertLimits, 'Output is capped at 16,000 px per side.'],
    related: ['image-compressor', 'image-cropper', 'image-rotator', 'jpg-to-png', 'image-format-converter'],
  },
  {
    ...common,
    slug: 'image-cropper',
    group: 'Optimize and edit',
    name: 'Image Cropper',
    icon: 'crop',
    impl: 'image-crop',
    description: 'Crop an image to an exact region or a fixed aspect ratio with a live preview.',
    metaDescription:
      'Crop images online for free. Choose a fixed aspect ratio or set exact pixel values with a live preview. Processed in your browser.',
    keywords: ['crop image', 'crop photo', 'aspect ratio crop'],
    steps: [
      'Add an image.',
      'Pick an aspect ratio or drag the crop box, then fine-tune the position and size with the numeric fields.',
      'Press Crop and download.',
    ],
    faq: [
      {
        q: 'Does cropping reduce quality?',
        a: 'Cropping keeps original pixels. Quality only changes if you save as JPG or WebP with a lower quality setting.',
      },
      privacyFaq,
    ],
    limits: ['One image at a time.', 'Maximum 25 MB per file.', 'Animated images use the first frame.'],
    related: ['image-resizer', 'image-rotator', 'image-flipper', 'image-compressor', 'jpg-to-png'],
  },
  {
    ...common,
    slug: 'image-rotator',
    group: 'Optimize and edit',
    name: 'Image Rotator',
    icon: 'rotate',
    impl: 'image-transform',
    config: { mode: 'rotate' },
    description: 'Rotate images by 90°, 180°, 270° or any custom angle.',
    metaDescription:
      'Rotate images online for free. Turn photos 90, 180 or 270 degrees, or by a custom angle, right in your browser.',
    keywords: ['rotate image', 'rotate photo', 'turn picture'],
    steps: ['Add your images.', 'Choose a rotation or type a custom angle.', 'Apply and download.'],
    faq: [
      {
        q: 'What happens with non-right-angle rotations?',
        a: 'The canvas grows to fit the rotated image. For JPG output the empty corners are filled with your chosen background; PNG and WebP keep them transparent.',
      },
      privacyFaq,
    ],
    limits: convertLimits,
    related: ['image-flipper', 'image-cropper', 'image-resizer', 'rotate-pdf', 'image-compressor'],
  },
  {
    ...common,
    slug: 'image-flipper',
    group: 'Optimize and edit',
    name: 'Image Flipper',
    icon: 'flip',
    impl: 'image-transform',
    config: { mode: 'flip' },
    description: 'Mirror images horizontally or vertically.',
    metaDescription: 'Flip images horizontally or vertically online for free. Mirror photos in your browser with no upload.',
    keywords: ['flip image', 'mirror image', 'mirror photo'],
    steps: ['Add your images.', 'Choose horizontal, vertical or both.', 'Apply and download.'],
    faq: [
      {
        q: 'What is the difference between horizontal and vertical flip?',
        a: 'A horizontal flip mirrors left and right, like a mirror. A vertical flip turns the image upside down along its horizontal axis.',
      },
      privacyFaq,
    ],
    limits: convertLimits,
    related: ['image-rotator', 'image-cropper', 'image-resizer', 'image-compressor', 'image-format-converter'],
  },
  {
    ...common,
    slug: 'image-format-converter',
    group: 'Convert images',
    name: 'Image Format Converter',
    icon: 'repeat',
    impl: 'image-convert',
    config: { from: 'any', to: 'png' },
    description: 'Convert between JPG, PNG and WebP with one flexible tool.',
    metaDescription:
      'Convert images between JPG, PNG and WebP online for free. Pick the output format and quality, processed locally in your browser.',
    keywords: ['image converter', 'convert image format', 'change image type'],
    steps: ['Add images in any supported format.', 'Choose the output format and quality.', 'Convert and download.'],
    faq: [
      {
        q: 'Which formats can I use?',
        a: 'Input: JPG, PNG, WebP, GIF, BMP and AVIF if your browser can decode them. Output: JPG, PNG and WebP.',
      },
      {
        q: 'What about HEIC or TIFF?',
        a: 'Browsers cannot decode HEIC or TIFF natively, so those are not supported yet.',
      },
      privacyFaq,
    ],
    limits: [...convertLimits, 'HEIC/HEIF, TIFF and RAW files are not supported.'],
    related: ['jpg-to-png', 'png-to-jpg', 'jpg-to-webp', 'image-compressor', 'image-resizer'],
  },
  {
    ...common,
    slug: 'image-to-base64',
    group: 'Encode and inspect',
    convert: ['IMG', 'B64'],
    name: 'Image to Base64',
    icon: 'image',
    impl: 'image-to-base64',
    description: 'Encode an image as a Base64 data URI for CSS, HTML or JSON.',
    metaDescription:
      'Convert an image to a Base64 string or data URI online for free. Copy ready-made HTML and CSS snippets. Runs in your browser.',
    keywords: ['image to data uri', 'encode image base64'],
    steps: ['Add an image.', 'Choose the output style: data URI, raw Base64, HTML <img> or CSS.', 'Copy the result.'],
    faq: [
      {
        q: 'When should I use Base64 images?',
        a: 'For tiny icons in CSS or emails where an extra request costs more than the roughly 33% size increase. Avoid it for large photos.',
      },
      privacyFaq,
    ],
    limits: ['Maximum 5 MB per image, since Base64 text becomes very large.', 'One image at a time.'],
    related: ['base64-to-image', 'base64-encoder-decoder', 'image-compressor', 'image-resizer', 'image-format-converter'],
  },
  {
    ...common,
    fileTool: false,
    slug: 'base64-to-image',
    group: 'Encode and inspect',
    convert: ['B64', 'IMG'],
    name: 'Base64 to Image',
    icon: 'binary',
    impl: 'base64-to-image',
    description: 'Decode a Base64 string or data URI back into a downloadable image.',
    metaDescription:
      'Convert a Base64 string or data URI to an image online for free. Preview and download the decoded PNG, JPG, WebP or GIF.',
    keywords: ['base64 to png', 'decode base64 image', 'data uri to image'],
    steps: [
      'Paste a Base64 string or a full data URI.',
      'The image is decoded and previewed instantly.',
      'Download the image.',
    ],
    faq: [
      {
        q: 'Do I need the "data:image/png;base64," prefix?',
        a: 'No. Without a prefix the tool detects the format from the file signature (PNG, JPG, GIF, WebP).',
      },
      {
        q: 'Why do I get an error?',
        a: 'The string is probably truncated, contains extra characters, or is not an image. SVG data is also rejected here for safety.',
      },
    ],
    limits: ['Supports PNG, JPG, GIF and WebP. SVG is intentionally not rendered.', 'Maximum 10 MB of decoded data.'],
    related: ['image-to-base64', 'base64-encoder-decoder', 'image-format-converter', 'image-resizer', 'image-compressor'],
  },
  {
    ...common,
    slug: 'image-color-picker',
    group: 'Encode and inspect',
    name: 'Image Color Picker',
    icon: 'pipette',
    impl: 'image-color-picker',
    description: 'Pick exact colours from any image and extract its dominant palette.',
    metaDescription:
      'Pick colours from an image online for free. Click any pixel for HEX, RGB and HSL values and extract a dominant colour palette.',
    keywords: ['color picker from image', 'eyedropper', 'extract colors from image'],
    steps: [
      'Add an image.',
      'Click or tap anywhere on it (or use the arrow keys) to sample a pixel.',
      'Copy the HEX, RGB or HSL value, or copy from the extracted palette.',
    ],
    faq: [
      {
        q: 'How is the palette calculated?',
        a: 'The image is downsampled and its colours are grouped into buckets; the most common buckets are shown. It is an approximation of the dominant colours, not an exhaustive list.',
      },
      privacyFaq,
    ],
    limits: ['One image at a time.', 'Colours are sampled from the displayed sRGB pixels; colour profiles are ignored.'],
    related: ['color-converter', 'image-cropper', 'image-resizer', 'image-format-converter', 'image-to-base64'],
  },
];
