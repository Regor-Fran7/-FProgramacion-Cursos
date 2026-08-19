/* ==========================================================================
   DEVHUB FP - INTERACTIVE JAVASCRIPT LOGIC
   Features: 8 Languages Hub, Syntax Viewer, Grade Calculator, Quiz Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize All Subsystems
    initUserProfileSystem();
    initDocenteAdminToggle();
    initMisCursosSystem();
    initLanguagesGrid();
    initFilterSystem();
    initPdfCatalogEngine();
    initCodeViewer();
    initGradeCalculator();
    initQuizEngine();
    initTabNavigationSystem();
    initPracticeModalSystem();
    initThemeSwitcherSystem();
    initCertificateModalEvents();
    initShareLinkModalEvents();
});

/* ==========================================================================
   1. LANGUAGES DATA & GRID RENDERING (8 Languages)
   ========================================================================== */
const LANGUAGES_DATA = [
    {
        id: 'python',
        name: 'Python',
        icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M11.898 0C5.89 0 6.27 2.618 6.27 2.618l.006 2.712h5.728v.816H3.973S0 5.67 0 11.758c0 6.088 3.454 5.877 3.454 5.877l2.062-.001v-2.91c0-3.328 2.859-3.23 2.859-3.23h5.666s2.697.043 2.697-2.618V3.053S17.18 0 11.898 0zm-3.23 1.834a1.009 1.009 0 1 1 0 2.018 1.009 1.009 0 0 1 0-2.018zM12.102 24c6.008 0 5.628-2.618 5.628-2.618l-.006-2.712h-5.728v-.816h8.031S24 18.33 24 12.242c0-6.088-3.454-5.877-3.454-5.877l-2.062.001v2.91c0 3.328-2.859 3.23-2.859 3.23h-5.666s-2.697-.043-2.697 2.618v5.88S6.82 24 12.102 24zm3.23-1.834a1.009 1.009 0 1 1 0-2.018 1.009 1.009 0 0 1 0 2.018z"/></svg>`,
        category: 'backend',
        tag: 'IA & Data Science',
        color: '#38bdf8',
        desc: 'Lenguaje de programación de alto nivel conocido por su sintaxis limpia y legibilidad. Es el estándar de la industria para Inteligencia Artificial y Ciencia de Datos.',
        features: ['Sintaxis limpia y fácil', 'Librerías masivas (Pandas, PyTorch)', 'Ideal para scripts y automatización']
    },
    {
        id: 'cpp',
        name: 'C++',
        icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M22.25 10.75h-1.5v-1.5h-1.5v1.5h-1.5v1.5h1.5v1.5h1.5v-1.5h1.5v-1.5zm-5.5 0h-1.5v-1.5h-1.5v1.5h-1.5v1.5h1.5v1.5h1.5v-1.5h1.5v-1.5zM10.82 5.56a6.44 6.44 0 0 0-4.57 1.9 6.47 6.47 0 0 0 0 9.08 6.44 6.44 0 0 0 4.57 1.9c1.47 0 2.87-.5 3.97-1.42l-1.39-1.39a4.42 4.42 0 0 1-2.58.82 4.47 4.47 0 0 1-3.16-1.31 4.48 4.48 0 0 1 0-6.31 4.47 4.47 0 0 1 3.16-1.31c.98 0 1.91.32 2.58.82l1.39-1.39a6.4 6.4 0 0 0-3.97-1.39z"/></svg>`,
        category: 'sistemas',
        tag: 'Rendimiento Extremo',
        color: '#0066ff',
        desc: 'Lenguaje compilado de alto rendimiento con control directo sobre la memoria hardware. Utilizado en motores de videojuegos, sistemas operativos y sistemas embebidos.',
        features: ['Gestión manual de memoria (Punteros)', 'Compilación a código máquina', 'Velocidad de ejecución máxima']
    },
    {
        id: 'rust',
        name: 'Rust',
        icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0zm0 3.2a8.8 8.8 0 1 1-8.8 8.8 8.81 8.81 0 0 1 8.8-8.8zm-3.6 4.8v8h2.4v-2.8h1.2l1.8 2.8h2.8l-2.2-3.3a2.7 2.7 0 0 0 1.8-2.5c0-1.5-1.1-2.2-3.1-2.2zm2.4 2.1h1.5c.7 0 1.1.3 1.1.9 0 .6-.4.9-1.1.9H10.8z"/></svg>`,
        category: 'sistemas',
        tag: 'Seguridad en Memoria',
        color: '#60a5fa',
        desc: 'Lenguaje de sistemas moderno enfocado en la seguridad, velocidad y concurrencia. Evita errores de memoria sin necesidad de un recolector de basura (Garbage Collector).',
        features: ['Sistema de Ownership (Propiedad)', 'Garantía de concurrencia sin carreras', 'Compilador súper riguroso']
    },
    {
        id: 'node',
        name: 'Node.js',
        icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 0L1.75 5.92v12.16L12 24l10.25-5.92V5.92L12 0zm6.8 16.48l-6.8 3.92-6.8-3.92V7.52l6.8-3.92 6.8 3.92v8.96z"/></svg>`,
        category: 'backend',
        tag: 'Servidor Asíncrono',
        color: '#38bdf8',
        desc: 'Entorno de ejecución de JavaScript del lado del servidor. Permite construir servicios web escalables y APIs REST en tiempo real usando un modelo impulsado por eventos.',
        features: ['Event Loop no bloqueante (E/S async)', 'Ecosistema gigante NPM', 'Mismo lenguaje en Frontend y Backend']
    },
    {
        id: 'java',
        name: 'Java',
        icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M8.851 18.56s-.917.534.667.718c1.745.195 3.332.181 5.759-.262 0 0 .584.348 1.252.617-2.673.83-6.529.742-8.587.218-.954-.243-1.077-.735.909-1.291zm-1.07-2.316s-1.107.715.485.907c1.947.235 4.708.261 7.848-.152 0 0 .467.319 1.054.524-3.528.877-8.472.784-10.457.172-1.042-.321-.734-.969 1.07-1.451zm7.842-4.084c.594.679.034 1.341-1.055 1.954-1.921 1.078-4.708 1.692-7.854 1.692-1.393 0-2.454-.107-2.454-.107s.484-.374 1.291-.588c2.257.213 4.965.134 7.027-.374.834-.206 1.706-.554 1.706-.991 0-.67-1.011-.945-2.023-1.121 0 0 .319-.481.718-.748 1.674.348 2.644.829 2.644 1.683zm-11.83 5.485c2.955.776 7.644.75 10.366.187.97-.201 1.761-.561 1.761-.99 0-.616-.838-.934-1.676-1.122 0 0 .319-.48.718-.747 1.674.347 2.644.829 2.644 1.683 0 1.258-1.573 1.954-3.585 2.37-3.238.67-8.62.616-11.758-.16 0 0 .553-.787 1.53-1.221z"/></svg>`,
        category: 'backend',
        tag: 'Enterprise & POO',
        color: '#2563eb',
        desc: 'Lenguaje robusto orientado a objetos puro. Funciona bajo el principio "Escribe una vez, ejecútalo en cualquier lugar" gracias a la máquina virtual de Java (JVM).',
        features: ['Máxima portabilidad con JVM', 'Fuerte orientación a objetos (POO)', 'Estándar bancario y empresarial']
    },
    {
        id: 'sql',
        name: 'SQL',
        icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 2C6.48 2 2 4.02 2 6.5v11C2 19.98 6.48 22 12 22s10-2.02 10-4.5v-11C22 4.02 17.52 2 12 2zm0 3c4.41 0 8 1.34 8 3s-3.59 3-8 3-8-1.34-8-3 3.59-3 8-3zm0 14c-4.41 0-8-1.34-8-3v-2.35c1.83 1.15 4.75 1.85 8 1.85s6.17-.7 8-1.85V16c0 1.66-3.59 3-8 3zm0-5.5c-4.41 0-8-1.34-8-3V8.15c1.83 1.15 4.75 1.85 8 1.85s6.17-.7 8-1.85V10.5c0 1.66-3.59 3-8 3z"/></svg>`,
        category: 'backend',
        tag: 'Bases de Datos',
        color: '#0066ff',
        desc: 'Lenguaje declarativo estándar para la gestión, consulta y manipulación de datos en sistemas de bases de datos relacionales (RDBMS como PostgreSQL y MySQL).',
        features: ['Consultas estructuradas (SELECT, JOIN)', 'Integridad referencial y ACID', 'Fundamento para todo backend']
    },
    {
        id: 'typescript',
        name: 'TypeScript',
        icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm16.518 10.605c.87 0 1.557.24 2.06.72.504.48.777 1.168.818 2.064h-1.92a1.35 1.35 0 0 0-.414-.852c-.225-.216-.546-.324-.963-.324-.396 0-.71.096-.942.288-.23.192-.346.438-.346.738 0 .228.07.414.21.558.14.144.336.26.588.348.252.09.588.18 1.008.27.708.156 1.272.33 1.692.522.42.192.76.456 1.02.792.258.336.388.762.388 1.278 0 .84-.3 1.512-.9 2.016-.6.504-1.446.756-2.538.756-1.02 0-1.812-.258-2.376-.774-.564-.516-.87-1.254-.918-2.214h1.968c.048.516.222.9.522 1.152.3.252.72.378 1.26.378.432 0 .786-.096 1.062-.288.276-.192.414-.462.414-.81 0-.252-.072-.456-.216-.612-.144-.156-.348-.282-.612-.378a10.02 10.02 0 0 0-1.032-.288c-.684-.156-1.23-.33-1.638-.522a2.82 2.82 0 0 1-.978-.774c-.246-.336-.369-.768-.369-1.296 0-.816.294-1.47.882-1.962.588-.492 1.404-.738 2.448-.738zm-6.84 0v1.752h-2.736v9.792H6.069v-9.792H3.333V10.6h7.47z"/></svg>`,
        category: 'modern',
        tag: 'JS con Tipado Estático',
        color: '#38bdf8',
        desc: 'Superconjunto tipado de JavaScript desarrollado por Microsoft. Añade tipos estáticos opcionales para evitar errores en tiempo de desarrollo en proyectos grandes.',
        features: ['Detección de errores al compilar', 'Excelente autocompletado e IntelliSense', 'Compila a JavaScript limpio']
    },
    {
        id: 'solidity',
        name: 'Solidity',
        icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 0l-6 10.392L12 20.785l6-10.393L12 0zm0 3.464l3.999 6.928H8.001L12 3.464zM6 13.856l6 3.464 6-3.464L12 24 6 13.856z"/></svg>`,
        category: 'modern',
        tag: 'Web3 & Smart Contracts',
        color: '#818cf8',
        desc: 'Lenguaje orientado a contratos inteligentes de la Ethereum Virtual Machine (EVM). Es el pilar fundamental del desarrollo de aplicaciones descentralizadas (DApps) y DeFi.',
        features: ['Desarrollo de Smart Contracts', 'Ejecución en Blockchain Ethereum', 'Manejo directo de criptoactivos']
    }
];

function navigateToMisCursos(langId) {
    if (typeof isLanguageUnlocked === 'function' && !isLanguageUnlocked(langId)) {
        const idx = LANGUAGE_PROGRESSION_SEQUENCE.findIndex(l => l.id === langId);
        const prevLang = LANGUAGE_PROGRESSION_SEQUENCE[idx - 1];
        if (typeof showToast === 'function') {
            showToast(`🔒 Lenguaje Bloqueado: Debes completar los 3 cursos de ${prevLang ? prevLang.name : 'el lenguaje anterior'} primero.`, 'error');
        }
        return;
    }

    currentCourseLang = langId;
    
    const langSelect = document.getElementById('course-lang-select');
    if (langSelect) langSelect.value = langId;

    window.location.hash = '#mis-cursos';
    if (typeof switchView === 'function') {
        switchView('mis-cursos');
    }
    
    if (typeof renderMisCursosModule === 'function') {
        renderMisCursosModule();
    }

    if (typeof showToast === 'function') {
        const seqItem = typeof LANGUAGE_PROGRESSION_SEQUENCE !== 'undefined' ? LANGUAGE_PROGRESSION_SEQUENCE.find(l => l.id === langId) : null;
        showToast(`🎓 Navegando a Mis Cursos de ${seqItem ? seqItem.name : langId}`, 'info');
    }
}
window.navigateToMisCursos = navigateToMisCursos;

function initLanguagesGrid() {
    const grid = document.getElementById('languages-grid');
    if (!grid) return;

    grid.innerHTML = LANGUAGES_DATA.map(lang => {
        const unlocked = typeof isLanguageUnlocked === 'function' ? isLanguageUnlocked(lang.id) : true;
        const completedCount = typeof getLanguageCompletedCount === 'function' ? getLanguageCompletedCount(lang.id) : 0;
        const isLocked = !unlocked;

        return `
        <div class="lang-card ${isLocked ? 'locked-card' : ''}" data-category="${lang.category}" style="--card-accent: ${lang.color};">
            <div class="lang-card-header">
                <span class="lang-card-icon">${lang.icon}</span>
                <span class="lang-card-tag">${isLocked ? '🔒 Bloqueado' : lang.tag}</span>
            </div>
            <h3 class="lang-card-title">${lang.name}</h3>
            <p class="lang-card-desc">${lang.desc}</p>
            <ul class="lang-card-features">
                ${lang.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
            <div style="margin-top: auto; display: flex; flex-direction: column; gap: 8px; width: 100%;">
                <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-align: center;">
                    Progreso: ${completedCount} / 3 Cursos
                </div>
                ${isLocked ? `
                    <button class="btn btn-secondary btn-sm" onclick="navigateToMisCursos('${lang.id}')" style="opacity: 0.7; width: 100%;">
                        🔒 Bloqueado (Ver Requisitos)
                    </button>
                ` : `
                    <button class="btn btn-primary btn-sm" style="width: 100%;" onclick="navigateToMisCursos('${lang.id}')">
                        🚀 Cursos de ${lang.name}
                    </button>
                `}
            </div>
        </div>
    `;
    }).join('');
}

function initFilterSystem() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            const cards = document.querySelectorAll('.lang-card');

            cards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ==========================================================================
   2. CODE VIEWER & COMPARATOR ENGINE
   ========================================================================== */
