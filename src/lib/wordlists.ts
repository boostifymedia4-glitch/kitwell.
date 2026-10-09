/**
 * Curated words for the name-based password generator, grouped by category.
 * Every entry is a single token of 3-12 Latin letters (no spaces, accents or punctuation) so it types
 * the same on every keyboard. Names are shown the way they are commonly written in English.
 */
export interface WordCategory {
  id: string;
  label: string;
  words: string[];
}

/** Splits the word blocks below, dropping anything that is not 3-12 plain letters and removing duplicates. */
const list = (s: string) => [...new Set(s.split(/\s+/).filter((w) => /^[A-Za-z]{3,12}$/.test(w)))];

export const WORD_CATEGORIES: WordCategory[] = [
  {
    id: 'names',
    label: 'First names',
    words: list(`
      Adam Adrian Aiden Alan Albert Alex Alexander Alice Alicia Amber Amelia Amy Andrew Angela Anna Anthony Arthur Ashley
      Austin Barbara Benjamin Bella Brandon Brian Bruno Caleb Camila Carlos Carol Caroline Charles Charlotte Chloe Chris
      Claire Daniel David Diana Diego Dominic Dylan Edward Eleanor Elena Elijah Elizabeth Ella Emily Emma Eric Ethan Eva
      Evelyn Felix Fiona Frank Gabriel George Grace Hannah Harry Hazel Henry Hugo Ian Isaac Isabella Ivan Jack Jacob
      James Jane Jason Jasmine Jennifer Jessica John Jonathan Joseph Joshua Julia Julian Karen Kevin Kyle Laura Lauren
      Leo Leon Liam Lily Linda Lucas Lucy Luke Madison Marco Maria Mark Martin Mary Mason Matthew Max Maya Michael
      Michelle Mia Nathan Nicholas Nina Noah Nora Oliver Olivia Oscar Owen Patrick Paul Peter Philip Rachel Rebecca
      Richard Robert Roman Rose Ruby Ryan Samuel Sarah Scott Sebastian Sofia Sophia Stella Steven Susan Thomas Tim
      Tyler Victor Victoria Vincent Violet Walter William Zachary Zoe Ahmed Ali Amir Aisha Ayaan Bilal Fatima Hamza
      Hassan Hussain Imran Layla Maryam Omar Rayyan Sana Tariq Usman Yusuf Zain Zara Akira Hana Hiro Kenji Mei Sakura
      Yuki Arjun Priya Rahul Rohan Anika Dev Ravi Sanjay Aditi Anya Kabir Neha Vikram Mateo Santiago Valentina Lucia
      Pablo Javier Elena Mario Luigi Giulia Matteo Chiara Lorenzo Stefano Anton Klaus Lena Sven Ingrid Nils Freya
      Pierre Louis Camille Claude Margot Etienne Jules Oskar Lars Greta Mila Nikolai Dmitri Sasha Olga Tomas Petra
    `),
  },
  {
    id: 'ceos',
    label: 'CEOs and business leaders',
    words: list(`
      Musk Bezos Gates Jobs Zuckerberg Nadella Pichai Cook Huang Buffett Dimon Page Brin Ellison Dell Branson Winfrey
      Bloomberg Dorsey Altman Benioff Jassy Arnault Ambani Adani Tata Mittal Slim Dangote Ford Rockefeller Carnegie
      Vanderbilt Morgan Walton Disney Iger Welch Barra Fiorina Mayer Sandberg Whitman Nooyi Khosrowshahi Chesky Kalanick
      Spiegel Hastings Ek Zhang Ren Lei Son Kim Lee Chung Lin Hsieh Nilekani Premji Murthy Poonawalla Birla Godrej
      Munger Dalio Soros Icahn Ackman Schwarzman Fink Bezos Koch Gelsinger Krzanich Ballmer Chambers Hurd Catz
      Mulally Marchionne Ghosn Tavares Zetsche Diess Knudstorp Lundgren Schultz Bezos Nardelli Isaacson Chesky
    `),
  },
  {
    id: 'companies',
    label: 'Companies and brands',
    words: list(`
      Nvidia Tesla Google Apple Amazon Microsoft Samsung Sony Toyota Honda Nissan Mazda Suzuki Hyundai Kia Ford Chevrolet
      Dodge Jeep Tesla Audi Bmw Mercedes Porsche Ferrari Lamborghini Maserati Bugatti Volvo Volkswagen Renault Peugeot
      Nike Adidas Puma Reebok Asics Fila Gucci Prada Chanel Dior Versace Armani Zara Gap Levis Rolex Casio Seiko
      Citizen Intel Amd Qualcomm Cisco Oracle Dell Lenovo Asus Acer Huawei Xiaomi Oppo Vivo Oneplus Nokia Motorola
      Ericsson Siemens Philips Bosch Panasonic Toshiba Hitachi Canon Nikon Fujifilm Olympus Logitech Razer Corsair
      Adobe Netflix Spotify Youtube Facebook Instagram Whatsapp Twitter Linkedin Snapchat Pinterest Reddit Tiktok
      Uber Airbnb Paypal Stripe Visa Mastercard Shopify Salesforce Slack Zoom Dropbox Atlassian Github Gitlab
      Cloudflare Twitch Discord Telegram Signal Disney Pixar Marvel Lego Hasbro Mattel Nestle Unilever Pepsi Cocacola
      Fanta Sprite Redbull Heineken Cadbury Nutella Oreo Lays Pringles Kelloggs Walmart Costco Target Ikea Tesco
      Aldi Lidl Carrefour Daraz Alibaba Aliexpress Flipkart Rakuten Ebay Etsy Boeing Airbus Emirates Qatar Etihad
      Lufthansa Ryanair Delta Fedex Dhl Maersk Shell Aramco Chevron Bp Exxon Total Visa Amex Hsbc Barclays Santander
      Binance Coinbase Kraken Openai Anthropic Deepmind Tencent Baidu Bytedance Grab Zomato Swiggy Careem Foodpanda
    `),
  },
  {
    id: 'restaurants',
    label: 'Restaurants and food brands',
    words: list(`
      Mcdonalds Subway Starbucks Kfc Dominos Pizzahut Burgerking Wendys Tacobell Nandos Dunkin Chipotle Popeyes
      Hardees Chilis Applebees Dennys Ihop Fiveguys Shakeshack Innout Panera Arbys Sonic Culvers Whataburger Krispy
      Baskin Haagen Cinnabon Pretzel Tims Costa Pret Greggs Wagamama Itsu Yosushi Prezzo Zizzi Carluccios Harvester
      Kababjees Savour Bundu Hardees Broadway Student Biryani Tikka Kebab Shawarma Falafel Sushi Ramen Burrito Taco
      Pasta Pizza Burger Waffle Pancake Brioche Croissant Espresso Mocha Latte Cappuccino Doner Paratha Naan Samosa
      Nobu Noma Eleven Maximo Osteria Trattoria Bistro Brasserie Cantina Taverna Tandoori Masala Curry Teriyaki
    `),
  },
  {
    id: 'hospitals',
    label: 'Hospitals and medical brands',
    words: list(`
      Mayo Cleveland Hopkins Mayoclinic Mgh Cedars Kaiser Mountsinai Langone Stanford Duke Emory Vanderbilt Charite
      Karolinska Guys Barts Addenbrookes Bumrungrad Apollo Fortis Medanta Narayana Manipal Aiims Shifa Agakhan
      Liaquat Jinnah Mayo Dow Shaukat Khanum Indus Combined Evercare Hameed Latif Aman Zia Ziauddin Dubai Cleveland
      Mediclinic Medicover Quironsalud Vithas Hirslanden Samitivej Asan Severance Seoul Peking Union Tokyo Keio Pfizer
      Moderna Novartis Roche Bayer Merck Abbott Sanofi Gsk Astrazeneca Johnson Medtronic Philips Siemens Panadol
      Aspirin Ibuprofen Dettol Vicks Colgate Listerine Pampers Johnsons Nivea Dove Lifebuoy Sunsilk Pantene
    `),
  },
  {
    id: 'footballers',
    label: 'Footballers',
    words: list(`
      Messi Ronaldo Neymar Mbappe Haaland Salah Kane Modric Benzema Lewandowski Pele Maradona Zidane Beckham Ronaldinho
      Xavi Iniesta Pirlo Kaka Henry Drogba Rooney Bellingham Vinicius Saka Foden Yamal Pedri Gavi Debruyne Kroos
      Ramos Casillas Buffon Neuer Cantona Zlatan Ibrahimovic Son Griezmann Rashford Mane Etoo Cruyff Platini Baggio
      Maldini Totti Del Piero Gerrard Lampard Terry Scholes Giggs Keane Owen Shearer Bale Suarez Cavani Falcao Dybala
      Kante Pogba Varane Hazard Courtois Alisson Ederson Rodri Odegaard Rice Walker Stones Maguire Trippier Alexander
      Cafu Roberto Rivaldo Romario Zico Socrates Garrincha Eusebio Figo Raul Hierro Puyol Pique Alba Busquets Villa
      Torres Mata Silva Aguero Tevez Higuain Mascherano Zanetti Batistuta Crespo Riquelme Forlan Valderrama Asprilla
      Ozil Klose Muller Gotze Schweinsteiger Lahm Ballack Matthaus Beckenbauer Rummenigge Gullit Rijkaard Bergkamp
      Seedorf Robben Sneijder Dest Okocha Kanu Yaya Toure Essien Weah Yashin Shevchenko Nedved Stoichkov Hagi Suker
      Pulisic Davies Alphonso Lukaku Mahrez Hakimi Ziyech Osimhen Ronaldo Ali Daei Sunil Chhetri Honda Nakata Kagawa
    `),
  },
  {
    id: 'cricketers',
    label: 'Cricketers',
    words: list(`
      Kohli Dhoni Tendulkar Babar Afridi Wasim Waqar Imran Miandad Inzamam Akram Younis Sangakkara Jayawardene
      Muralitharan Warne Ponting Mcgrath Gilchrist Smith Warner Root Stokes Anderson Broad Flintoff Lara Gayle
      Richards Bumrah Rohit Ashwin Jadeja Pant Gill Rizwan Shaheen Rabada Devilliers Kallis Steyn Williamson Boult
      Cummins Starc Hazlewood Kapil Gavaskar Dravid Ganguly Sehwag Yuvraj Malinga Shakib Rashid Pollard Bravo Narine
      Hayden Langer Waugh Border Lillee Marsh Clarke Hussey Haddin Johnson Lee Gillespie Symonds Bevan Jones
      Botham Gower Gooch Atherton Vaughan Strauss Cook Bell Pietersen Swann Bairstow Buttler Archer Wood Moeen
      Hadlee Crowe Fleming Vettori Taylor Southee Latham Conway Jamieson Akhtar Saeed Anwar Yousuf Hafeez Malik
      Razzaq Gul Ajmal Amir Asif Azam Fakhar Haris Nawaz Naseem Hasan Zaman Shadab Iftikhar Hussain Tamim Mushfiqur
      Mashrafe Mahmudullah Mustafizur Sachin Rahul Virat Hardik Shami Siraj Kuldeep Chahal Rahane Pujara Dhawan Raina
      Zaheer Harbhajan Kumble Srinath Azharuddin Vengsarkar Pataudi Sobers Hall Holding Marshall Ambrose Walsh Garner
      Hooper Chanderpaul Sarwan Smits Pollock Donald Cronje Klusener Gibbs Amla Philander Morkel Faf Markram
    `),
  },
  {
    id: 'famous',
    label: 'Famous people',
    words: list(`
      Einstein Newton Curie Darwin Galileo Hawking Edison Faraday Maxwell Bohr Feynman Turing Lovelace Pasteur Fleming
      Tesla Mandela Gandhi Jinnah Lincoln Churchill Picasso Mozart Beethoven Bach Chopin Vivaldi Shakespeare Dickens
      Tolkien Orwell Twain Hemingway Austen Tagore Rumi Iqbal Faiz Ghalib Leonardo Michelangelo Raphael Monet Vangogh
      Dali Rembrandt Armstrong Aldrin Gagarin Sagan Attenborough Ali Jordan Bolt Federer Nadal Djokovic Serena Tyson
      Lebron Kobe Curry Brady Chaplin Monroe Hepburn Presley Jackson Sinatra Marley Lennon Hendrix Bowie Mercury
      Madonna Prince Dylan Cash Elvis Bruce Springsteen Bono Adele Beyonce Rihanna Shakira Eminem Drake Taylor
      Swift Sheeran Bieber Grande Gaga Spielberg Hitchcock Kubrick Scorsese Nolan Cameron Tarantino Hanks Cruise
      Pitt Depp Dicaprio Streep Roberts Jolie Khan Bachchan Kapoor Chan Lee Bruce Hawking Aristotle Plato Socrates
      Archimedes Pythagoras Euclid Copernicus Kepler Descartes Kant Nietzsche Marx Freud Jung Confucius Buddha
      Messiah Cleopatra Caesar Napoleon Alexander Genghis Saladin Tipu Akbar Babur Ashoka Bolivar Garibaldi
    `),
  },
  {
    id: 'youtubers',
    label: 'YouTubers and creators',
    words: list(`
      Mrbeast Pewdiepie Markiplier Dream Ninja Shroud Pokimane Ksi Logan Mkbhd Linus Veritasium Vsauce Kurzgesagt
      Cocomelon Dudeperfect Zoella Jacksepticeye Dantdm Stampy Thinknoodles Lazarbeam Technoblade Sapnap Ishowspeed
      Sidemen Unboxtherapy Ijustine Duckybhai Carryminati Bhuvan Ranveer Rajab Junaid Irfan Casey Neistat Emma
      Chamberlain Mumbo Grian Tommyinnit Wilbur Quackity Karl Bad Skeppy Antfrost Preston Unspeakable Dantdm Aphmau
      Ssundee Vanoss Cryaotic Pyrocynical Jschlatt Ludwig Valkyrae Corpse Sykkuno Disguised Toast Rubius Vegetta
      Auronplay Ibai Xokas Willyrex Luzu Dalas Fernanfloo Germangarmendia Whindersson Felipe Neto Kondzilla Enaldinho
      Tanmay Samay Triggered Insaan Elvish Fukra Mythpat Techburner Dhruv Rathee Sourav Joshi Amit Bhadana Ashish
      Chanchlani Harsh Beniwal Slayy Point Tseries Zeemusic Setindia Mashable Buzzfeed Vice Vox Ted Crashcourse
      Scishow Minutephysics Numberphile Computerphile Tomscott Mark Rober Smartereveryday Peterson Joerogan
    `),
  },
  {
    id: 'public',
    label: 'Public figures and leaders',
    words: list(`
      Obama Biden Trump Clinton Bush Reagan Kennedy Roosevelt Washington Jefferson Lincoln Merkel Macron Trudeau Modi
      Erdogan Zelensky Putin Xi Mandela Thatcher Blair Cameron Johnson Sunak Starmer Attlee Gandhi Nehru Bhutto
      Sharif Khan Jinnah Zia Mujib Hasina Rajapaksa Lee Abe Koizumi Moon Park Mahathir Anwar Lee Kuan Yew Suharto
      Sukarno Aquino Duterte Marcos Albanese Morrison Turnbull Ardern Key Mulroney Chretien Harper Pearson Castro
      Guevara Chavez Lula Bolsonaro Peron Allende Bachelet Fox Calderon Sheinbaum Kirchner Merkel Schroeder Kohl
      Brandt Adenauer Gaulle Mitterrand Chirac Sarkozy Hollande Berlusconi Draghi Meloni Sanchez Rajoy Zapatero
      Mubarak Sadat Nasser Arafat Rabin Netanyahu Hussein Gaddafi Mugabe Kenyatta Nkrumah Kagame Mbeki Zuma
      Ramaphosa Buhari Obasanjo Selassie Sankara Lumumba Dalai Malala Greta Thunberg Teresa Pope Francis Tutu
      Kofi Annan Guterres Ban Moon Albright Rice Powell Kissinger Gorbachev Yeltsin Lenin Stalin Tito
    `),
  },
  {
    id: 'cities',
    label: 'Cities',
    words: list(`
      London Paris Tokyo Karachi Lahore Islamabad Dubai Berlin Madrid Rome Milan Venice Florence Naples Lisbon Porto
      Vienna Prague Warsaw Budapest Athens Istanbul Ankara Moscow Kyiv Oslo Stockholm Helsinki Copenhagen Dublin
      Edinburgh Glasgow Manchester Liverpool Leeds Bristol Brighton Oxford Cambridge Amsterdam Rotterdam Brussels
      Antwerp Geneva Zurich Lyon Marseille Nice Barcelona Valencia Seville Munich Hamburg Cologne Frankfurt
      Newyork Chicago Boston Seattle Denver Austin Dallas Houston Miami Atlanta Phoenix Portland Detroit Nashville
      Vegas Orlando Toronto Montreal Vancouver Ottawa Calgary Mexico Havana Lima Bogota Quito Santiago Caracas
      Rio Paulo Brasilia Salvador Mumbai Delhi Bangalore Chennai Kolkata Hyderabad Pune Jaipur Dhaka Colombo Kathmandu
      Kabul Tehran Baghdad Riyadh Jeddah Mecca Medina Doha Muscat Kuwait Amman Beirut Cairo Alexandria Casablanca
      Tunis Algiers Lagos Nairobi Accra Dakar Kampala Durban Capetown Joburg Bangkok Hanoi Saigon Jakarta Manila
      Singapore Kuala Seoul Busan Osaka Kyoto Nagoya Beijing Shanghai Shenzhen Guangzhou Taipei Sydney Melbourne
      Brisbane Perth Auckland Wellington Peshawar Quetta Multan Faisalabad Sialkot Gwadar Murree Hunza Skardu
    `),
  },
  {
    id: 'countries',
    label: 'Countries',
    words: list(`
      Pakistan India China Japan Korea Russia Brazil Canada Mexico Spain France Germany Italy England Scotland Wales
      Ireland Portugal Greece Turkey Egypt Morocco Algeria Tunisia Libya Sudan Ethiopia Kenya Uganda Tanzania Nigeria
      Ghana Senegal Cameroon Angola Zambia Zimbabwe Namibia Botswana Mozambique Madagascar Australia Zealand Fiji
      Samoa Indonesia Malaysia Singapore Thailand Vietnam Cambodia Laos Myanmar Philippines Nepal Bhutan Bangladesh
      Srilanka Maldives Afghanistan Iran Iraq Syria Jordan Lebanon Israel Palestine Yemen Oman Qatar Bahrain Kuwait
      Kazakhstan Uzbekistan Turkmenistan Tajikistan Kyrgyzstan Azerbaijan Armenia Georgia Ukraine Belarus Poland
      Czechia Slovakia Hungary Romania Bulgaria Serbia Croatia Slovenia Bosnia Albania Macedonia Montenegro Kosovo
      Austria Switzerland Belgium Netherlands Denmark Norway Sweden Finland Iceland Estonia Latvia Lithuania Cyprus
      Malta Argentina Chile Peru Colombia Venezuela Ecuador Bolivia Paraguay Uruguay Cuba Jamaica Haiti Panama
      Honduras Guatemala Nicaragua Barbados Bahamas Mongolia Taiwan Hongkong Macau Brunei Somalia Rwanda Mali Niger
    `),
  },
  {
    id: 'tech',
    label: 'Technology',
    words: list(`
      Python Linux Docker Kernel Pixel Quantum Cyber Matrix Binary Router Server Cloud Cipher Vector Neural Laser
      Robot Drone React Rust Swift Kotlin Java Unity Unreal Blender Github Android Chrome Firefox Safari Ubuntu Debian
      Fedora Arch Windows Macos Terminal Compiler Algorithm Database Firewall Network Gateway Protocol Packet Socket
      Browser Pixelate Backend Frontend Fullstack Devops Kubernetes Terraform Ansible Jenkins Nginx Apache Redis
      Mongo Postgres Mysql Sqlite Graphql Webpack Vite Node Deno Bun Angular Svelte Vue Laravel Django Flask Rails
      Spring Gradle Maven Docker Hadoop Spark Kafka Tensor Pytorch Keras Scikit Pandas Numpy Jupyter Notebook
      Gadget Hardware Software Firmware Silicon Circuit Processor Graphics Memory Storage Bandwidth Fiber Wireless
      Bluetooth Satellite Antenna Radar Sensor Hologram Virtual Augmented Metaverse Blockchain Crypto Token Wallet
      Bitcoin Ethereum Satoshi Pixelart Mainframe Supercomputer Datacenter Hotspot Gigabyte Terabyte Megabyte
      Overclock Motherboard Keyboard Trackpad Monitor Webcam Joystick Console Playstation Xbox Nintendo Arcade
    `),
  },
];

