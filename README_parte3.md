**Verificación:**
- Suma de grados externos: $deg^+(\text{Carlos}) + deg^+(\text{María}) + deg^+(\text{Juan}) = 1 + 1 + 1 = 3$ arcos salientes.
- Suma de grados internos: $deg^-(\text{Elena}) + deg^-(\text{Roberto}) = 2 + 1 = 3$ arcos entrantes.
- Total de relaciones = $3$.

**Funcionamiento del Elemento Interactivo en la Web:**
El módulo *Análisis de Flujo (Dígrafos)* despliega visualmente el dígrafo descrito mediante nodos conectados por rutas trazadas en SVG.
1. La plataforma expone directamente el valor de los Grados Internos ($deg^-$) para los nodos "tutores" receptores, y el Grado Externo ($deg^+$) para los nodos "estudiantes" emisores.
2. Un panel sumatorio verifica permanentemente el Teorema del Apretón de Manos, confirmando en vivo que $\sum deg^+ = \sum deg^- = |R| = 3$.

#### D. Trayectorias en Relaciones y Prevención de Ciclos
- **Problema Práctico:** Rastrear flujos de recomendación indirectos y estructurar mapas de prerrequisitos escolares donde ciertas materias son dependencias de otras.
- **Por qué se aplica:** Detectar ciclos es de vital importancia: si la materia Física I exige Cálculo I, y Cálculo I exige Física I, el estudiante se enfrenta a una dependencia circular bloqueante. Prevenir ciclos evita bucles de ejecución infinitos en las consultas recursivas de base de datos.
- **Sustento Matemático:**
  - Una trayectoria de longitud $n$ en una relación $R$ de un vértice $v_0$ a $v_n$ es una secuencia de vértices $v_0, v_1, \dots, v_n$ tal que $(v_i, v_{i+1}) \in R$ para todo $0 \leq i < n$.
  - Un ciclo es una trayectoria de longitud $n \geq 1$ donde el punto inicial coincide con el final ($v_0 = v_n$).
  - Para garantizar la viabilidad del flujo de prerrequisitos, el dígrafo debe ser un DAG (Grafo Acíclico Dirigido), cumpliendo: $\forall v \in V$, no existe trayectoria de $v$ a $v$ con longitud $\geq 1$.
- **Implementación:** Al agregar un nuevo prerrequisito en Vecta, el backend ejecuta una búsqueda en profundidad (DFS) para rastrear trayectorias de retorno. Si se detecta que $v_0 = v_n$, la transacción se aborta con un error de ciclo.

### 4.6 Propiedades de las Relaciones y Reglas de Negocio
Conectamos las seis propiedades matemáticas fundamentales con las reglas de seguridad y la lógica de negocio en la base de datos de Vecta:

| Propiedad | Definición Matemática | Regla Matricial | Aplicación en Vecta (Problema Práctico y Solución) |
| --- | --- | --- | --- |
| **Irreflexiva** | $\forall x \in A, (x,x) \notin R$ | Diagonal principal nula ($r_{ii} = 0$) | **Prevenir fraudes de auto-calificación y auto-suscripción:** Se garantiza mediante Firebase Security Rules. Un usuario no puede agregarse a sí mismo a su `listaDeTutoresSuscritos` ni auto-calificar sus clases para inflar su reputación. |
| **Antisimétrica** | $\forall x,y \in A, (x,y) \in R \land (y,x) \in R \implies x = y$ | Si $M_{ij} = 1 \implies M_{ji} = 0$ (para $i \neq j$) | **Tribunal de Baneos:** Si un alumno (A) reporta a un tutor (B), la relación de "acusación" es en un solo sentido. El sistema bloquea que (B) pueda reportar a (A) como venganza inmediata en una disputa activa. |
| **Transitiva** | $\forall x,y,z \in A, (x,y) \in R \land (y,z) \in R \implies (x,z) \in R$ | Si $M_{ij} = 1 \land M_{jk} = 1 \implies M_{ik} = 1$ | **Motor de Prerrequisitos:** Si para cursar Física II se requiere Física I, y para Física III se requiere Física II, Física I es transitivamente requerida para Física III. Resuelve la habilitación en tiempo $O(1)$ sin búsquedas recursivas lentas. |
| **Reflexiva** | $\forall x \in A, (x,x) \in R$ | Diagonal principal activa ($r_{ii} = 1$) | **Estados de Igualdad e Identidad:** Utilizado para consultas de autenticación y mapeo unívoco de tokens de acceso (UID == Auth.uid), asegurando que cada usuario tenga permisos de lectura/escritura propios. |
| **Simétrica** | $\forall x,y \in A, (x,y) \in R \implies (y,x) \in R$ | La matriz de relación es simétrica ($M_R = M_R^T$) | **Mensajería Bidireccional:** Modela las Salas de Chat. Si un estudiante inicia chat con un tutor, se abre un canal bidireccional mutuo. Previene spam de una sola vía y simplifica la estructura de Firestore. |
| **Equivalencia** | Reflexiva, Simétrica y Transitiva | Cumple las tres condiciones anteriores | **Agrupación y Particiones:** Agrupa a los estudiantes por facultad o carrera en grupos disjuntos y no solapados para asignación de foros y tutorías masivas. |