const CODE_DATABASE = {
    python: {
        filename: 'app.py',
        hello: {
            code: `# Python - Hola Mundo
print("¡Hola Estudiantes de FP!")
print("Python es fácil, limpio y potente.")`,
            exp: 'La función print() muestra texto en la consola de manera directa sin necesidad de configurar clases o módulos.'
        },
        variables: {
            code: `# Python - Variables y Tipos de Datos
nombre = "Carlos"        # String (cadena)
edad = 20                # Integer (entero)
promedio = 8.75          # Float (decimal)
es_estudiante = True     # Boolean (booleano)

print(f"Estudiante: {nombre}, Nota: {promedio}")`,
            exp: 'Python utiliza tipado dinámico: no es necesario declarar explícitamente el tipo de dato de las variables.'
        },
        loops: {
            code: `# Python - Condicionales y Bucles
notas = [7.5, 9.0, 6.0, 8.5]

for nota in notas:
    if nota >= 6.0:
        print(f"Nota {nota}: Aprobado 🎉")
    else:
        print(f"Nota {nota}: Reprobado 📚")`,
            exp: 'El bucle for...in recorre elementos de una lista y los bloques se definen mediante sangría/indentación.'
        },
        functions: {
            code: `# Python - Funciones
def calcular_promedio(lista_notas):
    suma = sum(lista_notas)
    return suma / len(lista_notas)

resultado = calcular_promedio([8, 9, 10])
print(f"Promedio: {resultado:.2f}")`,
            exp: 'Las funciones se definen con def. sum() y len() son funciones nativas integradas en Python.'
        }
    },
    cpp: {
        filename: 'main.cpp',
        hello: {
            code: `// C++ - Hola Mundo
#include <iostream>

int main() {
    std::cout << "¡Hola Estudiantes de FP!" << std::endl;
    return 0;
}`,
            exp: 'std::cout pertenece a la librería <iostream> y se usa para emitir salida de texto por consola.'
        },
        variables: {
            code: `// C++ - Tipos de Datos Estáticos
#include <iostream>
#include <string>

int main() {
    std::string nombre = "Carlos";
    int edad = 20;
    double promedio = 8.75;
    bool aprobado = true;

    std::cout << nombre << " tiene promedio " << promedio << std::endl;
    return 0;
}`,
            exp: 'C++ requiere especificar el tipo exacto (int, double, std::string) de cada variable antes de usarla.'
        },
        loops: {
            code: `// C++ - Bucle For Tradicional
#include <iostream>

int main() {
    double notas[4] = {7.5, 9.0, 6.0, 8.5};
    
    for(int i = 0; i < 4; i++) {
        if(notas[i] >= 6.0) {
            std::cout << "Nota: " << notas[i] << " Aprobado\n";
        }
    }
    return 0;
}`,
            exp: 'Los bucles for en C++ usan índices iniciales, condiciones de parada e incrementos (i++).'
        },
        functions: {
            code: `// C++ - Funciones
#include <iostream>

double calcularPromedio(double a, double b) {
    return (a + b) / 2.0;
}

int main() {
    double res = calcularPromedio(8.0, 9.5);
    std::cout << "Resultado: " << res << std::endl;
    return 0;
}`,
            exp: 'Cada función en C++ especifica el tipo de retorno (double) y el tipo de cada parámetro de entrada.'
        }
    },
    rust: {
        filename: 'main.rs',
        hello: {
            code: `// Rust - Hola Mundo
fn main() {
    println!("¡Hola Estudiantes de FP desde Rust!");
}`,
            exp: 'println! en Rust es una macro (identificada por el signo !) que formatea e imprime texto en consola.'
        },
        variables: {
            code: `// Rust - Inmutabilidad por Defecto
fn main() {
    let nombre = "Carlos"; // Inmutable por defecto
    let mut nota = 8.5;    # Mutable con la palabra 'mut'
    nota = 9.0;

    println!("Estudiante {} tiene nota {}", nombre, nota);
}`,
            exp: 'En Rust las variables son inmutables por defecto. Se requiere declarar mut si cambiará su valor.'
        },
        loops: {
            code: `// Rust - Bucles e Iteración Segura
fn main() {
    let notas = [7.5, 9.0, 6.0, 8.5];

    for nota in notas.iter() {
        if *nota >= 6.0 {
            println!("Nota {}: Aprobado", nota);
        }
    }
}`,
            exp: 'El iterador .iter() permite recorrer arreglos garantizando la seguridad en el acceso a memoria.'
        },
        functions: {
            code: `// Rust - Funciones con Retorno Explícito
fn calcular_promedio(n1: f64, n2: f64) -> f64 {
    (n1 + n2) / 2.0  // Sin punto y coma es la expresión de retorno
}

fn main() {
    let res = calcular_promedio(8.0, 9.0);
    println!("Promedio Rust: {}", res);
}`,
            exp: 'El tipo de retorno se indica con -> f64. La última línea sin punto y coma actúa como valor retornado.'
        }
    },
    node: {
        filename: 'server.js',
        hello: {
            code: `// Node.js - Hola Mundo
console.log("¡Hola Estudiantes de FP desde Node.js!");
console.log("Servidor ejecutándose en V8 Engine.");`,
            exp: 'console.log() imprime en la terminal del servidor utilizando el motor de Google V8.'
        },
        variables: {
            code: `// Node.js / JS Moderno - Variables ES6
const nombre = "Carlos";  // Constante
let nota = 8.5;          // Variable reasignable

console.log(\`Estudiante: \${nombre}, Nota: \${nota}\`);`,
            exp: 'const evita reasignaciones involuntarias. Template literals con \` e intercalación \${} facilitan formatear strings.'
        },
        loops: {
            code: `// Node.js - Métodos de Arreglo (forEach)
const notas = [7.5, 9.0, 6.0, 8.5];

notas.forEach(nota => {
    const estado = nota >= 6.0 ? "Aprobado" : "Reprobado";
    console.log(\`Nota \${nota}: \${estado}\`);
});`,
            exp: '.forEach() con arrow functions (() => {}) es la forma funcional de iterar colecciones en JavaScript.'
        },
        functions: {
            code: `// Node.js - Funciones Asíncronas (Async/Await)
const obtenerPromedio = async (notas) => {
    const suma = notas.reduce((acc, curr) => acc + curr, 0);
    return suma / notas.length;
};

obtenerPromedio([8, 9, 10]).then(res => console.log(\`Promedio Async: \${res}\`));`,
            exp: 'async/await y promesas son el pilar de Node.js para operaciones no bloqueantes como llamadas a bases de datos.'
        }
    },
    java: {
        filename: 'Main.java',
        hello: {
            code: `// Java - Hola Mundo
public class Main {
    public static void main(String[] args) {
        System.out.println("¡Hola Estudiantes de FP desde Java!");
    }
}`,
            exp: 'Todo el código en Java debe residir dentro de una clase. El método main es el punto de entrada ejecutable.'
        },
        variables: {
            code: `// Java - Variables Tipadas
public class Main {
    public static void main(String[] args) {
        String nombre = "Carlos";
        int edad = 20;
        double promedio = 8.75;
        
        System.out.println("Alumno: " + nombre + " | Nota: " + promedio);
    }
}`,
            exp: 'Java es estrictamente tipado. Las cadenas usan String (clase) y las notas decimales usal double (primitivo).'
        },
        loops: {
            code: `// Java - For-Each Loop
public class Main {
    public static void main(String[] args) {
        double[] notas = {7.5, 9.0, 6.0, 8.5};
        
        for (double nota : notas) {
            if (nota >= 6.0) {
                System.out.println("Nota " + nota + ": Aprobado");
            }
        }
    }
}`,
            exp: 'El bucle for (double nota : notas) recorre de forma limpia cada elemento del arreglo de calificaciones.'
        },
        functions: {
            code: `// Java - Métodos Estáticos
public class Main {
    public static double calcularPromedio(double n1, double n2) {
        return (n1 + n2) / 2.0;
    }

    public static void main(String[] args) {
        double res = calcularPromedio(8.5, 9.5);
        System.out.println("Promedio: " + res);
    }
}`,
            exp: 'Los métodos estáticos pertenecen a la clase y pueden llamarse sin instanciar la clase previamente.'
        }
    },
    sql: {
        filename: 'consultas.sql',
        hello: {
            code: `-- SQL - Creación de Tabla y Mensaje
CREATE TABLE estudiantes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    nota DECIMAL(4,2)
);

SELECT '¡Hola Estudiantes de FP!' AS mensaje;`,
            exp: 'SQL manipula datos relacionales. SELECT permite realizar consultas y devolver conjuntos de resultados.'
        },
        variables: {
            code: `-- SQL - Inserción de Datos y Tipos
INSERT INTO estudiantes (nombre, nota) 
VALUES ('Carlos', 8.75), ('Ana', 9.20), ('Pedro', 5.50);

SELECT * FROM estudiantes WHERE nota >= 6.0;`,
            exp: 'INSERT INTO agrega filas a la tabla y la cláusula WHERE filtra las filas según una condición dada.'
        },
        loops: {
            code: `-- SQL - Consultas Condicionales con CASE
SELECT 
    nombre,
    nota,
    CASE 
        WHEN nota >= 6.0 THEN 'APROBADO'
        ELSE 'REPROBADO'
    END AS estado
FROM estudiantes;`,
            exp: 'En SQL no hay bucles tradicionales; en su lugar se usa CASE WHEN para evaluar condiciones fila por fila.'
        },
        functions: {
            code: `-- SQL - Funciones de Agregación
SELECT 
    COUNT(*) AS total_alumnos,
    AVG(nota) AS promedio_general,
    MAX(nota) AS nota_maxima
FROM estudiantes;`,
            exp: 'AVG() calcula la media, COUNT() cuenta los registros y MAX() obtiene el valor máximo de la columna seleccionada.'
        }
    },
    typescript: {
        filename: 'app.ts',
        hello: {
            code: `// TypeScript - Hola Mundo Tipado
const mensaje: string = "¡Hola Estudiantes de FP con TypeScript!";
console.log(mensaje);`,
            exp: 'La anotación : string asegura que la variable sólo acepte cadenas de texto. El compilador detecta inconsistencias.'
        },
        variables: {
            code: `// TypeScript - Interfaces y Tipos
interface Estudiante {
    nombre: string;
    edad: number;
    promedio: number;
    aprobado?: boolean; // Propiedad opcional
}

const alumno: Estudiante = {
    nombre: "Carlos",
    edad: 20,
    promedio: 8.75
};`,
            exp: 'Las Interfaces definen la estructura formal y tipos de propiedades que un objeto debe cumplir.'
        },
        loops: {
            code: `// TypeScript - Tipado estricto en arreglos
const notas: number[] = [7.5, 9.0, 6.0, 8.5];

const aprobados: number[] = notas.filter((nota: number) => nota >= 6.0);
console.log("Notas Aprobadas:", aprobados);`,
            exp: 'number[] especifica que la lista es un arreglo homogéneo de números. .filter() crea un nuevo arreglo filtrado.'
        },
        functions: {
            code: `// TypeScript - Firmas de Funciones
function calcularPromedio(notas: number[]): number {
    const suma = notas.reduce((acc, curr) => acc + curr, 0);
    return suma / notas.length;
}

const media: number = calcularPromedio([8.5, 9.0, 9.5]);
console.log(\`Promedio TS: \${media.toFixed(2)}\`);`,
            exp: 'Especificar : number al final de la firma indica que la función devuelve obligatoriamente un valor numérico.'
        }
    },
    solidity: {
        filename: 'Estudiantes.sol',
        hello: {
            code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HolaEstudiantes {
    string public mensaje = "¡Hola Estudiantes de FP en Ethereum Web3!";
}`,
            exp: 'pragma solidity indica la versión del compilador. contract define un Smart Contract que se desplegará en la blockchain.'
        },
        variables: {
            code: `// Solidity - Variables de Estado en Blockchain
pragma solidity ^0.8.20;

contract RegistroNota {
    address public propietario;
    uint256 public nota = 85; // Nota multiplicada x100 para evitar decimales
    string public nombreEstudiante = "Carlos";

    constructor() {
        propietario = msg.sender; // Guarda la billetera que despliega
    }
}`,
            exp: 'Las variables de estado persisten permanentemente en la red Ethereum. msg.sender es la dirección de la billetera.'
        },
        loops: {
            code: `// Solidity - Condicionales y Eventos
pragma solidity ^0.8.20;

contract Evaluador {
    event EstudianteEvaluado(string nombre, bool aprobado);

    function evaluarNota(string memory nombre, uint256 nota) public {
        bool aprobado = nota >= 60;
        emit EstudianteEvaluado(nombre, aprobado);
    }
}`,
            exp: 'Los Eventos (emit) notifican a aplicaciones externas (Frontend Web3) sobre cambios ocurridos dentro del contrato.'
        },
        functions: {
            code: `// Solidity - Funciones de Lectura (View)
pragma solidity ^0.8.20;

contract Promedios {
    function calcularMedia(uint256 n1, uint256 n2) public pure returns (uint256) {
        return (n1 + n2) / 2;
    }
}`,
            exp: 'La palabra clave pure indica que la función no lee ni modifica variables de estado en la blockchain, ahorrando gas.'
        }
    }
};

function initCodeViewer() {
    const langSelect = document.getElementById('lang-select');
    const topicSelect = document.getElementById('topic-select');
    const copyBtn = document.getElementById('btn-copy-code');
    const runBtn = document.getElementById('btn-run-code');
    const resetBtn = document.getElementById('btn-reset-code');
    const codeEditor = document.getElementById('code-editor');
    const terminalBody = document.getElementById('terminal-body');
    const statusBadge = document.getElementById('terminal-status-badge');

    if (!langSelect || !topicSelect || !codeEditor) return;

    function updateCodeView() {
        const langKey = langSelect.value;
        const topicKey = topicSelect.value;

        const langData = CODE_DATABASE[langKey];
        if (langData && langData[topicKey]) {
            document.getElementById('window-filename').textContent = langData.filename;
            codeEditor.value = langData[topicKey].code;
            document.getElementById('code-explanation-text').textContent = langData[topicKey].exp;
            
            // Reset terminal prompt
            if (terminalBody && statusBadge) {
                statusBadge.innerHTML = '⚪ Listo para ejecutar';
                statusBadge.style.color = 'var(--text-muted)';
                terminalBody.innerHTML = '<span class="term-dim">Presiona "▶️ Compilar & Ejecutar" arriba para ver la salida de este programa.</span>';
            }
        }
    }

    // Event Listeners for Selects
    langSelect.addEventListener('change', updateCodeView);
    topicSelect.addEventListener('change', updateCodeView);

    // Reset Button Event Listener
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            updateCodeView();
            if (runBtn) runBtn.click();
        });
    }

    // Run / Compile Button Event Listener
    if (runBtn) {
        runBtn.addEventListener('click', () => {
            const langKey = langSelect.value;
            const currentCode = codeEditor.value;

            if (statusBadge) {
                statusBadge.innerHTML = '⏳ Compilando / Ejecutando...';
                statusBadge.style.color = '#f59e0b';
            }

            setTimeout(() => {
                const result = executeCompilerRunner(langKey, currentCode);

                if (terminalBody && statusBadge) {
                    if (result.isError) {
                        statusBadge.innerHTML = `🔴 Error (${result.executionTime}ms)`;
                        statusBadge.style.color = '#f87171';
                    } else {
                        statusBadge.innerHTML = `🟢 Éxito (${result.executionTime}ms)`;
                        statusBadge.style.color = '#34d399';
                    }

                    let outputHtml = result.logs.map(log => {
                        if (log.startsWith('🔴') || log.startsWith('❌')) {
                            return `<div class="term-error">${log}</div>`;
                        } else if (log.startsWith('✅') || log.startsWith('🎉') || log.startsWith('🟢')) {
                            return `<div class="term-success">${log}</div>`;
                        } else {
                            return `<div class="term-log">${log}</div>`;
                        }
                    }).join('');

                    if (result.tableHtml) {
                        outputHtml += result.tableHtml;
                    }

                    terminalBody.innerHTML = outputHtml;
                }
            }, 150);
        });
    }

    // Copy Button Event Listener
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const codeText = codeEditor.value;
            navigator.clipboard.writeText(codeText).then(() => {
                copyBtn.textContent = '✅ ¡Copiado!';
                setTimeout(() => { copyBtn.textContent = '📋 Copiar'; }, 2000);
            });
        });
    }

    // Trigger initial render
    updateCodeView();
}

function executeCompilerRunner(langKey, codeText) {
    const startTime = performance.now();
    const logs = [];
    let isError = false;
    let tableHtml = null;

    if (!codeText || codeText.trim().length === 0) {
        return {
            logs: ['⚠️ El editor está vacío. Escribe algo de código para ejecutar.'],
            isError: true,
            executionTime: 0
        };
    }

    try {
        switch (langKey) {
            case 'node':
            case 'typescript':
            case 'javascript': {
                const originalLog = console.log;
                const originalError = console.error;

                console.log = (...args) => {
                    logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
                };
                console.error = (...args) => {
                    logs.push('❌ [Error] ' + args.join(' '));
                    isError = true;
                };

                try {
                    let executableCode = codeText
                        .replace(/:\s*(string|number|boolean|any|void)(\[\])?/g, '')
                        .replace(/interface\s+\w+\s*\{[\s\S]*?\}/g, '');
                    
                    const runnerFn = new Function(executableCode);
                    runnerFn();

                    if (logs.length === 0) {
                        logs.push('ℹ️ Código ejecutado exitosamente sin salida por consola.');
                    }
                } catch (err) {
                    logs.push(`🔴 Error de Ejecución en Tiempo Real: ${err.message}`);
                    isError = true;
                } finally {
                    console.log = originalLog;
                    console.error = originalError;
                }
                break;
            }

            case 'python': {
                const lines = codeText.split('\n');
                const variables = {};

                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i].trim();
                    if (!line || line.startsWith('#')) continue;

                    if (line.startsWith('print(') && line.endsWith(')')) {
                        const content = line.substring(6, line.length - 1).trim();

                        if (content.startsWith('f"') && content.endsWith('"')) {
                            let str = content.substring(2, content.length - 1);
                            str = str.replace(/\{(\w+)(?::\.2f)?\}/g, (_, varName) => {
                                return variables[varName] !== undefined ? variables[varName] : `{${varName}}`;
                            });
                            logs.push(str);
                        } else if (content.startsWith('"') && content.endsWith('"')) {
                            logs.push(content.substring(1, content.length - 1));
                        } else if (content.startsWith("'") && content.endsWith("'")) {
                            logs.push(content.substring(1, content.length - 1));
                        } else if (variables[content] !== undefined) {
                            logs.push(String(variables[content]));
                        } else {
                            try {
                                const evalVal = Function('"use strict"; return (' + content + ')')();
                                logs.push(String(evalVal));
                            } catch (e) {
                                logs.push(content);
                            }
                        }
                    } else if (line.includes('=')) {
                        const parts = line.split('=');
                        const varName = parts[0].trim();
                        const varValStr = parts.slice(1).join('=').split('#')[0].trim();
                        try {
                            const val = Function('"use strict"; return (' + varValStr + ')')();
                            variables[varName] = val;
                        } catch (e) {
                            variables[varName] = varValStr;
                        }
                    }
                }

                if (logs.length === 0) {
                    logs.push('✔ [Python 3.12 Engine] Código ejecutado correctamente.');
                }
                break;
            }

            case 'cpp': {
                logs.push('⚙️ [Compilador GCC / g++ 13.2.0] Compilando main.cpp...');
                const lines = codeText.split('\n');
                let foundMain = false;

                for (let line of lines) {
                    line = line.trim();
                    if (line.includes('int main(')) foundMain = true;

                    if (line.includes('std::cout') || line.includes('cout')) {
                        const matchStr = line.match(/"([^"]+)"/g);
                        if (matchStr) {
                            logs.push(matchStr.map(s => s.replace(/"/g, '')).join(' '));
                        }
                    }
                }

                if (!foundMain) {
                    logs.push('🔴 Error de Compilación: No se encontró la función principal `int main()` en C++.');
                    isError = true;
                } else {
                    logs.push('✅ [Compilado Exitosamente: main.exe | Código de Salida: 0]');
                }
                break;
            }

            case 'sql': {
                logs.push('🗄️ [Engine PostgreSQL / SQLite 3] Procesando consulta SQL...');
                
                if (codeText.toUpperCase().includes('SELECT')) {
                    tableHtml = `
                        <table class="term-table">
                            <thead>
                                <tr><th>id</th><th>nombre</th><th>nota</th><th>estado</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>1</td><td>Carlos</td><td>8.75</td><td><span style="color:#34d399">APROBADO</span></td></tr>
                                <tr><td>2</td><td>Ana</td><td>9.20</td><td><span style="color:#34d399">APROBADO</span></td></tr>
                                <tr><td>3</td><td>Pedro</td><td>5.50</td><td><span style="color:#f87171">REPROBADO</span></td></tr>
                            </tbody>
                        </table>
                    `;
                    logs.push('📊 Consulta SELECT ejecutada con éxito. 3 filas devueltas:');
                } else if (codeText.toUpperCase().includes('CREATE TABLE')) {
                    logs.push('✅ Tabla creada exitosamente en la base de datos.');
                } else if (codeText.toUpperCase().includes('INSERT INTO')) {
                    logs.push('✅ Registros insertados correctamente.');
                } else {
                    logs.push('✅ Sentencia SQL procesada correctamente.');
                }
                break;
            }

            case 'java': {
                logs.push('☕ [javac 21.0.1] Compilando Main.java...');
                if (!codeText.includes('class') || !codeText.includes('main')) {
                    logs.push('🔴 Error de Compilación Java: Falta la declaración de clase o método `public static void main(String[] args)`.');
                    isError = true;
                } else {
                    const matchStr = codeText.match(/System\.out\.println\s*\(\s*"([^"]+)"\s*\)/);
                    if (matchStr) {
                        logs.push(matchStr[1]);
                    } else {
                        logs.push('Estudiante: Carlos | Nota: 8.75');
                    }
                    logs.push('✅ [JVM Execution Finished Successfully]');
                }
                break;
            }

            case 'rust': {
                logs.push('🦀 [rustc 1.76.0] Compilando paquete crate...');
                if (!codeText.includes('fn main()')) {
                    logs.push('🔴 Error en rustc: Falta la función de entrada `fn main()`.');
                    isError = true;
                } else {
                    const matchStr = codeText.match(/println!\s*\(\s*"([^"]+)"/);
                    if (matchStr) {
                        logs.push(matchStr[1]);
                    } else {
                        logs.push('Promedio Rust: 8.5');
                    }
                    logs.push('✅ [rustc: Process finished with exit code 0]');
                }
                break;
            }

            case 'solidity': {
                logs.push('⛓️ [solc 0.8.20] Compilando contrato inteligente EVM...');
                if (!codeText.includes('contract')) {
                    logs.push('🔴 Error de Compilación Solidity: Falta la definición de `contract`.');
                    isError = true;
                } else {
                    logs.push('📦 Bytecode generado (Gas estimado: 145,230 gas)');
                    logs.push('✨ Despliegue en red de pruebas (Localnet): 0x71C...9A23');
                    logs.push('🟢 Smart Contract ejecutado con éxito.');
                }
                break;
            }

            default:
                logs.push('ℹ️ Código verificado y procesado.');
                break;
        }
    } catch (err) {
        logs.push(`🔴 Error de Sintaxis o Ejecución: ${err.message}`);
        isError = true;
    }

    const endTime = performance.now();
    const executionTime = Math.round(endTime - startTime);

    return { logs, isError, executionTime, tableHtml };
}

window.selectLanguageInViewer = function(langId) {
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
        langSelect.value = langId;
        langSelect.dispatchEvent(new Event('change'));
    }
    const navLink = document.querySelector('a[href="#visor-codigo"]');
    if (navLink) {
        navLink.click();
    }
};

/* ==========================================================================
   3. GRADE CALCULATOR SUBSYSTEM
   ========================================================================== */
function initGradeCalculator() {
    const form = document.getElementById('calc-form');
    const resultsContainer = document.getElementById('calc-results');

    if (!form || !resultsContainer) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputNotas = document.getElementById('input-notas').value.trim();
        const notaMinima = parseFloat(document.getElementById('input-minima').value) || 6.0;

        if (!inputNotas) return;

        // Parse grades separated by commas or spaces
        const partes = inputNotas.split(/[,;\s]+/);
        const notas = partes
            .map(p => parseFloat(p.replace(',', '.')))
            .filter(n => !isNaN(n) && n >= 0 && n <= 10);

        if (notas.length === 0) {
            alert('Por favor ingrese números válidos entre 0 y 10.');
            return;
        }

        const suma = notas.reduce((acc, val) => acc + val, 0);
        const promedio = suma / notas.length;
        const maxNota = Math.max(...notas);
        const minNota = Math.min(...notas);
        const aprobado = promedio >= notaMinima;

        // Update DOM Output
        document.getElementById('res-promedio').textContent = promedio.toFixed(2);
        document.getElementById('res-total').textContent = notas.length;
        document.getElementById('res-max').textContent = maxNota.toFixed(2);
        document.getElementById('res-min').textContent = minNota.toFixed(2);

        const badge = document.getElementById('result-status-badge');
        badge.textContent = aprobado ? '🎉 ¡APROBADO!' : '📚 NECESITA REPASAR';
        badge.className = `result-badge ${aprobado ? 'aprobado' : 'reprobado'}`;

        // Progress bar width (0-10 scale = 0-100%)
        const percentage = Math.min(100, Math.max(0, (promedio / 10) * 100));
        document.getElementById('progress-bar-fill').style.width = `${percentage}%`;

        resultsContainer.classList.remove('hidden');
    });
}

/* ==========================================================================
   4. QUIZ ENGINE SUBSYSTEM
   ========================================================================== */
const QUIZ_QUESTIONS = [
    {
        lang: 'Python 🐍',
        question: '¿Qué palabra clave se usa en Python para definir una función?',
        options: ['function', 'def', 'func', 'create'],
        correct: 1,
        exp: 'def es la palabra reservada en Python para definir funciones (ej. def mi_funcion():).'
    },
    {
        lang: 'C++ ⚙️',
        question: '¿Qué símbolo se usa en C++ para trabajar con punteros de memoria?',
        options: ['#', '& y *', '@', '$'],
        correct: 1,
        exp: '& obtiene la dirección de memoria y * desreferencia el puntero en C++.'
    },
    {
        lang: 'Rust 🦀',
        question: '¿Qué concepto único en Rust garantiza la seguridad de memoria sin recolector de basura?',
        options: ['Ownership (Propiedad)', 'Virtual Machine', 'Garbage Collector', 'Global Lock'],
        correct: 0,
        exp: 'El sistema de Ownership y Borrowing es la innovación clave de Rust para gestionar memoria.'
    },
    {
        lang: 'Node.js 🟢',
        question: '¿Cuál es el gestor de paquetes por defecto que incluye Node.js?',
        options: ['pip', 'NPM', 'cargo', 'maven'],
        correct: 1,
        exp: 'NPM (Node Package Manager) es el registro oficial de módulos y librerías para Node.js.'
    },
    {
        lang: 'SQL 🗄️',
        question: '¿Qué comando SQL se utiliza para obtener datos de una base de datos?',
        options: ['GET', 'FETCH', 'SELECT', 'QUERY'],
        correct: 2,
        exp: 'SELECT es la instrucción declarativa básica para realizar consultas en SQL.'
    }
];

let currentQuizIndex = 0;

function initQuizEngine() {
    renderQuizQuestion();
}

function renderQuizQuestion() {
    const qData = QUIZ_QUESTIONS[currentQuizIndex];
    if (!qData) return;

    document.getElementById('quiz-lang-tag').textContent = qData.lang;
    document.getElementById('quiz-counter').textContent = `Pregunta ${currentQuizIndex + 1} de ${QUIZ_QUESTIONS.length}`;
    document.getElementById('quiz-question-text').textContent = qData.question;

    const optionsContainer = document.getElementById('quiz-options');
    const feedback = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('btn-next-quiz');

    feedback.classList.add('hidden');
    nextBtn.classList.add('hidden');

    optionsContainer.innerHTML = qData.options.map((opt, idx) => `
        <button class="quiz-opt-btn" onclick="selectQuizOption(${idx})">${opt}</button>
    `).join('');
}

window.selectQuizOption = function(selectedIndex) {
    const qData = QUIZ_QUESTIONS[currentQuizIndex];
    const optionBtns = document.querySelectorAll('.quiz-opt-btn');
    const feedback = document.getElementById('quiz-feedback');
    const feedbackText = document.getElementById('quiz-feedback-text');
    const nextBtn = document.getElementById('btn-next-quiz');

    optionBtns.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === qData.correct) {
            btn.classList.add('correct');
        } else if (idx === selectedIndex) {
            btn.classList.add('wrong');
        }
    });

    feedback.classList.remove('hidden');
    if (selectedIndex === qData.correct) {
        feedbackText.textContent = `🎉 ¡Correcto! ${qData.exp}`;
        feedbackText.style.color = '#34d399';
    } else {
        feedbackText.textContent = `❌ Incorrecto. ${qData.exp}`;
        feedbackText.style.color = '#fb7185';
    }

    if (currentQuizIndex < QUIZ_QUESTIONS.length - 1) {
        nextBtn.classList.remove('hidden');
        nextBtn.onclick = () => {
            currentQuizIndex++;
            renderQuizQuestion();
        };
    } else {
        nextBtn.textContent = '🔄 Reiniciar Quiz';
        nextBtn.classList.remove('hidden');
        nextBtn.onclick = () => {
            currentQuizIndex = 0;
            renderQuizQuestion();
        };
    }
};

/* ==========================================================================
   5. SPA TAB NAVIGATION & VIEW SWITCHER
   ========================================================================== */
function initTabNavigationSystem() {
    const navLinks = document.querySelectorAll('.nav-link, a[href^="#"]');

    function activateTab(targetHash) {
        if (!targetHash) targetHash = '#hero';
        let targetId = targetHash.replace('#', '');
        if (!targetId) targetId = 'hero';

        const targetSection = document.getElementById(targetId);
        if (!targetSection || !targetSection.classList.contains('tab-view')) {
            return;
        }

        // Hide all tab views
        const allTabs = document.querySelectorAll('.tab-view');
        allTabs.forEach(tab => {
            tab.classList.remove('active');
        });

        // Show selected tab view
        targetSection.classList.add('active');

        // Update nav-link active state
        const headerNavLinks = document.querySelectorAll('.nav-link');
        headerNavLinks.forEach(link => {
            const linkHash = link.getAttribute('href');
            if (linkHash === '#' + targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Scroll smoothly to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Attach click listeners to all hash links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const hash = link.getAttribute('href');
            if (hash && hash.startsWith('#')) {
                const targetId = hash.replace('#', '');
                const targetEl = document.getElementById(targetId);
                if (targetEl && targetEl.classList.contains('tab-view')) {
                    e.preventDefault();
                    window.location.hash = hash;
                    activateTab(hash);
                }
            }
        });
    });

    // Listen for browser back/forward and initial page load with hash
    window.addEventListener('hashchange', () => {
        activateTab(window.location.hash);
    });

    // Initial tab activation based on current URL hash or default hero
    activateTab(window.location.hash || '#hero');
}

/* ==========================================================================
   6. PDF COURSES ENGINE (GUIAS GENERALES, 1º, 2º & 3º PARCIAL)
   ========================================================================== */
const PDF_COURSES_DATA = [
    // Guías Generales / Libros Maestros (2 Documentos)
    {
        id: 'gen-01',
        title: 'Libro Completo: Fundamentos de Programación',
        parcial: 'general',
        parcialBadge: 'Guía Principal',
        badgeClass: 'pdf-badge-general',
        color: '#f43f5e',
        icon: '📕',
        file: 'Fundamentos Programacion.pdf',
        desc: 'Manual y libro maestro completo de Fundamentos de Programación. Cubre lógica algorítmica, lenguaje C/C++, estructuras de datos y metodologías.',
        size: '3.4 MB'
    },
    {
        id: 'gen-02',
        title: 'Resumen Ejecutivo: Fundamentos de C++',
        parcial: 'general',
        parcialBadge: 'Cheat Sheet C++',
        badgeClass: 'pdf-badge-general',
        color: '#f59e0b',
        icon: '⚡',
        file: 'Resumen_Fundamentos_Cpp.pdf',
        desc: 'Guía rápida y hoja de referencia (Cheat Sheet) de sintaxis de C++, declaración de variables, punteros, referencias y funciones.',
        size: '28.4 KB'
    },

    // Nivel Básico (4 Cursos)
    {
        id: 'p1-01',
        title: '01. Hola Mundo & Mensaje (Básico)',
        parcial: 'basico',
        parcialBadge: 'Básico',
        badgeClass: 'pdf-badge-basico',
        color: '#10b981',
        icon: '💻',
        file: 'PDF 1 Parcial/01-Que-es-La-Programacion.pdf',
        desc: 'Primer programa, sintaxis de emisión de mensajes a consola/stdout, salida formateada y estructura básica.',
        size: '1.2 MB'
    },
    {
        id: 'p1-02',
        title: '02. Variables y tipo de Datos (Básico)',
        parcial: 'basico',
        parcialBadge: 'Básico',
        badgeClass: 'pdf-badge-basico',
        color: '#10b981',
        icon: '🧠',
        file: 'PDF 1 Parcial/02-PensamientoLogico.pdf',
        desc: 'Declaración de variables, tipos primitivos (int, float, string, bool), asignación en memoria e impresión.',
        size: '1.3 MB'
    },
    {
        id: 'p1-03',
        title: '03. Condiciones y Bucles (Básico)',
        parcial: 'basico',
        parcialBadge: 'Básico',
        badgeClass: 'pdf-badge-basico',
        color: '#10b981',
        icon: '💡',
        file: 'PDF 1 Parcial/03-Introduccion-al-Pensamiento-logico.pdf',
        desc: 'Toma de decisiones con condicionales simples (if/else) e iteraciones contadoras simples (for).',
        size: '1.3 MB'
    },
    {
        id: 'p1-04',
        title: '04. Funciones, consultas y metodos (Básico)',
        parcial: 'basico',
        parcialBadge: 'Básico',
        badgeClass: 'pdf-badge-basico',
        color: '#10b981',
        icon: '⚙️',
        file: 'PDF 1 Parcial/04-Fundamentos-del-Lenguaje-C.pdf',
        desc: 'Declaración de funciones simples, firmas con valor de retorno y consultas SELECT básicas.',
        size: '1.9 MB'
    },

    // Nivel Intermedio (4 Cursos)
    {
        id: 'p2-05',
        title: '05. Hola Mundo & Mensaje (Intermedio)',
        parcial: 'intermedio',
        parcialBadge: 'Intermedio',
        badgeClass: 'pdf-badge-intermedio',
        color: '#06b6d4',
        icon: '🚀',
        file: 'PDF 2 Parcial/14-Arreglo-Unidimensional.pdf',
        desc: 'Formateo avanzado de texto, interpolación de cadenas, secuencias de escape y buffers de consola.',
        size: '2.1 MB'
    },
    {
        id: 'p2-06',
        title: '06. Variables y tipo de Datos (Intermedio)',
        parcial: 'intermedio',
        parcialBadge: 'Intermedio',
        badgeClass: 'pdf-badge-intermedio',
        color: '#06b6d4',
        icon: '📊',
        file: 'PDF 2 Parcial/15-Arreglo-Bidimencionales.pdf',
        desc: 'Conversión explícita de tipos (casting), mutabilidad vs inmutabilidad (const, let mut) y ámbito (scope).',
        size: '5.3 MB'
    },
    {
        id: 'p2-07',
        title: '07. Condiciones y Bucles (Intermedio)',
        parcial: 'intermedio',
        parcialBadge: 'Intermedio',
        badgeClass: 'pdf-badge-intermedio',
        color: '#06b6d4',
        icon: '🎛️',
        file: 'PDF 2 Parcial/16-Arreglos-Dinamicos.pdf',
        desc: 'Selección múltiple (switch-case, match, CASE WHEN), operador ternario y bucles while con acumuladores.',
        size: '1.9 MB'
    },
    {
        id: 'p2-08',
        title: '08. Funciones, consultas y metodos (Intermedio)',
        parcial: 'intermedio',
        parcialBadge: 'Intermedio',
        badgeClass: 'pdf-badge-intermedio',
        color: '#06b6d4',
        icon: '🧩',
        file: 'PDF 2 Parcial/22-Funciones-Parte1.pdf',
        desc: 'Paso de parámetros por referencia/punteros, métodos estáticos de clase, arrow functions y agregaciones SQL.',
        size: '1.4 MB'
    },

    // Nivel Avanzado (4 Cursos)
    {
        id: 'p3-09',
        title: '09. Hola Mundo & Mensaje (Avanzado)',
        parcial: 'avanzado',
        parcialBadge: 'Avanzado',
        badgeClass: 'pdf-badge-avanzado',
        color: '#a855f7',
        icon: '📡',
        file: 'PDF 3 Parcial/24-Estructuras.pdf',
        desc: 'Logging profesional estructurado, flujos I/O (stdout vs stderr) y emisión de eventos en tiempo real.',
        size: '2.5 MB'
    },
    {
        id: 'p3-10',
        title: '10. Variables y tipo de Datos (Avanzado)',
        parcial: 'avanzado',
        parcialBadge: 'Avanzado',
        badgeClass: 'pdf-badge-avanzado',
        color: '#a855f7',
        icon: '⚡',
        file: 'PDF 3 Parcial/25-Estructuras-como-Parametros-de-Funciones.pdf',
        desc: 'Asignación dinámica de memoria en Heap, referencias de punteros y estructuras de almacenamiento compuestas.',
        size: '1.6 MB'
    },
    {
        id: 'p3-11',
        title: '11. Condiciones y Bucles (Avanzado)',
        parcial: 'avanzado',
        parcialBadge: 'Avanzado',
        badgeClass: 'pdf-badge-avanzado',
        color: '#a855f7',
        icon: '🔥',
        file: 'PDF 3 Parcial/26-Arreglos-de-estructuras.pdf',
        desc: 'Cláusulas de guarda, evaluación en cortocircuito, iteradores sobre colecciones y control estricto de flujo.',
        size: '1.5 MB'
    },
    {
        id: 'p3-12',
        title: '12. Funciones, consultas y metodos (Avanzado)',
        parcial: 'avanzado',
        parcialBadge: 'Avanzado',
        badgeClass: 'pdf-badge-avanzado',
        color: '#a855f7',
        icon: '👑',
        file: 'PDF 3 Parcial/23-Funciones-Parte2.pdf',
        desc: 'Funciones puras (view/pure), funciones de orden superior (map/filter/reduce), procedimientos almacenados y recursión.',
        size: '3.4 MB'
    }
];

let activePdfFilter = 'all';
let currentSearchQuery = '';

function initPdfCoursesEngine() {
    const grid = document.getElementById('pdf-courses-grid');
    const filterBtns = document.querySelectorAll('.pdf-filter-btn');
    const searchInput = document.getElementById('pdf-search-input');
    const searchClearBtn = document.getElementById('pdf-search-clear');
    const modalOverlay = document.getElementById('pdf-modal-overlay');
    const modalCloseBtn = document.getElementById('pdf-modal-close');

    if (!grid) return;

    // Initial render
    renderPdfGrid();

    // Filter Buttons Listener
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activePdfFilter = btn.getAttribute('data-pdf-filter');
            renderPdfGrid();
        });
    });

    // Search Input Listener
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchQuery = e.target.value.trim().toLowerCase();
            if (currentSearchQuery.length > 0) {
                searchClearBtn.classList.remove('hidden');
            } else {
                searchClearBtn.classList.add('hidden');
            }
            renderPdfGrid();
        });
    }

    // Search Clear Button Listener
    if (searchClearBtn) {
        searchClearBtn.addEventListener('click', () => {
            searchInput.value = '';
            currentSearchQuery = '';
            searchClearBtn.classList.add('hidden');
            renderPdfGrid();
        });
    }

    // Event Delegation for PDF and Practice buttons
    grid.addEventListener('click', (e) => {
        const btnPdf = e.target.closest('.btn-open-pdf');
        if (btnPdf) {
            e.preventDefault();
            e.stopPropagation();
            const file = btnPdf.getAttribute('data-file');
            const title = btnPdf.getAttribute('data-title');
            if (file) {
                openPdfViewer(file, title || 'Documento PDF');
            }
            return;
        }

        const btnPractice = e.target.closest('.btn-open-practice');
        if (btnPractice) {
            e.preventDefault();
            e.stopPropagation();
            const courseId = btnPractice.getAttribute('data-course-id');
            if (courseId) {
                openPracticeModal(courseId);
            }
            return;
        }
    });

    // Modal Close Listeners
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closePdfViewer);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closePdfViewer();
            }
        });
    }

    // ESC Key Listener for Modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePdfViewer();
        }
    });
}

function getSequentialCourses() {
    return PDF_COURSES_DATA.filter(c => c.parcial !== 'general');
}

function renderPdfGrid() {
    const grid = document.getElementById('pdf-courses-grid');
    if (!grid) return;

    if (typeof renderLangStepperBar === 'function') {
        renderLangStepperBar();
    }

    const filtered = PDF_COURSES_DATA.filter(item => {
        const matchesFilter = activePdfFilter === 'all' || item.parcial === activePdfFilter;
        const matchesSearch = currentSearchQuery === '' ||
            item.title.toLowerCase().includes(currentSearchQuery) ||
            item.desc.toLowerCase().includes(currentSearchQuery) ||
            item.parcialBadge.toLowerCase().includes(currentSearchQuery);

        return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="no-results-msg">
                <span style="font-size: 2.5rem;">🔍</span>
                <p>No se encontraron cursos o documentos que coincidan con tu búsqueda.</p>
                <small style="color: var(--text-dim);">Intenta buscar con otros términos o cambia el filtro de parcial.</small>
            </div>
        `;
        return;
    }

    const activeLang = typeof getActiveLanguage === 'function' ? getActiveLanguage() : 'python';
    const activeProgress = typeof getLanguageProgress === 'function' ? getLanguageProgress(activeLang) : (userProfile.completedLessons || []);
    const completedSet = new Set(activeProgress);
    const sequentialList = getSequentialCourses();

    grid.innerHTML = filtered.map(course => {
        const isGeneral = course.parcial === 'general';
        const seqIndex = sequentialList.findIndex(c => c.id === course.id);
        const lockStatus = isCourseUnlockedSequentially(course.id);
        const isCompleted = completedSet.has(course.id);
        const isLocked = !lockStatus.unlocked;

        let courseBadgeStr = course.parcialBadge;
        if (!isGeneral && seqIndex >= 0) {
            const courseNumStr = String(seqIndex + 1).padStart(2, '0');
            courseBadgeStr = `Curso ${courseNumStr} • ${course.parcialBadge}`;
        }

        return `
        <div class="pdf-card ${isLocked ? 'locked' : ''}" style="--card-accent: ${course.color};">
            <span class="${isGeneral ? 'unlock-badge' : (isLocked ? 'lock-badge' : 'unlock-badge')}">
                ${isGeneral ? '📖 Lectura Libre' : (isCompleted ? '✅ Aprobado' : lockStatus.msg)}
            </span>
            <div>
                <div class="pdf-card-header" style="margin-top: 10px;">
                    <div class="pdf-icon-wrapper">
                        <span>${course.icon}</span>
                    </div>
                    <span class="pdf-badge ${course.badgeClass}">${courseBadgeStr}</span>
                </div>
                <h3 class="pdf-card-title">${course.title}</h3>
                <p class="pdf-card-desc">${course.desc}</p>
            </div>
            
            <div>
                <div class="pdf-card-meta">
                    <span>📄 Documento PDF</span>
                    <span>•</span>
                    <span>💾 ${course.size}</span>
                </div>
                <div class="pdf-card-actions">
                    <button type="button" class="btn btn-primary btn-sm btn-open-pdf" data-file="${encodeURI(course.file)}" data-title="${(course.title || '').replace(/"/g, '&quot;')}">
                        👁️ Ver PDF
                    </button>
                    ${isGeneral ? '' : `
                        <button type="button" class="btn btn-secondary btn-sm btn-open-practice" data-course-id="${course.id}">
                            💻 Practicar
                        </button>
                    `}
                </div>
            </div>
        </div>
    `}).join('');
}

window.openPdfViewer = function openPdfViewer(filePath, title) {
    const overlay = document.getElementById('pdf-modal-overlay');
    const iframe = document.getElementById('pdf-modal-iframe');
    const titleEl = document.getElementById('pdf-modal-title');
    const downloadLink = document.getElementById('pdf-modal-download');

    if (!overlay) return;

    if (titleEl) titleEl.textContent = title || 'Documento PDF';
    if (downloadLink) downloadLink.href = filePath;

    if (iframe) {
        iframe.src = filePath;
    }

    overlay.classList.remove('hidden');
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

window.closePdfViewer = function closePdfViewer() {
    const overlay = document.getElementById('pdf-modal-overlay');
    const iframe = document.getElementById('pdf-modal-iframe');

    if (overlay) {
        overlay.classList.add('hidden');
        overlay.style.display = 'none';
    }
    if (iframe) {
        iframe.src = '';
    }
    document.body.style.overflow = '';
};

/* ==========================================================================
   7. USER REGISTRATION & LESSON PROGRESS ENGINE
   ========================================================================== */
const DEFAULT_GUEST_PROFILE = {
    id: null,
    name: 'Invitado',
    email: '',
    fpDegree: 'Sin Autenticar',
    avatar: '👤',
    completedLessons: [],
    quizPoints: 0,
    masterUnlocked: false
};

let userProfile = { ...DEFAULT_GUEST_PROFILE };

/* Storage Helpers */
function getUsersDB() {
    try {
        const raw = localStorage.getItem('devhub_fp_users_db');
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        console.warn('Error al leer la BD de usuarios:', e);
        return [];
    }
}

function saveUsersDB(users) {
    try {
        localStorage.setItem('devhub_fp_users_db', JSON.stringify(users));
    } catch (e) {
        console.warn('Error al guardar la BD de usuarios:', e);
    }
}

function getCurrentUserId() {
    return localStorage.getItem('devhub_fp_current_user_id');
}

function setCurrentUserId(id) {
    if (id) {
        localStorage.setItem('devhub_fp_current_user_id', id);
    } else {
        localStorage.removeItem('devhub_fp_current_user_id');
    }
}

/* Toast Notifications Helper */
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;

    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '⚠️';

    toast.innerHTML = `<span>${icon}</span> <div>${message}</div>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px) scale(0.95)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

/* Migration & Load User Profile */
function initUserProfileSystem() {
    migrateLegacyProfile();
    loadUserProfile();
    initUserModalEvents();
}

function migrateLegacyProfile() {
    try {
        const legacySaved = localStorage.getItem('devhub_fp_user_profile');
        const db = getUsersDB();

        // Always ensure Master Admin account exists and has masterUnlocked enabled
        let adminUser = db.find(u => u.email && u.email.toLowerCase() === 'admin@fp.edu');
        if (!adminUser) {
            adminUser = {
                id: 'user_admin_master',
                name: 'Administrador Docente',
                email: 'admin@fp.edu',
                password: 'admin123',
                avatar: '👑',
                completedLessons: [],
                quizPoints: 1000,
                isAdmin: true,
                masterUnlocked: true,
                createdAt: new Date().toISOString()
            };
            db.push(adminUser);
            saveUsersDB(db);
        } else {
            adminUser.isAdmin = true;
            adminUser.masterUnlocked = true;
            saveUsersDB(db);
        }

        if (legacySaved && db.length <= 1) {
            const legacyData = JSON.parse(legacySaved);
            if (legacyData.email !== 'admin@fp.edu') {
                const migratedUser = {
                    id: 'user_legacy_1',
                    name: legacyData.name || 'Carlos Mendoza',
                    email: legacyData.email || 'carlos.mendoza@estudiante.fp.edu',
                    password: '1234',
                    fpDegree: legacyData.fpDegree || 'DAM - Desarrollo de Aplicaciones Multiplataforma',
                    avatar: legacyData.avatar || '👨‍💻',
                    completedLessons: legacyData.completedLessons || [],
                    quizPoints: legacyData.quizPoints || 0,
                    createdAt: new Date().toISOString()
                };
                db.push(migratedUser);
                saveUsersDB(db);
                setCurrentUserId(migratedUser.id);
            }
        }
    } catch (e) {
        console.warn('Error en la migración de perfil antiguo:', e);
    }
}

function loadUserProfile() {
    const currentId = getCurrentUserId();
    const db = getUsersDB();

    if (currentId) {
        const activeUser = db.find(u => u.id === currentId);
        if (activeUser) {
            userProfile = activeUser;
            if (!userProfile.completedLessons) userProfile.completedLessons = [];
        } else {
            setCurrentUserId(null);
            userProfile = { ...DEFAULT_GUEST_PROFILE };
        }
    } else {
        userProfile = { ...DEFAULT_GUEST_PROFILE };
    }

    updateUserProfileUI();
}

function saveUserProfile() {
    const currentId = getCurrentUserId();
    if (currentId) {
        const db = getUsersDB();
        const index = db.findIndex(u => u.id === currentId);
        if (index !== -1) {
            db[index] = { ...userProfile };
            saveUsersDB(db);
        }
    }

    try {
        localStorage.setItem('devhub_fp_user_profile', JSON.stringify(userProfile));
    } catch (e) {}

    updateUserProfileUI();
    if (typeof renderPdfGrid === 'function') {
        renderPdfGrid();
    }
}

function updateUserProfileUI() {
    const isLogged = !!(userProfile && userProfile.id && userProfile.id !== 'guest_estudiante');
    const modalOverlay = document.getElementById('user-modal-overlay');

    // Mandatory Auth Gate Rule: If not logged in, enforce authentication lock (No guest access)
    if (!isLogged) {
        document.body.classList.add('auth-locked');
        if (modalOverlay) {
            modalOverlay.classList.remove('hidden');
            modalOverlay.classList.add('forced-gate');
        }
        const db = getUsersDB();
        switchAuthTab(db && db.length > 0 ? 'login' : 'register');
    } else {
        document.body.classList.remove('auth-locked');
        if (modalOverlay) {
            const wasForced = modalOverlay.classList.contains('forced-gate');
            modalOverlay.classList.remove('forced-gate');
            if (wasForced) {
                modalOverlay.classList.add('hidden');
            }
        }
    }

    // Navbar state updates
    const guestActions = document.getElementById('guest-nav-actions');
    const userBadge = document.getElementById('user-nav-badge');
    const btnOpenModal = document.getElementById('btn-open-user-modal');
    const btnLogoutNav = document.getElementById('btn-nav-logout');
    const navLinkAdmin = document.getElementById('nav-link-admin');

    const nameMini = document.getElementById('user-name-mini');
    const avatarMini = document.getElementById('user-avatar-mini');
    const levelBadge = document.getElementById('user-level-badge');

    const completedCount = userProfile.completedLessons ? userProfile.completedLessons.length : 0;
    const currentLevel = Math.floor(completedCount / 3) + 1;

    if (isLogged) {
        if (guestActions) guestActions.classList.add('hidden');
        if (userBadge) userBadge.classList.remove('hidden');
        if (btnOpenModal) btnOpenModal.classList.remove('hidden');
        if (btnLogoutNav) btnLogoutNav.classList.remove('hidden');

        if (isAdminUser(userProfile)) {
            if (navLinkAdmin) navLinkAdmin.classList.remove('hidden');
            if (typeof renderAdminDashboard === 'function') renderAdminDashboard();
        } else {
            if (navLinkAdmin) navLinkAdmin.classList.add('hidden');
        }

        if (nameMini) nameMini.textContent = userProfile.name || 'Estudiante';
        if (avatarMini) avatarMini.textContent = userProfile.avatar || '👨‍💻';
        if (levelBadge) levelBadge.textContent = isAdminUser(userProfile) ? 'Docente Master' : `Nivel ${currentLevel}`;
    } else {
        if (guestActions) guestActions.classList.remove('hidden');
        if (userBadge) userBadge.classList.add('hidden');
        if (btnOpenModal) btnOpenModal.classList.add('hidden');
        if (btnLogoutNav) btnLogoutNav.classList.add('hidden');
        if (navLinkAdmin) navLinkAdmin.classList.add('hidden');
    }

    // Modal Profile Tab View Display
    const profileAvatar = document.getElementById('profile-avatar-display');
    const profileName = document.getElementById('profile-name-display');
    const profileEmail = document.getElementById('profile-email-display');

    if (profileAvatar) profileAvatar.textContent = userProfile.avatar || '👨‍💻';
    if (profileName) profileName.textContent = userProfile.name || 'Estudiante';
    if (profileEmail) profileEmail.textContent = userProfile.email || 'Sin correo asignado';

    // Edit form inputs
    const inputName = document.getElementById('user-input-name');
    const inputEmail = document.getElementById('user-input-email');

    if (inputName) inputName.value = userProfile.name || '';
    if (inputEmail) inputEmail.value = userProfile.email || '';

    // Global Stats Display
    const totalLessons = (typeof PDF_COURSES_DATA !== 'undefined') ? PDF_COURSES_DATA.length : 30;
    const progressPercent = Math.min(100, Math.round((completedCount / totalLessons) * 100));

    const globalFill = document.getElementById('user-global-progress-fill');
    const globalPercent = document.getElementById('user-global-progress-percent');
    const statLessons = document.getElementById('stat-lessons-completed');
    const statScore = document.getElementById('stat-quiz-score');
    const statLevel = document.getElementById('stat-current-level');

    if (globalFill) globalFill.style.width = `${progressPercent}%`;
    if (globalPercent) globalPercent.textContent = `${progressPercent}% Completado`;
    if (statLessons) statLessons.textContent = `${completedCount} / ${totalLessons}`;
    if (statScore) statScore.textContent = `${userProfile.quizPoints || 0} pts`;
    if (statLevel) statLevel.textContent = `Nivel ${currentLevel}`;

    // Highlight active avatar buttons across forms
    const avatarBtns = document.querySelectorAll('.avatar-btn');
    avatarBtns.forEach(btn => {
        if (btn.getAttribute('data-avatar') === userProfile.avatar) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

/* Switch Modal Auth Tabs */
function switchAuthTab(tabName) {
    const tabRegister = document.getElementById('auth-tab-register');
    const tabLogin = document.getElementById('auth-tab-login');
    const tabProfile = document.getElementById('auth-tab-profile');

    const viewRegister = document.getElementById('auth-view-register');
    const viewLogin = document.getElementById('auth-view-login');
    const viewProfile = document.getElementById('auth-view-profile');
    const modalTitle = document.getElementById('user-modal-title');

    [tabRegister, tabLogin, tabProfile].forEach(t => t && t.classList.remove('active'));
    [viewRegister, viewLogin, viewProfile].forEach(v => v && v.classList.add('hidden'));

    if (tabName === 'register') {
        if (tabRegister) tabRegister.classList.add('active');
        if (viewRegister) viewRegister.classList.remove('hidden');
        if (modalTitle) modalTitle.textContent = 'Registrar Nueva Cuenta';
    } else if (tabName === 'login') {
        if (tabLogin) tabLogin.classList.add('active');
        if (viewLogin) viewLogin.classList.remove('hidden');
        if (modalTitle) modalTitle.textContent = 'Iniciar Sesión';
        renderQuickUsersList();

        // Autocompletar solo el correo/usuario por seguridad (campo de contraseña vacío)
        const db = getUsersDB();
        if (db && db.length > 0) {
            const lastUser = db.find(u => u.id === getCurrentUserId()) || db[db.length - 1];
            if (lastUser) {
                const inputEmail = document.getElementById('login-input-email');
                const inputPassword = document.getElementById('login-input-password');
                if (inputEmail) inputEmail.value = lastUser.email || lastUser.name;
                if (inputPassword) inputPassword.value = '';
            }
        }
    } else if (tabName === 'profile') {
        if (tabProfile) tabProfile.classList.add('active');
        if (viewProfile) viewProfile.classList.remove('hidden');
        if (modalTitle) modalTitle.textContent = 'Mi Perfil de Estudiante';
        updateUserProfileUI();
    }
}

/* Render Quick Account Switcher List */
function renderQuickUsersList() {
    const listContainer = document.getElementById('quick-users-list');
    if (!listContainer) return;

    try {
        const db = getUsersDB();
        if (!db || db.length === 0) {
            listContainer.innerHTML = '<div style="color: var(--text-muted); font-size: 0.85rem; padding: 6px 0;">No hay otras cuentas registradas aún.</div>';
            return;
        }

        listContainer.innerHTML = db.map(user => {
            const completedCount = user.completedLessons ? user.completedLessons.length : 0;
            const level = Math.floor(completedCount / 3) + 1;
            const isCurrent = user.id === getCurrentUserId();

            return `
                <div class="user-quick-card ${isCurrent ? 'active' : ''}" onclick="quickLoginUser('${user.id}')">
                    <div class="user-quick-info">
                        <span class="user-quick-avatar">${user.avatar || '👨‍💻'}</span>
                        <div>
                            <div class="user-quick-name">${user.name || 'Estudiante'} ${isCurrent ? '⚡ (Actual)' : ''}</div>
                            <div class="user-quick-fp" style="color: var(--text-muted); font-size: 0.75rem;">${user.email || 'Sin correo'}</div>
                        </div>
                    </div>
                    <span class="user-quick-level">Nivel ${level}</span>
                </div>
            `;
        }).join('');
    } catch (e) {
        console.warn('Error al renderizar la lista de cuentas:', e);
    }
}

window.quickLoginUser = function(userId) {
    const db = getUsersDB();
    const targetUser = db.find(u => u.id === userId);

    if (targetUser) {
        const inputEmail = document.getElementById('login-input-email');
        const inputPassword = document.getElementById('login-input-password');

        if (inputEmail) inputEmail.value = targetUser.email || targetUser.name;
        if (inputPassword) inputPassword.value = ''; // Vacío por seguridad

        showToast(`🔒 Usuario "${targetUser.name}" seleccionado. Ingresa tu contraseña para entrar.`, 'info');
        if (inputPassword) inputPassword.focus();
    }
};

/* User Registration Handler */
function handleUserRegistration(e) {
    e.preventDefault();

    const nameVal = document.getElementById('reg-input-name').value.trim();
    const emailVal = document.getElementById('reg-input-email').value.trim();
    const passwordVal = document.getElementById('reg-input-password').value;
    const confirmPasswordVal = document.getElementById('reg-input-confirm-password').value;

    if (!nameVal || !emailVal || !passwordVal) {
        showToast('Por favor completa los campos requeridos.', 'error');
        return;
    }

    if (passwordVal.length < 4) {
        showToast('La contraseña debe tener al menos 4 caracteres.', 'error');
        return;
    }

    if (passwordVal !== confirmPasswordVal) {
        showToast('Las contraseñas no coinciden.', 'error');
        return;
    }

    const db = getUsersDB();
    const existing = db.find(u => u.email.toLowerCase() === emailVal.toLowerCase() || u.name.toLowerCase() === nameVal.toLowerCase());

    if (existing) {
        showToast('Ya existe una cuenta con ese correo o usuario.', 'error');
        return;
    }

    let selectedAvatar = '👨‍💻';
    const activeAvatarBtn = document.querySelector('#reg-avatar-selector .avatar-btn.active');
    if (activeAvatarBtn) {
        selectedAvatar = activeAvatarBtn.getAttribute('data-avatar');
    }

    const newUser = {
        id: `user_${Date.now()}`,
        name: nameVal,
        email: emailVal,
        password: passwordVal,
        avatar: selectedAvatar,
        completedLessons: [],
        quizPoints: 0,
        createdAt: new Date().toISOString()
    };

    db.push(newUser);
    saveUsersDB(db);
    setCurrentUserId(newUser.id);
    userProfile = newUser;

    saveUserProfile();
    showToast(`✨ ¡Cuenta creada exitosamente! Bienvenido/a, ${nameVal}`, 'success');
    switchAuthTab('profile');
}

/* User Login Handler */
function handleUserLogin(e) {
    e.preventDefault();

    const emailVal = document.getElementById('login-input-email').value.trim().toLowerCase();
    const passwordVal = document.getElementById('login-input-password').value;

    if (!emailVal || !passwordVal) {
        showToast('Ingresa tu usuario/correo y contraseña.', 'error');
        return;
    }

    const db = getUsersDB();
    const user = db.find(u => u.email.toLowerCase() === emailVal || u.name.toLowerCase() === emailVal);

    if (!user) {
        showToast('Usuario o correo no encontrado. Regístrate si es tu primera vez.', 'error');
        return;
    }

    if (user.password && user.password !== passwordVal) {
        showToast('Contraseña incorrecta. Inténtalo de nuevo.', 'error');
        return;
    }

    setCurrentUserId(user.id);
    userProfile = user;
    saveUserProfile();

    showToast(`🚀 ¡Bienvenido de nuevo, ${user.name}!`, 'success');
    switchAuthTab('profile');
}

/* User Logout Handler */
function handleUserLogout() {
    setCurrentUserId(null);
    userProfile = { ...DEFAULT_GUEST_PROFILE };
    updateUserProfileUI();
    if (typeof renderPdfGrid === 'function') {
        renderPdfGrid();
    }
    showToast('🚪 Has cerrado sesión correctamente. Inicia sesión para continuar.', 'info');
}

/* Init Event Listeners */
function initUserModalEvents() {
    const modalOverlay = document.getElementById('user-modal-overlay');
    const modalClose = document.getElementById('user-modal-close');

    // Navbar buttons
    const btnNavLogin = document.getElementById('btn-nav-login');
    const btnNavRegister = document.getElementById('btn-nav-register');
    const btnOpenProfile = document.getElementById('btn-open-user-modal');
    const btnNavLogout = document.getElementById('btn-nav-logout');
    const userBadge = document.getElementById('user-nav-badge');

    // Open Modal Handlers
    if (btnNavLogin && modalOverlay) {
        btnNavLogin.addEventListener('click', () => {
            switchAuthTab('login');
            modalOverlay.classList.remove('hidden');
        });
    }

    if (btnNavRegister && modalOverlay) {
        btnNavRegister.addEventListener('click', () => {
            switchAuthTab('register');
            modalOverlay.classList.remove('hidden');
        });
    }

    if (btnOpenProfile && modalOverlay) {
        btnOpenProfile.addEventListener('click', () => {
            switchAuthTab(userProfile.id ? 'profile' : 'login');
            modalOverlay.classList.remove('hidden');
        });
    }

    if (userBadge && modalOverlay) {
        userBadge.addEventListener('click', () => {
            switchAuthTab(userProfile.id ? 'profile' : 'login');
            modalOverlay.classList.remove('hidden');
        });
    }

    if (btnNavLogout) {
        btnNavLogout.addEventListener('click', handleUserLogout);
    }

    // Modal Close
    if (modalClose && modalOverlay) {
        modalClose.addEventListener('click', () => {
            if (!modalOverlay.classList.contains('forced-gate')) {
                modalOverlay.classList.add('hidden');
            }
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay && !modalOverlay.classList.contains('forced-gate')) {
                modalOverlay.classList.add('hidden');
            }
        });
    }

    // Tab buttons
    const tabRegister = document.getElementById('auth-tab-register');
    const tabLogin = document.getElementById('auth-tab-login');
    const tabProfile = document.getElementById('auth-tab-profile');

    if (tabRegister) tabRegister.addEventListener('click', () => switchAuthTab('register'));
    if (tabLogin) tabLogin.addEventListener('click', () => switchAuthTab('login'));
    if (tabProfile) tabProfile.addEventListener('click', () => switchAuthTab('profile'));

    // Switch links inside forms
    const linkGoLogin = document.getElementById('link-go-login');
    const linkGoRegister = document.getElementById('link-go-register');

    if (linkGoLogin) linkGoLogin.addEventListener('click', (e) => { e.preventDefault(); switchAuthTab('login'); });
    if (linkGoRegister) linkGoRegister.addEventListener('click', (e) => { e.preventDefault(); switchAuthTab('register'); });

    // Avatar selection handlers
    const avatarSelectors = document.querySelectorAll('.avatar-selector');
    avatarSelectors.forEach(selector => {
        const btns = selector.querySelectorAll('.avatar-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                userProfile.avatar = btn.getAttribute('data-avatar');
            });
        });
    });

    // Password Toggle Buttons
    const togglePwdBtns = document.querySelectorAll('.btn-toggle-pwd');
    togglePwdBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);
            if (targetInput) {
                const isPassword = targetInput.type === 'password';
                targetInput.type = isPassword ? 'text' : 'password';
                btn.textContent = isPassword ? '🙈' : '👁️';
            }
        });
    });

    // Registration Form Submit
    const formRegister = document.getElementById('form-register-user');
    if (formRegister) {
        formRegister.addEventListener('submit', handleUserRegistration);
    }

    // Login Form Submit
    const formLogin = document.getElementById('form-login-user');
    if (formLogin) {
        formLogin.addEventListener('submit', handleUserLogin);
    }

    // Profile Edit Form Submit
    const formProfileEdit = document.getElementById('user-profile-edit-form');
    if (formProfileEdit) {
        formProfileEdit.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameVal = document.getElementById('user-input-name').value.trim();
            const emailVal = document.getElementById('user-input-email').value.trim();
            const fpVal = document.getElementById('user-input-fp').value;

            if (nameVal) {
                userProfile.name = nameVal;
                userProfile.email = emailVal;
                userProfile.fpDegree = fpVal;
                saveUserProfile();
                showToast('💾 Perfil actualizado correctamente.', 'success');
                modalOverlay.classList.add('hidden');
            }
        });
    }

    // Modal Logout Button
    const btnModalLogout = document.getElementById('btn-modal-logout');
    if (btnModalLogout) {
        btnModalLogout.addEventListener('click', () => {
            handleUserLogout();
        });
    }
}

/* ==========================================================================
   SEQUENTIAL LANGUAGE PROGRESSION ENGINE
   ========================================================================== */
const LANGUAGES_ORDER = ['python', 'cpp', 'rust', 'node', 'java', 'sql', 'typescript', 'solidity'];

const LANGUAGES_INFO_MAP = {
    python: { name: 'Python', icon: '🐍', tag: 'IA & Data Science' },
    cpp: { name: 'C++', icon: '⚙️', tag: 'Rendimiento Extremo' },
    rust: { name: 'Rust', icon: '🦀', tag: 'Seguridad en Memoria' },
    node: { name: 'Node.js', icon: '🟢', tag: 'Servidor Asíncrono' },
    java: { name: 'Java', icon: '☕', tag: 'Enterprise & POO' },
    sql: { name: 'SQL', icon: '🗄️', tag: 'Bases de Datos' },
    typescript: { name: 'TypeScript', icon: '🟦', tag: 'JS Tipado' },
    solidity: { name: 'Solidity', icon: '⛓️', tag: 'Smart Contracts' }
};

function getActiveLanguage() {
    if (!userProfile.activeLanguage) {
        userProfile.activeLanguage = 'python';
    }
    return userProfile.activeLanguage;
}

function getLanguageProgress(langId) {
    if (!userProfile.langProgress) {
        userProfile.langProgress = {};
    }
    if (!userProfile.langProgress[langId]) {
        if (langId === 'python' && userProfile.completedLessons && userProfile.completedLessons.length > 0) {
            userProfile.langProgress.python = [...userProfile.completedLessons];
        } else {
            userProfile.langProgress[langId] = [];
        }
    }
    return userProfile.langProgress[langId];
}

function getLanguageUnlockStatus(langId) {
    const langIndex = LANGUAGES_ORDER.indexOf(langId);
    const totalCourses = (typeof getSequentialCourses === 'function') ? getSequentialCourses().length : 24;
    if (langIndex === -1) return { unlocked: true, isCompleted: false, completedCount: 0, totalCount: totalCourses };

    const currentProgress = getLanguageProgress(langId);
    const completedCount = currentProgress.length;
    const isCompleted = completedCount >= totalCourses;

    // Master Admin / Teacher Override OR Master Unlocked
    if (userProfile && (userProfile.masterUnlocked || userProfile.isAdmin)) {
        return { unlocked: true, isCompleted, completedCount, totalCount: totalCourses };
    }

    // Python is unlocked by default
    if (langIndex === 0) {
        return { unlocked: true, isCompleted, completedCount, totalCount: totalCourses };
    }

    // Language N unlocked if Language N-1 completed all courses
    const prevLangId = LANGUAGES_ORDER[langIndex - 1];
    const prevProgress = getLanguageProgress(prevLangId);
    const prevCompleted = prevProgress.length >= totalCourses;

    if (prevCompleted) {
        return { unlocked: true, isCompleted, completedCount, totalCount: totalCourses };
    } else {
        const prevLangName = LANGUAGES_INFO_MAP[prevLangId] ? LANGUAGES_INFO_MAP[prevLangId].name : prevLangId;
        return {
            unlocked: false,
            isCompleted: false,
            completedCount,
            totalCount: totalCourses,
            lockMsg: `🔒 Completa los ${totalCourses} cursos de ${prevLangName} para desbloquear`
        };
    }
}

function renderLangStepperBar() {
    const container = document.getElementById('lang-stepper-bar');
    const badge = document.getElementById('active-lang-status-badge');
    if (!container) return;

    const totalCourses = (typeof getSequentialCourses === 'function') ? getSequentialCourses().length : 24;
    const activeLang = getActiveLanguage();
    const activeProgress = getLanguageProgress(activeLang);
    const activeInfo = LANGUAGES_INFO_MAP[activeLang] || { name: activeLang, icon: '💻' };

    if (badge) {
        badge.textContent = `${activeInfo.icon} ${activeInfo.name} • ${activeProgress.length} / ${totalCourses} Completados`;
    }

    const certBtn = document.getElementById('btn-open-certificate');
    if (certBtn) {
        if (activeProgress.length >= totalCourses || userProfile.masterUnlocked) {
            certBtn.classList.remove('hidden');
            certBtn.onclick = () => openCertificateModal(activeLang);
        } else {
            certBtn.classList.add('hidden');
        }
    }

    container.innerHTML = LANGUAGES_ORDER.map((langId) => {
        const info = LANGUAGES_INFO_MAP[langId];
        const status = getLanguageUnlockStatus(langId);
        const isActive = langId === activeLang;

        let statusText = `${status.completedCount}/28`;
        let classNames = 'stepper-step';

        if (isActive) classNames += ' active';
        if (status.isCompleted) classNames += ' completed';
        if (!status.unlocked) classNames += ' locked';

        let displayIcon = info.icon;
        if (!status.unlocked) {
            displayIcon = '🔒';
            statusText = 'Bloqueado';
        } else if (status.isCompleted) {
            displayIcon = '✅';
            statusText = 'Aprobado';
        }

        return `
            <div class="${classNames}" onclick="selectActiveLanguage('${langId}')" title="${status.unlocked ? `Ver cursos de ${info.name}` : status.lockMsg}">
                <span class="stepper-step-icon">${displayIcon}</span>
                <span class="stepper-step-name">${info.name}</span>
                <span class="stepper-step-status">${statusText}</span>
            </div>
        `;
    }).join('');
}

window.selectActiveLanguage = function(langId) {
    const status = getLanguageUnlockStatus(langId);
    if (!status.unlocked) {
        showToast(status.lockMsg, 'error');
        return;
    }

    userProfile.activeLanguage = langId;
    saveUserProfile();
    renderLangStepperBar();
    renderPdfGrid();
    initLanguagesGrid();
};

function isCourseUnlockedSequentially(courseId) {
    const course = PDF_COURSES_DATA.find(c => c.id === courseId);
    if (!course || course.parcial === 'general') {
        return { unlocked: true, msg: '📖 Lectura Libre', isGeneral: true };
    }

    // Master Admin / Teacher Override OR Master Unlocked
    if (userProfile && (userProfile.masterUnlocked || userProfile.isAdmin)) {
        return { unlocked: true, msg: '🔓 Disponible (Acceso Maestro)', isGeneral: false };
    }

    const activeLang = getActiveLanguage();
    const langStatus = getLanguageUnlockStatus(activeLang);

    if (!langStatus.unlocked) {
        return { unlocked: false, msg: '🔒 Lenguaje Bloqueado', isGeneral: false };
    }

    const sequentialList = getSequentialCourses();
    const index = sequentialList.findIndex(c => c.id === courseId);

    if (index === 0) {
        return { unlocked: true, msg: '🔓 Disponible (Curso 01)', isGeneral: false, courseNum: 1 };
    }

    const prevCourse = sequentialList[index - 1];
    const langProgress = getLanguageProgress(activeLang);
    const completedSet = new Set(langProgress);

    if (completedSet.has(prevCourse.id)) {
        return { unlocked: true, msg: '🔓 Disponible', isGeneral: false, courseNum: index + 1 };
    }

    const prevNumStr = String(index).padStart(2, '0');
    return { unlocked: false, msg: `🔒 Aprueba el Curso ${prevNumStr} anterior`, isGeneral: false, courseNum: index + 1 };
}

window.markCourseAsCompleted = function(courseId) {
    const activeLang = getActiveLanguage();
    const currentProgress = getLanguageProgress(activeLang);

    if (!currentProgress.includes(courseId)) {
        currentProgress.push(courseId);
    }

    if (!userProfile.completedLessons) {
        userProfile.completedLessons = [];
    }
    if (!userProfile.completedLessons.includes(courseId)) {
        userProfile.completedLessons.push(courseId);
    }

    saveUserProfile();
    if (typeof renderLangStepperBar === 'function') renderLangStepperBar();
    if (typeof renderPdfGrid === 'function') renderPdfGrid();
    if (typeof initLanguagesGrid === 'function') initLanguagesGrid();

    // Check if user completed all courses of current active language
    const sequentialList = getSequentialCourses();
    if (currentProgress.length >= sequentialList.length) {
        const langIdx = LANGUAGES_ORDER.indexOf(activeLang);
        const currentLangName = LANGUAGES_INFO_MAP[activeLang] ? LANGUAGES_INFO_MAP[activeLang].name : activeLang;

        if (langIdx !== -1 && langIdx < LANGUAGES_ORDER.length - 1) {
            const nextLangId = LANGUAGES_ORDER[langIdx + 1];
            const nextLangName = LANGUAGES_INFO_MAP[nextLangId] ? LANGUAGES_INFO_MAP[nextLangId].name : nextLangId;

            setTimeout(() => {
                alert(`🏆 ¡FELICIDADES! Has completado los ${sequentialList.length} Cursos de ${currentLangName}.\n\n🔓 ¡Se ha desbloqueado automáticamente el siguiente lenguaje: ${nextLangName}!`);
                selectActiveLanguage(nextLangId);
            }, 400);
        } else {
            setTimeout(() => {
                alert(`🏆 ¡MAESTRÍA TOTAL! Has completado todos los cursos de los 8 lenguajes de programación. ¡Eres un Ingeniero Senior FP!`);
            }, 400);
        }
    }
};

window.toggleLessonCompletion = function(lessonId) {
    const activeLang = getActiveLanguage();
    const currentProgress = getLanguageProgress(activeLang);
    const index = currentProgress.indexOf(lessonId);

    if (index === -1) {
        markCourseAsCompleted(lessonId);
    } else {
        currentProgress.splice(index, 1);
        const legacyIdx = userProfile.completedLessons ? userProfile.completedLessons.indexOf(lessonId) : -1;
        if (legacyIdx !== -1) userProfile.completedLessons.splice(legacyIdx, 1);

        saveUserProfile();
        if (typeof renderLangStepperBar === 'function') renderLangStepperBar();
        if (typeof renderPdfGrid === 'function') renderPdfGrid();
        if (typeof initLanguagesGrid === 'function') initLanguagesGrid();
    }
};

/* ==========================================================================
   8. PRACTICE WINDOW ENGINE (EJEMPLO GUIADO + EJERCICIO EN COMPILADOR POR LENGUAJE)
   ========================================================================== */
let currentPracticeCourseId = null;
let currentPracticeLang = 'python';

window.openPracticeModal = function(courseId) {
    const course = PDF_COURSES_DATA.find(c => c.id === courseId);
    if (!course) return;

    currentPracticeCourseId = courseId;
    const modal = document.getElementById('practice-modal-overlay');
    const titleEl = document.getElementById('practice-modal-title');
    const subtitleEl = document.getElementById('practice-modal-subtitle');
    const langSelect = document.getElementById('practice-lang-select');

    // Requisito: Cuando está en el curso del lenguaje activo (Python, C++, etc.), solo aparece ese lenguaje
    const activeLang = typeof getActiveLanguage === 'function' ? getActiveLanguage() : 'python';
    currentPracticeLang = activeLang;

    const activeLangInfo = (typeof LANGUAGES_INFO_MAP !== 'undefined' && LANGUAGES_INFO_MAP[activeLang]) ? LANGUAGES_INFO_MAP[activeLang] : { name: activeLang.toUpperCase(), icon: '💻' };

    if (langSelect) {
        langSelect.innerHTML = `<option value="${activeLang}">${activeLangInfo.icon} ${activeLangInfo.name}</option>`;
        langSelect.value = activeLang;
    }

    if (titleEl) titleEl.textContent = `Práctica (${activeLangInfo.name}): ${course.title}`;
    if (subtitleEl) subtitleEl.textContent = `Ejemplo Guiado & Ejercicio Evaluado en ${activeLangInfo.name}`;

    loadPracticeContent();
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
    }
    document.body.style.overflow = 'hidden';
};

function loadPracticeContent() {
    if (!currentPracticeCourseId) return;
    const course = PDF_COURSES_DATA.find(c => c.id === currentPracticeCourseId);
    const sequentialList = getSequentialCourses();
    const seqIndex = sequentialList.findIndex(c => c.id === currentPracticeCourseId);

    const courseNum = seqIndex >= 0 ? seqIndex + 1 : 1;
    const courseNumStr = String(courseNum).padStart(2, '0');

    const exampleEditor = document.getElementById('practice-example-editor');
    const exerciseEditor = document.getElementById('practice-exercise-editor');
    const exercisePrompt = document.getElementById('exercise-prompt-text');
    const exampleFilename = document.getElementById('example-filename');
    const exerciseFilename = document.getElementById('exercise-filename');

    const extMap = { python: 'py', cpp: 'cpp', rust: 'rs', node: 'js', java: 'java', sql: 'sql', typescript: 'ts', solidity: 'sol' };
    const ext = extMap[currentPracticeLang] || 'txt';

    if (exampleFilename) exampleFilename.textContent = `ejemplo_curso_${courseNumStr}.${ext}`;
    if (exerciseFilename) exerciseFilename.textContent = `ejercicio_curso_${courseNumStr}.${ext}`;

    const practiceData = getCoursePracticeCode(course, currentPracticeLang, courseNum);

    if (exampleEditor) exampleEditor.value = practiceData.exampleCode;
    
    // Cargar solución guardada por el alumno o la plantilla predeterminada
    const saveKey = `devhub_saved_code_${currentPracticeCourseId}_${currentPracticeLang}`;
    const savedCode = localStorage.getItem(saveKey);
    if (exerciseEditor) {
        exerciseEditor.value = (savedCode !== null && savedCode.trim() !== '') ? savedCode : practiceData.exerciseCode;
    }
    if (exercisePrompt) exercisePrompt.textContent = practiceData.prompt;
}

function getCoursePracticeCode(course, lang, courseNum) {
    const langInfo = (typeof LANGUAGES_INFO_MAP !== 'undefined' && LANGUAGES_INFO_MAP[lang]) ? LANGUAGES_INFO_MAP[lang] : { name: lang.toUpperCase(), icon: '💻' };
    const langName = langInfo.name;
    const cid = course ? course.id : '';
    const num = courseNum || (cid ? parseInt(cid.replace(/^[a-z0-9]+-/, '')) : 1);
    const numStr = String(num).padStart(2, '0');
    const courseTitle = course ? course.title : `Curso ${numStr}`;

    let exampleCode = '';
    let exerciseCode = '';
    let prompt = '';

    // =========================================================================
    // 🟢 NIVEL BÁSICO (Cursos 01 - 04)
    // =========================================================================

    // 1. Hola Mundo & Mensaje (Básico) - Curso 01
    if (cid === 'p1-01' || num === 1) {
        if (lang === 'python') {
            exampleCode = `# 1. Hola Mundo & Mensaje (Básico) - Python 🐍\nprint("¡Hola Mundo! Bienvenido a DevHub FP Python")\nprint("Sintaxis directa sin clases ni punto de entrada main.")`;
            exerciseCode = `# Ejercicio Evaluado: Hola Mundo (Básico)\nprint("Hola Mundo desde Python")`;
            prompt = `📌 DESAFÍO 01 (Básico): Hola Mundo & Mensaje (Python)\nImprime el mensaje exacto "Hola Mundo desde Python".`;
        } else if (lang === 'cpp') {
            exampleCode = `// 1. Hola Mundo & Mensaje (Básico) - C++ ⚙️\n#include <iostream>\n\nint main() {\n    std::cout << "¡Hola Mundo! Bienvenido a DevHub FP C++" << std::endl;\n    return 0;\n}`;
            exerciseCode = `// Ejercicio Evaluado: Hola Mundo (Básico)\n#include <iostream>\n\nint main() {\n    std::cout << "Hola Mundo desde C++" << std::endl;\n    return 0;\n}`;
            prompt = `📌 DESAFÍO 01 (Básico): Hola Mundo & Mensaje (C++)\nImplementa main() e imprime "Hola Mundo desde C++".`;
        } else if (lang === 'rust') {
            exampleCode = `// 1. Hola Mundo & Mensaje (Básico) - Rust 🦀\nfn main() {\n    println!("¡Hola Mundo! Bienvenido a DevHub FP Rust");\n}`;
            exerciseCode = `// Ejercicio Evaluado: Hola Mundo (Básico)\nfn main() {\n    println!("Hola Mundo desde Rust");\n}`;
            prompt = `📌 DESAFÍO 01 (Básico): Hola Mundo & Mensaje (Rust)\nUtiliza println! para imprimir "Hola Mundo desde Rust".`;
        } else if (lang === 'node') {
            exampleCode = `// 1. Hola Mundo & Mensaje (Básico) - Node.js 🟢\nconsole.log("¡Hola Mundo! Bienvenido a DevHub FP Node.js");`;
            exerciseCode = `// Ejercicio Evaluado: Hola Mundo (Básico)\nconsole.log("Hola Mundo desde Node.js");`;
            prompt = `📌 DESAFÍO 01 (Básico): Hola Mundo & Mensaje (Node.js)\nEmita la salida "Hola Mundo desde Node.js".`;
        } else if (lang === 'java') {
            exampleCode = `// 1. Hola Mundo & Mensaje (Básico) - Java ☕\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("¡Hola Mundo! Bienvenido a DevHub FP Java");\n    }\n}`;
            exerciseCode = `// Ejercicio Evaluado: Hola Mundo (Básico)\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hola Mundo desde Java");\n    }\n}`;
            prompt = `📌 DESAFÍO 01 (Básico): Hola Mundo & Mensaje (Java)\nImplementa main() e imprime "Hola Mundo desde Java".`;
        } else if (lang === 'sql') {
            exampleCode = `-- 1. Hola Mundo & Mensaje (Básico) - SQL 🗄️\nSELECT '¡Hola Mundo! Bienvenido a DevHub FP SQL' AS Mensaje;`;
            exerciseCode = `-- Ejercicio Evaluado: Hola Mundo (Básico)\nSELECT 'Hola Mundo desde SQL' AS resultado;`;
            prompt = `📌 DESAFÍO 01 (Básico): Hola Mundo & Mensaje (SQL)\nProyecta la cadena "Hola Mundo desde SQL".`;
        } else if (lang === 'typescript') {
            exampleCode = `// 1. Hola Mundo & Mensaje (Básico) - TypeScript 🟦\nconst mensaje: string = "¡Hola Mundo! Bienvenido a DevHub FP TypeScript";\nconsole.log(mensaje);`;
            exerciseCode = `// Ejercicio Evaluado: Hola Mundo (Básico)\nconst salida: string = "Hola Mundo desde TypeScript";\nconsole.log(salida);`;
            prompt = `📌 DESAFÍO 01 (Básico): Hola Mundo & Mensaje (TypeScript)\nDeclara una constante tipada e imprime "Hola Mundo desde TypeScript".`;
        } else if (lang === 'solidity') {
            exampleCode = `// SPDX-License-Identifier: MIT\n// 1. Hola Mundo & Mensaje (Básico) - Solidity ⛓️\npragma solidity ^0.8.0;\ncontract HolaMundo {\n    string public mensaje = "¡Hola Mundo desde Solidity!";\n}`;
            exerciseCode = `// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\ncontract HolaMundoExercise {\n    string public estado = "Hola Mundo desde Solidity";\n}`;
            prompt = `📌 DESAFÍO 01 (Básico): Hola Mundo & Mensaje (Solidity)\nDefine un contrato con variable pública "Hola Mundo desde Solidity".`;
        }
    }
    // 2. Variables y Tipo de Datos (Básico) - Curso 02
    else if (cid === 'p1-02' || num === 2) {
        if (lang === 'python') {
            exampleCode = `# 2. Variables (Básico) - Python 🐍\nnombre = "DevHub"\nedad = 2026\nprint(f"Curso 02 Completado - {nombre} {edad}")`;
            exerciseCode = `# Ejercicio Evaluado: Variables (Básico)\nnombre = "DevHub"\nedad = 2026\nprint(f"Curso 02 Completado - {nombre} {edad}")`;
            prompt = `📌 DESAFÍO 02 (Básico): Variables y Tipo de Datos (Python)\nDeclara variables e imprime "Curso 02 Completado - DevHub 2026".`;
        } else if (lang === 'cpp') {
            exampleCode = `// 2. Variables (Básico) - C++ ⚙️\n#include <iostream>\n#include <string>\n\nint main() {\n    std::string tag = "DevHub";\n    int anio = 2026;\n    std::cout << "Curso 02 Completado - " << tag << " " << anio << std::endl;\n    return 0;\n}`;
            exerciseCode = `// Ejercicio Evaluado: Variables (Básico)\n#include <iostream>\n#include <string>\n\nint main() {\n    std::string tag = "DevHub";\n    int anio = 2026;\n    std::cout << "Curso 02 Completado - " << tag << " " << anio << std::endl;\n    return 0;\n}`;
            prompt = `📌 DESAFÍO 02 (Básico): Variables y Tipo de Datos (C++)\nDeclara variables std::string e int e imprime "Curso 02 Completado - DevHub 2026".`;
        } else {
            exampleCode = `// 2. Variables (Básico) - ${langName}\nconsole.log("Curso 02 Completado - DevHub 2026");`;
            exerciseCode = `// Ejercicio Evaluado: Variables (Básico)\nconsole.log("Curso 02 Completado - DevHub 2026");`;
            prompt = `📌 DESAFÍO 02 (Básico): Variables y Tipo de Datos (${langName})\nInicializa variables e imprime "Curso 02 Completado - DevHub 2026".`;
        }
    }
    // 3. Condiciones y Bucles (Básico) - Curso 03
    else if (cid === 'p1-03' || num === 3) {
        if (lang === 'python') {
            exampleCode = `# 3. Condiciones y Bucles (Básico) - Python 🐍\nfor i in range(1, 4):\n    print(f"Bucle #{i}")\nprint("Curso 03 Completado")`;
            exerciseCode = `# Ejercicio Evaluado: Bucles (Básico)\nfor i in range(1, 4):\n    print(f"Bucle #{i}")\nprint("Curso 03 Completado")`;
            prompt = `📌 DESAFÍO 03 (Básico): Condiciones y Bucles (Python)\nUsa un bucle for e imprime "Curso 03 Completado".`;
        } else {
            exampleCode = `// 3. Condiciones y Bucles (Básico) - ${langName}\nconsole.log("Curso 03 Completado");`;
            exerciseCode = `// Ejercicio Evaluado: Bucles (Básico)\nconsole.log("Curso 03 Completado");`;
            prompt = `📌 DESAFÍO 03 (Básico): Condiciones y Bucles (${langName})\nImplementa control de flujo e imprime "Curso 03 Completado".`;
        }
    }
    // 4. Funciones, consultas y metodos (Básico) - Curso 04
    else if (cid === 'p1-04' || num === 4) {
        if (lang === 'python') {
            exampleCode = `# 4. Funciones (Básico) - Python 🐍\ndef obtener_mensaje():\n    return "Curso 04 Completado"\n\nprint(obtener_mensaje())`;
            exerciseCode = `# Ejercicio Evaluado: Funciones (Básico)\ndef obtener_mensaje():\n    return "Curso 04 Completado"\n\nprint(obtener_mensaje())`;
            prompt = `📌 DESAFÍO 04 (Básico): Funciones (Python)\nDefine una función que retorne "Curso 04 Completado".`;
        } else {
            exampleCode = `// 4. Funciones (Básico) - ${langName}\nconsole.log("Curso 04 Completado");`;
            exerciseCode = `// Ejercicio Evaluado: Funciones (Básico)\nconsole.log("Curso 04 Completado");`;
            prompt = `📌 DESAFÍO 04 (Básico): Funciones (${langName})\nCrea una función o consulta e imprime "Curso 04 Completado".`;
        }
    }

    // =========================================================================
    // 🔵 NIVEL INTERMEDIO (Cursos 05 - 08)
    // =========================================================================

    // 5. Hola Mundo & Mensaje (Intermedio) - Curso 05
    else if (cid === 'p2-05' || num === 5) {
        if (lang === 'python') {
            exampleCode = `# 5. Formateo e Interpolación Avanzada - Python 🐍\nusuario = "Alex Mendoza"\nrol = "Lead Architect"\npuntos = 4850\n\n# Reporte formateado con f-strings multilínea y alineación\nreporte = f"""\n========================================\n  DEVHUB SYSTEM - REPORTE DE USUARIO\n========================================\n  Usuario : {usuario:<20}\n  Rol     : {rol:<20}\n  Puntos  : {puntos:08d}\n========================================\n"""\nprint(reporte)`;
            exerciseCode = `# Ejercicio Evaluado: Formateo de Cadenas (Intermedio)\nusuario = "Alex"\nstatus = "ACTIVO"\nprint(f"Curso 05 Completado - Usuario: {usuario} | Estado: {status}")`;
            prompt = `📌 DESAFÍO 05 (Intermedio): Formateo e Interpolación (Python)\nUtiliza f-strings para formatear e imprimir "Curso 05 Completado - Usuario: Alex | Estado: ACTIVO".`;
        } else if (lang === 'cpp') {
            exampleCode = `// 5. Formateo de Salida con IOMANIP - C++ ⚙️\n#include <iostream>\n#include <iomanip>\n#include <sstream>\n\nint main() {\n    std::ostringstream ss;\n    ss << std::left << std::setw(15) << "[SISTEMA]" \n       << std::setw(20) << "Modulo Intermedio" \n       << " [OK]";\n    std::cout << ss.str() << std::endl;\n    return 0;\n}`;
            exerciseCode = `// Ejercicio Evaluado: Formateo de Salida (C++)\n#include <iostream>\n#include <string>\n\nint main() {\n    std::string tag = "Intermedio";\n    std::cout << "[LOG] Curso 05 Completado - Nivel " << tag << std::endl;\n    return 0;\n}`;
            prompt = `📌 DESAFÍO 05 (Intermedio): Streams y Buffers (C++)\nFormatea la salida mediante std::ostringstream o cadenas y emita "[LOG] Curso 05 Completado - Nivel Intermedio".`;
        } else if (lang === 'rust') {
            exampleCode = `// 5. Macros y Formateo Posicional - Rust 🦀\nfn main() {\n    let modulo = "Interpolación";\n    let nivel = "Intermedio";\n    let buffer = format!("{:>12} :: {:<15} [ESTADO: OK]", nivel, modulo);\n    println!("{}", buffer);\n}`;
            exerciseCode = `// Ejercicio Evaluado: Format Macro (Rust)\nfn main() {\n    let code = "05";\n    println!("Curso {} Completado - Rust Intermedio", code);\n}`;
            prompt = `📌 DESAFÍO 05 (Intermedio): Formateo de Texto (Rust)\nConstruye una cadena formateada con la macro format! e imprime "Curso 05 Completado - Rust Intermedio".`;
        } else if (lang === 'node') {
            exampleCode = `// 5. Buffers y String Formatting - Node.js 🟢\nconst usuario = "Alex";\nconst timestamp = new Date().toISOString();\nconst payload = { event: "LOGIN", status: 200, user: usuario };\n\nprocess.stdout.write(\`[\${timestamp}] REPORTE INTERMEDIO:\\n\`);\nconsole.log(JSON.stringify(payload, null, 2));`;
            exerciseCode = `// Ejercicio Evaluado: Formateo en Node.js\nconst status = "OK";\nconsole.log(\`Curso 05 Completado - Servidor \${status}\`);`;
            prompt = `📌 DESAFÍO 05 (Intermedio): String Templates & Buffers (Node.js)\nEmita el mensaje formateado \`Curso 05 Completado - Servidor OK\`.`;
        } else if (lang === 'java') {
            exampleCode = `// 5. Formateador String.format - Java ☕\npublic class Main {\n    public static void main(String[] args) {\n        String modulo = "Mensajería Avanzada";\n        int iteraciones = 100;\n        String formatted = String.format("[SYS LOG] %-25s | Iteraciones: %05d", modulo, iteraciones);\n        System.out.println(formatted);\n    }\n}`;
            exerciseCode = `// Ejercicio Evaluado: Formateo de Texto (Java)\npublic class Main {\n    public static void main(String[] args) {\n        System.out.printf("Curso %02d Completado - Java Intermedio%n", 5);\n    }\n}`;
            prompt = `📌 DESAFÍO 05 (Intermedio): Formatters (Java)\nUtiliza System.out.printf() con modificadores de formato e imprime "Curso 05 Completado - Java Intermedio".`;
        } else if (lang === 'sql') {
            exampleCode = `-- 5. Proyecciones Formateadas con CONCAT - SQL 🗄️\nSELECT \n    CONCAT(UPPER('Curso '), '05: ', 'Mensaje Intermedio') AS NombreModulo,\n    RIGHT(CONCAT('000', 42), 4) AS CodigoFormateado;`;
            exerciseCode = `-- Ejercicio Evaluado: Funciones de Cadena (SQL)\nSELECT CONCAT('Curso 05 Completado', ' - SQL Intermedio') AS resultado;`;
            prompt = `📌 DESAFÍO 05 (Intermedio): Proyecciones String (SQL)\nProyecta la expresión CONCAT e imprime "Curso 05 Completado - SQL Intermedio".`;
        } else if (lang === 'typescript') {
            exampleCode = `// 5. Interpolación con Interfaces - TypeScript 🟦\ninterface LogPayload {\n    courseId: string;\n    level: 'Básico' | 'Intermedio' | 'Avanzado';\n    active: boolean;\n}\n\nconst log: LogPayload = { courseId: "05", level: "Intermedio", active: true };\nconsole.log(\`[TS-LOG] Curso \${log.courseId} - Nivel: \${log.level} | Estado: \${log.active}\`);`;
            exerciseCode = `// Ejercicio Evaluado: String Interpolation (TypeScript)\nconst tag: string = "TypeScript Intermedio";\nconsole.log(\`Curso 05 Completado - \${tag}\`);`;
            prompt = `📌 DESAFÍO 05 (Intermedio): Interpolación Tipada (TypeScript)\nDeclara una constante tipada e imprime \`Curso 05 Completado - TypeScript Intermedio\`.`;
        } else if (lang === 'solidity') {
            exampleCode = `// SPDX-License-Identifier: MIT\n// 5. Concatenación e Eventos - Solidity ⛓️\npragma solidity ^0.8.0;\n\ncontract MessageFormatter {\n    event LogMessage(string indexed category, string details);\n\n    function emitirReporte(string memory usuario) public {\n        emit LogMessage("INTERMEDIO", string(abi.encodePacked("Curso 05 - Usuario: ", usuario)));\n    }\n}`;
            exerciseCode = `// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\ncontract MessageExercise {\n    string public status = "Curso 05 Completado - Solidity Intermedio";\n}`;
            prompt = `📌 DESAFÍO 05 (Intermedio): Formateo y Eventos (Solidity)\nDefine un Smart Contract que almacene en estado la cadena "Curso 05 Completado - Solidity Intermedio".`;
        }
    }
    // 6. Variables y Tipo de Datos (Intermedio) - Curso 06
    else if (cid === 'p2-06' || num === 6) {
        if (lang === 'python') {
            exampleCode = `# 6. Casting y Mutabilidad - Python 🐍\nstr_val = "1050"\nnum_int = int(str_val)\nnum_float = float(num_int)\n\n# Tuplas (inmutables) vs Listas (mutables)\ntupla_config = ("localhost", 8080)\nlista_datos = [num_int, num_float]\nlista_datos.append(2000)\n\nprint(f"Parseado: {num_int} | Host: {tupla_config[0]}:{tupla_config[1]} | Lista: {lista_datos}")`;
            exerciseCode = `# Ejercicio Evaluado: Casting e Inmutabilidad (Python)\nval_str = "2026"\nval_num = int(val_str)\nprint(f"Curso 06 Completado - Año: {val_num}")`;
            prompt = `📌 DESAFÍO 06 (Intermedio): Casting y Tipos Compuestos (Python)\nRealiza la conversión de la cadena "2026" a entero e imprime "Curso 06 Completado - Año: 2026".`;
        } else if (lang === 'cpp') {
            exampleCode = `// 6. Static Cast y Referencias - C++ ⚙️\n#include <iostream>\n#include <string>\n\nint main() {\n    double pi = 3.14159;\n    int entero = static_cast<int>(pi);\n    const std::string tag = "C++ Intermedio";\n    \n    std::cout << "Original: " << pi << " | Casted: " << entero << " | Tag: " << tag << std::endl;\n    return 0;\n}`;
            exerciseCode = `// Ejercicio Evaluado: Static Cast (C++)\n#include <iostream>\n#include <string>\n\nint main() {\n    const std::string langTag = "C++";\n    int code = static_cast<int>(6.0);\n    std::cout << "Curso 0" << code << " Completado - " << langTag << " Intermedio" << std::endl;\n    return 0;\n}`;
            prompt = `📌 DESAFÍO 06 (Intermedio): Conversión Explícita (C++)\nAplica static_cast<int> e imprime "Curso 06 Completado - C++ Intermedio".`;
        } else if (lang === 'rust') {
            exampleCode = `// 6. Inmutabilidad, Mutabilidad y Shadowing - Rust 🦀\nfn main() {\n    let val: &str = "100";\n    let val: i32 = val.parse().unwrap(); // Shadowing\n    let mut total: i32 = val;\n    total += 500;\n    println!("Parseado y Mutado: {}", total);\n}`;
            exerciseCode = `// Ejercicio Evaluado: Variable Shadowing (Rust)\nfn main() {\n    let curso = "6";\n    let curso: i32 = curso.parse().unwrap();\n    println!("Curso 0{} Completado - Rust Intermedio", curso);\n}`;
            prompt = `📌 DESAFÍO 06 (Intermedio): Shadowing y Parsing (Rust)\nRealiza parseo de cadena a entero con shadowing e imprime "Curso 06 Completado - Rust Intermedio".`;
        } else if (lang === 'node') {
            exampleCode = `// 6. Conversiones, BigInt y Scope - Node.js 🟢\nconst rawInput = "9007199254740991";\nconst bigNum = BigInt(rawInput);\nconst parsedInt = Number.parseInt("2026", 10);\n\nconst configuracion = Object.freeze({ ambiente: "production", maxConnections: 100 });\nconsole.log(\`BigInt: \${bigNum}n | Year: \${parsedInt} | Env: \${configuracion.ambiente}\`);`;
            exerciseCode = `// Ejercicio Evaluado: Parsing (Node.js)\nconst anio = Number.parseInt("2026", 10);\nconsole.log(\`Curso 06 Completado - \${anio}\`);`;
            prompt = `📌 DESAFÍO 06 (Intermedio): Casting & Freeze (Node.js)\nParse el número 2026 usando Number.parseInt e imprime \`Curso 06 Completado - 2026\`.`;
        } else if (lang === 'java') {
            exampleCode = `// 6. Wrapper Classes y Autoboxing - Java ☕\npublic class Main {\n    public static void main(String[] args) {\n        String strNum = "5000";\n        Integer numWrapper = Integer.parseInt(strNum);\n        final double TASA_IVA = 0.16;\n        double total = numWrapper * (1 + TASA_IVA);\n        System.out.println("Integer Wrapper: " + numWrapper + " | Total con IVA: " + total);\n    }\n}`;
            exerciseCode = `// Ejercicio Evaluado: Integer Parsing (Java)\npublic class Main {\n    public static void main(String[] args) {\n        int anio = Integer.parseInt("2026");\n        System.out.println("Curso 06 Completado - " + anio);\n    }\n}`;
            prompt = `📌 DESAFÍO 06 (Intermedio): Wrappers (Java)\nUtiliza Integer.parseInt() para convertir la cadena e imprime "Curso 06 Completado - 2026".`;
        } else if (lang === 'sql') {
            exampleCode = `-- 6. CAST, CONVERT y Declaración de Tipos - SQL 🗄️\nDECLARE @montoDecimal DECIMAL(10, 2) = 1250.75;\nDECLARE @montoEntero INT = CAST(@montoDecimal AS INT);\n\nSELECT \n    @montoDecimal AS DecimalOriginal,\n    @montoEntero AS CastEntero,\n    CAST('2026-01-01' AS DATE) AS FechaConvertida;`;
            exerciseCode = `-- Ejercicio Evaluado: CAST (SQL)\nSELECT CONCAT('Curso 06 Completado - ', CAST(2026 AS VARCHAR)) AS resultado;`;
            prompt = `📌 DESAFÍO 06 (Intermedio): Conversiones CAST (SQL)\nRealiza CAST del entero 2026 a VARCHAR y proyecta "Curso 06 Completado - 2026".`;
        } else if (lang === 'typescript') {
            exampleCode = `// 6. Union Types y Type Aliases - TypeScript 🟦\ntype ID = string | number;\ntype Role = 'ADMIN' | 'USER' | 'GUEST';\n\nconst userId: ID = "USR-9921";\nconst userRole: Role = "ADMIN";\nconst readOnlyConfig: readonly number[] = [10, 20, 30];\n\nconsole.log(\`User: \${userId} | Role: \${userRole} | Config: \${readOnlyConfig.join('-')}\`);`;
            exerciseCode = `// Ejercicio Evaluado: Union Types (TypeScript)\ntype Status = 'Completado' | 'Pendiente';\nconst estado: Status = 'Completado';\nconsole.log(\`Curso 06 \${estado} - TS Intermedio\`);`;
            prompt = `📌 DESAFÍO 06 (Intermedio): Aliases y Uniones (TypeScript)\nDefine un tipo alias union e imprime "Curso 06 Completado - TS Intermedio".`;
        } else if (lang === 'solidity') {
            exampleCode = `// SPDX-License-Identifier: MIT\n// 6. Memory vs Storage vs Calldata - Solidity ⛓️\npragma solidity ^0.8.0;\n\ncontract DataLocations {\n    struct Usuario {\n        string nombre;\n        uint256 nivel;\n    }\n    \n    Usuario public usuarioGlobal = Usuario("Carlos", 5);\n    \n    function actualizarMemoria(string calldata nuevoNombre) public pure returns (string memory) {\n        string memory temp = nuevoNombre;\n        return temp;\n    }\n}`;
            exerciseCode = `// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\ncontract DataExercise {\n    uint256 public constant ANIO = 2026;\n    string public status = "Curso 06 Completado - 2026";\n}`;
            prompt = `📌 DESAFÍO 06 (Intermedio): Data Locations (Solidity)\nDefine constante ANIO = 2026 y variable pública status con "Curso 06 Completado - 2026".`;
        }
    }
    // 7. Condiciones y Bucles (Intermedio) - Curso 07
    else if (cid === 'p2-07' || num === 7) {
        if (lang === 'python') {
            exampleCode = `# 7. Bucle While con Acumulador y Operador Ternario - Python 🐍\nlimite = 5\ncontador = 1\nsuma_acumulada = 0\n\nwhile contador <= limite:\n    suma_acumulada += contador\n    estado = "Par" if contador % 2 == 0 else "Impar"\n    print(f"Iteracion {contador}: Acumulado = {suma_acumulada} ({estado})")\n    contador += 1\n\nprint(f"Suma Total: {suma_acumulada}")`;
            exerciseCode = `# Ejercicio Evaluado: Bucle While Acumulador (Python)\ni = 1\nacumulador = 0\nwhile i <= 3:\n    acumulador += i\n    i += 1\nif acumulador == 6:\n    print("Curso 07 Completado - Acumulado: 6")`;
            prompt = `📌 DESAFÍO 07 (Intermedio): Bucles While y Acumuladores (Python)\nSuma los números del 1 al 3 usando while e imprime "Curso 07 Completado - Acumulado: 6".`;
        } else if (lang === 'cpp') {
            exampleCode = `// 7. Switch-Case y Bucle Do-While - C++ ⚙️\n#include <iostream>\n\nint main() {\n    int opcion = 2;\n    switch(opcion) {\n        case 1: std::cout << "Opcion 1" << std::endl; break;\n        case 2: std::cout << "Opcion 2: Seleccionada" << std::endl; break;\n        default: std::cout << "Default" << std::endl;\n    }\n    \n    int contador = 1;\n    do {\n        std::cout << "Do-While ciclo #" << contador << std::endl;\n        contador++;\n    } while(contador <= 2);\n    return 0;\n}`;
            exerciseCode = `// Ejercicio Evaluado: Do-While (C++)\n#include <iostream>\n\nint main() {\n    int count = 1;\n    do {\n        count++;\n    } while(count <= 3);\n    std::cout << "Curso 07 Completado - Iteraciones: 3" << std::endl;\n    return 0;\n}`;
            prompt = `📌 DESAFÍO 07 (Intermedio): Control de Selección Múltiple (C++)\nImplementa un ciclo do-while e imprime "Curso 07 Completado - Iteraciones: 3".`;
        } else if (lang === 'rust') {
            exampleCode = `// 7. Pattern Matching (match) y loop - Rust 🦀\nfn main() {\n    let nota = 88;\n    let clasificacion = match nota {\n        90..=100 => "Excelente",\n        80..=89 => "Notable",\n        70..=79 => "Aprobado",\n        _ => "Reprobado",\n    };\n    println!("Nota: {} | Clasificación: {}", nota, clasificacion);\n}`;
            exerciseCode = `// Ejercicio Evaluado: Pattern Matching (Rust)\nfn main() {\n    let code = 7;\n    let msg = match code {\n        7 => "Curso 07 Completado",\n        _ => "Incompleto",\n    };\n    println!("{}", msg);\n}`;
            prompt = `📌 DESAFÍO 07 (Intermedio): Pattern Matching (Rust)\nEvalúa la variable code con match e imprime "Curso 07 Completado".`;
        } else if (lang === 'node') {
            exampleCode = `// 7. Switch, Ternario y Control while - Node.js 🟢\nconst rol = "ADMIN";\nconst acceso = rol === "ADMIN" ? "Concedido Total" : "Limitado";\n\nlet retries = 0;\nwhile (retries < 3) {\n    retries++;\n    process.stdout.write(\`Intento \${retries} de reconexión...\\n\`);\n}\nconsole.log(\`Acceso: \${acceso}\`);`;
            exerciseCode = `// Ejercicio Evaluado: Switch (Node.js)\nconst level = 7;\nswitch(level) {\n    case 7: console.log("Curso 07 Completado - Node Intermedio"); break;\n}`;
            prompt = `📌 DESAFÍO 07 (Intermedio): Switch y Ternarios (Node.js)\nUtiliza una sentencia switch evaluando 7 e imprime "Curso 07 Completado - Node Intermedio".`;
        } else if (lang === 'java') {
            exampleCode = `// 7. Switch Expression y While Loop - Java ☕\npublic class Main {\n    public static void main(String[] args) {\n        int codigoEstado = 200;\n        String respuesta = switch (codigoEstado) {\n            case 200 -> "OK - Exito";\n            case 404 -> "Not Found";\n            default -> "Unknown";\n        };\n        System.out.println("Respuesta Servidor: " + respuesta);\n    }\n}`;
            exerciseCode = `// Ejercicio Evaluado: Switch Expression (Java)\npublic class Main {\n    public static void main(String[] args) {\n        int curso = 7;\n        if (curso == 7) {\n            System.out.println("Curso 07 Completado - Java Intermedio");\n        }\n    }\n}`;
            prompt = `📌 DESAFÍO 07 (Intermedio): Evaluaciones Java (Java)\nVerifica la condición de curso e imprime "Curso 07 Completado - Java Intermedio".`;
        } else if (lang === 'sql') {
            exampleCode = `-- 7. CASE WHEN Condicional y Bucle WHILE en T-SQL - SQL 🗄️\nDECLARE @contador INT = 1;\nWHILE @contador <= 3\nBEGIN\n    SELECT \n        @contador AS Iteracion,\n        CASE WHEN @contador % 2 = 0 THEN 'PAR' ELSE 'IMPAR' END AS Tipo;\n    SET @contador = @contador + 1;\nEND;`;
            exerciseCode = `-- Ejercicio Evaluado: CASE WHEN (SQL)\nSELECT CASE WHEN 7 = 7 THEN 'Curso 07 Completado' END AS resultado;`;
            prompt = `📌 DESAFÍO 07 (Intermedio): CASE WHEN Condicional (SQL)\nUtiliza una cláusula CASE WHEN para proyectar "Curso 07 Completado".`;
        } else if (lang === 'typescript') {
            exampleCode = `// 7. Discriminated Union y Typed Control Flow - TypeScript 🟦\ntype Shape = \n  | { kind: "circle"; radius: number }\n  | { kind: "square"; side: number };\n\nfunction getArea(shape: Shape): number {\n  switch (shape.kind) {\n    case "circle": return Math.PI * shape.radius ** 2;\n    case "square": return shape.side ** 2;\n  }\n}\nconsole.log(\`Área Círculo: \${getArea({ kind: "circle", radius: 5 }).toFixed(2)}\`);`;
            exerciseCode = `// Ejercicio Evaluado: Discriminated Switch (TypeScript)\nconst curso: number = 7;\nconst msg: string = curso === 7 ? "Curso 07 Completado" : "Error";\nconsole.log(msg);`;
            prompt = `📌 DESAFÍO 07 (Intermedio): Ternario Tipado (TypeScript)\nEvalúa el condicional ternario e imprime "Curso 07 Completado".`;
        } else if (lang === 'solidity') {
            exampleCode = `// SPDX-License-Identifier: MIT\n// 7. Require, Revert y Iteración de Arrays - Solidity ⛓️\npragma solidity ^0.8.0;\n\ncontract ControlFlowAdvanced {\n    uint256[] public numeros = [10, 20, 30, 40];\n    \n    function sumarArray() public view returns (uint256 total) {\n        require(numeros.length > 0, "Array vacio");\n        for (uint256 i = 0; i < numeros.length; i++) {\n            total += numeros[i];\n        }\n    }\n}`;
            exerciseCode = `// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\ncontract FlowExercise {\n    function verificar(uint256 x) public pure returns (string memory) {\n        require(x == 7, "Valor invalido");\n        return "Curso 07 Completado";\n    }\n}`;
            prompt = `📌 DESAFÍO 07 (Intermedio): Require y Validación (Solidity)\nDefine la función verificar(7) que use require y devuelva "Curso 07 Completado".`;
        }
    }
    // 8. Funciones, consultas y metodos (Intermedio) - Curso 08
    else if (cid === 'p2-08' || num === 8) {
        if (lang === 'python') {
            exampleCode = `# 8. Funciones Lambda, Default Args y Kwargs - Python 🐍\ndef crear_perfil(nombre, rol="Estudiante", *habilidades, **metadata):\n    print(f"Usuario: {nombre} | Rol: {rol}")\n    print(f"Habilidades: {list(habilidades)}")\n    print(f"Meta: {metadata}")\n\ncrear_perfil("Carlos", "Developer", "Python", "SQL", activo=True, nivel="Intermedio")`;
            exerciseCode = `# Ejercicio Evaluado: Lambda & Kwargs (Python)\ncalcular_modulo = lambda n: f"Curso {n:02d} Completado"\nprint(calcular_modulo(8))`;
            prompt = `📌 DESAFÍO 08 (Intermedio): Lambda Functions (Python)\nDefine una función lambda que reciba el número 8 y retorne "Curso 08 Completado".`;
        } else if (lang === 'cpp') {
            exampleCode = `// 8. Sobrecarga de Funciones y Parámetros por Referencia - C++ ⚙️\n#include <iostream>\n#include <string>\n\nvoid duplicarValor(int &numero) {\n    numero *= 2;\n}\n\nstd::string formatear(std::string msg) {\n    return "[INFO] " + msg;\n}\n\nint main() {\n    int val = 25;\n    duplicarValor(val);\n    std::cout << formatear("Valor duplicado: " + std::to_string(val)) << std::endl;\n    return 0;\n}`;
            exerciseCode = `// Ejercicio Evaluado: Referencias & Overloading (C++)\n#include <iostream>\n#include <string>\n\nvoid completarCurso(std::string &status) {\n    status = "Curso 08 Completado";\n}\n\nint main() {\n    std::string s = "";\n    completarCurso(s);\n    std::cout << s << std::endl;\n    return 0;\n}`;
            prompt = `📌 DESAFÍO 08 (Intermedio): Paso por Referencia (C++)\nModifica una variable string por referencia (&) asignándole e imprimiendo "Curso 08 Completado".`;
        } else if (lang === 'rust') {
            exampleCode = `// 8. Referencias Mutables, Closures y Result - Rust 🦀\nfn procesar_dato(val: &mut i32) -> Result<i32, &'static str> {\n    if *val < 0 {\n        return Err("Valor negativo");\n    }\n    *val *= 10;\n    Ok(*val)\n}\n\nfn main() {\n    let mut numero = 5;\n    let closure_suma = |a: i32, b: i32| a + b;\n    println!("Closure Suma: {}", closure_suma(10, 20));\n    let _ = procesar_dato(&mut numero);\n}`;
            exerciseCode = `// Ejercicio Evaluado: Closures (Rust)\nfn main() {\n    let obtener_msg = |c: i32| format!("Curso 0{} Completado", c);\n    println!("{}", obtener_msg(8));\n}`;
            prompt = `📌 DESAFÍO 08 (Intermedio): Closures en Rust (Rust)\nDefine una closure en Rust que reciba 8 y formatee "Curso 08 Completado".`;
        } else if (lang === 'node') {
            exampleCode = `// 8. Arrow Functions, Rest Parameters y Callbacks - Node.js 🟢\nconst procesarItems = (multiplicador, ...items) => {\n    return items.map(item => item * multiplicador);\n};\n\nconst ejecutarAsincrono = (callback) => {\n    const data = procesarItems(2, 10, 20, 30);\n    callback(data);\n};\n\nejecutarAsincrono(resultados => console.log("Resultados:", resultados));`;
            exerciseCode = `// Ejercicio Evaluado: Arrow Functions (Node.js)\nconst getCourseStatus = (code) => \`Curso 0\${code} Completado\`;\nconsole.log(getCourseStatus(8));`;
            prompt = `📌 DESAFÍO 08 (Intermedio): Arrow Functions & Rest Parameters (Node.js)\nCrea una arrow function que reciba 8 y devuelva \`Curso 08 Completado\`.`;
        } else if (lang === 'java') {
            exampleCode = `// 8. Sobrecarga de Métodos y Parámetros - Java ☕\npublic class Main {\n    public static int calcular(int a, int b) {\n        return a + b;\n    }\n    public static double calcular(double a, double b) {\n        return a * b;\n    }\n\n    public static void main(String[] args) {\n        System.out.println("Suma Enteros: " + calcular(10, 20));\n        System.out.println("Prod Doubles: " + calcular(2.5, 4.0));\n    }\n}`;
            exerciseCode = `// Ejercicio Evaluado: Method Overloading (Java)\npublic class Main {\n    public static String getStatus(int c) {\n        return "Curso 0" + c + " Completado";\n    }\n    public static void main(String[] args) {\n        System.out.println(getStatus(8));\n    }\n}`;
            prompt = `📌 DESAFÍO 08 (Intermedio): Sobrecarga de Métodos (Java)\nImplementa el método getStatus(8) que retorne "Curso 08 Completado".`;
        } else if (lang === 'sql') {
            exampleCode = `-- 8. Funciones Agregadas, GROUP BY y HAVING - SQL 🗄️\nSELECT \n    departamento,\n    COUNT(*) AS TotalEmpleados,\n    AVG(salario) AS PromedioSalario\nFROM (\n    SELECT 'IT' AS departamento, 3500 AS salario\n    UNION ALL\n    SELECT 'IT', 4500\n    UNION ALL\n    SELECT 'Ventas', 2800\n) AS Datos\nGROUP BY departamento\nHAVING AVG(salario) > 3000;`;
            exerciseCode = `-- Ejercicio Evaluado: Agregaciones (SQL)\nSELECT COUNT(*) AS total, 'Curso 08 Completado' AS status\nFROM (SELECT 1 AS x UNION ALL SELECT 2) t;`;
            prompt = `📌 DESAFÍO 08 (Intermedio): Subconsultas y Agregaciones (SQL)\nRealiza una agregación COUNT(*) y proyecta "Curso 08 Completado".`;
        } else if (lang === 'typescript') {
            exampleCode = `// 8. Generics Básicos y Method Signatures - TypeScript 🟦\nfunction envolverEnRespuesta<T>(datos: T, status: number = 200) {\n    return {\n        timestamp: new Date(),\n        status,\n        datos\n    };\n}\n\nconst respString = envolverEnRespuesta<string>("Payload de prueba");\nconst respNum = envolverEnRespuesta<number>(404);\nconsole.log(respString.datos, "| Status:", respNum.status);`;
            exerciseCode = `// Ejercicio Evaluado: Generic Function (TypeScript)\nfunction getInfo<T>(val: T): string {\n    return \`Curso \${val} Completado\`;\n}\nconsole.log(getInfo<string>("08"));`;
            prompt = `📌 DESAFÍO 08 (Intermedio): Funciones Genéricas (TypeScript)\nCrea una función genérica getInfo<T> que reciba "08" y devuelva \`Curso 08 Completado\`.`;
        } else if (lang === 'solidity') {
            exampleCode = `// SPDX-License-Identifier: MIT\n// 8. Retorno Múltiple de Tuplas y Modificadores - Solidity ⛓️\npragma solidity ^0.8.0;\n\ncontract AdvancedFunctions {\n    address public owner;\n    \n    constructor() {\n        owner = msg.sender;\n    }\n    \n    modifier onlyOwner() {\n        require(msg.sender == owner, "No autorizado");\n        _;\n    }\n    \n    function obtenerEstadisticas() public pure returns (uint256 total, bool activo, string memory tag) {\n        return (100, true, "OK");\n    }\n}`;
            exerciseCode = `// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\ncontract FunctionsExercise {\n    function getStatus() public pure returns (bool, string memory) {\n        return (true, "Curso 08 Completado");\n    }\n}`;
            prompt = `📌 DESAFÍO 08 (Intermedio): Retorno de Tuplas (Solidity)\nDefine la función getStatus() que devuelva la tupla (true, "Curso 08 Completado").`;
        }
    }

    // =========================================================================
    // 🟪 NIVEL AVANZADO (Cursos 09 - 12)
    // =========================================================================

    // 9. Hola Mundo & Mensaje (Avanzado) - Curso 09
    else if (cid === 'p3-09' || num === 9) {
        if (lang === 'python') {
            exampleCode = `# 9. Motor de Logging Estructurado Enterprise - Python 🐍\nimport logging\nimport sys\nimport json\nfrom datetime import datetime\n\nclass JSONFormatter(logging.Formatter):\n    def format(self, record):\n        log_obj = {\n            "timestamp": datetime.utcnow().isoformat(),\n            "level": record.levelname,\n            "message": record.getMessage(),\n            "module": record.module\n        }\n        return json.dumps(log_obj)\n\nlogger = logging.getLogger("EnterpriseApp")\nlogger.setLevel(logging.INFO)\nhandler = logging.StreamHandler(sys.stdout)\nhandler.setFormatter(JSONFormatter())\nlogger.addHandler(handler)\n\nlogger.info("Sistema de Logging Inicializado Correctamente")`;
            exerciseCode = `# Ejercicio Evaluado: Logging Estructurado (Python)\nimport sys\nsys.stdout.write("[LOG-ENTERPRISE] Curso 09 Completado\\n")`;
            prompt = `📌 DESAFÍO 09 (Avanzado): Motor de Logging e I/O Streams (Python)\nEscribe directamente en sys.stdout la cadena "[LOG-ENTERPRISE] Curso 09 Completado".`;
        } else if (lang === 'cpp') {
            exampleCode = `// 9. Logger Thread-Safe con Overloading de Operators - C++ ⚙️\n#include <iostream>\n#include <string>\n#include <sstream>\n\nenum class LogLevel { INFO, WARNING, ERROR };\n\nclass ThreadLogger {\npublic:\n    static void log(LogLevel level, const std::string& msg) {\n        std::string prefix = (level == LogLevel::INFO) ? "[INFO]" : "[ERROR]";\n        std::cout << prefix << " " << msg << std::endl;\n    }\n};\n\nint main() {\n    ThreadLogger::log(LogLevel::INFO, "Logger avanzado thread-safe inicializado.");\n    return 0;\n}`;
            exerciseCode = `// Ejercicio Evaluado: Custom Logger Class (C++)\n#include <iostream>\n#include <string>\n\nclass CustomLogger {\npublic:\n    static void emit(const std::string& msg) {\n        std::cout << "[ADVANCED-LOG] " << msg << std::endl;\n    }\n};\n\nint main() {\n    CustomLogger::emit("Curso 09 Completado");\n    return 0;\n}`;
            prompt = `📌 DESAFÍO 09 (Avanzado): Thread-Safe Logger Engine (C++)\nImplementa CustomLogger::emit() e imprime "[ADVANCED-LOG] Curso 09 Completado".`;
        } else if (lang === 'rust') {
            exampleCode = `// 9. Macros Personalizadas y Display Trait - Rust 🦀\nuse std::fmt;\n\nstruct SystemLog {\n    level: &'static str,\n    message: String,\n}\n\nimpl fmt::Display for SystemLog {\n    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {\n        write!(f, "[LOG :: {}] {}", self.level, self.message)\n    }\n}\n\nfn main() {\n    let entry = SystemLog { level: "INFO", message: "Motor Rust Iniciado".to_string() };\n    println!("{}", entry);\n}`;
            exerciseCode = `// Ejercicio Evaluado: Custom Macro (Rust)\nmacro_rules! log_advanced {\n    ($msg:expr) => {\n        println!("[RUST-ADVANCED] {}", $msg);\n    };\n}\n\nfn main() {\n    log_advanced!("Curso 09 Completado");\n}`;
            prompt = `📌 DESAFÍO 09 (Avanzado): Declaraciones Macro (Rust)\nCrea la macro log_advanced! e imprime "[RUST-ADVANCED] Curso 09 Completado".`;
        } else if (lang === 'node') {
            exampleCode = `// 9. Stream Piping y Event-Driven Logger - Node.js 🟢\nconst EventEmitter = require('events');\n\nclass LoggerService extends EventEmitter {\n    log(level, message) {\n        const payload = { timestamp: Date.now(), level, message };\n        this.emit('log', payload);\n    }\n}\n\nconst logger = new LoggerService();\nlogger.on('log', (data) => {\n    process.stdout.write(\`[\${data.level}] \${data.message} (\${data.timestamp})\\n\`);\n});\nlogger.log("INFO", "Logger asíncrono configurado.");`;
            exerciseCode = `// Ejercicio Evaluado: Event Logger (Node.js)\nconst EventEmitter = require('events');\nconst ee = new EventEmitter();\nee.on('complete', (msg) => console.log(\`[EVENT-LOG] \${msg}\`));\nee.emit('complete', 'Curso 09 Completado');`;
            prompt = `📌 DESAFÍO 09 (Avanzado): EventEmitter Logging (Node.js)\nUtiliza EventEmitter para emitir el evento 'complete' con la cadena \`Curso 09 Completado\`.`;
        } else if (lang === 'java') {
            exampleCode = `// 9. Enterprise Logger Framework - Java ☕\nimport java.time.Instant;\n\npublic class Main {\n    public static class EnterpriseLogger {\n        public static void log(String level, String message) {\n            String threadName = Thread.currentThread().getName();\n            String timestamp = Instant.now().toString();\n            System.out.printf("[%s] [%s] [%s] %s%n", timestamp, threadName, level, message);\n        }\n    }\n\n    public static void main(String[] args) {\n        EnterpriseLogger.log("INFO", "Sistema de trazabilidad Java activo.");\n    }\n}`;
            exerciseCode = `// Ejercicio Evaluado: Enterprise Logger (Java)\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("[JAVA-ADVANCED-LOG] Curso 09 Completado");\n    }\n}`;
            prompt = `📌 DESAFÍO 09 (Avanzado): Logging Architecture (Java)\nImprime el mensaje estructurado "[JAVA-ADVANCED-LOG] Curso 09 Completado".`;
        } else if (lang === 'sql') {
            exampleCode = `-- 9. Execution Diagnostics con RAISERROR - SQL 🗄️\nDECLARE @ErrorMessage NVARCHAR(4000) = 'Ejecución de diagnóstico de sistema';\nPRINT '[DIAGNOSTICO] ' + @ErrorMessage;\n\nSELECT \n    GETDATE() AS TimestampExecution,\n    @@SPID AS SessionID,\n    'COMPLETADO' AS StatusEngine;`;
            exerciseCode = `-- Ejercicio Evaluado: Diagnostics (SQL)\nPRINT 'Curso 09 Completado';\nSELECT 'Curso 09 Completado' AS OutputLog;`;
            prompt = `📌 DESAFÍO 09 (Avanzado): Procedimientos de Diagnóstico (SQL)\nEjecuta PRINT 'Curso 09 Completado' y proyecta la columna OutputLog con "Curso 09 Completado".`;
        } else if (lang === 'typescript') {
            exampleCode = `// 9. Generic Context Logger Service - TypeScript 🟦\nenum Severity { DEBUG, INFO, WARN, ERROR }\n\ninterface LogMeta {\n    userId: string;\n    action: string;\n}\n\nclass SystemLogger<T extends LogMeta> {\n    log(level: Severity, message: string, meta: T): void {\n        console.log(\`[\${Severity[level]}] \${message} | User: \${meta.userId} | Action: \${meta.action}\`);\n    }\n}\n\nconst sysLogger = new SystemLogger<LogMeta>();\nsysLogger.log(Severity.INFO, "Acción procesada", { userId: "U-100", action: "UPDATE" });`;
            exerciseCode = `// Ejercicio Evaluado: Typed System Logger (TypeScript)\nclass TSLogger {\n    static log(msg: string): void {\n        console.log(\`[TS-ADVANCED] \${msg}\`);\n    }\n}\nTSLogger.log("Curso 09 Completado");`;
            prompt = `📌 DESAFÍO 09 (Avanzado): Logger Genérico (TypeScript)\nImplementa TSLogger.log() e imprime \`[TS-ADVANCED] Curso 09 Completado\`.`;
        } else if (lang === 'solidity') {
            exampleCode = `// SPDX-License-Identifier: MIT\n// 9. Indexed Event Emission Engine - Solidity ⛓️\npragma solidity ^0.8.0;\n\ncontract AdvancedEventLogger {\n    event AdvancedLog(\n        address indexed sender,\n        uint256 indexed timestamp,\n        string message\n    );\n    \n    function triggerEvent(string memory msgText) public {\n        emit AdvancedLog(msg.sender, block.timestamp, msgText);\n    }\n}`;
            exerciseCode = `// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\ncontract EventExercise {\n    event Completed(string status);\n    function emitStatus() public {\n        emit Completed("Curso 09 Completado");\n    }\n}`;
            prompt = `📌 DESAFÍO 09 (Avanzado): Event Emission Indexing (Solidity)\nDefine el evento Completed(string) y la función emitStatus() emitiendo "Curso 09 Completado".`;
        }
    }
    // 10. Variables y Tipo de Datos (Avanzado) - Curso 10
    else if (cid === 'p3-10' || num === 10) {
        if (lang === 'python') {
            exampleCode = `# 10. Memory Optimization con __slots__ y Generic TypeVars - Python 🐍\nfrom typing import TypeVar, Generic\nimport sys\n\nT = TypeVar('T')\n\nclass ContenedorHeap(Generic[T]):\n    __slots__ = ('_data', '_ref_count')\n    def __init__(self, data: T):\n        self._data = data\n        self._ref_count = 1\n        \n    def get_data(self) -> T:\n        return self._data\n\ninstancia = ContenedorHeap[int](2026)\nprint(f"Dato Heap: {instancia.get_data()} | Slots Size: {sys.getsizeof(instancia)} bytes")`;
            exerciseCode = `# Ejercicio Evaluado: Slots y Memoria (Python)\nclass EstadoOptimizado:\n    __slots__ = ('status',)\n    def __init__(self):\n        self.status = "Curso 10 Completado"\n\ne = EstadoOptimizado()\nprint(e.status)`;
            prompt = `📌 DESAFÍO 10 (Avanzado): Optimización de Memoria __slots__ (Python)\nDefine una clase con __slots__ = ('status',) e imprime "Curso 10 Completado".`;
        } else if (lang === 'cpp') {
            exampleCode = `// 10. Smart Pointers (std::unique_ptr & std::shared_ptr) - C++ ⚙️\n#include <iostream>\n#include <memory>\n#include <string>\n\nclass Resource {\npublic:\n    std::string name;\n    Resource(std::string n) : name(n) { std::cout << "[ALLOC] " << name << std::endl; }\n    ~Resource() { std::cout << "[DEALLOC] " << name << std::endl; }\n};\n\nint main() {\n    std::unique_ptr<Resource> res = std::make_unique<Resource>("HeapObject_2026");\n    std::cout << "Recurso en Heap: " << res->name << std::endl;\n    return 0;\n}`;
            exerciseCode = `// Ejercicio Evaluado: Smart Pointers (C++)\n#include <iostream>\n#include <memory>\n#include <string>\n\nint main() {\n    auto ptr = std::make_unique<std::string>("Curso 10 Completado");\n    std::cout << *ptr << std::endl;\n    return 0;\n}`;
            prompt = `📌 DESAFÍO 10 (Avanzado): Asignación Dinámica con unique_ptr (C++)\nCrea un std::unique_ptr<std::string> con "Curso 10 Completado" e imprímelo desreferenciándolo.`;
        } else if (lang === 'rust') {
            exampleCode = `// 10. Box<T>, Punteros Heap y Trazabilidad de Lifetimes - Rust 🦀\nstruct HeapWrapper<T> {\n    data: Box<T>,\n}\n\nimpl<T> HeapWrapper<T> {\n    fn new(val: T) -> Self {\n        HeapWrapper { data: Box::new(val) }\n    }\n}\n\nfn main() {\n    let boxed_val = HeapWrapper::new("Dato en Heap Rust");\n    println!("Valor en Box: {}", boxed_val.data);\n}`;
            exerciseCode = `// Ejercicio Evaluado: Box Heap Allocation (Rust)\nfn main() {\n    let heap_data: Box<&str> = Box::new("Curso 10 Completado");\n    println!("{}", heap_data);\n}`;
            prompt = `📌 DESAFÍO 10 (Avanzado): Asignación en Heap con Box<T> (Rust)\nAsigna un Box::new("Curso 10 Completado") e imprímelo en consola.`;
        } else if (lang === 'node') {
            exampleCode = `// 10. Buffer API, TypedArrays y ArrayBuffer - Node.js 🟢\nconst buffer = Buffer.alloc(16);\nbuffer.write("DevHub 2026", "utf-8");\n\nconst arrayBuffer = new ArrayBuffer(8);\nconst view = new Int32Array(arrayBuffer);\nview[0] = 2026;\n\nconsole.log("Buffer Text:", buffer.toString("utf-8").trim());\nconsole.log("TypedArray Int32:", view[0]);`;
            exerciseCode = `// Ejercicio Evaluado: Buffer Allocation (Node.js)\nconst buf = Buffer.from("Curso 10 Completado");\nconsole.log(buf.toString("utf-8"));`;
            prompt = `📌 DESAFÍO 10 (Avanzado): Manipulación Binaria con Buffer (Node.js)\nCrea un Buffer.from("Curso 10 Completado") e imprímelo en formato utf-8.`;
        } else if (lang === 'java') {
            exampleCode = `// 10. Java Generics y Collections Framework - Java ☕\nimport java.util.Map;\nimport java.util.HashMap;\n\npublic class Main {\n    public static class StorageEngine<K, V> {\n        private Map<K, V> map = new HashMap<>();\n        public void put(K key, V val) { map.put(key, val); }\n        public V get(K key) { return map.get(key); }\n    }\n\n    public static void main(String[] args) {\n        StorageEngine<String, Integer> engine = new StorageEngine<>();\n        engine.put("Year", 2026);\n        System.out.println("Storage Engine Heap Value: " + engine.get("Year"));\n    }\n}`;
            exerciseCode = `// Ejercicio Evaluado: Generics (Java)\nimport java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> list = new ArrayList<>();\n        list.add("Curso 10 Completado");\n        System.out.println(list.get(0));\n    }\n}`;
            prompt = `📌 DESAFÍO 10 (Avanzado): Estructuras de Memoria Genéricas (Java)\nUtiliza List<String> para agregar y recuperar "Curso 10 Completado".`;
        } else if (lang === 'sql') {
            exampleCode = `-- 10. Manipulación de Objetos JSON en Columnas - SQL 🗄️\nDECLARE @jsonPayload NVARCHAR(MAX) = N'{"curso":{"id":10,"name":"Variables Avanzadas","status":"OK"}}';\n\nSELECT \n    JSON_VALUE(@jsonPayload, '$.curso.id') AS CursoID,\n    JSON_VALUE(@jsonPayload, '$.curso.name') AS CursoNombre,\n    JSON_VALUE(@jsonPayload, '$.curso.status') AS Estado;`;
            exerciseCode = `-- Ejercicio Evaluado: JSON Extraction (SQL)\nSELECT JSON_VALUE('{"msg":"Curso 10 Completado"}', '$.msg') AS resultado;`;
            prompt = `📌 DESAFÍO 10 (Avanzado): Parseo de Objetos JSON (SQL)\nUtiliza JSON_VALUE para extraer y proyectar "Curso 10 Completado".`;
        } else if (lang === 'typescript') {
            exampleCode = `// 10. Mapped Types y Utility Types - TypeScript 🟦\ninterface UserProfile {\n    id: number;\n    username: string;\n    email: string;\n}\n\ntype ReadonlyProfile = Readonly<UserProfile>;\ntype PartialProfile = Partial<UserProfile>;\n\nconst user: ReadonlyProfile = { id: 10, username: "DevMaster", email: "master@fp.edu" };\nconsole.log(\`Profile ID: \${user.id} | User: \${user.username}\`);`;
            exerciseCode = `// Ejercicio Evaluado: Utility Types (TypeScript)\ntype Payload<T> = Readonly<{ data: T }>;\nconst res: Payload<string> = { data: "Curso 10 Completado" };\nconsole.log(res.data);`;
            prompt = `📌 DESAFÍO 10 (Avanzado): Mapped & Utility Types (TypeScript)\nDefine el tipo Readonly Payload<T> e imprime \`Curso 10 Completado\`.`;
        } else if (lang === 'solidity') {
            exampleCode = `// SPDX-License-Identifier: MIT\n// 10. Optimized Storage Layout y Nested Struct Mappings - Solidity ⛓️\npragma solidity ^0.8.0;\n\ncontract AdvancedStorage {\n    struct Item {\n        uint128 id;    // Packed in slot\n        uint128 price;\n        string name;\n    }\n    \n    mapping(address => mapping(uint256 => Item)) public userItems;\n    \n    function setItem(uint256 index, uint128 price, string memory name) public {\n        userItems[msg.sender][index] = Item(uint128(index), price, name);\n    }\n}`;
            exerciseCode = `// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\ncontract StorageExercise {\n    struct Status { string text; }\n    mapping(uint256 => Status) public statuses;\n    constructor() {\n        statuses[10] = Status("Curso 10 Completado");\n    }\n}`;
            prompt = `📌 DESAFÍO 10 (Avanzado): Struct Mappings (Solidity)\nCrea un mapping de structs e inicializa statuses[10] con "Curso 10 Completado".`;
        }
    }
    // 11. Condiciones y Bucles (Avanzado) - Curso 11
    else if (cid === 'p3-11' || num === 11) {
        if (lang === 'python') {
            exampleCode = `# 11. Guard Clauses, List Comprehensions y Generators - Python 🐍\ndef procesar_transaccion(monto: float, activo: bool) -> str:\n    # Guard Clauses (Early Return)\n    if not activo: return "Error: Cuenta Inactiva"\n    if monto <= 0: return "Error: Monto Invalido"\n    \n    return f"Transaccion Aprobada: USD {monto}"\n\n# Generator Expression\nnumeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\npares_cuadrados = [x**2 for x in numeros if x % 2 == 0]\n\nprint(procesar_transaccion(150.0, True))\nprint(f"Pares Cuadrados: {pares_cuadrados}")`;
            exerciseCode = `# Ejercicio Evaluado: Guard Clauses (Python)\ndef validar_curso(nivel):\n    if nivel != 11: return "Invalido"\n    return "Curso 11 Completado"\n\nprint(validar_curso(11))`;
            prompt = `📌 DESAFÍO 11 (Avanzado): Cláusulas de Guarda / Early Return (Python)\nImplementa una guard clause que retorne "Curso 11 Completado" cuando el argumento sea 11.`;
        } else if (lang === 'cpp') {
            exampleCode = `// 11. Predicados Lambda con Algoritmos STL - C++ ⚙️\n#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> datos = {10, 25, 40, 55, 70, 85};\n    \n    // Algoritmo STL con predicado Lambda\n    auto it = std::find_if(datos.begin(), datos.end(), [](int val) {\n        return val > 50 && val % 2 == 0;\n    });\n    \n    if (it != datos.end()) {\n        std::cout << "Primer par > 50 encontrado: " << *it << std::endl;\n    }\n    return 0;\n}`;
            exerciseCode = `// Ejercicio Evaluado: STL Predicate (C++)\n#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> v = {11};\n    bool allMatch = std::all_of(v.begin(), v.end(), [](int n){ return n == 11; });\n    if (allMatch) std::cout << "Curso 11 Completado" << std::endl;\n    return 0;\n}`;
            prompt = `📌 DESAFÍO 11 (Avanzado): Predicados Lambda STL (C++)\nUtiliza std::all_of con una lambda e imprime "Curso 11 Completado".`;
        } else if (lang === 'rust') {
            exampleCode = `// 11. Tubos Iteradores (Pipelines) e if-let Pattern - Rust 🦀\nfn main() {\n    let numeros = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n    \n    // Iterator Pipeline: filter -> map -> collect\n    let resultado: Vec<i32> = numeros.into_iter()\n        .filter(|x| x % 2 == 0)\n        .map(|x| x * 10)\n        .collect();\n        \n    println!("Pipeline Processed: {:?}", resultado);\n}`;
            exerciseCode = `// Ejercicio Evaluado: Iterator Pipeline (Rust)\nfn main() {\n    let nums = vec![11];\n    let res: Vec<String> = nums.into_iter()\n        .filter(|n| *n == 11)\n        .map(|_| "Curso 11 Completado".to_string())\n        .collect();\n    println!("{}", res[0]);\n}`;
            prompt = `📌 DESAFÍO 11 (Avanzado): Pipings de Iteradores (Rust)\nFiltra y mapea un vector usando iteradores en Rust e imprime "Curso 11 Completado".`;
        } else if (lang === 'node') {
            exampleCode = `// 11. Early Returns, Generator Functions y Array Filters - Node.js 🟢\nfunction* generadorId() {\n    let id = 100;\n    while (true) {\n        yield id++;\n    }\n}\n\nconst gen = generadorId();\nconst datos = [10, 15, 20, 25, 30];\nconst paresFiltrados = datos.filter(x => x % 2 === 0).map(x => x * 2);\n\nconsole.log("ID Gen:", gen.next().value, "| Pares Filtrados:", paresFiltrados);`;
            exerciseCode = `// Ejercicio Evaluado: Generator Function (Node.js)\nfunction* cursoGenerator() {\n    yield "Curso 11 Completado";\n}\nconst g = cursoGenerator();\nconsole.log(g.next().value);`;
            prompt = `📌 DESAFÍO 11 (Avanzado): Funciones Generadoras (Node.js)\nCrea una función generadora function* que emita \`Curso 11 Completado\`.`;
        } else if (lang === 'java') {
            exampleCode = `// 11. Stream API Filtering Pipeline - Java ☕\nimport java.util.List;\nimport java.util.Arrays;\nimport java.util.stream.Collectors;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> numeros = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);\n        List<Integer> paresAlCuadrado = numeros.stream()\n            .filter(n -> n % 2 == 0)\n            .map(n -> n * n)\n            .collect(Collectors.toList());\n            \n        System.out.println("Stream Filtered: " + paresAlCuadrado);\n    }\n}`;
            exerciseCode = `// Ejercicio Evaluado: Stream API (Java)\nimport java.util.Arrays;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> list = Arrays.asList(11);\n        list.stream().filter(n -> n == 11).forEach(n -> System.out.println("Curso 11 Completado"));\n    }\n}`;
            prompt = `📌 DESAFÍO 11 (Avanzado): Streams Pipeline (Java)\nFiltra una lista con el Stream API e imprime "Curso 11 Completado".`;
        } else if (lang === 'sql') {
            exampleCode = `-- 11. Window Functions (ROW_NUMBER) y CTEs - SQL 🗄️\nWITH VentaRankings AS (\n    SELECT \n        'Vendedor A' AS Vendedor, 5000 AS TotalVentas\n    UNION ALL\n    SELECT 'Vendedor B', 7500\n    UNION ALL\n    SELECT 'Vendedor C', 3200\n)\nSELECT \n    Vendedor,\n    TotalVentas,\n    ROW_NUMBER() OVER (ORDER BY TotalVentas DESC) AS RankingPosicion\nFROM VentaRankings;`;
            exerciseCode = `-- Ejercicio Evaluado: CTE (SQL)\nWITH StatusCTE AS (\n    SELECT 'Curso 11 Completado' AS StatusMsg\n)\nSELECT StatusMsg FROM StatusCTE;`;
            prompt = `📌 DESAFÍO 11 (Avanzado): Common Table Expressions CTE (SQL)\nCrea una CTE llamada StatusCTE e imprime "Curso 11 Completado".`;
        } else if (lang === 'typescript') {
            exampleCode = `// 11. User-Defined Type Guards - TypeScript 🟦\ninterface AdminUser { role: 'admin'; permissions: string[]; }\ninterface BasicUser { role: 'basic'; name: string; }\ntype User = AdminUser | BasicUser;\n\nfunction isAdmin(user: User): user is AdminUser {\n    return user.role === 'admin';\n}\n\nconst u: User = { role: 'admin', permissions: ['ALL'] };\nif (isAdmin(u)) {\n    console.log(\`Admin detectado con permisos: \${u.permissions.join(', ')}\`);\n}`;
            exerciseCode = `// Ejercicio Evaluado: Type Guard (TypeScript)\nfunction checkLevel(val: any): val is number {\n    return typeof val === 'number';\n}\nif (checkLevel(11)) console.log("Curso 11 Completado");`;
            prompt = `📌 DESAFÍO 11 (Avanzado): Guardas de Tipo Personalizadas (TypeScript)\nDefine una guarda de tipo checkLevel e imprime \`Curso 11 Completado\`.`;
        } else if (lang === 'solidity') {
            exampleCode = `// SPDX-License-Identifier: MIT\n// 11. Custom Revert Errors y Guard Clauses - Solidity ⛓️\npragma solidity ^0.8.0;\n\ncontract CustomErrorGuard {\n    error Unauthorized(address caller);\n    error InvalidAmount(uint256 amount);\n    \n    address public owner = msg.sender;\n    \n    function withdraw(uint256 amount) public {\n        if (msg.sender != owner) revert Unauthorized(msg.sender);\n        if (amount == 0) revert InvalidAmount(amount);\n    }\n}`;
            exerciseCode = `// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\ncontract ErrorExercise {\n    error CourseError();\n    function checkCourse(uint256 c) public pure returns (string memory) {\n        if (c != 11) revert CourseError();\n        return "Curso 11 Completado";\n    }\n}`;
            prompt = `📌 DESAFÍO 11 (Avanzado): Errores Personalizados Revert (Solidity)\nDefine un custom error CourseError() y retorne "Curso 11 Completado" si c es 11.`;
        }
    }
    // 12. Funciones, consultas y metodos (Avanzado) - Curso 12
    else if (cid === 'p3-12' || num === 12) {
        if (lang === 'python') {
            exampleCode = `# 12. Decoradores, Memoización y Higher-Order Functions - Python 🐍\nimport functools\nimport time\n\ndef medir_tiempo(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        inicio = time.time()\n        resultado = func(*args, **kwargs)\n        duracion = time.time() - inicio\n        print(f"[METRICA] Func {func.__name__} tomo {duracion:.6f}s")\n        return resultado\n    return wrapper\n\n@functools.lru_cache(maxsize=32)\n@medir_tiempo\ndef fibonacci(n):\n    if n <= 1: return n\n    return fibonacci(n - 1) + fibonacci(n - 2)\n\nprint(f"Fibonacci(10) = {fibonacci(10)}")`;
            exerciseCode = `# Ejercicio Evaluado: Decoradores (Python)\ndef decorador_curso(func):\n    def wrapper():\n        return f"Curso {func()} Completado"\n    return wrapper\n\n@decorador_curso\ndef obtener_num(): return 12\n\nprint(obtener_num())`;
            prompt = `📌 DESAFÍO 12 (Avanzado): Decoradores de Funciones (Python)\nCrea un decorador que transforme la función e imprima "Curso 12 Completado".`;
        } else if (lang === 'cpp') {
            exampleCode = `// 12. Variadic Templates y Callbacks Lambda - C++ ⚙️\n#include <iostream>\n#include <functional>\n\ntemplate<typename T>\nT sumar(T val) {\n    return val;\n}\n\ntemplate<typename T, typename... Args>\nT sumar(T first, Args... args) {\n    return first + sumar(args...);\n}\n\nint main() {\n    std::cout << "Suma Variádica: " << sumar(10, 20, 30, 40) << std::endl;\n    return 0;\n}`;
            exerciseCode = `// Ejercicio Evaluado: Variadic Function (C++)\n#include <iostream>\n#include <string>\n\ntemplate<typename... Args>\nvoid printAdvancedLog(Args... args) {\n    (std::cout << ... << args) << std::endl;\n}\n\nint main() {\n    printAdvancedLog("Curso ", 12, " Completado");\n    return 0;\n}`;
            prompt = `📌 DESAFÍO 12 (Avanzado): Variadic Templates (C++)\nImplementa una función variádica e imprime "Curso 12 Completado".`;
        } else if (lang === 'rust') {
            exampleCode = `// 12. High-Order Trait Bounds (Fn, FnMut, FnOnce) - Rust 🦀\nfn aplicar_operacion<F>(val: i32, op: F) -> i32 \nwhere\n    F: Fn(i32) -> i32,\n{\n    op(val)\n}\n\nfn main() {\n    let duplicar = |x: i32| x * 2;\n    let resultado = aplicar_operacion(21, duplicar);\n    println!("Resultado High-Order: {}", resultado);\n}`;
            exerciseCode = `// Ejercicio Evaluado: High-Order Fn Trait (Rust)\nfn ejecutar_closure<F>(f: F)\nwhere F: Fn() -> &'static str {\n    println!("{}", f());\n}\n\nfn main() {\n    ejecutar_closure(|| "Curso 12 Completado");\n}`;
            prompt = `📌 DESAFÍO 12 (Avanzado): Higher-Order Closures (Rust)\nPasa una closure como parámetro con trait bound Fn() e imprime "Curso 12 Completado".`;
        } else if (lang === 'node') {
            exampleCode = `// 12. Function Currying y High-Order Wrappers - Node.js 🟢\nconst curriedSum = a => b => c => a + b + c;\nconst asyncWrapper = fn => async (...args) => {\n    try {\n        return await fn(...args);\n    } catch (err) {\n        console.error("Error atrapado:", err.message);\n    }\n};\n\nconst operacion = async (x) => x * 10;\nconst operacionSegura = asyncWrapper(operacion);\noperacionSegura(5).then(res => console.log("Currying & Async Wrapper:", curriedSum(1)(2)(3), "| Res:", res));`;
            exerciseCode = `// Ejercicio Evaluado: Function Currying (Node.js)\nconst compose = f => g => x => f(g(x));\nconst addCode = x => \`Curso \${x}\`;\nconst addDone = str => \`\${str} Completado\`;\nconsole.log(compose(addDone)(addCode)(12));`;
            prompt = `📌 DESAFÍO 12 (Avanzado): Composición de Funciones (Node.js)\nImplementa función de composición curried que imprima \`Curso 12 Completado\`.`;
        } else if (lang === 'java') {
            exampleCode = `// 12. Functional Interfaces y Stream Reduction - Java ☕\nimport java.util.function.Function;\nimport java.util.function.Predicate;\n\npublic class Main {\n    public static void main(String[] args) {\n        Function<String, String> addPrefix = s -> "[FUNC] " + s;\n        Function<String, String> addSuffix = s -> s + " [OK]";\n        Function<String, String> pipeline = addPrefix.andThen(addSuffix);\n        \n        System.out.println(pipeline.apply("Modulo Avanzado Procesado"));\n    }\n}`;
            exerciseCode = `// Ejercicio Evaluado: Functional Interface (Java)\nimport java.util.function.Function;\n\npublic class Main {\n    public static void main(String[] args) {\n        Function<Integer, String> mapper = c -> "Curso " + c + " Completado";\n        System.out.println(mapper.apply(12));\n    }\n}`;
            prompt = `📌 DESAFÍO 12 (Avanzado): Functional Interfaces (Java)\nUtiliza Function<Integer, String> para mapear 12 a "Curso 12 Completado".`;
        } else if (lang === 'sql') {
            exampleCode = `-- 12. Stored Procedures con Transacciones ACID - SQL 🗄️\nCREATE PROCEDURE sp_ProcesarTransaccion\n    @Monto DECIMAL(10,2)\nAS\nBEGIN\n    BEGIN TRANSACTION;\n    BEGIN TRY\n        PRINT 'Iniciando Transaccion...';\n        COMMIT TRANSACTION;\n        SELECT 'Curso 12 Completado' AS StatusTransaccion;\n    END TRY\n    BEGIN CATCH\n        ROLLBACK TRANSACTION;\n        PRINT 'Error detectado. Rollback ejecutado.';\n    END CATCH\nEND;\n\nEXEC sp_ProcesarTransaccion @Monto = 100.00;`;
            exerciseCode = `-- Ejercicio Evaluado: Stored Procedure (SQL)\nCREATE PROCEDURE sp_TestStatus AS\nBEGIN\n    SELECT 'Curso 12 Completado' AS resultado;\nEND;\nEXEC sp_TestStatus;`;
            prompt = `📌 DESAFÍO 12 (Avanzado): Transacciones y Stored Procedures (SQL)\nEjecuta un Stored Procedure que proyecte "Curso 12 Completado".`;
        } else if (lang === 'typescript') {
            exampleCode = `// 12. Advanced Generic High-Order Composition - TypeScript 🟦\ntype Func<T, R> = (arg: T) => R;\n\nfunction compose<A, B, C>(f: Func<B, C>, g: Func<A, B>): Func<A, C> {\n    return (x: A) => f(g(x));\n}\n\nconst step1: Func<number, string> = (n) => \`Curso \${n}\`;\nconst step2: Func<string, string> = (s) => \`\${s} Completado\`;\nconst combined = compose(step2, step1);\n\nconsole.log(combined(12));`;
            exerciseCode = `// Ejercicio Evaluado: Generic Composition (TypeScript)\ntype Mapper<T> = (val: T) => string;\nconst executeMapper = <T>(val: T, fn: Mapper<T>): string => fn(val);\nconsole.log(executeMapper(12, n => \`Curso \${n} Completado\`));`;
            prompt = `📌 DESAFÍO 12 (Avanzado): Composición Genérica (TypeScript)\nEjecuta la composición genérica enviando 12 para imprimir \`Curso 12 Completado\`.`;
        } else if (lang === 'solidity') {
            exampleCode = `// SPDX-License-Identifier: MIT\n// 12. Pure vs View, Assembly & Low-Level Calls - Solidity ⛓️\npragma solidity ^0.8.0;\n\ncontract AdvancedContract {\n    uint256 public counter = 100;\n    \n    function pureCalculation(uint256 a, uint256 b) public pure returns (uint256) {\n        return a * b + 12;\n    }\n    \n    function viewState() public view returns (uint256) {\n        return counter;\n    }\n    \n    fallback() external payable {}\n    receive() external payable {}\n}`;
            exerciseCode = `// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\ncontract FinalExercise {\n    function getFinalStatus() public pure returns (string memory) {\n        return "Curso 12 Completado";\n    }\n}`;
            prompt = `📌 DESAFÍO 12 (Avanzado): Pure View Methods (Solidity)\nDefine la función pure getFinalStatus() devolviendo "Curso 12 Completado".`;
        }
    }
    // Fallback
    else {
        exampleCode = `// Ejemplo Guiado - Curso ${numStr}: ${courseTitle}\nconsole.log("Demostración de ${courseTitle} en ${langName}");`;
        exerciseCode = `// Ejercicio Evaluado Curso ${numStr} (${courseTitle})\nconsole.log("Curso ${numStr} Completado");`;
        prompt = `📌 DESAFÍO DE CONSOLIDACIÓN (${langName} - Curso ${numStr}):\nAplica los conceptos de ${courseTitle} e imprime "Curso ${numStr} Completado".`;
    }

    return { exampleCode, exerciseCode, prompt };
}

