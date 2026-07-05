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
