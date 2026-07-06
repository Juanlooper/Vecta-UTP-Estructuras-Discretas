export function renderConteo(): string {
  return `
    <section id="conteo" class="section">
      <h2 class="section-title">3. Técnicas de Conteo</h2>
      
      <div class="glass-panel" style="margin-bottom: 2rem;">
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
          Las técnicas de conteo nos permiten saber cuántas opciones distintas tiene el usuario a nivel de Interfaz de Usuario (UI) y prever la carga de posibles variables en la arquitectura de la base de datos.
        </p>

        <h3>3.1 Principio Multiplicativo (Y)</h3>
        
        <div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
          <strong style="color: #3b82f6;">Utilidad Práctica (Límites en Base de Datos):</strong><br>
          <span style="color: var(--text-secondary); font-size: 0.9rem;">Permite calcular de antemano el límite máximo de combinaciones de configuraciones (perfiles, filtros) que el sistema debe soportar, ayudando a dimensionar la base de datos y evitar desbordamientos de diseño en la UI.</span>
        </div>

        <div style="background: rgba(168, 85, 247, 0.1); border-left: 4px solid #a855f7; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
          <strong style="color: #a855f7;">Explicación Matemática:</strong><br>
          <span style="color: var(--text-secondary); font-size: 0.9rem;">
            Se usa cuando eventos ocurren de forma secuencial. Un usuario al registrarse elige un rol (n₁), una facultad (n₂) y una modalidad (n₃). Hay 2 roles, 6 facultades y 2 modalidades. Total de configuraciones en la BD: n₁ × n₂ × n₃ = 2 × 6 × 2 = 24.
          </span>
        </div>

        <div style="background: #000; padding: 1rem; border-radius: 8px; font-family: monospace; color: var(--text-secondary); margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.1);">
          <span style="color: #c678dd;">int</span> <span style="color: #61afef;">calcularCombinacionesDePerfiles</span>() {<br>
          &nbsp;&nbsp;<span style="color: #e5c07b;">List</span>&lt;<span style="color: #e5c07b;">String</span>&gt; roles = [<span style="color: #98c379;">'Estudiante'</span>, <span style="color: #98c379;">'Tutor'</span>];<br>
          &nbsp;&nbsp;<span style="color: #e5c07b;">List</span>&lt;<span style="color: #e5c07b;">String</span>&gt; facs = [<span style="color: #98c379;">'FISC'</span>, <span style="color: #98c379;">'FIM'</span>, <span style="color: #98c379;">'FIC'</span>, <span style="color: #98c379;">'FIE'</span>, <span style="color: #98c379;">'FIPI'</span>, <span style="color: #98c379;">'FCyT'</span>];<br>
          &nbsp;&nbsp;<span style="color: #e5c07b;">List</span>&lt;<span style="color: #e5c07b;">String</span>&gt; mods = [<span style="color: #98c379;">'Presencial'</span>, <span style="color: #98c379;">'Virtual'</span>];<br>
          <br>
          &nbsp;&nbsp;<span style="color: #64748b;">// Principio Multiplicativo</span><br>
          &nbsp;&nbsp;<span style="color: #c678dd;">return</span> roles.<span style="color: #e5c07b;">length</span> * facs.<span style="color: #e5c07b;">length</span> * mods.<span style="color: #e5c07b;">length</span>; <span style="color: #64748b;">// 24</span><br>
          }
        </div>

        <!-- Interactividad: Conteo Multiplicativo -->
        <div style="background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border-glass); margin-bottom: 2rem;">
          <h4 style="margin-bottom: 1.5rem;">Módulo Interactivo: Combinaciones de Perfiles (Principio Multiplicativo)</h4>
          
          <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
            
            <div style="flex: 1; min-width: 150px;">
              <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 1rem;">Roles (n₁)</div>
              <div class="chk-group" id="chk-roles">
                <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary);"><input type="checkbox" value="1" checked> Estudiante</label>
                <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary);"><input type="checkbox" value="1" checked> Tutor</label>
              </div>
            </div>
            
            <div style="flex: 1; min-width: 150px;">
              <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 1rem;">Facultades (n₂)</div>
              <div class="chk-group" id="chk-facultades">
                <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary);"><input type="checkbox" value="1" checked> FISC</label>
                <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary);"><input type="checkbox" value="1" checked> FIM</label>
                <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary);"><input type="checkbox" value="1" checked> FIC</label>
                <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary);"><input type="checkbox" value="1" checked> FIE</label>
                <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary);"><input type="checkbox" value="1" checked> FIPI</label>
                <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary);"><input type="checkbox" value="1" checked> FCyT</label>
              </div>
            </div>

            <div style="flex: 1; min-width: 150px;">
              <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 1rem;">Modalidades (n₃)</div>
              <div class="chk-group" id="chk-modalidades">
                <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary);"><input type="checkbox" value="1" checked> Presencial</label>
                <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary);"><input type="checkbox" value="1" checked> Virtual</label>
              </div>
            </div>

          </div>

          <div style="margin-top: 2rem; border-top: 1px solid var(--border-glass); padding-top: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
            <div style="font-size: 1.25rem; font-family: var(--font-heading);">
              <span id="n1-val">2</span> × <span id="n2-val">6</span> × <span id="n3-val">2</span>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 0.9rem; color: var(--text-secondary);">Total de Perfiles Posibles en BD</div>
              <div style="font-size: 2.5rem; font-weight: 700;" class="text-gradient" id="total-perfiles">24</div>
            </div>
          </div>
        </div>

        <!-- Expansión: Permutaciones vs Combinaciones -->
        <h3 style="margin-top: 3rem; margin-bottom: 1.5rem;">3.2 Principio Aditivo y Combinatoria</h3>
        
        <div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
          <strong style="color: #3b82f6;">Utilidad Práctica (Emparejamiento / Matchmaking):</strong><br>
          <span style="color: var(--text-secondary); font-size: 0.9rem;">Optimiza la asignación de cupos y grupos al conocer la cantidad exacta de opciones excluyentes y agrupaciones posibles, fundamental para programar los algoritmos de emparejamiento.</span>
        </div>

        <div style="background: rgba(168, 85, 247, 0.1); border-left: 4px solid #a855f7; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
          <strong style="color: #a855f7;">Explicación Matemática:</strong><br>
          <span style="color: var(--text-secondary); font-size: 0.9rem;">
            <ul style="margin-top: 0.5rem; margin-bottom: 0; padding-left: 1.5rem;">
              <li><strong>Principio Aditivo (O):</strong> Eventos excluyentes. 4 opciones de Álgebra o 3 de Prog = 7 opciones totales en pantalla.</li>
              <li><strong>Combinaciones (nCr):</strong> El orden NO importa. Formar grupos de estudio de 4 alumnos de un aula de 10: 10C4 = 210 posibles.</li>
              <li><strong>Permutaciones (nPr):</strong> El orden SÍ importa. Asignar 3 tutores a 3 aulas físicas distintas: 3P3 = 6.</li>
            </ul>
          </span>
        </div>

        <div style="background: #000; padding: 1rem; border-radius: 8px; font-family: monospace; color: var(--text-secondary); margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.1);">
          <span style="color: #c678dd;">int</span> <span style="color: #61afef;">calcularOpcionesAditivas</span>(<span style="color: #e5c07b;">List</span>&lt;<span style="color: #e5c07b;">String</span>&gt; algebra, <span style="color: #e5c07b;">List</span>&lt;<span style="color: #e5c07b;">String</span>&gt; prog) {<br>
          &nbsp;&nbsp;<span style="color: #64748b;">// Principio Aditivo: El estudiante escoge uno O el otro</span><br>
          &nbsp;&nbsp;<span style="color: #c678dd;">return</span> algebra.<span style="color: #e5c07b;">length</span> + prog.<span style="color: #e5c07b;">length</span>;<br>
          }
        </div>

        <div style="background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border-glass); margin-top: 1rem;">
          <h4 style="margin-bottom: 1.5rem; color: var(--text-secondary); text-align: center;">Módulo Interactivo: Explosión Combinatoria</h4>
          
          <div style="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center; align-items: center; margin-bottom: 2rem;">
            <div style="text-align: center;">
              <label style="display: block; color: var(--text-secondary); margin-bottom: 0.5rem;">Población (n): <span id="n-val-label" style="color: white; font-weight: bold;">5</span></label>
              <input type="range" id="input-n" min="2" max="15" value="5" class="glass-input" style="width: 150px;">
            </div>
            <div style="text-align: center;">
              <label style="display: block; color: var(--text-secondary); margin-bottom: 0.5rem;">Selección (r): <span id="r-val-label" style="color: white; font-weight: bold;">3</span></label>
              <input type="range" id="input-r" min="1" max="5" value="3" class="glass-input" style="width: 150px;">
            </div>
          </div>

          <div style="display: flex; gap: 1rem; justify-content: space-around;">
            <div style="text-align: center; flex: 1;">
              <div style="font-size: 1rem; color: var(--accent-primary); margin-bottom: 0.5rem;">Permutaciones (nPr)</div>
              <div style="font-family: monospace; color: var(--text-secondary); font-size: 0.8rem;">P(n,r) = n! / (n-r)!</div>
              <div id="val-npr" style="font-size: 2.5rem; font-weight: bold; margin-top: 1rem; color: white;">60</div>
            </div>
            <div style="width: 1px; background: var(--border-glass);"></div>
            <div style="text-align: center; flex: 1;">
              <div style="font-size: 1rem; color: var(--accent-secondary); margin-bottom: 0.5rem;">Combinaciones (nCr)</div>
              <div style="font-family: monospace; color: var(--text-secondary); font-size: 0.8rem;">C(n,r) = n! / (r!(n-r)!)</div>
              <div id="val-ncr" style="font-size: 2.5rem; font-weight: bold; margin-top: 1rem; color: white;">10</div>
            </div>
          </div>

          <div style="margin-top: 2rem;">
            <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.5rem;">Diferencia de crecimiento computacional</div>
            <div style="width: 100%; height: 10px; background: rgba(255,255,255,0.1); border-radius: 5px; overflow: hidden; display: flex;">
              <div id="bar-ncr" style="height: 100%; background: var(--accent-secondary); width: 14%; transition: width 0.3s;"></div>
              <div id="bar-npr" style="height: 100%; background: var(--accent-primary); width: 86%; transition: width 0.3s;"></div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.5rem;">
              <span>Combinaciones: Menor Carga en DB</span>
              <span>Permutaciones: Explosión Masiva</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  `;
}