window.closePracticeModal = function closePracticeModal() {
    const modal = document.getElementById('practice-modal-overlay');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
    document.body.style.overflow = '';
};

function initPracticeModalSystem() {
    const modal = document.getElementById('practice-modal-overlay');
    const closeBtn = document.getElementById('practice-modal-close');
    const langSelect = document.getElementById('practice-lang-select');
    const tabExample = document.getElementById('practice-tab-example');
    const tabExercise = document.getElementById('practice-tab-exercise');
    const viewExample = document.getElementById('practice-view-example');
    const viewExercise = document.getElementById('practice-view-exercise');
    const btnRunExample = document.getElementById('btn-run-practice-example');
    const btnRunExercise = document.getElementById('btn-run-practice-exercise');
    const btnEvalExercise = document.getElementById('btn-eval-practice-exercise');

    if (closeBtn) {
        closeBtn.addEventListener('click', closePracticeModal);
    }
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closePracticeModal();
            }
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePracticeModal();
        }
    });

    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            currentPracticeLang = e.target.value;
            loadPracticeContent();
        });
    }

    if (tabExample && tabExercise) {
        tabExample.addEventListener('click', () => {
            tabExample.classList.add('active');
            tabExercise.classList.remove('active');
            viewExample.classList.remove('hidden');
            viewExercise.classList.add('hidden');
        });
        tabExercise.addEventListener('click', () => {
            tabExercise.classList.add('active');
            tabExample.classList.remove('active');
            viewExercise.classList.remove('hidden');
            viewExample.classList.add('hidden');
        });
    }

    if (btnRunExample) {
        btnRunExample.addEventListener('click', () => {
            const code = document.getElementById('practice-example-editor').value;
            const result = executeCompilerRunner(currentPracticeLang, code);
            const terminal = document.getElementById('practice-example-terminal');
            if (terminal) {
                terminal.innerHTML = result.logs.map(l => `<div>${l}</div>`).join('');
                if (result.tableHtml) terminal.innerHTML += result.tableHtml;
            }
        });
    }

    if (btnRunExercise) {
        btnRunExercise.addEventListener('click', () => {
            const code = document.getElementById('practice-exercise-editor').value;
            const result = executeCompilerRunner(currentPracticeLang, code);
            const terminal = document.getElementById('practice-exercise-terminal');
            if (terminal) {
                terminal.innerHTML = result.logs.map(l => `<div>${l}</div>`).join('');
                if (result.tableHtml) terminal.innerHTML += result.tableHtml;
            }
        });
    }

    if (btnEvalExercise) {
        btnEvalExercise.addEventListener('click', () => {
            const code = document.getElementById('practice-exercise-editor').value;
            const result = executeCompilerRunner(currentPracticeLang, code);
            const terminal = document.getElementById('practice-exercise-terminal');
            const statusBadge = document.getElementById('exercise-status-badge');

            if (result.isError) {
                if (statusBadge) {
                    statusBadge.textContent = '❌ Error de Sintaxis';
                    statusBadge.className = 'terminal-status-badge term-error';
                }
                if (terminal) {
                    terminal.innerHTML = result.logs.map(l => `<div class="term-error">${l}</div>`).join('');
                }
                return;
            }

            if (statusBadge) {
                statusBadge.textContent = '✅ Ejercicio Aprobado';
                statusBadge.className = 'terminal-status-badge';
            }

            if (terminal) {
                terminal.innerHTML = result.logs.map(l => `<div class="term-log">${l}</div>`).join('');
                terminal.innerHTML += `<div style="color: #34d399; font-weight: bold; margin-top: 10px;">🎉 ¡EJERCICIO EVALUADO EXITOSAMENTE! Este curso ha sido APROBADO.</div>`;
            }

            if (currentPracticeCourseId) {
                markCourseAsCompleted(currentPracticeCourseId);

                const sequentialList = getSequentialCourses();
                const seqIndex = sequentialList.findIndex(c => c.id === currentPracticeCourseId);
                const nextCourse = sequentialList[seqIndex + 1];

                setTimeout(() => {
                    if (nextCourse) {
                        alert(`🎉 ¡Excelente Trabajo! Has aprobado el Curso ${String(seqIndex + 1).padStart(2, '0')}.\n\n🔓 ¡El Curso ${String(seqIndex + 2).padStart(2, '0')} (${nextCourse.title}) se ha habilitado y desbloqueado automáticamente!`);
                    } else {
                        alert(`🏆 ¡FELICIDADES HÉROE! Has completado y aprobado TODOS los Cursos de la Plataforma DevHub FP.`);
                    }
                    closePracticeModal();
                }, 600);
            }
        });
    }

    // Auto-guardado en tiempo real en localStorage al escribir
    const exerciseEditor = document.getElementById('practice-exercise-editor');
    if (exerciseEditor) {
        exerciseEditor.addEventListener('input', () => {
            if (currentPracticeCourseId && currentPracticeLang) {
                const saveKey = `devhub_saved_code_${currentPracticeCourseId}_${currentPracticeLang}`;
                localStorage.setItem(saveKey, exerciseEditor.value);
            }
        });
    }

    // Botones de Copiar Código
    const btnCopyExample = document.getElementById('btn-copy-example-code');
    const btnCopyExercise = document.getElementById('btn-copy-exercise-code');

    if (btnCopyExample) {
        btnCopyExample.addEventListener('click', () => {
            const code = document.getElementById('practice-example-editor').value;
            navigator.clipboard.writeText(code).then(() => {
                if (typeof showToast === 'function') showToast('📋 Código de ejemplo copiado al portapapeles', 'success');
            }).catch(() => {
                if (typeof showToast === 'function') showToast('❌ No se pudo copiar el código', 'error');
            });
        });
    }

    if (btnCopyExercise) {
        btnCopyExercise.addEventListener('click', () => {
            const code = document.getElementById('practice-exercise-editor').value;
            navigator.clipboard.writeText(code).then(() => {
                if (typeof showToast === 'function') showToast('📋 Tu solución fue copiada al portapapeles', 'success');
            }).catch(() => {
                if (typeof showToast === 'function') showToast('❌ No se pudo copiar la solución', 'error');
            });
        });
    }

    // Helper para descargar archivos de código
    function downloadCodeFile(filename, content) {
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        if (typeof showToast === 'function') showToast(`💾 Archivo ${filename} descargado con éxito`, 'success');
    }

    // Botones de Descargar Código
    const btnDownloadExample = document.getElementById('btn-download-example-code');
    const btnDownloadExercise = document.getElementById('btn-download-exercise-code');

    if (btnDownloadExample) {
        btnDownloadExample.addEventListener('click', () => {
            const code = document.getElementById('practice-example-editor').value;
            const filenameEl = document.getElementById('example-filename');
            const filename = (filenameEl && filenameEl.textContent.trim()) ? filenameEl.textContent.trim() : 'ejemplo_codigo.txt';
            downloadCodeFile(filename, code);
        });
    }

    if (btnDownloadExercise) {
        btnDownloadExercise.addEventListener('click', () => {
            const code = document.getElementById('practice-exercise-editor').value;
            const filenameEl = document.getElementById('exercise-filename');
            const filename = (filenameEl && filenameEl.textContent.trim()) ? filenameEl.textContent.trim() : 'solucion_estudiante.txt';
            downloadCodeFile(filename, code);
        });
    }

    // Botón de Restablecer Plantilla Inicial
    const btnResetExercise = document.getElementById('btn-reset-exercise-code');
    if (btnResetExercise) {
        btnResetExercise.addEventListener('click', () => {
            if (!currentPracticeCourseId) return;
            const confirmReset = confirm("¿Deseas restablecer el código a la plantilla inicial? Se borrarán los cambios locales guardados.");
            if (!confirmReset) return;

            const saveKey = `devhub_saved_code_${currentPracticeCourseId}_${currentPracticeLang}`;
            localStorage.removeItem(saveKey);

            const course = PDF_COURSES_DATA.find(c => c.id === currentPracticeCourseId);
            const sequentialList = getSequentialCourses();
            const seqIndex = sequentialList.findIndex(c => c.id === currentPracticeCourseId);
            const courseNum = seqIndex >= 0 ? seqIndex + 1 : 1;
            const practiceData = getCoursePracticeCode(course, currentPracticeLang, courseNum);

            const exerciseEditor = document.getElementById('practice-exercise-editor');
            if (exerciseEditor) exerciseEditor.value = practiceData.exerciseCode;
            if (typeof showToast === 'function') showToast('🔄 Plantilla del ejercicio restablecida', 'info');
        });
    }
}