**Funcionamiento del Elemento Interactivo en la Web:**
Este módulo unificado permite al usuario navegar de forma fluida a través de un carrusel interactivo que explica gráficamente las 6 propiedades clave. 
1. El usuario puede deslizar de forma secuencial, donde cada tarjeta muestra la propiedad matemática, un pequeño diagrama del grafo (explicando la conexión de nodos y lazos) y el fragmento del código IDE implementado.
2. **Simulador de Tránsito (Transitiva):** En la sección respectiva a la propiedad transitiva, se ofrece una demostración jugable que simula internamente cómo Dart asume transitivamente la jerarquía cronológica para ordenar tutorías (X < Y y Y < Z, luego X < Z) sin tener que compararlas explícitamente, operando la función real mediante un botón animado que imita el log del sistema en vivo.

### 4.7 Representación Computacional (Matriz de Relación y Código)
La Matriz de Relación ($M_R$) funciona bajo una regla booleana simple: si hay relación es $1$, de lo contrario es $0$. Aplicamos este concepto al Registro de Asistencia de las clases de un tutor.

- **Problema Práctico:** Contabilizar de forma eficiente las inasistencias y penalizaciones ("strikes") de los alumnos a las tutorías programadas.
- **Por qué se aplica:** Almacenar e interrogar asistencias en matrices booleanas permite consultarlas en tiempo real en $O(1)$, reduciendo drásticamente las lecturas en Firestore y evitando búsquedas lentas de logs históricos.
- **Sustento Matemático:** Matriz de relación $M_R = [m_{ij}]$ de tamaño $n \times m$, donde el alumno $i$ y clase $j$ tiene: $m_{ij} \in \{0, 1\}$. La inasistencia acumulada (strikes) del estudiante $i$ a lo largo de las $m$ clases programadas se calcula mediante:
  $\text{Strikes}_i = \sum_{j=1}^m (1 - m_{ij})$

**Ejemplo Práctico:**
Tutor Roberto dicta dos clases (C1 y C2) a tres alumnos: Luis, Ana y Pedro.
- Luis: Asistió a C1, faltó a C2 $\implies (1, 0) \implies 1$ strike
- Ana: Asistió a C1, asistió a C2 $\implies (1, 1) \implies 0$ strikes
- Pedro: Faltó a C1, faltó a C2 $\implies (0, 0) \implies 2$ strikes

**Matriz de Relación Resultante ($M_R$):**
$$
\begin{pmatrix}
1 & 0 \\
1 & 1 \\
0 & 0
\end{pmatrix}
$$

| Alumno | C1 | C2 | Suma de Inasistencias (0s) | Estado de Penalización |
| --- | --- | --- | --- | --- |
| Luis | 1 | 0 | 1 | 1 Strike |
| Ana | 1 | 1 | 0 | Activo (Sin Penalizaciones) |
| Pedro | 0 | 0 | 2 | 2 Strikes (Alerta de Suspensión) |

**Funcionamiento del Elemento Interactivo en la Web:**
La plataforma presenta el ejemplo descrito de manera completamente interactiva:
1. El usuario actúa como el tutor y tiene a su disposición una tabla de asistencias (Matriz Booleana $M_R$) integrada con casillas de verificación (checkboxes) para Luis, Ana y Pedro a través de C1 y C2.
2. Cuando el usuario desmarca una casilla (asumiendo que $m_{ij} = 0$, denotando inasistencia), una función reactiva calcula en milisegundos la sumatoria del vector de la fila usando la función $\sum (1 - m_{ij})$.
3. La interfaz visual resalta reactivamente el impacto final y modifica las alertas, coloreando de rojo la penalidad (2 Strikes) si un alumno alcanza el límite configurado.

