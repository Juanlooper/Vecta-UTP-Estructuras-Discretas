export function renderGrafos(): string {
  return `
    <section id="grafos" class="section">
      <h2 class="section-title">4. Grafos Dirigidos y Relaciones</h2>
      
      <div class="glass-panel" style="margin-bottom: 2rem;">
        <h3>4.1 Análisis de Flujo mediante Dígrafos</h3>
        
        <div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
          <strong style="color: #3b82f6;">Utilidad Práctica (Análisis de Comunidad):</strong><br>
          <span style="color: var(--text-secondary); font-size: 0.9rem;">Visualizar las relaciones como grafos dirigidos nos permite analizar el comportamiento en el Dashboard Administrativo. Calcular el Grado Interno previene manipulaciones artificiales en el ranking de tutores. Calcular el Grado Externo permite detectar cuentas inactivas o bots (spam).</span>
        </div>

        <div style="background: rgba(168, 85, 247, 0.1); border-left: 4px solid #a855f7; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
          <strong style="color: #a855f7;">Explicación Matemática:</strong><br>
          <span style="color: var(--text-secondary); font-size: 0.9rem;">
            Un dígrafo consiste en vértices (usuarios) y arcos dirigidos (relaciones).
            <ul style="margin-top: 0.5rem; margin-bottom: 0; padding-left: 1.5rem;">
              <li><strong>Grado Interno (deg⁻):</strong> Arcos que entran (Reputación). deg⁻(v) = |{u ∈ V | (u,v) ∈ R}|</li>
              <li><strong>Grado Externo (deg⁺):</strong> Arcos que salen (Actividad). deg⁺(v) = |{u ∈ V | (v,u) ∈ R}|</li>
              <li><strong>Teorema del Apretón de Manos:</strong> Σ deg⁺ = Σ deg⁻ = |R|</li>
            </ul>
          </span>
        </div>

        <div style="background: #000; padding: 1rem; border-radius: 8px; font-family: monospace; color: var(--text-secondary); margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.1);">
          <span style="color: #c678dd;">int</span> <span style="color: #61afef;">calcularGradoInterno</span>(<span style="color: #e5c07b;">String</span> tutorId, <span style="color: #e5c07b;">List</span>&lt;<span style="color: #e5c07b;">Map</span>&gt; rels) {<br>
          &nbsp;&nbsp;<span style="color: #64748b;">// Equivalente a deg⁻(v): Contar cuántos arcos apuntan a este tutor</span><br>
          &nbsp;&nbsp;<span style="color: #c678dd;">return</span> rels.<span style="color: #56b6c2;">where</span>((r) =&gt; r[<span style="color: #98c379;">'destino'</span>] == tutorId).<span style="color: #e5c07b;">length</span>;<br>
          }
        </div>

        <!-- Interactividad: Dígrafos y Matriz -->
        <div style="background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border-glass);">
          <h4 style="margin-bottom: 1.5rem;">Módulo Interactivo: Grafo "Es Tutor de"</h4>
          
          <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
            
            <div style="flex: 1; min-width: 300px; position: relative;">
              <div style="margin-bottom: 1rem; color: var(--text-secondary); font-size: 0.9rem;">Haz clic en un nodo de origen y luego en uno destino para trazar una relación.</div>
              <!-- Graph Container -->
              <div id="graph-container" style="position: relative; width: 100%; height: 300px; background: rgba(0,0,0,0.5); border-radius: 8px; border: 1px dashed var(--border-glass); overflow: hidden;">
                
                <svg id="graph-edges" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="var(--accent-primary)" />
                    </marker>
                  </defs>
                  <!-- Lines go here -->
                </svg>

                <!-- Nodes -->
                <button class="graph-node" data-id="Ana" style="position: absolute; top: 20%; left: 20%; width: 50px; height: 50px; border-radius: 50%; border: 2px solid var(--accent-primary); background: #1e1e2f; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; z-index: 10;">Ana</button>
                <button class="graph-node" data-id="Nieves" style="position: absolute; top: 20%; left: 70%; width: 50px; height: 50px; border-radius: 50%; border: 2px solid var(--accent-primary); background: #1e1e2f; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; z-index: 10;">Nieves</button>
                <button class="graph-node" data-id="Carlos" style="position: absolute; top: 70%; left: 45%; width: 50px; height: 50px; border-radius: 50%; border: 2px solid var(--accent-primary); background: #1e1e2f; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; z-index: 10;">Carlos</button>

              </div>
              <button class="btn btn-outline" id="btn-limpiar-grafo" style="margin-top: 1rem; padding: 0.5rem 1rem; font-size: 0.8rem;">Limpiar Grafo</button>
            </div>
            
            <div style="flex: 1; min-width: 300px;">
              <h5 style="margin-bottom: 0.5rem; color: var(--accent-secondary);">Matriz de Relación (MR)</h5>
              <table style="width: 100%; text-align: center; border-collapse: collapse; margin-bottom: 2rem;" id="matriz-relacion">
                <thead>
                  <tr>
                    <th style="padding: 0.5rem; border-bottom: 1px solid var(--border-glass);"></th>
                    <th style="padding: 0.5rem; border-bottom: 1px solid var(--border-glass);">Ana</th>
                    <th style="padding: 0.5rem; border-bottom: 1px solid var(--border-glass);">Nieves</th>
                    <th style="padding: 0.5rem; border-bottom: 1px solid var(--border-glass);">Carlos</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Filled via JS -->
                </tbody>
              </table>

              <h5 style="margin-bottom: 0.5rem; color: var(--accent-secondary);">Teorema del Apretón de Manos</h5>
              <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; font-family: monospace;">
                <div style="display: flex; justify-content: space-between;"><span>Σ deg⁺ (Arcos Salientes):</span> <span id="sum-deg-out">0</span></div>
                <div style="display: flex; justify-content: space-between;"><span>Σ deg⁻ (Arcos Entrantes):</span> <span id="sum-deg-in">0</span></div>
                <div style="display: flex; justify-content: space-between; margin-top: 0.5rem; border-top: 1px solid var(--border-glass); padding-top: 0.5rem; font-weight: bold; color: var(--accent-primary);"><span>Total Relaciones |R|:</span> <span id="total-r">0</span></div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- 4.6 Carrusel Propiedades -->
      <div class="glass-panel">
        <h3>4.2 Relaciones Fundamentales y sus Propiedades</h3>
        
        <div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
          <strong style="color: #3b82f6;">Utilidad Práctica (Reglas de Negocio):</strong><br>
          <span style="color: var(--text-secondary); font-size: 0.9rem;">Las propiedades matemáticas definen el comportamiento de las reglas del software. Si una relación es antisimétrica, se evitan reportes vengativos. Si es transitiva, se pueden programar motores de prerrequisitos académicos.</span>
        </div>

        <div style="background: rgba(168, 85, 247, 0.1); border-left: 4px solid #a855f7; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
          <strong style="color: #a855f7;">Explicación Matemática:</strong><br>
          <span style="color: var(--text-secondary); font-size: 0.9rem;">
            Sea R una relación sobre A:
            <ul style="margin-top: 0.5rem; margin-bottom: 0; padding-left: 1.5rem;">
              <li><strong>Irreflexiva:</strong> ∀x ∈ A, (x,x) ∉ R. (Ej. un tutor no puede auto-reservarse).</li>
              <li><strong>Antisimétrica:</strong> Si (x,y) ∈ R ⇒ (y,x) ∉ R. Flechas en un sentido.</li>
              <li><strong>Transitiva:</strong> (x,y) ∈ R ∧ (y,z) ∈ R ⇒ (x,z) ∈ R.</li>
              <li><strong>Simétrica:</strong> (x,y) ∈ R ⇒ (y,x) ∈ R. Bidireccionalidad.</li>
              <li><strong>De Equivalencia:</strong> Reflexiva, Simétrica y Transitiva. Particiones.</li>
            </ul>
          </span>
        </div>

        <div style="background: #000; padding: 1rem; border-radius: 8px; font-family: monospace; color: var(--text-secondary); margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.1);">
          <span style="color: #c678dd;">bool</span> <span style="color: #61afef;">esAntisimetrica</span>(<span style="color: #e5c07b;">String</span> a, <span style="color: #e5c07b;">String</span> b, <span style="color: #e5c07b;">List</span>&lt;<span style="color: #e5c07b;">Map</span>&gt; reps) {<br>
          &nbsp;&nbsp;<span style="color: #c678dd;">bool</span> aRb = reps.<span style="color: #56b6c2;">any</span>((r) =&gt; r[<span style="color: #98c379;">'o'</span>] == a &amp;&amp; r[<span style="color: #98c379;">'d'</span>] == b);<br>
          &nbsp;&nbsp;<span style="color: #c678dd;">bool</span> bRa = reps.<span style="color: #56b6c2;">any</span>((r) =&gt; r[<span style="color: #98c379;">'o'</span>] == b &amp;&amp; r[<span style="color: #98c379;">'d'</span>] == a);<br>
          &nbsp;&nbsp;<span style="color: #c678dd;">return</span> !(aRb &amp;&amp; bRa); <span style="color: #64748b;">// Si A reporta a B, B no puede a A</span><br>
          }
        </div>

        <div style="background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border-glass); position: relative;">
          
          <svg style="width:0; height:0; position:absolute;">
            <defs>
              <marker id="white-arrow" markerWidth="8" markerHeight="8" refX="22" refY="4" orient="auto">
                <polygon points="0 0, 8 4, 0 8" fill="#ffffff" />
              </marker>
              <marker id="white-arrow-loop" markerWidth="8" markerHeight="8" refX="14" refY="4" orient="auto">
                <polygon points="0 0, 8 4, 0 8" fill="#ffffff" />
              </marker>
            </defs>
          </svg>

          <!-- Slides -->
          <!-- 1. Irreflexiva -->
          <div id="prop-slide-1" class="prop-slide" style="display: block;">
            <h4 style="color: var(--accent-primary); margin-bottom: 1.5rem; font-size: 1.5rem;">1. Irreflexiva</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 2rem;">
              <div style="flex: 1; min-width: 280px;">
                <p style="margin-bottom: 0.5rem;"><strong>Matemática:</strong> ∀x ∈ A, (x,x) ∉ R</p>
                <p style="margin-bottom: 1.5rem;"><strong>Regla Matricial:</strong> Diagonal principal nula (r_ii = 0)</p>
                <div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid var(--accent-primary); padding: 1rem; border-radius: 0 8px 8px 0;">
                  <strong style="color: var(--accent-primary);">Utilidad en Vecta:</strong><br>
                  Previene fraudes de auto-suscripción. Un usuario no puede agregarse a sí mismo a su lista de tutores (ni auto-calificarse).
                </div>
              </div>
              
              <div style="flex: 1.5; display: flex; gap: 1rem; min-width: 320px;">
                <!-- Matriz Card -->
                <div style="flex: 1; background: #0f172a; border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 1.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <h5 style="color: #94a3b8; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1px; margin-bottom: 1.5rem;">Matriz Representativa</h5>
                  <div style="background: #020617; padding: 1rem; border-radius: 8px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;">
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#ef4444; font-weight:bold; font-family:monospace; border:1px solid #ef4444;">0</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#3b82f6; font-weight:bold; font-family:monospace; border:1px solid #3b82f6;">1</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#64748b; font-family:monospace;">0</div>
                    
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#3b82f6; font-weight:bold; font-family:monospace; border:1px solid #3b82f6;">1</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#ef4444; font-weight:bold; font-family:monospace; border:1px solid #ef4444;">0</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#64748b; font-family:monospace;">0</div>
                    
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#64748b; font-family:monospace;">0</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#64748b; font-family:monospace;">0</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#ef4444; font-weight:bold; font-family:monospace; border:1px solid #ef4444;">0</div>
                  </div>
                </div>

                <!-- Digrafo Card -->
                <div style="flex: 1; background: #0f172a; border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 1.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <h5 style="color: #94a3b8; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1px; margin-bottom: 1.5rem;">Dígrafo</h5>
                  <svg width="150" height="150" viewBox="0 0 150 150">
                    <circle cx="50" cy="110" r="14" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
                    <text x="50" y="115" fill="white" font-size="12" font-family="monospace" text-anchor="middle">1</text>

                    <circle cx="100" cy="40" r="14" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
                    <text x="100" y="45" fill="white" font-size="12" font-family="monospace" text-anchor="middle">2</text>

                    <circle cx="120" cy="110" r="14" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
                    <text x="120" y="115" fill="white" font-size="12" font-family="monospace" text-anchor="middle">3</text>

                    <!-- Curved bidirectional lines -->
                    <path d="M 50 110 Q 60 70 100 40" fill="none" stroke="#3b82f6" stroke-width="2" marker-end="url(#white-arrow)"/>
                    <path d="M 100 40 Q 90 80 50 110" fill="none" stroke="#3b82f6" stroke-width="2" marker-end="url(#white-arrow)"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. Antisimétrica -->
          <div id="prop-slide-2" class="prop-slide" style="display: none;">
            <h4 style="color: var(--accent-primary); margin-bottom: 1.5rem; font-size: 1.5rem;">2. Antisimétrica</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 2rem;">
              <div style="flex: 1; min-width: 280px;">
                <p style="margin-bottom: 0.5rem;"><strong>Matemática:</strong> ∀x,y ∈ A, (x,y) ∈ R ∧ (y,x) ∈ R ⇒ x = y</p>
                <p style="margin-bottom: 1.5rem;"><strong>Regla Matricial:</strong> Si M_ij = 1 ⇒ M_ji = 0</p>
                <div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid var(--accent-primary); padding: 1rem; border-radius: 0 8px 8px 0;">
                  <strong style="color: var(--accent-primary);">Utilidad en Vecta:</strong><br>
                  Tribunal de Baneos. Si el alumno A reporta al tutor B, las flechas de acusación van en un solo sentido. El sistema bloquea que B reporte a A como venganza inmediata.
                </div>
              </div>
              
              <div style="flex: 1.5; display: flex; gap: 1rem; min-width: 320px;">
                <!-- Matriz Card -->
                <div style="flex: 1; background: #0f172a; border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 1.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <h5 style="color: #94a3b8; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1px; margin-bottom: 1.5rem;">Matriz Representativa</h5>
                  <div style="background: #020617; padding: 1rem; border-radius: 8px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;">
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#64748b; font-family:monospace;">0</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#3b82f6; font-weight:bold; font-family:monospace; border:1px solid #3b82f6;">1</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#3b82f6; font-weight:bold; font-family:monospace; border:1px solid #3b82f6;">1</div>
                    
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#ef4444; font-weight:bold; font-family:monospace; border:1px solid #ef4444;">0</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#64748b; font-family:monospace;">0</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#3b82f6; font-weight:bold; font-family:monospace; border:1px solid #3b82f6;">1</div>
                    
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#ef4444; font-weight:bold; font-family:monospace; border:1px solid #ef4444;">0</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#ef4444; font-weight:bold; font-family:monospace; border:1px solid #ef4444;">0</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#64748b; font-family:monospace;">0</div>
                  </div>
                </div>

                <!-- Digrafo Card -->
                <div style="flex: 1; background: #0f172a; border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 1.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <h5 style="color: #94a3b8; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1px; margin-bottom: 1.5rem;">Dígrafo</h5>
                  <svg width="150" height="150" viewBox="0 0 150 150">
                    <circle cx="50" cy="110" r="14" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
                    <text x="50" y="115" fill="white" font-size="12" font-family="monospace" text-anchor="middle">1</text>

                    <circle cx="100" cy="40" r="14" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
                    <text x="100" y="45" fill="white" font-size="12" font-family="monospace" text-anchor="middle">2</text>

                    <circle cx="120" cy="110" r="14" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
                    <text x="120" y="115" fill="white" font-size="12" font-family="monospace" text-anchor="middle">3</text>

                    <!-- Curved bidirectional lines -->
                    <path d="M 50 110 Q 60 70 100 40" fill="none" stroke="#3b82f6" stroke-width="2" marker-end="url(#white-arrow)"/>
                    <path d="M 100 40 Q 90 80 50 110" fill="none" stroke="#3b82f6" stroke-width="2" marker-end="url(#white-arrow)"/>
                    <!-- 2 to 3 straight -->
                    <line x1="100" y1="40" x2="120" y2="110" stroke="#3b82f6" stroke-width="2" marker-end="url(#white-arrow)"/>
                    <!-- 1 to 3 straight -->
                    <line x1="50" y1="110" x2="120" y2="110" stroke="#3b82f6" stroke-width="2" marker-end="url(#white-arrow)"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- 3. Transitiva -->
          <div id="prop-slide-3" class="prop-slide" style="display: none;">
            <h4 style="color: var(--accent-primary); margin-bottom: 1.5rem; font-size: 1.5rem;">3. Transitiva</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 2rem;">
              <div style="flex: 1; min-width: 280px;">
                <p style="margin-bottom: 0.5rem;"><strong>Matemática:</strong> ∀x,y,z ∈ A, (x,y) ∈ R ∧ (y,z) ∈ R ⇒ (x,z) ∈ R</p>
                <p style="margin-bottom: 1.5rem;"><strong>Regla Matricial:</strong> Si M_ij = 1 ∧ M_jk = 1 ⇒ M_ik = 1</p>
                <div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid var(--accent-primary); padding: 1rem; border-radius: 0 8px 8px 0;">
                  <strong style="color: var(--accent-primary);">Utilidad en Vecta:</strong><br>
                  Motor de Prerrequisitos. Si Cálculo II requiere Cálculo I, y Cálculo III requiere Cálculo II, el sistema sabe transitivamente que Cálculo III requiere Cálculo I.
                </div>
              </div>
              
              <div style="flex: 1.5; display: flex; gap: 1rem; min-width: 320px;">
                <!-- Matriz Card -->
                <div style="flex: 1; background: #0f172a; border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 1.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <h5 style="color: #94a3b8; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1px; margin-bottom: 1.5rem;">Matriz Representativa</h5>
                  <div style="background: #020617; padding: 1rem; border-radius: 8px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;">
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#64748b; font-family:monospace;">0</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#3b82f6; font-weight:bold; font-family:monospace; border:1px solid #3b82f6;">1</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#a855f7; font-weight:bold; font-family:monospace; border:1px solid #a855f7;">1</div>
                    
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#64748b; font-family:monospace;">0</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#64748b; font-family:monospace;">0</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#3b82f6; font-weight:bold; font-family:monospace; border:1px solid #3b82f6;">1</div>
                    
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#64748b; font-family:monospace;">0</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#64748b; font-family:monospace;">0</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#64748b; font-family:monospace;">0</div>
                  </div>
                </div>

                <!-- Digrafo Card -->
                <div style="flex: 1; background: #0f172a; border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 1.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <h5 style="color: #94a3b8; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1px; margin-bottom: 1.5rem;">Dígrafo</h5>
                  <svg width="150" height="150" viewBox="0 0 150 150">
                    <circle cx="50" cy="110" r="14" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
                    <text x="50" y="115" fill="white" font-size="12" font-family="monospace" text-anchor="middle">1</text>

                    <circle cx="100" cy="40" r="14" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
                    <text x="100" y="45" fill="white" font-size="12" font-family="monospace" text-anchor="middle">2</text>

                    <circle cx="120" cy="110" r="14" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
                    <text x="120" y="115" fill="white" font-size="12" font-family="monospace" text-anchor="middle">3</text>

                    <!-- A to B -->
                    <line x1="57" y1="100" x2="93" y2="50" stroke="#3b82f6" stroke-width="2" marker-end="url(#white-arrow)"/>
                    <!-- B to C -->
                    <line x1="104" y1="53" x2="116" y2="97" stroke="#3b82f6" stroke-width="2" marker-end="url(#white-arrow)"/>
                    <!-- A to C (Transitive) -->
                    <line x1="64" y1="110" x2="106" y2="110" stroke="#a855f7" stroke-width="2" stroke-dasharray="4" marker-end="url(#white-arrow)"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- 4. Reflexiva -->
          <div id="prop-slide-4" class="prop-slide" style="display: none;">
            <h4 style="color: var(--accent-secondary); margin-bottom: 1.5rem; font-size: 1.5rem;">4. Reflexiva</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 2rem;">
              <div style="flex: 1; min-width: 280px;">
                <p style="margin-bottom: 0.5rem;"><strong>Matemática:</strong> ∀x ∈ A, (x,x) ∈ R</p>
                <p style="margin-bottom: 1.5rem;"><strong>Regla Matricial:</strong> Diagonal principal activa (r_ii = 1)</p>
                <div style="background: rgba(6, 182, 212, 0.1); border-left: 4px solid var(--accent-secondary); padding: 1rem; border-radius: 0 8px 8px 0;">
                  <strong style="color: var(--accent-secondary);">Utilidad en Vecta:</strong><br>
                  Estados de Igualdad. Utilizado para mapeo unívoco de tokens de acceso, asegurando que cada usuario tenga permisos propios (UID == Auth.uid).
                </div>
              </div>
              
              <div style="flex: 1.5; display: flex; gap: 1rem; min-width: 320px;">
                <!-- Matriz Card -->
                <div style="flex: 1; background: #0f172a; border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 1.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <h5 style="color: #94a3b8; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1px; margin-bottom: 1.5rem;">Matriz Representativa</h5>
                  <div style="background: #020617; padding: 1rem; border-radius: 8px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;">
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#3b82f6; font-weight:bold; font-family:monospace; border:1px solid #3b82f6;">1</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#3b82f6; font-weight:bold; font-family:monospace; border:1px solid #3b82f6;">1</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#64748b; font-family:monospace;">0</div>
                    
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#64748b; font-family:monospace;">0</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#3b82f6; font-weight:bold; font-family:monospace; border:1px solid #3b82f6;">1</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#64748b; font-family:monospace;">0</div>
                    
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#64748b; font-family:monospace;">0</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#64748b; font-family:monospace;">0</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#3b82f6; font-weight:bold; font-family:monospace; border:1px solid #3b82f6;">1</div>
                  </div>
                </div>

                <!-- Digrafo Card -->
                <div style="flex: 1; background: #0f172a; border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 1.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <h5 style="color: #94a3b8; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1px; margin-bottom: 1.5rem;">Dígrafo</h5>
                  <svg width="150" height="150" viewBox="0 0 150 150">
                    <circle cx="50" cy="110" r="14" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
                    <text x="50" y="115" fill="white" font-size="12" font-family="monospace" text-anchor="middle">1</text>
                    <path d="M 40 100 C 10 70, 0 120, 37 115" fill="none" stroke="white" stroke-width="1.5" marker-end="url(#white-arrow-loop)"/>

                    <circle cx="100" cy="40" r="14" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
                    <text x="100" y="45" fill="white" font-size="12" font-family="monospace" text-anchor="middle">2</text>
                    <path d="M 110 30 C 140 0, 140 50, 114 43" fill="none" stroke="white" stroke-width="1.5" marker-end="url(#white-arrow-loop)"/>

                    <circle cx="120" cy="110" r="14" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
                    <text x="120" y="115" fill="white" font-size="12" font-family="monospace" text-anchor="middle">3</text>
                    <path d="M 130 100 C 160 80, 160 140, 134 117" fill="none" stroke="white" stroke-width="1.5" marker-end="url(#white-arrow-loop)"/>

                    <!-- 1 to 2 straight -->
                    <line x1="50" y1="110" x2="100" y2="40" stroke="#3b82f6" stroke-width="2" marker-end="url(#white-arrow)"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- 5. Simétrica -->
          <div id="prop-slide-5" class="prop-slide" style="display: none;">
            <h4 style="color: var(--accent-secondary); margin-bottom: 1.5rem; font-size: 1.5rem;">5. Simétrica</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 2rem;">
              <div style="flex: 1; min-width: 280px;">
                <p style="margin-bottom: 0.5rem;"><strong>Matemática:</strong> ∀x,y ∈ A, (x,y) ∈ R ⇒ (y,x) ∈ R</p>
                <p style="margin-bottom: 1.5rem;"><strong>Regla Matricial:</strong> Matriz Espejo (M_R = M_R^T)</p>
                <div style="background: rgba(6, 182, 212, 0.1); border-left: 4px solid var(--accent-secondary); padding: 1rem; border-radius: 0 8px 8px 0;">
                  <strong style="color: var(--accent-secondary);">Utilidad en Vecta:</strong><br>
                  Mensajería Bidireccional. Si un estudiante inicia un chat con un tutor (A->B), se abre automáticamente el canal de vuelta (B->A). Previene spam de una sola vía.
                </div>
              </div>
              
              <div style="flex: 1.5; display: flex; gap: 1rem; min-width: 320px;">
                <!-- Matriz Card -->
                <div style="flex: 1; background: #0f172a; border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 1.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <h5 style="color: #94a3b8; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1px; margin-bottom: 1.5rem;">Matriz Representativa</h5>
                  <div style="background: #020617; padding: 1rem; border-radius: 8px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;">
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#64748b; font-family:monospace;">0</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#3b82f6; font-weight:bold; font-family:monospace; border:1px solid #3b82f6;">1</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#64748b; font-family:monospace;">0</div>
                    
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#3b82f6; font-weight:bold; font-family:monospace; border:1px solid #3b82f6;">1</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#64748b; font-family:monospace;">0</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#64748b; font-family:monospace;">0</div>
                    
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#64748b; font-family:monospace;">0</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#64748b; font-family:monospace;">0</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#64748b; font-family:monospace;">0</div>
                  </div>
                </div>

                <!-- Digrafo Card -->
                <div style="flex: 1; background: #0f172a; border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 1.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <h5 style="color: #94a3b8; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1px; margin-bottom: 1.5rem;">Dígrafo</h5>
                  <svg width="150" height="150" viewBox="0 0 150 150">
                    <circle cx="50" cy="110" r="14" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
                    <text x="50" y="115" fill="white" font-size="12" font-family="monospace" text-anchor="middle">1</text>
                    <path d="M 40 100 C 10 70, 0 120, 37 115" fill="none" stroke="white" stroke-width="1.5" marker-end="url(#white-arrow-loop)"/>

                    <circle cx="100" cy="40" r="14" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
                    <text x="100" y="45" fill="white" font-size="12" font-family="monospace" text-anchor="middle">2</text>
                    <path d="M 110 30 C 140 0, 140 50, 114 43" fill="none" stroke="white" stroke-width="1.5" marker-end="url(#white-arrow-loop)"/>

                    <circle cx="120" cy="110" r="14" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
                    <text x="120" y="115" fill="white" font-size="12" font-family="monospace" text-anchor="middle">3</text>
                    <path d="M 130 100 C 160 80, 160 140, 134 117" fill="none" stroke="white" stroke-width="1.5" marker-end="url(#white-arrow-loop)"/>

                    <!-- Bidirectional curved lines 1 and 2 -->
                    <path d="M 50 110 Q 60 70 100 40" fill="none" stroke="#3b82f6" stroke-width="2" marker-end="url(#white-arrow)"/>
                    <path d="M 100 40 Q 90 80 50 110" fill="none" stroke="#3b82f6" stroke-width="2" marker-end="url(#white-arrow)"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- 6. Equivalencia -->
          <div id="prop-slide-6" class="prop-slide" style="display: none;">
            <h4 style="background: var(--accent-gradient); -webkit-background-clip: text; color: transparent; margin-bottom: 1.5rem; font-size: 1.5rem;">6. Relación de Equivalencia</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 2rem;">
              <div style="flex: 1; min-width: 280px;">
                <p style="margin-bottom: 0.5rem;"><strong>Matemática:</strong> Debe cumplir simultáneamente: Reflexiva + Simétrica + Transitiva</p>
                <div style="background: linear-gradient(90deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1)); border-left: 4px solid #fff; padding: 1rem; border-radius: 0 8px 8px 0; margin-top: 1.5rem;">
                  <strong style="color: white;">Utilidad en Vecta:</strong><br>
                  Agrupación y particiones. Divide a los estudiantes en "Clases de Equivalencia" disjuntas (Ej: Por Facultad o Carrera) para asignación de foros y tutorías masivas cerradas.
                </div>
              </div>
              
              <div style="flex: 1.5; display: flex; gap: 1rem; min-width: 320px;">
                <!-- Matriz Card -->
                <div style="flex: 1; background: #0f172a; border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 1.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <h5 style="color: #94a3b8; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1px; margin-bottom: 1.5rem;">Matriz Representativa</h5>
                  <div style="background: #020617; padding: 1rem; border-radius: 8px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;">
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#3b82f6; font-weight:bold; font-family:monospace; border:1px solid #3b82f6;">1</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#3b82f6; font-weight:bold; font-family:monospace; border:1px solid #3b82f6;">1</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#3b82f6; font-weight:bold; font-family:monospace; border:1px solid #3b82f6;">1</div>
                    
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#3b82f6; font-weight:bold; font-family:monospace; border:1px solid #3b82f6;">1</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#3b82f6; font-weight:bold; font-family:monospace; border:1px solid #3b82f6;">1</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#3b82f6; font-weight:bold; font-family:monospace; border:1px solid #3b82f6;">1</div>
                    
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#3b82f6; font-weight:bold; font-family:monospace; border:1px solid #3b82f6;">1</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#3b82f6; font-weight:bold; font-family:monospace; border:1px solid #3b82f6;">1</div>
                    <div style="width:40px; height:40px; background:#1e293b; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#3b82f6; font-weight:bold; font-family:monospace; border:1px solid #3b82f6;">1</div>
                  </div>
                </div>

                <!-- Digrafo Card -->
                <div style="flex: 1; background: #0f172a; border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 1.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <h5 style="color: #94a3b8; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1px; margin-bottom: 1.5rem;">Dígrafo (K₃)</h5>
                  <svg width="150" height="150" viewBox="0 0 150 150">
                    <!-- Bidirectional 1 and 2 -->
                    <path d="M 50 110 Q 60 70 100 40" fill="none" stroke="#3b82f6" stroke-width="2" marker-end="url(#white-arrow)"/>
                    <path d="M 100 40 Q 90 80 50 110" fill="none" stroke="#3b82f6" stroke-width="2" marker-end="url(#white-arrow)"/>

                    <!-- Bidirectional 2 and 3 -->
                    <path d="M 100 40 Q 120 70 120 110" fill="none" stroke="#3b82f6" stroke-width="2" marker-end="url(#white-arrow)"/>
                    <path d="M 120 110 Q 100 80 100 40" fill="none" stroke="#3b82f6" stroke-width="2" marker-end="url(#white-arrow)"/>

                    <!-- Bidirectional 1 and 3 -->
                    <path d="M 50 110 Q 85 95 120 110" fill="none" stroke="#3b82f6" stroke-width="2" marker-end="url(#white-arrow)"/>
                    <path d="M 120 110 Q 85 125 50 110" fill="none" stroke="#3b82f6" stroke-width="2" marker-end="url(#white-arrow)"/>

                    <circle cx="50" cy="110" r="14" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
                    <text x="50" y="115" fill="white" font-size="12" font-family="monospace" text-anchor="middle">1</text>
                    <path d="M 40 100 C 10 70, 0 120, 37 115" fill="none" stroke="white" stroke-width="1.5" marker-end="url(#white-arrow-loop)"/>

                    <circle cx="100" cy="40" r="14" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
                    <text x="100" y="45" fill="white" font-size="12" font-family="monospace" text-anchor="middle">2</text>
                    <path d="M 110 30 C 140 0, 140 50, 114 43" fill="none" stroke="white" stroke-width="1.5" marker-end="url(#white-arrow-loop)"/>

                    <circle cx="120" cy="110" r="14" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
                    <text x="120" y="115" fill="white" font-size="12" font-family="monospace" text-anchor="middle">3</text>
                    <path d="M 130 100 C 160 80, 160 140, 134 117" fill="none" stroke="white" stroke-width="1.5" marker-end="url(#white-arrow-loop)"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; margin-top: 2rem;">
            <button class="btn btn-outline" id="btn-prev-slide">Anterior</button>
            <div style="color: var(--text-secondary); display: flex; align-items: center; font-weight: bold;" id="slide-counter">1 / 6</div>
            <button class="btn btn-primary" id="btn-next-slide">Siguiente</button>
          </div>
        </div>

      </div>
    </section>
  `;
}

