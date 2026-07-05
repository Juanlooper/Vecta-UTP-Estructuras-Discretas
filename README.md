# Arquitectura Lógica de Vecta UTP basada en Matemáticas Discretas

## 1. INTRODUCCIÓN
El presente trabajo final tiene como objetivo aplicar de manera rigurosa los conceptos de la matemática discreta a la arquitectura lógica de un sistema real: la Plataforma de Tutorías Vecta UTP. A través de este análisis, se evidenciará cómo la gestión de bases de datos, el emparejamiento de usuarios, el control de cupos y la seguridad criptográfica del sistema no son más que representaciones computacionales de Sucesiones, Teoría de Conjuntos, Relaciones, Grafos, Funciones, Técnicas de Conteo y Estructuras Algebraicas (Grupos Abelianos).

Todo el marco teórico será sustentado matemáticamente y se explicará su implementación directa tanto en la interfaz de la página web (Frontend en Flutter) como en los servidores en la nube (Backend en Firebase). La matemática discreta funciona como el puente que traduce la lógica teórica humana a instrucciones computacionales exactas; sin ella, el diseño de algoritmos eficientes, la prevención de redundancias en bases de datos y la estructuración de la seguridad perimetral de la plataforma Vecta serían imposibles de implementar a nivel corporativo.

*(Nota: Este repositorio incluye una interfaz interactiva web (`web_interactiva`) diseñada para visualizar dinámicamente cómo cada concepto matemático se comporta en tiempo real, conectando la teoría abstracta con componentes de UI.)*

---

## 2. SUCESIONES Y TEORÍA DE CONJUNTOS

### 2.1 Sucesiones en la Plataforma
Matemáticamente, una sucesión es una lista de objetos enumerados en orden creciente de los números naturales. Pueden ser finitas o infinitas y sus elementos pueden ser diferentes o encontrarse repetidos. En la plataforma, el sistema asigna un límite de capacidad a los servidores de Firebase (cupos concurrentes y límites de error) a medida que avanzan los meses.

- **Sucesión Finita**: Es aquella cuyos términos tienen un fin. Por ejemplo, el registro de la cantidad de usuarios baneados por mes durante el primer cuatrimestre (4 meses) tras la implementación del sistema: $S = \{ 2, 5, 8, 11 \}$.
- **Sucesión Infinita**: Es aquella cuyos términos no tienen fin. Por ejemplo, los registros lógicos (logs) de inicios de sesión generados continuamente en la base de datos desde el despliegue del sistema hasta el infinito: $S = \{ 10, 20, 30, 40, ... \}$.
- **Fórmula Explícita**: Es aquella que permite calcular cualquier término de la sucesión sustituyendo directamente la posición $k$. La sucesión que define la expansión de capacidad de usuarios por fase $k$ en los servidores es $S_k = 100 + 50(k - 1)$.
  - Fase 1 ($k=1$): $S_1 = 100 + 50(1 - 1) = 100$ usuarios.
  - Fase 2 ($k=2$): $S_2 = 100 + 50(2 - 1) = 150$ usuarios.
- **Fórmula Recursiva**: La misma capacidad se anida dependiendo del término de la fase anterior, donde cada nuevo hito depende del límite previo: $S_k = (S_{k-1}) + 50$ (con $S_1 = 100$). A nivel de programación, las fórmulas recursivas son muy utilizadas para iteraciones (loops) que optimizan la escritura de código, aunque requieren un control estricto de la memoria.
  - $S_2 = S_1 + 50 = 100 + 50 = 150$.

**Funcionamiento del Elemento Interactivo en la Web:**
El módulo de *Crecimiento de Servidores* presenta un control deslizante (slider) donde el usuario puede modificar la variable Fase (`k`) desde 1 hasta 10. Al interactuar con el control:
1. Se actualiza dinámicamente la **Capacidad Estimada** en la tarjeta de resultados aplicando la fórmula explícita $S_k = 100 + 50(k - 1)$.
2. Simultáneamente, un gráfico de barras visual se actualiza para reflejar el crecimiento lineal de los usuarios, ilustrando cómo cada incremento secuencial demanda mayor cuota de lectura en Firebase.

```dart
// Fórmula Explícita: S_k = 100 + 50(k-1)
// Calcula cualquier término de la sucesión sustituyendo k (Fase)
int calcularCapacidadFaseExplicita(int k) {
  return 100 + 50 * (k - 1);
}

// Fórmula Recursiva: S_k = S_(k-1) + 50
// Muy utilizada en iteraciones de software (loops)
int calcularCapacidadFaseRecursiva(int k) {
  // Condición base (Fase 1)
  if (k <= 1) return 100; 
  // La misma capacidad se anida dependiendo del término anterior
  return calcularCapacidadFaseRecursiva(k - 1) + 50;
}

// Ejemplo (Fase 2):
// int limite = calcularCapacidadFaseExplicita(2); // Resultado: 150 usuarios
```

### 2.2 Teoría de Conjuntos
Un conjunto es una agrupación de objetos cualquiera. En Firestore, segmentamos a los usuarios en colecciones que actúan matemáticamente como conjuntos.

- **Conjunto Universal (U)**: Es el conjunto que contiene todos los elementos del contexto en estudio.
  - Notación Verbal: Todos los usuarios registrados en Vecta UTP.
  - Notación por Comprensión: $U = \{ x \mid x \text{ es un usuario autenticado en Firebase Auth} \}$
  - Notación por Extensión: $U = \{ \text{Juan, Alejandra, Miguel, Carlos, Ana, Luis, Nieves} \}$
