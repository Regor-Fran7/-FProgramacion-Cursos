import tkinter as tk
from tkinter import ttk, messagebox

class AppEstudianteGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("🎓 Asistente de Estudio para Programadores")
        self.root.geometry("750x550")
        self.root.configure(bg="#1e1e2e")
        self.root.resizable(False, False)

        # Definición de Colores (Catppuccin Mocha Palette)
        self.colors = {
            "bg": "#1e1e2e",
            "card_bg": "#181825",
            "sidebar_bg": "#11111b",
            "primary": "#89b4fa",
            "secondary": "#b4befe",
            "success": "#a6e3a1",
            "danger": "#f38ba8",
            "text": "#cdd6f4",
            "subtext": "#a6adc8",
            "entry_bg": "#313244",
            "btn_bg": "#89b4fa",
            "btn_text": "#11111b"
        }

        # Datos de Lenguajes
        self.lenguajes_info = {
            "Python 🐍": "Lenguaje versátil ideal para IA, análisis de datos, automatización y desarrollo web.",
            "C++ ⚙️": "Rendimiento extremo, control de memoria y desarrollo de videojuegos o sistemas.",
            "Rust 🦀": "Programación de sistemas moderna, segura en memoria y concurrencia sin carreras.",
            "Node.js 🟢": "Entorno de ejecución de JavaScript en el servidor para APIs asíncronas y escalables.",
            "Java ☕": "Orientado a objetos, robusto y multiplataforma para aplicaciones enterprise y Android.",
            "SQL 🗄️": "Lenguaje estándar para consulta, gestión y manipulación de bases de datos relacionales.",
            "TypeScript 🟦": "Superset de JavaScript con tipado estático para código robusto y mantenible.",
            "Solidity ⛓️": "Lenguaje orientado a contratos inteligentes para la blockchain de Ethereum (Web3)."
        }

        self.crear_interfaz()

    def crear_interfaz(self):
        # Header / Encabezado
        header_frame = tk.Frame(self.root, bg=self.colors["sidebar_bg"], height=60)
        header_frame.pack(fill="x", side="top")
        
        titulo_label = tk.Label(
            header_frame, 
            text="🎓 PLATAFORMA DE ESTUDIO DE PROGRAMACIÓN", 
            font=("Segoe UI", 16, "bold"), 
            fg=self.colors["primary"], 
            bg=self.colors["sidebar_bg"]
        )
        titulo_label.pack(pady=15)

        # Contenedor Principal con Pestanas (Notebook)
        style = ttk.Style()
        style.theme_use('default')
        
        # Configurar estilos de las pestañas
        style.configure("TNotebook", background=self.colors["bg"], borderwidth=0)
        style.configure("TNotebook.Tab", background=self.colors["card_bg"], foreground=self.colors["text"], padding=[15, 8], font=("Segoe UI", 10, "bold"))
        style.map("TNotebook.Tab", background=[("selected", self.colors["primary"])], foreground=[("selected", self.colors["sidebar_bg"])])

        notebook = ttk.Notebook(self.root)
        notebook.pack(expand=True, fill="both", padx=20, pady=15)

        # Tab 1: Calculadora de Promedio
        tab_promedio = tk.Frame(notebook, bg=self.colors["bg"])
        notebook.add(tab_promedio, text="📊 Calcular Promedio")
        self.setup_tab_promedio(tab_promedio)

        # Tab 2: Lenguajes del Curso
        tab_lenguajes = tk.Frame(notebook, bg=self.colors["bg"])
        notebook.add(tab_lenguajes, text="💻 Lenguajes del Curso")
        self.setup_tab_lenguajes(tab_lenguajes)

        # Tab 3: Proyecto Web App
        tab_proyecto = tk.Frame(notebook, bg=self.colors["bg"])
        notebook.add(tab_proyecto, text="🌐 Proyecto Web App")
        self.setup_tab_proyecto(tab_proyecto)

    def setup_tab_promedio(self, parent):
        card = tk.Frame(parent, bg=self.colors["card_bg"], bd=0, relief="flat", padx=30, pady=30)
        card.pack(expand=True, fill="both", padx=20, pady=20)

        instructions = tk.Label(
            card, 
            text="Ingrese sus calificaciones separadas por comas (Ejemplo: 8.5, 9.0, 7.5, 10):",
            font=("Segoe UI", 11),
            fg=self.colors["text"],
            bg=self.colors["card_bg"]
        )
        instructions.pack(anchor="w", pady=(0, 10))

        self.entry_notas = tk.Entry(
            card,
            font=("Segoe UI", 12),
            bg=self.colors["entry_bg"],
            fg=self.colors["text"],
            insertbackground=self.colors["text"],
            relief="flat",
            bd=5
        )
        self.entry_notas.pack(fill="x", ipady=8, pady=(0, 15))

        btn_calcular = tk.Button(
            card,
            text="Calcular Promedio",
            font=("Segoe UI", 11, "bold"),
            bg=self.colors["btn_bg"],
            fg=self.colors["btn_text"],
            activebackground=self.colors["secondary"],
            relief="flat",
            cursor="hand2",
            command=self.calcular_promedio
        )
        btn_calcular.pack(fill="x", ipady=6, pady=(0, 15))

        # Resultado
        self.lbl_resultado = tk.Label(
            card,
            text="",
            font=("Segoe UI", 13, "bold"),
            bg=self.colors["card_bg"],
            fg=self.colors["text"]
        )
        self.lbl_resultado.pack(pady=10)

    def calcular_promedio(self):
        texto = self.entry_notas.get().strip()
        if not texto:
            messagebox.showwarning("Campo Vacío", "Por favor ingrese al menos una nota.")
            return

        try:
            partes = texto.split(",")
            notas = [float(p.strip()) for p in partes if p.strip()]
            
            if not notas:
                raise ValueError()

            promedio = sum(notas) / len(notas)
            
            if promedio >= 6.0:
                estado = "🎉 ¡APROBADO!"
                color = self.colors["success"]
            else:
                estado = "📚 NECESITA REPASAR"
                color = self.colors["danger"]

            self.lbl_resultado.config(
                text=f"Promedio: {promedio:.2f}  |  Estado: {estado}",
                fg=color
            )
        except ValueError:
            messagebox.showerror("Error de Entrada", "Asegúrese de ingresar solo números separados por comas.")

    def setup_tab_lenguajes(self, parent):
        frame_top = tk.Frame(parent, bg=self.colors["bg"])
        frame_top.pack(fill="both", expand=True, padx=10, pady=10)

        lbl_instruccion = tk.Label(
            frame_top, 
            text="Selecciona un lenguaje para ver su descripción:", 
            font=("Segoe UI", 11, "bold"),
            fg=self.colors["primary"],
            bg=self.colors["bg"]
        )
        lbl_instruccion.pack(anchor="w", pady=(0, 5))

        # Lista e Info
        paned = tk.PanedWindow(frame_top, bg=self.colors["bg"], sashwidth=4)
        paned.pack(fill="both", expand=True)

        # Listbox a la izquierda
        self.listbox = tk.Listbox(
            paned,
            font=("Segoe UI", 11),
            bg=self.colors["card_bg"],
            fg=self.colors["text"],
            selectbackground=self.colors["primary"],
            selectforeground=self.colors["sidebar_bg"],
            bd=0,
            highlightthickness=0
        )
        for lang in self.lenguajes_info.keys():
            self.listbox.insert(tk.END, lang)
        
        self.listbox.bind("<<ListboxSelect>>", self.mostrar_info_lenguaje)
        paned.add(self.listbox, width=200)

        # Card derecha para detalles
        self.card_info = tk.Frame(paned, bg=self.colors["card_bg"], padx=20, pady=20)
        paned.add(self.card_info)

        self.lbl_lang_title = tk.Label(
            self.card_info, 
            text="Seleccione un lenguaje", 
            font=("Segoe UI", 14, "bold"),
            fg=self.colors["primary"],
            bg=self.colors["card_bg"]
        )
        self.lbl_lang_title.pack(anchor="w", pady=(0, 10))

        self.lbl_lang_desc = tk.Label(
            self.card_info, 
            text="Aquí aparecerán las características principales del lenguaje seleccionado.", 
            font=("Segoe UI", 10),
            fg=self.colors["subtext"],
            bg=self.colors["card_bg"],
            wraplength=350,
            justify="left"
        )
        self.lbl_lang_desc.pack(anchor="w")

    def mostrar_info_lenguaje(self, event):
        seleccion = self.listbox.curselection()
        if seleccion:
            clave = self.listbox.get(seleccion[0])
            info = self.lenguajes_info[clave]
            self.lbl_lang_title.config(text=clave)
            self.lbl_lang_desc.config(text=info)

    def setup_tab_proyecto(self, parent):
        card = tk.Frame(parent, bg=self.colors["card_bg"], padx=25, pady=25)
        card.pack(expand=True, fill="both", padx=20, pady=20)

        lbl = tk.Label(
            card,
            text="🌐 PROYECTO WEB APP ESTUDIANTIL",
            font=("Segoe UI", 14, "bold"),
            fg=self.colors["primary"],
            bg=self.colors["card_bg"]
        )
        lbl.pack(anchor="w", pady=(0, 10))

        desc = (
            "Este proyecto se convertirá en una plataforma web interactiva diseñada para estudiantes.\n\n"
            "Incluirá los 8 lenguajes asignados:\n"
            "• Python, C++, Rust, Node.js, Java, SQL, TypeScript y Solidity.\n\n"
            "Funcionalidades Web:\n"
            "1. Tarjetas interactivas por lenguaje.\n"
            "2. Visor de código y comparación de sintaxis.\n"
            "3. Guía rápida de referencia (Cheat-sheets).\n"
            "4. Interfaz responsiva con diseño oscuro moderno."
        )

        lbl_body = tk.Label(
            card,
            text=desc,
            font=("Segoe UI", 10),
            fg=self.colors["text"],
            bg=self.colors["card_bg"],
            justify="left"
        )
        lbl_body.pack(anchor="w")

def main():
    root = tk.Tk()
    app = AppEstudianteGUI(root)
    root.mainloop()

if __name__ == "__main__":
    main()
