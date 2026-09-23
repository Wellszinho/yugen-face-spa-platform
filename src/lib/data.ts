import {
  Benefit,
  Certificate,
  CommunityPost,
  ContentItem,
  EventItem,
  MarketingAsset,
  MessageItem,
  NotificationItem,
  Specialist,
  Technique,
  UserProfile
} from "@/lib/types";

export const demoPasswords: Record<string, string> = {
  "admin@yugenface.com": "Yugen@2026",
  "licenciada@yugenface.com": "Yugen@2026"
};

export const users: UserProfile[] = [
  {
    id: "user-admin",
    name: "Helena Mori",
    email: "admin@yugenface.com",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80",
    phone: "(11) 90000-0101",
    city: "São Paulo",
    region: "Coordenação nacional",
    joinedAt: "2025-01-08",
    specialties: ["Gestão Yugen", "Protocolos premium"],
    completedCourses: 18,
    progress: 100,
    active: true
  },
  {
    id: "user-licenciada",
    name: "Lina Azevedo",
    email: "licenciada@yugenface.com",
    role: "licensed",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80",
    phone: "(21) 90000-0202",
    city: "Rio de Janeiro",
    region: "Sudeste",
    joinedAt: "2026-02-12",
    specialties: ["Face Spa", "Relaxamento facial"],
    completedCourses: 7,
    progress: 68,
    active: true
  },
  {
    id: "user-03",
    name: "Marina Sato",
    email: "marina.sato.demo@yugenface.com",
    role: "licensed",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=240&q=80",
    phone: "(31) 90000-0303",
    city: "Belo Horizonte",
    region: "Sudeste",
    joinedAt: "2026-03-02",
    specialties: ["Drenagem", "Protocolos"],
    completedCourses: 5,
    progress: 52,
    active: true
  },
  {
    id: "user-04",
    name: "Clara Nogueira",
    email: "clara.nogueira.demo@yugenface.com",
    role: "licensed",
    avatar: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=240&q=80",
    phone: "(41) 90000-0404",
    city: "Curitiba",
    region: "Sul",
    joinedAt: "2026-01-19",
    specialties: ["Lifting", "Atendimento premium"],
    completedCourses: 9,
    progress: 74,
    active: true
  },
  {
    id: "user-05",
    name: "Rafaela Kuroda",
    email: "rafaela.kuroda.demo@yugenface.com",
    role: "licensed",
    avatar: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=240&q=80",
    phone: "(51) 90000-0505",
    city: "Porto Alegre",
    region: "Sul",
    joinedAt: "2026-04-05",
    specialties: ["Face Spa", "Aromaterapia"],
    completedCourses: 4,
    progress: 41,
    active: true
  },
  {
    id: "user-06",
    name: "Bianca Torres",
    email: "bianca.torres.demo@yugenface.com",
    role: "licensed",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=240&q=80",
    phone: "(61) 90000-0606",
    city: "Brasília",
    region: "Centro-Oeste",
    joinedAt: "2026-05-14",
    specialties: ["Relaxamento", "Bem-estar"],
    completedCourses: 3,
    progress: 35,
    active: true
  },
  {
    id: "user-07",
    name: "Yasmin Rocha",
    email: "yasmin.rocha.demo@yugenface.com",
    role: "licensed",
    avatar: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=240&q=80",
    phone: "(81) 90000-0707",
    city: "Recife",
    region: "Nordeste",
    joinedAt: "2026-04-28",
    specialties: ["Protocolos", "Lifting"],
    completedCourses: 6,
    progress: 59,
    active: true
  },
  {
    id: "user-08",
    name: "Natália Prado",
    email: "natalia.prado.demo@yugenface.com",
    role: "licensed",
    avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=240&q=80",
    phone: "(85) 90000-0808",
    city: "Fortaleza",
    region: "Nordeste",
    joinedAt: "2026-06-06",
    specialties: ["Drenagem", "Face Spa"],
    completedCourses: 2,
    progress: 28,
    active: true
  },
  {
    id: "user-09",
    name: "Paula Kim",
    email: "paula.kim.demo@yugenface.com",
    role: "licensed",
    avatar: "https://images.unsplash.com/photo-1526510747491-58f928ec870f?auto=format&fit=crop&w=240&q=80",
    phone: "(48) 90000-0909",
    city: "Florianópolis",
    region: "Sul",
    joinedAt: "2026-02-24",
    specialties: ["Atendimento", "Relaxamento"],
    completedCourses: 8,
    progress: 82,
    active: true
  },
  {
    id: "user-10",
    name: "Sofia Mendes",
    email: "sofia.mendes.demo@yugenface.com",
    role: "licensed",
    avatar: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=240&q=80",
    phone: "(71) 90000-1010",
    city: "Salvador",
    region: "Nordeste",
    joinedAt: "2026-07-01",
    specialties: ["Protocolos avançados", "Marketing"],
    completedCourses: 5,
    progress: 61,
    active: true
  }
];

