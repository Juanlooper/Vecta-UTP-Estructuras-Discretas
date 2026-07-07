export function renderPrototype(): string {
  return `
    <section id="prototype" class="section">
      <h2 class="section-title">7. Prototipo Vecta Web y Consola Matemática</h2>
      <div class="glass-panel" style="margin-bottom: 2rem;">
        <p style="color: var(--text-secondary); margin-bottom: 2rem; text-align: center;">
          Interactúa con el prototipo a la izquierda. La consola de la derecha te explicará en tiempo real qué concepto matemático discreto se está ejecutando detrás de cada acción.
        </p>

        <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
          <!-- Mockup Container (Left) -->
          <div style="flex: 2; min-width: 600px; background: #0f172a; border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); display: flex; flex-direction: column;">
            
            <!-- Mockup Header -->
            <div style="background: rgba(255,255,255,0.05); padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; border-bottom: 1px solid var(--border-glass);">
              <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="width: 55px; height: 55px; border-radius: 12px; background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; font-size: 2rem;">V</div>
                <strong style="color: white; font-size: 1.2rem; letter-spacing: 1px;">VECTA <span style="color: var(--accent-primary);">UTP</span></strong>
              </div>
              <div style="display: flex; gap: 1rem; align-items: center;" id="proto-tabs">
                <div class="proto-tab active" data-target="view-inicio" style="background: rgba(255,255,255,0.1); padding: 0.5rem 1rem; border-radius: 20px; color: white; font-size: 0.85rem; cursor: pointer; transition: all 0.3s; white-space: nowrap;">Inicio</div>
                <div class="proto-tab" data-target="view-tutorias" style="background: transparent; padding: 0.5rem 1rem; border-radius: 20px; color: var(--text-secondary); font-size: 0.85rem; cursor: pointer; transition: all 0.3s; white-space: nowrap;">Mis Tutorías</div>
                <div class="proto-tab" data-target="view-explorar" style="background: transparent; padding: 0.5rem 1rem; border-radius: 20px; color: var(--text-secondary); font-size: 0.85rem; cursor: pointer; transition: all 0.3s; white-space: nowrap;">Explorar</div>
              </div>
              <div style="display: flex; align-items: center; gap: 1rem;">
                <button id="proto-btn-z4" style="background: rgba(168, 85, 247, 0.2); border: 1px solid #a855f7; color: #a855f7; border-radius: 6px; padding: 0.4rem 0.8rem; cursor: pointer; font-weight: bold; font-size: 0.8rem; transition: all 0.2s; white-space: nowrap;">Soporte (Z₄)</button>
                <div style="color: var(--text-secondary); font-size: 0.9rem; white-space: nowrap;">Hola, <strong style="color: white;">Carlos</strong></div>
                <div style="width: 35px; height: 35px; min-width: 35px; border-radius: 50%; background: var(--accent-secondary); border: 2px solid white;"></div>
              </div>
            </div>

            <!-- Mockup Body (Views) -->
            <div style="position: relative; flex: 1; padding: 2rem; min-height: 450px; display: flex; flex-direction: column;">
              
              <!-- View: Inicio -->
              <div id="view-inicio" class="proto-view" style="display: flex; width: 100%; flex-direction: column; gap: 2rem;">
                <div style="background: rgba(255,255,255,0.03); padding: 2rem; border-radius: 12px; border: 1px solid var(--border-glass); text-align: center;">
                  <h3 style="color: white; margin-bottom: 1rem;">Bienvenido a Vecta</h3>
                  <p style="color: var(--text-secondary);">Selecciona "Explorar" para buscar un tutor o "Mis Tutorías" para ver tus clases activas.</p>
                </div>
                <div style="display: flex; gap: 2rem;">
                  <div style="flex: 1; background: rgba(255,255,255,0.03); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border-glass);">
                    <div style="color: white; font-weight: bold; margin-bottom: 1rem;">Sucesiones Acumuladas</div>
                    <div id="proto-xp-counter" style="font-size: 2.5rem; font-weight: bold; color: var(--accent-primary);">450<span style="font-size: 1rem; color: var(--text-secondary);"> XP</span></div>
                  </div>
                  <div style="flex: 1; background: rgba(255,255,255,0.03); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border-glass);">
                    <div style="color: white; font-weight: bold; margin-bottom: 1rem;">Matriz de Asistencia</div>
                    <div style="font-size: 2.5rem; font-weight: bold; color: #10b981;">92%</div>
                  </div>
                </div>
              </div>

              <!-- View: Mis Tutorías -->
              <div id="view-tutorias" class="proto-view" style="display: none; width: 100%; flex-direction: column; gap: 1.5rem;">
                <div style="color: white; font-size: 1.2rem; font-weight: bold; margin-bottom: 1rem;">Mis Tutorías Activas (Grafo)</div>
                <div id="proto-tutorias-list" style="display: flex; flex-direction: column; gap: 1rem;">
                  <!-- Rendered via JS -->
                </div>
              </div>

              <!-- View: Explorar -->
              <div id="view-explorar" class="proto-view" style="display: none; width: 100%; gap: 2rem;">
                <!-- Main Content -->
                <div style="flex: 1; display: flex; flex-direction: column; gap: 2rem;">
                  <!-- Search & Filters -->
                  <div style="background: rgba(255,255,255,0.03); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border-glass);">
                    <div style="color: white; font-weight: bold; margin-bottom: 1rem; font-size: 1.1rem;">Explorar Tutores <span style="font-size: 0.85rem; font-weight: normal; color: var(--text-secondary);">(Filtros A ∩ B)</span></div>
                    <div style="display: flex; gap: 1rem;">
                      <input id="proto-search-input" type="text" placeholder="Materia (ej. Álgebra, Cálculo)..." style="flex: 2; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border-glass); background: rgba(0,0,0,0.5); color: white; outline: none;">
                      <select style="flex: 1; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border-glass); background: rgba(0,0,0,0.5); color: white; outline: none;">
                        <option>FISC</option>
                      </select>
                      <button id="proto-btn-buscar" style="padding: 0.8rem 1.5rem; border-radius: 8px; background: var(--accent-primary); color: white; font-weight: bold; border: none; cursor: pointer;">Buscar</button>
                    </div>
                  </div>

                  <!-- Tutor Cards -->
                  <div style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
                    <div class="proto-tutor-card" data-subject="álgebra lineal" style="background: rgba(255,255,255,0.03); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border-glass); display: flex; gap: 1.5rem; align-items: center;">
                      <div style="width: 50px; height: 50px; border-radius: 50%; background: #3b82f6; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white;">R</div>
                      <div style="flex: 1;">
                        <div style="color: white; font-weight: bold;">Roberto <span style="color: var(--text-secondary); font-size: 0.8rem; font-weight: normal;">(deg⁻ = 15)</span></div>
                        <div style="color: var(--text-secondary); font-size: 0.85rem;">Álgebra Lineal</div>
                      </div>
                      <button class="proto-btn-solicitar" data-id="R" data-name="Roberto" data-subject="Álgebra Lineal" data-color="#3b82f6" style="padding: 0.6rem 1rem; border-radius: 6px; background: rgba(59, 130, 246, 0.2); color: #3b82f6; font-weight: bold; border: 1px solid #3b82f6; cursor: pointer; transition: all 0.3s;">Solicitar f(x)</button>
                    </div>
                    
                    <div class="proto-tutor-card" data-subject="cálculo iii" style="background: rgba(255,255,255,0.03); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border-glass); display: flex; gap: 1.5rem; align-items: center;">
                      <div style="width: 50px; height: 50px; border-radius: 50%; background: #10b981; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white;">E</div>
                      <div style="flex: 1;">
                        <div style="color: white; font-weight: bold;">Elena <span style="color: var(--text-secondary); font-size: 0.8rem; font-weight: normal;">(deg⁻ = 8)</span></div>
                        <div style="color: var(--text-secondary); font-size: 0.85rem;">Cálculo III</div>
                      </div>
                      <button class="proto-btn-solicitar" data-id="E" data-name="Elena" data-subject="Cálculo III" data-color="#10b981" style="padding: 0.6rem 1rem; border-radius: 6px; background: rgba(59, 130, 246, 0.2); color: #3b82f6; font-weight: bold; border: 1px solid #3b82f6; cursor: pointer; transition: all 0.3s;">Solicitar f(x)</button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer Notification (Algebra) -->
              <div id="proto-notif" style="margin-top: 2rem; background: rgba(16, 185, 129, 0.1); border-left: 4px solid #10b981; padding: 1rem; border-radius: 0 8px 8px 0; display: flex; justify-content: space-between; align-items: center; transition: opacity 0.3s; opacity: 1;">
                <div id="proto-notif-text" style="color: #10b981; font-size: 0.9rem;">
                  <strong>Soporte Técnico:</strong> Tu ticket ha sido delegado al Admin 1 (Z₄ rotado exitosamente).
                </div>
                <button id="proto-btn-close-notif" style="background: transparent; border: none; color: #10b981; cursor: pointer; font-size: 1.2rem;">✕</button>
              </div>

            </div>
          </div>

          <!-- Explainer Console (Right) -->
          <div style="flex: 1; min-width: 300px; background: rgba(0,0,0,0.5); border-radius: 16px; border: 1px solid var(--border-glass); padding: 2rem; display: flex; flex-direction: column;">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; border-bottom: 1px solid var(--border-glass); padding-bottom: 1rem;">
              <div style="width: 12px; height: 12px; border-radius: 50%; background: #ef4444;"></div>
              <div style="width: 12px; height: 12px; border-radius: 50%; background: #f59e0b;"></div>
              <div style="width: 12px; height: 12px; border-radius: 50%; background: #10b981;"></div>
              <span style="color: var(--text-secondary); font-family: monospace; margin-left: 1rem; font-weight: bold;">CONSOLA MATEMÁTICA</span>
            </div>
            
            <div id="proto-explainer-content" style="color: var(--accent-primary); font-family: monospace; font-size: 0.95rem; line-height: 1.6; white-space: pre-wrap;">> <span style="color: white;">Esperando interacción...</span>
Haz clic en las pestañas, filtra tutores o solicita una tutoría para ver su base matemática discreta aquí.</div>
          </div>

        </div>
      </div>
    </section>
  `;
}

