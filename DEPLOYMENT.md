# Guía de Despliegue y Ejecución de la Plataforma DevHub FP v2.0

Esta guía describe cómo ejecutar el entorno de desarrollo y realizar el despliegue a producción de la plataforma **DevHub FP** con sus 8 motores de ejecución (Pyodide WASM, sql.js, solc-js, TypeScript Compiler y Piston Sandbox API).

---

## 🚀 Requisitos Previos

- **Node.js**: v18.0.0 o superior (opcional para scripts de empaquetado).
- **Python**: 3.8+ (opcional para servidor dev local `python -m http.server`).
- **Navegador Web Moderno**: Chrome, Edge, Firefox o Safari con soporte WebAssembly (WASM).

---

## 🛠️ Ejecución en Entorno Local (Desarrollo)

### Opción A: Servidor Dev con Python (Recomendado)
```bash
# Iniciar el servidor web local en el puerto 8080
python -m http.server 8080
```
Luego abre tu navegador en: `http://localhost:8080/`

### Opción B: npm start / npx serve
```bash
# Instalar dependencias si se desea servir vía Node
npm install
npm start
```

---

## 🌐 Despliegue en Producción

### 1. Despliegue en Vercel (Recomendado)
1. Instala Vercel CLI o vincula tu repositorio de GitHub con [Vercel](https://vercel.com).
2. Ejecuta en la raíz del proyecto:
   ```bash
   vercel --prod
   ```
3. No requiere compilación backend adicional ya que la capa WASM ejecuta Python, SQL, Solidity y TypeScript directamente en el cliente, y C++, Rust, Java utilizan la API Sandbox de Piston.

### 2. Despliegue en Netlify / GitHub Pages
1. Sube el contenido a la rama `main` o `gh-pages`.
2. Configura el directorio raíz (`./`) como directorio público estático.
3. Asegúrate de incluir los encabezados CORS en las peticiones si alojas en dominios personalizados.

---

## 🧪 Verificación de Motores de Ejecución

- **Python (Pyodide WASM):** Carga bajo demanda la librería WASM de Pyodide v0.25.0 directamente desde CDN CDNJS/jsDelivr.
- **SQL (sql.js):** Carga la base de datos en memoria SQLite WASM.
- **Solidity (solc-js):** Valida la sintaxis EVM y genera el ABI/Bytecode en el cliente.
- **C++, Rust, Java, Node.js:** Envían peticiones HTTP POST seguras a la API de Piston (`https://emkc.org/api/v2/piston/execute`) con un tiempo límite de ejecución de 5 segundos.

---

## 📦 Estructura del Proyecto

```
Cursos Prueba de FP/
├── index.html            # Layout Principal, Split View y Estructura Modular
├── styles.css            # Sistema de Diseño CSS, Temas Oscuros, Terminal & Split View
├── script.js             # Controlador de Interfaz, Quizzes y Persistencia localStorage
├── execution-engine.js   # Capa de Ejecución Multimotor (WASM + Piston Sandbox API)
├── courses-data.json     # Base de Datos Curricular (8 Lenguajes x 3 Niveles)
├── package.json          # Configuración del proyecto y dependencias
└── DEPLOYMENT.md         # Guía de despliegue y desarrollo
```