/* ==========================================================================
   MIS CURSOS - EMBEDDED CURRICULUM DATA (4 CURSOS POR LENGUAJE)
   ========================================================================== */
const EMBEDDED_CURRICULUM_DATA = {
  "modules": [
    {
      "id": "cpp-c1",
      "lang": "cpp",
      "level": "c1",
      "title": "01. Hola Mundo & Mensaje en C++",
      "theoryMarkdown": "### 1. Hola Mundo & Mensaje en C++\nC++ requiere la directiva `#include <iostream>` y la función principal `int main()` como punto de entrada ejecutable. La salida de mensajes a consola se realiza mediante `cout <<`.\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"¡Hola Mundo desde C++!\" << endl;\n    cout << \"Bienvenidos al curso de Programacion FP.\" << endl;\n    return 0;\n}\n```",
      "initialCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"¡Hola Mundo desde C++!\" << endl;\n    cout << \"Bienvenidos al curso de Programacion FP.\" << endl;\n    return 0;\n}",
      "testCases": [{ "input": "N/A", "expectedOutput": "¡Hola Mundo desde C++!" }],
      "quiz": [
        { "id": 1, "question": "¿Qué directiva se incluye obligatoriamente en C++ para usar 'cout'?", "options": ["#include <iostream>", "#include <stdio.h>", "#include <string>", "import iostream"], "correctIndex": 0, "explanation": "<iostream> define los flujos estándar de entrada y salida." }
      ]
    },
    {
      "id": "cpp-c2",
      "lang": "cpp",
      "level": "c2",
      "title": "02. Variables y Tipo de Datos en C++",
      "theoryMarkdown": "### 2. Variables y Tipo de Datos en C++\nC++ es un lenguaje fuertemente tipado. Toda variable debe ser declarada especificando su tipo (`int`, `double`, `char`, `string`, `bool`).\n\n```cpp\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string nombre = \"Carlos\";\n    int edad = 20;\n    double promedio = 9.5;\n    cout << nombre << \" - Edad: \" << edad << \" - Nota: \" << promedio << endl;\n    return 0;\n}\n```",
      "initialCode": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string nombre = \"Carlos\";\n    int edad = 20;\n    double promedio = 9.5;\n    cout << nombre << \" - Edad: \" << edad << \" - Nota: \" << promedio << endl;\n    return 0;\n}",
      "testCases": [{ "input": "N/A", "expectedOutput": "Carlos - Edad: 20 - Nota: 9.5" }],
      "quiz": [
        { "id": 1, "question": "¿Qué tipo de dato de C++ almacena números con punto decimal?", "options": ["double / float", "int", "bool", "char"], "correctIndex": 0, "explanation": "double y float almacenan valores reales o decimales." }
      ]
    },
    {
      "id": "cpp-c3",
      "lang": "cpp",
      "level": "c3",
      "title": "03. Condiciones y Bucles en C++",
      "theoryMarkdown": "### 3. Condiciones y Bucles en C++\nPermiten la toma de decisiones con `if / else` y la repetición con bucles `for` o `while`.\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int bolsas = 4;\n    int precio = (bolsas >= 3) ? 25 : 35;\n    int total = bolsas * precio;\n    cout << \"El total a pagar es: \" << total << endl;\n    return 0;\n}\n```",
      "initialCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int bolsas = 4;\n    int precio = (bolsas >= 3) ? 25 : 35;\n    int total = bolsas * precio;\n    cout << \"El total a pagar es: \" << total << endl;\n    return 0;\n}",
      "testCases": [{ "input": "N/A", "expectedOutput": "El total a pagar es: 100" }],
      "quiz": [
        { "id": 1, "question": "¿Qué resultado produce (4 >= 3) ? 25 : 35?", "options": ["25", "35", "100", "0"], "correctIndex": 0, "explanation": "Dado que 4 >= 3 es verdadero, la expresión evalúa a 25." }
      ]
    },
    {
      "id": "cpp-c4",
      "lang": "cpp",
      "level": "c4",
      "title": "04. Funciones, Consultas y Métodos en C++",
      "theoryMarkdown": "### 4. Funciones y Métodos en C++\nLas funciones encapsulan lógica reutilizable y pueden recibir parámetros y devolver valores mediante `return`.\n\n```cpp\n#include <iostream>\nusing namespace std;\n\nint sumar(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    cout << \"Suma: \" << sumar(10, 5) << endl;\n    return 0;\n}\n```",
      "initialCode": "#include <iostream>\nusing namespace std;\n\nint sumar(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    cout << \"Suma: \" << sumar(10, 5) << endl;\n    return 0;\n}",
      "testCases": [{ "input": "N/A", "expectedOutput": "Suma: 15" }],
      "quiz": [
        { "id": 1, "question": "¿Qué palabra clave devuelve el resultado de una función en C++?", "options": ["return", "yield", "send", "out"], "correctIndex": 0, "explanation": "return entrega el valor calculated al llamante." }
      ]
    },
    {
      "id": "python-c1",
      "lang": "python",
      "level": "c1",
      "title": "01. Hola Mundo & Mensaje en Python",
      "theoryMarkdown": "### 1. Hola Mundo & Mensaje en Python\nEn Python, la impresión de mensajes en consola se realiza con la función integrada `print()`.\n\n```python\nprint(\"¡Hola Mundo desde Python!\")\nprint(\"Bienvenidos al curso de Programacion FP.\")\n```",
      "initialCode": "print(\"¡Hola Mundo desde Python!\")\nprint(\"Bienvenidos al curso de Programacion FP.\")",
      "testCases": [{ "input": "N/A", "expectedOutput": "¡Hola Mundo desde Python!" }],
      "quiz": [
        { "id": 1, "question": "¿Qué función imprime texto por consola en Python?", "options": ["print()", "cout <<", "System.out.println()", "console.log()"], "correctIndex": 0, "explanation": "print() es la función nativa de salida en Python." }
      ]
    },
    {
      "id": "python-c2",
      "lang": "python",
      "level": "c2",
      "title": "02. Variables y Tipo de Datos en Python",
      "theoryMarkdown": "### 2. Variables y Tipo de Datos en Python\nPython cuenta con tipado dinámico. Los tipos principales son `int`, `float`, `str` y `bool`.\n\n```python\nnombre = \"Carlos\"\nedad = 20\npromedio = 9.5\nprint(f\"{nombre} - Edad: {edad} - Nota: {promedio}\")\n```",
      "initialCode": "nombre = \"Carlos\"\nedad = 20\npromedio = 9.5\nprint(f\"{nombre} - Edad: {edad} - Nota: {promedio}\")",
      "testCases": [{ "input": "N/A", "expectedOutput": "Carlos - Edad: 20 - Nota: 9.5" }],
      "quiz": [
        { "id": 1, "question": "¿Cómo se denominan las cadenas formateadas f\"...\" en Python?", "options": ["F-Strings", "Template Literals", "Format Specs", "Str Injects"], "correctIndex": 0, "explanation": "Las f-strings permiten interpolación directa de expresiones en cadenas." }
      ]
    },
    {
      "id": "python-c3",
      "lang": "python",
      "level": "c3",
      "title": "03. Condiciones y Bucles en Python",
      "theoryMarkdown": "### 3. Condiciones y Bucles en Python\nPython evalúa condiciones con `if / elif / else` y bucles con `for` y `while` mediante sangría/indentación.\n\n```python\nbolsas = 4\nprecio = 25 if bolsas >= 3 else 35\ntotal = bolsas * precio\nprint(f\"El total a pagar es: {total}\")\n```",
      "initialCode": "bolsas = 4\nprecio = 25 if bolsas >= 3 else 35\ntotal = bolsas * precio\nprint(f\"El total a pagar es: {total}\")",
      "testCases": [{ "input": "N/A", "expectedOutput": "El total a pagar es: 100" }],
      "quiz": [
        { "id": 1, "question": "¿Cómo se delimitan los bloques de código en Python?", "options": ["Mediante sangría o indentación", "Con llaves {}", "Con parentesis ()", "Con punto y coma ;"], "correctIndex": 0, "explanation": "La sangría (espacios/tabulaciones) define la estructura de bloques." }
      ]
    },
    {
      "id": "python-c4",
      "lang": "python",
      "level": "c4",
      "title": "04. Funciones, Consultas y Métodos en Python",
      "theoryMarkdown": "### 4. Funciones y Métodos en Python\nLas funciones se definen con la palabra clave `def` y pueden retornar valores con `return`.\n\n```python\ndef sumar(a, b):\n    return a + b\n\nprint(f\"Suma: {sumar(10, 5)}\")\n```",
      "initialCode": "def sumar(a, b):\n    return a + b\n\nprint(f\"Suma: {sumar(10, 5)}\")",
      "testCases": [{ "input": "N/A", "expectedOutput": "Suma: 15" }],
      "quiz": [
        { "id": 1, "question": "¿Qué palabra clave declara una función en Python?", "options": ["def", "function", "fn", "func"], "correctIndex": 0, "explanation": "def declara la definición de una función." }
      ]
    },
    {
      "id": "rust-c1",
      "lang": "rust",
      "level": "c1",
      "title": "01. Hola Mundo & Mensaje en Rust",
      "theoryMarkdown": "### 1. Hola Mundo & Mensaje en Rust\nEn Rust, la ejecución inicia en `fn main()` y las salidas de texto se emiten mediante la macro `println!`.\n\n```rust\nfn main() {\n    println!(\"¡Hola Mundo desde Rust!\");\n    println!(\"Bienvenidos al curso de Programacion FP.\");\n}\n```",
      "initialCode": "fn main() {\n    println!(\"¡Hola Mundo desde Rust!\");\n    println!(\"Bienvenidos al curso de Programacion FP.\");\n}",
      "testCases": [{ "input": "N/A", "expectedOutput": "¡Hola Mundo desde Rust!" }],
      "quiz": [
        { "id": 1, "question": "¿Qué indica el signo '!' en println! en Rust?", "options": ["Que es una macro del compilador", "Que es una función asíncrona", "Que borra la memoria", "Que es privada"], "correctIndex": 0, "explanation": "El signo '!' distingue la invocación de una macro." }
      ]
    },
    {
      "id": "rust-c2",
      "lang": "rust",
      "level": "c2",
      "title": "02. Variables y Tipo de Datos en Rust",
      "theoryMarkdown": "### 2. Variables y Tipo de Datos en Rust\nLas variables en Rust son inmutables por defecto (`let x = 5;`). Para modificarlas se requiere `let mut`.\n\n```rust\nfn main() {\n    let nombre = \"Carlos\";\n    let edad: i32 = 20;\n    let promedio: f64 = 9.5;\n    println!(\"{} - Edad: {} - Nota: {}\", nombre, edad, promedio);\n}\n```",
      "initialCode": "fn main() {\n    let nombre = \"Carlos\";\n    let edad: i32 = 20;\n    let promedio: f64 = 9.5;\n    println!(\"{} - Edad: {} - Nota: {}\", nombre, edad, promedio);\n}",
      "testCases": [{ "input": "N/A", "expectedOutput": "Carlos - Edad: 20 - Nota: 9.5" }],
      "quiz": [
        { "id": 1, "question": "¿Cómo son las variables por defecto en Rust?", "options": ["Inmutables", "Mutables", "Globales", "Estáticas"], "correctIndex": 0, "explanation": "Rust promueve la seguridad haciendo las variables inmutables por defecto." }
      ]
    },
    {
      "id": "rust-c3",
      "lang": "rust",
      "level": "c3",
      "title": "03. Condiciones y Bucles en Rust",
      "theoryMarkdown": "### 3. Condiciones y Bucles en Rust\n`if` es una expresión en Rust que puede retornar un valor asignable.\n\n```rust\nfn main() {\n    let bolsas = 4;\n    let precio = if bolsas >= 3 { 25 } else { 35 };\n    println!(\"El total a pagar es: {}\", bolsas * precio);\n}\n```",
      "initialCode": "fn main() {\n    let bolsas = 4;\n    let precio = if bolsas >= 3 { 25 } else { 35 };\n    println!(\"El total a pagar es: {}\", bolsas * precio);\n}",
      "testCases": [{ "input": "N/A", "expectedOutput": "El total a pagar es: 100" }],
      "quiz": [
        { "id": 1, "question": "¿Cómo funciona el condicional 'if' en Rust?", "options": ["Es una expresión que retorna valores", "Solo acepta 0 y 1", "Obliga a usar paréntesis", "No permite else"], "correctIndex": 0, "explanation": "if devuelve el valor resultante de su último statement." }
      ]
    },
    {
      "id": "rust-c4",
      "lang": "rust",
      "level": "c4",
      "title": "04. Funciones, Consultas y Métodos en Rust",
      "theoryMarkdown": "### 4. Funciones y Métodos en Rust\nLas funciones se definen con `fn` especificando los tipos de los parámetros y el tipo de retorno con `->`.\n\n```rust\nfn sumar(a: i32, b: i32) -> i32 {\n    a + b\n}\n\nfn main() {\n    println!(\"Suma: {}\", sumar(10, 5));\n}\n```",
      "initialCode": "fn sumar(a: i32, b: i32) -> i32 {\n    a + b\n}\n\nfn main() {\n    println!(\"Suma: {}\", sumar(10, 5));\n}",
      "testCases": [{ "input": "N/A", "expectedOutput": "Suma: 15" }],
      "quiz": [
        { "id": 1, "question": "¿Cómo se especifica el tipo de retorno en una función en Rust?", "options": ["-> Tipo", ": Tipo", "=> Tipo", "as Tipo"], "correctIndex": 0, "explanation": "La flecha -> indica el tipo de retorno de la función." }
      ]
    },
    {
      "id": "node-c1",
      "lang": "node",
      "level": "c1",
      "title": "01. Hola Mundo & Mensaje en Node.js",
      "theoryMarkdown": "### 1. Hola Mundo & Mensaje en Node.js\nEn Node.js la salida de datos a consola se realiza con `console.log()`.\n\n```javascript\nconsole.log(\"¡Hola Mundo desde Node.js!\");\nconsole.log(\"Bienvenidos al curso de Programacion FP.\");\n```",
      "initialCode": "console.log(\"¡Hola Mundo desde Node.js!\");\nconsole.log(\"Bienvenidos al curso de Programacion FP.\");",
      "testCases": [{ "input": "N/A", "expectedOutput": "¡Hola Mundo desde Node.js!" }],
      "quiz": [
        { "id": 1, "question": "¿Qué método imprime mensajes en la consola de Node.js?", "options": ["console.log()", "print()", "cout <<", "System.out.println()"], "correctIndex": 0, "explanation": "console.log() escribe la salida en stdout." }
      ]
    },
    {
      "id": "node-c2",
      "lang": "node",
      "level": "c2",
      "title": "02. Variables y Tipo de Datos en Node.js",
      "theoryMarkdown": "### 2. Variables y Tipo de Datos en Node.js\nUsa `const` para constantes e inmutabilidad de referencia, y `let` para variables reasignables.\n\n```javascript\nconst nombre = \"Carlos\";\nconst edad = 20;\nconst promedio = 9.5;\nconsole.log(`${nombre} - Edad: ${edad} - Nota: ${promedio}`);\n```",
      "initialCode": "const nombre = \"Carlos\";\nconst edad = 20;\nconst promedio = 9.5;\nconsole.log(`${nombre} - Edad: ${edad} - Nota: ${promedio}`);",
      "testCases": [{ "input": "N/A", "expectedOutput": "Carlos - Edad: 20 - Nota: 9.5" }],
      "quiz": [
        { "id": 1, "question": "¿Qué diferencia existe entre 'const' y 'let'?", "options": ["const prohíbe reasignar la referencia; let la permite", "let es solo para números", "const es más lento", "Son idénticas"], "correctIndex": 0, "explanation": "const prohíbe la reasignación de variables." }
      ]
    },
    {
      "id": "node-c3",
      "lang": "node",
      "level": "c3",
      "title": "03. Condiciones y Bucles en Node.js",
      "theoryMarkdown": "### 3. Condiciones y Bucles en Node.js\nUtiliza condicionales `if / else`, ternario `? :` y bucles `for`, `while` o `.forEach()`.\n\n```javascript\nconst bolsas = 4;\nconst precio = bolsas >= 3 ? 25 : 35;\nconst total = bolsas * precio;\nconsole.log(`El total a pagar es: ${total}`);\n```",
      "initialCode": "const bolsas = 4;\nconst precio = bolsas >= 3 ? 25 : 35;\nconst total = bolsas * precio;\nconsole.log(`El total a pagar es: ${total}`);",
      "testCases": [{ "input": "N/A", "expectedOutput": "El total a pagar es: 100" }],
      "quiz": [
        { "id": 1, "question": "¿Qué comillas permiten interpolación directa de expresiones en Node.js?", "options": ["Comillas invertidas ``", "Comillas simples ''", "Comillas dobles \"\"", "Ninguna"], "correctIndex": 0, "explanation": "Las comillas invertidas permiten la interpolación ${expresion}." }
      ]
    },
    {
      "id": "node-c4",
      "lang": "node",
      "level": "c4",
      "title": "04. Funciones, Consultas y Métodos en Node.js",
      "theoryMarkdown": "### 4. Funciones y Métodos en Node.js\nLas funciones pueden declararse con la palabra clave `function` o con funciones flecha (Arrow Functions).\n\n```javascript\nconst sumar = (a, b) => a + b;\nconsole.log(`Suma: ${sumar(10, 5)}`);\n```",
      "initialCode": "const sumar = (a, b) => a + b;\nconsole.log(`Suma: ${sumar(10, 5)}`);",
      "testCases": [{ "input": "N/A", "expectedOutput": "Suma: 15" }],
      "quiz": [
        { "id": 1, "question": "¿Cómo se declara una Arrow Function en JavaScript/Node.js?", "options": ["(a, b) => a + b", "function(a,b) => a+b", "def (a,b) => a+b", "lambda a,b: a+b"], "correctIndex": 0, "explanation": "Sintaxis compacta de funciones con el operador flecha =>." }
      ]
    },
    {
      "id": "java-c1",
      "lang": "java",
      "level": "c1",
      "title": "01. Hola Mundo & Mensaje en Java",
      "theoryMarkdown": "### 1. Hola Mundo & Mensaje en Java\nEn Java todo código reside en una clase (`public class Main`) e inicia en `main`.\n\n```java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"¡Hola Mundo desde Java!\");\n        System.out.println(\"Bienvenidos al curso de Programacion FP.\");\n    }\n}\n```",
      "initialCode": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"¡Hola Mundo desde Java!\");\n        System.out.println(\"Bienvenidos al curso de Programacion FP.\");\n    }\n}",
      "testCases": [{ "input": "N/A", "expectedOutput": "¡Hola Mundo desde Java!" }],
      "quiz": [
        { "id": 1, "question": "¿Qué método imprime una línea de texto en consola en Java?", "options": ["System.out.println()", "console.log()", "cout <<", "print()"], "correctIndex": 0, "explanation": "System.out.println() escribe en la salida estándar." }
      ]
    },
    {
      "id": "java-c2",
      "lang": "java",
      "level": "c2",
      "title": "02. Variables y Tipo de Datos en Java",
      "theoryMarkdown": "### 2. Variables y Tipo de Datos en Java\nJava es fuertemente tipado. Declaración con `String`, `int`, `double`, `boolean`.\n\n```java\npublic class Main {\n    public static void main(String[] args) {\n        String nombre = \"Carlos\";\n        int edad = 20;\n        double promedio = 9.5;\n        System.out.println(nombre + \" - Edad: \" + edad + \" - Nota: \" + promedio);\n    }\n}\n```",
      "initialCode": "public class Main {\n    public static void main(String[] args) {\n        String nombre = \"Carlos\";\n        int edad = 20;\n        double promedio = 9.5;\n        System.out.println(nombre + \" - Edad: \" + edad + \" - Nota: \" + promedio);\n    }\n}",
      "testCases": [{ "input": "N/A", "expectedOutput": "Carlos - Edad: 20 - Nota: 9.5" }],
      "quiz": [
        { "id": 1, "question": "¿Qué tipo de dato de Java almacena cadenas de texto?", "options": ["String", "char", "text", "str"], "correctIndex": 0, "explanation": "String es la clase que representa cadenas de caracteres en Java." }
      ]
    },
    {
      "id": "java-c3",
      "lang": "java",
      "level": "c3",
      "title": "03. Condiciones y Bucles en Java",
      "theoryMarkdown": "### 3. Condiciones y Bucles en Java\nEvaluación de condiciones con `if / else` y operador ternario `? :`.\n\n```java\npublic class Main {\n    public static void main(String[] args) {\n        int bolsas = 4;\n        int precio = (bolsas >= 3) ? 25 : 35;\n        int total = bolsas * precio;\n        System.out.println(\"El total a pagar es: \" + total);\n    }\n}\n```",
      "initialCode": "public class Main {\n    public static void main(String[] args) {\n        int bolsas = 4;\n        int precio = (bolsas >= 3) ? 25 : 35;\n        int total = bolsas * precio;\n        System.out.println(\"El total a pagar es: \" + total);\n    }\n}",
      "testCases": [{ "input": "N/A", "expectedOutput": "El total a pagar es: 100" }],
      "quiz": [
        { "id": 1, "question": "¿Qué devuelve (4 >= 3) ? 25 : 35 en Java?", "options": ["25", "35", "100", "0"], "correctIndex": 0, "explanation": "La condición es verdadera por lo que retorna 25." }
      ]
    },
    {
      "id": "java-c4",
      "lang": "java",
      "level": "c4",
      "title": "04. Funciones, Consultas y Métodos en Java",
      "theoryMarkdown": "### 4. Funciones y Métodos en Java\nLos métodos se definen dentro de la clase y pueden ser estáticos (`static`) para invocación directa.\n\n```java\npublic class Main {\n    public static int sumar(int a, int b) {\n        return a + b;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Suma: \" + sumar(10, 5));\n    }\n}\n```",
      "initialCode": "public class Main {\n    public static int sumar(int a, int b) {\n        return a + b;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Suma: \" + sumar(10, 5));\n    }\n}",
      "testCases": [{ "input": "N/A", "expectedOutput": "Suma: 15" }],
      "quiz": [
        { "id": 1, "question": "¿Qué indica la palabra 'static' en un método de Java?", "options": ["Que pertenece a la clase y no requiere instanciar un objeto", "Que es privado", "Que no se puede ejecutar", "Que es lento"], "correctIndex": 0, "explanation": "static asocia el método a la clase." }
      ]
    },
    {
      "id": "sql-c1",
      "lang": "sql",
      "level": "c1",
      "title": "01. Hola Mundo & Mensaje en SQL",
      "theoryMarkdown": "### 1. Hola Mundo & Mensaje en SQL\nSQL utiliza la instrucción `SELECT` para proyectar mensajes o cadenas por pantalla.\n\n```sql\nSELECT '¡Hola Mundo desde SQL!' AS mensaje;\n```",
      "initialCode": "SELECT '¡Hola Mundo desde SQL!' AS mensaje;",
      "testCases": [{ "input": "N/A", "expectedOutput": "¡Hola Mundo desde SQL!" }],
      "quiz": [
        { "id": 1, "question": "¿Qué comando proyecta datos o mensajes en SQL?", "options": ["SELECT", "PRINT", "SHOW", "DISPLAY"], "correctIndex": 0, "explanation": "SELECT proyecta el conjunto de resultados de una consulta." }
      ]
    },
    {
      "id": "sql-c2",
      "lang": "sql",
      "level": "c2",
      "title": "02. Variables y Tipo de Datos en SQL",
      "theoryMarkdown": "### 2. Tablas y Tipos de Datos en SQL\nDefinición de tablas con DDL (`CREATE TABLE`) y tipos relacionales (`INT`, `TEXT`, `REAL`).\n\n```sql\nCREATE TABLE estudiantes (id INT, nombre TEXT, nota REAL);\nINSERT INTO estudiantes VALUES (1, 'Carlos', 9.5);\nSELECT * FROM estudiantes;\n```",
      "initialCode": "CREATE TABLE estudiantes (id INT, nombre TEXT, nota REAL);\nINSERT INTO estudiantes VALUES (1, 'Carlos', 9.5);\nSELECT * FROM estudiantes;",
      "testCases": [{ "input": "N/A", "expectedOutput": "Carlos" }],
      "quiz": [
        { "id": 1, "question": "¿Qué comando DDL crea una tabla en SQL?", "options": ["CREATE TABLE", "MAKE TABLE", "ADD TABLE", "NEW TABLE"], "correctIndex": 0, "explanation": "CREATE TABLE establece el esquema." }
      ]
    },
    {
      "id": "sql-c3",
      "lang": "sql",
      "level": "c3",
      "title": "03. Condiciones y Bucles en SQL",
      "theoryMarkdown": "### 3. Condiciones y Filtrado en SQL\nFiltrado de datos con predicados `WHERE` y evaluación por filas con `CASE WHEN`.\n\n```sql\nCREATE TABLE compras (id INT, bolsas INT, total INT);\nINSERT INTO compras VALUES (1, 4, 100), (2, 2, 70);\nSELECT * FROM compras WHERE bolsas >= 3;\n```",
      "initialCode": "CREATE TABLE compras (id INT, bolsas INT, total INT);\nINSERT INTO compras VALUES (1, 4, 100), (2, 2, 70);\nSELECT * FROM compras WHERE bolsas >= 3;",
      "testCases": [{ "input": "N/A", "expectedOutput": "100" }],
      "quiz": [
        { "id": 1, "question": "¿Qué cláusula filtra filas en una consulta SQL?", "options": ["WHERE", "FILTER", "HAVING", "CHECK"], "correctIndex": 0, "explanation": "WHERE filtra registros según una condición booleana." }
      ]
    },
    {
      "id": "sql-c4",
      "lang": "sql",
      "level": "c4",
      "title": "04. Funciones, Consultas y Métodos en SQL",
      "theoryMarkdown": "### 4. Funciones de Agregación y Consultas Avanzadas\nAgregación de datos mediante `COUNT()`, `SUM()`, `AVG()` y combinaciones con `INNER JOIN`.\n\n```sql\nCREATE TABLE alumnos (id INT, nombre TEXT);\nCREATE TABLE notas (alumno_id INT, calificacion INT);\nINSERT INTO alumnos VALUES (1, 'Carlos');\nINSERT INTO notas VALUES (1, 100);\n\nSELECT alumnos.nombre, notas.calificacion \nFROM alumnos \nINNER JOIN notas ON alumnos.id = notas.alumno_id;\n```",
      "initialCode": "CREATE TABLE alumnos (id INT, nombre TEXT);\nCREATE TABLE notas (alumno_id INT, calificacion INT);\nINSERT INTO alumnos VALUES (1, 'Carlos');\nINSERT INTO notas VALUES (1, 100);\nSELECT alumnos.nombre, notas.calificacion FROM alumnos INNER JOIN notas ON alumnos.id = notas.alumno_id;",
      "testCases": [{ "input": "N/A", "expectedOutput": "100" }],
      "quiz": [
        { "id": 1, "question": "¿Qué función calcula la suma total de una columna numérica?", "options": ["SUM()", "TOTAL()", "COUNT()", "ADD()"], "correctIndex": 0, "explanation": "SUM() calcula la suma de todos los valores de la columna." }
      ]
    },
    {
      "id": "typescript-c1",
      "lang": "typescript",
      "level": "c1",
      "title": "01. Hola Mundo & Mensaje en TypeScript",
      "theoryMarkdown": "### 1. Hola Mundo & Mensaje en TypeScript\nTypeScript transpila a JavaScript y emite salida por consola con `console.log()`.\n\n```typescript\nlet mensaje: string = \"¡Hola Mundo desde TypeScript!\";\nconsole.log(mensaje);\n```",
      "initialCode": "let mensaje: string = \"¡Hola Mundo desde TypeScript!\";\nconsole.log(mensaje);",
      "testCases": [{ "input": "N/A", "expectedOutput": "¡Hola Mundo desde TypeScript!" }],
      "quiz": [
        { "id": 1, "question": "¿Cómo se especifica el tipo explícito de una variable en TypeScript?", "options": ["let v: string = 'texto'", "let string v = 'texto'", "string v = 'texto'", "var v = 'texto'"], "correctIndex": 0, "explanation": "Sintaxis variable: tipo = valor." }
      ]
    },
    {
      "id": "typescript-c2",
      "lang": "typescript",
      "level": "c2",
      "title": "02. Variables y Tipo de Datos en TypeScript",
      "theoryMarkdown": "### 2. Variables y Tipo de Datos en TypeScript\nVerificación estática con tipos primitivos (`number`, `string`, `boolean`).\n\n```typescript\nconst nombre: string = \"Carlos\";\nconst edad: number = 20;\nconst promedio: number = 9.5;\nconsole.log(`${nombre} - Edad: ${edad} - Nota: ${promedio}`);\n```",
      "initialCode": "const nombre: string = \"Carlos\";\nconst edad: number = 20;\nconst promedio: number = 9.5;\nconsole.log(`${nombre} - Edad: ${edad} - Nota: ${promedio}`);",
      "testCases": [{ "input": "N/A", "expectedOutput": "Carlos - Edad: 20 - Nota: 9.5" }],
      "quiz": [
        { "id": 1, "question": "¿Qué tipo se usa para números enteros y decimales en TypeScript?", "options": ["number", "int", "float", "double"], "correctIndex": 0, "explanation": "number es el único tipo numérico estático de TypeScript." }
      ]
    },
    {
      "id": "typescript-c3",
      "lang": "typescript",
      "level": "c3",
      "title": "03. Condiciones y Bucles en TypeScript",
      "theoryMarkdown": "### 3. Condiciones y Bucles en TypeScript\nEvaluación de condicionales con verificaciones de tipo estáticas.\n\n```typescript\nconst bolsas: number = 4;\nconst precio: number = bolsas >= 3 ? 25 : 35;\nconst total: number = bolsas * precio;\nconsole.log(`El total a pagar es: ${total}`);\n```",
      "initialCode": "const bolsas: number = 4;\nconst precio: number = bolsas >= 3 ? 25 : 35;\nconst total: number = bolsas * precio;\nconsole.log(`El total a pagar es: ${total}`);",
      "testCases": [{ "input": "N/A", "expectedOutput": "El total a pagar es: 100" }],
      "quiz": [
        { "id": 1, "question": "¿Qué ventaja aporta TypeScript en las condiciones?", "options": ["Valida tipos en compilación para prevenir errores de tipo", "Ejecuta más rápido", "No requiere variables", "Borra el navegador"], "correctIndex": 0, "explanation": "Atrapa incoherencias de tipos en tiempo de desarrollo." }
      ]
    },
    {
      "id": "typescript-c4",
      "lang": "typescript",
      "level": "c4",
      "title": "04. Funciones, Consultas y Métodos en TypeScript",
      "theoryMarkdown": "### 4. Funciones y Métodos en TypeScript\nFirmas de funciones fuertemente tipadas con parámetros y tipo de retorno explícito.\n\n```typescript\nfunction sumar(a: number, b: number): number {\n    return a + b;\n}\nconsole.log(`Suma: ${sumar(10, 5)}`);\n```",
      "initialCode": "function sumar(a: number, b: number): number {\n    return a + b;\n}\nconsole.log(`Suma: ${sumar(10, 5)}`);",
      "testCases": [{ "input": "N/A", "expectedOutput": "Suma: 15" }],
      "quiz": [
        { "id": 1, "question": "¿Cómo se indica el tipo de retorno de una función en TypeScript?", "options": ["function f(): number", "function f() -> number", "function f() as number", "function number f()"], "correctIndex": 0, "explanation": "Se coloca dos puntos y el tipo tras los paréntesis de parámetros." }
      ]
    },
    {
      "id": "solidity-c1",
      "lang": "solidity",
      "level": "c1",
      "title": "01. Hola Mundo & Mensaje en Solidity",
      "theoryMarkdown": "### 1. Hola Mundo & Mensaje en Solidity EVM\nSmart Contracts en la EVM con variables de estado públicas.\n\n```solidity\n// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract HolaMundo {\n    string public mensaje = \"¡Hola Mundo desde Solidity!\";\n}\n```",
      "initialCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract HolaMundo {\n    string public mensaje = \"¡Hola Mundo desde Solidity!\";\n}",
      "testCases": [{ "input": "N/A", "expectedOutput": "¡Hola Mundo desde Solidity!" }],
      "quiz": [
        { "id": 1, "question": "¿Dónde residen y se ejecutan los contratos de Solidity?", "options": ["En la EVM (Ethereum Virtual Machine)", "En un servidor Node.js", "En el navegador directamente", "En una BD SQL"], "correctIndex": 0, "explanation": "Solidity compila a bytecode que se ejecuta en la EVM." }
      ]
    },
    {
      "id": "solidity-c2",
      "lang": "solidity",
      "level": "c2",
      "title": "02. Variables y Tipo de Datos en Solidity",
      "theoryMarkdown": "### 2. Variables y Tipo de Datos en Solidity\nVariables de estado en `storage` primitivas como `uint256`, `address`, `string`, `bool`.\n\n```solidity\n// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract Datos {\n    string public nombre = \"Carlos\";\n    uint256 public edad = 20;\n}\n```",
      "initialCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract Datos {\n    string public nombre = \"Carlos\";\n    uint256 public edad = 20;\n}",
      "testCases": [{ "input": "N/A", "expectedOutput": "Carlos" }],
      "quiz": [
        { "id": 1, "question": "¿Qué tipo entero sin signo de 256 bits se utiliza nativamente en la EVM?", "options": ["uint256", "int", "number", "long"], "correctIndex": 0, "explanation": "uint256 es el entero nativo de 256 bits en EVM." }
      ]
    },
    {
      "id": "solidity-c3",
      "lang": "solidity",
      "level": "c3",
      "title": "03. Condiciones y Bucles en Solidity",
      "theoryMarkdown": "### 3. Condiciones y Control de Flujo en Solidity\nUso de `if / else`, ternario `? :` y la instrucción de validación de condiciones `require()`.\n\n```solidity\n// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract Compra {\n    string public estado = \"El total a pagar es: 100\";\n}\n```",
      "initialCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract Compra {\n    string public estado = \"El total a pagar es: 100\";\n}",
      "testCases": [{ "input": "N/A", "expectedOutput": "El total a pagar es: 100" }],
      "quiz": [
        { "id": 1, "question": "¿Qué función de validación revierte la transacción si una condición no se cumple?", "options": ["require()", "assert()", "revert()", "check()"], "correctIndex": 0, "explanation": "require() evalúa la condición y revierte los cambios si es falsa." }
      ]
    },
    {
      "id": "solidity-c4",
      "lang": "solidity",
      "level": "c4",
      "title": "04. Funciones, Consultas y Métodos en Solidity",
      "theoryMarkdown": "### 4. Funciones y Modificadores de Visibilidad en Solidity\nFunciones `pure` y `view` con especificadores de visibilidad (`public`, `external`, `internal`, `private`).\n\n```solidity\n// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract Calculadora {\n    function sumar(uint256 a, uint256 b) public pure returns (uint256) {\n        return a + b;\n    }\n}\n```",
      "initialCode": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract Calculadora {\n    function sumar(uint256 a, uint256 b) public pure returns (uint256) {\n        return a + b;\n    }\n}",
      "testCases": [{ "input": "N/A", "expectedOutput": "15" }],
      "quiz": [
        { "id": 1, "question": "¿Qué modificador indica que una función no lee ni modifica el estado de la cadena?", "options": ["pure", "view", "payable", "public"], "correctIndex": 0, "explanation": "pure realiza cálculos aislados únicamente con sus argumentos." }
      ]
    }
  ]
};

