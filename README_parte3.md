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

### 4.7 Representación Computacional (Matriz de Relación)
- **Utilidad Práctica:** Contabilizar de forma eficiente las inasistencias y penalizaciones ("strikes") de los alumnos a tutorías programadas. Almacenar asistencias en matrices booleanas permite consultarlas en $O(1)$, reduciendo lecturas a la base de datos de Firestore.
- **Explicación Matemática:** 
  Matriz de relación $M_R = [m_{ij}]$ de tamaño $n \times m$, donde el alumno $i$ y la clase $j$ tiene: $m_{ij} \in \{0, 1\}$. 
  La inasistencia acumulada (strikes) del estudiante $i$ a lo largo de $m$ clases programadas es:
  $\text{Strikes}_i = \sum_{j=1}^m (1 - m_{ij})$
- **Código de Ejemplo:**
```dart
List<List<int>> generarMatrizAsistencia(List<String> alumnos, List<String> clases, Map datosFirebase) {
  List<List<int>> matriz = [];
  
  for (var alumno in alumnos) {
    List<int> filaAlumno = [];
    for (var clase in clases) {
      // Si el valor en Firebase es true, agrega 1; si es false/nulo, agrega 0
      bool asistio = datosFirebase[clase][alumno] ?? false;
      filaAlumno.add(asistio ? 1 : 0); 
    }
    matriz.add(filaAlumno);
  }
  return matriz;
}
```
*(Nota: El simulador interactivo "Registro de Asistencia" de la página web demuestra esta matriz calculando reactivamente las penalizaciones al marcar/desmarcar checkboxes).*

---

## 5. FUNCIONES

### 5.1 Composición de Funciones (Predicción y Minería de Datos)
- **Utilidad Práctica:** En el Dashboard de Análisis, el algoritmo predictivo de minería de datos ayuda a la coordinación de ciencias a estimar la "Tasa de Ausencias Mensual" según las tendencias de uso, permitiendo tomar medidas preventivas.
- **Explicación Matemática:** 
  La composición $(g \circ f)$ es la imagen resultante de aplicar sucesivamente dos o más funciones.
  - $f(x) = 20x + 5$: Función que predice cantidad de cupos apartados en el mes $x$.
  - $g(y) = \frac{y}{4}$: Función que predice ausencias en base a $y$ cupos apartados.
  - **Función Compuesta:** $(g \circ f)(x) = g(20x + 5) = \frac{20x + 5}{4} = \mathbf{5x + 1.25}$
  - Ejemplo para el mes de Agosto ($x=5$): $(g \circ f)(5) = 5(5) + 1.25 = \mathbf{26.25}$ ausencias estimadas.
- **Código de Ejemplo:**
```dart
double f(double x) => (20 * x) + 5; // Cupos apartados en el mes x
double g(double y) => y / 4;        // Ausencias dado 'y' cupos

double predecirTasaAusencias(double x) {
  // Composición (g ∘ f)(x) = 5x + 1.25
  return g(f(x)); 
}
```
*(Nota: En Vecta Web, el módulo interactivo despliega visualmente esta tubería matemática. Al ingresar el Mes ($x$), el valor atraviesa las funciones $f(x)$ y $g(y)$ como si fueran cajas de transformación, mostrando el resultado componiendo).*

### 5.2 Composición de Funciones (El "Flujo Uber" de Asignación)
Este modelo (basado en el Laboratorio 2) mapea el proceso de asignación de tutorías cuando un estudiante crea un requerimiento y este queda en una "bolsa de solicitudes pendientes" hasta que un tutor certificado lo toma (exclusividad). Este flujo se orquesta mediante dos Cloud Functions en Firebase.
