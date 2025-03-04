export interface CourseContent {
  course: string;
  content: Content[];
}

export interface Content {
  unidad: number;
  contenido: Contenido[];
}

export interface Contenido {
  ResourceName: string;
  Link: string;
  Embed: string;
}
