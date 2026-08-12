import { Project, ToolLearned, ExpectationCard } from './types';

export const CAMILO_INFO = {
  name: 'Camilo Andrés Caraballo',
  title: 'Estudiante del Diplomado de Inteligencia Artificial Generativa',
  bio: 'Apasionado por el desarrollo moderno, la arquitectura de software y el despliegue continuo. Mi enfoque actual en el diplomado consiste en dominar el ciclo de vida completo del desarrollo: desde el prototipado inicial con Google Stitch, la etapa de ideación y diseño con Gemini, la programación ágil asistida en Google AI Studio junto a la potencia de Antigravity, hasta la gestión del flujo lógico en Google Flow y la culminación del despliegue y versionamiento continuo mediante GitHub y Netlify.',
  location: 'Bogotá, Colombia',
  email: 'ccaraballom734@gmail.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com'
};

export const EXPECTATIONS: ExpectationCard[] = [
  {
    title: 'Versionamiento Seguro con GitHub',
    description: 'Aprender las metodologías modernas de branching, resolución de conflictos y revisiones de código eficientes para liderar integraciones seguras en entornos de producción.',
    icon: 'Cpu'
  },
  {
    title: 'Despliegue Continuo con Netlify',
    description: 'Configurar e implementar pipelines ágiles de CI/CD que se disparen con cada commit a la rama de producción, garantizando actualizaciones inmediatas y seguras a los usuarios.',
    icon: 'Database'
  },
  {
    title: 'Automatización Asistida por IA',
    description: 'Utilizar el potencial de Google AI Studio, Antigravity y Google Flow para orquestar flujos de trabajo inteligentes, detectando errores y optimizando código antes de compilar.',
    icon: 'Workflow'
  },
  {
    title: 'De la Idea al Producto en Minutos',
    description: 'Acelerar la fase de conceptualización mediante prototipado ágil con Google Stitch y diseño estructurado guiado por las capacidades avanzadas de Gemini.',
    icon: 'Sparkles'
  }
];

