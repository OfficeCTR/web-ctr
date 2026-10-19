import { collection, config, fields, singleton } from "@keystatic/core";

const cloudProject = process.env.NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT;
const useCloud = process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "cloud";

if (useCloud && !cloudProject) {
  throw new Error(
    'Missing NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT (format "team/project"). Add it to .env locally and to the Vercel environment variables.',
  );
}

const counties = [
  "Alba",
  "Arad",
  "Argeș",
  "Bacău",
  "Bihor",
  "Bistrița-Năsăud",
  "Botoșani",
  "Brașov",
  "Brăila",
  "București",
  "Buzău",
  "Caraș-Severin",
  "Cluj",
  "Constanța",
  "Covasna",
  "Călărași",
  "Dolj",
  "Dâmbovița",
  "Galați",
  "Giurgiu",
  "Gorj",
  "Harghita",
  "Hunedoara",
  "Ialomița",
  "Iași",
  "Ilfov",
  "Maramureș",
  "Mehedinți",
  "Mureș",
  "Neamț",
  "Olt",
  "Prahova",
  "Satu Mare",
  "Sibiu",
  "Suceava",
  "Sălaj",
  "Teleorman",
  "Timiș",
  "Tulcea",
  "Vaslui",
  "Vrancea",
  "Vâlcea",
];

const uploads = (folder: string) => ({
  directory: `public/uploads/${folder}`,
  publicPath: `/uploads/${folder}/`,
});

const linkHint =
  "Poate fi o pagină de pe site (ex: /proiecte, /blog/numele-articolului) sau un link extern complet (ex: https://exemplu.ro).";