- **Pertenencia ($\in$) y Subconjuntos ($\subset$)**: Un elemento pertenece a un conjunto si forma parte de él (Ej: $\text{Nieves} \in U$). Un conjunto $A$ es subconjunto de $B$ si todo elemento de $A$ está en $B$. El grupo de tutores ($T$) es un subconjunto directo de los usuarios totales ($U$): $T \subset U \Longleftrightarrow \forall x (x \in T \Rightarrow x \in U)$.
- **Tipos de Conjuntos y Cardinalidad**:
  - **Conjunto Finito**: Los administradores del sistema. $A = \{ \text{Juan, Alejandra, Miguel} \}$. Posee una cantidad limitada de elementos. Su Cardinalidad (número de elementos) es $|A| = 3$.
  - **Conjunto Infinito**: El conjunto de posibles combinaciones criptográficas (hashes) para los tokens de sesión generados por la plataforma.
  - **Conjunto Vacío ($\emptyset$)**: El conjunto de tutores que han recibido 6 estrellas de calificación (el máximo programado en el sistema es 5). Sea $E$ el conjunto de tutores con calificación > 5, entonces $E = \emptyset$.
- **Conjunto Potencia ($2^n$)**: Es el conjunto formado por todos los subconjuntos posibles de un conjunto original. En pruebas de software (A/B Testing), si el sistema selecciona a 3 tutores estrella $T = \{ \text{Ana, Luis, Nieves} \}$ para probar una versión Beta de la aplicación, las combinaciones posibles de grupos de prueba se definen por la fórmula $2^n$, siendo $2^3 = 8$ subconjuntos: 
  $P(T) = \{ \emptyset, \{ \text{Ana} \}, \{ \text{Luis} \}, \{ \text{Nieves} \}, \{ \text{Ana, Luis} \}, \{ \text{Ana, Nieves} \}, \{ \text{Luis, Nieves} \}, \{ \text{Ana, Luis, Nieves} \} \}$.

### 2.3 Representación en Computadora de Conjuntos y Subconjuntos
En computación, los conjuntos no se guardan como texto libre iterativo para evitar desbordamiento de memoria ni tiempos de búsqueda excesivos ($O(n)$); se evalúan usando valores binarios basados en una Función Característica ($F_A$). Se define $F_A(x) = 1$ si $x \in A$, y 0 si $x \notin A$.
Sea el Universo de 6 estudiantes $U = \{ e_1, e_2, e_3, e_4, e_5, e_6 \}$, donde la estudiante Nieves es el elemento $e_2$.
- $A$ (Estudiantes que necesitan tutoría de Álgebra): `[1, 1, 1, 0, 0, 0]` (Nieves lo necesita).
- $B$ (Estudiantes que necesitan tutoría de Programación): `[0, 1, 0, 1, 1, 0]` (Nieves también lo necesita).

### 2.4 Operaciones Lógicas de Conjuntos (Compuertas a nivel de Bits)
- **Intersección ($A \cap B$)**: Elementos que pertenecen a $A$ y $B$ simultáneamente. Se aplica una instrucción de máquina AND bit a bit.
  - $A \text{ AND } B$: `[0, 1, 0, 0, 0, 0]` (Solo la estudiante Nieves, $e_2$, necesita ambas).
- **Unión ($A \cup B$)**: Elementos que pertenecen a $A$, a $B$, o a ambos. Se aplica un OR.
  - $A \text{ OR } B$: `[1, 1, 1, 1, 1, 0]`.
- **Diferencia Simétrica ($A \Delta B$)**: Pertenecen a $A$ o a $B$, pero NO a la intersección (no a ambos). Expresa una exclusividad. Se aplica un XOR.
  - $A \text{ XOR } B$: `[1, 0, 1, 1, 1, 0]` (Nieves es excluida porque necesita ambas).
- **Complemento Relativo / Resta ($A - B$)**: Elementos que están en $A$ pero no en $B$. Matemáticamente: $\{ x \in A \mid x \notin B \}$.
  - $A \text{ AND (NOT } B)$: `[1, 0, 1, 0, 0, 0]` (Los estudiantes $e_1$ y $e_3$ solo necesitan Álgebra).
- **Conjuntos Disjuntos**: Dos conjuntos que no tienen elementos en común ($X \cap Y = \emptyset$). En Vecta: Los tutores baneados ($X$) y los tutores activos en cartelera ($Y$). Para estos conjuntos, el principio de adición es simplemente $|X \cup Y| = |X| + |Y|$.

**Reflejo en la Plataforma**: En la página web de Vecta (pantalla ExploreView), cuando un usuario utiliza la barra de búsqueda seleccionando los filtros (Chips) "Álgebra" y "Programación", el motor de búsqueda en Firebase no hace un query literal, sino que mapea las funciones características y aplica un operador lógico (AND) sobre la base de datos NoSQL, devolviendo en milisegundos las tarjetas (Cards) de los usuarios que cumplen ambas condiciones.

```dart
import 'package:cloud_firestore/cloud_firestore.dart';

Future<List<DocumentSnapshot>> buscarTutoresPorInterseccion() async {
  final firestore = FirebaseFirestore.instance;
  
  // 1. Query inicial a la BD (Equivalente al Conjunto A: Álgebra)
  final querySnapshot = await firestore
      .collection('usuarios')
      .where('rol', isEqualTo: 'tutor')
      .where('materias', arrayContains: 'Álgebra') 
      .get();

  // 2. Operación Lógica AND (Intersección A ∩ B) a nivel de máquina
  // Filtramos los que también pertenecen al Conjunto B (Programación)
  final tutoresIntersectados = querySnapshot.docs.where((doc) {
    List<String> materias = List<String>.from(doc['materias'] ?? []);
    
    // F_A(x) AND F_B(x) == 1
    return materias.contains('Programación'); 
  }).toList();

  return tutoresIntersectados; // Retorna en milisegundos las tarjetas (Cards)
}
```

