/* ==========================================================================
   DEVHUB FP - INTERACTIVE JAVASCRIPT LOGIC
   Features: 8 Languages Hub, Syntax Viewer, Grade Calculator, Quiz Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize All Subsystems
    initUserProfileSystem();
    initLanguagesGrid();
    initFilterSystem();
    initPdfCoursesEngine();
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

function initLanguagesGrid() {
    const grid = document.getElementById('languages-grid');
    if (!grid) return;

    grid.innerHTML = LANGUAGES_DATA.map(lang => {
        const status = typeof getLanguageUnlockStatus === 'function' ? getLanguageUnlockStatus(lang.id) : { unlocked: true, completedCount: 0, totalCount: 28 };
        const isLocked = !status.unlocked;

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
                    Progreso: ${status.completedCount} / ${status.totalCount} Cursos
                </div>
                ${isLocked ? `
                    <button class="btn btn-secondary btn-sm" disabled style="opacity: 0.5; width: 100%; cursor: not-allowed;">
                        🔒 Bloqueado (Completa Lenguaje Anterior)
                    </button>
                ` : `
                    <button class="btn btn-primary btn-sm" style="width: 100%;" onclick="selectActiveLanguage('${lang.id}'); window.location.hash='cursos';">
                        🚀 Cursos de ${lang.name}
                    </button>
                `}
            </div>
        </div>
    `}).join('');
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

    // Nivel Básico (13 Documentos)
    {
        id: 'p1-01',
        title: '01. ¿Qué es la Programación?',
        parcial: 'basico',
        parcialBadge: 'Básico',
        badgeClass: 'pdf-badge-basico',
        color: '#10b981',
        icon: '💻',
        file: 'PDF 1 Parcial/01-Que-es-La-Programacion.pdf',
        desc: 'Conceptos fundamentales de la programación, hardware, software, lenguajes de alto y bajo nivel y compilación.',
        size: '1.2 MB'
    },
    {
        id: 'p1-02',
        title: '02. Pensamiento Lógico',
        parcial: 'basico',
        parcialBadge: 'Básico',
        badgeClass: 'pdf-badge-basico',
        color: '#10b981',
        icon: '🧠',
        file: 'PDF 1 Parcial/02-PensamientoLogico.pdf',
        desc: 'Desarrollo de habilidades para la resolución de problemas mediante razonamiento estructurado y algorítmico.',
        size: '1.3 MB'
    },
    {
        id: 'p1-03',
        title: '03. Introducción al Pensamiento Lógico',
        parcial: 'basico',
        parcialBadge: 'Básico',
        badgeClass: 'pdf-badge-basico',
        color: '#10b981',
        icon: '💡',
        file: 'PDF 1 Parcial/03-Introduccion-al-Pensamiento-logico.pdf',
        desc: 'Fundamentos de pseudocódigo, diagramas de flujo y estructuración de algoritmos paso a paso.',
        size: '1.3 MB'
    },
    {
        id: 'p1-04',
        title: '04. Fundamentos del Lenguaje C',
        parcial: 'basico',
        parcialBadge: 'Básico',
        badgeClass: 'pdf-badge-basico',
        color: '#10b981',
        icon: '⚙️',
        file: 'PDF 1 Parcial/04-Fundamentos-del-Lenguaje-C.pdf',
        desc: 'Sintaxis básica de C, función main, directivas de preprocesador (#include), bibliotecas estándar y estructura del programa.',
        size: '1.9 MB'
    },
    {
        id: 'p1-05',
        title: '05. Variables, Entradas y Salidas en C',
        parcial: 'basico',
        parcialBadge: 'Básico',
        badgeClass: 'pdf-badge-basico',
        color: '#10b981',
        icon: '📥',
        file: 'PDF 1 Parcial/05-Vairalbes-Entradas-y-Salidas-en-C.pdf',
        desc: 'Declaración de tipos de datos (int, float, char), formateadores (%d, %f, %c), printf() y scanf().',
        size: '1.8 MB'
    },
    {
        id: 'p1-06',
        title: '06. Operadores Aritméticos',
        parcial: 'basico',
        parcialBadge: 'Básico',
        badgeClass: 'pdf-badge-basico',
        color: '#10b981',
        icon: '➕',
        file: 'PDF 1 Parcial/06-Operadores-aritmeticos.pdf',
        desc: 'Suma, resta, multiplicación, división, módulo (%), precedencia de operadores y expresiones matemáticas.',
        size: '1.1 MB'
    },
    {
        id: 'p1-07',
        title: '07. Operadores Lógicos',
        parcial: 'basico',
        parcialBadge: 'Básico',
        badgeClass: 'pdf-badge-basico',
        color: '#10b981',
        icon: '🔀',
        file: 'PDF 1 Parcial/07-Operadores-logicos.pdf',
        desc: 'Operadores booleanos AND (&&), OR (||) y NOT (!). Tablas de verdad y construcción de condiciones complejas.',
        size: '1.3 MB'
    },
    {
        id: 'p1-08',
        title: '08. Operadores Relacionales',
        parcial: 'basico',
        parcialBadge: 'Básico',
        badgeClass: 'pdf-badge-basico',
        color: '#10b981',
        icon: '⚖️',
        file: 'PDF 1 Parcial/08-Operadores-relacionales.pdf',
        desc: 'Comparaciones de igualdad (==, !=) y desigualdad (<, >, <=, >=) para evaluar expresiones.',
        size: '1.2 MB'
    },
    {
        id: 'p1-09',
        title: '09. Operadores Condicionales',
        parcial: 'basico',
        parcialBadge: 'Básico',
        badgeClass: 'pdf-badge-basico',
        color: '#10b981',
        icon: '❓',
        file: 'PDF 1 Parcial/09-Operadores-condicionales.pdf',
        desc: 'Operador ternario (?:) y toma de decisiones concisa en expresiones condicionales.',
        size: '1.2 MB'
    },
    {
        id: 'p1-10',
        title: '10. Estructuras de Control I',
        parcial: 'basico',
        parcialBadge: 'Básico',
        badgeClass: 'pdf-badge-basico',
        color: '#10b981',
        icon: '🔀',
        file: 'PDF 1 Parcial/10-Estructuras-de-control.pdf',
        desc: 'Sentencias de decisión if, if-else e if-else if anidados para el flujo de control del programa.',
        size: '1.5 MB'
    },
    {
        id: 'p1-11',
        title: '11. Estructuras de Control II',
        parcial: 'basico',
        parcialBadge: 'Básico',
        badgeClass: 'pdf-badge-basico',
        color: '#10b981',
        icon: '🎛️',
        file: 'PDF 1 Parcial/11-Estructuras-de-control-II.pdf',
        desc: 'Estructura de selección múltiple switch-case, cláusula default y uso de break.',
        size: '2.2 MB'
    },
    {
        id: 'p1-12',
        title: '12. Estructuras de Control III',
        parcial: 'basico',
        parcialBadge: 'Básico',
        badgeClass: 'pdf-badge-basico',
        color: '#10b981',
        icon: '🔁',
        file: 'PDF 1 Parcial/12-Estructuras-de-control-III.pdf',
        desc: 'Bucles e iteraciones: while, do-while y for. Contadores, acumuladores y bucles infinitos.',
        size: '2.9 MB'
    },
    {
        id: 'p1-13',
        title: '13. Repaso General Práctico - Básico',
        parcial: 'basico',
        parcialBadge: 'Básico',
        badgeClass: 'pdf-badge-basico',
        color: '#10b981',
        icon: '🎓',
        file: 'PDF 1 Parcial/13-Repaso-General-Practico-Parcial-I.pdf',
        desc: 'Compendio completo de ejercicios prácticos, guías de estudio y preparación previa a la evaluación de Nivel Básico.',
        size: '3.9 MB'
    },

    // Nivel Intermedio (10 Documentos)
    {
        id: 'p2-14',
        title: '14. Arreglo Unidimensional',
        parcial: 'intermedio',
        parcialBadge: 'Intermedio',
        badgeClass: 'pdf-badge-intermedio',
        color: '#06b6d4',
        icon: '📘',
        file: 'PDF 2 Parcial/14-Arreglo-Unidimensional.pdf',
        desc: 'Conceptos fundamentales de arreglos unidimensionales (vectores), sintaxis, declaración, acceso mediante índices y recorrido con bucles.',
        size: '2.1 MB'
    },
    {
        id: 'p2-15',
        title: '15. Arreglos Bidimensionales',
        parcial: 'intermedio',
        parcialBadge: 'Intermedio',
        badgeClass: 'pdf-badge-intermedio',
        color: '#06b6d4',
        icon: '📊',
        file: 'PDF 2 Parcial/15-Arreglo-Bidimencionales.pdf',
        desc: 'Manipulación de matrices y tablas de datos bidimensionales. Algoritmos de recorrido por filas y columnas utilizando bucles anidados.',
        size: '5.3 MB'
    },
    {
        id: 'p2-16',
        title: '16. Arreglos Dinámicos',
        parcial: 'intermedio',
        parcialBadge: 'Intermedio',
        badgeClass: 'pdf-badge-intermedio',
        color: '#06b6d4',
        icon: '⚡',
        file: 'PDF 2 Parcial/16-Arreglos-Dinamicos.pdf',
        desc: 'Gestión dinámica de memoria, asignación en tiempo de ejecución, ventajas frente a arreglos estáticos y liberación de punteros.',
        size: '1.9 MB'
    },
    {
        id: 'p2-17',
        title: '17. Algoritmos de Búsqueda I',
        parcial: 'intermedio',
        parcialBadge: 'Intermedio',
        badgeClass: 'pdf-badge-intermedio',
        color: '#06b6d4',
        icon: '🔍',
        file: 'PDF 2 Parcial/17-Algoritmos-de-busqueda-I.pdf',
        desc: 'Introducción a la búsqueda lineal o secuencial en colecciones de datos. Ejemplos de implementación y comparación.',
        size: '1.7 MB'
    },
    {
        id: 'p2-18',
        title: '18. Algoritmos de Búsqueda II',
        parcial: 'intermedio',
        parcialBadge: 'Intermedio',
        badgeClass: 'pdf-badge-intermedio',
        color: '#06b6d4',
        icon: '🎯',
        file: 'PDF 2 Parcial/18-Algoritmos-de-busqueda-II.pdf',
        desc: 'Algoritmo de búsqueda binaria. Requisitos de ordenamiento previo, estrategia divide y vencerás y complejidad O(log n).',
        size: '3.3 MB'
    },
    {
        id: 'p2-19',
        title: '19. Ordenamiento de Arreglos',
        parcial: 'intermedio',
        parcialBadge: 'Intermedio',
        badgeClass: 'pdf-badge-intermedio',
        color: '#06b6d4',
        icon: '🔀',
        file: 'PDF 2 Parcial/19-Ordenamiento-de-Arreglos.pdf',
        desc: 'Métodos de ordenamiento clásicos: Burbuja (Bubble Sort), Selección e Inserción. Lógica de intercambio y comparación.',
        size: '2.3 MB'
    },
    {
        id: 'p2-21',
        title: '21. Ejercicios Prácticos de Arreglos II',
        parcial: 'intermedio',
        parcialBadge: 'Intermedio',
        badgeClass: 'pdf-badge-intermedio',
        color: '#06b6d4',
        icon: '📝',
        file: 'PDF 2 Parcial/21-Ejercicios-arreglos-II.pdf',
        desc: 'Guía de problemas resueltos y propuestos para dominar la lógica de programación con arreglos de 1D y 2D.',
        size: '2.4 MB'
    },
    {
        id: 'p2-22',
        title: '22. Funciones - Parte 1',
        parcial: 'intermedio',
        parcialBadge: 'Intermedio',
        badgeClass: 'pdf-badge-intermedio',
        color: '#06b6d4',
        icon: '🧩',
        file: 'PDF 2 Parcial/22-Funciones-Parte1.pdf',
        desc: 'Modularización del código. Definición y declaración de funciones, prototipos, parámetros formales y retorno de valores.',
        size: '1.4 MB'
    },
    {
        id: 'p2-23',
        title: '23. Funciones - Parte 2',
        parcial: 'intermedio',
        parcialBadge: 'Intermedio',
        badgeClass: 'pdf-badge-intermedio',
        color: '#06b6d4',
        icon: '🔄',
        file: 'PDF 2 Parcial/23-Funciones-Parte2.pdf',
        desc: 'Paso de parámetros por valor y por referencia (punteros/referencias). Ámbito de variables locales y globales.',
        size: '3.4 MB'
    },
    {
        id: 'p2-ejercicios',
        title: 'Ejercicios FP Intermedio (Periodo 1-2026)',
        parcial: 'intermedio',
        parcialBadge: 'Intermedio',
        badgeClass: 'pdf-badge-intermedio',
        color: '#06b6d4',
        icon: '🎓',
        file: 'PDF 2 Parcial/EjerciciosFP-2P-Periodo1-2026.pdf',
        desc: 'Examen tipo y compendio de ejercicios prácticos de preparación para la evaluación del Nivel Intermedio.',
        size: '614 KB'
    },

    // Nivel Avanzado (5 Documentos)
    {
        id: 'p3-22',
        title: '22. Funciones - Repaso Parte 1',
        parcial: 'avanzado',
        parcialBadge: 'Avanzado',
        badgeClass: 'pdf-badge-avanzado',
        color: '#a855f7',
        icon: '💜',
        file: 'PDF 3 Parcial/22-Funciones-Parte1 (1).pdf',
        desc: 'Repaso avanzado de la arquitectura modular mediante funciones, paso de argumentos y buenas prácticas.',
        size: '1.4 MB'
    },
    {
        id: 'p3-23',
        title: '23. Funciones - Repaso Parte 2',
        parcial: 'avanzado',
        parcialBadge: 'Avanzado',
        badgeClass: 'pdf-badge-avanzado',
        color: '#a855f7',
        icon: '⚡',
        file: 'PDF 3 Parcial/23-Funciones-Parte2.pdf',
        desc: 'Profundización en funciones, recursividad, modificación directa de argumentos y optimización de llamadas.',
        size: '3.4 MB'
    },
    {
        id: 'p3-24',
        title: '24. Estructuras de Datos (Structs)',
        parcial: 'avanzado',
        parcialBadge: 'Avanzado',
        badgeClass: 'pdf-badge-avanzado',
        color: '#a855f7',
        icon: '🏗️',
        file: 'PDF 3 Parcial/24-Estructuras.pdf',
        desc: 'Definición de registros personalizados (struct), agrupamiento de variables de diferentes tipos bajo un solo tipo de dato.',
        size: '2.5 MB'
    },
    {
        id: 'p3-25',
        title: '25. Estructuras como Parámetros',
        parcial: 'avanzado',
        parcialBadge: 'Avanzado',
        badgeClass: 'pdf-badge-avanzado',
        color: '#a855f7',
        icon: '🛠️',
        file: 'PDF 3 Parcial/25-Estructuras-como-Parametros-de-Funciones.pdf',
        desc: 'Cómo enviar estructuras completas a funciones por valor y por dirección (punteros) para modificar sus atributos.',
        size: '1.6 MB'
    },
    {
        id: 'p3-26',
        title: '26. Arreglos de Estructuras',
        parcial: 'avanzado',
        parcialBadge: 'Avanzado',
        badgeClass: 'pdf-badge-avanzado',
        color: '#a855f7',
        icon: '📚',
        file: 'PDF 3 Parcial/26-Arreglos-de-estructuras.pdf',
        desc: 'Combinación de vectores y estructuras para gestionar colecciones complejas en memoria (ej: lista de alumnos/inventario).',
        size: '1.5 MB'
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
                    ${isGeneral ? `
                        <button class="btn btn-primary btn-sm" style="width: 100%;" onclick="openPdfViewer('${encodeURI(course.file)}', '${course.title.replace(/'/g, "\\'")}')">
                            👁️ Ver PDF (Solo Lectura)
                        </button>
                    ` : (isLocked ? `
                        <button class="btn btn-secondary btn-sm" disabled style="opacity: 0.5; width: 100%; cursor: not-allowed;">
                            🔒 Curso ${String(seqIndex + 1).padStart(2, '0')} Bloqueado
                        </button>
                    ` : `
                        <button class="btn btn-primary btn-sm" onclick="openPdfViewer('${encodeURI(course.file)}', '${course.title.replace(/'/g, "\\'")}')">
                            👁️ Ver PDF
                        </button>
                        <button class="btn btn-secondary btn-sm" onclick="openPracticeModal('${course.id}')" title="Practicar Ejemplo y Ejercicio">
                            💻 Practicar Ejemplo y Ejercicio
                        </button>
                    `)}
                </div>
            </div>
        </div>
    `}).join('');
}

function openPdfViewer(filePath, title) {
    if (!userProfile || !userProfile.id) {
        showToast('🔒 Debes registrarte o iniciar sesión para acceder a los cursos.', 'error');
        updateUserProfileUI();
        return;
    }

    const overlay = document.getElementById('pdf-modal-overlay');
    const iframe = document.getElementById('pdf-modal-iframe');
    const titleEl = document.getElementById('pdf-modal-title');
    const downloadLink = document.getElementById('pdf-modal-download');

    if (!overlay || !iframe) return;

    if (titleEl) titleEl.textContent = title;
    if (downloadLink) downloadLink.href = filePath;

    iframe.src = filePath;
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closePdfViewer() {
    const overlay = document.getElementById('pdf-modal-overlay');
    const iframe = document.getElementById('pdf-modal-iframe');

    if (overlay && iframe) {
        overlay.classList.add('hidden');
        iframe.src = '';
        document.body.style.overflow = '';
    }
}

/* ==========================================================================
   7. USER REGISTRATION & LESSON PROGRESS ENGINE
   ========================================================================== */
