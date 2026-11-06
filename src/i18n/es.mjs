// Spanish (website-languages). Informal "tú", as the app's own Spanish does.
// `home` has the shape of src/i18n/en.mjs (website-home-languages).
export default {
  common: {
    langNote: 'Esta página está en español, y la aplicación también: el idioma se elige en sus ajustes, y la entrada rápida entiende fechas y horas en español. El resto de este sitio y la documentación están en inglés.',
  },
  home: {
    title: 'OpenTodo · Una lista de tareas tranquila en tu propio servidor',
    description: 'OpenTodo es una lista de tareas libre y de código abierto que ejecutas en tu propio servidor: Hoy te dice qué importa, {count} funciones sin planes de pago, sin conexión en cada dispositivo, compartida con las personas con las que vives y trabajas, y la IA solo en tus términos.',
    hero: {
      eyebrow: 'Libre y de código abierto · {licence}',
      say: 'Hoy importan tres cosas.',
      late: 'Dos tareas van con retraso,',
      soft: 'el lunes ya está completo y Mia ha respondido a tu pregunta sobre el viaje.',
      caption: 'Así empieza Hoy en OpenTodo: una frase sobre lo que destaca, calculada en tu dispositivo.',
      ledeStrong: 'OpenTodo es una lista de tareas tranquila que funciona en tu propio servidor.',
      lede: 'Planifica tu día, mantén tus proyectos en orden y comparte listas con las personas con las que vives y trabajas.',
      tryDemo: 'Probar la demo',
      getStarted: 'Empezar',
      note: 'Sin cuenta, sin instalar nada.',
      alt: 'La vista Hoy de OpenTodo: la frase sobre el día bajo el título y, debajo, las tareas en una línea cada una, con sus fechas, proyectos y etiquetas en columnas alineadas.',
    },
    day: {
      h2: 'Tu día, tus proyectos, una sola pantalla tranquila.',
      rows: [
        { title: 'Hoy te dice qué importa', text: 'Una frase bajo la fecha nombra lo que va con retraso, lo que está completo y quién ha respondido, y cada parte abre lo que nombra. Lo calcula tu dispositivo, sin conexión y sin IA.', prop: 'Hoy, Próximo' },
        { title: 'Escríbelo como lo dirías', text: '«Llamar al fontanero el viernes a las 10 #Casa p1» se convierte en una tarea con su fecha, proyecto y prioridad, en seis idiomas.', prop: 'En todas partes' },
        { title: 'Proyectos como lista, tablero o cronología', text: 'Secciones, fechas límite y progreso de un vistazo. Comparte un proyecto y asigna sus tareas a las personas que forman parte de él.', prop: 'Proyectos' },
      ],
      quickAlt: 'El añadido rápido muestra la fecha, el proyecto, la etiqueta y la prioridad que ha reconocido en una línea escrita.',
      quickCaption: 'El añadido rápido muestra lo que ha entendido.',
      boardAlt: 'Un proyecto compartido como tablero, con las columnas Backlog, This week y Review.',
      boardCaption: 'Un proyecto compartido como tablero.',
    },
    features: {
      h2: 'Todo incluido.',
      intro: '{count} funciones en {groups} grupos, y las integraciones que ya usas. Nada se reserva para un plan de pago.',
      pill: 'Sin planes',
      noTiers: 'Todas las funciones, para todo el mundo.',
      all: 'Todas las funciones, con su documentación',
      more: 'y {count} más',
      connects: 'Se conecta con',
      imports: 'Importa desde',
      groups: { plan: 'Planificar', capture: 'Capturar', projects: 'Proyectos y equipos', devices: 'Sincronización y dispositivos', integrations: 'Integraciones', admin: 'Privacidad y administración' },
    },
    yours: {
      h2: 'Tuyo, para siempre.',
      intro: 'Sin cuenta de OpenTodo y sin nube de OpenTodo. Un solo servidor para todas las personas con las que <a href="/docs/sharing/">compartes listas</a>, y puedes <a href="/docs/import-export/">irte con todo</a> cuando quieras.',
      rows: [
        { title: 'Gratis, todo', text: 'Sin planes, sin licencias por usuario, sin periodo de prueba: todas las funciones para todas las personas de tu servidor, toda la casa incluida.', link: 'Lo que cuesta' },
        { title: 'En tu servidor', text: 'Un contenedor y una carpeta de datos. Basta una Raspberry Pi o el servidor de alquiler más pequeño.', link: 'Alojarlo tú' },
        { title: 'Funciona sin conexión', text: 'Cada dispositivo guarda una copia completa. Edita en el tren; al volver, los cambios se combinan campo a campo.', link: 'Sin conexión y sincronización' },
        { title: 'Cifrado, si quieres', text: 'Con el cifrado de extremo a extremo, el texto de las tareas se cifra en tus dispositivos antes de llegar al servidor.', link: 'Cifrado' },
        { title: 'La IA en tus términos', text: 'Apagada hasta que tú la enciendas. Tu modelo, también local; el asistente propone cambios que tú apruebas, y cada cambio se puede deshacer. Tus propias herramientas de IA se conectan por MCP o con el plugin de Claude Code con un token de agente.', link: 'Cómo funciona' },
      ],
    },
    ways: {
      h2: 'Tres formas de entrar.',
      intro: 'OpenTodo no se ofrece como servicio alojado, así que aquí no hay nada en lo que registrarse. Más adelante puedes pasar de una a otra; tus datos van contigo.',
      items: [
        { title: 'Probar la demo', text: 'Un entorno privado en tu navegador con proyectos de ejemplo, que se borra tras dos horas sin actividad.', cta: 'Abrir la demo', more: 'Cómo funciona la demo' },
        { title: 'Unirte a un servidor', text: '¿Alguien lo mantiene para tu casa o tu equipo? Abre el enlace de invitación que te ha enviado y después instala la aplicación desde el navegador.', cta: 'Instalar la aplicación', more: 'Instalar la aplicación' },
        { title: 'Monta el tuyo', text: 'Docker, Umbrel, Unraid, TrueNAS, una Pi o un VPS, en unos veinte minutos la primera vez.', cta: 'Alojarlo tú', more: 'Planifica tu servidor' },
      ],
      switch: '¿Vienes de Todoist, Things, TickTick o Linear?',
      switchLink: 'Llévate tus tareas',
    },
    community: {
      kicker: 'Comunidad',
      h2: 'Pasa a saludar.',
      intro: 'OpenTodo se hace a la vista de todos, y quienes lo usan deciden lo que viene después. Únete a nosotros en Discord: haz una pregunta, enséñanos cómo organizas tus días o cuéntanos qué te gustaría que hiciera. Responden a las preguntas personas que lo tienen en marcha y el mantenedor.',
      button: 'Únete a nosotros en Discord',
    },
    end: {
      h2: 'Pruébalo primero, y luego hazlo tuyo.',
      news: 'Noticias, versiones y cómo se hace',
      allPosts: 'Todas las entradas',
      star: 'Dale una estrella a OpenTodo en GitHub',
    },
  },
};