export default config({
  storage: useCloud ? { kind: "cloud" } : { kind: "local" },
  cloud: { project: cloudProject ?? "" },

  ui: {
    brand: { name: "CTR · Administrare site" },
    navigation: {
      "📰 Conținut": ["articles", "opportunities", "projects"],
      "👥 Organizație": ["team", "organizations"],
      "🏠 Pagini": ["homepage", "archive", "settings"],
    },
  },

  collections: {
    articles: collection({
      label: "Articole (blog)",
      slugField: "title",
      path: "content/articles/*",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["publishedAt", "category"],
      previewUrl: "/blog/{slug}",
      schema: {
        title: fields.slug({
          name: { label: "Titlul articolului", validation: { isRequired: true } },
          slug: {
            label: "Adresa articolului (URL)",
            description: "Se completează automat din titlu. Apare în link: ctr.ro/blog/adresa-articolului",
          },
        }),
        publishedAt: fields.date({
          label: "Data publicării",
          defaultValue: { kind: "today" },
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: "Categorie",
          options: [
            { label: "Poziții CTR", value: "Poziții CTR" },
            { label: "Proiecte", value: "Proiecte" },
            { label: "Evenimente CTR", value: "Evenimente CTR" },
            { label: "Internațional", value: "Internațional" },
            { label: "Comunicate", value: "Comunicate" },
            { label: "Oportunități", value: "Oportunități" },
          ],
          defaultValue: "Evenimente CTR",
        }),
        excerpt: fields.text({
          label: "Rezumat scurt",
          description: "1-2 fraze care apar pe cardul articolului și în Google.",
          multiline: true,
          validation: { isRequired: true, length: { max: 500 } },
        }),
        coverImage: fields.image({
          label: "Imagine de copertă",
          description: "Format orizontal, ideal 1600 × 900 px (JPG sau PNG).",
          ...uploads("articles"),
          validation: { isRequired: true },
        }),
        authorName: fields.text({ label: "Autor", defaultValue: "Echipa CTR" }),
        authorAvatar: fields.image({
          label: "Poza autorului (opțional)",
          description: "Dacă rămâne gol, se folosește logo-ul CTR.",
          ...uploads("articles"),
        }),
        content: fields.markdoc({
          label: "Conținutul articolului",
          extension: "md",
          options: {
            image: uploads("articles"),
            heading: [2, 3],
            codeBlock: false,
            code: false,
          },
        }),
      },
    }),

    opportunities: collection({
      label: "Oportunități",
      slugField: "title",
      path: "content/opportunities/*",
      format: { data: "yaml" },
      columns: ["deadline", "isActive"],
      previewUrl: "/oportunitati",
      schema: {
        title: fields.slug({
          name: { label: "Titlul oportunității", validation: { isRequired: true } },
          slug: { label: "Identificator (se completează automat)" },
        }),
        isActive: fields.checkbox({
          label: "Activă",
          description: "Debifează când oportunitatea a expirat — va apărea ca „Expirat”.",
          defaultValue: true,
        }),
        category: fields.select({
          label: "Pentru cine este?",
          options: [
            { label: "Pentru tineri", value: "for_youth" },
            { label: "Pentru ONG-uri", value: "for_ngos" },
            { label: "Pentru comunități", value: "for_communities" },
            { label: "Altele", value: "other" },
          ],
          defaultValue: "for_youth",
        }),
        organization: fields.text({ label: "Organizația care oferă oportunitatea" }),
        location: fields.text({ label: "Locație", description: "Ex: București, Online, Cluj-Napoca" }),
        deadline: fields.date({ label: "Termen limită" }),
        shortDescription: fields.text({
          label: "Descriere scurtă",
          description: "Apare pe card (2-3 fraze).",
          multiline: true,
          validation: { isRequired: true },
        }),
        fullDescription: fields.text({ label: "Descriere completă", multiline: true }),
        requirements: fields.text({ label: "Cerințe (opțional)", multiline: true }),
        benefits: fields.text({ label: "Beneficii (opțional)", multiline: true }),
        link: fields.url({
          label: "Link pentru aplicare (opțional)",
          description: "Link complet, ex: https://exemplu.ro/aplica",
        }),
        image: fields.image({
          label: "Imagine (opțional)",
          description: "Format orizontal.",
          ...uploads("opportunities"),
        }),
      },
    }),

    projects: collection({
      label: "Proiecte",
      slugField: "title",
      path: "content/projects/*",
      format: { data: "yaml" },
      columns: ["year", "location"],
      previewUrl: "/proiecte",
      schema: {
        title: fields.slug({
          name: { label: "Numele proiectului", validation: { isRequired: true } },
          slug: { label: "Identificator (se completează automat)" },
        }),
        year: fields.integer({
          label: "Anul",
          validation: { isRequired: true, min: 2000, max: 2100 },
          defaultValue: new Date().getFullYear(),
        }),
        location: fields.text({ label: "Locație" }),
        duration: fields.text({ label: "Durată (opțional)", description: "Ex: 3 zile, 365 de zile" }),
        participants: fields.text({ label: "Participanți (opțional)", description: "Ex: 300 de tineri" }),
        shortDescription: fields.text({ label: "Descriere scurtă (apare pe card)", multiline: true }),
        fullDescription: fields.text({ label: "Descriere completă", multiline: true }),
        impact: fields.text({ label: "Impact (opțional)", multiline: true }),
        partners: fields.array(fields.text({ label: "Partener" }), {
          label: "Parteneri",
          itemLabel: (p) => p.value || "Partener nou",
        }),
        image: fields.image({
          label: "Imagine principală",
          description: "Dacă lipsește, cardul primește automat o copertă colorată cu numele proiectului.",
          ...uploads("projects"),
        }),
        gallery: fields.array(fields.image({ label: "Fotografie", ...uploads("projects") }), {
          label: "Galerie foto (opțional)",
          itemLabel: (p) => (p.value ? "Fotografie" : "Fotografie nouă"),
        }),
      },
    }),

    team: collection({
      label: "Echipa",
      slugField: "name",
      path: "content/team/*",
      format: { data: "yaml" },
      columns: ["position", "order"],
      previewUrl: "/despre",
      schema: {
        name: fields.slug({
          name: { label: "Nume și prenume", validation: { isRequired: true } },
          slug: { label: "Identificator (se completează automat)" },
        }),
        position: fields.text({ label: "Funcția", validation: { isRequired: true } }),
        email: fields.text({ label: "Email (opțional)" }),
        department: fields.select({
          label: "Departament",
          options: [
            { label: "Conducere", value: "leadership" },
            { label: "Executiv", value: "executive" },
            { label: "Media", value: "media" },
          ],
          defaultValue: "leadership",
        }),
        photo: fields.image({
          label: "Fotografie",
          description: "Portret vertical, ideal 800 × 1000 px.",
          ...uploads("team"),
          validation: { isRequired: true },
        }),
        order: fields.integer({
          label: "Ordine de afișare",
          description: "Numerele mai mici apar primele (1, 2, 3...).",
          defaultValue: 10,
        }),
      },
    }),

    organizations: collection({
      label: "Organizații membre",
      slugField: "name",
      path: "content/organizations/*",
      format: { data: "yaml" },
      columns: ["type", "region"],
      previewUrl: "/membri",
      schema: {
        name: fields.slug({
          name: { label: "Numele organizației", validation: { isRequired: true } },
          slug: { label: "Identificator (se completează automat)" },
        }),
        type: fields.select({
          label: "Tip",
          options: [
            { label: "Afiliată internațional", value: "international" },
            { label: "Nivel național", value: "national" },
            { label: "Regională / Județeană", value: "regional" },
          ],
          defaultValue: "regional",
        }),
        region: fields.select({
          label: "Județ",
          description: "Pentru organizațiile regionale — apare pe cardul organizației de pe pagina Membri.",
          options: [{ label: "— Fără județ —", value: "" }, ...counties.map((c) => ({ label: c, value: c }))],
          defaultValue: "",
        }),
        logo: fields.image({
          label: "Logo",
          description: "Ideal PNG cu fundal transparent. Dacă lipsește, se afișează inițialele organizației.",
          ...uploads("organizations"),
        }),
      },
    }),
  },

  singletons: {
    homepage: singleton({
      label: "Pagina principală",
      path: "content/homepage",
      format: { data: "json" },
      previewUrl: "/",
      schema: {
        statFederations: fields.integer({ label: "Număr federații membre (cifra „14” de pe hartă)", defaultValue: 14 }),
        statOrganizations: fields.integer({ label: "Număr organizații în rețea (cifra „600+”)", defaultValue: 600 }),
        featuredProjects: fields.array(
          fields.object({
            logo: fields.image({ label: "Logo (PNG transparent)", ...uploads("homepage") }),
            logoAlt: fields.text({ label: "Numele proiectului (pentru accesibilitate)" }),
            text: fields.text({
              label: "Text card (max. ~80 caractere)",
              multiline: true,
              validation: { length: { max: 110 } },
            }),
            link: fields.text({ label: "Link", description: linkHint }),
          }),
          {
            label: "Secțiunea „Proiectele noastre” (carduri roz)",
            description: "Între 1 și 5 carduri, în ordinea în care apar pe site. Logo-ul se centrează automat.",
            itemLabel: (p) => p.fields.logoAlt.value || "Card proiect",
            validation: { length: { min: 1, max: 5 } },
          },
        ),
        carouselPhotos: fields.array(fields.image({ label: "Fotografie", ...uploads("homepage") }), {
          label: "Fotografii carusel („Nimic despre tineri fără tineri”)",
          description: "Fotografii pătrate sau orizontale. Recomandat 8-14 fotografii.",
          itemLabel: () => "Fotografie",
        }),
        advocacyPosters: fields.array(
          fields.object({
            image: fields.image({ label: "Afiș (format portret 4:5)", ...uploads("homepage") }),
            alt: fields.text({ label: "Descriere afiș" }),
          }),
          {
            label: "Afișe „Inițiative de advocacy”",
            description: "Exact 5 afișe. Cel din mijloc (al 3-lea) apare cel mai mare.",
            itemLabel: (p) => p.fields.alt.value || "Afiș",
            validation: { length: { min: 5, max: 5 } },
          },
        ),
        advocacyButton: fields.object(
          {
            label: fields.text({ label: "Text buton", defaultValue: "Descoperă inițiativele noastre" }),
            link: fields.text({ label: "Link", description: linkHint, defaultValue: "/proiecte#blog" }),
          },
          { label: "Butonul galben „Inițiative de advocacy”" },
        ),
      },
    }),

    archive: singleton({
      label: "Arhivă proiecte 2006–2016",
      path: "content/archive",
      format: { data: "json" },
      previewUrl: "/proiecte",
      schema: {
        title: fields.text({ label: "Titlu", defaultValue: "Înainte de 2016" }),
        description: fields.text({ label: "Text introductiv", multiline: true }),
        photos: fields.array(
          fields.object({
            image: fields.image({ label: "Fotografie", ...uploads("archive") }),
            caption: fields.text({ label: "Descriere (ex: Summitul Tinerilor 2012)" }),
            year: fields.integer({ label: "Anul", validation: { min: 2000, max: 2016 } }),
          }),
          {
            label: "Galerie foto",
            description: "Fotografii din proiectele CTR din perioada 2006–2016. Apar sub anul 2016 pe pagina Programe.",
            itemLabel: (p) => [p.fields.year.value, p.fields.caption.value].filter(Boolean).join(" · ") || "Fotografie",
          },
        ),
      },
    }),

    settings: singleton({
      label: "Setări generale & contact",
      path: "content/settings",
      format: { data: "json" },
      schema: {
        email: fields.text({ label: "Email de contact", validation: { isRequired: true } }),
        phone: fields.text({ label: "Telefon", validation: { isRequired: true } }),
        address: fields.text({ label: "Adresă" }),
        vat: fields.text({ label: "CUI / CIF" }),
        form230Url: fields.url({ label: "Link formular 3,5% (Formular 230)" }),
        socials: fields.object(
          {
            instagramUrl: fields.url({ label: "Instagram — link" }),
            instagramHandle: fields.text({ label: "Instagram — nume afișat" }),
            facebookUrl: fields.url({ label: "Facebook — link" }),
            facebookHandle: fields.text({ label: "Facebook — nume afișat" }),
            linkedinUrl: fields.url({ label: "LinkedIn — link" }),
            linkedinHandle: fields.text({ label: "LinkedIn — nume afișat" }),
            tiktokUrl: fields.url({ label: "TikTok — link" }),
            tiktokHandle: fields.text({ label: "TikTok — nume afișat" }),
          },
          { label: "Rețele sociale" },
        ),
        bank: fields.object(
          {
            beneficiary: fields.text({ label: "Beneficiar" }),
            name: fields.text({ label: "Banca" }),
            ibanRon: fields.text({ label: "IBAN (RON)" }),
            ibanEur: fields.text({ label: "IBAN (EUR)" }),
            swift: fields.text({ label: "Cod SWIFT" }),
          },
          { label: "Detalii bancare (pagina Susține-ne)" },
        ),
        sponsors: fields.array(
          fields.object({
            name: fields.text({ label: "Nume" }),
            logo: fields.image({ label: "Logo", ...uploads("settings") }),
            url: fields.url({ label: "Link (opțional)" }),
          }),
          { label: "Sponsori (subsolul site-ului)", itemLabel: (p) => p.fields.name.value || "Sponsor" },
        ),
        partners: fields.array(
          fields.object({
            name: fields.text({ label: "Nume" }),
            logo: fields.image({ label: "Logo", ...uploads("settings") }),
            url: fields.url({ label: "Link (opțional)" }),
          }),
          { label: "Parteneri (subsolul site-ului)", itemLabel: (p) => p.fields.name.value || "Partener" },
        ),
      },
    }),
  },
});