### 2.5 Principio de la Adición (Inclusión-Exclusión)
**Situación en el sistema**: Para la métrica precisa del Dashboard de Administración, es imperativo no contar dos veces los elementos que se repiten. La base de datos cuenta que 40 estudiantes solicitan tutorías de Matemáticas ($M$), 30 solicitan de Física ($F$) y la estudiante Nieves, junto a otros 14 estudiantes (15 en total), han solicitado ambas. ¿Cuántos estudiantes únicos existen en total en ambas categorías sin duplicar el conteo en la facturación del servidor?
Fórmula del principio de adición para 2 conjuntos no disjuntos: $|M \cup F| = |M| + |F| - |M \cap F|$
$|M \cup F| = 40 + 30 - 15 = \mathbf{55} \text{ estudiantes únicos}$
*(Nota de expansión teórica: Si el sistema agregara una tercera materia como Química ($Q$), la plataforma aplicaría la regla extendida: $|M \cup F \cup Q| = |M| + |F| + |Q| - |M \cap F| - |M \cap Q| - |F \cap Q| + |M \cap F \cap Q|$.)*

**Funcionamiento del Elemento Interactivo en la Web:**
En el módulo de *Filtros de Búsqueda*, se despliega un Diagrama de Venn visualizando la unión de dos conjuntos: Álgebra y Programación.
1. La interfaz proporciona un control deslizante interactivo que ajusta la magnitud de la **Intersección** ($|A \cap B|$), afectando directamente a los usuarios que pertenecen a ambas categorías (como Nieves).
2. A medida que se ajusta el slider, el sistema recalcula en tiempo real los "Usuarios Únicos Totales" y actualiza la tarjeta gráfica, demostrando la sustracción en vivo usando el Principio de Adición para no duplicar conteos en bases de datos reales.

```dart
int conteoUnicoEstudiantes(Set<String> estudiantesMatematicas, Set<String> estudiantesFisica) {
  // |M| y |F|
  int cardinalidadM = estudiantesMatematicas.length; // Ejemplo: 40
  int cardinalidadF = estudiantesFisica.length;      // Ejemplo: 30
  
  // Intersección: Estudiantes que están en ambos conjuntos (Ej: Nieves)
  int interseccion = estudiantesMatematicas.intersection(estudiantesFisica).length; // 15
  
  // Principio de Inclusión-Exclusión: |M U F| = |M| + |F| - |M ∩ F|
  int estudiantesUnicos = cardinalidadM + cardinalidadF - interseccion;
  
  return estudiantesUnicos; // Resultado: 55 estudiantes únicos
}
```

### 2.6 Aplicación Práctica: Arquitectura de Vecta - Conjuntos y Relaciones (Laboratorio 2)
En plataformas educativas con miles de perfiles, la base de datos necesita un marco delimitado de entidades válidas. Sin conjuntos definidos, se corre el riesgo de procesar referencias huérfanas, usuarios ficticios o tipos de datos inconsistentes.

#### A. Conjuntos Universales
Establecer estudiantes y tutores como conjuntos finitos ($A$ y $B$) define fronteras operativas claras. Esto permite aplicar validaciones estrictas en el backend, optimizar la indexación de colecciones en Firestore y calcular el tamaño máximo del espacio de conexiones.

- **Conjunto A (Estudiantes):** $A = \{ \text{Carlos, María, Juan} \}$
  - *Formalmente:* $A = \{ a_i \mid a_i \text{ es un estudiante registrado} \}$
- **Conjunto B (Tutores):** $B = \{ \text{Elena, Roberto} \}$
  - *Formalmente:* $B = \{ b_j \mid b_j \text{ es un tutor certificado} \}$

#### B. Relación de Suscripción (Estudiante sigue a Tutor)
Representa el vínculo de suscripción. En lugar de crear un campo dinámico de texto, modelamos las suscripciones como una relación matemática $R$ que es un subconjunto del Producto Cartesiano ($A \times B$). Esto restringe los pares posibles únicamente a combinaciones válidas y delimita el espacio muestral máximo de tamaño $|A| \times |B|$.

- **Definición Formal:** $R \subseteq A \times B$
  $R = \{ (a,b) \mid a \in A \land b \in B \land a \text{ sigue a } b \}$
- **Ejemplo Real:** Si Carlos y María siguen a Elena, y Juan sigue a Roberto:
  $R = \{ (\text{Carlos, Elena}), (\text{María, Elena}), (\text{Juan, Roberto}) \}$
- **Implementación en Firebase:** Se almacena físicamente dentro de la base de datos en el documento del estudiante en Firestore como el arreglo de IDs `listaDeTutoresSuscritos`, implementando el subconjunto en el esquema.

**Funcionamiento del Elemento Interactivo en la Web (Suscripciones Vecta):**
1. Se presentan dos listas separadas de botones representando el *Conjunto A (Estudiantes)* (Carlos, María, Juan) y el *Conjunto B (Tutores)* (Elena, Roberto).
2. El usuario debe seleccionar un estudiante del conjunto A e inmediatamente después un tutor del conjunto B. 
3. El sistema identifica esta secuencia, mapea los elementos como un par ordenado (estudiante, tutor), y lo inserta en la lista mostrada de la **Relación R**. De este modo, se enseña cómo un subconjunto válido se construye a partir del Producto Cartesiano original sin permitir combinaciones huérfanas. Un botón de "Limpiar" permite restablecer las selecciones.

---

## 3. TÉCNICAS DE CONTEO
Las técnicas de conteo nos permiten saber cuántas combinaciones u opciones distintas tiene el usuario a nivel de Interacción Humano-Computadora (HCI), y prever la carga de posibles variables en la arquitectura de la base de datos.

