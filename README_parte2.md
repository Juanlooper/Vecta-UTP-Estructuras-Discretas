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
