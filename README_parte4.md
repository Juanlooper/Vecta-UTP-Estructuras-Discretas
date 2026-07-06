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

1. **Introducción (`intro.ts`)**
   - **Utilidad**: Establece el contexto del proyecto y da la bienvenida a la interfaz. Presenta de forma amigable cómo las matemáticas discretas son el núcleo del desarrollo arquitectónico de la plataforma Vecta UTP.
   - **Explicación Matemática**: Se expone la notación de los conjuntos base ($E, T, M, S$) mediante las tres formas de definición (verbal, extensión, comprensión).
   - **Código de Ejemplo**:
```typescript
const E = "Conjunto de Estudiantes";
const T = ["Elena", "Roberto"]; // Extensión
```

2. **Sucesiones y Conjuntos (`sucesiones.ts`)**
   - **Utilidad**: Mediante un *slider* (control deslizante), el usuario puede ajustar la "Fase de Despliegue" y ver cómo la fórmula recursiva/explícita calcula dinámicamente la capacidad requerida del servidor.
   - **Explicación Matemática**: Representa la progresión $S_k = S_{k-1} + 50$. Muestra el diagrama de Venn aplicando el principio de inclusión-exclusión: $|A \cup B| = |A| + |B| - |A \cap B|$.
   - **Código de Ejemplo**:
```typescript
const capacidadFase = 100 + 50 * (k - 1);
const union = setA.size + setB.size - interseccion;
```

3. **Técnicas de Conteo (`conteo.ts`)**
   - **Utilidad**: Proporciona listas seleccionables de Roles, Facultades y Modalidades. Demuestra a los ingenieros cuántas combinaciones únicas de perfiles deben soportar las bases de datos.
   - **Explicación Matemática**: Aplica el Principio Multiplicativo ($n_1 \times n_2 \times n_3$) para eventos secuenciales y dependientes.
   - **Código de Ejemplo**:
```typescript
const totalCombinaciones = roles.length * facultades.length * modalidades.length;
```

4. **Grafos y Relaciones (`grafos.ts`)**
   - **Utilidad**: Despliega un lienzo de nodos interactivo. Al hacer clic entre los usuarios (nodos), se trazan arcos (grafos dirigidos) que representan tutorías impartidas. 
   - **Explicación Matemática**: Valida el Teorema del Apretón de Manos de grafos dirigidos sumando $deg^+(v)$ y $deg^-(v)$, probando que $\sum deg^+ = \sum deg^- = |R|$.
   - **Código de Ejemplo**:
```typescript
const sumOut = nodes.reduce((acc, curr) => acc + curr.degOut, 0);
const sumIn = nodes.reduce((acc, curr) => acc + curr.degIn, 0);
```

5. **Representación Computacional (`representacion.ts`)**
   - **Utilidad**: Expone una tabla interactiva de control de asistencias que funciona como una Matriz de Relación ($M_R$) booleana, calculando instantáneamente penalizaciones sin bases de datos pesadas.
   - **Explicación Matemática**: Si $M_{ij} = 0$, el alumno $i$ faltó a la clase $j$. Sumatoria de faltas por fila.
   - **Código de Ejemplo**:
```typescript
const faltasAlumno = fila.filter(asistencia => asistencia === 0).length;
```

6. **Funciones (`funciones.ts`)**
   - **Utilidad**: Visualiza el proceso de *Composición de Funciones*. El usuario ingresa un mes objetivo en el input, y el sistema canaliza el dato por un *pipeline* ($f(x)$ seguido de $g(y)$).
   - **Explicación Matemática**: Evalúa $(g \circ f)(x) = g(f(x))$, canalizando matemáticamente la variable de tiempo a predicción de ausencias.
   - **Código de Ejemplo**:
```typescript
const f_x = (x: number) => 20 * x + 5;
const g_y = (y: number) => y / 4;
const prediccion = g_y(f_x(mes));
```

7. **Estructuras Algebraicas (`algebra.ts`)**
   - **Utilidad**: Presenta un simulador animado de turnos de soporte técnico modelado bajo un Grupo Abeliano (aritmética modular base 4).
   - **Explicación Matemática**: El ciclo nunca desborda al operar dentro del monoide $Z_4$ con la función $(turno + 1) \bmod 4$.
   - **Código de Ejemplo**:
```typescript
let turnoAdmin = 0;
turnoAdmin = (turnoAdmin + 1) % 4; // Asegura rotación 0,1,2,3
```

8. **Prototipo Integrado (`prototype.ts`)**
   - **Utilidad**: Demuestra la integración de la lógica en una interfaz funcional tipo aplicación con estado persistente interconectado.
   - **Explicación Matemática**: Unifica Grafos (suscripciones), Sucesiones (crecimiento de XP) y Operaciones de Conjuntos (filtros $A \cap B$) en un solo ecosistema reactivo.
   - **Código de Ejemplo**:
```typescript
if (!activeTutors.find(t => t.name === tName)) {
  activeTutors.push({ id, name, subject }); // Crea arco en el Grafo
  xp += 50; // Avanza sucesión
}
```