export function initConteoLogic() {
  const getCount = (groupId: string) => {
    return document.querySelectorAll(`#${groupId} input[type="checkbox"]:checked`).length;
  };

  const updateCalculation = () => {
    const n1 = getCount('chk-roles');
    const n2 = getCount('chk-facultades');
    const n3 = getCount('chk-modalidades');
    
    document.getElementById('n1-val')!.innerText = n1.toString();
    document.getElementById('n2-val')!.innerText = n2.toString();
    document.getElementById('n3-val')!.innerText = n3.toString();
    
    document.getElementById('total-perfiles')!.innerText = (n1 * n2 * n3).toString();
  };

  const checkboxes = document.querySelectorAll('.chk-group input[type="checkbox"]');
  checkboxes.forEach(chk => {
    chk.addEventListener('change', updateCalculation);
  });

  // Factorial helper
  const fact = (num: number): number => {
    if (num <= 1) return 1;
    return num * fact(num - 1);
  };

  // Permutaciones y Combinaciones
  const inputN = document.getElementById('input-n') as HTMLInputElement;
  const inputR = document.getElementById('input-r') as HTMLInputElement;
  
  const labelN = document.getElementById('n-val-label')!;
  const labelR = document.getElementById('r-val-label')!;
  const valNpr = document.getElementById('val-npr')!;
  const valNcr = document.getElementById('val-ncr')!;
  
  const barNcr = document.getElementById('bar-ncr')!;
  const barNpr = document.getElementById('bar-npr')!;

  const updatePRC = () => {
    let n = parseInt(inputN.value);
    let r = parseInt(inputR.value);

    // r no puede ser mayor que n
    if(r > n) {
      r = n;
      inputR.value = r.toString();
    }

    labelN.innerText = n.toString();
    labelR.innerText = r.toString();

    const npr = fact(n) / fact(n - r);
    const ncr = npr / fact(r);

    valNpr.innerText = npr.toLocaleString();
    valNcr.innerText = ncr.toLocaleString();

    const total = npr + ncr;
    const ncrPerc = (ncr / total) * 100;
    const nprPerc = (npr / total) * 100;

    barNcr.style.width = `${ncrPerc}%`;
    barNpr.style.width = `${nprPerc}%`;
  };

  inputN.addEventListener('input', updatePRC);
  inputR.addEventListener('input', updatePRC);
  updatePRC();
}