/* ==========================================================================
   MIS CURSOS - SPLIT VIEW & EXECUTOR ENGINE CONTROLLER (UNKLOCK PROGRESSION)
   ========================================================================== */
let coursesDataGlobal = null;
let currentCourseLang = 'cpp';
let currentCourseLevel = 'c1';

const LANGUAGE_PROGRESSION_SEQUENCE = [
    { id: 'cpp', name: 'C++', icon: '⚙️' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'rust', name: 'Rust', icon: '🦀' },
    { id: 'node', name: 'Node.js', icon: '🟢' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'sql', name: 'SQL', icon: '🗄️' },
    { id: 'typescript', name: 'TypeScript', icon: '🟦' },
    { id: 'solidity', name: 'Solidity', icon: '⛓️' }
];

let isDocenteAdminMode = localStorage.getItem('devhub_docente_admin_mode') === 'true';

function isLanguageUnlocked(langId) {
    if (isDocenteAdminMode) return true; // 👑 Modo Docente/Administrador: ¡Todo Desbloqueado!
    
    const idx = LANGUAGE_PROGRESSION_SEQUENCE.findIndex(l => l.id === langId);
    if (idx <= 0) return true; // C++ is unlocked by default!
    
    const prevLangId = LANGUAGE_PROGRESSION_SEQUENCE[idx - 1].id;
    return isLanguageCompleted(prevLangId);
}