export function initGrafosLogic() {
  const nodes = document.querySelectorAll('.graph-node');
  const svgEdges = document.getElementById('graph-edges')!;
  const btnLimpiar = document.getElementById('btn-limpiar-grafo')!;
  
  const matrizBody = document.querySelector('#matriz-relacion tbody')!;
  const sumOut = document.getElementById('sum-deg-out')!;
  const sumIn = document.getElementById('sum-deg-in')!;
  const totalR = document.getElementById('total-r')!;

  const nodeData = ['Ana', 'Nieves', 'Carlos'];
  let matrix = [
    [0, 0, 0], // Ana
    [0, 0, 0], // Nieves
    [0, 0, 0]  // Carlos
  ];

  let originNode: HTMLElement | null = null;

  const getCenter = (el: HTMLElement) => {
    const parentRect = el.parentElement!.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    return {
      x: elRect.left - parentRect.left + (elRect.width / 2),
      y: elRect.top - parentRect.top + (elRect.height / 2)
    };
  };

  const drawEdges = () => {
    svgEdges.innerHTML = `<defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="var(--accent-primary)" />
      </marker>
    </defs>`;
    
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        if(matrix[i][j] === 1) {
          const origin = document.querySelector(`.graph-node[data-id="${nodeData[i]}"]`) as HTMLElement;
          const target = document.querySelector(`.graph-node[data-id="${nodeData[j]}"]`) as HTMLElement;
          const oPos = getCenter(origin);
          const tPos = getCenter(target);
          
          if(i === j) {
            // self loop
            svgEdges.innerHTML += `<path d="M ${oPos.x} ${oPos.y - 15} C ${oPos.x - 40} ${oPos.y - 60}, ${oPos.x + 40} ${oPos.y - 60}, ${oPos.x} ${oPos.y - 15}" fill="none" stroke="var(--accent-primary)" stroke-width="2" marker-end="url(#arrowhead)" />`;
          } else {
            // Check if reverse exists for curved line
            const curveFactor = matrix[j][i] === 1 ? 20 : 0;
            // Simplified straight line or slight curve
            svgEdges.innerHTML += `<path d="M ${oPos.x} ${oPos.y} Q ${(oPos.x + tPos.x)/2 + curveFactor} ${(oPos.y + tPos.y)/2 - curveFactor} ${tPos.x} ${tPos.y}" fill="none" stroke="var(--accent-primary)" stroke-width="2" marker-end="url(#arrowhead)" />`;
          }
        }
      }
    }
  };

  const updateMatrixUI = () => {
    matrizBody.innerHTML = '';
    let totalOut = 0;
    
    let inDegrees = [0, 0, 0];

    for(let i = 0; i < 3; i++) {
      let rowHtml = `<tr><td style="padding: 0.5rem; font-weight: bold; border-right: 1px solid var(--border-glass);">${nodeData[i]}</td>`;
      for(let j = 0; j < 3; j++) {
        const val = matrix[i][j];
        if(val === 1) {
          totalOut++;
          inDegrees[j]++;
        }
        const color = val === 1 ? 'var(--accent-primary)' : 'var(--text-secondary)';
        rowHtml += `<td style="padding: 0.5rem; color: ${color};">${val}</td>`;
      }
      rowHtml += `</tr>`;
      matrizBody.innerHTML += rowHtml;
    }
    
    let totalIn = inDegrees.reduce((a, b) => a + b, 0);

    sumOut.innerText = totalOut.toString();
    sumIn.innerText = totalIn.toString();
    totalR.innerText = totalOut.toString();
  };

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      if(!originNode) {
        originNode = node as HTMLElement;
        originNode.style.boxShadow = '0 0 15px var(--accent-primary)';
      } else {
        const targetNode = node as HTMLElement;
        const oIndex = nodeData.indexOf(originNode.getAttribute('data-id')!);
        const tIndex = nodeData.indexOf(targetNode.getAttribute('data-id')!);
        
        matrix[oIndex][tIndex] = 1;
        
        originNode.style.boxShadow = 'none';
        originNode = null;
        
        drawEdges();
        updateMatrixUI();
      }
    });
  });

  btnLimpiar.addEventListener('click', () => {
    matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    if(originNode) {
      originNode.style.boxShadow = 'none';
      originNode = null;
    }
    drawEdges();
    updateMatrixUI();
  });

  updateMatrixUI();

  // Carousel Logic
  let currentSlide = 1;
  const totalSlides = 6;
  const slideCounter = document.getElementById('slide-counter')!;
  
  const showSlide = (n: number) => {
    for(let i=1; i<=totalSlides; i++) {
      document.getElementById(`prop-slide-${i}`)!.style.display = i === n ? 'block' : 'none';
    }
    slideCounter.innerText = `${n} / ${totalSlides}`;
  };

  document.getElementById('btn-prev-slide')!.addEventListener('click', () => {
    currentSlide = currentSlide > 1 ? currentSlide - 1 : totalSlides;
    showSlide(currentSlide);
  });

  document.getElementById('btn-next-slide')!.addEventListener('click', () => {
    currentSlide = currentSlide < totalSlides ? currentSlide + 1 : 1;
    showSlide(currentSlide);
  });
}