export const specialists: Specialist[] = [
  {
    id: "spec-akemi",
    name: "Akemi Tanaka",
    specialty: "Face Spa e lifting manual",
    bio: "Especialista em técnicas de ativação facial com foco em presença, precisão e conforto.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=240&q=80",
    cover: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    contentCount: 12,
    nextEventId: "event-masterclass-yugen"
  },
  {
    id: "spec-maite",
    name: "Maitê Hayashi",
    specialty: "Drenagem e protocolos relaxantes",
    bio: "Instrutora de rotinas de drenagem facial, preparação de sala e rituais sensoriais.",
    avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=240&q=80",
    cover: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    contentCount: 9,
    nextEventId: "event-drenagem"
  },
  {
    id: "spec-renata",
    name: "Renata Imai",
    specialty: "Atendimento premium",
    bio: "Mentora de jornada da cliente, comunicação consultiva e experiência pós-protocolo.",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=240&q=80",
    cover: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
    contentCount: 7,
    nextEventId: "event-roda"
  },
  {
    id: "spec-luiza",
    name: "Luiza Nomura",
    specialty: "Marketing para licenciadas",
    bio: "Cria planos de conteúdo para serviços de estética premium com clareza e delicadeza.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80",
    cover: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80",
    contentCount: 8,
    nextEventId: "event-marketing"
  },
  {
    id: "spec-camila",
    name: "Camila Nakano",
    specialty: "Protocolos avançados",
    bio: "Pesquisa sequências avançadas e adaptações seguras para diferentes perfis de pele.",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=240&q=80",
    cover: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80",
    contentCount: 11,
    nextEventId: "event-protocolos"
  }
];

export const events: EventItem[] = [
  {
    id: "event-roda",
    title: "Roda de perguntas Yugen",
    subtitle: "Dúvidas práticas sobre atendimento, rotina de sala e comunicação.",
    specialistId: "spec-renata",
    date: "2026-09-22",
    time: "20:00",
    duration: "60 min",
    status: "AO VIVO",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
    description: "Um encontro direto com a equipe Yugen para apoiar decisões do dia a dia das licenciadas.",
    type: "Encontro"
  },
  {
    id: "event-masterclass-yugen",
    title: "Masterclass Yugen",
    subtitle: "Técnicas avançadas de Face Spa",
    specialistId: "spec-akemi",
    date: "2026-09-28",
    time: "19:00",
    duration: "90 min",
    status: "EM BREVE",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
    description: "Sequência guiada para refinar pressão, ritmo e acabamento nos protocolos premium.",
    type: "Masterclass"
  },
  {
    id: "event-drenagem",
    title: "Workshop de drenagem facial",
    subtitle: "Fluxos, indicações e finalização",
    specialistId: "spec-maite",
    date: "2026-10-05",
    time: "18:30",
    duration: "75 min",
    status: "EM BREVE",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
    description: "Aula prática sobre movimentos, materiais e cuidados para cada tipo de atendimento.",
    type: "Workshop"
  },
  {
    id: "event-marketing",
    title: "Planejamento de campanha local",
    subtitle: "Como comunicar o Face Spa sem perder sofisticação",
    specialistId: "spec-luiza",
    date: "2026-09-12",
    time: "10:00",
    duration: "50 min",
    status: "ENCERRADO",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    description: "Encontro para construir calendário editorial e oferta com linguagem profissional.",
    type: "Reunião"
  },
  {
    id: "event-protocolos",
    title: "Protocolos para clientes recorrentes",
    subtitle: "Evolução, registro e indicação segura",
    specialistId: "spec-camila",
    date: "2026-08-31",
    time: "19:30",
    duration: "80 min",
    status: "ENCERRADO",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80",
    description: "Orientação para acompanhar resultados e recomendar continuidade com clareza.",
    type: "Masterclass"
  }
];