- **Principio Multiplicativo (Y)**: Se usa cuando la acción es secuencial, eventos que ocurren uno tras otro para componer un resultado (si la actividad consta de una serie de pasos). Un estudiante al registrarse en el formulario de la página debe elegir su rol, una facultad y una modalidad para su perfil. Hay 2 roles (Estudiante/Tutor), 6 Facultades UTP y 2 modalidades (Presencial/Virtual).
  Posibles combinaciones de perfiles creados: $2 \times 6 \times 2 = \mathbf{24} \text{ perfiles distintos en la BD}$.

**Funcionamiento del Elemento Interactivo en la Web:**
El módulo *Perfiles de Usuario* visualiza este principio de forma práctica:
1. Se exponen tres listas de opciones de selección múltiple correspondientes a Roles ($n_1$), Facultades ($n_2$) y Modalidades ($n_3$).
2. Al seleccionar múltiples ítems dentro de cada grupo, la interfaz detecta la cantidad de elementos seleccionados, multiplica los componentes de forma simultánea e imprime el resultado actualizado (total de combinaciones posibles en la base de datos). Esto ejemplifica cómo la arquitectura de la BD debe estar preparada para $n_1 \times n_2 \times n_3$ ramificaciones lógicas de configuración.

```dart
int calcularCombinacionesDePerfiles() {
  List<String> roles = ['Estudiante', 'Tutor']; 
  List<String> facultades = ['FISC', 'FIM', 'FIC', 'FIE', 'FIPI', 'FCyT']; 
  List<String> modalidades = ['Presencial', 'Virtual']; 
  
  // Principio Multiplicativo para eventos que componen un resultado final
  int totalPerfiles = roles.length * facultades.length * modalidades.length;
  
  return totalPerfiles; // 2 * 6 * 2 = 24 combinaciones en la BD
}
```

- **Principio Aditivo (O)**: Se usa cuando la actividad a desarrollar tiene alternativas para ser llevada a cabo (eventos excluyentes). Nuestra usuaria Nieves va a solicitar un cupo de tutoría; el sistema le indica que puede ser en la Facultad de Sistemas (4 materias disponibles) O en la Civil (3 materias disponibles).
  Total de opciones en la pantalla: $4 + 3 = \mathbf{7} \text{ opciones posibles de selección}$.
- **Combinaciones (nCr - El orden NO es importante)**: Es un arreglo matemático considerado como la selección de un conjunto de objetos. En la página, el tutor tiene un botón de "Crear Grupo de Estudio". De un salón virtual de 10 estudiantes inscritos, el tutor desea formar subgrupos de 4 personas. Seleccionar a {Nieves, Juan, Carlos, Ana} es idéntico a {Juan, Ana, Nieves, Carlos}, el grupo de estudio es el mismo.
  $10C4 = \frac{10!}{(10-4)!4!} = \frac{10!}{6!4!} = \mathbf{210} \text{ grupos de estudios posibles}$.
- **Permutaciones (nPr - El orden SÍ es importante)**: Es un método para organizar un conjunto de elementos en orden. Existen 5 tutores estelares disponibles, pero solo hay 3 salones de estudio físicos habilitados (Salón A con proyector, Salón B sin aire acondicionado, Salón C pequeño). Como cada salón tiene distintas herramientas y capacidades físicas, asignar a Nieves al Salón A no produce el mismo efecto logístico que asignarla al Salón B. Aquí la posición altera la experiencia de usuario.
  $5P3 = \frac{5!}{(5-3)!} = \frac{5!}{2!} = \mathbf{60} \text{ Formas de agendar salones en el sistema}$.

---

## 4. GRAFOS DIRIGIDOS Y RELACIONES

### 4.1 Producto Cartesiano o Conjunto Producto
Antes de establecer una relación en el sistema, definimos el Conjunto Producto $A \times B$, que genera pares ordenados. Es una lista de objetos en un orden prescrito donde $a$ aparece en primer término y $b$ en el segundo. 
Si $A = \{ \text{Nieves, Juan} \}$ (Usuarios) y $B = \{ \text{Álgebra, Física} \}$ (Materias), el producto cartesiano genera todas las combinaciones posibles de intereses en la plataforma: 
$A \times B = \{ (\text{Nieves, Álgebra}), (\text{Nieves, Física}), (\text{Juan, Álgebra}), (\text{Juan, Física}) \}$. 
Toda relación funcional en Vecta será un subconjunto de este gran producto cartesiano inicial.

### 4.2 Grafos y Dígrafos
Un dígrafo (grafo dirigido) representa gráficamente las relaciones de un conjunto $A$. Consiste en vértices (nodos que representan elementos como usuarios) y arcos o flechas dirigidas que conectan los vértices indicando la dirección de la relación. En Vecta, trazamos un arco desde el vértice $a_i$ al $a_j$ si el usuario $a_i$ le impartió una clase de la bolsa al usuario $a_j$.
- **Trayectoria en Relaciones (Path)**: Supóngase que $R$ es una relación. Una trayectoria de longitud $n$ en $R$ desde el vértice de Nieves hasta el vértice de Juan es una secuencia finita de arcos. En el ecosistema, esto define el nivel de "conexión", determinando cuántos pasos lógicos hay entre un conocimiento de un estudiante avanzado hasta un estudiante de nuevo ingreso.
- **Grados Internos y Externos del Vértice**: En el análisis del perfil del usuario (nodo), aplicamos la teoría estadística de grados:
  - **Grado Interno (Variable Dependiente)**: Es el número de arcos que terminan en el vértice. En la página web, representa la cantidad de clases que ha recibido un estudiante (nivel de demanda académica).
  - **Grado Externo (Variable Independiente)**: Es el número de arcos que salen del vértice. Representa cuántas clases ha impartido un tutor (fuerza externa). Este dato afecta externamente su métrica de calificación ("Estrellas") sin depender de las peticiones que él mismo haga al sistema.

