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

### 3.1 Principio Multiplicativo (Y)
- **Utilidad Práctica:** Permite calcular de antemano el límite máximo de combinaciones de configuraciones (perfiles, filtros) que el sistema debe soportar, ayudando a dimensionar la base de datos y evitar desbordamientos de diseño en la Interfaz de Usuario (UI).
- **Explicación Matemática:** Se usa cuando eventos ocurren de forma secuencial. Un usuario al registrarse elige un rol ($n_1$), una facultad ($n_2$) y una modalidad ($n_3$). Hay 2 roles, 6 facultades UTP y 2 modalidades. 
  Total de configuraciones en la BD: $n_1 \times n_2 \times n_3 = 2 \times 6 \times 2 = \mathbf{24}$.
- **Código de Ejemplo:**
```dart
int calcularCombinacionesDePerfiles() {
  List<String> roles = ['Estudiante', 'Tutor']; 
  List<String> facultades = ['FISC', 'FIM', 'FIC', 'FIE', 'FIPI', 'FCyT']; 
  List<String> modalidades = ['Presencial', 'Virtual']; 
  
  // Principio Multiplicativo
  return roles.length * facultades.length * modalidades.length; // 24
}
```
*(Nota: El módulo "Perfiles de Usuario" en la web interactiva visualiza este principio multiplicando en tiempo real).*

### 3.2 Principio Aditivo y Combinatoria
- **Utilidad Práctica:** Optimiza la asignación de cupos y grupos al conocer la cantidad exacta de opciones excluyentes y agrupaciones posibles, fundamental para programar los algoritmos de emparejamiento (matchmaking).
- **Explicación Matemática:** 
  - **Principio Aditivo (O):** Eventos excluyentes. Si hay 4 opciones de Álgebra o 3 de Programación, el menú mostrará: $4 + 3 = \mathbf{7}$ opciones en total.
  - **Combinaciones ($nCr$):** El orden NO importa. Formar subgrupos de 4 personas a partir de un salón de 10: $10C4 = \frac{10!}{6!4!} = \mathbf{210}$ grupos posibles.
  - **Permutaciones ($nPr$):** El orden SÍ importa. Asignar 3 tutores a 3 aulas con distinta jerarquía (A, B, C): $3P3 = 3! = \mathbf{6}$.
- **Código de Ejemplo:**
```dart
int calcularOpcionesAditivas(List<String> listaAlgebra, List<String> listaProg) {
  // Principio Aditivo: El estudiante escoge uno O el otro
  return listaAlgebra.length + listaProg.length;
}
```

---

## 4. GRAFOS DIRIGIDOS Y RELACIONES

### 4.1 Análisis de Flujo mediante Dígrafos (Laboratorio 2)
- **Utilidad Práctica:** Visualizar las relaciones como grafos dirigidos nos permite analizar el comportamiento de la comunidad en el Dashboard Administrativo. Calcular el Grado Interno previene valoraciones ambiguas y manipulaciones artificiales en el ranking de tutores. Calcular el Grado Externo permite identificar el engagement y detectar cuentas inactivas o bots (spam).
- **Explicación Matemática:** 
  Un dígrafo consiste en vértices $V$ (usuarios) y arcos dirigidos (relaciones). 
  - **Grado Interno ($deg^-$):** Arcos que entran al vértice (Reputación/Demanda). $deg^-(v) = | \{ u \in V \mid (u,v) \in R \} |$.
  - **Grado Externo ($deg^+$):** Arcos que salen del vértice (Actividad). $deg^+(v) = | \{ u \in V \mid (v,u) \in R \} |$.
  - **Teorema del Apretón de Manos:** La suma de grados internos es igual a la suma de externos, e igual al total de arcos $|R|$: $\sum_{v \in V} deg^+(v) = \sum_{v \in V} deg^-(v) = |R|$.
- **Código de Ejemplo:**
```dart
int calcularGradoInterno(String tutorId, List<Map<String, dynamic>> relaciones) {
  // Equivalente a deg^-(v): Contar cuántos arcos apuntan a este tutor
  return relaciones.where((r) => r['destino'] == tutorId).length;
}
```
*(Nota: El módulo interactivo de "Grafo 'Es Tutor de'" en la web permite dibujar estas aristas y calcular la Matriz de Relación en tiempo real).*

### 4.2 Relaciones Fundamentales y sus Propiedades
- **Utilidad Práctica:** Las propiedades matemáticas definen el comportamiento de las reglas de negocio del software. Si una relación es antisimétrica, se evitan reportes vengativos. Si es transitiva, se pueden programar motores de prerrequisitos académicos automáticos sin preprogramar ("hardcodear") cada una de las conexiones.
- **Explicación Matemática:** 
  Sea $R$ una relación sobre un conjunto $A$:
  - **Irreflexiva:** $\forall x \in A, (x,x) \notin R$. Ningún nodo tiene lazos a sí mismo. (Ej. un tutor no puede reservarse a sí mismo).
  - **Antisimétrica:** Si $(x,y) \in R \implies (y,x) \notin R$. Las flechas van en un solo sentido.
  - **Transitiva:** $(x,y) \in R \land (y,z) \in R \implies (x,z) \in R$. Si A conecta con B, y B con C, entonces A conecta con C.
  - **Simétrica:** $(x,y) \in R \implies (y,x) \in R$. Canales bidireccionales de mensajería o chat.
  - **De Equivalencia:** Es reflexiva, simétrica y transitiva simultáneamente. Divide a los estudiantes en particiones disjuntas ("Clases de Equivalencia", como agrupaciones por Carrera).
- **Código de Ejemplo:**
```dart
bool esAntisimetrica(String estudianteA, String estudianteB, List<Map<String, dynamic>> reportes) {
  bool aReportoAB = reportes.any((r) => r['origen'] == estudianteA && r['destino'] == estudianteB);
  bool bReportoAA = reportes.any((r) => r['origen'] == estudianteB && r['destino'] == estudianteA);
  
  // Regla estricta: Si A reporta a B, B no puede reportar a A.
  return !(aReportoAB && bReportoAA); 
}
```
*(Nota: El carrusel interactivo "Propiedades de las Relaciones" en Vecta Web visualiza la diferencia gráfica y matricial de cada una de estas propiedades de forma didáctica).*