export const contents: ContentItem[] = [
  {
    id: "content-01",
    title: "Abertura de atendimento Yugen",
    description: "Como iniciar a sessão com escuta, preparo e comunicação precisa.",
    category: "Aula",
    level: "Essencial",
    specialistId: "spec-renata",
    date: "2026-09-01",
    duration: "24 min",
    cover: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "content-02",
    title: "Sequência base de Face Spa",
    description: "Ritmo, pressão e transições para o protocolo principal.",
    category: "Vídeo",
    level: "Essencial",
    specialistId: "spec-akemi",
    date: "2026-08-24",
    duration: "38 min",
    cover: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "content-03",
    title: "Checklist de sala premium",
    description: "Materiais, aroma, luz, som e preparação antes da cliente chegar.",
    category: "PDF",
    level: "Essencial",
    specialistId: "spec-maite",
    date: "2026-08-19",
    duration: "12 páginas",
    cover: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "content-04",
    title: "Lifting manual: adaptação por perfil",
    description: "Como adaptar movimentos sem perder segurança e conforto.",
    category: "Treinamento",
    level: "Avançado",
    specialistId: "spec-camila",
    date: "2026-07-28",
    duration: "52 min",
    cover: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "content-05",
    title: "Fotos de resultado com discrição",
    description: "Orientações para registrar evolução sem expor a cliente.",
    category: "Material",
    level: "Intermediário",
    specialistId: "spec-luiza",
    date: "2026-07-18",
    duration: "18 min",
    cover: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "content-06",
    title: "Drenagem facial para rotina urbana",
    description: "Indicações para clientes com tensão, retenção e agenda intensa.",
    category: "Vídeo",
    level: "Intermediário",
    specialistId: "spec-maite",
    date: "2026-07-03",
    duration: "31 min",
    cover: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "content-07",
    title: "Comunicação pós-atendimento",
    description: "Mensagens, retorno e recomendação sem parecer insistente.",
    category: "Artigo",
    level: "Essencial",
    specialistId: "spec-renata",
    date: "2026-06-26",
    duration: "8 min",
    cover: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "content-08",
    title: "Protocolos avançados: limites e sinais",
    description: "Como reconhecer quando pausar, adaptar ou encaminhar.",
    category: "Treinamento",
    level: "Avançado",
    specialistId: "spec-camila",
    date: "2026-06-14",
    duration: "45 min",
    cover: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "content-09",
    title: "Storytelling para licenciadas",
    description: "Como explicar o valor do Yugen com linguagem clara.",
    category: "Aula",
    level: "Intermediário",
    specialistId: "spec-luiza",
    date: "2026-05-29",
    duration: "27 min",
    cover: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "content-10",
    title: "Finalização sensorial",
    description: "Toque, pausa e orientação final para encerrar a sessão.",
    category: "Vídeo",
    level: "Essencial",
    specialistId: "spec-akemi",
    date: "2026-05-16",
    duration: "21 min",
    cover: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80"
  }
];

export const techniques = [
  {
    id: "tech-01",
    title: "Ritual de preparação facial",
    category: "Face Spa",
    indication: "Primeiro contato, acolhimento e relaxamento inicial.",
    contraindications: "Evitar em pele com irritação ativa sem avaliação.",
    steps: ["Higienizar as mãos", "Aquecer a compressa", "Aplicar pressão leve", "Finalizar com pausa respiratória"],
    materials: ["Compressa", "Óleo facial", "Faixa de cabelo"],
    notes: "Manter ritmo lento nos primeiros dois minutos.",
    relatedContentId: "content-01"
  },
  {
    id: "tech-02",
    title: "Drenagem de contorno",
    category: "Drenagem",
    indication: "Sensação de inchaço e rotina intensa.",
    contraindications: "Não aplicar sobre inflamações, dor aguda ou orientação médica restritiva.",
    steps: ["Mapear linfonodos", "Movimentos de abertura", "Deslizamento de contorno", "Repetição bilateral"],
    materials: ["Sérum leve", "Toalha morna"],
    notes: "A pressão deve ser leve e constante.",
    relatedContentId: "content-06"
  },
  {
    id: "tech-03",
    title: "Sequência de relaxamento temporal",
    category: "Relaxamento",
    indication: "Clientes com tensão em testa, mandíbula e região temporal.",
    contraindications: "Suspender em dor persistente ou sensibilidade incomum.",
    steps: ["Apoio na testa", "Círculos temporais", "Alongamento suave", "Pausa de integração"],
    materials: ["Óleo facial", "Música ambiente"],
    notes: "Trabalhar em silêncio quando a cliente preferir repouso.",
    relatedContentId: "content-10"
  },
  {
    id: "tech-04",
    title: "Lifting de linha mandibular",
    category: "Lifting",
    indication: "Sessões de estímulo visual com acabamento definido.",
    contraindications: "Evitar sobre áreas doloridas, lesionadas ou recém-procedimentadas.",
    steps: ["Preparar deslizamento", "Elevar em três pontos", "Sustentar por dois segundos", "Repetir em simetria"],
    materials: ["Creme de massagem", "Espelho de avaliação"],
    notes: "Registrar percepção antes e depois com autorização.",
    relatedContentId: "content-04"
  },
  {
    id: "tech-05",
    title: "Protocolo de cliente recorrente",
    category: "Protocolos",
    indication: "Acompanhamento mensal de evolução e manutenção.",
    contraindications: "Reavaliar quando houver mudança de pele ou procedimento recente.",
    steps: ["Revisar ficha", "Comparar objetivos", "Ajustar intensidade", "Registrar evolução"],
    materials: ["Ficha da cliente", "Registro fotográfico autorizado"],
    notes: "Comunicação objetiva evita promessas indevidas.",
    relatedContentId: "content-08"
  },
  {
    id: "tech-06",
    title: "Acabamento de presença",
    category: "Técnicas avançadas",
    indication: "Fechamento de sessões premium com percepção de cuidado completo.",
    contraindications: "Evitar aroma intenso em clientes sensíveis.",
    steps: ["Reduzir ritmo", "Aplicar pressão de ancoragem", "Orientar hidratação", "Convidar retorno com clareza"],
    materials: ["Compressa fria", "Bruma suave"],
    notes: "O encerramento deve ser curto, calmo e profissional.",
    relatedContentId: "content-07"
  }
] satisfies Technique[];

