# Arquitectura Lógica de Vecta UTP basada en Matemáticas Discretas

## 1. INTRODUCCIÓN
El presente trabajo final tiene como objetivo aplicar de manera rigurosa los conceptos de la matemática discreta a la arquitectura lógica de un sistema real: la Plataforma de Tutorías Vecta UTP. A través de este análisis, se evidenciará cómo la gestión de bases de datos, el emparejamiento de usuarios, el control de cupos y la seguridad criptográfica del sistema no son más que representaciones computacionales de Sucesiones, Teoría de Conjuntos, Relaciones, Grafos, Funciones, Técnicas de Conteo y Estructuras Algebraicas (Grupos Abelianos).

Todo el marco teórico será sustentado matemáticamente y se explicará su implementación directa tanto en la interfaz de la página web (Frontend en Flutter) como en los servidores en la nube (Backend en Firebase). La matemática discreta funciona como el puente que traduce la lógica teórica humana a instrucciones computacionales exactas; sin ella, el diseño de algoritmos eficientes, la prevención de redundancias en bases de datos y la estructuración de la seguridad perimetral de la plataforma Vecta serían imposibles de implementar a nivel corporativo.

*(Nota: Este repositorio incluye una interfaz interactiva web (`web_interactiva`) diseñada para visualizar dinámicamente cómo cada concepto matemático se comporta en tiempo real, conectando la teoría abstracta con componentes de UI.)*

### 1.1 Universo de Discurso (Conjuntos Base)
Para estandarizar el análisis matemático en Vecta, estableceremos desde el principio los siguientes conjuntos fundamentales sobre los cuales operará el sistema:
- **E (Estudiantes):** $E = \{x \mid x \text{ es un estudiante con cuenta activa}\}$
- **T (Tutores):** $T = \{y \mid y \text{ es un estudiante certificado para enseñar}\}$
- **M (Materias):** $M = \{z \mid z \text{ es una materia habilitada en la plataforma}\}$
- **S (Solicitudes):** $S = \{w \mid w \text{ es un ticket o petición de tutoría}\}$

---

## 2. SUCESIONES Y TEORÍA DE CONJUNTOS

### 2.1 Sucesiones en la Plataforma
- **Utilidad Práctica:** Modelar el crecimiento de usuarios a lo largo del tiempo nos permite predecir matemáticamente la carga futura del sistema. Esto es crítico para automatizar el aprovisionamiento de servidores (auto-scaling) y optimizar los costos de hosting (AWS/Firebase) antes de que ocurran caídas por sobrecarga.
- **Explicación Matemática:** 
  Una sucesión es una lista de objetos enumerados en orden creciente de los números naturales. En Vecta, definimos la expansión de capacidad de servidores por fase $k$ usando:
  - **Fórmula Explícita:** $S_k = 100 + 50(k - 1)$. Permite calcular el límite en cualquier fase sustituyendo $k$. Por ejemplo, en la Fase 2: $S_2 = 100 + 50(2 - 1) = 150$.
  - **Fórmula Recursiva:** $S_k = S_{k-1} + 50$ (con $S_1 = 100$). Cada nuevo hito de capacidad depende del límite previo.
- **Código de Ejemplo:**
```dart
// Fórmula Explícita: S_k = 100 + 50(k-1)
int calcularCapacidadFaseExplicita(int k) {
  return 100 + 50 * (k - 1);
}

// Fórmula Recursiva: S_k = S_(k-1) + 50
int calcularCapacidadFaseRecursiva(int k) {
  if (k <= 1) return 100; // Condición base (Fase 1)
  return calcularCapacidadFaseRecursiva(k - 1) + 50;
}
```
*(Nota: En la web interactiva, puedes simular este crecimiento lineal ajustando el slider de fases).*

