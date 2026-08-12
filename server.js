/**
 * @file server.js
 * @description API REST con Express (Node.js) para la gestión de proyectos del Diplomado de IA.
 * Incluye operaciones CRUD (Create, Read, Update, Delete), soporte de CORS y documentación detallada.
 * 
 * Para ejecutar este servidor:
 * 1. Asegúrate de tener Node.js instalado (https://nodejs.org).
 * 2. Instala Express ejecutando: npm install express
 * 3. Ejecuta el servidor con: node server.js
 */

// Importamos la biblioteca Express para crear nuestra aplicación y definir rutas servidor-side.
import express from 'express';

// Crear una instancia de la aplicación Express
const app = express();

// Definir el puerto de escucha (3000 es el puerto estándar accesible en nuestro entorno de desarrollo)
const PORT = process.env.PORT || 3000;

/**
 * ============================================================================
 * MIDDLEWARES (Funciones intermedias de procesamiento de peticiones)
 * ============================================================================
 */

// Middleware para habilitar el parseo automático de cuerpos en formato JSON (req.body)
app.use(express.json());

// Middleware manual de CORS (Cross-Origin Resource Sharing)
// Permite que clientes de otros dominios o puertos (ej. frontend en Vite) consuman esta API sin restricciones.
app.use((req, res, next) => {
  // Permitimos el acceso desde cualquier origen
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Especificamos los métodos HTTP que están permitidos
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // Indicamos qué cabeceras personalizadas se permiten en la petición
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Si la petición es de tipo OPTIONS (Preflight request que hacen los navegadores antes de POST/PUT/DELETE),
  // respondemos con un estado de éxito inmediato (200 OK) sin continuar con el flujo normal de las rutas.
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  // Continuar al siguiente middleware o ruta definida
  next();
});

/**
 * ============================================================================
 * BASE DE DATOS DE EJEMPLO EN MEMORIA
 * Un arreglo simple de objetos para registrar los proyectos del Diplomado.
 * ============================================================================
 */
let proyectos = [
  {
    id: 1,
    titulo: 'Workflow Automatizado con Netlify Edge',
    tecnologia: 'GitHub & Netlify Webhooks',
    publicado: true
  },
  {
    id: 2,
    titulo: 'Plano Visual de Usuario en Google Stitch',
    tecnologia: 'Google Stitch & CSS Glassmorphism',
    publicado: true
  },
  {
    id: 3,
    titulo: 'Orquestación de Pipelines con Google Flow',
    tecnologia: 'Google Flow & Node.js API',
    publicado: false
  },
  {
    id: 4,
    titulo: 'Consola de Respuestas de Código Antigravity',
    tecnologia: 'Google AI Studio & Gemini API',
    publicado: true
  }
];

// Variable auxiliar para autoincrementar el ID de los nuevos proyectos creados
let proximoId = 5;

/**
 * ============================================================================
 * ENDPOINTS DE LA API REST (Rutas CRUD)
 * ============================================================================
 */

// 1. GET /api/proyectos: Obtener el listado de todos los proyectos registrados.
// Permite enviar un filtro opcional por query string para buscar por tecnología (?tecnologia=...)
app.get('/api/proyectos', (req, res) => {
  const { tecnologia } = req.query;

  // Si se provee filtro por query string, retornamos únicamente los que coincidan parcialmente
  if (tecnologia) {
    const filtrados = proyectos.filter(p => 
      p.tecnologia.toLowerCase().includes(tecnologia.toString().toLowerCase())
    );
    return res.json(filtrados);
  }

  // Si no hay filtro, retornamos la lista completa de proyectos en formato JSON
  res.json(proyectos);
});

// 2. GET /api/proyectos/:id: Obtener el detalle de un proyecto específico por su ID único.
app.get('/api/proyectos/:id', (req, res) => {
  // Convertimos el parámetro de ruta (ID) de string a un número entero
  const idBuscado = parseInt(req.params.id, 10);
  
  // Buscamos el proyecto dentro de nuestro arreglo en memoria
  const proyecto = proyectos.find(p => p.id === idBuscado);

  // Si el proyecto no existe, retornamos un error 404 (Not Found) con un mensaje aclaratorio
  if (!proyecto) {
    return res.status(404).json({ 
      error: 'Proyecto no encontrado',
      mensaje: `No existe ningún proyecto registrado con el ID ${idBuscado}.` 
    });
  }

  // Si existe, retornamos el proyecto (200 OK por defecto)
  res.json(proyecto);
});

