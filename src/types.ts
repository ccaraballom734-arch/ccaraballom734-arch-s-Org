export interface Project {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  technologies: string[];
  imageUrl: string;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  impact: string;
  features: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export interface ToolLearned {
  name: string;
  category: 'Frameworks' | 'LLMs & APIs' | 'Bases de Datos' | 'No-Code / GenAI Media';
  description: string;
  proficiency: number; // 1-100 percentage
  icon: string; // lucide icon name
}

export interface ExpectationCard {
  title: string;
  description: string;
  icon: string;
}