export function initPrototypeLogic() {
  const tabs = document.querySelectorAll('.proto-tab');
  const views = document.querySelectorAll('.proto-view');
  const btnBuscar = document.getElementById('proto-btn-buscar');
  const btnsSolicitar = document.querySelectorAll('.proto-btn-solicitar');
  const notif = document.getElementById('proto-notif');
  const btnCloseNotif = document.getElementById('proto-btn-close-notif');
  const notifText = document.getElementById('proto-notif-text');
  const explainer = document.getElementById('proto-explainer-content')!;
  
  const xpCounter = document.getElementById('proto-xp-counter');
  const tutoriasList = document.getElementById('proto-tutorias-list');
  const btnZ4 = document.getElementById('proto-btn-z4');

  // STATE
  let xp = 450;
  let adminZ4 = 1;
  interface Tutor {
    id: string;
    name: string;
    subject: string;
    color: string;
  }
  let activeTutors: Tutor[] = [
    { id: 'A', name: 'Ana', subject: 'Cálculo II', color: '#f59e0b' }
  ];

  const updateExplainer = (text: string, color: string = 'var(--accent-primary)') => {
    explainer.innerHTML = `> <span style="color: ${color}; font-weight: bold;">Ejecución Detectada:</span><br><br><span style="color: white;">${text}</span>`;
  };

  const renderXP = () => {
    if (xpCounter) {
      xpCounter.innerHTML = `${xp}<span style="font-size: 1rem; color: var(--text-secondary);"> XP</span>`;
    }
  };

  const renderTutorias = () => {
    if (!tutoriasList) return;
    if (activeTutors.length === 0) {
      tutoriasList.innerHTML = `<div style="color: var(--text-secondary); padding: 1rem; text-align: center; border: 1px dashed var(--border-glass); border-radius: 8px;">No hay tutorías activas. Grafo vacío.</div>`;
      return;
    }
    
    tutoriasList.innerHTML = activeTutors.map(t => `
      <div style="background: rgba(255,255,255,0.03); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border-glass); display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="width: 50px; height: 50px; border-radius: 50%; background: ${t.color}; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white;">${t.id}</div>
          <div>
            <div style="color: white; font-weight: bold;">${t.name} (${t.subject})</div>
            <div style="color: var(--text-secondary); font-size: 0.85rem;">Conexión dirigida establecida: E → ${t.id}</div>
          </div>
        </div>
        <button class="proto-btn-cancelar" data-name="${t.name}" style="padding: 0.5rem 1rem; border-radius: 6px; background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 1px solid #ef4444; cursor: pointer; transition: all 0.2s;">Romper Arco</button>
      </div>
    `).join('');

    // Bind cancel buttons
    document.querySelectorAll('.proto-btn-cancelar').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const nameToRemove = target.getAttribute('data-name');
        activeTutors = activeTutors.filter(t => t.name !== nameToRemove);
        renderTutorias();
        updateExplainer(`Grafo Modificado: Eliminación de Arco.<br><br>Se ha removido la conexión dirigida (Estudiante → ${nameToRemove}). La Matriz de Relación (M_R) ha sido actualizada eliminando el par ordenado.`, "#ef4444");
      });
    });
  };

  // Initial render
  renderXP();
  renderTutorias();

  // Z4 Logic
  if (btnZ4) {
    btnZ4.addEventListener('click', () => {
      adminZ4 = (adminZ4 + 1) % 4; // Z4 Sum
      if (notif && notifText) {
        notif.style.display = 'flex';
        notif.style.opacity = '1';
        notifText.innerHTML = `<strong>Soporte Técnico:</strong> Ticket rotado al Admin ${adminZ4} (Z₄).`;
        updateExplainer(`Estructura Algebraica: Grupo Abeliano (Suma Modular Z₄).<br><br>Se incrementó el turno. El algoritmo cicla dentro del conjunto A = {0,1,2,3}. Nuevo Admin a cargo: ${adminZ4}.`, "#a855f7");
      }
    });
  }

  // Tab switching logic
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(t => {
        (t as HTMLElement).style.background = 'transparent';
        (t as HTMLElement).style.color = 'var(--text-secondary)';
      });
      const targetTab = e.target as HTMLElement;
      targetTab.style.background = 'rgba(255,255,255,0.1)';
      targetTab.style.color = 'white';

      const targetId = targetTab.getAttribute('data-target');
      views.forEach(v => {
        (v as HTMLElement).style.display = 'none';
      });
      document.getElementById(targetId!)!.style.display = 'flex';

      if (targetId === 'view-inicio') {
        updateExplainer("Visualizando Panel Principal.<br><br>Conceptos Activos:<br>- Sucesiones (S_k): Representando el avance del nivel de XP del alumno.<br>- Matrices Booleanas: Resumen de asistencias extraído de la relación MR.");
      } else if (targetId === 'view-tutorias') {
        updateExplainer("Visualizando Relaciones y Grafos.<br><br>Conceptos Activos:<br>- Se renderiza un Grafo Dirigido.<br>- Cada tutoría es un Arco (E → T) entre el nodo Estudiante y el nodo Tutor.<br>- Propiedad Antisimétrica asegura que el Tutor no es su propio Estudiante.");
      } else if (targetId === 'view-explorar') {
        updateExplainer("Visualizando Filtros.<br><br>Conceptos Activos:<br>- Operaciones de Conjuntos: Se preparan los conjuntos Universitarios para operar (Unión, Intersección, etc).<br>- Combinatoria: El sistema calcula combinaciones (C(n,r)) para proveer filtros precisos en los selectores.");
      }
    });
  });

  const searchInput = document.getElementById('proto-search-input') as HTMLInputElement | null;
  const tutorCards = document.querySelectorAll('.proto-tutor-card');

  if (btnBuscar && searchInput) {
    btnBuscar.addEventListener('click', () => {
      btnBuscar.innerText = 'Buscando...';
      const query = searchInput.value.toLowerCase().trim();
      
      updateExplainer("Operación de Conjuntos: Intersección (A ∩ B).<br><br>Buscando tutores de FISC que intersectan con la materia especificada.", "#f59e0b");
      
      setTimeout(() => {
        btnBuscar.innerText = 'Buscar';
        tutorCards.forEach(card => {
          const subject = (card as HTMLElement).getAttribute('data-subject') || '';
          if (query === '' || subject.includes(query)) {
            (card as HTMLElement).style.display = 'flex';
          } else {
            (card as HTMLElement).style.display = 'none';
          }
        });
      }, 600);
    });
  }

  btnsSolicitar.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if(target.innerText === '¡Procesado g(y)!') return; // prevent spam

      // State changes
      xp += 50;
      renderXP();
      
      const tId = target.getAttribute('data-id') || 'X';
      const tName = target.getAttribute('data-name') || 'Tutor';
      const tSubject = target.getAttribute('data-subject') || 'Materia';
      const tColor = target.getAttribute('data-color') || '#3b82f6';
      
      // Add to graph if not exists
      if (!activeTutors.find(t => t.name === tName)) {
        activeTutors.push({ id: tId, name: tName, subject: tSubject, color: tColor });
        renderTutorias();
      }

      // Visuals
      target.innerText = '¡Procesado g(y)!';
      target.style.background = 'rgba(16, 185, 129, 0.2)';
      target.style.color = '#10b981';
      target.style.borderColor = '#10b981';
      
      updateExplainer(`Composición de Funciones (g ∘ f)(x) y Sucesiones.<br><br>1. Se creó una solicitud huerfana y = f(x).<br>2. Se disparó una transacción atómica z = g(y).<br>3. Se vinculó el tutor ${tName} al estudiante.<br><br>Sucesión Aplicada: S_k = S_{k-1} + 50. Nueva XP: ${xp}.`, "#10b981");

      setTimeout(() => {
        target.innerText = 'Solicitar f(x)';
        target.style.background = 'rgba(59, 130, 246, 0.2)';
        target.style.color = '#3b82f6';
        target.style.borderColor = '#3b82f6';
      }, 3000);
    });
  });

  if (btnCloseNotif && notif) {
    btnCloseNotif.addEventListener('click', () => {
      notif.style.opacity = '0';
      setTimeout(() => {
        notif.style.display = 'none';
      }, 300);
    });
  }
}
