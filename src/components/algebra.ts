export function renderAlgebra(): string {
  return `
    <section id="algebra" class="section">
      <h2 class="section-title">6. Estructuras Algebraicas</h2>
      
      <div class="glass-panel" style="margin-bottom: 2rem;">
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
          Para el sistema de tickets de quejas, Vecta cuenta con 4 Administradores de TI que rotan turnos (A = {0, 1, 2, 3}). 
          Para evitar ciclos condicionales, el algoritmo utiliza una <strong>Suma Modular en base 4 (Z₄)</strong>: 
          <span style="color: white; font-family: monospace;">a ⊕ b = (a + b) mod 4</span>
        </p>

        <ul style="color: var(--text-secondary); margin-bottom: 2rem; padding-left: 1.5rem;">
          <li><strong>Operación Cerrada:</strong> Resultados pertenecen al conjunto original. (Nunca sale del turno 0 al 3).</li>
          <li><strong>Semigrupo:</strong> Es Asociativa.</li>
          <li><strong>Monoide:</strong> Existe Elemento Neutro (e=0, no rotar turno).</li>
          <li><strong>Grupo:</strong> Existe Elemento Inverso (Para avanzar 1 turno, el inverso es avanzar 3 turnos: 1+3=0).</li>
          <li><strong>Grupo Abeliano:</strong> Es Conmutativa. (Orden independiente).</li>
        </ul>

        <!-- Interactividad: Rueda de Suma Modular -->
        <div style="background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border-glass);">
          <h4 style="margin-bottom: 1.5rem; text-align: center;">Módulo Interactivo: Rotación de Turnos (Grupo Cíclico Z₄)</h4>
          
          <div style="display: flex; gap: 2rem; flex-wrap: wrap; align-items: center; justify-content: center;">
            
            <div style="flex: 1; min-width: 250px; max-width: 300px; display: flex; flex-direction: column; gap: 1rem;">
              <div>
                <label style="display: block; color: var(--text-secondary); margin-bottom: 0.5rem;">Delegar a:</label>
                <select id="select-delegacion" class="glass-input" style="width: 100%; font-size: 1rem;">
                  <option value="1">Siguiente (+1)</option>
                  <option value="2">Respaldo (+2)</option>
                  <option value="3">Anterior (+3) [Inverso de +1]</option>
                </select>
              </div>
              <button class="btn btn-primary" id="btn-rotar">Rotar Turno ⊕</button>
              
              <div style="margin-top: 1rem; padding: 1rem; background: rgba(0,0,0,0.5); border-radius: 8px; font-family: monospace; color: var(--text-secondary);">
                <div>Turno Actual: <span id="log-actual" style="color: white;">0</span></div>
                <div>Delegación: <span id="log-delegacion" style="color: white;">+1</span></div>
                <div style="border-top: 1px solid var(--border-glass); margin-top: 0.5rem; padding-top: 0.5rem; color: var(--accent-primary); font-weight: bold;">
                  Nuevo: (<span id="log-calc-a">0</span> + <span id="log-calc-b">1</span>) mod 4 = <span id="log-nuevo">1</span>
                </div>
              </div>
            </div>

            <!-- Rueda Gráfica -->
            <div style="position: relative; width: 250px; height: 250px;">
              <!-- Circle track -->
              <div style="position: absolute; top: 25px; left: 25px; width: 200px; height: 200px; border-radius: 50%; border: 2px dashed var(--border-glass);"></div>
              
              <!-- Nodos -->
              <div class="admin-node" data-id="0" style="position: absolute; top: 0; left: 100px; width: 50px; height: 50px; border-radius: 50%; background: var(--accent-primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 3px solid rgba(255,255,255,0.5); box-shadow: 0 0 15px var(--accent-primary); transition: all 0.3s;">
                A_0
              </div>
              <div class="admin-node" data-id="1" style="position: absolute; top: 100px; left: 200px; width: 50px; height: 50px; border-radius: 50%; background: #1e1e2f; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 3px solid var(--border-glass); transition: all 0.3s;">
                A_1
              </div>
              <div class="admin-node" data-id="2" style="position: absolute; top: 200px; left: 100px; width: 50px; height: 50px; border-radius: 50%; background: #1e1e2f; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 3px solid var(--border-glass); transition: all 0.3s;">
                A_2
              </div>
              <div class="admin-node" data-id="3" style="position: absolute; top: 100px; left: 0; width: 50px; height: 50px; border-radius: 50%; background: #1e1e2f; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 3px solid var(--border-glass); transition: all 0.3s;">
                A_3
              </div>

            </div>
          </div>
        </div>

        <!-- Expansión: Subgrupos y Abelianos -->
        <h4 style="margin-top: 3rem; margin-bottom: 1.5rem;">Propiedades Avanzadas en Software</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 2rem;">
          
          <div style="flex: 1; min-width: 280px; background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border-glass);">
            <h5 style="color: var(--accent-secondary); margin-bottom: 1rem;">1. Subgrupos (Equipos de Fin de Semana)</h5>
            <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">
              Dentro de Z₄, el subconjunto <strong>H = {0, 2}</strong> forma un subgrupo. Si sumamos (mod 4) cualquier elemento de H con otro de H, el resultado siempre está en H.
            </p>
            <div style="background: rgba(6, 182, 212, 0.1); padding: 1rem; border-radius: 8px; font-family: monospace; font-size: 0.85rem; border-left: 3px solid var(--accent-secondary);">
              0 ⊕ 0 = 0<br>
              0 ⊕ 2 = 2<br>
              2 ⊕ 0 = 2<br>
              2 ⊕ 2 = 0
            </div>
            <p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 1rem;">
              <strong>Utilidad:</strong> Permite dividir la carga creando sub-rotaciones cerradas. (Ej: El equipo de fin de semana rota solo entre A_0 y A_2 sin tocar a los demás).
            </p>
          </div>

          <div style="flex: 1; min-width: 280px; background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border-glass);">
            <h5 style="color: var(--accent-primary); margin-bottom: 1rem;">2. Grupo Abeliano (Procesamiento Asíncrono)</h5>
            <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">
              La suma modular es <strong>Conmutativa</strong> (a ⊕ b = b ⊕ a). 
            </p>
            <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 1rem;">
              <select id="sel-a" class="glass-input" style="width: 60px;"><option value="1">1</option><option value="2">2</option><option value="3">3</option></select>
              <span style="font-weight: bold; color: var(--text-secondary);">⊕</span>
              <select id="sel-b" class="glass-input" style="width: 60px;"><option value="1">1</option><option value="2" selected>2</option><option value="3">3</option></select>
            </div>
            
            <div style="background: rgba(139, 92, 246, 0.1); padding: 1rem; border-radius: 8px; font-family: monospace; font-size: 0.85rem; text-align: center; border-left: 3px solid var(--accent-primary);">
              <div><span id="txt-ab">1 ⊕ 2 = 3</span></div>
              <div style="color: var(--text-secondary); margin: 0.2rem 0;">es igual a</div>
              <div><span id="txt-ba">2 ⊕ 1 = 3</span></div>
            </div>
            <p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 1rem;">
              <strong>Utilidad:</strong> Prevención de colisiones. Si dos eventos llegan al servidor en desorden, la base de datos llegará exactamente al mismo estado final.
            </p>
          </div>

        </div>

      </div>
    </section>
  `;
}