function initDocenteAdminToggle() {
    const btn = document.getElementById('btn-toggle-docente-admin');
    if (!btn) return;

    function updateBtnUI() {
        if (isDocenteAdminMode) {
            btn.textContent = '👑 Modo Docente: ACTIVADO (Todo Desbloqueado)';
            btn.className = 'btn btn-primary btn-sm';
            btn.style.background = '#f59e0b';
            btn.style.color = '#000';
            btn.style.fontWeight = 'bold';
        } else {
            btn.textContent = '👑 Modo Docente: Desbloquear Todo';
            btn.className = 'btn btn-outline btn-sm';
            btn.style.borderColor = '#f59e0b';
            btn.style.color = '#f59e0b';
        }
    }

    updateBtnUI();

    btn.addEventListener('click', () => {
        isDocenteAdminMode = !isDocenteAdminMode;
        localStorage.setItem('devhub_docente_admin_mode', isDocenteAdminMode ? 'true' : 'false');
        updateBtnUI();
        updateLanguageSelectorUI();

        if (isDocenteAdminMode) {
            if (typeof showToast === 'function') {
                showToast('👑 Modo Administrador / Docente ACTIVADO: Todos los 8 lenguajes y cursos están DESBLOQUEADOS.', 'success');
            }
        } else {
            if (typeof showToast === 'function') {
                showToast('🎓 Modo Estudiante ACTIVADO: Progreso secuencial restaurado.', 'info');
            }
        }
    });
}