export const posts: CommunityPost[] = [
  {
    id: "post-01",
    authorId: "user-admin",
    tab: "Avisos",
    createdAt: "2026-09-22T08:10:00",
    content: "Agenda da semana publicada. A roda de perguntas acontece hoje, às 20:00.",
    likes: 42,
    comments: 9,
    pinned: true
  },
  {
    id: "post-02",
    authorId: "user-04",
    tab: "Feed",
    createdAt: "2026-09-21T19:20:00",
    content: "Usei o checklist de sala premium nesta semana e a percepção das clientes mudou bastante.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80",
    likes: 25,
    comments: 8
  },
  {
    id: "post-03",
    authorId: "user-09",
    tab: "Discussões",
    createdAt: "2026-09-21T12:48:00",
    content: "Como vocês explicam drenagem facial para clientes que chegam pela primeira vez?",
    likes: 18,
    comments: 12
  },
  {
    id: "post-04",
    authorId: "user-03",
    tab: "Feed",
    createdAt: "2026-09-20T16:05:00",
    content: "A sequência de relaxamento temporal ajudou muito nos atendimentos de fim de tarde.",
    likes: 31,
    comments: 6
  },
  {
    id: "post-05",
    authorId: "user-admin",
    tab: "Avisos",
    createdAt: "2026-09-19T09:00:00",
    content: "Novos materiais de marketing já estão disponíveis na central.",
    likes: 39,
    comments: 4
  },
  {
    id: "post-06",
    authorId: "user-07",
    tab: "Discussões",
    createdAt: "2026-09-18T18:42:00",
    content: "Alguém já adaptou o protocolo de cliente recorrente para agenda quinzenal?",
    likes: 14,
    comments: 11
  },
  {
    id: "post-07",
    authorId: "user-05",
    tab: "Feed",
    createdAt: "2026-09-17T11:25:00",
    content: "Minha cliente elogiou a orientação pós-atendimento. Pequenas frases mudam tudo.",
    likes: 22,
    comments: 3
  },
  {
    id: "post-08",
    authorId: "user-10",
    tab: "Feed",
    createdAt: "2026-09-16T14:10:00",
    content: "Estou organizando meu primeiro mês de conteúdo com o modelo da central de marketing.",
    likes: 19,
    comments: 7
  }
];

