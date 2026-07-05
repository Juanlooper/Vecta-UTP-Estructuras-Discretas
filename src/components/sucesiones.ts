export function renderSucesiones(): string {
  return `
    <section id="sucesiones" class="section">
      <h2 class="section-title">2. Sucesiones y Teoría de Conjuntos</h2>
      
      <!-- 2.1 Sucesiones -->
      <div class="glass-panel" style="margin-bottom: 2rem;">
        <h3>2.1 Sucesiones en la Plataforma</h3>
        <p style="color: var(--text-secondary); margin-bottom: 1rem;">
          Matemáticamente, una sucesión es una lista de objetos enumerados en orden creciente. En Vecta, el sistema asigna un límite de capacidad a los servidores a medida que avanzan los meses.
        </p>
        <ul style="color: var(--text-secondary); margin-bottom: 1.5rem; padding-left: 1.5rem;">
          <li><strong>Fórmula Explícita:</strong> S<sub>k</sub> = 100 + 50(k - 1)</li>
          <li><strong>Fórmula Recursiva:</strong> S<sub>k</sub> = S<sub>k-1</sub> + 50</li>
        </ul>
        
        <div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
          <strong style="color: #3b82f6;">Utilidad en Vecta (Escalabilidad):</strong><br>
          <span style="color: var(--text-secondary); font-size: 0.9rem;">Modelar el crecimiento de usuarios como una sucesión nos permite predecir matemáticamente la carga futura del sistema. Esto es crítico para automatizar el aprovisionamiento de servidores (auto-scaling) y optimizar los costos de hosting (AWS/Firebase) antes de que ocurran caídas por sobrecarga.</span>
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
        <h3>2.2 y 2.3 Teoría de Conjuntos</h3>
        <p style="color: var(--text-secondary); margin-bottom: 1rem;">
          Segmentamos a los usuarios en colecciones que actúan como conjuntos.
        </p>
        <ul style="color: var(--text-secondary); margin-bottom: 1.5rem; padding-left: 1.5rem;">
          <li><strong>Universal (U):</strong> Todos los usuarios registrados. U = {x | x es un usuario autenticado}</li>
          <li><strong>Subconjuntos (⊂):</strong> El grupo de tutores (T) es subconjunto de usuarios totales (U). T ⊂ U</li>
          <li><strong>Representación Binaria:</strong> Evaluamos usando Función Característica F<sub>A</sub>(x) = 1 si x ∈ A, y 0 si x ∉ A.</li>
        </ul>

        <div style="background: rgba(168, 85, 247, 0.1); border-left: 4px solid #a855f7; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
          <strong style="color: #a855f7;">Utilidad en Vecta (Control de Accesos - RBAC):</strong><br>
          <span style="color: var(--text-secondary); font-size: 0.9rem;">Tratar los roles de usuarios como conjuntos matemáticos (Estudiantes, Tutores, Administradores) permite crear middlewares de seguridad infranqueables. Si un usuario intenta borrar una clase, el backend solo verifica: <code>if (x ∉ Administradores) return 403 Forbidden</code>, evitando accesos no autorizados mediante la pertenencia a conjuntos.</span>
        </div>

        <!-- 2.4 y 2.5 Inclusión Exclusión -->
        <h4 style="margin-top: 2rem; margin-bottom: 1rem;">Operaciones Lógicas y Principio de Adición</h4>
        <p style="color: var(--text-secondary); margin-bottom: 1rem;">
          Para la métrica precisa del Dashboard, es imperativo no contar dos veces los elementos que se repiten.
          |A ∪ B| = |A| + |B| - |A ∩ B|
        </p>

        <div style="background: rgba(16, 185, 129, 0.1); border-left: 4px solid #10b981; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
          <strong style="color: #10b981;">Utilidad en Vecta (Analíticas Exactas):</strong><br>
          <span style="color: var(--text-secondary); font-size: 0.9rem;">Cuando cruzamos datos (Ej: Usuarios activos en Móvil y Usuarios activos en Web), la suma simple daría resultados inflados debido a quienes usan ambas plataformas. La inclusión/exclusión nos permite purgar la intersección para brindar al administrador reportes estadísticos 100% reales de usuarios únicos.</span>
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
      </div>

        <!-- 2.6 Relaciones -->
        <div class="glass-panel">
          <h3>2.6 Arquitectura de Vecta - Conjuntos y Relaciones</h3>
          <p style="color: var(--text-secondary); margin-bottom: 1rem;">
            En lugar de crear un campo dinámico de texto, modelamos las suscripciones como una relación matemática R que es un subconjunto del Producto Cartesiano (A × B).
          </p>
          
          <div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
            <strong style="color: #f59e0b;">Utilidad en Vecta (Modelado de Bases de Datos Many-to-Many):</strong><br>
            <span style="color: var(--text-secondary); font-size: 0.9rem;">El producto cartesiano es la base teórica de las tablas intermedias (Pivot Tables) en SQL o las colecciones sub-anidadas en NoSQL. Al tratar la relación Tutor-Estudiante como pares ordenados (EstudianteX, TutorY), logramos que un tutor tenga múltiples alumnos, y un alumno, múltiples tutores, sin duplicar datos ni corromper la integridad referencial.</span>
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