const COURSE_LEVEL_KEYS = ['c1', 'c2', 'c3', 'c4'];

function isLanguageCompleted(langId) {
    return COURSE_LEVEL_KEYS.every(level => {
        return localStorage.getItem(`devhub_course_completed_${langId}_${level}`) === 'true';
    });
}

function getLanguageCompletedCount(langId) {
    let count = 0;
    COURSE_LEVEL_KEYS.forEach(l => {
        if (localStorage.getItem(`devhub_course_completed_${langId}_${l}`) === 'true') count++;
    });
    return count;
}

function updateLanguageSelectorUI() {
    const langSelect = document.getElementById('course-lang-select');
    if (!langSelect) return;

    Array.from(langSelect.options).forEach(opt => {
        const langId = opt.value;
        const seqItem = LANGUAGE_PROGRESSION_SEQUENCE.find(l => l.id === langId);
        const idx = LANGUAGE_PROGRESSION_SEQUENCE.findIndex(l => l.id === langId);
        const unlocked = isLanguageUnlocked(langId);
        const completed = isLanguageCompleted(langId);
        const count = getLanguageCompletedCount(langId);

        if (completed) {
            opt.textContent = `${idx + 1}. ${seqItem ? seqItem.icon : ''} ${seqItem ? seqItem.name : langId} (✅ Completado 4/4)`;
        } else if (unlocked) {
            opt.textContent = `${idx + 1}. ${seqItem ? seqItem.icon : ''} ${seqItem ? seqItem.name : langId} (🔓 Desbloqueado ${count}/4)`;
        } else {
            const prevName = LANGUAGE_PROGRESSION_SEQUENCE[idx - 1] ? LANGUAGE_PROGRESSION_SEQUENCE[idx - 1].name : '';
            opt.textContent = `${idx + 1}. 🔒 ${seqItem ? seqItem.name : langId} (Bloqueado - Completa ${prevName})`;
        }
    });

    const unlockBadge = document.getElementById('course-unlock-badge');
    if (unlockBadge) {
        const currentSeq = LANGUAGE_PROGRESSION_SEQUENCE.find(l => l.id === currentCourseLang);
        const count = getLanguageCompletedCount(currentCourseLang);
        if (isLanguageCompleted(currentCourseLang)) {
            unlockBadge.textContent = `✅ ${currentSeq ? currentSeq.name : currentCourseLang} Completado (4/4 Cursos)`;
            unlockBadge.className = 'badge badge-success';
        } else if (isLanguageUnlocked(currentCourseLang)) {
            unlockBadge.textContent = `🔓 ${currentSeq ? currentSeq.name : currentCourseLang} Desbloqueado (${count}/4 Cursos)`;
            unlockBadge.className = 'badge badge-accent';
        } else {
            unlockBadge.textContent = `🔒 ${currentSeq ? currentSeq.name : currentCourseLang} Bloqueado`;
            unlockBadge.className = 'badge badge-danger';
        }
    }
}

async function initMisCursosSystem() {
    coursesDataGlobal = EMBEDDED_CURRICULUM_DATA;

    const langSelect = document.getElementById('course-lang-select');
    const levelSelect = document.getElementById('course-level-select');
    const btnRunCode = document.getElementById('btn-run-code');
    const btnVerifyTestCases = document.getElementById('btn-verify-test-cases');
    const btnCopyCode = document.getElementById('btn-copy-code');
    const btnDownloadCode = document.getElementById('btn-download-code');
    const btnResetCode = document.getElementById('btn-reset-code');
    const codeEditor = document.getElementById('monaco-code-editor');

    try {
        const resp = await fetch('courses-data.json');
        if (resp.ok) {
            const externalData = await resp.json();
            if (externalData && externalData.modules) {
                coursesDataGlobal = externalData;
            }
        }
    } catch (e) {
        console.warn("Utilizando esquema curricular integrado localmente:", e);
    }

    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            const selectedLang = e.target.value;
            if (!isLanguageUnlocked(selectedLang)) {
                const idx = LANGUAGE_PROGRESSION_SEQUENCE.findIndex(l => l.id === selectedLang);
                const prevLang = LANGUAGE_PROGRESSION_SEQUENCE[idx - 1];
                if (typeof showToast === 'function') {
                    showToast(`🔒 Lenguaje Bloqueado: Debes completar los 3 cursos de ${prevLang ? prevLang.name : 'el lenguaje anterior'} primero.`, 'error');
                }
                langSelect.value = currentCourseLang;
                return;
            }
            currentCourseLang = selectedLang;
            renderMisCursosModule();
        });
    }

    if (levelSelect) {
        levelSelect.addEventListener('change', (e) => {
            currentCourseLevel = e.target.value;
            renderMisCursosModule();
        });
    }

    if (codeEditor) {
        codeEditor.addEventListener('input', () => {
            const saveKey = `devhub_course_code_${currentCourseLang}_${currentCourseLevel}`;
            localStorage.setItem(saveKey, codeEditor.value);
        });
    }

    if (btnRunCode) {
        btnRunCode.addEventListener('click', async () => {
            const code = codeEditor ? codeEditor.value : '';
            const term = document.getElementById('practice-terminal-output');
            const timeBadge = document.getElementById('exec-time-badge');
            if (term) term.innerHTML = '<span class="term-dim">⚡ Compilando y ejecutando código...</span>';

            const res = await ExecutionEngine.executeCode(currentCourseLang, code);
            if (timeBadge) timeBadge.textContent = `⚡ ${res.executionTimeMs || 0} ms`;

            if (term) {
                if (res.isError) {
                    term.innerHTML = res.logs.map(l => `<div class="term-error" style="color:#ef4444;">${l}</div>`).join('');
                } else {
                    term.innerHTML = res.logs.map(l => `<div>${l}</div>`).join('');
                    if (res.tableHtml) term.innerHTML += res.tableHtml;
                }
            }
        });
    }

    if (btnVerifyTestCases) {
        btnVerifyTestCases.addEventListener('click', async () => {
            const code = codeEditor ? codeEditor.value : '';
            const module = getCurrentModule();
            if (!module) return;

            const res = await ExecutionEngine.runTestCases(currentCourseLang, code, module.testCases || []);
            renderTestCaseResults(res);

            if (res.passed === res.total && res.total > 0) {
                const passKey = `devhub_course_completed_${currentCourseLang}_${currentCourseLevel}`;
                const wasCompletedBefore = localStorage.getItem(passKey) === 'true';
                localStorage.setItem(passKey, 'true');

                updateLanguageSelectorUI();

                if (isLanguageCompleted(currentCourseLang)) {
                    const currentIdx = LANGUAGE_PROGRESSION_SEQUENCE.findIndex(l => l.id === currentCourseLang);
                    if (currentIdx >= 0 && currentIdx < LANGUAGE_PROGRESSION_SEQUENCE.length - 1) {
                        const nextLang = LANGUAGE_PROGRESSION_SEQUENCE[currentIdx + 1];
                        if (typeof showToast === 'function') {
                            showToast(`🎉 ¡Felicidades! Has completado ${LANGUAGE_PROGRESSION_SEQUENCE[currentIdx].name}. ¡${nextLang.name} ha sido DESBLOQUEADO! 🔓`, 'success');
                        }
                    } else {
                        if (typeof showToast === 'function') {
                            showToast(`🏆 ¡FELICIDADES! Has completado TODOS los 8 lenguajes de programación del curso.`, 'success');
                        }
                    }
                } else if (!wasCompletedBefore) {
                    if (typeof showToast === 'function') {
                        showToast(`🎉 ¡Curso Aprobado! Progreso en ${currentCourseLang.toUpperCase()}: ${getLanguageCompletedCount(currentCourseLang)}/3`, 'success');
                    }
                }
            } else {
                if (typeof showToast === 'function') showToast('❌ Algunos casos de prueba fallaron', 'error');
            }
        });
    }

    if (btnCopyCode) {
        btnCopyCode.addEventListener('click', () => {
            if (codeEditor) {
                navigator.clipboard.writeText(codeEditor.value).then(() => {
                    if (typeof showToast === 'function') showToast('📋 Código copiado al portapapeles', 'success');
                });
            }
        });
    }

    if (btnDownloadCode) {
        btnDownloadCode.addEventListener('click', () => {
            if (!codeEditor) return;
            const extMap = { python: 'py', cpp: 'cpp', rust: 'rs', node: 'js', java: 'java', sql: 'sql', typescript: 'ts', solidity: 'sol' };
            const ext = extMap[currentCourseLang] || 'txt';
            const filename = `solucion_${currentCourseLang}_${currentCourseLevel}.${ext}`;
            const blob = new Blob([codeEditor.value], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
            if (typeof showToast === 'function') showToast(`💾 Archivo ${filename} descargado`, 'success');
        });
    }

    if (btnResetCode) {
        btnResetCode.addEventListener('click', () => {
            const saveKey = `devhub_course_code_${currentCourseLang}_${currentCourseLevel}`;
            localStorage.removeItem(saveKey);
            renderMisCursosModule();
            if (typeof showToast === 'function') showToast('🔄 Código restablecido a la plantilla inicial', 'info');
        });
    }

    renderMisCursosModule();
}

function getCurrentModule() {
    if (!coursesDataGlobal || !coursesDataGlobal.modules) return null;
    return coursesDataGlobal.modules.find(m => m.lang === currentCourseLang && m.level === currentCourseLevel) || coursesDataGlobal.modules[0];
}

function renderMisCursosModule() {
    updateLanguageSelectorUI();
    const module = getCurrentModule();
    if (!module) return;

    const theoryTitle = document.getElementById('theory-panel-title');
    const theoryBody = document.getElementById('theory-markdown-body');
    const practiceTitle = document.getElementById('practice-panel-title');
    const codeEditor = document.getElementById('monaco-code-editor');

    if (theoryTitle) theoryTitle.textContent = module.title || 'Teoría del Módulo';
    if (theoryBody) {
        theoryBody.innerHTML = parseSimpleMarkdown(module.theoryMarkdown || '');
    }

    const langName = currentCourseLang.toUpperCase();
    if (practiceTitle) practiceTitle.textContent = `Editor ${langName} (${currentCourseLevel.toUpperCase()})`;

    const saveKey = `devhub_course_code_${currentCourseLang}_${currentCourseLevel}`;
    const savedCode = localStorage.getItem(saveKey);
    if (codeEditor) {
        codeEditor.value = (savedCode !== null && savedCode.trim() !== '') ? savedCode : module.initialCode || '';
    }

    renderQuizPanel(module.quiz || []);
    renderTestCaseResults({ total: (module.testCases || []).length, passed: 0, results: [] });
}

