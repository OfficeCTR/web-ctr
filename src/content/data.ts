export const dataInfo = {
    email: "office@ctr.ro",
    phone: "+40 757 629 646",
    address: "Strada Turturelelor nr. 11A, București",
    vat: "18375593",
    socials: [
        {
            name: "Facebook",
            url: "https://www.facebook.com/consiliultineretului",
        },
        {
            name: "Instagram",
            url: "https://www.instagram.com/ctromania",
        },
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/company/ctr---romania-youth-council",
        },
    ],
    bank: {
        name: "Banca Comercială Română (BCR)",
        iban_ron: "unknown",
        iban_eur: "unknown",
        swift: "unknown",
        beneficiary: "Federația Consiliul Tineretului din România",
    },
    labels: {
        email: "Email",
        phone: "Telefon",
        address: "Adresă",
        title: "Informații de Contact",
        bank: "Detalii Bancare",
        bankName: "Banca",
        iban_ron: "IBAN_RON",
        iban_eur: "IBAN_EUR",
        swift: "SWIFT",
        beneficiary: "Beneficiar",
    }
};

export const organizationTypes = [
  'international',
  'national',
  'regional'
];

export const typeDisplayLabels = {
  all: 'Toate organizațiile',
  international: 'Afiliate internațional',
  national: 'Nivel național',
  regional: 'Regionale/Județene'
};

export const typeLabels = {
  international: 'Structuri neguvernamentale de tineret afiliate internațional',
  national: 'Organizații neguvernamentale de Tineret de nivel național',
  regional: 'Structuri neguvernamentale de tineret cu activitate și reprezentativitate regională sau județeană'
};

export interface Organization {
  id: number;
  name: string;
  type: string;
  region?: string;
  logo: string;
}

