export function renderSucesiones(): string {
  return `
    <section id="sucesiones" class="section">
      <h2 class="section-title">2. Sucesiones y Teoría de Conjuntos</h2>
      
      <!-- 2.1 Sucesiones -->
      <div class="glass-panel" style="margin-bottom: 2rem;">
        <h3>2.1 Sucesiones en la Plataforma</h3>
        
        <div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
          <strong style="color: #3b82f6;">Utilidad Práctica (Escalabilidad):</strong><br>
          <span style="color: var(--text-secondary); font-size: 0.9rem;">Modelar el crecimiento de usuarios a lo largo del tiempo nos permite predecir matemáticamente la carga futura del sistema. Esto es crítico para automatizar el aprovisionamiento de servidores (auto-scaling) y optimizar los costos de hosting (AWS/Firebase) antes de que ocurran caídas por sobrecarga.</span>
        </div>

        <div style="background: rgba(168, 85, 247, 0.1); border-left: 4px solid #a855f7; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
          <strong style="color: #a855f7;">Explicación Matemática:</strong><br>
          <span style="color: var(--text-secondary); font-size: 0.9rem;">
            Una sucesión es una lista de objetos enumerados en orden creciente. En Vecta, definimos la expansión de capacidad de servidores por fase <em>k</em> usando:
            <ul style="margin-top: 0.5rem; margin-bottom: 0; padding-left: 1.5rem;">
              <li><strong>Fórmula Explícita:</strong> S<sub>k</sub> = 100 + 50(k - 1)</li>
              <li><strong>Fórmula Recursiva:</strong> S<sub>k</sub> = S<sub>k-1</sub> + 50</li>
            </ul>
          </span>
        </div>

        <div style="background: #000; padding: 1rem; border-radius: 8px; font-family: monospace; color: var(--text-secondary); margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.1);">
          <span style="color: #64748b;">// Fórmula Explícita: S_k = 100 + 50(k-1)</span><br>
          <span style="color: #c678dd;">int</span> <span style="color: #61afef;">calcularCapacidadFaseExplicita</span>(<span style="color: #c678dd;">int</span> k) {<br>
          &nbsp;&nbsp;<span style="color: #c678dd;">return</span> <span style="color: #d19a66;">100</span> + <span style="color: #d19a66;">50</span> * (k - <span style="color: #d19a66;">1</span>);<br>
          }
        </div>
        
        <!-- Sucesiones Interactivo -->
        <div style="background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border-glass);">
          <h4 style="margin-bottom: 1rem;">Módulo Interactivo: Crecimiento de Servidores</h4>
          <label for="fase-slider" style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary);">Fase (k): <span id="fase-value" style="color: white; font-weight: bold;">1</span></label>
          <input type="range" id="fase-slider" min="1" max="10" value="1" style="width: 100%; margin-bottom: 1.5rem; accent-color: var(--accent-primary);">
          
          <div style="display: flex; justify-content: space-between; align-items: flex-end; height: 100px; border-bottom: 1px solid var(--border-glass); margin-bottom: 1rem;" id="bar-chart">
            <!-- Bars generated via JS -->
          </div>
          
          <div style="text-align: center; font-size: 1.25rem;">
            Capacidad Estimada: <strong class="text-gradient" id="capacidad-value">100</strong> Usuarios
          </div>
        </div>
      </div>

      <!-- 2.2 Teoría de Conjuntos -->
      <div class="glass-panel" style="margin-bottom: 2rem;">
        <h3>2.2 Teoría de Conjuntos y Control de Accesos</h3>
        
        <div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
          <strong style="color: #3b82f6;">Utilidad Práctica (Control de Accesos - RBAC):</strong><br>
          <span style="color: var(--text-secondary); font-size: 0.9rem;">Tratar los roles de usuarios como conjuntos matemáticos (Estudiantes E, Tutores T) permite crear middlewares de seguridad infranqueables. Si un usuario intenta borrar una clase, el backend simplemente verifica si pertenece o no al conjunto correcto, evitando accesos no autorizados.</span>
        </div>

        <div style="background: rgba(168, 85, 247, 0.1); border-left: 4px solid #a855f7; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
          <strong style="color: #a855f7;">Explicación Matemática:</strong><br>
          <span style="color: var(--text-secondary); font-size: 0.9rem;">
            Definimos U como el conjunto Universal de todos los usuarios registrados.
            <ul style="margin-top: 0.5rem; margin-bottom: 0.5rem; padding-left: 1.5rem;">
              <li><strong>Tres formas de definir conjuntos:</strong> 
                <ul style="padding-left: 1.5rem; margin-top: 0.25rem;">
                  <li><strong>Verbal:</strong> El conjunto de Facultades de la UTP en Vecta.</li>
                  <li><strong>Comprensión:</strong> F = {x | x es una facultad de la sede principal}</li>
                  <li><strong>Extensión:</strong> F = {FISC, FIM, FIC, FIE, FIPI, FCyT}</li>
                </ul>
              </li>
              <li><strong>Subconjuntos (⊂):</strong> El grupo de tutores (T) es subconjunto de usuarios totales (U). T ⊂ U</li>
              <li><strong>Representación Binaria:</strong> Evaluamos usando Función Característica F<sub>A</sub>(x) = 1 si x ∈ A, y 0 si x ∉ A.</li>
            </ul>
          </span>
        </div>

        <div style="background: #000; padding: 1rem; border-radius: 8px; font-family: monospace; color: var(--text-secondary); margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.1);">
          <span style="color: #c678dd;">bool</span> <span style="color: #61afef;">tienePermisoDeTutor</span>(<span style="color: #e5c07b;">String</span> userId, <span style="color: #e5c07b;">Set</span>&lt;<span style="color: #e5c07b;">String</span>&gt; tutores) {<br>
          &nbsp;&nbsp;<span style="color: #64748b;">// Función Característica: F_T(x) == 1</span><br>
          &nbsp;&nbsp;<span style="color: #c678dd;">if</span> (tutores.<span style="color: #56b6c2;">contains</span>(userId)) <span style="color: #c678dd;">return true</span>; <span style="color: #64748b;">// x ∈ T</span><br>
          &nbsp;&nbsp;<span style="color: #c678dd;">return false</span>; <span style="color: #64748b;">// x ∉ T</span><br>
          }
        </div>

        <!-- 2.3 Operaciones de Conjuntos -->
        <h3 style="margin-top: 3rem;">2.3 Operaciones de Conjuntos y Principio de Adición</h3>
        
        <div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
          <strong style="color: #3b82f6;">Utilidad Práctica (Analíticas Exactas):</strong><br>
          <span style="color: var(--text-secondary); font-size: 0.9rem;">Cuando cruzamos datos (Ej: Usuarios que buscan Álgebra y Programación), aplicar sumas simples daría resultados inflados en el Dashboard debido a las personas que buscan ambas. Operar conjuntos lógicamente y aplicar el Principio de Inclusión-Exclusión nos permite purgar la intersección y brindar reportes 100% reales de usuarios únicos.</span>
        </div>

        <div style="background: rgba(168, 85, 247, 0.1); border-left: 4px solid #a855f7; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
          <strong style="color: #a855f7;">Explicación Matemática:</strong><br>
          <span style="color: var(--text-secondary); font-size: 0.9rem;">
            <ul style="margin-top: 0.5rem; margin-bottom: 0; padding-left: 1.5rem;">
              <li><strong>Intersección (A ∩ B):</strong> Usuarios en ambos conjuntos. (AND)</li>
              <li><strong>Unión (A ∪ B):</strong> Pertenecen a A, B o a ambos. (OR)</li>
              <li><strong>Diferencia Simétrica (A Δ B):</strong> Exclusividad (XOR). Pertenecen a A o B, pero no a ambos.</li>
              <li><strong>Diferencia (A - B):</strong> Pertenecen a A pero no a B.</li>
              <li><strong>Principio de Adición:</strong> |A ∪ B| = |A| + |B| - |A ∩ B|</li>
            </ul>
          </span>
        </div>

        <div style="background: #000; padding: 1rem; border-radius: 8px; font-family: monospace; color: var(--text-secondary); margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.1);">
          <span style="color: #c678dd;">int</span> <span style="color: #61afef;">conteoUnico</span>(<span style="color: #e5c07b;">Set</span>&lt;<span style="color: #e5c07b;">String</span>&gt; alg, <span style="color: #e5c07b;">Set</span>&lt;<span style="color: #e5c07b;">String</span>&gt; prog) {<br>
          &nbsp;&nbsp;<span style="color: #c678dd;">int</span> inter = alg.<span style="color: #56b6c2;">intersection</span>(prog).<span style="color: #e5c07b;">length</span>;<br>
          &nbsp;&nbsp;<span style="color: #c678dd;">return</span> alg.<span style="color: #e5c07b;">length</span> + prog.<span style="color: #e5c07b;">length</span> - inter;<br>
          }
        </div>
        
        <!-- Inclusión/Exclusión Interactivo -->
        <div style="background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border-glass);">
          <h4 style="margin-bottom: 1rem;">Módulo Interactivo: Filtros de Búsqueda</h4>
          <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 250px;">
              <label for="interseccion-slider" style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary);">Estudiantes en Ambas (Intersección A ∩ B): <span id="inter-value" style="color: white; font-weight: bold;">15</span></label>
              <input type="range" id="interseccion-slider" min="0" max="30" value="15" style="width: 100%; margin-bottom: 1rem; accent-color: var(--accent-secondary);">
              
              <div style="color: var(--text-secondary); font-family: monospace; background: #000; padding: 1rem; border-radius: 8px;">
                const cardinalidadM = 40; <br>
                const cardinalidadF = 30; <br>
                const interseccion = <span id="code-inter-value">15</span>; <br><br>
                // |M ∪ F| = |M| + |F| - |M ∩ F|<br>
                const usuariosUnicos = 40 + 30 - interseccion;
              </div>
            </div>
            <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; min-width: 250px;">
              <div style="font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 0.5rem;">Usuarios Únicos Totales</div>
              <div style="font-size: 3.5rem; font-weight: 700;" class="text-gradient" id="unicos-value">55</div>
              <div style="margin-top: 1rem; display: flex; position: relative; width: 200px; height: 100px; justify-content: center;">
                <div style="position: absolute; left: 20px; width: 100px; height: 100px; border-radius: 50%; background: rgba(139, 92, 246, 0.4); mix-blend-mode: screen;"></div>
                <div style="position: absolute; right: 20px; width: 100px; height: 100px; border-radius: 50%; background: rgba(6, 182, 212, 0.4); mix-blend-mode: screen;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Operaciones de Conjuntos Interactivo -->
        <div style="background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border-glass); margin-bottom: 1.5rem; margin-top: 1.5rem;">
          <h4 style="margin-bottom: 1rem;">Módulo Interactivo: Operaciones de Conjuntos</h4>
          <p style="color: var(--text-secondary); margin-bottom: 1rem; font-size: 0.9rem;">
            Sean dos conjuntos de estudiantes según la materia que necesitan.
            <br>A (Álgebra) = {Carlos, Ana, Luis, Nieves}
            <br>B (Programación) = {Luis, Nieves, Pedro, Maria}
          </p>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
            <button class="btn btn-outline btn-operacion" data-op="union">Unión (A ∪ B)</button>
            <button class="btn btn-outline btn-operacion" data-op="interseccion">Intersección (A ∩ B)</button>
            <button class="btn btn-outline btn-operacion" data-op="diferencia">Diferencia (A - B)</button>
            <button class="btn btn-outline btn-operacion" data-op="diferencia_simetrica">Dif. Simétrica (A Δ B)</button>
          </div>
          <div style="margin-bottom: 0.5rem; color: white;">Resultado de la Operación:</div>
          <div id="operacion-resultado" style="font-family: monospace; background: #000; padding: 1rem; border-radius: 8px; color: var(--accent-primary); min-height: 50px; display: flex; align-items: center; font-size: 1.1rem;">
            Seleccione una operación...
          </div>
          <p id="operacion-explicacion" style="color: var(--text-secondary); margin-top: 1rem; font-size: 0.9rem; min-height: 40px;"></p>
        </div>

      </div>

        <!-- 2.4 Relaciones -->
        <div class="glass-panel">
          <h3>2.4 Relaciones y Producto Cartesiano</h3>
          
          <div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
            <strong style="color: #3b82f6;">Utilidad Práctica (Bases de Datos Many-to-Many):</strong><br>
            <span style="color: var(--text-secondary); font-size: 0.9rem;">El producto cartesiano es la base teórica de las tablas intermedias (Pivot Tables) en bases de datos relacionales. Al tratar la relación Tutor-Estudiante como pares ordenados (EstudianteX, TutorY), logramos que un tutor tenga múltiples alumnos, y un alumno, múltiples tutores, sin duplicar datos ni corromper la integridad referencial.</span>
          </div>

          <div style="background: rgba(168, 85, 247, 0.1); border-left: 4px solid #a855f7; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
            <strong style="color: #a855f7;">Explicación Matemática:</strong><br>
            <span style="color: var(--text-secondary); font-size: 0.9rem;">
              En lugar de crear campos estáticos, modelamos las suscripciones como una relación matemática R que es un subconjunto del Producto Cartesiano (A × B). Si A tiene 3 elementos y B tiene 2 elementos, el producto cartesiano genera 3×2=6 posibles relaciones. R contendrá únicamente las conexiones activas.
            </span>
          </div>

          <div style="background: #000; padding: 1rem; border-radius: 8px; font-family: monospace; color: var(--text-secondary); margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.1);">
            <span style="color: #c678dd;">void</span> <span style="color: #61afef;">crearSuscripcion</span>(<span style="color: #e5c07b;">String</span> idEstudiante, <span style="color: #e5c07b;">String</span> idTutor) {<br>
            &nbsp;&nbsp;<span style="color: #64748b;">// Inserta en tabla intermedia el par ordenado (a, b) ∈ R</span><br>
            &nbsp;&nbsp;db.<span style="color: #56b6c2;">collection</span>(<span style="color: #98c379;">'suscripciones'</span>).<span style="color: #56b6c2;">add</span>({<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #98c379;">'estudiante'</span>: idEstudiante,<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #98c379;">'tutor'</span>: idTutor<br>
            &nbsp;&nbsp;});<br>
            }
          </div>

        <div style="background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border-glass);">
          <h4 style="margin-bottom: 1rem;">Módulo Interactivo: Suscripciones Vecta (Producto Cartesiano)</h4>
          <div style="display: flex; gap: 2rem; margin-bottom: 1rem;">
            <div style="flex: 1;">
              <div style="margin-bottom: 0.5rem; color: var(--accent-primary); font-weight: bold;">Conjunto A (Estudiantes)</div>
              <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;" id="conjunto-a">
                <button class="btn btn-outline btn-estudiante" data-val="Carlos">Carlos</button>
                <button class="btn btn-outline btn-estudiante" data-val="María">María</button>
                <button class="btn btn-outline btn-estudiante" data-val="Juan">Juan</button>
              </div>
            </div>
            <div style="flex: 1;">
              <div style="margin-bottom: 0.5rem; color: var(--accent-secondary); font-weight: bold;">Conjunto B (Tutores)</div>
              <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;" id="conjunto-b">
                <button class="btn btn-outline btn-tutor" data-val="Elena">Elena</button>
                <button class="btn btn-outline btn-tutor" data-val="Roberto">Roberto</button>
              </div>
            </div>
          </div>
          
          <div style="margin-top: 1.5rem;">
            <div style="margin-bottom: 0.5rem; color: white;">Relación R ⊆ A × B:</div>
            <div id="relacion-resultado" style="font-family: monospace; background: #000; padding: 1rem; border-radius: 8px; color: var(--text-secondary); min-height: 50px; display: flex; align-items: center;">
              R = { }
            </div>
            <button class="btn btn-outline" id="btn-limpiar-r" style="margin-top: 1rem; padding: 0.5rem 1rem; font-size: 0.8rem;">Limpiar Relación</button>
          </div>
        </div>

      </div>
    </section>
  `;
}

