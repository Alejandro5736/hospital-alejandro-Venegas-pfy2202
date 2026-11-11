# 📚 Tienda de Libros Online - Integración REST con MSW (Semana 4)

Aplicación web desarrollada en **React** que simula la integración entre un frontend moderno y un backend de tipo **REST** utilizando la librería **Mock Service Worker (MSW)**. Este proyecto corresponde a la Actividad Formativa de la Semana 4 de la asignatura **Desarrollo Frontend II**.

## 🚀 Características Principales

* **Integración REST con MSW:** Interceptación de peticiones HTTP (`GET /api/books`) a nivel de navegador con Service Worker, simulando un backend real sin necesidad de servidor físico.
* **Filtro y Navegación por Categorías:** Navegación por rutas dinámicas a través de **React Router DOM** (`/books/:genre`) para explorar categorías como *Ficción*, *Ciencia Ficción* y *Drama*.
* **Simulación de Latencia de Red:** Implementación de retardos temporales artificiales (`delay(1000)`) para imitar el tiempo de respuesta real de un servidor.
* **Manejo de Estados y Errores:** Control de estado de carga (*loading*) y manejo de errores HTTP (respuestas 404 y categorias sin resultados disponibles).
* **Interfaz Limpia y Adaptativa:** Estilizado modular con CSS para una presentación visual atractiva de los libros, sus autores y precios.

## 🛠️ Tecnologías Utilizadas

* **React** (v18+)
* **React Router DOM** (v6)
* **Mock Service Worker (MSW)** (v2+)
* **JavaScript (ES6+)**
* **CSS3**

## 📂 Estructura del Proyecto

El código fuente se encuentra organizado de forma modular dentro de la carpeta `src/`:

```text
src/
├── mocks/
│   ├── browser.js    # Configuración del Service Worker de MSW para el navegador
│   └── handlers.js   # Interceptores y respuestas mock de la API REST (/api/books)
├── App.css           # Estilos generales de la aplicación
├── App.js            # Componente principal, enrutamiento (React Router) y llamadas fetch
├── index.css         # Estilos globales de entrada
└── index.js          # Inicialización asíncrona de MSW y renderizado de React