const DEFAULT_GUEST_PROFILE = {
    id: null,
    name: 'Estudiante Invitado',
    email: '',
    fpDegree: 'Autodidacta / Entusiasta Tech',
    avatar: '👨‍💻',
    completedLessons: [],
    quizPoints: 0
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
    const isLogged = !!userProfile.id;
    const modalOverlay = document.getElementById('user-modal-overlay');

    // Mandatory Auth Gate Rule: If not logged in, enforce registration as the FIRST page
    if (!isLogged) {
        document.body.classList.add('auth-locked');
        if (modalOverlay) {
            modalOverlay.classList.remove('hidden');
            modalOverlay.classList.add('forced-gate');
        }
        switchAuthTab('register');
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
    showToast('🚪 Has cerrado sesión correctamente.', 'info');
    switchAuthTab('login');
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
            modalOverlay.classList.add('hidden');
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
    const totalCourses = 28;
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

    // Language N unlocked if Language N-1 completed 28 courses
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
            lockMsg: `🔒 Completa los 28 cursos de ${prevLangName} para desbloquear`
        };
    }
}

function renderLangStepperBar() {
    const container = document.getElementById('lang-stepper-bar');
    const badge = document.getElementById('active-lang-status-badge');
    if (!container) return;

    const activeLang = getActiveLanguage();
    const activeProgress = getLanguageProgress(activeLang);
    const activeInfo = LANGUAGES_INFO_MAP[activeLang] || { name: activeLang, icon: '💻' };

    if (badge) {
        badge.textContent = `${activeInfo.icon} ${activeInfo.name} • ${activeProgress.length} / 28 Completados`;
    }

    const certBtn = document.getElementById('btn-open-certificate');
    if (certBtn) {
        if (activeProgress.length >= 28 || userProfile.masterUnlocked) {
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
    if (!userProfile || !userProfile.id) {
        showToast('🔒 Debes registrarte o iniciar sesión para acceder a las prácticas.', 'error');
        updateUserProfileUI();
        return;
    }

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

    const activeLangInfo = LANGUAGES_INFO_MAP[activeLang] || { name: activeLang.toUpperCase(), icon: '💻' };

    if (langSelect) {
        langSelect.innerHTML = `<option value="${activeLang}">${activeLangInfo.icon} ${activeLangInfo.name}</option>`;
        langSelect.value = activeLang;
    }

    if (titleEl) titleEl.textContent = `Práctica (${activeLangInfo.name}): ${course.title}`;
    if (subtitleEl) subtitleEl.textContent = `Ejemplo Guiado & Ejercicio Evaluado en ${activeLangInfo.name}`;

    loadPracticeContent();
    if (modal) modal.classList.remove('hidden');
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
    if (exerciseEditor) exerciseEditor.value = practiceData.exerciseCode;
    if (exercisePrompt) exercisePrompt.textContent = practiceData.prompt;
}

function getCoursePracticeCode(course, lang, courseNum) {
    const langInfo = LANGUAGES_INFO_MAP[lang] || { name: lang.toUpperCase(), icon: '💻' };
    const langName = langInfo.name;

    let exampleCode = `# Ejemplo Guiado - Curso ${courseNum}: ${course.title}\n# Lenguaje: ${langName}\nprint("--- Ejemplo Guiado (${langName}) - Curso ${courseNum} ---")\nprint("Demostración de conceptos de ${course.title} en ${langName}...")`;
    let exerciseCode = `# Ejercicio Evaluado del Curso ${courseNum} (${langName})\n# Escribe un programa en ${langName} que imprima exactamente "Curso ${courseNum} Completado"\n\nprint("Curso ${courseNum} Completado")`;
    let prompt = `Escribe un programa en ${langName} que imprima el mensaje "Curso ${courseNum} Completado" para validar tu comprensión del tema "${course.title}".`;

    if (lang === 'cpp') {
        exampleCode = `// Ejemplo Guiado - Curso ${courseNum}: ${course.title}\n// Lenguaje: C++\n#include <iostream>\n\nint main() {\n    std::cout << "--- Ejemplo Guiado (C++) - Curso ${courseNum} ---" << std::endl;\n    std::cout << "Demostración de conceptos de ${course.title}..." << std::endl;\n    return 0;\n}`;
        exerciseCode = `// Ejercicio Evaluado del Curso ${courseNum} (C++)\n#include <iostream>\n\nint main() {\n    std::cout << "Curso ${courseNum} Completado" << std::endl;\n    return 0;\n}`;
    } else if (lang === 'node') {
        exampleCode = `// Ejemplo Guiado - Curso ${courseNum}: ${course.title}\n// Lenguaje: Node.js\nconsole.log("--- Ejemplo Guiado (Node.js) - Curso ${courseNum} ---");\nconsole.log("Demostración de conceptos de ${course.title}...");`;
        exerciseCode = `// Ejercicio Evaluado del Curso ${courseNum} (Node.js)\nconsole.log("Curso ${courseNum} Completado");`;
    } else if (lang === 'typescript') {
        exampleCode = `// Ejemplo Guiado - Curso ${courseNum}: ${course.title}\n// Lenguaje: TypeScript\nconst tema: string = "${course.title}";\nconsole.log(\`--- Ejemplo Guiado (TypeScript) - \${tema} ---\`);`;
        exerciseCode = `// Ejercicio Evaluado del Curso ${courseNum} (TypeScript)\nconst msg: string = "Curso ${courseNum} Completado";\nconsole.log(msg);`;
    } else if (lang === 'java') {
        exampleCode = `// Ejemplo Guiado - Curso ${courseNum}: ${course.title}\n// Lenguaje: Java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("--- Ejemplo Guiado (Java) - Curso ${courseNum} ---");\n    }\n}`;
        exerciseCode = `// Ejercicio Evaluado del Curso ${courseNum} (Java)\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Curso ${courseNum} Completado");\n    }\n}`;
    } else if (lang === 'sql') {
        exampleCode = `-- Ejemplo Guiado - Curso ${courseNum}: ${course.title}\n-- Lenguaje: SQL\nSELECT * FROM curso_${courseNum} LIMIT 5;`;
        exerciseCode = `-- Ejercicio Evaluado del Curso ${courseNum} (SQL)\nSELECT 'Curso ${courseNum} Completado' AS estado;`;
    } else if (lang === 'rust') {
        exampleCode = `// Ejemplo Guiado - Curso ${courseNum}: ${course.title}\n// Lenguaje: Rust\nfn main() {\n    println!("--- Ejemplo Guiado (Rust) - Curso ${courseNum} ---");\n}`;
        exerciseCode = `// Ejercicio Evaluado del Curso ${courseNum} (Rust)\nfn main() {\n    println!("Curso ${courseNum} Completado");\n}`;
    } else if (lang === 'solidity') {
        exampleCode = `// SPDX-License-Identifier: MIT\n// Lenguaje: Solidity\npragma solidity ^0.8.0;\ncontract CursoExample {\n    string public title = "Curso ${courseNum}: ${course.title}";\n}`;
        exerciseCode = `// SPDX-License-Identifier: MIT\n// Lenguaje: Solidity\npragma solidity ^0.8.0;\ncontract CursoExercise {\n    string public status = "Curso ${courseNum} Completado";\n}`;
    }

    return { exampleCode, exerciseCode, prompt };
}

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

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    }

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
                    if (modal) modal.classList.add('hidden');
                }, 600);
            }
        });
    }
}

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
            if (href && href.startsWith('#')) {
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
