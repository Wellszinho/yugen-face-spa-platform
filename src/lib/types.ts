export type Role =
  | "licensed"
  | "admin"
  | "specialist"
  | "instructor"
  | "moderator"
  | "regional_manager";

export type EventStatus = "AO VIVO" | "EM BREVE" | "ENCERRADO";
export type ContentKind = "Aula" | "Vídeo" | "Artigo" | "PDF" | "Material" | "Treinamento";
export type ContentLevel = "Essencial" | "Intermediário" | "Avançado";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  phone: string;
  city: string;
  region: string;
  joinedAt: string;
  specialties: string[];
  completedCourses: number;
  progress: number;
  active: boolean;
}

export interface Specialist {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  avatar: string;
  cover: string;
  contentCount: number;
  nextEventId?: string;
}

export interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  specialistId: string;
  date: string;
  time: string;
  duration: string;
  status: EventStatus;
  image: string;
  description: string;
  type: "Masterclass" | "Workshop" | "Encontro" | "Reunião";
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  category: ContentKind;
  level: ContentLevel;
  specialistId: string;
  date: string;
  duration: string;
  cover: string;
  saved?: boolean;
}

export interface Technique {
  id: string;
  title: string;
  category: string;
  indication: string;
  contraindications: string;
  steps: string[];
  materials: string[];
  notes: string;
  relatedContentId?: string;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  tab: "Feed" | "Discussões" | "Avisos";
  createdAt: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  pinned?: boolean;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  validUntil: string;
  code: string;
  image: string;
  category: string;
}

export interface MarketingAsset {
  id: string;
  title: string;
  category: "Post" | "Story" | "Banner" | "Vídeo" | "Texto" | "Institucional";
  description: string;
  format: string;
}

export interface Certificate {
  id: string;
  course: string;
  date: string;
  status: "Disponível" | "Em emissão";
  hours: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  type: "Evento" | "Conteúdo" | "Comunidade" | "Benefício" | "Certificado";
  read: boolean;
  createdAt: string;
}

export interface MessageItem {
  id: string;
  subject: string;
  sender: string;
  preview: string;
  createdAt: string;
  unread: boolean;
}