**Implementación del Algoritmo (Dart/Firebase)**
Código conceptual en `registro_asistencia.dart` que itera sobre la base de datos para generar la matriz de relación:

```dart
List<List<int>> generarMatrizAsistencia(List<String> alumnos, List<String> clases, Map datosFirebase) {
  List<List<int>> matriz = [];
  
  for (var alumno in alumnos) {
    List<int> filaAlumno = [];
    for (var clase in clases) {
      // Si el valor en el Map de Firebase es true, agrega 1; si es false o nulo, agrega 0
      bool asistio = datosFirebase[clase][alumno] ?? false;
      filaAlumno.add(asistio ? 1 : 0); 
    }
    matriz.add(filaAlumno);
  }
  return matriz;
}
```

---

## 5. FUNCIONES
El sistema opera bajo diversas lógicas funcionales.
- **Definiciones Base**: El conjunto de Solicitudes de clases es el Dominio, los Tutores disponibles son el Codominio, y los tutores que "Aceptan" conforman el Rango.
- **Función Inyectiva (Uno a Uno)**: Cada usuario recibe un identificador UUID único. Es inyectiva porque $f(x_1) = f(x_2) \Rightarrow x_1 = x_2$.
- **Función Suprayectiva**: El sistema web obliga a que todos los estudiantes elijan una facultad en el registro, garantizando que el Rango sea exactamente igual al Codominio de Facultades.
- **Función Biyectiva**: La asignación de un "Token de Reseteo SMTP" a un "Correo Electrónico".
- **Función Inversa ($f^{-1}$)**: Dado que la recuperación de contraseña es biyectiva, el servidor rastrea quién solicitó el reseteo leyendo la URL al revés: $f^{-1}(\text{Token}_{123}) = \text{Nieves}$.
- **Función Idéntica**: Se refleja en el panel "Mi Perfil" de la app, donde la BD devuelve la misma data inalterada ($f(x) = x$).

### 5.1 Composición de Funciones
La composición $(g \circ f)$ es la imagen resultado de la aplicación sucesiva de dos o más funciones. El algoritmo predictivo de Data Mining de Vecta calcula la Tasa de Ausencias Mensual.
- $f(x) = 20x + 5$: Función que predice la cantidad de cupos apartados en el mes $x$.
- $g(y) = \frac{y}{4}$: Función que predice la cantidad de "Ausencias".
- Función Compuesta $(g \circ f)(x) = g(20x + 5) = \frac{20x + 5}{4} = 5x + 1.25$

Si la universidad pide el reporte proyectado del mes de Agosto ($x=5$): $(g \circ f)(5) = 5(5) + 1.25 = \mathbf{26.25} \text{ ausencias estimadas}$.

**Funcionamiento del Elemento Interactivo en la Web:**
En el módulo de *Predicción de Ausencias*, el flujo se despliega visualmente en una tubería de operaciones:
1. El usuario tiene un input principal para ingresar el **Mes ($x$)** que quiere analizar.
2. Al ingresar el valor numérico, el sistema ejecuta interactivamente $f(x)$ y muestra en una caja intermedia el número de cupos proyectados.
3. Automáticamente, este valor es canalizado hacia la segunda función $g(y)$, mostrándose la transformación final en una caja de resultados brillante con el cálculo completo de $(g \circ f)(x)$, ejemplificando de forma evidente cómo un dato encadena resultados.

```dart
// Función f(x): Predice cantidad de cupos apartados en el mes x
double f(double x) {
  return (20 * x) + 5;
}

// Función g(y): Predice ausencias dado los cupos y
double g(double y) {
  return y / 4;
}

// Composición de Funciones (g ∘ f)(x)
double predecirTasaAusencias(double x) {
  // Sustituimos la función interior dentro de la exterior
  // g(f(x)) es algebraicamente igual a: 5x + 1.25
  return g(f(x)); 
}

// Uso en las Métricas del Dashboard (Ejemplo Agosto, x = 5)
void generarReporteAusencias() {
  double ausenciasEstimadas = predecirTasaAusencias(5); 
  print("Ausencias para Agosto: $ausenciasEstimadas"); // Imprime: 26.25
}
```

### 5.2 Composición de Funciones (El "Flujo Uber" de Asignación)
Este modelo (basado en el Laboratorio 2) mapea el proceso de asignación de tutorías cuando un estudiante crea un requerimiento y este queda en una "bolsa de solicitudes pendientes" hasta que un tutor certificado lo toma (exclusividad). Este flujo se orquesta mediante dos Cloud Functions en Firebase.