### 2.2 Teoría de Conjuntos y Control de Accesos
- **Utilidad Práctica:** Tratar los roles de usuarios como conjuntos matemáticos (Estudiantes $E$, Tutores $T$) permite crear middlewares de seguridad infranqueables (Control de Acceso Basado en Roles - RBAC). Si un usuario intenta borrar una clase, el backend simplemente verifica si pertenece o no al conjunto correcto, evitando accesos no autorizados.
- **Explicación Matemática:** 
  Definimos $U$ como el conjunto Universal de todos los usuarios registrados. 
  - **Tres formas de definir conjuntos:** 
    - Verbal: El conjunto de Facultades en Vecta.
    - Comprensión: $F = \{x \mid x \text{ es una facultad}\}$
    - Extensión: $F = \{\text{FISC, FIM, FIC, FIE, FIPI, FCyT}\}$
  - **Subconjuntos ($\subset$):** El grupo de tutores ($T$) es un subconjunto directo de los estudiantes ($E$): $T \subset E \Longleftrightarrow \forall x (x \in T \Rightarrow x \in E)$.
  - **Representación Binaria:** Los conjuntos se evalúan computacionalmente usando la Función Característica: $F_A(x) = 1$ si $x \in A$, y $0$ si $x \notin A$.
- **Código de Ejemplo:**
```dart
bool tienePermisoDeTutor(String userId, Set<String> tutores) {
  // Verificación de pertenencia a un conjunto en tiempo O(1)
  // Función Característica: F_T(x) == 1
  if (tutores.contains(userId)) {
    return true; // x ∈ T
  }
  return false; // x ∉ T
}
```

### 2.3 Operaciones de Conjuntos y Principio de Adición
- **Utilidad Práctica:** Cuando cruzamos datos (Ej: Usuarios que buscan Álgebra y Programación), aplicar sumas simples daría resultados inflados en el Dashboard de Analíticas debido a las personas que buscan ambas. Operar conjuntos lógicamente y aplicar el Principio de Inclusión-Exclusión nos permite purgar la intersección y brindar reportes 100% reales de usuarios únicos.
- **Explicación Matemática:** 
  - **Intersección ($A \cap B$):** Usuarios que pertenecen a ambos conjuntos. A nivel binario es un `AND`.
  - **Unión ($A \cup B$):** Pertenecen a $A$, a $B$, o a ambos. A nivel binario es un `OR`.
  - **Diferencia Simétrica ($A \Delta B$):** Pertenecen a $A$ o $B$, pero NO a ambos. Expresa exclusividad (`XOR`).
  - **Diferencia ($A - B$):** Pertenecen a $A$ pero no a $B$.
  - **Principio de Adición:** Para conjuntos no disjuntos, la cardinalidad de la unión es $|A \cup B| = |A| + |B| - |A \cap B|$.
- **Código de Ejemplo:**
```dart
int conteoUnico(Set<String> estudiantesAlgebra, Set<String> estudiantesProg) {
  // |A| y |B|
  int cardinalidadA = estudiantesAlgebra.length; 
  int cardinalidadB = estudiantesProg.length;      
  
  // Intersección: Estudiantes que están en ambos conjuntos (A ∩ B)
  int interseccion = estudiantesAlgebra.intersection(estudiantesProg).length;
  
  // Principio de Inclusión-Exclusión: |A U B| = |A| + |B| - |A ∩ B|
  return cardinalidadA + cardinalidadB - interseccion;
}
```
*(Nota: Consulta los módulos interactivos de Conjuntos en la web para ver cómo estos cálculos funcionan en vivo).*

### 2.6 Aplicación Práctica: Arquitectura de Vecta - Conjuntos y Relaciones (Laboratorio 2)
En plataformas educativas con miles de perfiles, la base de datos necesita un marco delimitado de entidades válidas. Sin conjuntos definidos, se corre el riesgo de procesar referencias huérfanas, usuarios ficticios o tipos de datos inconsistentes.

#### A. Conjuntos Universales
Establecer estudiantes y tutores como conjuntos finitos ($A$ y $B$) define fronteras operativas claras. Esto permite aplicar validaciones estrictas en el backend, optimizar la indexación de colecciones en Firestore y calcular el tamaño máximo del espacio de conexiones.

- **Conjunto A (Estudiantes):** $A = \{ \text{Carlos, María, Juan} \}$
  - *Formalmente:* $A = \{ a_i \mid a_i \text{ es un estudiante registrado} \}$
- **Conjunto B (Tutores):** $B = \{ \text{Elena, Roberto} \}$
  - *Formalmente:* $B = \{ b_j \mid b_j \text{ es un tutor certificado} \}$