export function initAlgebraLogic() {
  let turnoActual = 0;
  const btnRotar = document.getElementById('btn-rotar')!;
  const selectDelegacion = document.getElementById('select-delegacion') as HTMLSelectElement;

  const logActual = document.getElementById('log-actual')!;
  const logDelegacion = document.getElementById('log-delegacion')!;
  const logCalcA = document.getElementById('log-calc-a')!;
  const logCalcB = document.getElementById('log-calc-b')!;
  const logNuevo = document.getElementById('log-nuevo')!;

  const updateUI = (oldTurno: number, newTurno: number, delegacion: number) => {
    // reset old
    const oldNode = document.querySelector(`.admin-node[data-id="${oldTurno}"]`) as HTMLElement;
    oldNode.style.background = '#1e1e2f';
    oldNode.style.borderColor = 'var(--border-glass)';
    oldNode.style.boxShadow = 'none';

    // set new
    const newNode = document.querySelector(`.admin-node[data-id="${newTurno}"]`) as HTMLElement;
    newNode.style.background = 'var(--accent-primary)';
    newNode.style.borderColor = 'rgba(255,255,255,0.5)';
    newNode.style.boxShadow = '0 0 15px var(--accent-primary)';

    // update logs
    logActual.innerText = oldTurno.toString();
    logDelegacion.innerText = `+${delegacion}`;
    logCalcA.innerText = oldTurno.toString();
    logCalcB.innerText = delegacion.toString();
    logNuevo.innerText = newTurno.toString();
  };

  btnRotar.addEventListener('click', () => {
    const delegacion = parseInt(selectDelegacion.value);
    const oldTurno = turnoActual;
    turnoActual = (turnoActual + delegacion) % 4;
    
    updateUI(oldTurno, turnoActual, delegacion);
  });

  // Abeliano Logic
  const selA = document.getElementById('sel-a') as HTMLSelectElement;
  const selB = document.getElementById('sel-b') as HTMLSelectElement;
  const txtAB = document.getElementById('txt-ab')!;
  const txtBA = document.getElementById('txt-ba')!;

  const updateAbeliano = () => {
    const a = parseInt(selA.value);
    const b = parseInt(selB.value);
    const res = (a + b) % 4;
    txtAB.innerText = `${a} ⊕ ${b} = ${res}`;
    txtBA.innerText = `${b} ⊕ ${a} = ${res}`;
  };

  selA.addEventListener('change', updateAbeliano);
  selB.addEventListener('change', updateAbeliano);
  updateAbeliano();
}