// 3. POST /api/proyectos: Registrar y guardar un nuevo proyecto.
app.post('/api/proyectos', (req, res) => {
  const { titulo, tecnologia, publicado } = req.body;

  // Validación de seguridad básica en los campos requeridos
  if (!titulo || !tecnologia) {
    return res.status(400).json({ 
      error: 'Datos incompletos',
      mensaje: 'Los campos "titulo" y "tecnologia" son mandatorios para crear un proyecto.' 
    });
  }

  // Estructura del nuevo proyecto con ID autoincremental automatizado
  const nuevoProyecto = {
    id: proximoId++,
    titulo: titulo.trim(),
    tecnologia: tecnologia.trim(),
    // Por defecto, un proyecto se considera publicado si no se especifica el campo
    publicado: publicado !== undefined ? Boolean(publicado) : true
  };

  // Guardamos el objeto en la lista en memoria
  proyectos.push(nuevoProyecto);

  // Retornamos el objeto creado con código de estado 201 (Created)
  res.status(201).json({
    mensaje: 'Proyecto creado exitosamente',
    proyecto: nuevoProyecto
  });
});

// 4. PUT /api/proyectos/:id: Actualizar por completo o parcialmente las propiedades de un proyecto existente.
app.put('/api/proyectos/:id', (req, res) => {
  const idBuscado = parseInt(req.params.id, 10);
  const { titulo, tecnologia, publicado } = req.body;

  // Buscamos la posición del elemento a actualizar en el arreglo
  const indice = proyectos.findIndex(p => p.id === idBuscado);

  // Fallback si no fue localizado
  if (indice === -1) {
    return res.status(404).json({ 
      error: 'Proyecto no encontrado',
      mensaje: `No se encontró ningún proyecto con el ID ${idBuscado} para ser actualizado.` 
    });
  }

  // Modificamos las propiedades recibidas manteniendo los datos anteriores si no se especifican (Merge parcial)
  const proyectoActualizado = {
    ...proyectos[indice],
    titulo: titulo !== undefined ? titulo.trim() : proyectos[indice].titulo,
    tecnologia: tecnologia !== undefined ? tecnologia.trim() : proyectos[indice].tecnologia,
    publicado: publicado !== undefined ? Boolean(publicado) : proyectos[indice].publicado
  };

  // Reemplazamos el registro en la base de datos temporal
  proyectos[indice] = proyectoActualizado;

  // Retornamos el estado de éxito con el objeto resultante de la actualización
  res.json({
    mensaje: 'Proyecto actualizado correctamente',
    proyecto: proyectoActualizado
  });
});

// 5. DELETE /api/proyectos/:id: Eliminar un proyecto del sistema a través de su ID.
app.delete('/api/proyectos/:id', (req, res) => {
  const idBuscado = parseInt(req.params.id, 10);

  // Verificamos si el elemento existe en la colección antes de realizar la exclusión
  const existe = proyectos.some(p => p.id === idBuscado);

  if (!existe) {
    return res.status(404).json({
      error: 'Proyecto no encontrado',
      mensaje: `No se puede eliminar el proyecto con ID ${idBuscado} porque no existe registrado.`
    });
  }

  // Filtramos la base de datos para excluir el elemento que coincide con el ID
  proyectos = proyectos.filter(p => p.id !== idBuscado);

  // Retornamos confirmación exitosa al cliente
  res.json({
    mensaje: 'Proyecto eliminado con éxito',
    idEliminado: idBuscado
  });
});

/**
 * ============================================================================
 * RUTA DEFAULT Y MANEJO DE ERRORES GLOBAL
 * ============================================================================
 */

// Ruta raíz del servidor para verificar que el servicio está activo
app.get('/', (req, res) => {
  res.send(`
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
      <h2 style="color: #2563eb; margin-top: 0;">🚀 Servidor API REST Iniciado Correctamente</h2>
      <p style="color: #475569; font-size: 14px;">La API de gestión de proyectos se encuentra en línea y lista para recibir peticiones.</p>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
      <h3 style="color: #1e293b; font-size: 15px;">Endpoints Disponibles:</h3>
      <ul style="font-family: monospace; font-size: 13px; color: #0f172a; line-height: 1.6;">
        <li><strong>GET</strong> /api/proyectos</li>
        <li><strong>GET</strong> /api/proyectos/:id</li>
        <li><strong>POST</strong> /api/proyectos</li>
        <li><strong>PUT</strong> /api/proyectos/:id</li>
        <li><strong>DELETE</strong> /api/proyectos/:id</li>
      </ul>
      <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">Diplomado IA Generativa • Camilo Andrés Caraballo</p>
    </div>
  `);
});

// Inicializamos el servidor en el puerto configurado
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Servidor API REST escuchando activamente`);
  console.log(`   Host local: http://localhost:${PORT}`);
  console.log(`======================================================\n`);
});