export const benefits: Benefit[] = [
  {
    id: "benefit-01",
    title: "Kit de sala sensorial",
    description: "Condição especial para montar uma ambientação Yugen com aroma e textura.",
    validUntil: "2026-10-30",
    code: "YUGENSALA15",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=80",
    category: "Parceiros"
  },
  {
    id: "benefit-02",
    title: "Banco de imagens institucionais",
    description: "Seleção de imagens autorizadas para posts e materiais locais.",
    validUntil: "2026-12-31",
    code: "ACESSO-YUGEN",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80",
    category: "Materiais"
  },
  {
    id: "benefit-03",
    title: "Encontro presencial regional",
    description: "Pré-inscrição para turmas de imersão presencial com prioridade de licenciadas.",
    validUntil: "2026-11-18",
    code: "REGIONAL26",
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=900&q=80",
    category: "Eventos"
  },
  {
    id: "benefit-04",
    title: "Condição em produtos de apoio",
    description: "Desconto em itens de preparo, organização e acabamento de atendimento.",
    validUntil: "2026-10-12",
    code: "APOIOYUGEN",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80",
    category: "Produtos"
  },
  {
    id: "benefit-05",
    title: "Mentoria de comunicação",
    description: "Sessão coletiva para revisar bio, destaques e mensagens comerciais.",
    validUntil: "2026-10-05",
    code: "MENTORIAYGN",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    category: "Campanhas"
  },
  {
    id: "benefit-06",
    title: "Templates de lançamento",
    description: "Arquivos editáveis para divulgar novos horários e protocolos no mês.",
    validUntil: "2026-12-15",
    code: "LANCA-YUGEN",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
    category: "Marketing"
  }
];

export const marketingAssets: MarketingAsset[] = [
  {
    id: "asset-01",
    title: "Post de apresentação Face Spa",
    category: "Post",
    description: "Arte quadrada para apresentar o serviço com linguagem institucional.",
    format: "1080 x 1080"
  },
  {
    id: "asset-02",
    title: "Sequência de stories de agenda",
    category: "Story",
    description: "Três telas para abrir horários da semana.",
    format: "1080 x 1920"
  },
  {
    id: "asset-03",
    title: "Banner de encontro regional",
    category: "Banner",
    description: "Material horizontal para grupos e comunicados.",
    format: "1920 x 1080"
  },
  {
    id: "asset-04",
    title: "Roteiro de vídeo curto",
    category: "Texto",
    description: "Texto para explicar o ritual Yugen em até 45 segundos.",
    format: "Documento"
  }
];

export const certificates: Certificate[] = [
  {
    id: "cert-01",
    course: "Formação Essencial Yugen",
    date: "2026-06-12",
    status: "Disponível",
    hours: 12
  },
  {
    id: "cert-02",
    course: "Drenagem Facial Aplicada",
    date: "2026-08-02",
    status: "Disponível",
    hours: 8
  },
  {
    id: "cert-03",
    course: "Protocolos Avançados",
    date: "2026-09-18",
    status: "Em emissão",
    hours: 10
  }
];

export const notifications: NotificationItem[] = [
  {
    id: "not-01",
    title: "Encontro ao vivo hoje",
    body: "A roda de perguntas Yugen começa às 20:00.",
    type: "Evento",
    read: false,
    createdAt: "2026-09-22T08:00:00"
  },
  {
    id: "not-02",
    title: "Nova técnica publicada",
    body: "Acabamento de presença já está disponível na biblioteca.",
    type: "Conteúdo",
    read: false,
    createdAt: "2026-09-21T15:40:00"
  },
  {
    id: "not-03",
    title: "Novo benefício disponível",
    body: "Templates de lançamento foram adicionados aos benefícios.",
    type: "Benefício",
    read: true,
    createdAt: "2026-09-20T10:30:00"
  },
  {
    id: "not-04",
    title: "Certificado em emissão",
    body: "Seu certificado de Protocolos Avançados está sendo preparado.",
    type: "Certificado",
    read: true,
    createdAt: "2026-09-18T17:00:00"
  }
];

export const messages: MessageItem[] = [
  {
    id: "msg-01",
    subject: "Suporte sobre materiais",
    sender: "Equipe Yugen",
    preview: "Recebemos sua solicitação e anexamos a orientação de uso.",
    createdAt: "2026-09-21T13:15:00",
    unread: true
  },
  {
    id: "msg-02",
    subject: "Mentoria regional",
    sender: "Coordenação Sudeste",
    preview: "A próxima rodada de horários será aberta nesta semana.",
    createdAt: "2026-09-19T09:35:00",
    unread: false
  }
];

export const adminMetrics = [
  { label: "Licenciadas", value: "10", detail: "9 ativas" },
  { label: "Conteúdos", value: "10", detail: "publicados" },
  { label: "Eventos", value: "3", detail: "próximos ou ao vivo" },
  { label: "Participação", value: "74%", detail: "média em encontros" }
];

export function getSpecialist(id: string) {
  return specialists.find((specialist) => specialist.id === id);
}

export function getUser(id: string) {
  return users.find((user) => user.id === id);
}

export function getEvent(id: string) {
  return events.find((event) => event.id === id);
}
