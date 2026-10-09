import type { ToolTextMap } from '../../toolText';

/** Translated names, descriptions, steps, FAQ and limits of the tools, keyed by tool slug. */
const tools: ToolTextMap = {
  'jpg-to-png': {
    name: 'JPG para PNG',
    description: 'Converta fotos JPG e JPEG em imagens PNG sem perdas com um clique.',
    metaDescription: 'Converta JPG para PNG on-line e de graça. Converta várias fotos JPEG em PNG direto no navegador, sem envio de arquivos e sem cadastro.',
    steps: [
      'Arraste um ou mais arquivos JPG para a ferramenta ou escolha-os no seu dispositivo.',
      'Confira as prévias e clique em Converter.',
      'Baixe cada PNG ou baixe tudo em um arquivo ZIP.',
    ],
    faq: [
      { q: 'Converter JPG para PNG melhora a qualidade?', a: 'Não. O JPG tem perdas, então os detalhes descartados ao salvar o JPG não podem ser recuperados. O PNG apenas guarda os pixels atuais sem novas perdas, o que é útil para edição ou para trabalhar com transparência.' },
      { q: 'Por que o PNG é maior que o JPG?', a: 'O PNG não tem perdas e costuma armazenar fotografias de forma menos eficiente que o JPG. Use JPG ou WebP quando o tamanho do arquivo importar mais que os pixels exatos.' },
      { q: 'Minhas imagens são enviadas para um servidor?', a: 'Não. A imagem é decodificada e codificada novamente pelo seu navegador, por meio da API Canvas. Esta ferramenta não envia o arquivo para lugar nenhum.' },
    ],
    limits: [
      'Arquivos GIF ou WebP animados são convertidos usando apenas o primeiro quadro.',
      'No máximo 25 MB por arquivo e 20 arquivos por lote, para manter o navegador responsivo.',
      'Os metadados EXIF e os perfis de cor incorporados não são preservados.',
    ],
  },
  'png-to-jpg': {
    name: 'PNG para JPG',
    description: 'Transforme imagens PNG em arquivos JPG menores, com qualidade ajustável.',
    metaDescription: 'Converta PNG para JPG on-line e de graça. Escolha a qualidade e a cor de fundo para imagens transparentes. Processado no seu navegador.',
    steps: [
      'Adicione seus arquivos PNG.',
      'Defina a qualidade do JPG e a cor de fundo usada para preencher as áreas transparentes.',
      'Clique em Converter e baixe os resultados.',
    ],
    faq: [
      { q: 'O que acontece com as áreas transparentes?', a: 'O JPG não tem transparência, então os pixels transparentes são preenchidos com a cor de fundo que você escolher (branco por padrão).' },
      { q: 'Qual qualidade devo usar?', a: 'De 80 a 90 é um bom equilíbrio para a maioria das imagens. Abaixo de cerca de 60, os artefatos de compressão ficam visíveis em textos e bordas nítidas.' },
      { q: 'Minhas imagens são enviadas para um servidor?', a: 'Não. A imagem é decodificada e codificada novamente pelo seu navegador, por meio da API Canvas. Esta ferramenta não envia o arquivo para lugar nenhum.' },
    ],
    limits: [
      'Arquivos GIF ou WebP animados são convertidos usando apenas o primeiro quadro.',
      'No máximo 25 MB por arquivo e 20 arquivos por lote, para manter o navegador responsivo.',
      'Os metadados EXIF e os perfis de cor incorporados não são preservados.',
      'A transparência é achatada em uma cor sólida, porque o JPG não consegue armazená-la.',
    ],
  },
  'jpg-to-webp': {
    name: 'JPG para WebP',
    description: 'Converta fotos JPG para o moderno WebP e obtenha arquivos menores e páginas mais rápidas.',
    metaDescription: 'Converta JPG para WebP on-line e de graça. Reduza o tamanho das fotos para a web com qualidade ajustável, processadas localmente no navegador.',
    steps: [
      'Adicione seus arquivos JPG.',
      'Escolha a qualidade do WebP (80 é um bom valor padrão).',
      'Converta e baixe.',
    ],
    faq: [
      { q: 'O WebP é menor que o JPG?', a: 'Em geral é de 20% a 35% menor com qualidade visual semelhante, mas o resultado depende da imagem.' },
      { q: 'Todos os navegadores aceitam WebP?', a: 'Todos os principais navegadores atuais conseguem exibir WebP. A codificação de WebP no navegador é compatível com Chrome, Edge, Firefox e versões recentes do Safari; se o seu não conseguir, a ferramenta avisa em vez de gerar um arquivo errado.' },
      { q: 'Minhas imagens são enviadas para um servidor?', a: 'Não. A imagem é decodificada e codificada novamente pelo seu navegador, por meio da API Canvas. Esta ferramenta não envia o arquivo para lugar nenhum.' },
    ],
    limits: [
      'Arquivos GIF ou WebP animados são convertidos usando apenas o primeiro quadro.',
      'No máximo 25 MB por arquivo e 20 arquivos por lote, para manter o navegador responsivo.',
      'Os metadados EXIF e os perfis de cor incorporados não são preservados.',
      'Seu navegador precisa aceitar a codificação de WebP; navegadores sem suporte mostram um erro.',
    ],
  },
  'png-to-webp': {
    name: 'PNG para WebP',
    description: 'Converta imagens PNG para WebP, mantendo a transparência e ocupando bem menos espaço.',
    metaDescription: 'Converta PNG para WebP on-line e de graça. Mantém a transparência, reduz o tamanho do arquivo e funciona inteiramente no seu navegador.',
    steps: [
      'Adicione seus arquivos PNG.',
      'Escolha a qualidade do WebP.',
      'Converta e baixe.',
    ],
    faq: [
      { q: 'A transparência é preservada?', a: 'Sim. O WebP aceita canal alfa, então os PNGs transparentes continuam transparentes.' },
      { q: 'Posso obter um resultado sem perdas?', a: 'Defina a qualidade como 100 para a maior fidelidade. Os navegadores codificam WebP com perdas, então use PNG se precisar de uma cópia matematicamente exata.' },
      { q: 'Minhas imagens são enviadas para um servidor?', a: 'Não. A imagem é decodificada e codificada novamente pelo seu navegador, por meio da API Canvas. Esta ferramenta não envia o arquivo para lugar nenhum.' },
    ],
    limits: [
      'Arquivos GIF ou WebP animados são convertidos usando apenas o primeiro quadro.',
      'No máximo 25 MB por arquivo e 20 arquivos por lote, para manter o navegador responsivo.',
      'Os metadados EXIF e os perfis de cor incorporados não são preservados.',
      'Seu navegador precisa aceitar a codificação de WebP; navegadores sem suporte mostram um erro.',
    ],
  },
  'webp-to-jpg': {
    name: 'WebP para JPG',
    description: 'Converta imagens WebP em arquivos JPG compatíveis com praticamente tudo.',
    metaDescription: 'Converta WebP para JPG on-line e de graça. Faça suas imagens WebP funcionarem em qualquer lugar, convertidas localmente no navegador.',
    steps: [
      'Adicione seus arquivos WebP.',
      'Defina a qualidade e a cor de fundo das áreas transparentes.',
      'Converta e baixe.',
    ],
    faq: [
      { q: 'Por que converter WebP para JPG?', a: 'Alguns programas mais antigos, clientes de e-mail e formulários de envio ainda rejeitam WebP. O JPG é aceito em quase todo lugar.' },
      { q: 'Minhas imagens são enviadas para um servidor?', a: 'Não. A imagem é decodificada e codificada novamente pelo seu navegador, por meio da API Canvas. Esta ferramenta não envia o arquivo para lugar nenhum.' },
    ],
    limits: [
      'Arquivos GIF ou WebP animados são convertidos usando apenas o primeiro quadro.',
      'No máximo 25 MB por arquivo e 20 arquivos por lote, para manter o navegador responsivo.',
      'Os metadados EXIF e os perfis de cor incorporados não são preservados.',
      'A transparência é achatada em uma cor sólida, porque o JPG não consegue armazená-la.',
    ],
  },
  'webp-to-png': {
    name: 'WebP para PNG',
    description: 'Converta imagens WebP para PNG sem perdas, mantendo a transparência.',
    metaDescription: 'Converta WebP para PNG on-line e de graça. Mantém a transparência e funciona inteiramente no seu navegador, sem envio de arquivos.',
    steps: [
      'Adicione seus arquivos WebP.',
      'Clique em Converter.',
      'Baixe os arquivos PNG.',
    ],
    faq: [
      { q: 'A transparência é mantida?', a: 'Sim. O PNG aceita transparência, então o canal alfa do WebP é transferido.' },
      { q: 'Minhas imagens são enviadas para um servidor?', a: 'Não. A imagem é decodificada e codificada novamente pelo seu navegador, por meio da API Canvas. Esta ferramenta não envia o arquivo para lugar nenhum.' },
    ],
    limits: [
      'Arquivos GIF ou WebP animados são convertidos usando apenas o primeiro quadro.',
      'No máximo 25 MB por arquivo e 20 arquivos por lote, para manter o navegador responsivo.',
      'Os metadados EXIF e os perfis de cor incorporados não são preservados.',
    ],
  },
  'image-compressor': {
    name: 'Compressor de imagens',
    description: 'Reduza o tamanho das imagens com qualidade ajustável e veja a economia exata.',
    metaDescription: 'Comprima imagens JPG, PNG e WebP on-line e de graça. Ajuste a qualidade, limite as dimensões se quiser e compare os tamanhos. Funciona no navegador.',
    steps: [
      'Adicione suas imagens.',
      'Escolha o formato de saída e a qualidade e, se quiser, uma largura ou altura máxima.',
      'Comprima, compare os tamanhos antes e depois e baixe.',
    ],
    faq: [
      { q: 'Como o compressor reduz o tamanho?', a: 'Ele codifica a imagem novamente na qualidade escolhida e também pode reduzi-la. A saída em PNG não tem perdas, então só diminui quando você também reduz as dimensões.' },
      { q: 'E se o resultado ficar maior que o original?', a: 'Isso pode acontecer com arquivos que já estão otimizados. A ferramenta avisa para que você mantenha o original.' },
      { q: 'Os dados EXIF ou de localização são mantidos?', a: 'Não. Codificar novamente por meio de um canvas descarta metadados EXIF, como o modelo da câmera e a localização GPS, o que costuma ser desejável antes de compartilhar uma foto. Os perfis de cor também não são preservados.' },
    ],
    limits: [
      'Arquivos GIF ou WebP animados são convertidos usando apenas o primeiro quadro.',
      'No máximo 25 MB por arquivo e 20 arquivos por lote, para manter o navegador responsivo.',
      'Os metadados EXIF e os perfis de cor incorporados não são preservados.',
      'Os melhores resultados vêm da saída em JPG ou WebP; a saída em PNG não tem perdas e pode não diminuir.',
    ],
  },
  'image-resizer': {
    name: 'Redimensionador de imagens',
    description: 'Redimensione imagens em pixels exatos ou em porcentagem, mantendo a proporção.',
    metaDescription: 'Redimensione imagens on-line e de graça. Defina largura e altura exatas ou uma porcentagem, mantenha a proporção e baixe em JPG, PNG ou WebP.',
    steps: [
      'Adicione uma ou mais imagens.',
      'Escolha pixels ou porcentagem e digite o novo tamanho. Mantenha o bloqueio de proporção ativado para evitar distorção.',
      'Redimensione e baixe.',
    ],
    faq: [
      { q: 'Posso ampliar uma imagem?', a: 'Sim, mas a ampliação não consegue acrescentar detalhes, então o resultado ficará mais suave. Reduzir dá a melhor qualidade.' },
      { q: 'Qual é o tamanho máximo de saída?', a: 'Os navegadores limitam o tamanho do canvas. Esta ferramenta limita a saída a 16.000 px por lado e cerca de 100 megapixels.' },
      { q: 'Os dados EXIF ou de localização são mantidos?', a: 'Não. Codificar novamente por meio de um canvas descarta metadados EXIF, como o modelo da câmera e a localização GPS, o que costuma ser desejável antes de compartilhar uma foto. Os perfis de cor também não são preservados.' },
    ],
    limits: [
      'Arquivos GIF ou WebP animados são convertidos usando apenas o primeiro quadro.',
      'No máximo 25 MB por arquivo e 20 arquivos por lote, para manter o navegador responsivo.',
      'Os metadados EXIF e os perfis de cor incorporados não são preservados.',
      'A saída é limitada a 16.000 px por lado.',
    ],
  },
  'image-cropper': {
    name: 'Cortador de imagens',
    description: 'Corte uma imagem em uma região exata ou em uma proporção fixa, com prévia em tempo real.',
    metaDescription: 'Corte imagens on-line e de graça. Escolha uma proporção fixa ou defina valores exatos em pixels com prévia em tempo real. Processado no navegador.',
    steps: [
      'Adicione uma imagem.',
      'Escolha uma proporção ou arraste a caixa de corte e ajuste a posição e o tamanho nos campos numéricos.',
      'Clique em Cortar e baixe.',
    ],
    faq: [
      { q: 'Cortar reduz a qualidade?', a: 'O corte mantém os pixels originais. A qualidade só muda se você salvar em JPG ou WebP com uma configuração de qualidade menor.' },
      { q: 'Minhas imagens são enviadas para um servidor?', a: 'Não. A imagem é decodificada e codificada novamente pelo seu navegador, por meio da API Canvas. Esta ferramenta não envia o arquivo para lugar nenhum.' },
    ],
    limits: [
      'Uma imagem por vez.',
      'No máximo 25 MB por arquivo.',
      'Imagens animadas usam o primeiro quadro.',
    ],
  },
  'image-rotator': {
    name: 'Girador de imagens',
    description: 'Gire imagens em 90°, 180°, 270° ou em qualquer ângulo personalizado.',
    metaDescription: 'Gire imagens on-line e de graça. Gire fotos em 90, 180 ou 270 graus, ou em um ângulo personalizado, direto no navegador.',
    steps: [
      'Adicione suas imagens.',
      'Escolha uma rotação ou digite um ângulo personalizado.',
      'Aplique e baixe.',
    ],
    faq: [
      { q: 'O que acontece em rotações que não são de ângulo reto?', a: 'O canvas aumenta para caber a imagem girada. Na saída em JPG, os cantos vazios são preenchidos com o fundo escolhido; PNG e WebP os mantêm transparentes.' },
      { q: 'Minhas imagens são enviadas para um servidor?', a: 'Não. A imagem é decodificada e codificada novamente pelo seu navegador, por meio da API Canvas. Esta ferramenta não envia o arquivo para lugar nenhum.' },
    ],
    limits: [
      'Arquivos GIF ou WebP animados são convertidos usando apenas o primeiro quadro.',
      'No máximo 25 MB por arquivo e 20 arquivos por lote, para manter o navegador responsivo.',
      'Os metadados EXIF e os perfis de cor incorporados não são preservados.',
    ],
  },
  'image-flipper': {
    name: 'Espelhador de imagens',
    description: 'Espelhe imagens na horizontal ou na vertical.',
    metaDescription: 'Inverta imagens na horizontal ou na vertical on-line e de graça. Espelhe fotos no navegador, sem enviar nada.',
    steps: [
      'Adicione suas imagens.',
      'Escolha horizontal, vertical ou ambos.',
      'Aplique e baixe.',
    ],
    faq: [
      { q: 'Qual é a diferença entre espelhar na horizontal e na vertical?', a: 'O espelhamento horizontal troca a esquerda pela direita, como um espelho. O espelhamento vertical vira a imagem de cabeça para baixo, ao longo do eixo horizontal.' },
      { q: 'Minhas imagens são enviadas para um servidor?', a: 'Não. A imagem é decodificada e codificada novamente pelo seu navegador, por meio da API Canvas. Esta ferramenta não envia o arquivo para lugar nenhum.' },
    ],
    limits: [
      'Arquivos GIF ou WebP animados são convertidos usando apenas o primeiro quadro.',
      'No máximo 25 MB por arquivo e 20 arquivos por lote, para manter o navegador responsivo.',
      'Os metadados EXIF e os perfis de cor incorporados não são preservados.',
    ],
  },
  'image-format-converter': {
    name: 'Conversor de formato de imagem',
    description: 'Converta entre JPG, PNG e WebP com uma única ferramenta flexível.',
    metaDescription: 'Converta imagens entre JPG, PNG e WebP on-line e de graça. Escolha o formato de saída e a qualidade, com processamento local no navegador.',
    steps: [
      'Adicione imagens em qualquer formato aceito.',
      'Escolha o formato de saída e a qualidade.',
      'Converta e baixe.',
    ],
    faq: [
      { q: 'Quais formatos posso usar?', a: 'Entrada: JPG, PNG, WebP, GIF, BMP e AVIF, se o seu navegador conseguir decodificá-los. Saída: JPG, PNG e WebP.' },
      { q: 'E HEIC ou TIFF?', a: 'Os navegadores não decodificam HEIC nem TIFF de forma nativa, então esses formatos ainda não são aceitos.' },
      { q: 'Minhas imagens são enviadas para um servidor?', a: 'Não. A imagem é decodificada e codificada novamente pelo seu navegador, por meio da API Canvas. Esta ferramenta não envia o arquivo para lugar nenhum.' },
    ],
    limits: [
      'Arquivos GIF ou WebP animados são convertidos usando apenas o primeiro quadro.',
      'No máximo 25 MB por arquivo e 20 arquivos por lote, para manter o navegador responsivo.',
      'Os metadados EXIF e os perfis de cor incorporados não são preservados.',
      'Arquivos HEIC/HEIF, TIFF e RAW não são aceitos.',
    ],
  },
  'image-to-base64': {
    name: 'Imagem para Base64',
    description: 'Codifique uma imagem como um data URI em Base64 para usar em CSS, HTML ou JSON.',
    metaDescription: 'Converta uma imagem em uma string Base64 ou data URI on-line e de graça. Copie trechos de HTML e CSS prontos. Funciona no navegador.',
    steps: [
      'Adicione uma imagem.',
      'Escolha o estilo de saída: data URI, Base64 puro, HTML <img> ou CSS.',
      'Copie o resultado.',
    ],
    faq: [
      { q: 'Quando devo usar imagens em Base64?', a: 'Para ícones minúsculos em CSS ou e-mails, em que uma requisição extra custa mais do que o aumento de cerca de 33% no tamanho. Evite usar em fotos grandes.' },
      { q: 'Minhas imagens são enviadas para um servidor?', a: 'Não. A imagem é decodificada e codificada novamente pelo seu navegador, por meio da API Canvas. Esta ferramenta não envia o arquivo para lugar nenhum.' },
    ],
    limits: [
      'No máximo 5 MB por imagem, pois o texto em Base64 fica muito grande.',
      'Uma imagem por vez.',
    ],
  },
  'base64-to-image': {
    name: 'Base64 para imagem',
    description: 'Decodifique uma string Base64 ou data URI de volta em uma imagem que pode ser baixada.',
    metaDescription: 'Converta uma string Base64 ou data URI em imagem on-line e de graça. Veja a prévia e baixe o PNG, JPG, WebP ou GIF decodificado.',
    steps: [
      'Cole uma string Base64 ou um data URI completo.',
      'A imagem é decodificada e exibida na hora.',
      'Baixe a imagem.',
    ],
    faq: [
      { q: 'Preciso do prefixo "data:image/png;base64,"?', a: 'Não. Sem prefixo, a ferramenta detecta o formato pela assinatura do arquivo (PNG, JPG, GIF, WebP).' },
      { q: 'Por que aparece um erro?', a: 'Provavelmente a string está truncada, tem caracteres a mais ou não é uma imagem. Dados SVG também são rejeitados aqui por segurança.' },
    ],
    limits: [
      'Aceita PNG, JPG, GIF e WebP. O SVG intencionalmente não é exibido.',
      'No máximo 10 MB de dados decodificados.',
    ],
  },
  'image-color-picker': {
    name: 'Seletor de cores de imagem',
    description: 'Escolha cores exatas de qualquer imagem e extraia a paleta de cores dominantes.',
    metaDescription: 'Escolha cores de uma imagem on-line e de graça. Clique em qualquer pixel para obter valores HEX, RGB e HSL e extraia uma paleta de cores dominantes.',
    steps: [
      'Adicione uma imagem.',
      'Clique ou toque em qualquer ponto dela (ou use as setas do teclado) para amostrar um pixel.',
      'Copie o valor HEX, RGB ou HSL, ou copie da paleta extraída.',
    ],
    faq: [
      { q: 'Como a paleta é calculada?', a: 'A imagem é reduzida e suas cores são agrupadas em faixas; as faixas mais comuns são exibidas. É uma aproximação das cores dominantes, não uma lista completa.' },
      { q: 'Minhas imagens são enviadas para um servidor?', a: 'Não. A imagem é decodificada e codificada novamente pelo seu navegador, por meio da API Canvas. Esta ferramenta não envia o arquivo para lugar nenhum.' },
    ],
    limits: [
      'Uma imagem por vez.',
      'As cores são amostradas dos pixels sRGB exibidos; os perfis de cor são ignorados.',
    ],
  },
  'image-watermark': {
    name: 'Marca d’água em imagens',
    description: 'Adicione uma marca d’água de texto ou logotipo a várias imagens de uma vez, única ou repetida em mosaico.',
    metaDescription: 'Adicione marca d’água em imagens on-line e de graça. Aplique texto ou logotipo em fotos JPG, PNG e WebP em lote, com opacidade e posição. Funciona no navegador.',
    steps: [
      'Adicione suas imagens.',
      'Escolha texto ou logotipo e defina tamanho, opacidade, posição e disposição.',
      'Aplique e baixe os resultados ou um arquivo ZIP.',
    ],
    faq: [
      { q: 'Posso usar urdu ou outros alfabetos?', a: 'Sim. As marcas d’água usam as fontes do seu dispositivo, então qualquer escrita que o seu sistema consiga exibir funciona.' },
      { q: 'Isso altera os meus originais?', a: 'Não. As cópias com marca d’água são salvas como novos arquivos.' },
      { q: 'Os dados EXIF ou de localização são mantidos?', a: 'Não. Codificar novamente por meio de um canvas descarta metadados EXIF, como o modelo da câmera e a localização GPS, o que costuma ser desejável antes de compartilhar uma foto. Os perfis de cor também não são preservados.' },
    ],
    limits: [
      'Arquivos GIF ou WebP animados são convertidos usando apenas o primeiro quadro.',
      'No máximo 25 MB por arquivo e 20 arquivos por lote, para manter o navegador responsivo.',
      'Os metadados EXIF e os perfis de cor incorporados não são preservados.',
      'Arquivos de logotipo: PNG, JPG ou WebP, de até 25 MB.',
    ],
  },
  'svg-converter': {
    name: 'SVG para PNG / JPG',
    description: 'Transforme gráficos vetoriais SVG em imagens PNG, JPG ou WebP em qualquer tamanho.',
    metaDescription: 'Converta SVG para PNG ou JPG on-line e de graça. Escolha uma escala ou largura exata para resultados nítidos; o PNG mantém a transparência. Funciona no navegador.',
    steps: [
      'Adicione seus arquivos SVG.',
      'Escolha PNG, JPG ou WebP e o tamanho de saída.',
      'Converta e baixe.',
    ],
    faq: [
      { q: 'A imagem continua nítida em tamanhos grandes?', a: 'Sim. O SVG é desenhado no tamanho que você escolher, então uma exportação em 4× é tão nítida quanto uma em 1×.' },
      { q: 'Por que meu SVG aparece diferente?', a: 'Os navegadores não aceitam todos os recursos de SVG, e SVGs que dependem de fontes ou imagens externas voltam aos padrões. Incorpore fontes e imagens dentro do SVG para obter o melhor resultado.' },
      { q: 'É seguro abrir arquivos SVG aqui?', a: 'Sim. O SVG é desenhado como uma imagem, então os scripts dentro dele não são executados.' },
      { q: 'Minhas imagens são enviadas para um servidor?', a: 'Não. A imagem é decodificada e codificada novamente pelo seu navegador, por meio da API Canvas. Esta ferramenta não envia o arquivo para lugar nenhum.' },
    ],
    limits: [
      'No máximo 25 MB por arquivo e 20 arquivos por lote.',
      'Fontes, imagens e estilos vinculados de fora do SVG não são carregados.',
      'Um SVG sem tamanho usa o viewBox ou 300 × 150 px, se nenhum dos dois estiver definido.',
    ],
  },
  'enlarge-image': {
    name: 'Ampliar imagem',
    description: 'Aumente imagens com reamostragem suave e nítida, de 2× a 4× ou até uma largura definida.',
    metaDescription: 'Amplie imagens on-line e de graça. Aumente JPG, PNG e WebP em 2×, 3×, 4× ou até uma largura exata com reamostragem Lanczos e nitidez opcional.',
    steps: [
      'Adicione suas imagens.',
      'Escolha um fator ou uma largura final e se deseja aplicar nitidez.',
      'Amplie e baixe.',
    ],
    faq: [
      { q: 'Isso é ampliação com IA?', a: 'Não. Ele usa reamostragem de alta qualidade, que deixa as imagens ampliadas suaves e limpas, mas não consegue inventar detalhes que faltam. Fotos muito pequenas ou desfocadas continuarão suaves.' },
      { q: 'Qual o tamanho máximo do resultado?', a: 'Até 16.000 px por lado e cerca de 100 megapixels, dependendo do que o seu navegador suportar.' },
      { q: 'Os dados EXIF ou de localização são mantidos?', a: 'Não. Codificar novamente por meio de um canvas descarta metadados EXIF, como o modelo da câmera e a localização GPS, o que costuma ser desejável antes de compartilhar uma foto. Os perfis de cor também não são preservados.' },
    ],
    limits: [
      'Arquivos GIF ou WebP animados são convertidos usando apenas o primeiro quadro.',
      'No máximo 25 MB por arquivo e 20 arquivos por lote, para manter o navegador responsivo.',
      'Os metadados EXIF e os perfis de cor incorporados não são preservados.',
      'Ele não acrescenta detalhes, então não é uma ampliação com IA.',
      'A saída é limitada a 16.000 px por lado.',
    ],
  },
  'blur-image-area': {
    name: 'Desfocar ou pixelar área',
    description: 'Oculte rostos, placas ou detalhes privados desfocando, pixelando ou cobrindo áreas.',
    metaDescription: 'Desfoque ou pixele parte de uma imagem on-line e de graça. Desenhe caixas sobre rostos, placas de veículos ou textos e oculte-os direto no navegador.',
    steps: [
      'Adicione uma imagem.',
      'Arraste sobre a imagem para desenhar caixas sobre o que você quer ocultar.',
      'Escolha desfoque, pixelização ou uma caixa preta, aplique e baixe.',
    ],
    faq: [
      { q: 'O desfoque é seguro para detalhes sensíveis?', a: 'Para qualquer coisa que precise continuar privada, como números de documentos ou placas de veículos, use a caixa preta. O desfoque e a pixelização às vezes podem ser parcialmente revertidos.' },
      { q: 'Ele encontra rostos automaticamente?', a: 'Não. Você mesmo desenha as caixas. A detecção automática exige um grande modelo de IA, que não está incluído.' },
      { q: 'Posso mudar de ideia?', a: 'Sim. Remova ou redesenhe as caixas antes de aplicar. Seu arquivo original nunca é alterado.' },
      { q: 'Os dados EXIF ou de localização são mantidos?', a: 'Não. Codificar novamente por meio de um canvas descarta metadados EXIF, como o modelo da câmera e a localização GPS, o que costuma ser desejável antes de compartilhar uma foto. Os perfis de cor também não são preservados.' },
    ],
    limits: [
      'Uma imagem por vez, de até 25 MB.',
      'As áreas são escolhidas manualmente; não há detecção de rostos.',
      'Imagens animadas usam o primeiro quadro.',
    ],
  },
  'qr-code-scanner': {
    name: 'Leitor de QR Code',
    description: 'Leia QR Codes de fotos e capturas de tela e veja exatamente o que eles contêm.',
    metaDescription: 'Leia um QR Code a partir de uma imagem on-line e de graça. Envie uma foto ou captura de tela para ver o link, o texto ou os dados de Wi-Fi. Funciona no navegador.',
    steps: [
      'Adicione uma ou mais imagens que contenham um QR Code.',
      'O código é lido automaticamente.',
      'Copie o resultado ou abra um link depois de conferi-lo.',
    ],
    faq: [
      { q: 'Dá para ler com a câmera?', a: 'Ainda não. Esta ferramenta lê QR Codes de arquivos de imagem. No celular, tire uma foto do código e escolha-a aqui, ou use o aplicativo da câmera.' },
      { q: 'É seguro abrir os links lidos?', a: 'Confira o endereço antes. O link completo é exibido, e só links da web (http ou https) podem ser abertos daqui. Links de script e de dados nunca são abertos.' },
      { q: 'Por que nenhum código foi encontrado?', a: 'O código pode estar borrado, cortado, pequeno demais ou com pouco contraste. Tente uma imagem mais nítida e mais próxima, que mostre o código inteiro com uma margem clara ao redor.' },
      { q: 'Minhas imagens são enviadas?', a: 'Não. A imagem é lida no seu navegador e esta ferramenta não a envia para lugar nenhum.' },
    ],
    limits: [
      'Até 10 imagens, de 25 MB cada.',
      'Um código é lido por imagem.',
      'Somente QR Codes padrão; outros códigos de barras não são aceitos.',
    ],
  },
  'gif-maker': {
    name: 'Criador de GIF',
    description: 'Transforme suas imagens em um GIF animado com tempo, tamanho e repetição personalizados.',
    metaDescription: 'Crie um GIF animado a partir de imagens on-line e de graça. Reordene os quadros, defina o intervalo de cada um, escolha tamanho e repetição e baixe o GIF. Criado no navegador.',
    steps: [
      'Adicione duas ou mais imagens (ou apenas uma, para um GIF estático).',
      'Arraste-as para colocá-las em ordem, defina por quanto tempo cada quadro aparece e escolha o tamanho, a repetição e as cores.',
      'Crie o GIF, veja a prévia e baixe.',
    ],
    faq: [
      { q: 'Por que meu GIF ficou tão grande?', a: 'O GIF armazena cada quadro como uma imagem limitada a 256 cores. Menos quadros, uma largura menor e menos cores reduzem o arquivo. A ferramenta mostra o tamanho assim que o GIF é criado.' },
      { q: 'Posso manter as áreas transparentes?', a: 'Sim, ative "Manter áreas transparentes" para imagens PNG ou WebP com transparência. A transparência do GIF é ativada ou desativada por pixel, então bordas suaves ficam duras.' },
      { q: 'Minhas imagens são enviadas para um servidor?', a: 'Não. A imagem é decodificada e codificada novamente pelo seu navegador, por meio da API Canvas. Esta ferramenta não envia o arquivo para lugar nenhum.' },
    ],
    limits: [
      'Até 100 quadros; quanto maiores os quadros, mais memória o navegador precisa.',
      'Os GIFs são limitados a 256 cores por quadro, então fotos podem ficar granuladas.',
      'Arquivos animados de entrada (GIF, WebP) contribuem apenas com o primeiro quadro.',
    ],
  },
  'photo-editor': {
    name: 'Editor de fotos',
    description: 'Ajuste, aplique filtros, gire, corte e adicione texto a uma foto, com prévia em tempo real.',
    metaDescription: 'Editor de fotos on-line e gratuito. Ajuste as cores, aplique filtros, gire, endireite, corte e adicione texto e baixe em PNG, JPG ou WebP. Privado, no navegador.',
    steps: [
      'Adicione uma foto.',
      'Use as abas para ajustar as cores, aplicar um filtro, girar ou cortar e adicionar texto. A prévia é atualizada conforme você edita.',
      'Escolha o formato e baixe a foto editada.',
    ],
    faq: [
      { q: 'O arquivo original é alterado?', a: 'Não. Seu arquivo nunca é modificado; a imagem editada é criada como um novo download.' },
      { q: 'Exportar causa perda de qualidade?', a: 'O PNG mantém todos os pixels. JPG e WebP têm perdas; use qualidade 90 ou mais para que as fotos continuem com a mesma aparência. As edições são aplicadas no tamanho original da imagem, não no tamanho da prévia.' },
      { q: 'Minhas imagens são enviadas para um servidor?', a: 'Não. A imagem é decodificada e codificada novamente pelo seu navegador, por meio da API Canvas. Esta ferramenta não envia o arquivo para lugar nenhum.' },
    ],
    limits: [
      'Uma foto por vez, de até 25 MB e cerca de 50 megapixels.',
      'As edições são aplicadas em uma ordem fixa: girar e cortar, ajustes de cor, desfoque e nitidez, vinheta e, por fim, texto.',
      'Detalhes EXIF, como a localização, não são copiados para a imagem editada.',
      'Sem camadas, pincéis ou recursos de IA.',
    ],
  },
  'jpg-to-pdf': {
    name: 'JPG para PDF',
    description: 'Transforme fotos JPG em um PDF, com uma imagem por página.',
    metaDescription: 'Converta JPG para PDF on-line e de graça. Escolha o tamanho da página, a orientação e as margens. Os dados JPEG são incorporados sem nova compressão.',
    steps: [
      'Adicione seus arquivos JPG e arraste-os ou use as setas para definir a ordem.',
      'Escolha o tamanho da página, a orientação e a margem.',
      'Crie o PDF e baixe.',
    ],
    faq: [
      { q: 'A qualidade da imagem diminui?', a: 'Não. Os arquivos JPG são incorporados ao PDF como estão, sem nova compressão.' },
      { q: 'Meu PDF é enviado para algum lugar?', a: 'Não. O PDF é lido e reescrito pelo seu navegador. Esta ferramenta não envia o arquivo para um servidor.' },
    ],
    limits: [
      'No máximo 25 MB por imagem e 100 imagens por PDF.',
      'Aqui só são aceitas imagens JPG; use Imagens para PDF para formatos mistos.',
    ],
  },
  'png-to-pdf': {
    name: 'PNG para PDF',
    description: 'Transforme imagens PNG em um PDF, mantendo a transparência.',
    metaDescription: 'Converta PNG para PDF on-line e de graça. Escolha o tamanho da página e as margens; a transparência é preservada. Funciona no navegador.',
    steps: [
      'Adicione seus arquivos PNG e defina a ordem.',
      'Escolha o tamanho da página, a orientação e a margem.',
      'Crie o PDF e baixe.',
    ],
    faq: [
      { q: 'A transparência é preservada?', a: 'Sim. As imagens PNG são incorporadas com o canal alfa, então as áreas transparentes mostram a página branca por trás.' },
      { q: 'Meu PDF é enviado para algum lugar?', a: 'Não. O PDF é lido e reescrito pelo seu navegador. Esta ferramenta não envia o arquivo para um servidor.' },
    ],
    limits: [
      'No máximo 25 MB por imagem e 100 imagens por PDF.',
      'Aqui só são aceitas imagens PNG; use Imagens para PDF para formatos mistos.',
    ],
  },
  'images-to-pdf': {
    name: 'Imagens para PDF',
    description: 'Junte imagens JPG e PNG em um único PDF, na ordem que você escolher.',
    metaDescription: 'Junte várias imagens em um único PDF on-line e de graça. Reordene as páginas e escolha o tamanho da página e as margens. Processado no navegador.',
    steps: [
      'Adicione imagens JPG e PNG (arraste várias de uma vez).',
      'Reordene-as e escolha o tamanho da página, a orientação e a margem.',
      'Crie o PDF e baixe.',
    ],
    faq: [
      { q: 'Quais formatos de imagem funcionam?', a: 'JPG e PNG são incorporados diretamente. WebP, GIF e BMP são convertidos primeiro em PNG, se o seu navegador conseguir decodificá-los.' },
      { q: 'O que faz a opção "Ajustar à imagem"?', a: 'Cada página tem o tamanho da sua imagem, então nada é redimensionado nem recebe margens extras. Escolha A4 ou Carta para páginas de documento padrão.' },
      { q: 'Meu PDF é enviado para algum lugar?', a: 'Não. O PDF é lido e reescrito pelo seu navegador. Esta ferramenta não envia o arquivo para um servidor.' },
    ],
    limits: [
      'No máximo 25 MB por imagem e 100 imagens por PDF.',
    ],
  },
  'merge-pdf': {
    name: 'Juntar PDF',
    description: 'Junte vários arquivos PDF em um só documento, na ordem que você escolher.',
    metaDescription: 'Junte arquivos PDF on-line e de graça. Combine vários PDFs em um só, reordene-os e baixe na hora. Processado no seu navegador.',
    steps: [
      'Adicione dois ou mais arquivos PDF.',
      'Coloque-os na ordem desejada usando as setas.',
      'Junte e baixe o PDF combinado.',
    ],
    faq: [
      { q: 'Os marcadores e os campos de formulário são mantidos?', a: 'As páginas são copiadas com o conteúdo visível e os links. Os marcadores do documento e os dados interativos de formulário não são transferidos.' },
      { q: 'Ele abre PDFs protegidos por senha?', a: 'Não. PDFs criptografados são detectados e rejeitados com uma mensagem clara. Remova a senha antes com a nossa ferramenta Desbloquear PDF.' },
      { q: 'Meu PDF é enviado para algum lugar?', a: 'Não. O PDF é lido e reescrito pelo seu navegador. Esta ferramenta não envia o arquivo para um servidor.' },
    ],
    limits: [
      'No máximo 100 MB por PDF.',
      'PDFs protegidos por senha (criptografados) não são aceitos.',
      'PDFs muito grandes ou complexos dependem da memória do seu dispositivo.',
      'Os marcadores/índices e os campos de formulário dos arquivos de origem não são combinados.',
    ],
  },
  'split-pdf': {
    name: 'Dividir PDF',
    description: 'Divida um PDF por intervalos de páginas, em páginas individuais ou em partes de tamanho fixo.',
    metaDescription: 'Divida um PDF on-line e de graça. Separe por intervalos de páginas, cada página ou a cada N páginas e baixe em um ZIP. Funciona no navegador.',
    steps: [
      'Adicione um PDF.',
      'Escolha como dividir: intervalos personalizados como 1-3, 4-6, cada página ou a cada N páginas.',
      'Divida e baixe as partes individualmente ou em um ZIP.',
    ],
    faq: [
      { q: 'Como escrevo os intervalos?', a: 'Separe os arquivos de saída com vírgulas. Cada arquivo pode ser um intervalo (1-3), uma única página (5) ou uma combinação separada por um sinal de mais (1-2+7). Exemplo: 1-3, 4-6, 7+9.' },
      { q: 'Ele abre PDFs protegidos por senha?', a: 'Não. PDFs criptografados são detectados e rejeitados com uma mensagem clara. Remova a senha antes com a nossa ferramenta Desbloquear PDF.' },
    ],
    limits: [
      'No máximo 100 MB por PDF.',
      'PDFs protegidos por senha (criptografados) não são aceitos.',
      'PDFs muito grandes ou complexos dependem da memória do seu dispositivo.',
    ],
  },
  'rotate-pdf': {
    name: 'Girar PDF',
    description: 'Gire páginas individuais ou o PDF inteiro, com miniaturas de prévia.',
    metaDescription: 'Gire páginas de PDF on-line e de graça. Gire páginas individuais ou todas em 90, 180 ou 270 graus e salve um novo PDF. Funciona no navegador.',
    steps: [
      'Adicione um PDF; as páginas aparecem como miniaturas.',
      'Gire páginas individuais ou gire todas de uma vez.',
      'Salve o PDF girado.',
    ],
    faq: [
      { q: 'A rotação é permanente?', a: 'Ela é gravada no novo PDF como um atributo de rotação da página. O conteúdo da página não é redesenhado, então nada se perde.' },
      { q: 'Ele abre PDFs protegidos por senha?', a: 'Não. PDFs criptografados são detectados e rejeitados com uma mensagem clara. Remova a senha antes com a nossa ferramenta Desbloquear PDF.' },
    ],
    limits: [
      'No máximo 100 MB por PDF.',
      'PDFs protegidos por senha (criptografados) não são aceitos.',
      'PDFs muito grandes ou complexos dependem da memória do seu dispositivo.',
    ],
  },
  'extract-pdf-pages': {
    name: 'Extrair páginas do PDF',
    description: 'Escolha as páginas de que precisa em um PDF e salve-as como um novo documento.',
    metaDescription: 'Extraia páginas de um PDF on-line e de graça. Selecione as páginas visualmente ou por intervalo e salve um novo PDF. Processado no navegador.',
    steps: [
      'Adicione um PDF.',
      'Clique nas miniaturas das páginas para selecioná-las ou digite um intervalo, como 1-3, 8.',
      'Extraia e baixe o novo PDF.',
    ],
    faq: [
      { q: 'Posso usar isto para excluir páginas?', a: 'Sim. Selecione as páginas que quer manter e extraia-as; as demais ficam de fora do novo arquivo.' },
      { q: 'Ele abre PDFs protegidos por senha?', a: 'Não. PDFs criptografados são detectados e rejeitados com uma mensagem clara. Remova a senha antes com a nossa ferramenta Desbloquear PDF.' },
    ],
    limits: [
      'No máximo 100 MB por PDF.',
      'PDFs protegidos por senha (criptografados) não são aceitos.',
      'PDFs muito grandes ou complexos dependem da memória do seu dispositivo.',
    ],
  },
  'reorder-pdf-pages': {
    name: 'Reordenar páginas do PDF',
    description: 'Reorganize, remova e gire páginas visualmente e salve o resultado.',
    metaDescription: 'Reordene páginas de PDF on-line e de graça. Arraste ou mova páginas, exclua as que não precisa e salve um novo PDF. Funciona no navegador.',
    steps: [
      'Adicione um PDF; as páginas aparecem como miniaturas.',
      'Arraste as páginas ou use os botões de seta para mudar a ordem. Remova as páginas de que não precisa.',
      'Salve o PDF reordenado.',
    ],
    faq: [
      { q: 'Posso reordenar com o teclado?', a: 'Sim. Use os botões de mover para antes e para depois em cada página.' },
      { q: 'Ele abre PDFs protegidos por senha?', a: 'Não. PDFs criptografados são detectados e rejeitados com uma mensagem clara. Remova a senha antes com a nossa ferramenta Desbloquear PDF.' },
    ],
    limits: [
      'No máximo 100 MB por PDF.',
      'PDFs protegidos por senha (criptografados) não são aceitos.',
      'PDFs muito grandes ou complexos dependem da memória do seu dispositivo.',
    ],
  },
  'pdf-to-jpg': {
    name: 'PDF para JPG',
    description: 'Converta páginas de PDF em imagens JPG na resolução que você escolher.',
    metaDescription: 'Converta PDF para JPG on-line e de graça. Gere todas as páginas ou uma seleção em até 300 DPI e baixe um ZIP. Funciona no navegador.',
    steps: [
      'Adicione um PDF.',
      'Escolha a resolução e, se quiser, quais páginas converter.',
      'Converta e baixe as imagens individualmente ou em um ZIP.',
    ],
    faq: [
      { q: 'Qual resolução devo escolher?', a: '150 DPI é adequado para telas; 300 DPI para impressão. Valores maiores geram imagens maiores e exigem mais memória.' },
      { q: 'As páginas são renderizadas com precisão?', a: 'A renderização usa o PDF.js da Mozilla, que lida bem com a maioria dos PDFs. Fontes incomuns ou gráficos avançados podem ficar um pouco diferentes de outros visualizadores.' },
      { q: 'Ele abre PDFs protegidos por senha?', a: 'Não. PDFs criptografados são detectados e rejeitados com uma mensagem clara. Remova a senha antes com a nossa ferramenta Desbloquear PDF.' },
    ],
    limits: [
      'No máximo 100 MB por PDF.',
      'PDFs protegidos por senha (criptografados) não são aceitos.',
      'PDFs muito grandes ou complexos dependem da memória do seu dispositivo.',
      'Cada página é limitada a cerca de 50 megapixels.',
    ],
  },
  'pdf-to-png': {
    name: 'PDF para PNG',
    description: 'Converta páginas de PDF em imagens PNG nítidas e sem perdas.',
    metaDescription: 'Converta PDF para PNG on-line e de graça. Gere páginas em até 300 DPI como imagens sem perdas e baixe um ZIP. Funciona no navegador.',
    steps: [
      'Adicione um PDF.',
      'Escolha a resolução e as páginas.',
      'Converta e baixe as imagens individualmente ou em um ZIP.',
    ],
    faq: [
      { q: 'Por que escolher PNG em vez de JPG?', a: 'O PNG continua nítido em textos e desenhos de linha e aceita transparência. Os arquivos são maiores que os JPG.' },
      { q: 'Ele abre PDFs protegidos por senha?', a: 'Não. PDFs criptografados são detectados e rejeitados com uma mensagem clara. Remova a senha antes com a nossa ferramenta Desbloquear PDF.' },
    ],
    limits: [
      'No máximo 100 MB por PDF.',
      'PDFs protegidos por senha (criptografados) não são aceitos.',
      'PDFs muito grandes ou complexos dependem da memória do seu dispositivo.',
      'Cada página é limitada a cerca de 50 megapixels.',
    ],
  },
  'pdf-viewer': {
    name: 'Visualizador de PDF',
    description: 'Abra e leia um PDF com privacidade no navegador, com zoom e navegação por páginas.',
    metaDescription: 'Visualize arquivos PDF on-line e de graça. Use o zoom, vá até uma página e leia documentos no navegador sem enviá-los para lugar nenhum.',
    steps: [
      'Adicione um PDF.',
      'Role a página ou use os controles de página para navegar.',
      'Aumente ou diminua o zoom conforme necessário.',
    ],
    faq: [
      { q: 'Posso editar ou anotar o PDF aqui?', a: 'Não. Este é um visualizador somente leitura. Use as ferramentas de páginas para girar, reordenar ou extrair páginas.' },
      { q: 'Ele abre PDFs protegidos por senha?', a: 'Não. PDFs criptografados são detectados e rejeitados com uma mensagem clara. Remova a senha antes com a nossa ferramenta Desbloquear PDF.' },
    ],
    limits: [
      'No máximo 100 MB por PDF.',
      'PDFs protegidos por senha (criptografados) não são aceitos.',
      'PDFs muito grandes ou complexos dependem da memória do seu dispositivo.',
      'Somente leitura: sem anotações, preenchimento de formulários ou busca de texto.',
    ],
  },
  'pdf-metadata-viewer': {
    name: 'Visualizador de metadados de PDF',
    description: 'Veja o título, o autor, as datas de criação, o número de páginas, os tamanhos das páginas e a versão de um PDF.',
    metaDescription: 'Veja os metadados de um PDF on-line e de graça. Confira título, autor, produtor, datas, número de páginas e tamanhos sem enviar o arquivo.',
    steps: [
      'Adicione um PDF.',
      'Confira as propriedades do documento.',
      'Copie os detalhes como JSON, se precisar deles.',
    ],
    faq: [
      { q: 'Por que alguns metadados estão ausentes?', a: 'Muitos PDFs não definem todos os campos. Somente os campos realmente armazenados no arquivo são exibidos.' },
      { q: 'Posso remover os metadados?', a: 'Esta ferramenta apenas lê os metadados. Ela não modifica o arquivo.' },
      { q: 'Ele abre PDFs protegidos por senha?', a: 'Não. PDFs criptografados são detectados e rejeitados com uma mensagem clara. Remova a senha antes com a nossa ferramenta Desbloquear PDF.' },
    ],
    limits: [
      'No máximo 100 MB por PDF.',
      'PDFs protegidos por senha (criptografados) não são aceitos.',
      'PDFs muito grandes ou complexos dependem da memória do seu dispositivo.',
      'Somente leitura: os metadados não podem ser editados nem removidos aqui.',
    ],
  },
  'remove-pdf-pages': {
    name: 'Remover páginas do PDF',
    description: 'Exclua as páginas de que não precisa e salve o restante como um novo PDF.',
    metaDescription: 'Remova páginas de um PDF on-line e de graça. Selecione as páginas visualmente ou por intervalo, exclua-as e baixe o restante. Processado no navegador.',
    steps: [
      'Adicione um PDF; as páginas aparecem como miniaturas.',
      'Clique nas páginas que quer excluir ou digite um intervalo, como 2, 5-7.',
      'Remova-as e baixe o novo PDF.',
    ],
    faq: [
      { q: 'Isso altera o meu arquivo original?', a: 'Não. Você recebe um novo PDF sem as páginas selecionadas. O original continua como estava.' },
      { q: 'Posso remover todas as páginas?', a: 'Não. Pelo menos uma página precisa ficar.' },
      { q: 'Ele abre PDFs protegidos por senha?', a: 'Não. PDFs criptografados são detectados e rejeitados com uma mensagem clara. Remova a senha antes com a nossa ferramenta Desbloquear PDF.' },
    ],
    limits: [
      'No máximo 100 MB por PDF.',
      'PDFs protegidos por senha (criptografados) não são aceitos.',
      'PDFs muito grandes ou complexos dependem da memória do seu dispositivo.',
    ],
  },
  'add-page-numbers': {
    name: 'Adicionar números de página',
    description: 'Numere as páginas de um PDF escolhendo a posição, o formato e o estilo.',
    metaDescription: 'Adicione números de página a um PDF on-line e de graça. Escolha a posição, um formato como “Página 1 de 10”, o número inicial e o tamanho da fonte. Funciona no navegador.',
    steps: [
      'Adicione um PDF.',
      'Escolha onde os números ficam, o formato deles e quais páginas numerar.',
      'Adicione os números e baixe o PDF.',
    ],
    faq: [
      { q: 'Posso pular a capa?', a: 'Sim. Defina "Primeira página a numerar" como 2 e depois escolha qual número ela deve mostrar.' },
      { q: 'Funciona em páginas giradas?', a: 'Sim. Os números são posicionados em relação ao que você vê na tela, inclusive em páginas giradas.' },
      { q: 'Qual fonte é usada?', a: 'Helvetica, que cobre dígitos e letras latinas.' },
      { q: 'Ele abre PDFs protegidos por senha?', a: 'Não. PDFs criptografados são detectados e rejeitados com uma mensagem clara. Remova a senha antes com a nossa ferramenta Desbloquear PDF.' },
    ],
    limits: [
      'No máximo 100 MB por PDF.',
      'PDFs protegidos por senha (criptografados) não são aceitos.',
      'PDFs muito grandes ou complexos dependem da memória do seu dispositivo.',
      'Os números são desenhados sobre cada página, nunca atrás do conteúdo existente.',
      'Usa a fonte Helvetica integrada.',
    ],
  },
  'watermark-pdf': {
    name: 'Marca d’água em PDF',
    description: 'Aplique um texto ou uma imagem nas páginas do PDF, com opacidade e ângulo ajustáveis.',
    metaDescription: 'Adicione marca d’água a um PDF on-line e de graça. Aplique texto ou imagem, centralizada ou em mosaico, com opacidade e rotação. Processado no navegador.',
    steps: [
      'Adicione um PDF.',
      'Escolha uma marca d’água de texto ou de imagem e defina tamanho, opacidade, ângulo e disposição.',
      'Aplique em todas as páginas ou em uma seleção e baixe.',
    ],
    faq: [
      { q: 'A marca d’água pode ser removida?', a: 'Ela é desenhada sobre a página e não é um recurso de segurança. Qualquer pessoa com um editor de PDF consegue removê-la. Para uma proteção maior, combine com Proteger PDF.' },
      { q: 'Posso usar urdu, árabe ou outros alfabetos?', a: 'Não como texto digitado, porque as fontes integradas do PDF cobrem apenas letras latinas. Crie um PNG transparente com o seu texto e use a opção de imagem.' },
      { q: 'A marca d’água fica na frente ou atrás do texto da página?', a: 'Na frente. Diminua a opacidade para que a página continue legível.' },
      { q: 'Ele abre PDFs protegidos por senha?', a: 'Não. PDFs criptografados são detectados e rejeitados com uma mensagem clara. Remova a senha antes com a nossa ferramenta Desbloquear PDF.' },
    ],
    limits: [
      'No máximo 100 MB por PDF.',
      'PDFs protegidos por senha (criptografados) não são aceitos.',
      'PDFs muito grandes ou complexos dependem da memória do seu dispositivo.',
      'As marcas d’água de texto aceitam apenas letras latinas, dígitos e símbolos comuns.',
      'Imagens de marca d’água: PNG ou JPG, de até 5 MB.',
      'A marca é desenhada sobre o conteúdo existente da página.',
    ],
  },
  'crop-pdf': {
    name: 'Cortar PDF',
    description: 'Apare as margens ou mantenha uma área escolhida em todas as páginas, com prévia em tempo real.',
    metaDescription: 'Corte páginas de PDF on-line e de graça. Arraste uma caixa de corte na prévia ou digite as margens e aplique a todas as páginas ou a algumas. Funciona no navegador.',
    steps: [
      'Adicione um PDF e escolha uma página para a prévia.',
      'Arraste a caixa ou digite as margens para selecionar a área a manter.',
      'Escolha quais páginas cortar e baixe.',
    ],
    faq: [
      { q: 'O conteúdo cortado é excluído?', a: 'Não. O corte altera a área visível de cada página, mas o conteúdo fora dela continua dentro do arquivo. Não conte com o corte para ocultar informações sensíveis.' },
      { q: 'E se as minhas páginas tiverem tamanhos diferentes?', a: 'As mesmas proporções são aplicadas a todas as páginas escolhidas, então páginas de tamanhos diferentes são aparadas na mesma porcentagem.' },
      { q: 'Ele abre PDFs protegidos por senha?', a: 'Não. PDFs criptografados são detectados e rejeitados com uma mensagem clara. Remova a senha antes com a nossa ferramenta Desbloquear PDF.' },
    ],
    limits: [
      'No máximo 100 MB por PDF.',
      'PDFs protegidos por senha (criptografados) não são aceitos.',
      'PDFs muito grandes ou complexos dependem da memória do seu dispositivo.',
      'O corte oculta o conteúdo; ele não o exclui.',
      'A área de corte é uma fração de cada página, não um tamanho fixo em milímetros.',
    ],
  },
  'edit-pdf-metadata': {
    name: 'Editar metadados de PDF',
    description: 'Altere o título, o autor, o assunto e as palavras-chave de um PDF, ou remova todos os metadados.',
    metaDescription: 'Edite os metadados de um PDF on-line e de graça. Altere título, autor, assunto e palavras-chave ou remova todas as propriedades do documento. Processado no navegador.',
    steps: [
      'Adicione um PDF; as propriedades atuais já vêm preenchidas.',
      'Edite os campos ou escolha Remover todos os metadados.',
      'Salve e baixe o PDF atualizado.',
    ],
    faq: [
      { q: 'O que “Remover todos os metadados” remove?', a: 'As informações do documento (título, autor, assunto, palavras-chave, criador, produtor e datas) e os metadados XMP incorporados. O texto, as imagens e os comentários das páginas não são afetados.' },
      { q: 'Por que editar os metadados?', a: 'Para corrigir um título errado exibido nas abas do navegador e nos resultados de busca, dar o crédito ao autor certo ou remover dados pessoais antes de compartilhar um arquivo.' },
      { q: 'Aceita texto que não seja latino?', a: 'Sim. Títulos e autores em urdu, árabe, chinês e outras escritas são salvos corretamente.' },
      { q: 'Ele abre PDFs protegidos por senha?', a: 'Não. PDFs criptografados são detectados e rejeitados com uma mensagem clara. Remova a senha antes com a nossa ferramenta Desbloquear PDF.' },
    ],
    limits: [
      'No máximo 100 MB por PDF.',
      'PDFs protegidos por senha (criptografados) não são aceitos.',
      'PDFs muito grandes ou complexos dependem da memória do seu dispositivo.',
      'Somente as propriedades do documento são alteradas. Comentários, dados de formulário e conteúdo das páginas permanecem como estão.',
    ],
  },
  'protect-pdf': {
    name: 'Proteger PDF',
    description: 'Bloqueie um PDF com senha usando criptografia AES-256.',
    metaDescription: 'Proteja um PDF com senha on-line e de graça. A criptografia AES-256 acontece no seu navegador; o arquivo e a senha nunca são enviados.',
    steps: [
      'Adicione um PDF.',
      'Digite uma senha duas vezes e escolha o que os leitores podem fazer (imprimir, copiar, editar).',
      'Proteja o arquivo e baixe a cópia criptografada.',
    ],
    faq: [
      { q: 'Qual é a força da proteção?', a: 'Os arquivos são criptografados com AES-256, o padrão de criptografia de PDF mais forte. Na prática, a segurança depende da sua senha: use uma senha longa que você não use em nenhum outro lugar.' },
      { q: 'E se eu esquecer a senha?', a: 'Ela não pode ser recuperada. Nada é armazenado nem enviado para lugar nenhum, e não existe redefinição. Guarde o arquivo original e a senha em um lugar seguro.' },
      { q: 'As opções de imprimir, copiar e editar são obrigatórias?', a: 'São solicitações que a maioria dos programas de PDF respeita, mas não são invioláveis. O que realmente protege o arquivo é a senha.' },
      { q: 'Minha senha é enviada?', a: 'Não. A criptografia acontece no seu navegador.' },
    ],
    limits: [
      'No máximo 100 MB por PDF.',
      'Senhas: até 127 caracteres padrão (letras, dígitos e símbolos).',
      'Um PDF que já tem senha precisa ser desbloqueado antes.',
      'Leitores de PDF muito antigos (de antes de cerca de 2008) podem não abrir arquivos AES-256.',
    ],
  },
  'unlock-pdf': {
    name: 'Desbloquear PDF',
    description: 'Remova a senha de um PDF ao qual você tem acesso, para que ele abra livremente.',
    metaDescription: 'Desbloqueie um PDF protegido por senha on-line e de graça. Digite a senha para salvar uma cópia sem proteção, processada no navegador e nunca enviada.',
    steps: [
      'Adicione o PDF protegido.',
      'Digite a senha, se for pedida. PDFs que apenas restringem a impressão ou a cópia não precisam de senha.',
      'Baixe a cópia desbloqueada.',
    ],
    faq: [
      { q: 'Dá para desbloquear um PDF se eu esqueci a senha?', a: 'Não. Esta ferramenta nunca adivinha nem quebra senhas. Ela remove a proteção somente quando você informa a senha correta ou quando o arquivo apenas restringe ações como a impressão.' },
      { q: 'Isso é permitido?', a: 'Use somente em arquivos que sejam seus ou que você tenha permissão para abrir. Você é responsável pelo uso que fizer do resultado.' },
      { q: 'Minha senha é enviada?', a: 'Não. Tudo acontece no seu navegador.' },
    ],
    limits: [
      'No máximo 100 MB por PDF.',
      'Aceita a proteção por senha padrão de PDF (RC4 e AES).',
      'Uma assinatura digital deixa de ser válida quando o arquivo é salvo novamente.',
      'Arquivos protegidos por certificado ou por DRM não são aceitos.',
    ],
  },
  'extract-pdf-text': {
    name: 'Extrair texto do PDF',
    description: 'Copie todo o texto selecionável de um PDF, página por página.',
    metaDescription: 'Extraia o texto de um PDF on-line e de graça. Obtenha o texto selecionável de todas as páginas ou de um intervalo, copie-o ou salve em .txt. Funciona no navegador.',
    steps: [
      'Adicione um PDF.',
      'Escolha todas as páginas ou um intervalo e se as quebras de página devem ser marcadas.',
      'Copie o texto ou baixe-o como um arquivo .txt.',
    ],
    faq: [
      { q: 'Por que o resultado está vazio?', a: 'Provavelmente o PDF é um documento digitalizado, ou seja, uma imagem de texto e não texto de verdade. Para lê-lo é preciso OCR (reconhecimento de texto), que esta ferramenta não faz.' },
      { q: 'O layout é mantido?', a: 'As linhas e os parágrafos são reconstruídos da melhor forma possível, mas colunas, tabelas e notas de rodapé podem sair em outra ordem.' },
      { q: 'Ele abre PDFs protegidos por senha?', a: 'Não. PDFs criptografados são detectados e rejeitados com uma mensagem clara. Remova a senha antes com a nossa ferramenta Desbloquear PDF.' },
    ],
    limits: [
      'No máximo 100 MB por PDF.',
      'PDFs protegidos por senha (criptografados) não são aceitos.',
      'PDFs muito grandes ou complexos dependem da memória do seu dispositivo.',
      'Somente texto de verdade é extraído; páginas digitalizadas precisam de OCR.',
      'A ordem de leitura segue o PDF e pode diferir da ordem visual em layouts complexos.',
    ],
  },
  'compress-pdf': {
    name: 'Comprimir PDF',
    description: 'Reduza o tamanho de um PDF recomprimindo as imagens, com o texto continuando selecionável.',
    metaDescription: 'Comprima PDF on-line e de graça. Recomprima as imagens incorporadas para reduzir o tamanho mantendo o texto selecionável, ou achate as páginas para o menor arquivo. Funciona no navegador.',
    steps: [
      'Adicione seu PDF.',
      'Escolha como comprimir e com qual intensidade: o padrão mantém o texto selecionável e só recomprime as imagens.',
      'Comprima, confira o tamanho economizado e baixe o resultado.',
    ],
    faq: [
      { q: 'Por que meu PDF quase não diminuiu?', a: 'O modo padrão recomprime imagens JPEG, então ajuda mais em PDFs cheios de fotos ou digitalizações. Um PDF que é quase só texto, ou cujas imagens já são pequenas, não consegue diminuir muito. A ferramenta avisa quando não conseguiu economizar nada, em vez de fingir.' },
      { q: 'A qualidade vai piorar?', a: 'As imagens perdem um pouco de detalhe em troca de tamanho; o modo Leve as mantém quase iguais e o Forte as deixa visivelmente mais suaves. Texto e gráficos vetoriais não são alterados no modo padrão. O modo "Máximo" transforma cada página em uma imagem, então o texto não pode mais ser selecionado nem pesquisado.' },
      { q: 'Meu PDF é enviado para algum lugar?', a: 'Não. O PDF é lido e reescrito pelo seu navegador. Esta ferramenta não envia o arquivo para um servidor.' },
    ],
    limits: [
      'Somente as imagens JPEG incorporadas são recomprimidas. Imagens do tipo PNG (Flate), fontes e outros conteúdos são mantidos como estão.',
      'O modo Máximo converte cada página em imagem: texto, links e campos de formulário deixam de funcionar e o arquivo não pode ser pesquisado.',
      'As cores das imagens recomprimidas podem mudar muito levemente.',
      'No máximo 100 MB por PDF. PDFs protegidos por senha precisam ser desbloqueados antes.',
    ],
  },
  'ocr-pdf': {
    name: 'OCR de PDF',
    description: 'Reconheça o texto de PDFs digitalizados (em inglês) e obtenha um PDF pesquisável.',
    metaDescription: 'Faça OCR de PDF on-line e de graça. Reconheça texto em inglês em PDFs digitalizados e baixe um PDF pesquisável ou texto simples. O OCR roda localmente no navegador.',
    steps: [
      'Adicione um PDF digitalizado.',
      'Escolha as páginas e a qualidade. Páginas que já têm texto selecionável podem ser ignoradas.',
      'Execute o OCR, revise o texto reconhecido e baixe o PDF pesquisável ou um arquivo de texto.',
    ],
    faq: [
      { q: 'Quais idiomas são aceitos?', a: 'Por enquanto, somente inglês. Textos em outros idiomas serão lidos errado. Mais idiomas poderão ser adicionados depois sem mudar o funcionamento da ferramenta.' },
      { q: 'Meu documento é enviado para um serviço de OCR?', a: 'Não. O mecanismo de reconhecimento (Tesseract, compilado para WebAssembly) e seus dados em inglês são servidos por este site e rodam dentro do seu navegador. O documento não é enviado.' },
      { q: 'Qual é a precisão?', a: 'Digitalizações limpas e retas de texto impresso, com 200 a 300 DPI, funcionam melhor. Escrita à mão, letras muito pequenas e páginas de baixo contraste ou inclinadas geram mais erros. Confira sempre os números importantes.' },
    ],
    limits: [
      'Somente inglês. A escrita à mão não é reconhecida de forma confiável.',
      'As páginas originais são mantidas exatamente como estão; uma camada de texto invisível é adicionada para que o texto possa ser pesquisado e copiado.',
      'O OCR é lento em documentos grandes (vários segundos por página). Na primeira execução, o mecanismo também é carregado (cerca de 3 MB).',
      'No máximo 100 MB por PDF. Páginas muito grandes podem ser recusadas para proteger o seu navegador.',
    ],
  },
  'sign-pdf': {
    name: 'Assinar PDF',
    description: 'Desenhe, digite ou envie uma assinatura e coloque-a nas páginas do PDF.',
    metaDescription: 'Assine um PDF on-line e de graça. Desenhe, digite ou envie sua assinatura, posicione-a em qualquer página e baixe o PDF assinado. Assinatura visual, no navegador.',
    steps: [
      'Adicione o PDF que você precisa assinar.',
      'Crie sua assinatura desenhando-a, digitando seu nome ou enviando uma imagem.',
      'Arraste a assinatura até o lugar certo da página, escolha quais páginas a recebem e baixe o PDF assinado.',
    ],
    faq: [
      { q: 'Esta é uma assinatura digital com validade jurídica?', a: 'É uma assinatura visual: uma imagem da sua assinatura colocada na página. Não é uma assinatura digital criptográfica, não tem certificado e não consegue comprovar quem assinou nem detectar alterações posteriores. Se ela será aceita depende de quem a solicita. Algumas organizações exigem serviços de assinatura eletrônica certificados.' },
      { q: 'Minha assinatura fica guardada em algum lugar?', a: 'Não. Ela é criada no seu navegador, usada apenas para este arquivo e esquecida quando você sai da página ou a recarrega.' },
      { q: 'Meu PDF é enviado para algum lugar?', a: 'Não. O PDF é lido e reescrito pelo seu navegador. Esta ferramenta não envia o arquivo para um servidor.' },
    ],
    limits: [
      'Somente assinatura visual: sem certificado, sem carimbo de data e hora e sem detecção de adulteração.',
      'A assinatura é colocada como uma imagem sobre a página; ela não preenche um campo de assinatura de formulário.',
      'No máximo 100 MB por PDF. PDFs protegidos por senha precisam ser desbloqueados antes.',
    ],
  },
  'fill-pdf-forms': {
    name: 'Preencher formulários PDF',
    description: 'Preencha as caixas de texto, as caixas de seleção e os menus de um formulário PDF preenchível.',
    metaDescription: 'Preencha formulários PDF on-line e de graça. Digite nos campos, marque caixas e escolha opções em um PDF preenchível e baixe-o editável ou achatado. No navegador.',
    steps: [
      'Adicione um formulário PDF preenchível.',
      'Preencha os campos listados abaixo do nome do arquivo. Os campos são agrupados por página.',
      'Escolha se o formulário continua editável ou será achatado e baixe o PDF preenchido.',
    ],
    faq: [
      { q: 'Meu PDF não mostra campos. Por quê?', a: 'Só é possível preencher aqui PDFs com campos de formulário de verdade. Um formulário que é apenas uma imagem ou texto simples não tem campos; use Assinar PDF para colocar uma assinatura ou a ferramenta Marca d’água em PDF para adicionar texto. Formulários feitos com XFA (alguns formulários de governo e de bancos) não são aceitos.' },
      { q: 'O que o achatamento faz?', a: 'O achatamento grava suas respostas na página e remove os campos do formulário, de modo que as respostas não possam mais ser editadas. Use-o na cópia que você envia e guarde uma cópia editável para você.' },
      { q: 'Meu PDF é enviado para algum lugar?', a: 'Não. O PDF é lido e reescrito pelo seu navegador. Esta ferramenta não envia o arquivo para um servidor.' },
    ],
    limits: [
      'O texto pode usar letras latinas, dígitos e símbolos comuns (a fonte do formulário não tem outros alfabetos).',
      'Campos de assinatura e botões são exibidos, mas não podem ser preenchidos; use Assinar PDF para assinaturas.',
      'Formulários XFA (dinâmicos) não são aceitos.',
      'No máximo 100 MB por PDF.',
    ],
  },
  'redact-pdf': {
    name: 'Tarjar PDF',
    description: 'Oculte textos e áreas de forma definitiva: as páginas tarjadas são reconstruídas como imagens.',
    metaDescription: 'Tarje um PDF on-line e de graça. Oculte nomes, números e áreas para que o texto por baixo seja realmente removido, e não apenas coberto. Funciona no navegador; nada é enviado.',
    steps: [
      'Adicione seu PDF e escolha uma página.',
      'Desenhe caixas sobre o que deve sumir ou busque palavras, e-mails e números para marcá-los automaticamente.',
      'Aplique as tarjas e baixe. Confira sempre o resultado antes de compartilhá-lo.',
    ],
    faq: [
      { q: 'O texto oculto é realmente removido?', a: 'Sim. Toda página com uma tarja é reconstruída como uma imagem com as caixas pretas pintadas, então o texto e os objetos por baixo não existem no novo arquivo. Um retângulo preto desenhado sobre o texto, como muitas ferramentas fazem, deixaria o texto selecionável. As páginas que você não tarjou são copiadas sem alterações.' },
      { q: 'Por que não consigo mais selecionar texto nas páginas tarjadas?', a: 'Porque essas páginas agora são imagens. É assim que o conteúdo por baixo é destruído. Use OCR de PDF depois se precisar de texto pesquisável; as palavras tarjadas continuam pretas.' },
      { q: 'Ele encontra todas as ocorrências automaticamente?', a: 'A busca marca as ocorrências que estão dentro de uma única linha de texto. Uma frase que o PDF divide em partes, ou um texto que faz parte de uma imagem, pode passar despercebido. Revise todas as páginas e desenhe caixas manualmente quando for preciso.' },
    ],
    limits: [
      'As páginas tarjadas viram imagens: sem texto selecionável, links nem campos de formulário nessas páginas.',
      'A busca automática funciona somente com texto selecionável e apenas dentro de um trecho de texto; páginas digitalizadas exigem caixas desenhadas à mão.',
      'As propriedades do documento (título, autor…) são removidas do resultado, a menos que você escolha mantê-las.',
      'No máximo 100 MB por PDF.',
    ],
  },
  'compare-pdf': {
    name: 'Comparar PDF',
    description: 'Veja o que mudou entre dois PDFs: diferenças de texto e páginas destacadas.',
    metaDescription: 'Compare dois arquivos PDF on-line e de graça. Veja as palavras adicionadas e removidas página por página e destaque as diferenças visuais entre versões. Processado no navegador.',
    steps: [
      'Adicione o PDF original e o PDF revisado.',
      'Compare-os: as páginas são listadas com o número de palavras adicionadas e removidas.',
      'Abra uma página para ler as alterações de texto ou mude para a visão visual para ver as áreas alteradas em vermelho.',
    ],
    faq: [
      { q: 'O que a comparação de texto mostra?', a: 'Para cada página, as palavras que foram adicionadas (verde) e removidas (vermelho) entre o documento original e o revisado, com o texto inalterado recolhido. As páginas são associadas pelo número.' },
      { q: 'E os PDFs digitalizados?', a: 'Digitalizações não têm texto selecionável, então a comparação de texto não encontra nada. Use a comparação visual ou faça antes o OCR de PDF nos dois arquivos.' },
      { q: 'Meu PDF é enviado para algum lugar?', a: 'Não. O PDF é lido e reescrito pelo seu navegador. Esta ferramenta não envia o arquivo para um servidor.' },
    ],
    limits: [
      'As páginas são comparadas pelo número: se uma página foi inserida, as seguintes aparecerão como alteradas.',
      'A comparação visual renderiza cada página na resolução da tela; diferenças minúsculas abaixo disso podem não aparecer.',
      'São comparadas até 100 páginas por arquivo. PDFs protegidos por senha precisam ser desbloqueados antes.',
    ],
  },
  'word-counter': {
    name: 'Contador de palavras',
    description: 'Conte palavras, caracteres e frases e estime o tempo de leitura enquanto digita.',
    metaDescription: 'Contador de palavras on-line e gratuito. Conte palavras, caracteres, frases e parágrafos e estime na hora o tempo de leitura e de fala.',
    steps: [
      'Digite ou cole seu texto.',
      'Veja as estatísticas em tempo real acima do editor.',
      'Use Limpar para recomeçar.',
    ],
    faq: [
      { q: 'Como as palavras são contadas?', a: 'Uma palavra é qualquer sequência de caracteres separada por espaços em branco. Palavras com hífen contam como uma e os números contam como palavras.' },
      { q: 'Como o tempo de leitura é calculado?', a: 'O tempo de leitura considera 238 palavras por minuto e o de fala, 150 palavras por minuto, médias típicas para adultos.' },
    ],
    limits: [
      'As contagens se baseiam em espaços em branco, então idiomas escritos sem espaços (como chinês ou japonês) mostrarão uma palavra por trecho de texto.',
    ],
  },
  'character-counter': {
    name: 'Contador de caracteres',
    description: 'Conte caracteres com e sem espaços e confira o texto em relação a limites de tamanho comuns.',
    metaDescription: 'Contador de caracteres on-line e gratuito. Conte caracteres com e sem espaços, bytes e linhas e confira os limites de posts, meta tags e SMS.',
    steps: [
      'Digite ou cole seu texto.',
      'Veja os totais e as barras de limite.',
      'Ajuste o texto até que ele caiba.',
    ],
    faq: [
      { q: 'Os emojis contam como um caractere?', a: 'Sim. O contador conta caracteres visíveis (clusters de grafemas), então um emoji conta como um, mesmo usando vários bytes.' },
      { q: 'Por que os limites de SMS são diferentes?', a: 'O tamanho do SMS depende da codificação. Mensagens com caracteres não latinos ou emojis têm um limite menor que a referência de 160 caracteres mostrada aqui.' },
    ],
    limits: [
      'Os limites exibidos são diretrizes comuns e mudam com o tempo; consulte a regra atual de cada plataforma.',
    ],
  },
  'case-converter': {
    name: 'Conversor de maiúsculas e minúsculas',
    description: 'Converta o texto para maiúsculas, minúsculas, título, frase, camel, snake, kebab e mais.',
    metaDescription: 'Conversor de maiúsculas e minúsculas on-line e gratuito. Mude o texto para MAIÚSCULAS, minúsculas, Título, Frase, camelCase, snake_case, kebab-case e mais.',
    steps: [
      'Cole seu texto.',
      'Escolha o formato desejado.',
      'Copie o resultado convertido.',
    ],
    faq: [
      { q: 'O formato de título trata as palavras pequenas?', a: 'Sim. Palavras curtas como "a", "of" e "the" permanecem em minúsculas, a menos que iniciem ou terminem o texto.' },
    ],
    limits: [
      'O formato de título segue regras comuns do estilo inglês e pode não servir para todos os guias de estilo.',
    ],
  },
  'remove-duplicate-lines': {
    name: 'Remover linhas duplicadas',
    description: 'Remova linhas repetidas de uma lista mantendo a ordem original.',
    metaDescription: 'Removedor de linhas duplicadas on-line e gratuito. Exclua linhas repetidas de listas, com opções para maiúsculas, espaços e linhas vazias.',
    steps: [
      'Cole sua lista, com um item por linha.',
      'Escolha se maiúsculas/minúsculas e espaços importam.',
      'Copie o resultado sem duplicatas.',
    ],
    faq: [
      { q: 'Qual cópia de uma duplicata é mantida?', a: 'A primeira ocorrência é mantida e as seguintes são removidas, então a ordem original é preservada.' },
    ],
    limits: [
      'Funciona somente com linhas inteiras.',
    ],
  },
  'text-sorter': {
    name: 'Ordenador de texto',
    description: 'Ordene linhas em ordem alfabética, numérica, por tamanho ou aleatória.',
    metaDescription: 'Ordenador de texto on-line e gratuito. Ordene linhas de A a Z, de Z a A, numericamente, por tamanho ou embaralhe-as, com ordenação natural e sem diferenciar maiúsculas.',
    steps: [
      'Cole suas linhas.',
      'Escolha um método de ordenação e as opções.',
      'Copie a lista ordenada.',
    ],
    faq: [
      { q: 'O que é ordenação natural?', a: 'A ordenação natural compara os números dentro do texto pelo valor, então "item2" vem antes de "item10".' },
    ],
    limits: [
      'A ordenação alfabética usa as regras de idioma do seu navegador.',
    ],
  },
  'text-cleaner': {
    name: 'Limpador de texto',
    description: 'Apare espaços, reduza espaços repetidos, remova linhas em branco e elimine caracteres invisíveis.',
    metaDescription: 'Limpador de texto on-line e gratuito. Remova espaços extras, linhas vazias, quebras de linha, caracteres invisíveis e aspas tipográficas de textos colados.',
    steps: [
      'Cole seu texto.',
      'Marque as opções de limpeza de que precisa.',
      'Copie o texto limpo.',
    ],
    faq: [
      { q: 'O que são caracteres invisíveis?', a: 'Espaços de largura zero, hifens condicionais e marcas de ordem de bytes costumam entrar ao copiar de páginas da web e podem quebrar códigos ou comparações.' },
    ],
    limits: [
      'As operações são aplicadas em uma ordem fixa; execute a ferramenta duas vezes se precisar de outra sequência.',
    ],
  },
  'text-diff-checker': {
    name: 'Comparador de textos',
    description: 'Compare dois textos e veja exatamente quais linhas e palavras mudaram.',
    metaDescription: 'Comparador de textos on-line e gratuito. Compare duas versões de um texto lado a lado e destaque linhas ou palavras adicionadas, removidas e alteradas.',
    steps: [
      'Cole o texto original à esquerda e o texto alterado à direita.',
      'Escolha a comparação por linha ou por palavra.',
      'Revise as alterações destacadas.',
    ],
    faq: [
      { q: 'Qual é a diferença entre o modo de linha e o de palavra?', a: 'O modo de linha marca as linhas inteiras que mudaram. O modo de palavra destaca as palavras exatas dentro do texto, o que combina com prosa.' },
    ],
    limits: [
      'Entradas muito grandes (acima de cerca de 200.000 caracteres) podem ficar lentas.',
    ],
  },
  'json-formatter': {
    name: 'Formatador de JSON',
    description: 'Formate JSON com a indentação e a ordenação de chaves que você escolher.',
    metaDescription: 'Formatador e embelezador de JSON on-line e gratuito. Formate JSON com 2 ou 4 espaços ou tabulações, ordene as chaves e veja a localização exata dos erros.',
    steps: [
      'Cole seu JSON.',
      'Escolha a indentação e a ordenação.',
      'Copie ou baixe o resultado formatado.',
    ],
    faq: [
      { q: 'Meu JSON é enviado para um servidor?', a: 'Não. A análise e a formatação acontecem no seu navegador, com o analisador de JSON integrado.' },
      { q: 'Por que meu JSON é rejeitado?', a: 'O JSON estrito não permite comentários, vírgulas finais nem aspas simples. A mensagem de erro mostra a linha e a coluna do problema.' },
    ],
    limits: [
      'Números maiores que 2^53 perdem precisão, porque o navegador os interpreta como ponto flutuante.',
    ],
  },
  'json-validator': {
    name: 'Validador de JSON',
    description: 'Verifique se um JSON é válido e veja a linha e a coluna exatas de qualquer erro.',
    metaDescription: 'Validador de JSON on-line e gratuito. Verifique a sintaxe do JSON e encontre a linha e a coluna exatas dos erros, com um resumo da estrutura.',
    steps: [
      'Cole seu JSON.',
      'Veja na hora se ele é válido.',
      'Corrija o erro indicado e verifique de novo.',
    ],
    faq: [
      { q: 'Isso valida com base em um JSON Schema?', a: 'Não. Ele verifica apenas a sintaxe: se o texto é um JSON bem formado.' },
    ],
    limits: [
      'Somente validação de sintaxe; a validação de JSON Schema não está incluída.',
    ],
  },
  'json-minifier': {
    name: 'Minificador de JSON',
    description: 'Remova os espaços em branco de um JSON para deixá-lo o mais compacto possível.',
    metaDescription: 'Minificador de JSON on-line e gratuito. Remova os espaços em branco do JSON para reduzir o tamanho dos dados e veja quantos bytes você economizou.',
    steps: [
      'Cole seu JSON.',
      'O resultado minificado aparece com o tamanho economizado.',
      'Copie ou baixe.',
    ],
    faq: [
      { q: 'Minificar altera os dados?', a: 'Não. Somente os espaços em branco sem importância são removidos; chaves, valores e ordem permanecem iguais.' },
    ],
    limits: [
      'Números maiores que 2^53 perdem precisão, porque o navegador os interpreta como ponto flutuante.',
    ],
  },
  'xml-formatter': {
    name: 'Formatador de XML',
    description: 'Formate ou minifique XML e detecte tags desencontradas ou não fechadas.',
    metaDescription: 'Formatador de XML on-line e gratuito. Embeleze ou minifique XML com indentação ajustável e detecte tags desencontradas ou não fechadas.',
    steps: [
      'Cole seu XML.',
      'Escolha Formatar ou Minificar e a indentação.',
      'Copie o resultado.',
    ],
    faq: [
      { q: 'Com que profundidade o XML é validado?', a: 'A ferramenta verifica o aninhamento das tags, tags não fechadas e comentários ou CDATA não terminados. Ela não valida com base em um esquema DTD ou XSD.' },
    ],
    limits: [
      'Somente verificações estruturais; sem validação DTD ou XSD.',
    ],
  },
  'url-encoder-decoder': {
    name: 'Codificador / decodificador de URL',
    description: 'Codifique ou decodifique em porcentagem URLs e valores de query string.',
    metaDescription: 'Codificador e decodificador de URL on-line e gratuito. Codifique texto em porcentagem para URLs ou decodifique strings codificadas, para URLs completas ou componentes isolados.',
    steps: [
      'Escolha Codificar ou Decodificar.',
      'Cole seu texto ou URL.',
      'Copie o resultado.',
    ],
    faq: [
      { q: 'Componente ou URL completa?', a: 'Use Componente para um valor isolado, como um parâmetro de consulta; ele codifica caracteres como / ? & =. Use URL completa para manter a estrutura da URL intacta.' },
    ],
    limits: [
      'A decodificação falha com sequências de porcentagem malformadas, como um % isolado.',
    ],
  },
  'html-encoder-decoder': {
    name: 'Codificador / decodificador de HTML',
    description: 'Converta caracteres especiais em entidades HTML ou decodifique entidades de volta em texto.',
    metaDescription: 'Codificador e decodificador de HTML on-line e gratuito. Converta <, >, & e aspas em entidades HTML ou decodifique entidades nomeadas e numéricas.',
    steps: [
      'Escolha Codificar ou Decodificar.',
      'Cole seu texto.',
      'Copie o resultado.',
    ],
    faq: [
      { q: 'Codificar torna seguro o que o usuário digita em HTML?', a: 'Escapar os cinco caracteres especiais torna o texto seguro dentro do conteúdo de elementos HTML e de atributos entre aspas. Isso não substitui uma biblioteca de templates ou um sanitizador adequados em outros contextos.' },
    ],
    limits: [
      'A decodificação aceita as entidades nomeadas mais comuns e todas as entidades numéricas.',
    ],
  },
  'base64-encoder-decoder': {
    name: 'Codificador / decodificador de Base64',
    description: 'Codifique texto em Base64 ou decodifique Base64 de volta em texto, com suporte total a UTF-8.',
    metaDescription: 'Codificador e decodificador de Base64 on-line e gratuito. Converta texto em Base64 e vice-versa, com suporte a UTF-8 e alfabeto opcional seguro para URLs.',
    steps: [
      'Escolha Codificar ou Decodificar.',
      'Cole seu texto.',
      'Copie o resultado.',
    ],
    faq: [
      { q: 'Base64 é criptografia?', a: 'Não. Base64 é uma codificação, não uma criptografia. Qualquer pessoa pode decodificá-lo, então nunca o use para proteger segredos.' },
      { q: 'O que é Base64 seguro para URLs?', a: 'Ele troca + e / por - e _ e descarta o preenchimento com = para que o valor possa ficar com segurança em URLs e nomes de arquivo.' },
    ],
    limits: [
      'Para dados de imagem, use Imagem para Base64 e Base64 para imagem.',
    ],
  },
  'regex-tester': {
    name: 'Testador de regex',
    description: 'Teste expressões regulares JavaScript com destaque de correspondências em tempo real e grupos de captura.',
    metaDescription: 'Testador de regex on-line e gratuito para JavaScript. Veja correspondências, grupos de captura e grupos nomeados em tempo real e confira a prévia das substituições.',
    steps: [
      'Digite um padrão e escolha as flags.',
      'Cole o texto a testar.',
      'Revise as correspondências, os grupos e a prévia da substituição.',
    ],
    faq: [
      { q: 'Qual variante de regex é usada?', a: 'Expressões regulares JavaScript (ECMAScript), como implementadas pelo seu navegador. PCRE, Python e outras variantes diferem em alguns recursos.' },
      { q: 'Por que a minha página trava com alguns padrões?', a: 'Padrões com repetição aninhada podem sofrer backtracking catastrófico. A correspondência roda em um worker em segundo plano e é interrompida após 1,5 segundo, então um padrão descontrolado não consegue travar a página, mas ainda assim evite padrões como (a+)+.' },
    ],
    limits: [
      'Somente a sintaxe de regex do JavaScript.',
      'A correspondência para após 5.000 resultados ou 1,5 segundo.',
    ],
  },
  'markdown-previewer': {
    name: 'Prévia de Markdown',
    description: 'Escreva em Markdown e veja ao lado uma prévia em tempo real, segura e sanitizada.',
    metaDescription: 'Prévia de Markdown on-line e gratuita. Escreva em Markdown no estilo GitHub, veja uma prévia em HTML sanitizado em tempo real e copie o HTML.',
    steps: [
      'Escreva ou cole o Markdown à esquerda.',
      'Veja o resultado renderizado à direita.',
      'Copie o Markdown ou o HTML gerado.',
    ],
    faq: [
      { q: 'A prévia é segura?', a: 'Sim. O HTML gerado é sanitizado com o DOMPurify antes de ser exibido, então scripts e manipuladores de eventos são removidos.' },
    ],
    limits: [
      'Markdown no estilo GitHub por meio da biblioteca marked; sem extensões de matemática ou diagramas.',
    ],
  },
  'password-generator': {
    name: 'Gerador de senhas',
    description: 'Crie senhas fortes: totalmente aleatórias ou fáceis de lembrar, baseadas em nomes e palavras.',
    metaDescription: 'Gerador de senhas gratuito: senhas totalmente aleatórias ou baseadas em nomes, como Nvidia132@Star, com números, maiúsculas e símbolos aleatórios. Funciona no navegador.',
    steps: [
      'Escolha um estilo: Nome + palavra para algo fácil de lembrar ou Totalmente aleatória para a máxima segurança.',
      'Defina o tamanho, quantas senhas você precisa e quais tipos de caracteres incluir.',
      'Copie uma senha e guarde-a em um gerenciador de senhas.',
    ],
    faq: [
      { q: 'As senhas geradas são armazenadas ou enviadas para algum lugar?', a: 'Não. As senhas são geradas no seu navegador com crypto.getRandomValues e nunca são transmitidas nem salvas.' },
      { q: 'Uma senha como Tesla2026#Tech é segura?', a: 'É melhor que uma palavra simples, mas mais fraca que um texto aleatório. Quem tenta adivinhar pode partir de listas de nomes conhecidos, então a força real vem do número de possibilidades, mostrado em bits. Use senhas baseadas em nomes para contas de baixo risco e senhas totalmente aleatórias para e-mail, banco e gerenciadores de senhas.' },
      { q: 'Por que apenas alguns símbolos?', a: 'As senhas geradas usam somente os quatro símbolos @ # $ * porque são aceitos por quase todos os sites e são fáceis de digitar em qualquer teclado.' },
      { q: 'Qual deve ser o tamanho de uma senha?', a: 'Pelo menos 16 caracteres para contas importantes. O tamanho importa mais que a complexidade.' },
    ],
    limits: [
      'As senhas baseadas em nomes são mais fáceis de lembrar, mas mais fracas que as totalmente aleatórias. A força exibida pressupõe um invasor que sabe como elas são construídas.',
      'O banco de palavras é uma lista selecionada de nomes em letras latinas; não é uma lista das senhas mais usadas.',
      'A estimativa de força se baseia nas combinações possíveis, não em bancos de dados de vazamentos.',
    ],
  },
  'uuid-generator': {
    name: 'Gerador de UUID',
    description: 'Gere UUIDs aleatórios da versão 4 em massa, com opções de formato.',
    metaDescription: 'Gerador de UUID on-line e gratuito. Crie UUIDs v4 aleatórios em massa, em maiúsculas, sem hifens ou entre chaves, com aleatoriedade criptográfica.',
    steps: [
      'Escolha quantos UUIDs e o formato.',
      'Gere.',
      'Copie a lista.',
    ],
    faq: [
      { q: 'Dois UUIDs podem colidir?', a: 'Os UUIDs da versão 4 têm 122 bits aleatórios, então a chance de colisão é desprezível na prática.' },
    ],
    limits: [
      'Somente UUIDs da versão 4 (aleatórios) são gerados.',
    ],
  },
  'timestamp-converter': {
    name: 'Conversor de timestamp',
    description: 'Converta timestamps Unix em datas legíveis e vice-versa, em qualquer fuso horário.',
    metaDescription: 'Conversor de timestamp Unix on-line e gratuito. Converta segundos ou milissegundos de epoch em datas em UTC e no horário local e datas de volta em timestamps.',
    steps: [
      'Digite um timestamp Unix ou escolha uma data.',
      'Veja o resultado em UTC, no seu fuso local e em ISO 8601.',
      'Copie qualquer valor.',
    ],
    faq: [
      { q: 'Segundos ou milissegundos?', a: 'Timestamps com 13 ou mais dígitos são tratados como milissegundos e os mais curtos como segundos. Você pode alterar isso manualmente.' },
    ],
    limits: [
      'O intervalo aceito é o das datas do JavaScript: aproximadamente os anos -271821 a 275760.',
    ],
  },
  'color-converter': {
    name: 'Conversor de cores',
    description: 'Converta cores entre HEX, RGB, HSL e HSV, com prévia em tempo real e verificação de contraste.',
    metaDescription: 'Conversor de cores on-line e gratuito. Converta valores HEX, RGB, HSL e HSV, veja a prévia da cor e confira as taxas de contraste WCAG.',
    steps: [
      'Digite uma cor em qualquer formato ou use o seletor.',
      'Veja todos os formatos serem atualizados.',
      'Copie o valor de que precisa.',
    ],
    faq: [
      { q: 'O que a verificação de contraste mostra?', a: 'Ela mostra a taxa de contraste WCAG da cor em relação a texto branco e preto, o que ajuda a escolher combinações legíveis.' },
    ],
    limits: [
      'Somente sRGB; espaços do CSS Color 4, como LAB, LCH e Display-P3, não são aceitos.',
      'Valores de transparência (alfa) são aceitos, mas ignorados.',
    ],
  },
  'qr-code-generator': {
    name: 'Gerador de QR Code',
    description: 'Crie QR Codes para links, texto, Wi-Fi, e-mail ou números de telefone, em PNG ou SVG.',
    metaDescription: 'Gerador de QR Code gratuito. Crie QR Codes para URLs, texto, Wi-Fi, e-mail e telefones e baixe-os em PNG ou SVG. Criados no seu navegador.',
    steps: [
      'Escolha o que o código deve conter e preencha os detalhes.',
      'Ajuste o tamanho, as cores e a correção de erros, se quiser.',
      'Baixe o PNG ou o SVG e teste com o celular antes de imprimir.',
    ],
    faq: [
      { q: 'Os códigos expiram?', a: 'Não. Estes são códigos estáticos: os dados ficam armazenados no próprio código, então funcionam para sempre e nada é rastreado.' },
      { q: 'Qual nível de correção de erros devo escolher?', a: 'O Médio serve para a maioria dos usos. Escolha Quartil ou Alto se o código puder sujar ou danificar, mas níveis maiores deixam o código mais denso e mais difícil de ler em tamanhos pequenos.' },
      { q: 'Posso usar os códigos comercialmente?', a: 'Sim. O padrão do QR Code é aberto, e os códigos feitos aqui não têm taxas, marcas d’água nem rastreamento da nossa parte.' },
      { q: 'Meus dados são enviados para algum lugar?', a: 'Não. O código é gerado no seu navegador, e as senhas de Wi-Fi que você digitar ficam no seu dispositivo.' },
    ],
    limits: [
      'Somente códigos estáticos: sem rastreamento de leituras e sem códigos editáveis.',
      'Textos muito longos geram um código denso e difícil de ler, então mantenha-o curto.',
      'Cores escuras sobre fundo claro, com forte contraste, são as que melhor são lidas.',
    ],
  },
};
export default tools;