### 4.3 Relación: "Es Tutor de"
Una relación $R$ de $A$ en $B$ es cualquier subconjunto de $A \times B$. Definimos la relación funcional central de la base de datos: $R = \{ (x,y) \mid x \text{ le impartió clase a } y \}$. 
Sean los usuarios activos $A = \{ 1\text{ (Ana)}, 2\text{ (Nieves)}, 3\text{ (Carlos)}, 4\text{ (Marta)} \}$. Supongamos que Ana le dio clase a Nieves y a Carlos, y Nieves le dio una clase a Carlos y a Marta. 
$R = \{ (1,2), (1,3), (2,3), (2,4) \}$
- **Irreflexiva**: Cualquier elemento $x$ de $A$ NO está en relación consigo mismo ($m_{ii} = 0$). Lógicamente, el sistema arroja error si un tutor intenta reservarse un cupo a sí mismo.
- **Antisimétrica**: Si $m_{ij} = 1 \Rightarrow m_{ji} = 0$. En el dígrafo, las flechas están en un solo sentido. Si Ana le da a Nieves, Nieves no le da clases a Ana de vuelta.
- **Transitiva**: En la arquitectura de Vecta, el análisis transitivo se usa en el sistema de recomendaciones ocultas de la BD.

**Funcionamiento del Elemento Interactivo en la Web:**
El módulo *Relaciones y Grafos ("Es Tutor de")* ofrece un entorno visual donde el usuario administra grafos dinámicos.
1. Se presenta un lienzo con los nodos de los usuarios: Ana, Nieves, Carlos, y Marta.
2. Al hacer clic en un nodo de origen (ej. Ana) y luego en uno destino (ej. Carlos), se dibuja automáticamente una flecha (arco SVG dirigido) representando que "Ana es Tutora de Carlos".
3. Simultáneamente, la interfaz revela una **Matriz de Relación ($M_R$)** en formato tabular lateral; al dibujar el arco, la intersección correspondiente (Fila A, Columna C) cambia de estado 0 a estado 1. Un botón "Limpiar Grafo" permite vaciar los arcos y restaurar la matriz al estado inactivo.

```dart
Future<bool> verificarRelacionEsTutorDe(String tutorId, String estudianteId) async {
  final firestore = FirebaseFirestore.instance;
  
  // Evaluamos el subconjunto del Producto Cartesiano A x B
  final queryRelacion = await firestore
      .collection('tutorias')
      .where('tutorId', isEqualTo: tutorId)
      .where('estudianteId', isEqualTo: estudianteId)
      .where('estado', isEqualTo: 'finalizada')
      .limit(1)
      .get();
  
  // Si existe al menos un arco (documento), m_ij = 1.
  // Cumple con la propiedad Antisimétrica y es Irreflexiva.
  return queryRelacion.docs.isNotEmpty;
}
```

### 4.4 Relación de Equivalencia
Para que una relación sea de equivalencia, debe ser ineludiblemente Reflexiva, Simétrica y Transitiva a la vez. En el registro de Vecta, definimos otra relación: $R_{eq} = \{ (x,y) \mid x \text{ estudia en la misma facultad que } y \}$.
- **Reflexiva**: Todo estudiante estudia en la misma facultad que él mismo ($x R x$).
- **Simétrica**: Si Carlos está en la FISC con Marta, Marta está en la FISC con Carlos.
- **Transitiva**: Si Ana está con Carlos, y Carlos con Nieves $\Rightarrow$ Ana está con Nieves.
- **Conclusión**: Conforma una Relación de Equivalencia, permitiendo particionar a los usuarios de la UTP en "Clases de Equivalencia".

**Reflejo en la Plataforma**: Cuando un usuario entra a "Búsqueda", la base de datos cruza estas matrices de adyacencia para pintar en el celular únicamente a los tutores relevantes, optimizando el ancho de banda.

```dart
bool pertenecenAlMismoGrafo(Map<String, dynamic> usuarioX, Map<String, dynamic> usuarioY) {
  // R_eq = {(x,y) | x estudia en la misma facultad que y}
  
  // Reflexiva: x R x (Misma facultad consigo mismo)
  // Simétrica: x R y => y R x (Si X va con Y, Y va con X)
  // Transitiva: x R y ∧ y R z => x R z
  return usuarioX['facultad'] == usuarioY['facultad']; 
}
```

### 4.5 Análisis de Flujo mediante Dígrafos (Laboratorio 2)
Visualizar las relaciones como grafos dirigidos (vértices representando usuarios y aristas dirigidas representando suscripciones o interacciones) nos permite analizar el comportamiento de la comunidad y la plataforma en el Dashboard Administrativo.

```text
      [ Carlos ] --------> ( Elena )
      [ María ]  --------/
      [ Juan ]   ------------> ( Roberto )
```

#### A. Grado Interno (Reputación)
- **Problema Práctico:** Diseñar un algoritmo transparente y en tiempo real para el ranking e indexación de los tutores más solicitados en la plataforma.
- **Por qué se aplica:** Evita valoraciones ambiguas de popularidad basándose estrictamente en el número de conexiones reales que apuntan al tutor, previniendo la manipulación artificial de visibilidad.
- **Sustento Matemático:** Se define el Grado Interno del nodo $v$, denotado como $deg^-(v)$, como la cardinalidad del conjunto de arcos incidentes que entran a $v$:
  $deg^-(v) = | \{ u \in V \mid (u,v) \in R \} |$
- **Ejemplo:** 
  - $deg^-(\text{Elena}) = 2$ (Carlos y María la siguen). 
  - $deg^-(\text{Roberto}) = 1$ (Juan la sigue).