export function initSucesionesLogic() {
  // Sucesiones logic
  const faseSlider = document.getElementById('fase-slider') as HTMLInputElement;
  const faseValue = document.getElementById('fase-value')!;
  const capacidadValue = document.getElementById('capacidad-value')!;
  const barChart = document.getElementById('bar-chart')!;

  const renderBars = (k: number) => {
    barChart.innerHTML = '';
    for(let i=1; i<=10; i++) {
      const height = (100 + 50 * (i - 1)) / 600 * 100; // max is 550
      const isActive = i <= k;
      const bg = isActive ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)';
      barChart.innerHTML += `<div style="width: 8%; height: ${height}%; background: ${bg}; border-radius: 4px 4px 0 0; transition: all 0.3s;"></div>`;
    }
  };

  faseSlider.addEventListener('input', (e) => {
    const k = parseInt((e.target as HTMLInputElement).value);
    faseValue.innerText = k.toString();
    capacidadValue.innerText = (100 + 50 * (k - 1)).toString();
    renderBars(k);
  });
  renderBars(1); // init

  // Inclusión-Exclusión logic
  const interSlider = document.getElementById('interseccion-slider') as HTMLInputElement;
  const interValue = document.getElementById('inter-value')!;
  const codeInterValue = document.getElementById('code-inter-value')!;
  const unicosValue = document.getElementById('unicos-value')!;

  interSlider.addEventListener('input', (e) => {
    const i = parseInt((e.target as HTMLInputElement).value);
    interValue.innerText = i.toString();
    codeInterValue.innerText = i.toString();
    unicosValue.innerText = (40 + 30 - i).toString();
  });

  // Operaciones de Conjuntos logic
  const setA = new Set(['Carlos', 'Ana', 'Luis', 'Nieves']);
  const setB = new Set(['Luis', 'Nieves', 'Pedro', 'Maria']);
  const btnOperaciones = document.querySelectorAll('.btn-operacion');
  const operacionRes = document.getElementById('operacion-resultado')!;
  const operacionExp = document.getElementById('operacion-explicacion')!;

  btnOperaciones.forEach(btn => {
    btn.addEventListener('click', (e) => {
      btnOperaciones.forEach(b => (b as HTMLElement).style.background = 'transparent');
      const target = e.target as HTMLElement;
      target.style.background = 'rgba(59, 130, 246, 0.2)';

      const op = target.getAttribute('data-op');
      let resultArr: string[] = [];
      let explicacion = "";

      if (op === 'union') {
        const union = new Set([...setA, ...setB]);
        resultArr = Array.from(union);
        explicacion = "La Unión (A ∪ B) contiene a los estudiantes que necesitan tutoría en Álgebra, en Programación o en ambas materias. Es decir, todos los estudiantes involucrados sin repetir nombres.";
      } else if (op === 'interseccion') {
        const inter = new Set([...setA].filter(x => setB.has(x)));
        resultArr = Array.from(inter);
        explicacion = "La Intersección (A ∩ B) contiene únicamente a los estudiantes que necesitan tutoría en ambas materias simultáneamente.";
      } else if (op === 'diferencia') {
        const dif = new Set([...setA].filter(x => !setB.has(x)));
        resultArr = Array.from(dif);
        explicacion = "La Diferencia o Complemento Relativo (A - B) contiene a los estudiantes que necesitan Álgebra, pero excluye a aquellos que también necesitan Programación.";
      } else if (op === 'diferencia_simetrica') {
        const difA = [...setA].filter(x => !setB.has(x));
        const difB = [...setB].filter(x => !setA.has(x));
        const sim = new Set([...difA, ...difB]);
        resultArr = Array.from(sim);
        explicacion = "La Diferencia Simétrica (A Δ B) contiene a los estudiantes que necesitan Álgebra o Programación de manera exclusiva, descartando a los que necesitan ambas.";
      }

      operacionRes.innerHTML = `{ ${resultArr.join(', ')} }`;
      operacionExp.innerText = explicacion;
    });
  });

  // Relaciones logic
  let selectedA: string | null = null;
  let relacionList: string[] = [];
  const btnEstudiantes = document.querySelectorAll('.btn-estudiante');
  const btnTutores = document.querySelectorAll('.btn-tutor');
  const relacionRes = document.getElementById('relacion-resultado')!;
  const btnLimpiar = document.getElementById('btn-limpiar-r')!;

  const renderR = () => {
    if(relacionList.length === 0) {
      relacionRes.innerText = "R = { }";
    } else {
      relacionRes.innerHTML = `R = { ${relacionList.map(pair => `<span style="color: var(--accent-primary);">(${pair})</span>`).join(', ')} }`;
    }
  };

  btnEstudiantes.forEach(btn => {
    btn.addEventListener('click', () => {
      btnEstudiantes.forEach(b => (b as HTMLElement).style.background = 'transparent');
      (btn as HTMLElement).style.background = 'rgba(139, 92, 246, 0.2)';
      selectedA = btn.getAttribute('data-val');
    });
  });

  btnTutores.forEach(btn => {
    btn.addEventListener('click', () => {
      if(!selectedA) {
        alert("Selecciona primero un estudiante del Conjunto A");
        return;
      }
      const selectedB = btn.getAttribute('data-val');
      const pair = `${selectedA}, ${selectedB}`;
      if(!relacionList.includes(pair)) {
        relacionList.push(pair);
        renderR();
      }
      // reset A selection visually
      selectedA = null;
      btnEstudiantes.forEach(b => (b as HTMLElement).style.background = 'transparent');
    });
  });

  btnLimpiar.addEventListener('click', () => {
    relacionList = [];
    selectedA = null;
    btnEstudiantes.forEach(b => (b as HTMLElement).style.background = 'transparent');
    renderR();
  });
}