export const PROJECTS: Project[] = [
  {
    id: '6',
    title: 'Despliegue Web',
    category: 'Despliegues',
    shortDescription: 'Sitio web activo y desplegado en producción en Netlify CDN con integración continua desde el repositorio de GitHub.',
    longDescription: 'Aplicación web completa activa en producción. Maquetada y construida utilizando las herramientas del diplomado de Inteligencia Artificial Generativa y desplegada en la infraestructura global de Netlify.',
    technologies: ['Netlify CDN', 'GitHub Repos', 'Google AI Studio', 'Antigravity Code', 'Tailwind CSS'],
    imageUrl: 'https://picsum.photos/seed/grupossra/800/600',
    difficulty: 'Avanzado',
    impact: 'Página web activa en producción accesible mundialmente con ejecución en tiempo real.',
    features: [
      'Despliegue automático y hospedaje en la infraestructura de Netlify.',
      'Acceso directo ejecutable al hacer clic en Ver detalle ampliado.',
      'Optimizaciones de rendimiento y navegación fluida multidispositivo.'
    ],
    demoUrl: 'https://grupossramrutaaxs.netlify.app/',
    githubUrl: 'https://github.com'
  },
  {
    id: '1',
    title: 'Workflow Automatizado: Push-to-Deploy con Netlify Edge',
    category: 'Despliegues',
    shortDescription: 'Configuración interactiva de un pipeline de despliegue continuo gatillado por commits remotos auditados en tiempo real.',
    longDescription: 'Este proyecto demuestra un flujo completo de CI/CD. Al hacer push a la rama de producción en GitHub, webhooks seguros notifican a Netlify, compilando una aplicación web optimizada y distribuyéndola instantáneamente a través de su CDN global con soporte de Edge Functions.',
    technologies: ['GitHub Repos', 'Netlify CD/CI', 'Google AI Studio', 'Antigravity Code', 'Tailwind CSS'],
    imageUrl: 'https://picsum.photos/seed/netlifydeploy/800/600',
    difficulty: 'Intermedio',
    impact: 'Automatiza el 100% de la fase de compilación del frontend, garantizando despliegues de parches de código en menos de 10 segundos.',
    features: [
      'Configuración de webhooks automáticos para eventos de push en main.',
      'Scripts personalizados para validación previa de tipos en la nube de Netlify.',
      'Manejo dinámico de variables de entorno seguras para APIs externas.',
      'Monitoreo gráfico del tiempo de build en el servidor estático.'
    ],
    demoUrl: '/ceramicspeed.html',
    githubUrl: 'https://github.com'
  },
  {
    id: '2',
    title: 'Plano Visual e Interacción con Google Stitch',
    category: 'Diseño y Prototipado',
    shortDescription: 'Planificación de interfaces de usuario y maquetación interactiva de flujos para herramientas de compilación ágil.',
    longDescription: 'El diseño frontend de este portafolio y sus funcionalidades interactivas se concibieron interactuando en Google Stitch. Este prototipo facilitó la alineación entre las expectativas del diplomado, los requerimientos dinámicos del sistema y la definición de la interfaz visual.',
    technologies: ['Google Stitch', 'Gemini Design', 'Mockups Dinámicos', 'UX/UI Wireframes'],
    imageUrl: 'https://picsum.photos/seed/googlestitch/800/600',
    difficulty: 'Principiante',
    impact: 'Reduce en un 60% la fricción inicial para definir componentes CSS de alto impacto visual y layouts adaptables.',
    features: [
      'Prototipado guiado basado en interacciones táctiles y responsive simuladas.',
      'Extracción simplificada de paletas de colores y espaciados armoniosos.',
      'Validación preliminar de accesibilidad y contraste según las guías del diplomado.'
    ],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: '3',
    title: 'Orquestación de Procesamiento de Código en Google Flow',
    category: 'Automatización',
    shortDescription: 'Sistema inteligente de control de calidad para auditar ramas y pull requests antes del merge final en GitHub.',
    longDescription: 'Utilizando la lógica estructurada de Google Flow, se diseñó un flujo inteligente de backend que evalúa automáticamente la sintaxis, formatea archivos de código mediante linters y ejecuta pruebas unitarias para garantizar el estado verde ideal antes de activar la build estática.',
    technologies: ['Google Flow', 'Gemini API', 'GitHub Webhooks', 'TypeScript', 'Vite'],
    imageUrl: 'https://picsum.photos/seed/googleflow/800/600',
    difficulty: 'Avanzado',
    impact: 'Previene en un 95% la introducción de inconsistencias lógicas en el código del servidor y fallas de compilación en Netlify.',
    features: [
      'Disparador dinámico de análisis al crearse Pull Requests en GitHub.',
      'Sugerencias inteligentes de refactorización automáticas redactadas por el modelo.',
      'Conexión visual de diagramas y microservicios sin servidor.'
    ],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: '4',
    title: 'Planificación de Producto y Prompts en Gemini',
    category: 'Diseño y Prototipado',
    shortDescription: 'Fase de planeación semántica y estructuración conceptual del portafolio utilizando modelos de lenguaje avanzados.',
    longDescription: 'Este proyecto detalla las bitácoras y esquemas generados por Gemini para la planeación metodológica del diplomado. Permitió definir los objetivos de aprendizaje, priorizar las secciones con estilo glassmorphism, y resolver problemas de diseño de arquitectura orientada a componentes modulares.',
    technologies: ['Gemini 1.5 Pro', 'Prompt Engineering', 'Product Management', 'JSON Schemas'],
    imageUrl: 'https://picsum.photos/seed/geminiplan/800/600',
    difficulty: 'Principiante',
    impact: 'Estableció una ruta de ejecución robusta libre de alucinaciones en un único día de planeamiento conceptual.',
    features: [
      'Generación de planes de desarrollo ágiles paso a paso.',
      'Definición de mocks interactivos de datos de alta fidelidad para pruebas.',
      'Estrategia de optimización semántica para interfaces de usuario.'
    ],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: '5',
    title: 'Consola de Desarrollo Asistido: Google AI Studio & Antigravity',
    category: 'Automatización',
    shortDescription: 'Entorno de desarrollo de última generación que asiste la codificación, resolución de bugs e integración en Docker/Cloud Run.',
    longDescription: 'Implementación del entorno de desarrollo integrado asistido por el agente Antigravity de Google AI Studio. Este espacio provee detección y diagnóstico en tiempo real de errores de dependencias npm, optimizando dinámicamente el empaquetado final de Vite para hosting estático de alto contraste.',
    technologies: ['Google AI Studio', 'Antigravity Workspace', 'Vite Bundler', 'TypeScript Compiler'],
    imageUrl: 'https://picsum.photos/seed/aistudio/800/600',
    difficulty: 'Avanzado',
    impact: 'Acelera las fases iterativas de programación de componentes en un 80% mitigando fatiga cognitiva.',
    features: [
      'Compilación y linting incremental continuo en el servidor de desarrollo.',
      'Diagnósticos automáticos y precisos de dependencias e imports dañados.',
      'Alineación perfecta con la filosofía de diseño Minimalista y de Alto Impacto.'
    ],
    demoUrl: '#',
    githubUrl: '#'
  }
];

export const TOOLS_LEARNED: ToolLearned[] = [
  {
    name: 'GitHub & Control de Versiones',
    category: 'Frameworks',
    description: 'Gestión profesional de repositorios de código, flujos de trabajo basados en ramas modulares, resolución fluida de conflictos y automatizaciones nativas.',
    proficiency: 95,
    icon: 'Code'
  },
  {
    name: 'Netlify & Despliegues CDN',
    category: 'Bases de Datos',
    description: 'Configuración ágil de pipelines de CI/CD para compilar y alojar repositorios en producción mundial, administración de DNS y manejo de variables de entorno.',
    proficiency: 90,
    icon: 'Database'
  },
  {
    name: 'Google Stitch',
    category: 'No-Code / GenAI Media',
    description: 'Herramienta clave para la creación interactiva de wireframes, maquetación ágil de la interfaz visual de usuario y modelado de layouts de alto impacto.',
    proficiency: 85,
    icon: 'Palette'
  },
  {
    name: 'Gemini (Fase de Diseño y Planeación)',
    category: 'LLMs & APIs',
    description: 'Aplicación de ingeniería de prompts avanzada para sintetizar requerimientos, planificar la arquitectura de software y estructurar bases de datos.',
    proficiency: 95,
    icon: 'Sparkles'
  },
  {
    name: 'Google AI Studio & Antigravity',
    category: 'Frameworks',
    description: 'Entorno de codificación interactivo guiado por IA que asiste el debugging, la optimización, linting continuo y aceleración de componentes interactivos.',
    proficiency: 90,
    icon: 'Terminal'
  },
  {
    name: 'Google Flow',
    category: 'Frameworks',
    description: 'Automatización visual de flujos analíticos, control lógico de ramas de desarrollo e integraciones con mensajería e infraestructura segura pre-merge.',
    proficiency: 80,
    icon: 'Workflow'
  }
];