#### B. Grado Externo (Actividad)
- **Problema Práctico:** Identificación del engagement del estudiante y detección de anomalías (spam o cuentas inactivas con cero suscripciones).
- **Por qué se aplica:** Permite enviar notificaciones automatizadas a usuarios de baja interacción e implementar alertas en Firestore para auditar cuentas sospechosas sin actividad.
- **Sustento Matemático:** Se define el Grado Externo del nodo $v$, denotado como $deg^+(v)$, como la cardinalidad del conjunto de arcos incidentes que salen de $v$:
  $deg^+(v) = | \{ u \in V \mid (v,u) \in R \} |$
- **Ejemplo:** $deg^+(\text{Carlos}) = 1$, $deg^+(\text{María}) = 1$, $deg^+(\text{Juan}) = 1$.

#### C. Teorema del Apretón de Manos (Dígrafos)
En cualquier dígrafo, la suma de los grados externos de todos los vértices es igual a la suma de sus grados internos, equivaliendo a la cardinalidad de la relación (total de arcos o conexiones $|R|$):
$\sum_{v \in V} deg^+(v) = \sum_{v \in V} deg^-(v) = |R|$

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

```text
  [ Estudiante (x) ] ----( f(x) )----> [ Solicitud Huérfana (y) ] ----( g(y) )----> [ Tutor Asignado (z) ]
          \________________________________ (g ∘ f)(x) ________________________________/
```

#### A. Función $f(x)$ - Registro de la Solicitud
- **Problema Práctico:** Crear una solicitud de tutoría en estado pendiente y guardarla de forma asíncrona en la base de datos sin congelar la interfaz del alumno.
- **Por qué se aplica:** Desvincula la creación del requerimiento de la búsqueda activa de un tutor en línea.
- **Matemática:** Sea $A$ el conjunto de estudiantes y $B$ el conjunto de solicitudes de tutoría huérfanas:
  $$f: A \to B, \quad f(\text{estudiante}) = \text{solicitud\_huérfana}$$
  $$f(x) = y$$

#### B. Función $g(y)$ - Reclamación del Tutor
- **Problema Práctico:** Asignar un tutor libre y certificado a la solicitud huérfana, garantizando exclusividad y evitando condiciones de carrera (cuando dos tutores reclaman la misma solicitud al mismo tiempo).
- **Por qué se aplica:** Se orquesta con transacciones atómicas a nivel de base de datos.
- **Matemática:** Sea $B$ el conjunto de solicitudes huérfanas y $C$ el conjunto de tutores:
  $$g: B \to C, \quad g(\text{solicitud\_huérfana}) = \text{tutor\_asignado}$$
  $$g(y) = z$$

#### C. Composición de Funciones: $(g \circ f)(x)$
- **Problema Práctico:** Mapear y controlar el flujo transaccional integral de punta a punta, desde el estudiante inicial hasta el tutor final asignado.
- **Por qué se aplica:** Modela formalmente la transacción atómica completa, coordinando la persistencia y gatillando eventos secundarios como notificaciones push.
- **Matemática:**
  $$(g \circ f): A \to C, \quad (g \circ f)(x) = g(f(x)) = z$$
  Es decir: $g(f(\text{Estudiante})) = \text{Tutor}$$

### 5.3 Representación Gráfica de Funciones
La teoría de funciones no está completa sin su representación gráfica, la cual en matemática discreta (donde los conjuntos son finitos y discretos) se visualiza comúnmente a través de **Diagramas Sagitales** y el **Plano Cartesiano Discreto**.
- **Diagramas Sagitales (Mapeo)**: Se dibujan dos óvalos, uno para el Dominio (Estudiantes) y otro para el Codominio (Tutores). Las flechas representan la regla de correspondencia $f(x)$. Si de cada estudiante sale exactamente una sola flecha hacia un tutor, comprobamos visualmente que es una función bien definida. Si de un estudiante salen dos flechas (intenta reservar con dos tutores al mismo tiempo para un mismo cupo), gráficamente se rompe la definición de función, y el sistema lanza una excepción.
- **Plano Cartesiano Discreto**: En funciones como la predicción de ausencias ($f(x) = 20x + 5$), donde $x$ son los meses, la gráfica no es una línea continua infinita real ($\mathbb{R}$), sino una dispersión de puntos exactos discretos ($\mathbb{Z}^+$). El eje X (Mes) y el eje Y (Cupos) se intersectan en coordenadas exactas como $(1, 25), (2, 45), (3, 65)$. Gráficamente, el Administrador observa la tendencia lineal del crecimiento de usuarios mes a mes en el Dashboard.

---

## 6. OPERACIONES BINARIAS Y ESTRUCTURAS ALGEBRAICAS
Para el sistema de tickets de quejas, Vecta cuenta con 4 Administradores de TI que rotan turnos ($A = \{0, 1, 2, 3\}$). Para evitar ciclos condicionales, el algoritmo de rotación utiliza una **Suma Modular en base 4** ($a \oplus b = (a + b) \pmod 4$).

- **Operación Cerrada**: Los resultados pertenecen obligatoriamente al conjunto original $A$.
- **Asociativa**: La agrupación no altera el flujo de delegación del ticket. $\rightarrow$ **SEMIGRUPO**.
- **Elemento Neutro**: Existe un SuperAdmin de valor $e=0$. $\rightarrow$ **MONOIDE**.
- **Elemento Inverso / Simétrico**: Cada administrador tiene su respaldo en el algoritmo (Ej: Nieves (2) es su propio respaldo $2+2 = 4 \pmod 4 = 0$). $\rightarrow$ **GRUPO**.
- **Propiedad Conmutativa**: Que Nieves (2) le pase un ticket al Admin (1) es idéntico a que el Admin (1) le pase un ticket a Nieves. $\rightarrow$ **GRUPO ABELIANO**.