export const organizations: Organization[] = [
  {
    id: 1,
    name: 'AEGEE București',
    type: 'international',
    logo: '/assets/organizations/aegee_bucuresti.jpg'
  },
  {
    id: 2,
    name: 'ANSR Tineret',
    type: 'international',
    logo: '/assets/organizations/ansr_tineret.png'
  },
  {
    id: 3,
    name: 'Alianța Națională a Organizațiilor Studențești din România (ANOSR)',
    type: 'national',
    logo: '/assets/organizations/anosr.png'
  },
  {
    id: 4,
    name: 'Organizația Națională „Cercetașii României” (ONCR)',
    type: 'national',
    logo: '/assets/organizations/oncr.png'
  },
  {
    id: 5,
    name: 'Asociația MIERT',
    type: 'national',
    logo: '/assets/organizations/miert.png'
  },
  {
    id: 6,
    name: 'Federația Tinerilor Basarabeni - FTB',
    type: 'national',
    logo: '/assets/organizations/ftb.jpg'
  },
  {
    id: 7,
    name: 'Federația Tinerilor din Cluj (FTC)',
    type: 'regional',
    region: 'CLUJ',
    logo: '/assets/organizations/ftc-logo.png'
  },
  {
    id: 8,
    name: 'Fundaţia pentru Tineret a Municipiului Bucureşti (FTMB)',
    type: 'regional',
    region: 'BUCUREȘTI',
    logo: '/assets/organizations/ftmb.png'
  },
  {
    id: 9,
    name: 'Fundaţia Judeţeană pentru Tineret Dâmboviţa',
    type: 'regional',
    region: 'DÂMBOVIȚA',
    logo: '/assets/organizations/fjt_db.jpg'
  },
  {
    id: 10,
    name: 'Federația Organizațiilor Neguvernamentale de Tineret din Maramureș (FONT)',
    type: 'regional',
    region: 'MARAMUREȘ',
    logo: '/assets/organizations/font_mm.jpg'
  },
  {
    id: 11,
    name: 'Fundaţia pentru Tineret Mehedinţi',
    type: 'regional',
    region: 'MEHEDINȚI',
    logo: '/assets/organizations/fjt_mh.jpg'
  },
  {
    id: 12,
    name: 'Fundaţia Judeţeană pentru Tineret Olt',
    type: 'regional',
    region: 'OLT',
    logo: '/assets/organizations/fjt_ot.jpg'
  },
  {
    id: 13,
    name: 'Fundaţia Judeţeană pentru Tineret Vâlcea',
    type: 'regional',
    region: 'VÂLCEA',
    logo: '/assets/organizations/fjt_vl.jpg'
  },
  {
    id: 14,
    name: 'Federația Tinerilor din Bacău',
    type: 'regional',
    region: 'BACĂU',
    logo: '/assets/organizations/ft_bacau.png'
  },
  {
    id: 15,
    name: 'Federația Organizațiilor Neguvernamentale de Tineret din Iași (FONTIS)',
    type: 'regional',
    region: 'IAȘI',
    logo: '/assets/organizations/fontis.jpg'
  },
  {
    id: 16,
    name: 'Fundaţia Judeţeană pentru Tineret Botoşani',
    type: 'regional',
    region: 'BOTOȘANI',
    logo: '/assets/organizations/fjt_bt.jpg'
  },
  {
    id: 17,
    name: 'Fundația Județeană pentru Tineret Covasna ',
    type: 'regional',
    region: 'COVASNA',
    logo: '/assets/organizations/placeholder.png'
  },
  {
    id: 18,
    name: 'Fundaţia Judeţeană pentru Tineret Tulcea ',
    type: 'regional',
    region: 'TULCEA',
    logo: '/assets/organizations/fjt_tl.jpg'
  },
  {
    id: 19,
    name: 'Fundația Județeană pentru Tineret Suceava',
    type: 'regional',
    region: 'SUCEAVA',
    logo: '/assets/organizations/fjt_sv.png'
  },
  {
    id: 20,
    name: 'Fundația Județeană pentru Tineret Gorj',
    type: 'regional',
    region: 'GORJ',
    logo: '/assets/organizations/fjt_gj.png'
  },
  {
    id: 21,
    name: 'Fundația Județeană pentru Tineret Ialomița',
    type: 'regional',
    region: 'IALOMIȚA',
    logo: '/assets/organizations/fjt_il.jpg'
  },
  {
    id: 22,
    name: 'Uniunea Organizațiilor Studențești Maghiare din România (OMDSZ)',
    type: 'national',
    logo: '/assets/organizations/OMDSZ.png'
  },
  {
    id: 23,
    name: 'Federația Organizațiilor Neguvernamentale de Tineret Constanța',
    type: 'regional',
    region: 'CONSTANȚA',
    logo: '/assets/organizations/Font_CT.png'
  },
  {
    id: 24,
    name: 'Federația Tinerilor din Vaslui',
    type: 'regional',
    region: 'VASLUI',
    logo: '/assets/organizations/vaslui_intineresti.png'
  }

];

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  email: string;
  photo: string;
  department: 'leadership' | 'executive' | 'media';
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Rafael Barac Bologa',
    position: 'Președinte',
    email: 'rafael.barac@ctr.ro',
    photo: '/assets/team/Bologa.png',
    department: 'leadership'
  },
  {
    id: 2,
    name: 'Tudor Miu',
    position: 'Secretar General',
    email: 'tudor.miu@ctr.ro',
    photo: '/assets/team/Miu.png',
    department: 'leadership'
  },
  {
    id: 3,
    name: 'Cătălin Ilieș',
    position: 'Vicepreședinte',
    email: 'catalin.ilies@ctr.ro',
    photo: '/assets/team/Ilies.png',
    department: 'leadership'
  },
  {
    id: 4,
    name: 'Cristina Carciuc',
    position: 'Vicepreședinte',
    email: 'cristina.carciuc@ctr.ro',
    photo: '/assets/team/Cristina.png',
    department: 'leadership'
  }
];

export const carouselImages = [
  '/assets/carousel/carousel1.jpg',
  '/assets/carousel/carousel2.jpg',
  '/assets/carousel/carousel3.jpg',
  '/assets/carousel/carousel4.jpg',
];

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  year: number;
  location: string;
  duration: string;
  participants: string;
  impact: string;
  partners: string[];
  imageUrl: string;
  galleryImages: string[];
}

