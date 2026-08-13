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
    developmentProcess: 'Se desarrolló mediante React, TypeScript y Tailwind CSS con Vite, estructurando un ecosistema modular interactivo con simuladores, comparativas de peso y un asistente técnico integrado vía webhooks.',
    technologies: ['Netlify CDN', 'GitHub Repos', 'Google AI Studio', 'Antigravity Code', 'Tailwind CSS'],
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop',
    difficulty: 'Avanzado',
    impact: 'Página web activa en producción accesible mundialmente con ejecución en tiempo real.',
    features: [
      'Despliegue automático y hospedaje en la infraestructura de Netlify.',
      'Acceso directo ejecutable al hacer clic en Ver Proyecto.',
      'Optimizaciones de rendimiento y navegación fluida multidispositivo.'
    ],
    demoUrl: 'https://grupossramrutaaxs.netlify.app/',
    githubUrl: 'https://github.com'
  },
  {
    id: '1',
    title: 'Aplicacion Android',
    category: 'Despliegues',
    shortDescription: 'Configuración interactiva de un pipeline de despliegue continuo gatillado por commits remotos auditados en tiempo real.',
    longDescription: 'Este proyecto demuestra un flujo completo de CI/CD. Al hacer push a la rama de producción en GitHub, webhooks seguros notifican a Netlify, compilando una aplicación web optimizada y distribuyéndola instantáneamente a través de su CDN global con soporte de Edge Functions.',
    developmentProcess: 'La app se desarrolló integrando bases de datos CSV, lógica de compatibilidad, una interfaz Flask/HTML y una versión independiente, con pruebas y ajustes para bicicletas, BB y OSPW.',
    technologies: ['GitHub Repos', 'Netlify CD/CI', 'Google AI Studio', 'Antigravity Code', 'Tailwind CSS'],
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
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
    title: 'Desarrollo con Antigravity',
    category: 'Despliegues',
    shortDescription: 'Panel de Control de Envíos WhatsApp para la distribución controlada de catálogos de promociones en lotes.',
    longDescription: 'Aplicación web interactiva asistida para el control y envío de catálogos y promociones a través de WhatsApp Web. Incorpora un algoritmo de gestión de lotes (3 contactos por cada ventana de 5 minutos) con cuenta regresiva, estados de envío persistentes en localStorage, filtrado de contactos en tiempo real y alertas sonoras para proteger las cuentas contra bloqueos por spam.',
    developmentProcess: `Descripción paso a paso de cómo se implementó Antigravity para automatizar y estructurar la creación de este catálogo:

• Conexión remota por CDP (Chrome DevTools Protocol): En lugar de iniciar una nueva sesión desde cero (lo cual requeriría credenciales de acceso y manejo de captchas), Antigravity localizó el puerto de depuración activa en tu máquina (DevToolsActivePort) y se conectó directamente a tu sesión de Chrome abierta en la pestaña del B2B.
• Interacción con los filtros de la interfaz: Utilizando scripts automatizados con Playwright, el agente inspeccionó los elementos seleccionados del DOM. Verificó si la marca Selle Italia estaba activa y, de no estarlo, simuló los clics necesarios en el menú de "Marcas" para abrir el dropdown y seleccionarla.
• Control del Scroll Infinito: Para cargar todo el listado de productos, el script ejecutó un bucle que desplazaba el scroll del navegador al fondo (window.scrollTo). En cada iteración, monitoreó el número total de tarjetas de productos cargadas en el DOM hasta que el número se estabilizó en 47 productos.
• Extracción y Depuración de Datos (Web Scraping): Una vez cargados todos los elementos en el navegador, se extrajo la información de cada producto (nombre, imagen, precio y disponibilidad). Mediante expresiones regulares en Python, se limpiaron los prefijos de las referencias y se filtraron los productos con stock disponible (reduciendo la lista a 29 productos con stock activo).
• Generación de Plantilla HTML Dinámica: Se estructuró el catálogo en un archivo HTML con un diseño premium adaptado a la marca. Se integró una barra de control superior interactiva para buscar sillines en tiempo real mediante JavaScript, así como botones de acceso directo para descargar e imprimir.
• Renderizado final a PDF: Finalmente, Antigravity inició un navegador Chrome headless en segundo plano para cargar el archivo HTML recién generado y realizar una impresión virtual limpia a PDF tamaño A4, configurando estilos @media print para ocultar automáticamente la barra de controles interactiva en el documento final.`,
    technologies: ['WhatsApp Web API', 'JavaScript ES6+', 'Outfit Typography', 'LocalStorage', 'CSS3 Dark Theme'],
    imageUrl: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=800&auto=format&fit=crop',
    difficulty: 'Intermedio',
    impact: 'Optimiza el envío de catálogos comerciales reduciendo el riesgo de spam en un 90% mediante el control de frecuencia por lotes.',
    features: [
      'Gestión automática de temporizador anti-spam (5 minutos por cada lote de 3 envíos).',
      'Edición dinámica del mensaje plantilla con actualización instantánea de hipervínculos.',
      'Persistencia de contactos enviados e historial de progreso en almacenamiento local.'
    ],
    demoUrl: '/propartes.html',
    githubUrl: '#'
  },
  {
    id: '4',
    title: 'Planificación de Producto y Prompts en Gemini',
    category: 'Diseño y Prototipado',
    shortDescription: 'Fase de planeación semántica y estructuración conceptual del portafolio utilizando modelos de lenguaje avanzados.',
    longDescription: 'Este proyecto detalla las bitácoras y esquemas generados por Gemini para la planeación metodológica del diplomado. Permitió definir los objetivos de aprendizaje, priorizar las secciones con estilo glassmorphism, y resolver problemas de diseño de arquitectura orientada a componentes modulares.',
    developmentProcess: `CeramicSpeed Match – Especificación de Arquitectura UI/UX y Estructura de Aplicación

Nombre de la Aplicación: CeramicSpeed Match
Rol: Diseñador APP CeramicSpeed
Enfoque de Diseño: Moderno, Técnico, Premium e Intuitivo con animaciones fluidas y estética Dark Minimalist.
Paleta de Colores Oficial:
• Negro Profundo / Fondo Oscuro: #000000 / #111111
• Blanco Pureza / Textos Destacados: #FFFFFF
• Gris Oscuro / Carbón (Contenedores/Tarjetas): #222222 / #333333
• Gris Claro / Platino (Detalles/Bordes/Subtítulos): #F4F4F4 / #E5E5E5

--------------------------------------------------
1. MAPEO GENERAL DEL FLUJO DE DATOS Y PANTALLAS
--------------------------------------------------
[FLUJO BOTTOM BRACKET (BB)]
• PÁGINA 1: Inicio / Selección [Logo CeramicSpeed] [ES|EN]
• PÁGINA 2: Tipo Bici (Ruta/TT / MTB) -> Marca Bici (Specialized) -> Año (2016, 2017...)
• PÁGINA 3: Seleccionar Bielas (SRAM DUB, Shimano, Campagnolo, Rotor)
• PÁGINA 4: Resultado Bottom Bracket (Imagen, SKU 115424, Nombre/Descripción)

[FLUJO OSPW]
• PÁGINA 1: Inicio / Selección [Logo CeramicSpeed] [ES|EN]
• PÁGINA 2: Selector Marca de Tensor -> Selector Tensor / Rear Derailleur
• PÁGINA 3: Resultado OSPW (Imagen, SKU 113490, Nombre/Descripción)

--------------------------------------------------
2. TRES EJEMPLOS DE ESTRUCTURA E INTERFAZ UI/UX
--------------------------------------------------
PROPUESTA 1: Minimal Tech / Pure Precision (Navegación Táctica de Alta Claridad)
Estructuras geométricas nítidas, esquinas rectas con radios micro-suaves (4px) y alta visibilidad de datos técnicos. Ideada para mecánicos, atletas y talleres boutique.
• Cabecera Universal: Logotipo CeramicSpeed en #FFFFFF, selector [ES|EN] en esquina superior derecha.
• Pantalla 1 (Home): Tarjetas táctiles [BOTTOM BRACKET] y [OSPW].
• Pantalla 2 (BB): Toggle [Ruta/TT] vs [Montaña], desplegables marca/año con filtro interactivo.
• Pantalla 3 (BB): Cuadrícula 2x2 para marcas de bielas (SRAM DUB, Shimano, Campagnolo, Rotor).
• Pantalla 4 (BB): Resultado (SKU 115424, BB ALPHA for PF30 Shimano, render CAD 3D).
• Pantalla 2 (OSPW): Desplegable Marca Tensor (SRAM ROAD, SHIMANO ROAD, etc.) y Tensor reactivo.
• Pantalla 3 (OSPW): Resultado (SKU 113490, OSPW RS ALPHA for Shimano 9250/8150).

PROPUESTA 2: Performance Dark Glass (Diseño de Cuerpos Curvos y Translucidez)
Experiencia táctil moderna en smartphones, micro-animaciones, tarjetas opacidad #111111 (90%) y sombras suaves.
• Cabecera Universal: Logotipo con brillo metálico + Switch de Idioma estilo cápsula flotante.
• Pantalla 1 (Home): Botones flotantes de alto relieve táctil en #222222.
• Pantalla 2 (BB): Selector segmentado dinámico + Wheel Pickers de marca y año.
• Pantalla 3 (BB): Carousel horizontal de tarjetas interactivas de bielas.
• Pantalla 4 (BB): Tarjeta de presentación con giro 360° 3D y especificaciones en Monospace.
• Pantalla 2 (OSPW): Botones desplegables animados en cascada vertical.
• Pantalla 3 (OSPW): Resultado (SKU 112937, OSPW X ALPHA for SRAM Eagle Transmission).

PROPUESTA 3: Technical Split Dashboard (Paso a Paso Modular para Taller)
Toma de decisiones guiada en pantalla dividida o formato modular con Breadcrumbs.
• Cabecera Universal: Franja superior continua en #111111.
• Pantalla 1 (Home): Split Screen (Arriba BOTTOM BRACKET, Abajo OSPW).
• Pantalla 2 (BB): Panel superior (Disciplina), Panel inferior (Marca/Año/Estándar PressFit 30).
• Pantalla 3 (BB): Botones de lista técnica con diámetro de eje (SRAM DUB 28.99mm, Shimano 24mm).
• Pantalla 4 (BB): Panel comparativo de SKU e imagen con ficha técnica.
• Pantalla 2 (OSPW): Selección de marca de grupo + Tensor con filtrado instantáneo.
• Pantalla 3 (OSPW): Resultados agrupados por tecnología (5-Spoke vs ALPHA).

--------------------------------------------------
3. INTEGRACIÓN DE DATOS Y LÓGICA DEL SISTEMA (JSON)
--------------------------------------------------
Relación Bottom Bracket (BB):
1. Página 2: Specialized -> 2016 -> Ruta/Tarmac => Standard = PressFit 30
2. Página 3: Biela = Shimano
3. Página 4: Cruce PF30 + Shimano + Road => SKU: 115424 | BB ALPHA for PF30 Shimano

Relación OSPW:
1. Página 2: SHIMANO ROAD => Tensor = Dura Ace RD-9250
2. Página 3: Consulta JSON => SKU: 113490 (OSPW RS ALPHA) & SKU: 113488 (OSPW RS 5-Spoke)`,
    technologies: ['Gemini 1.5 Pro', 'Prompt Engineering', 'Product Management', 'JSON Schemas'],
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
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
    category: 'Despliegues',
    shortDescription: 'Un agente orquestador coordina subagentes asíncronos que interactúan dinámicamente con la web mediante herramientas de navegación, extrayendo y acelerando el proceso para generar datos estructurados y validados.',
    longDescription: 'Implementación del entorno de desarrollo integrado asistido por el agente Antigravity de Google AI Studio. Este espacio provee detección y diagnóstico en tiempo real de errores de dependencias npm, optimizando dinámicamente el empaquetado final de Vite para hosting estático de alto contraste.',
    developmentProcess: 'Mediante Antigravity, un agente autónomo navegó por una página web para extraer información de productos y convertirla automáticamente en un catálogo perfectamente estructurado.',
    technologies: ['Google AI Studio', 'Antigravity Workspace', 'Vite Bundler', 'TypeScript Compiler'],
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    difficulty: 'Avanzado',
    impact: 'Acelera las fases iterativas de programación de componentes en un 80% mitigando fatiga cognitiva.',
    features: [
      'Compilación y linting incremental continuo en el servidor de desarrollo.',
      'Diagnósticos automáticos y precisos de dependencias e imports dañados.',
      'Alineación perfecta con la filosofía de diseño Minimalista y de Alto Impacto.'
    ],
    demoUrl: '/selleitalia.html',
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