**Funcionamiento del Elemento Interactivo en la Web:**
El módulo *Estructuras Algebraicas* ilustra gráficamente una rueda conformada por los 4 nodos administrativos: Admin 0, Admin 1, Nieves (2) y Admin 3.
1. La interfaz resalta en color intenso quién posee el **Turno Actual**.
2. Mediante un menú desplegable, el usuario selecciona el valor de la delegación del ticket ("Siguiente +1", "Respaldo +2" o "Anterior +3").
3. Al presionar "Rotar Turno", la interfaz ejecuta el cálculo lógico subyacente $\pmod 4$ e instantáneamente "salta" visualmente al administrador destinatario iluminándolo de color acento, exhibiendo cómo el Grupo Abeliano cíclico evita condicionales if/else y previene desbordamientos de arreglos lógicos fuera del límite.

```dart
/// Algoritmo Arquitectónico de Rotación (Suma Modular Base 4)
/// Evita múltiples sentencias if/else y OutOfBounds Exceptions.
int rotarTurnoAdministrador(int turnoActual, int delegacion) {
  // Conjunto A = {0, 1, 2, 3}
  // Operación Binaria: a ⊕ b = (a + b) (mod 4)
  
  // Propiedades matemáticas garantizadas por esta sola línea:
  // 1. Cerrada (Interna): Resultado siempre dentro del conjunto A
  // 2. Asociativa: (a + b) + c = a + (b + c)
  // 3. Neutro: e = 0
  // 4. Inverso: Cada administrador tiene su simétrico
  // 5. Conmutativa: a ⊕ b = b ⊕ a (Grupo Abeliano)
  
  return (turnoActual + delegacion) % 4;
}

// Ejemplo en el código real:
void delegarTicket() {
  int turnoNieves = 2;
  int delegarUnaPosicion = 1; // Le pasa el ticket al siguiente
  
  // El ticket se le asigna limpiamente al Admin 3 sin desbordar la memoria
  int nuevoEncargado = rotarTurnoAdministrador(turnoNieves, delegarUnaPosicion);
}
```

### 6.1 Representación Gráfica de Estructuras Algebraicas (Semigrupos y Grupos)
Las estructuras algebraicas pueden ser modeladas e interpretadas gráficamente para validar su comportamiento, principalmente a través de **Tablas de Cayley** y **Grafos de Cayley (Diagramas de Transición de Estados)**.

- **Tablas de Cayley**: Son grillas matriciales que demuestran todas las combinaciones posibles de una operación binaria (como nuestra suma modular $\oplus$). 
  Si trazamos una cuadrícula de $4 \times 4$ para los Administradores $\{0, 1, 2, 3\}$, la tabla de Cayley evidencia gráficamente que:
  - Todas las celdas resultantes contienen valores dentro de $\{0, 1, 2, 3\}$, demostrando visualmente que la **Operación es Cerrada** (Semigrupo).
  - La fila del "0" es idéntica a la cabecera, demostrando la existencia del **Elemento Neutro** (Monoide).
  - Cada fila y columna contiene el "0" exactamente una vez, probando visualmente la existencia del **Inverso** para cada administrador (Grupo).
  - La matriz generada es simétrica respecto a la diagonal principal, lo que gráficamente corrobora la **Conmutatividad** de la delegación (Grupo Abeliano).

- **Grafos de Cayley (Diagramas de Transición)**: Se representan como grafos dirigidos donde cada nodo es un elemento del grupo (un Administrador) y cada arista o flecha de color representa la aplicación de un generador (por ejemplo, $+1$ paso). 
  Para nuestro grupo rotativo $Z_4$, gráficamente es un ciclo cerrado: del Admin 0 sale una flecha al Admin 1, de 1 a 2, de 2 a 3, y de 3 nuevamente al Admin 0. Visualmente, un grafo perfectamente conexo y simétrico le demuestra al desarrollador que el flujo de delegación de tickets de soporte jamás llegará a un "nodo muerto" (dead end) ni dejará a un administrador aislado, confirmando la resiliencia del algoritmo y la solidez de la arquitectura en la nube.

---

## 7. CONCLUSIÓN GENERAL
El análisis matemático exhaustivo aplicado al código fuente y a los intrincados flujos de interacción de la "Plataforma de Tutorías Vecta UTP" revela categóricamente que la ingeniería de software moderna y las matemáticas discretas son ciencias indivisibles y codependientes. Durante el desarrollo de este trabajo semestral, se ha demostrado cómo teorías que inicialmente parecen abstractas se traducen en soluciones prácticas y palpables para problemas lógicos complejos dentro de los ecosistemas informáticos.

En primer lugar, desde el uso de Sucesiones pudimos modelar fórmulas recursivas y explícitas para el crecimiento predictivo del tráfico web en los servidores. Seguidamente, mediante la Teoría de Conjuntos, funciones características y compuertas lógicas binarias en la memoria (AND, OR, XOR), se logró resolver la Inclusión y Exclusión de conjuntos de estudiantes, permitiendo la creación de filtros de búsqueda avanzados sin duplicación de datos en la base NoSQL. A través de las Técnicas de Conteo pudimos calcular las combinaciones exactas de perfiles y las permutaciones precisas para asignar salones físicos considerando las variables de su entorno.

Por otro lado, la aplicación del Producto Cartesiano, los Grafos Dirigidos (con sus grados endógenos y exógenos) y las múltiples propiedades de las Matrices de Relaciones (Irreflexivas, Antisimétricas, de Equivalencia) fueron instrumentales para comprender las conexiones de poder y dependencia asimétricas entre tutores y alumnos. Esto abrió paso natural a la demostración de Composiciones de Funciones (inyectivas, suprayectivas e inversas), indispensables para encriptar los flujos de correo electrónico, modelar arquitecturas de perfiles identitarios y generar predicciones estadísticas exactas sobre las deserciones académicas de la UTP.

