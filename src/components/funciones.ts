export function renderFunciones(): string {
  return `
    <section id="funciones" class="section">
      <h2 class="section-title">5. Funciones y Pipeline de Datos</h2>
      
      <div class="glass-panel" style="margin-bottom: 2rem;">
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
          El sistema opera bajo diversas lógicas funcionales que mapean dominios (entradas) a codominios (salidas). Las funciones garantizan el determinismo en el software: para una misma entrada, siempre habrá una misma salida.
        </p>

        <!-- Teoría de Funciones y Biyecciones -->
        <h3 style="margin-bottom: 1.5rem; color: white;">5.1 Tipos de Funciones</h3>
        <div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
          <strong style="color: #3b82f6;">Utilidad Práctica (Mapeo de Datos):</strong><br>
          <span style="color: var(--text-secondary); font-size: 0.9rem;">Las funciones garantizan el determinismo. La biyección asegura que los Tokens de Sesión (JWT) mapeen de forma única a un usuario y viceversa.</span>
        </div>

        <div style="background: rgba(168, 85, 247, 0.1); border-left: 4px solid #a855f7; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
          <strong style="color: #a855f7;">Explicación Matemática:</strong><br>
          <span style="color: var(--text-secondary); font-size: 0.9rem;">
            <ul style="margin-top: 0.5rem; margin-bottom: 0; padding-left: 1.5rem;">
              <li><strong>Inyectiva:</strong> f(x₁) = f(x₂) ⇒ x₁ = x₂. (Ej. Asignación de UUIDs únicos).</li>
              <li><strong>Suprayectiva:</strong> ∀y ∈ B, ∃x ∈ A tal que f(x) = y. (Ej. Todas las facultades deben tener al menos un estudiante).</li>
              <li><strong>Biyectiva:</strong> Es inyectiva y suprayectiva a la vez. Admite función inversa f⁻¹(y) = x. (Ej. Relación estricta 1:1 entre Usuario y Token JWT).</li>
            </ul>
          </span>
        </div>

        <div style="background: #000; padding: 1rem; border-radius: 8px; font-family: monospace; color: var(--text-secondary); margin-bottom: 3rem; border: 1px solid rgba(255,255,255,0.1);">
          <span style="color: #c678dd;">String</span> <span style="color: #61afef;">obtenerUsuarioPorToken</span>(<span style="color: #c678dd;">String</span> tokenJwt) {<br>
          &nbsp;&nbsp;<span style="color: #64748b;">// f⁻¹(y): Al ser biyectiva, regresamos al origen con 100% certeza</span><br>
          &nbsp;&nbsp;<span style="color: #c678dd;">return</span> auth.decodificar(tokenJwt).<span style="color: #e5c07b;">uid</span>;<br>
          }
        </div>

        <!-- 5.2 Composición Gráfica (Screenshot 2) -->
        <h3 style="margin-bottom: 1.5rem; color: white;">5.2 Composición de Funciones (Pipeline / Minería de Datos)</h3>
        
        <div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
          <strong style="color: #3b82f6;">Utilidad Práctica (Análisis en Cascada):</strong><br>
          <span style="color: var(--text-secondary); font-size: 0.9rem;">El algoritmo predictivo ayuda a estimar la Tasa de Ausencias Mensual según tendencias de uso o ejecutar transacciones atómicas seguras en Firebase (Cloud Functions).</span>
        </div>

        <div style="background: rgba(168, 85, 247, 0.1); border-left: 4px solid #a855f7; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
          <strong style="color: #a855f7;">Explicación Matemática:</strong><br>
          <span style="color: var(--text-secondary); font-size: 0.9rem;">
            La composición (g ∘ f) aplica sucesivamente funciones.
            <ul style="margin-top: 0.5rem; margin-bottom: 0; padding-left: 1.5rem;">
              <li><strong>f(x) = 20x + 5:</strong> Predice cupos en el mes x.</li>
              <li><strong>g(y) = y / 4:</strong> Predice ausencias dado y cupos.</li>
              <li><strong>Compuesta (g ∘ f)(x):</strong> g(20x + 5) = (20x + 5) / 4 = 5x + 1.25</li>
            </ul>
          </span>
        </div>

        <div style="background: #000; padding: 1rem; border-radius: 8px; font-family: monospace; color: var(--text-secondary); margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.1);">
          <span style="color: #c678dd;">double</span> <span style="color: #61afef;">predecirTasaAusencias</span>(<span style="color: #c678dd;">double</span> x) {<br>
          &nbsp;&nbsp;<span style="color: #c678dd;">double</span> f(<span style="color: #c678dd;">double</span> x) =&gt; (<span style="color: #d19a66;">20</span> * x) + <span style="color: #d19a66;">5</span>; <span style="color: #64748b;">// Función Interna</span><br>
          &nbsp;&nbsp;<span style="color: #c678dd;">double</span> g(<span style="color: #c678dd;">double</span> y) =&gt; y / <span style="color: #d19a66;">4</span>;        <span style="color: #64748b;">// Función Externa</span><br>
          &nbsp;&nbsp;<span style="color: #c678dd;">return</span> <span style="color: #56b6c2;">g</span>(<span style="color: #56b6c2;">f</span>(x)); <span style="color: #64748b;">// Composición Completa (g ∘ f)(x)</span><br>
          }
        </div>
        
        <p style="color: var(--text-secondary); margin-bottom: 2rem;">
          Las aplicaciones modernas raras veces ejecutan una sola función. En su lugar, utilizan la composición matemática para su Pipeline de datos, uniendo microservicios:
        </p>

        <div style="background: rgba(0,0,0,0.3); padding: 3rem; border-radius: 12px; border: 1px solid var(--border-glass);">
          
          <!-- Top Flow Diagram -->
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4rem; position: relative;">
            
            <!-- Estudiante (x) -->
            <div style="display: flex; flex-direction: column; align-items: center; z-index: 2; width: 120px;">
              <div style="width: 80px; height: 80px; background: rgba(168, 85, 247, 0.1); border: 2px solid #a855f7; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                <svg width="32" height="32" style="color: #a855f7;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <strong style="color: white; font-size: 0.95rem;">Estudiante (x)</strong>
              <span style="color: #64748b; font-size: 0.7rem; letter-spacing: 1px; text-transform: uppercase;">Origen</span>
            </div>

            <!-- f(x) Connector -->
            <div style="flex: 1; height: 2px; background: linear-gradient(90deg, #a855f7 0%, #3b82f6 100%); position: relative; margin: 0 -30px; top: -20px; z-index: 1;">
              <div style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #1e293b; padding: 0.2rem 0.8rem; border-radius: 20px; color: white; font-family: monospace; font-size: 0.85rem; border: 1px solid #3b82f6;">f(x)</div>
            </div>

            <!-- Sol. Huérfana (y) -->
            <div style="display: flex; flex-direction: column; align-items: center; z-index: 2; width: 120px;">
              <div style="width: 80px; height: 80px; background: rgba(59, 130, 246, 0.1); border: 2px solid #3b82f6; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                <svg width="32" height="32" style="color: #3b82f6;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </div>
              <strong style="color: white; font-size: 0.95rem;">Sol. Huérfana (y)</strong>
              <span style="color: #64748b; font-size: 0.7rem; letter-spacing: 1px; text-transform: uppercase;">Cloud (Bolsa)</span>
            </div>

            <!-- g(y) Connector -->
            <div style="flex: 1; height: 2px; background: linear-gradient(90deg, #3b82f6 0%, #10b981 100%); position: relative; margin: 0 -30px; top: -20px; z-index: 1;">
              <div style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #1e293b; padding: 0.2rem 0.8rem; border-radius: 20px; color: white; font-family: monospace; font-size: 0.85rem; border: 1px solid #10b981;">g(y)</div>
            </div>

            <!-- Tutor Asignado (z) -->
            <div style="display: flex; flex-direction: column; align-items: center; z-index: 2; width: 120px; position: relative;">
              <svg style="position: absolute; top: -15px; right: 15px; color: #fbbf24;" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              <div style="width: 80px; height: 80px; background: rgba(16, 185, 129, 0.1); border: 2px solid #10b981; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                <svg width="32" height="32" style="color: #10b981;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
              </div>
              <strong style="color: white; font-size: 0.95rem;">Tutor Asignado (z)</strong>
              <span style="color: #64748b; font-size: 0.7rem; letter-spacing: 1px; text-transform: uppercase;">Destino Final</span>
            </div>

          </div>

          <!-- Bottom Detail Cards -->
          <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
            
            <!-- f(x) Card -->
            <div style="flex: 1; min-width: 280px; background: #0f172a; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column;">
              <div style="color: #a855f7; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">Función f(x)</div>
              <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.8rem; line-height: 1.5;">
                <strong style="color: white;">Problema:</strong> Crear una solicitud de tutoría en estado pendiente y registrarla en el sistema.
              </p>
              <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.8rem; line-height: 1.5;">
                <strong style="color: white;">Por qué:</strong> Desvincula la creación de la tutoría de la búsqueda activa del tutor, guardando la solicitud de manera asíncrona sin bloquear la UX del alumno.
              </p>
              <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem; line-height: 1.5;">
                <strong style="color: white;">Matemática:</strong> Sea <em>A</em> el conjunto de estudiantes y <em>B</em> el conjunto de solicitudes: <code>f: A → B</code>, tal que<br>
                <code style="color: #a855f7;">f(estudiante) = solicitud_huerfana</code>.
              </p>
              <div style="margin-top: auto; background: #020617; text-align: center; padding: 1rem; border-radius: 6px; font-family: monospace; color: white;">
                f(x) = y
              </div>
            </div>

            <!-- g(y) Card -->
            <div style="flex: 1; min-width: 280px; background: #0f172a; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column;">
              <div style="color: #3b82f6; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">Función g(y)</div>
              <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.8rem; line-height: 1.5;">
                <strong style="color: white;">Problema:</strong> Asignar un tutor libre al requerimiento pendiente resguardando la exclusividad.
              </p>
              <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.8rem; line-height: 1.5;">
                <strong style="color: white;">Por qué:</strong> Evita condiciones de carrera (race conditions) donde dos tutores reclaman concurrentemente una misma clase, resolviéndolo mediante una transacción atómica.
              </p>
              <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem; line-height: 1.5;">
                <strong style="color: white;">Matemática:</strong> Sea <em>B</em> el conjunto de solicitudes y <em>C</em> el conjunto de tutores: <code>g: B → C</code>, tal que<br>
                <code style="color: #3b82f6;">g(solicitud_huerfana) = tutor_asignado</code>.
              </p>
              <div style="margin-top: auto; background: #020617; text-align: center; padding: 1rem; border-radius: 6px; font-family: monospace; color: white;">
                g(y) = z
              </div>
            </div>

            <!-- g(f(x)) Card -->
            <div style="flex: 1; min-width: 280px; background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; position: relative;">
              <svg style="position: absolute; top: -10px; right: -10px; color: #10b981; background: #0f172a; border-radius: 50%;" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
              <div style="color: #10b981; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem;">La Composición (g ∘ f)(x)</div>
              <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.8rem; line-height: 1.5;">
                <strong style="color: white;">Problema:</strong> Mapear el flujo integral desde el origen del requerimiento estudiantil hasta el tutor asignado.
              </p>
              <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.8rem; line-height: 1.5;">
                <strong style="color: white;">Por qué:</strong> Modela formalmente la transacción atómica de punta a punta, coordinando la persistencia y gatillando eventos secundarios (notificaciones push).
              </p>
              <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem; line-height: 1.5;">
                <strong style="color: white;">Matemática:</strong> Composición de funciones (g ∘ f): A → C, definida formalmente como:
              </p>
              <div style="margin-top: auto; display: flex; flex-direction: column; gap: 0.5rem;">
                <div style="background: #020617; text-align: center; padding: 1rem; border-radius: 6px; font-family: monospace; color: white;">
                  (g ∘ f)(x) = g(f(x)) = z
                </div>
                <div style="background: #020617; text-align: center; padding: 1rem; border-radius: 6px; font-family: monospace; color: #10b981;">
                  g(f(Estudiante)) = Tutor
                </div>
              </div>
            </div>

          </div>

        </div>

        <!-- XP Table -->
        <div style="background: rgba(0,0,0,0.3); border-radius: 12px; border: 1px solid var(--border-glass); padding: 1.5rem; margin-bottom: 3rem; margin-top: 3rem;">
          <h4 style="color: white; margin-bottom: 1rem;">Tabla de Valores: Puntos de Experiencia (XP)</h4>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">
            Ejemplo numérico de un sistema de gamificación donde <strong>f(x)</strong> calcula los puntos base por horas de tutoría impartidas, y <strong>g(y)</strong> aplica un multiplicador de bonificación por racha semanal.
          </p>
          
          <div style="overflow-x: auto;">
            <table style="width: 100%; text-align: left; border-collapse: collapse; color: var(--text-secondary); font-size: 0.9rem;">
              <thead>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                  <th style="padding: 1rem; color: white;">Horas (x)</th>
                  <th style="padding: 1rem; color: #a855f7;">Puntos Base f(x) = 100x</th>
                  <th style="padding: 1rem; color: #3b82f6;">Multiplicador / Bono g(y) = 1.5y</th>
                  <th style="padding: 1rem; color: #10b981;">Composición (g ∘ f)(x)</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                  <td style="padding: 1rem;">1</td>
                  <td style="padding: 1rem;">100</td>
                  <td style="padding: 1rem;">g(100) = 100 × 1.5</td>
                  <td style="padding: 1rem; color: #10b981; font-weight: bold;">150 XP</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                  <td style="padding: 1rem;">2</td>
                  <td style="padding: 1rem;">200</td>
                  <td style="padding: 1rem;">g(200) = 200 × 1.5</td>
                  <td style="padding: 1rem; color: #10b981; font-weight: bold;">300 XP</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                  <td style="padding: 1rem;">3</td>
                  <td style="padding: 1rem;">300</td>
                  <td style="padding: 1rem;">g(300) = 300 × 1.5</td>
                  <td style="padding: 1rem; color: #10b981; font-weight: bold;">450 XP</td>
                </tr>
                <tr>
                  <td style="padding: 1rem;">4</td>
                  <td style="padding: 1rem;">400</td>
                  <td style="padding: 1rem;">g(400) = 400 × 1.5</td>
                  <td style="padding: 1rem; color: #10b981; font-weight: bold;">600 XP</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 5.3 Ejemplo Interactivo (Seguridad) -->
        <h3 style="margin-top: 4rem; margin-bottom: 1.5rem; color: white;">5.3 Ejemplo Práctico Interactivo: Middleware de Seguridad</h3>
        <p style="color: var(--text-secondary); margin-bottom: 2rem;">
          Además de los flujos asíncronos con Cloud Functions, la composición <code>(g ∘ f)</code> es fundamental para el procesamiento en tiempo real de los datos del usuario. Pruébalo tú mismo ingresando una contraseña a continuación:
        </p>
        
        <div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid var(--accent-primary); padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 2rem;">
          <strong style="color: var(--accent-primary);">Aplicación en Vecta (Middleware de Seguridad):</strong><br>
          Cuando un usuario ingresa una contraseña bruta <strong>(x)</strong>, no la guardamos directo. Primero pasa por una función <strong>f(x)</strong> que la sanitiza (ej. quita espacios laterales). Luego, ese resultado pasa a una función <strong>g(y)</strong> que aplica un algoritmo de encriptación o hashing. El resultado final seguro en BD es matemáticamente <strong>(g ∘ f)(x)</strong>.
        </div>

        <div style="background: rgba(0,0,0,0.3); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border-glass);">
          <h4 style="margin-bottom: 1.5rem; text-align: center; color: var(--text-secondary);">Módulo Interactivo: Pipeline de Encriptación (g ∘ f)</h4>
          
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; justify-content: center;">
            
            <div style="flex: 1; text-align: center; min-width: 180px; background: rgba(0,0,0,0.4); padding: 1.5rem; border-radius: 8px; border: 1px dashed var(--border-glass);">
              <div style="color: var(--text-secondary); margin-bottom: 0.5rem; font-size: 0.8rem;">Entrada Cruda (x)</div>
              <input type="text" id="input-pass" value=" Hola Mundo " class="glass-input" style="width: 100%; text-align: center; font-family: monospace;">
              <div style="color: #64748b; font-size: 0.7rem; margin-top: 0.5rem;">(Prueba a escribir con espacios)</div>
            </div>

            <div style="font-size: 2rem; color: var(--accent-primary);">→</div>

            <div style="flex: 1; text-align: center; min-width: 180px; background: rgba(139, 92, 246, 0.1); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--accent-primary);">
              <div style="color: var(--accent-primary); font-weight: bold; margin-bottom: 0.5rem;">f(x)</div>
              <div style="color: var(--text-secondary); margin-bottom: 0.5rem; font-size: 0.8rem;">Sanitizar (Quita espacios, minúsculas)</div>
              <div id="res-fx" style="font-size: 1.2rem; font-family: monospace; color: white; word-break: break-all;">hola mundo</div>
            </div>

            <div style="font-size: 2rem; color: var(--accent-secondary);">→</div>

            <div style="flex: 1; text-align: center; min-width: 180px; background: rgba(6, 182, 212, 0.1); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--accent-secondary);">
              <div style="color: var(--accent-secondary); font-weight: bold; margin-bottom: 0.5rem;">g(y)</div>
              <div style="color: var(--text-secondary); margin-bottom: 0.5rem; font-size: 0.8rem;">Hashing (Corrimiento + Base64)</div>
              <div id="res-gy" style="font-size: 1.2rem; font-family: monospace; color: white; word-break: break-all;" class="text-gradient">aG9sYW11bmRv</div>
            </div>

          </div>

          <div style="margin-top: 2rem; border-top: 1px solid var(--border-glass); padding-top: 1rem; text-align: center; font-family: monospace; color: var(--text-secondary);">
            Valor guardado en Base de Datos: <strong style="color: white; font-size: 1.2rem;" id="res-gof">aG9sYW11bmRv</strong><br><br>
            Demostración matemática del flujo: <span style="color: var(--accent-secondary);">g(</span><span style="color: var(--accent-primary);">f(x)</span><span style="color: var(--accent-secondary);">)</span>
          </div>
        </div>

      </div>
    </section>
  `;
}

export function initFuncionesLogic() {
  const inputPass = document.getElementById('input-pass') as HTMLInputElement;
  const resFx = document.getElementById('res-fx');
  const resGy = document.getElementById('res-gy');
  const resGof = document.getElementById('res-gof');

  if (!inputPass || !resFx || !resGy || !resGof) return;

  // Función f(x): sanitización
  const fx = (x: string) => x.trim().toLowerCase().replace(/\s+/g, '');

  // Función g(y): "Hashing" simulado con btoa (Base64)
  const gy = (y: string) => {
    if(!y) return '';
    try {
      return btoa(y);
    } catch(e) {
      return 'Error Encoding';
    }
  };

  const updatePipeline = () => {
    const x = inputPass.value;
    const y = fx(x);
    const z = gy(y);

    resFx.innerText = y === '' ? '(Vacío)' : y;
    resGy.innerText = z;
    resGof.innerText = z;
  };

  inputPass.addEventListener('input', updatePipeline);
  updatePipeline();
}