export const sampleProjects: Project[] = [
  {
    id: '26',
    title: 'Vaslui, Capitala Tineretului din România 2025',
    shortDescription: '',
    fullDescription: '',
    year: 2025,
    location: 'Vaslui, România',
    duration: '365 de zile',
    participants: '',
    impact: '',
    partners: ['', ''],
    imageUrl: '/assets/projects/placeholder.png',
    galleryImages: [
      '/assets/projects/placeholder.png',
      '/assets/projects/placeholder.png',
    ]
  },
  {
    id: '25',
    title: 'Tinerii și votul la prezidențiale',
    shortDescription: '',
    fullDescription: '',
    year: 2025,
    location: 'Online',
    duration: '',
    participants: '',
    impact: '',
    partners: ['Consiliul Național al Elevilor'],
    imageUrl: '/assets/projects/placeholder.png',
    galleryImages: [
      '/assets/projects/placeholder.png',
      '/assets/projects/placeholder.png',
    ]
  },
  {
    id: '24',
    title: 'București HPV Free City',
    shortDescription: '',
    fullDescription: '',
    year: 2025,
    location: 'București, România',
    duration: '',
    participants: '',
    impact: '',
    partners: ['', ''],
    imageUrl: '/assets/projects/placeholder.png',
    galleryImages: [
      '/assets/projects/placeholder.png',
      '/assets/projects/placeholder.png',
    ]
  },
  {
    id: '23',
    title: 'Summitul Tinerilor X - „Încotro?”',
    shortDescription: 'tbd',
    fullDescription: 'tbd',
    year: 2025,
    location: 'Vaslui, România',
    duration: '5 zile',
    participants: '240+ tineri beneficiari direcți',
    impact: '',
    partners: ['Federația Tinerilor din Cluj','Grupul PONT','Banca Comercială Română', 'Federația Tinerilor din Vaslui','Primăria Municipiului Vaslui', 'Consiliul Județean Vaslui'],
    imageUrl: '/assets/projects/placeholder.png',
    galleryImages: [
      '/assets/projects/placeholder.png',
      '/assets/projects/placeholder-2.png',
    ]
  },
  {
    id: '22',
    title: 'Ploiești, Capitala Tineretului din România 2024',
    shortDescription: '',
    fullDescription: '',
    year: 2024,
    location: 'Ploiești, România',
    duration: '',
    participants: '',
    impact: '',
    partners: ['', ''],
    imageUrl: '/assets/projects/placeholder.png',
    galleryImages: [
      '/assets/projects/placeholder.png',
      '/assets/projects/placeholder.png',
    ]
  },
  {
    id: '21',
    title: 'Maratonul de dezvoltare locală Ploiești',
    shortDescription: '',
    fullDescription: '',
    year: 2024,
    location: 'Ploiești, România',
    duration: '2 zile',
    participants: '',
    impact: '',
    partners: ['', ''],
    imageUrl: '/assets/projects/placeholder.png',
    galleryImages: [
      '/assets/projects/placeholder.png',
      '/assets/projects/placeholder.png',
    ]
  },
  {
    id: '20',
    title: 'Festivalul Democrației',
    shortDescription: '',
    fullDescription: '',
    year: 2024,
    location: 'Ploiești, România',
    duration: '',
    participants: '',
    impact: '',
    partners: [''],
    imageUrl: '/assets/projects/placeholder.png',
    galleryImages: [
      '/assets/projects/placeholder.png',
      '/assets/projects/placeholder.png',
    ]
  },
  {
    id: '19',
    title: 'Perspectiva (de pe) 9',
    shortDescription: '',
    fullDescription: '',
    year: 2024,
    location: 'Online',
    duration: '',
    participants: '',
    impact: '',
    partners: ['Alianța Națională a Organizațiilor Studențești din România'],
    imageUrl: '/assets/projects/placeholder.png',
    galleryImages: [
      '/assets/projects/placeholder.png',
      '/assets/projects/placeholder.png',
    ]
  },
  {
    id: '18',
    title: 'LCOY Romania 2024',
    shortDescription: '',
    fullDescription: '',
    year: 2024,
    location: 'București, România',
    duration: '',
    participants: '',
    impact: '',
    partners: ['', ''],
    imageUrl: '/assets/projects/placeholder.png',
    galleryImages: [
      '/assets/projects/placeholder.png',
      '/assets/projects/placeholder.png',
    ]
  },
  {
    id: '17',
    title: 'Noi știm ce vrem, dar cine își asumă?',
    shortDescription: '',
    fullDescription: '',
    year: 2024,
    location: 'Online',
    duration: '',
    participants: '',
    impact: '',
    partners: ['Alianța Națională a Organizațiilor Studențești din România', 'Consiliul Național al Elevilor'],
    imageUrl: '/assets/projects/placeholder.png',
    galleryImages: [
      '/assets/projects/placeholder.png',
      '/assets/projects/placeholder.png',
    ]
  },
  {
    id: '16',
    title: 'Summitul Tinerilor 9 - „Choices”',
    shortDescription: '',
    fullDescription: '',
    year: 2024,
    location: 'Ploiești, România',
    duration: '4 zile',
    participants: '',
    impact: '',
    partners: ['', ''],
    imageUrl: '/assets/projects/placeholder.png',
    galleryImages: [
      '/assets/projects/placeholder.png',
      '/assets/projects/placeholder.png',
    ]
  },
  {
    id: '15',
    title: 'Târgu Jiu, Capitala Tineretului din România 2023',
    shortDescription: '',
    fullDescription: '',
    year: 2023,
    location: 'Târgu Jiu, România',
    duration: '',
    participants: '',
    impact: '',
    partners: ['', ''],
    imageUrl: '/assets/projects/placeholder.png',
    galleryImages: [
      '/assets/projects/placeholder.png',
      '/assets/projects/placeholder.png',
    ]
  },
  {
    id: '14',
    title: 'Manifestul participării politice a tinerilor',
    shortDescription: '',
    fullDescription: '',
    year: 2023,
    location: 'Romania',
    duration: '',
    participants: '',
    impact: '',
    partners: ['', ''],
    imageUrl: '/assets/projects/placeholder.png',
    galleryImages: [
      '/assets/projects/placeholder.png',
      '/assets/projects/placeholder.png',
    ]
  },
  {
    id: '13',
    title: 'Maratonul de dezvoltare locală Târgu Jiu',
    shortDescription: '',
    fullDescription: '',
    year: 2023,
    location: 'Târgu Jiu, România',
    duration: '2 zile',
    participants: '',
    impact: '',
    partners: ['', ''],
    imageUrl: '/assets/projects/placeholder.png',
    galleryImages: [
      '/assets/projects/placeholder.png',
      '/assets/projects/placeholder.png',
    ]
  },
  {
    id: '12',
    title: 'Summitul Tinerilor 8.0 - „Abilitate - Agilitate”',
    shortDescription: '',
    fullDescription: '',
    year: 2023,
    location: 'Târgu Jiu, România',
    duration: '3 zile',
    participants: '? tineri lideri',
    impact: '',
    partners: ['', ''],
    imageUrl: '/assets/projects/placeholder.png',
    galleryImages: [
      '/assets/projects/placeholder.png',
      '/assets/projects/placeholder2.png',
    ]
  },
  {
    id: '11',
    title: 'Summitul Tinerilor 7 - „Rădăcini”',
    shortDescription: '',
    fullDescription: '',
    year: 2022,
    location: 'Cluj-Napoca, România',
    duration: '3 zile',
    participants: '300 tineri lideri',
    impact: '',
    partners: [''],
    imageUrl: '/assets/projects/placeholder.png',
    galleryImages: [
      '/assets/projects/placeholder.png',
      '/assets/projects/placeholder.png',
    ]
  },
  {
    id: '10',
    title: 'Proiectul Quality Employment for YOUth after COVID-19',
    shortDescription: '',
    fullDescription: '',
    year: 2021,
    location: 'Online',
    duration: '',
    participants: '',
    impact: '',
    partners: ['', ''],
    imageUrl: '/assets/projects/placeholder.png',
    galleryImages: [
      '/assets/projects/placeholder.png',
      '/assets/projects/placeholder.png',
    ]
  },
  {
    id: '9',
    title: 'Constanța, Capitala Tineretului din România 2020, 2021',
    shortDescription: '',
    fullDescription: '',
    year: 2020,
    location: 'Constanța, România',
    duration: '',
    participants: '',
    impact: '',
    partners: ['', ''],
    imageUrl: '/assets/projects/placeholder.png',
    galleryImages: [
      '/assets/projects/placeholder.png',
      '/assets/projects/placeholder.png',
    ]
  },
  {
    id: '8',
    title: 'Tineri. Voce. Reprezentare',
    shortDescription: '',
    fullDescription: '',
    year: 2020,
    location: 'București, România',
    duration: '',
    participants: '',
    impact: '',
    partners: ['Ambasada Franței în România', 'Institutul Francez din România', 'Școala Națională de Studii Politice și Administrative (SNSPA)'],
    imageUrl: '/assets/projects/placeholder.png',
    galleryImages: [
      '/assets/projects/placeholder.png',
      '/assets/projects/placeholder.png',
    ]
  },
  {
    id: '7',
    title: 'Summitul Tinerilor 2020 – ediție aniversară Online',
    shortDescription: 'Ediția 2020 a Summitului Tinerilor, desfășurată în format online, cu focus pe adaptarea la provocările globale.',
    fullDescription: 'Ediția 2020 a Summitului Tinerilor s-a desfășurat în format complet online, adaptându-se la contextul pandemic. Summitul a abordat teme precum transformarea digitală, educația la distanță, sănătatea mintală și solidaritatea în vremuri de criză, oferind tinerilor un spațiu virtual pentru dialog și colaborare.',
    year: 2020,
    location: 'Online',
    duration: '5 zile',
    participants: '500 tineri (participare online)',
    impact: 'Facilitarea schimbului de bune practici pentru adaptarea tinerilor la criza COVID-19, susținerea inițiativelor digitale ale tinerilor.',
    partners: [''],
    imageUrl: '/assets/projects/placeholder.png',
    galleryImages: [
      '/assets/projects/placeholder.png',
      '/assets/projects/placeholder-2.png',
    ]
  },
  {
    id: '6',
    title: 'Iași, Capitala Tineretului din România 2019',
    shortDescription: '',
    fullDescription: '',
    year: 2019,
    location: 'Iași, România',
    duration: '',
    participants: '',
    impact: '',
    partners: ['', ''],
    imageUrl: '/assets/projects/placeholder.png',
    galleryImages: [
      '/assets/projects/placeholder.png',
      '/assets/projects/placeholder.png',
    ]
  },
  {
    id: '5',
    title: 'European Union Youth Conference #RO2019EU',
    shortDescription: '',
    fullDescription: '',
    year: 2019,
    location: 'București, România',
    duration: '',
    participants: '',
    impact: '',
    partners: ['', ''],
    imageUrl: '/assets/projects/placeholder.png',
    galleryImages: [
      '/assets/projects/placeholder.png',
      '/assets/projects/placeholder.png',
    ]
  },
  {
    id: '4',
    title: 'Sumitul Tinerilor 4.0',
    shortDescription: '',
    fullDescription: '',
    year: 2019,
    location: 'Iași, România',
    duration: '',
    participants: '',
    impact: '',
    partners: ['', ''],
    imageUrl: '/assets/projects/placeholder.png',
    galleryImages: [
      '/assets/projects/placeholder.png',
      '/assets/projects/placeholder.png',
    ]
  },
  {
    id: '3',
    title: 'Baia Mare, Capitala Tineretului din România 2018',
    shortDescription: '',
    fullDescription: '',
    year: 2018,
    location: 'Baia Mare, România',
    duration: '',
    participants: '',
    impact: '',
    partners: ['', ''],
    imageUrl: '/assets/projects/placeholder.png',
    galleryImages: [
      '/assets/projects/placeholder.png',
      '/assets/projects/placeholder.png',
    ]
  },
  {
    id: '2',
    title: 'Bacău, Capitala Tineretului din România 2017',
    shortDescription: '',
    fullDescription: '',
    year: 2017,
    location: 'Bacău, România',
    duration: '',
    participants: '',
    impact: '',
    partners: ['', ''],
    imageUrl: '/assets/projects/placeholder.png',
    galleryImages: [
      '/assets/projects/placeholder.png',
      '/assets/projects/placeholder.png',
    ]
  },
  {
    id: '1',
    title: 'Timișoara, Prima Capitală a Tineretului din România',
    shortDescription: 'Timișoara, prima Capitală a Tineretului din România, un proiect emblematic pentru implicarea și dezvoltarea tinerilor la nivel național.',
    fullDescription: 'În 2016, Timișoara a devenit prima Capitală a Tineretului din România, marcând începutul unei inițiative naționale dedicate tinerilor. Programul a inclus peste 100 de evenimente și proiecte pe parcursul unui an, toate concepute și implementate de și pentru tineri, transformând orașul într-un hub al activităților pentru tineret. Această inițiativă a pus bazele unui model care a continuat să fie implementat anual în diferite orașe din România.',
    year: 2016,
    location: 'Timișoara, România',
    duration: '366 zile',
    participants: '10,000+ tineri beneficiari direcți',
    impact: 'Crearea unui model național pentru implicarea tinerilor în dezvoltarea comunităților, stimularea participării civice a tinerilor și dezvoltarea de politici publice pentru tineret la nivel local și național.',
    partners: [''],
    imageUrl: '/assets/projects/placeholder.png',
    galleryImages: [
      '/assets/projects/placeholder.png',
      '/assets/projects/placeholder-2.png',
    ]
  }
];

export const opportunityCategories = [
  { id: 'all', label: 'Toate' },
  { id: 'for_youth', label: 'Pentru tineri' },
  { id: 'for_ngos', label: 'Pentru ONG-uri' },
  { id: 'for_communities', label: 'Pentru comunități' },
  { id: 'other', label: 'Altele' },
];

export default dataInfo;