Finalmente, la impecable demostración de la rotación de roles de sistema estructurada mediante Grupos Abelianos de aritmética modular, comprueba de forma contundente que dotar a un software de estructuras algebraicas discretas es la clave maestra que elimina el código ineficiente, dota de elegancia a los algoritmos y provee robustez técnica corporativa. En conclusión, todo el núcleo funcional, predictivo y algorítmico aquí analizado obedece fielmente a las leyes, fórmulas y teoremas dictados a lo largo del semestre en la asignatura de Estructuras Discretas para la Computación, confirmando indudablemente que esta rama matemática no es solo teoría, sino el corazón vivo y la base arquitectónica fundamental del desarrollo de cualquier sistema tecnológico de alto rendimiento en la vida real.

*Adicionalmente, y como se observó durante el modelado del proyecto (Laboratorio 2), la implementación de la plataforma Vecta demuestra que el diseño de software de calidad no consiste simplemente en codificar interfaces visuales, sino en establecer estructuras lógicas robustas y coherentes. La aplicación de la teoría de Estructuras Discretas en Vecta resolvió de raíz cuatro pilares críticos:*

- **Consistencia y Modelado de Datos:** La rigurosidad de los conjuntos universales y el producto cartesiano previene referencias corruptas y datos huérfanos.
- **Seguridad y Reglas de Negocio:** La traducción de propiedades como la Irreflexividad y la Antisimetría a Firebase Security Rules blindó el sistema contra fraudes por auto-calificación y reportes de revancha.
- **Optimización del Performance:** La transitividad en el motor de prerrequisitos redujo operaciones de búsqueda complejas y costosas a comparaciones matriciales de costo temporal $O(1)$.
- **Orquestación de Procesos:** La composición de funciones sirvió como plano formal para diseñar Cloud Functions transaccionales atómicas, seguras y libres de condiciones de carrera.

*"Las estructuras discretas no son una abstracción teórica; son el plano arquitectónico"* — Cada concepto aportado en este laboratorio integral alimenta directamente a la visión y escalabilidad de la plataforma Vecta.

---

## 8. GUÍA DE LA WEB INTERACTIVA (COMPONENTES Y SU UTILIDAD)

Este repositorio contiene una aplicación web interactiva desarrollada para visualizar dinámicamente cómo cada concepto matemático se comporta en tiempo real. A continuación, se detalla la utilidad de cada sección interactiva de la página:

1. **Introducción (`intro.ts`)**
   - **Utilidad**: Establece el contexto del proyecto y da la bienvenida a la interfaz. Presenta de forma amigable cómo las matemáticas discretas son el núcleo del desarrollo arquitectónico de la plataforma Vecta UTP.

2. **Sucesiones y Conjuntos (`sucesiones.ts`)**
   - **Utilidad**: Mediante un *slider* (control deslizante), el usuario puede ajustar la "Fase de Despliegue" y ver cómo la fórmula recursiva/explícita calcula dinámicamente la capacidad requerida del servidor. Además, incluye un simulador de conjuntos (Diagrama de Venn) que recalcula en vivo los usuarios únicos usando el Principio de Inclusión-Exclusión al ajustar la magnitud de la intersección.

3. **Técnicas de Conteo (`conteo.ts`)**
   - **Utilidad**: Proporciona listas seleccionables de Roles, Facultades y Modalidades. Al seleccionar múltiples opciones, el sistema aplica el Principio Multiplicativo en tiempo real, demostrando a los ingenieros cuántas combinaciones únicas de perfiles deben soportar y renderizar las bases de datos.

4. **Grafos y Relaciones (`grafos.ts`)**
   - **Utilidad**: Despliega un lienzo de nodos interactivo. Al hacer clic entre los usuarios (nodos), se trazan arcos (grafos dirigidos) que representan tutorías impartidas. El sistema calcula en vivo los Grados Internos (reputación del tutor) y Externos (actividad del alumno), validando matemáticamente el Teorema del Apretón de Manos de forma visual.

5. **Representación Computacional (`representacion.ts`)**
   - **Utilidad**: Expone una tabla interactiva de control de asistencias que funciona como una Matriz de Relación ($M_R$) booleana. Muestra cómo, al marcar/desmarcar checkboxes (1s y 0s), el algoritmo calcula instantáneamente las penalizaciones ("strikes") en tiempo $O(1)$, evitando sobrecargar Firestore con búsquedas históricas iterativas.

6. **Funciones (`funciones.ts`)**
   - **Utilidad**: Visualiza el proceso de *Composición de Funciones*. El usuario ingresa un mes objetivo en el input, y el sistema canaliza el dato por un *pipeline* ($f(x)$ seguido de $g(y)$). Transforma el valor paso a paso hasta entregar la tasa de ausencias estimada, enseñando de forma evidente cómo un dato inicial viaja y muta a través de la lógica de negocio.

7. **Estructuras Algebraicas (`algebra.ts`)**
   - **Utilidad**: Presenta un simulador animado de turnos de soporte técnico modelado bajo un Grupo Abeliano (aritmética modular base 4). Al delegar un ticket, la interfaz recalcula el índice y salta reactivamente al siguiente encargado, probando en vivo cómo la matemática discreta previene errores del tipo `OutOfBounds` sin requerir condicionales lógicos (`if/else`) propensos a fallos.

8. **Conclusión (`conclusion.ts`)**
   - **Utilidad**: Encapsula el recorrido de la experiencia didáctica. Resalta que, más allá de la interfaz, el dominio sobre matrices booleanas, teoría de grafos y funciones es lo que verdaderamente permite construir sistemas corporativos escalables, seguros y eficientes en la vida real.