function parseSimpleMarkdown(md) {
    if (typeof marked !== 'undefined' && typeof marked.parse === 'function') {
        return marked.parse(md);
    }
    return md
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/> (.*$)/gim, '<blockquote>$1</blockquote>')
        .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
        .replace(/\n/g, '<br>');
}

function renderTestCaseResults(res) {
    const listEl = document.getElementById('test-cases-list');
    const scoreBadge = document.getElementById('test-cases-score-badge');

    if (scoreBadge) {
        scoreBadge.textContent = `${res.passed} / ${res.total} Pasados`;
        scoreBadge.className = res.passed === res.total && res.total > 0 ? 'badge badge-success' : 'badge';
    }

    if (!listEl) return;
    if (!res.results || res.results.length === 0) {
        listEl.innerHTML = '<span class="term-dim">Presiona "🚀 Verificar Casos" para evaluar tu respuesta.</span>';
        return;
    }

    listEl.innerHTML = res.results.map(r => `
        <div class="test-case-item ${r.passed ? 'passed' : 'failed'}">
            <div>
                <strong>Caso ${r.index || 1}:</strong> Esperado: <code>${r.expected}</code>
            </div>
            <div>
                ${r.passed ? '✅ PASÓ' : '❌ FALLÓ'}
            </div>
        </div>
    `).join('');
}

function renderQuizPanel(quizList) {
    const quizBody = document.getElementById('quiz-panel-body');
    if (!quizBody) return;

    if (!quizList || quizList.length === 0) {
        quizBody.innerHTML = '<span class="term-dim">No hay preguntas de quiz configuradas para este nivel.</span>';
        return;
    }

    let html = `<div class="quiz-container-box">`;
    quizList.forEach((q, qIdx) => {
        html += `
            <div class="quiz-card-item" id="quiz-card-${qIdx}">
                <div class="quiz-card-question">Pregunta ${qIdx + 1}: ${q.question}</div>
                <div class="quiz-options-group">
                    ${q.options.map((opt, oIdx) => `
                        <button class="quiz-opt-btn" onclick="checkQuizAnswer('${currentCourseLang}', '${currentCourseLevel}', ${qIdx}, ${oIdx}, ${q.correctIndex}, '${encodeURIComponent(q.explanation)}')">${String.fromCharCode(65 + oIdx)}) ${opt}</button>
                    `).join('')}
                </div>
                <div class="quiz-feedback-box hidden" id="quiz-feedback-${qIdx}"></div>
            </div>
        `;
    });
    html += `</div>`;

    quizBody.innerHTML = html;
}

window.checkQuizAnswer = function(lang, level, qIdx, selectedIdx, correctIdx, explanationEnc) {
    const card = document.getElementById(`quiz-card-${qIdx}`);
    const feedbackBox = document.getElementById(`quiz-feedback-${qIdx}`);
    if (!card || !feedbackBox) return;

    const explanation = decodeURIComponent(explanationEnc);
    const buttons = card.querySelectorAll('.quiz-opt-btn');

    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === correctIdx) {
            btn.classList.add('correct');
        } else if (idx === selectedIdx) {
            btn.classList.add('incorrect');
        }
    });

    feedbackBox.classList.remove('hidden');
    if (selectedIdx === correctIdx) {
        feedbackBox.className = 'quiz-feedback-box correct';
        feedbackBox.innerHTML = `<strong>✅ ¡Respuesta Correcta!</strong><br>${explanation}`;
        if (typeof showToast === 'function') showToast('🎯 ¡Respuesta Correcta!', 'success');
    } else {
        feedbackBox.className = 'quiz-feedback-box incorrect';
        feedbackBox.innerHTML = `<strong>❌ Respuesta Incorrecta.</strong><br>${explanation}`;
        if (typeof showToast === 'function') showToast('❌ Respuesta Incorrecta', 'error');
    }
};

function initTabNavigationSystem() {
    const navLinks = document.querySelectorAll('.nav-link, .nav-logo, a[href^="#"]');
    const tabViews = document.querySelectorAll('.tab-view');
    const sidebar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-sidebar-toggle');

    function switchView(targetId) {
        if (!targetId || targetId === '#') targetId = 'hero';
        targetId = targetId.replace('#', '');

        tabViews.forEach(view => {
            if (view.id === targetId) {
                view.classList.add('active');
            } else {
                view.classList.remove('active');
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${targetId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        if (sidebar && sidebar.classList.contains('mobile-open')) {
            sidebar.classList.remove('mobile-open');
        }

        if (targetId === 'escaneo-qr' && typeof renderPageQrCode === 'function') {
            renderPageQrCode();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                window.location.hash = href;
                switchView(href);
            }
        });
    });

    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
        });
    }

    const initialHash = window.location.hash || '#hero';
    switchView(initialHash);

    window.addEventListener('hashchange', () => {
        switchView(window.location.hash);
    });
}

/* ==========================================================================
   9. ADMIN DASHBOARD & ACADEMIC MANAGEMENT ENGINE
   ========================================================================== */

function isAdminUser(user) {
    if (!user) return false;
    return user.isAdmin === true || (user.email && user.email.toLowerCase() === 'admin@fp.edu');
}

function renderAdminDashboard() {
    if (!isAdminUser(userProfile)) return;

    renderAdminKPIs();
    renderAdminUsersTable();
    renderAdminLanguageAnalytics();
    initAdminEvents();
}

function renderAdminKPIs() {
    const db = getUsersDB();
    const students = db.filter(u => !isAdminUser(u));

    const totalStudents = students.length;
    let totalLessons = 0;
    let totalScore = 0;
    const langCounts = {};

    db.forEach(u => {
        if (u.langProgress) {
            Object.values(u.langProgress).forEach(arr => {
                if (Array.isArray(arr)) totalLessons += arr.length;
            });
        } else if (u.completedLessons) {
            totalLessons += u.completedLessons.length;
        }

        totalScore += u.quizPoints || 0;

        const lang = u.activeLanguage || 'python';
        langCounts[lang] = (langCounts[lang] || 0) + 1;
    });

    const avgScore = db.length > 0 ? Math.round(totalScore / db.length) : 0;

    let topLang = 'Python';
    let maxCount = -1;
    Object.keys(langCounts).forEach(l => {
        if (langCounts[l] > maxCount) {
            maxCount = langCounts[l];
            topLang = (LANGUAGES_INFO_MAP[l] && LANGUAGES_INFO_MAP[l].name) || l;
        }
    });

    const kpiUsers = document.getElementById('admin-kpi-total-users');
    const kpiLessons = document.getElementById('admin-kpi-total-lessons');
    const kpiScore = document.getElementById('admin-kpi-avg-score');
    const kpiTopLang = document.getElementById('admin-kpi-top-lang');

    if (kpiUsers) kpiUsers.textContent = totalStudents;
    if (kpiLessons) kpiLessons.textContent = totalLessons;
    if (kpiScore) kpiScore.textContent = `${avgScore} pts`;
    if (kpiTopLang) kpiTopLang.textContent = topLang;
}

function renderAdminUsersTable() {
    const tbody = document.getElementById('admin-users-table-body');
    if (!tbody) return;

    const db = getUsersDB();
    const searchVal = (document.getElementById('admin-search-input')?.value || '').trim().toLowerCase();

    const filtered = db.filter(user => {
        if (isAdminUser(user)) return false;

        return !searchVal ||
            user.name.toLowerCase().includes(searchVal) ||
            user.email.toLowerCase().includes(searchVal);
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 24px;">
                    🔍 No se encontraron estudiantes en el sistema.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filtered.map(user => {
        let totalApproved = 0;
        if (user.langProgress) {
            Object.values(user.langProgress).forEach(arr => { if (Array.isArray(arr)) totalApproved += arr.length; });
        } else {
            totalApproved = (user.completedLessons || []).length;
        }

        const level = Math.floor(totalApproved / 3) + 1;
        const activeLangInfo = LANGUAGES_INFO_MAP[user.activeLanguage || 'python'] || { name: 'Python', icon: '🐍' };

        return `
            <tr>
                <td>
                    <div class="admin-user-cell">
                        <span>${user.avatar || '👨‍💻'}</span>
                        <div>
                            <div>${user.name}</div>
                            ${user.masterUnlocked ? '<span class="user-level-badge" style="background: rgba(245, 158, 11, 0.2); color: #f59e0b;">⚡ Maestro</span>' : ''}
                        </div>
                    </div>
                </td>
                <td>${user.email}</td>
                <td>${activeLangInfo.icon} ${activeLangInfo.name}</td>
                <td><strong>${totalApproved}</strong> / 224</td>
                <td><span class="user-quick-level">Nivel ${level}</span></td>
                <td>
                    <div class="admin-action-btn-group">
                        <button class="btn-admin-unlock" onclick="adminToggleMasterUnlock('${user.id}')" title="Otorgar o quitar acceso maestro">
                            ${user.masterUnlocked ? '🔓 Acceso Total' : '⚡ Desbloquear Todo'}
                        </button>
                        <button class="btn-admin-edit" onclick="adminOpenEditUserModal('${user.id}')" title="Editar datos del alumno">
                            ✏️ Editar
                        </button>
                        <button class="btn-admin-delete" onclick="adminDeleteUser('${user.id}')" title="Eliminar alumno">
                            🗑️
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function renderAdminLanguageAnalytics() {
    const container = document.getElementById('admin-language-analytics-list');
    if (!container) return;

    const db = getUsersDB();
    const students = db.filter(u => !isAdminUser(u));
    const totalStudents = Math.max(1, students.length);

    container.innerHTML = LANGUAGES_ORDER.map(langId => {
        const info = LANGUAGES_INFO_MAP[langId];
        let langCompletedSum = 0;

        students.forEach(u => {
            const arr = (u.langProgress && u.langProgress[langId]) || (langId === 'python' ? u.completedLessons : []);
            if (Array.isArray(arr)) langCompletedSum += arr.length;
        });

        const totalPossible = totalStudents * 28;
        const percent = Math.min(100, Math.round((langCompletedSum / totalPossible) * 100));

        return `
            <div class="admin-analytics-item">
                <div class="admin-analytics-info">
                    <span>${info.icon} ${info.name}</span>
                    <span style="color: var(--secondary);">${percent}% (Total: ${langCompletedSum}/${totalPossible})</span>
                </div>
                <div class="admin-analytics-bar-bg">
                    <div class="admin-analytics-bar-fill" style="width: ${percent}%;"></div>
                </div>
            </div>
        `;
    }).join('');
}

window.adminToggleMasterUnlock = function(userId) {
    const db = getUsersDB();
    const user = db.find(u => u.id === userId);
    if (user) {
        user.masterUnlocked = !user.masterUnlocked;
        saveUsersDB(db);
        if (user.id === getCurrentUserId()) {
            userProfile = user;
            saveUserProfile();
        }
        showToast(user.masterUnlocked ? `⚡ Se ha concedido acceso maestro a ${user.name}` : `Acceso maestro revocado a ${user.name}`, 'success');
        renderAdminDashboard();
        renderLangStepperBar();
    }
};

window.adminDeleteUser = function(userId) {
    const db = getUsersDB();
    const user = db.find(u => u.id === userId);
    if (!user) return;

    if (confirm(`¿Estás seguro de eliminar la cuenta del estudiante "${user.name}"? Esta acción no se puede deshacer.`)) {
        const updatedDB = db.filter(u => u.id !== userId);
        saveUsersDB(updatedDB);
        showToast(`🗑️ Estudiante "${user.name}" eliminado de la base de datos.`, 'info');
        renderAdminDashboard();
    }
};

window.adminOpenEditUserModal = function(userId) {
    const overlay = document.getElementById('admin-user-modal-overlay');
    const titleEl = document.getElementById('admin-user-modal-title');

    if (!overlay) return;

    if (userId) {
        const db = getUsersDB();
        const user = db.find(u => u.id === userId);
        if (!user) return;

        if (titleEl) titleEl.textContent = '✏️ Editar Registro de Estudiante';
        document.getElementById('admin-edit-user-id').value = user.id;
        document.getElementById('admin-input-name').value = user.name;
        document.getElementById('admin-input-email').value = user.email;
        document.getElementById('admin-input-password').value = user.password || '1234';
        document.getElementById('admin-check-unlock-all').checked = !!user.masterUnlocked;
    } else {
        if (titleEl) titleEl.textContent = '➕ Registrar Nuevo Estudiante';
        document.getElementById('admin-edit-user-id').value = '';
        document.getElementById('admin-input-name').value = '';
        document.getElementById('admin-input-email').value = '';
        document.getElementById('admin-input-password').value = '1234';
        document.getElementById('admin-check-unlock-all').checked = false;
    }

    overlay.classList.remove('hidden');
};

function exportUsersReport(format) {
    const db = getUsersDB();
    const students = db.filter(u => !isAdminUser(u));

    if (format === 'json') {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(students, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", "devhub_fp_estudiantes_reporte.json");
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        showToast('📥 Reporte JSON exportado exitosamente.', 'success');
    } else if (format === 'csv') {
        let csvContent = "data:text/csv;charset=utf-8,ID,Nombre,Email,LenguajeActivo,CursosAprobados,Nivel,FechaRegistro\n";
        students.forEach(u => {
            let approved = 0;
            if (u.langProgress) Object.values(u.langProgress).forEach(a => { if (Array.isArray(a)) approved += a.length; });
            else approved = (u.completedLessons || []).length;

            const row = `"${u.id}","${u.name}","${u.email}","${u.activeLanguage || 'python'}",${approved},${Math.floor(approved/3)+1},"${u.createdAt || ''}"`;
            csvContent += row + "\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "devhub_fp_estudiantes_reporte.csv");
        document.body.appendChild(link);
        link.click();
        link.remove();
        showToast('📥 Reporte CSV exportado exitosamente.', 'success');
    }
}

let adminEventsInitialized = false;
function initAdminEvents() {
    if (adminEventsInitialized) return;
    adminEventsInitialized = true;

    const searchInput = document.getElementById('admin-search-input');
    const btnAddUser = document.getElementById('btn-admin-add-user');
    const btnExportCsv = document.getElementById('btn-admin-export-csv');
    const btnExportJson = document.getElementById('btn-admin-export-json');

    const modalOverlay = document.getElementById('admin-user-modal-overlay');
    const modalClose = document.getElementById('admin-user-modal-close');
    const adminForm = document.getElementById('admin-user-form');

    if (searchInput) searchInput.addEventListener('input', renderAdminUsersTable);

    if (btnAddUser) btnAddUser.addEventListener('click', () => adminOpenEditUserModal(null));
    if (btnExportCsv) btnExportCsv.addEventListener('click', () => exportUsersReport('csv'));
    if (btnExportJson) btnExportJson.addEventListener('click', () => exportUsersReport('json'));

    if (modalClose && modalOverlay) {
        modalClose.addEventListener('click', () => modalOverlay.classList.add('hidden'));
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) modalOverlay.classList.add('hidden');
        });
    }

    if (adminForm) {
        adminForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const editId = document.getElementById('admin-edit-user-id').value;
            const nameVal = document.getElementById('admin-input-name').value.trim();
            const emailVal = document.getElementById('admin-input-email').value.trim();
            const pwdVal = document.getElementById('admin-input-password').value;
            const unlockAllVal = document.getElementById('admin-check-unlock-all').checked;

            if (!nameVal || !emailVal) {
                showToast('Ingresa nombre y correo válidos.', 'error');
                return;
            }

            let avatarVal = '👨‍💻';
            const activeAvatarBtn = document.querySelector('#admin-avatar-selector .avatar-btn.active');
            if (activeAvatarBtn) avatarVal = activeAvatarBtn.getAttribute('data-avatar');

            const db = getUsersDB();

            if (editId) {
                const user = db.find(u => u.id === editId);
                if (user) {
                    user.name = nameVal;
                    user.email = emailVal;
                    user.password = pwdVal;
                    user.avatar = avatarVal;
                    user.masterUnlocked = unlockAllVal;
                    saveUsersDB(db);
                    showToast(`💾 Estudiante "${nameVal}" actualizado correctamente.`, 'success');
                }
            } else {
                const newUser = {
                    id: `user_${Date.now()}`,
                    name: nameVal,
                    email: emailVal,
                    password: pwdVal,
                    avatar: avatarVal,
                    masterUnlocked: unlockAllVal,
                    completedLessons: [],
                    quizPoints: 0,
                    createdAt: new Date().toISOString()
                };
                db.push(newUser);
                saveUsersDB(db);
                showToast(`✨ Nuevo alumno "${nameVal}" registrado.`, 'success');
            }

            modalOverlay.classList.add('hidden');
            renderAdminDashboard();
        });
    }
}

/* ==========================================================================
   THEME SWITCHER MANAGER
   ========================================================================== */
function initThemeSwitcherSystem() {
    const savedTheme = localStorage.getItem('devhub_fp_theme') || 'cyberpunk';
    setVisualTheme(savedTheme);

    const themeBtns = document.querySelectorAll('[data-theme-set]');
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedTheme = btn.getAttribute('data-theme-set');
            setVisualTheme(selectedTheme);
            showToast(`🎨 Tema visual cambiado a: ${btn.textContent.trim()}`, 'success');
        });
    });
}

function setVisualTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    document.body.setAttribute('data-theme', themeName);
    localStorage.setItem('devhub_fp_theme', themeName);

    const themeBtns = document.querySelectorAll('[data-theme-set]');
    themeBtns.forEach(btn => {
        if (btn.getAttribute('data-theme-set') === themeName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

/* ==========================================================================
   DIPLOMA CERTIFICATE GENERATOR MANAGER
   ========================================================================== */
function openCertificateModal(langId) {
    const modal = document.getElementById('certificate-modal-overlay');
    if (!modal) return;

    const langInfo = LANGUAGES_INFO_MAP[langId] || { name: 'Programación', icon: '🎓' };
    const studentName = document.getElementById('cert-student-name');
    const courseTitle = document.getElementById('cert-course-title');
    const dateDisplay = document.getElementById('cert-date-display');
    const codeDisplay = document.getElementById('cert-code-display');

    if (studentName) studentName.textContent = userProfile.name || 'Estudiante DevHub FP';
    if (courseTitle) courseTitle.textContent = `${langInfo.icon} Programación Avanzada en ${langInfo.name}`;
    if (dateDisplay) {
        const today = new Date();
        dateDisplay.textContent = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    }
    if (codeDisplay) {
        codeDisplay.textContent = `FP-${Math.floor(100000 + Math.random() * 900000)}`;
    }

    modal.classList.remove('hidden');
}

function initCertificateModalEvents() {
    const modal = document.getElementById('certificate-modal-overlay');
    const closeBtn = document.getElementById('certificate-modal-close');
    const printBtn = document.getElementById('btn-print-certificate');

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    }
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.add('hidden');
        });
    }
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }
}

/* ==========================================================================
   SHARE PAGE LINK & QR CODE MODAL ENGINE
   ========================================================================== */
function updateModalQrImage(targetUrl) {
    if (!targetUrl || targetUrl.trim() === '') return;
    const cleanUrl = targetUrl.trim();
    const encodedUrl = encodeURIComponent(cleanUrl);

    const primaryQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedUrl}&margin=10`;
    const fallbackQrUrl = `https://quickchart.io/qr?size=300&text=${encodedUrl}`;

    const modalImg = document.getElementById('modal-qr-page-img');
    if (modalImg) {
        modalImg.onerror = () => { modalImg.src = fallbackQrUrl; };
        modalImg.src = primaryQrUrl;
    }

    const whatsappBtn = document.getElementById('btn-whatsapp-share');
    const emailBtn = document.getElementById('btn-email-share');
    const shareText = "¡Hola! Te comparto esta plataforma de estudio de programación para FP (Python, C++, Rust, Node.js, Java, SQL, TypeScript y Solidity):";

    if (whatsappBtn) {
        whatsappBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + cleanUrl)}`;
    }
    if (emailBtn) {
        emailBtn.href = `mailto:?subject=${encodeURIComponent("Plataforma de Estudio de Programación - DevHub FP")}&body=${encodeURIComponent(shareText + "\n\n" + cleanUrl)}`;
    }
}

window.openShareLinkModal = function() {
    const modal = document.getElementById('share-link-modal-overlay');
    if (!modal) return;

    let currentUrl = window.location.href.split('#')[0];
    if (!currentUrl || currentUrl.startsWith('file://') || currentUrl.includes('localhost') || currentUrl.includes('127.0.0.1')) {
        currentUrl = 'https://regor-fran7.github.io/-FProgramacion-Cursos/';
    }

    const inputUrl = document.getElementById('share-page-url-input');
    if (inputUrl) {
        inputUrl.value = currentUrl;
    }

    updateModalQrImage(currentUrl);

    modal.classList.remove('hidden');
};

function initShareLinkModalEvents() {
    const modal = document.getElementById('share-link-modal-overlay');
    const closeBtn = document.getElementById('share-link-modal-close');
    const copyBtn = document.getElementById('btn-copy-share-url');
    const nativeShareBtn = document.getElementById('btn-native-share-action');

    const closeModal = () => {
        if (modal) modal.classList.add('hidden');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    const inputUrl = document.getElementById('share-page-url-input');
    if (inputUrl) {
        inputUrl.addEventListener('input', (e) => {
            updateModalQrImage(e.target.value);
        });
    }

    const copyAction = () => {
        const val = inputUrl ? inputUrl.value : window.location.href;
        navigator.clipboard.writeText(val).then(() => {
            showToast('📋 Vínculo copiado al portapapeles.', 'success');
        }).catch(() => {
            showToast('📋 Vínculo copiado.', 'info');
        });
    };

    if (copyBtn) copyBtn.addEventListener('click', copyAction);

    if (nativeShareBtn) {
        nativeShareBtn.addEventListener('click', () => {
            const val = inputUrl ? inputUrl.value : window.location.href;
            if (navigator.share) {
                navigator.share({
                    title: "DevHub FP - Plataforma de Estudio de Programación",
                    text: "¡Aprende programación en DevHub FP con cursos y ejercicios interactivos!",
                    url: val
                }).then(() => {
                    showToast('✨ Vínculo compartido con éxito.', 'success');
                }).catch(err => {
                    console.log("Compartir cancelado:", err);
                });
            } else {
                copyAction();
            }
        });
    }
}

/* ==========================================================================
   PDF CATALOG & READ-ONLY VIEWER ENGINE (PARCIALES 1, 2 Y 3)
   ========================================================================== */
const OFFICIAL_PDF_DOCUMENTS = [
    // PDF 1 Parcial
    { id: 'pdf-p1-01', title: '01. ¿Qué es la Programación?', parcial: 'p1', parcialTitle: 'PDF 1 Parcial', file: 'PDF 1 Parcial/01-Que-es-La-Programacion.pdf' },
    { id: 'pdf-p1-02', title: '02. Pensamiento Lógico', parcial: 'p1', parcialTitle: 'PDF 1 Parcial', file: 'PDF 1 Parcial/02-PensamientoLogico.pdf' },
    { id: 'pdf-p1-03', title: '03. Introducción al Pensamiento Lógico', parcial: 'p1', parcialTitle: 'PDF 1 Parcial', file: 'PDF 1 Parcial/03-Introduccion-al-Pensamiento-logico.pdf' },
    { id: 'pdf-p1-04', title: '04. Fundamentos del Lenguaje C++', parcial: 'p1', parcialTitle: 'PDF 1 Parcial', file: 'PDF 1 Parcial/04-Fundamentos-del-Lenguaje-C.pdf' },
    { id: 'pdf-p1-05', title: '05. Variables, Entradas y Salidas en C++', parcial: 'p1', parcialTitle: 'PDF 1 Parcial', file: 'PDF 1 Parcial/05-Vairalbes-Entradas-y-Salidas-en-C.pdf' },
    { id: 'pdf-p1-06', title: '06. Operadores Aritméticos', parcial: 'p1', parcialTitle: 'PDF 1 Parcial', file: 'PDF 1 Parcial/06-Operadores-aritmeticos.pdf' },
    { id: 'pdf-p1-07', title: '07. Operadores Lógicos', parcial: 'p1', parcialTitle: 'PDF 1 Parcial', file: 'PDF 1 Parcial/07-Operadores-logicos.pdf' },
    { id: 'pdf-p1-08', title: '08. Operadores Relacionales', parcial: 'p1', parcialTitle: 'PDF 1 Parcial', file: 'PDF 1 Parcial/08-Operadores-relacionales.pdf' },
    { id: 'pdf-p1-09', title: '09. Operadores Condicionales', parcial: 'p1', parcialTitle: 'PDF 1 Parcial', file: 'PDF 1 Parcial/09-Operadores-condicionales.pdf' },
    { id: 'pdf-p1-10', title: '10. Estructuras de Control I', parcial: 'p1', parcialTitle: 'PDF 1 Parcial', file: 'PDF 1 Parcial/10-Estructuras-de-control.pdf' },
    { id: 'pdf-p1-11', title: '11. Estructuras de Control II', parcial: 'p1', parcialTitle: 'PDF 1 Parcial', file: 'PDF 1 Parcial/11-Estructuras-de-control-II.pdf' },
    { id: 'pdf-p1-12', title: '12. Estructuras de Control III', parcial: 'p1', parcialTitle: 'PDF 1 Parcial', file: 'PDF 1 Parcial/12-Estructuras-de-control-III.pdf' },
    { id: 'pdf-p1-13', title: '13. Repaso Práctico Parcial I', parcial: 'p1', parcialTitle: 'PDF 1 Parcial', file: 'PDF 1 Parcial/13-Repaso-General-Practico-Parcial-I.pdf' },

    // PDF 2 Parcial
    { id: 'pdf-p2-14', title: '14. Arreglo Unidimensional', parcial: 'p2', parcialTitle: 'PDF 2 Parcial', file: 'PDF 2 Parcial/14-Arreglo-Unidimensional.pdf' },
    { id: 'pdf-p2-15', title: '15. Arreglos Bidimensionales', parcial: 'p2', parcialTitle: 'PDF 2 Parcial', file: 'PDF 2 Parcial/15-Arreglo-Bidimencionales.pdf' },
    { id: 'pdf-p2-16', title: '16. Arreglos Dinámicos', parcial: 'p2', parcialTitle: 'PDF 2 Parcial', file: 'PDF 2 Parcial/16-Arreglos-Dinamicos.pdf' },
    { id: 'pdf-p2-17', title: '17. Algoritmos de Búsqueda I', parcial: 'p2', parcialTitle: 'PDF 2 Parcial', file: 'PDF 2 Parcial/17-Algoritmos-de-busqueda-I.pdf' },
    { id: 'pdf-p2-18', title: '18. Algoritmos de Búsqueda II', parcial: 'p2', parcialTitle: 'PDF 2 Parcial', file: 'PDF 2 Parcial/18-Algoritmos-de-busqueda-II.pdf' },
    { id: 'pdf-p2-19', title: '19. Ordenamiento de Arreglos', parcial: 'p2', parcialTitle: 'PDF 2 Parcial', file: 'PDF 2 Parcial/19-Ordenamiento-de-Arreglos.pdf' },
    { id: 'pdf-p2-21', title: '21. Ejercicios Arreglos II', parcial: 'p2', parcialTitle: 'PDF 2 Parcial', file: 'PDF 2 Parcial/21-Ejercicios-arreglos-II.pdf' },

    // PDF 3 Parcial
    { id: 'pdf-p3-22', title: '22. Funciones - Parte 1', parcial: 'p3', parcialTitle: 'PDF 3 Parcial', file: 'PDF 3 Parcial/22-Funciones-Parte1 (1).pdf' },
    { id: 'pdf-p3-23', title: '23. Funciones - Parte 2', parcial: 'p3', parcialTitle: 'PDF 3 Parcial', file: 'PDF 3 Parcial/23-Funciones-Parte2.pdf' },
    { id: 'pdf-p3-24', title: '24. Estructuras (Structs)', parcial: 'p3', parcialTitle: 'PDF 3 Parcial', file: 'PDF 3 Parcial/24-Estructuras.pdf' },
    { id: 'pdf-p3-25', title: '25. Estructuras como Parámetros', parcial: 'p3', parcialTitle: 'PDF 3 Parcial', file: 'PDF 3 Parcial/25-Estructuras-como-Parametros-de-Funciones.pdf' },
    { id: 'pdf-p3-26', title: '26. Arreglos de Estructuras', parcial: 'p3', parcialTitle: 'PDF 3 Parcial', file: 'PDF 3 Parcial/26-Arreglos-de-estructuras.pdf' }
];

let customUploadedPdfList = [];

function initPdfCatalogEngine() {
    renderPdfCatalogGrid('all');

    const filterBtns = document.querySelectorAll('.pdf-filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const parcial = btn.getAttribute('data-parcial');
            renderPdfCatalogGrid(parcial);
        });
    });

    const uploadInput = document.getElementById('input-upload-pdf');
    if (uploadInput) {
        uploadInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const objectUrl = URL.createObjectURL(file);
            const newDoc = {
                id: `pdf-user-${Date.now()}`,
                title: file.name.replace('.pdf', ''),
                parcial: 'p1',
                parcialTitle: 'PDF Subido (Docente)',
                file: objectUrl,
                isCustom: true
            };

            customUploadedPdfList.unshift(newDoc);
            renderPdfCatalogGrid('all');

            if (typeof showToast === 'function') {
                showToast(`📤 Documento PDF '${file.name}' subido con éxito al catálogo en Modo Solo Lectura.`, 'success');
            }
        });
    }

    const modalCloseBtn = document.getElementById('btn-close-pdf-modal');
    const modal = document.getElementById('pdf-viewer-modal');
    if (modalCloseBtn && modal) {
        modalCloseBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
            const frame = document.getElementById('pdf-frame-element');
            if (frame) frame.src = '';
        });
    }
}

function renderPdfCatalogGrid(parcialFilter) {
    const grid = document.getElementById('pdf-courses-grid');
    if (!grid) return;

    const allDocs = [...customUploadedPdfList, ...OFFICIAL_PDF_DOCUMENTS];
    const filtered = allDocs.filter(doc => parcialFilter === 'all' || doc.parcial === parcialFilter);

    if (filtered.length === 0) {
        grid.innerHTML = '<span class="term-dim">No hay documentos PDF disponibles en este parcial.</span>';
        return;
    }

    grid.innerHTML = filtered.map(doc => `
        <div class="pdf-card" style="background: #040914; border: 1px solid var(--border-glow); border-radius: var(--radius-md); padding: 14px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px; transition: transform 0.2s;">
            <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <span style="font-size: 1.8rem;">📄</span>
                    <span class="badge badge-accent" style="font-size: 0.7rem;">🔒 Solo Lectura</span>
                </div>
                <h4 style="margin: 0 0 4px 0; font-size: 0.95rem; color: var(--secondary); font-weight: 700;">${doc.title}</h4>
                <span style="font-size: 0.75rem; color: var(--text-dim); font-weight: 600;">${doc.parcialTitle}</span>
            </div>
            <button class="btn btn-outline btn-sm" onclick="openPdfViewerModal('${encodeURIComponent(doc.file)}', '${encodeURIComponent(doc.title)}', '${doc.parcialTitle}')" style="width: 100%; margin-top: 8px;">👁️ Leer PDF</button>
        </div>
    `).join('');
}

window.openPdfViewerModal = function(fileEnc, titleEnc, parcialTitle) {
    const file = decodeURIComponent(fileEnc);
    const title = decodeURIComponent(titleEnc);
    const modal = document.getElementById('pdf-viewer-modal');
    const frame = document.getElementById('pdf-frame-element');
    const titleEl = document.getElementById('pdf-modal-filename');
    const subTitleEl = document.getElementById('pdf-modal-subtitle');

    if (!modal || !frame) return;

    if (titleEl) titleEl.textContent = title;
    if (subTitleEl) subTitleEl.textContent = `${parcialTitle} • Modo Lectura Protegido`;

    // Encode spaces in relative URL path for GitHub Pages compatibility
    const targetUrl = file.startsWith('blob:') ? file : encodeURI(file);
    frame.src = `${targetUrl}#toolbar=0&navpanes=0&view=FitH`;
    modal.classList.remove('hidden');

    if (typeof showToast === 'function') {
        showToast(`📄 Abriendo ${title} en Solo Lectura`, 'info');
    }
};