/** Short words added after the main word, e.g. Nvidia132@Star. */
export const SUFFIX_WORDS: string[] = list(`
  Star Tech Goal Pro Max Prime Alpha Beta Nova Elite Gold Silver Fire Wave Hero King Queen Titan Zone Edge Peak
  Sky Moon Sun Blaze Storm Rock Stone Steel Iron Swift Bold Brave Wild Smart Quick Super Mega Ultra Hyper Turbo
  Rocket Comet Orbit Cosmos Galaxy Planet Falcon Eagle Hawk Wolf Tiger Lion Fox Bear Shark Dragon Phoenix Viking
  Ninja Pirate Knight Wizard Ranger Pilot Racer Champ Legend Master Genius Boss Chief Captain Ace Crown Spark
  Pulse Flash Bolt Thunder Frost Ember Shadow Ghost Mirror Crystal Diamond Ruby Jade Amber Ivory River Ocean
  Forest Desert Island Canyon Summit Harbor Bridge Tower Castle Garden Meadow Valley Delta Sigma Omega Zenith
`).filter((w) => w.length >= 3 && w.length <= 8);

export const ALL_WORDS = (ids?: string[]): string[] => {
  const pick = ids && ids.length ? WORD_CATEGORIES.filter((c) => ids.includes(c.id)) : WORD_CATEGORIES;
  return [...new Set(pick.flatMap((c) => c.words))];
};
