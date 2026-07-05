export function renderRepresentacion(): string {
  return `
    <section id="representacion" class="section">
      <div style="text-align: center; margin-bottom: 3rem;">
        <h2 style="font-size: 2.5rem; margin-bottom: 1rem;"><span style="color: #10b981;">03.</span> Representación Computacional (Matriz de Relación y Código)</h2>
        <p style="color: var(--text-secondary); max-width: 800px; margin: 0 auto; font-size: 1.1rem; line-height: 1.6;">
          La Matriz de Relación (MR) funciona bajo una regla booleana simple: siempre que exista un 1 hay relación, de lo contrario es 0. 
          Aplicaremos esto al <strong>Registro de Asistencia</strong> de las clases del tutor Roberto.
        </p>
      </div>
      
      <!-- Top Cards -->
      <div style="display: flex; gap: 2rem; flex-wrap: wrap; margin-bottom: 3rem;">
        
        <!-- Card 1: Problema -->
        <div style="flex: 1; min-width: 300px; background: rgba(0,0,0,0.3); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 12px; padding: 2rem; position: relative;">
          <div style="color: #eab308; font-weight: bold; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; text-transform: uppercase; font-size: 0.9rem;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            Problema Práctico
          </div>
          <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 2rem; line-height: 1.6;">
            Contabilizar eficientemente las inasistencias y penalizaciones ("strikes") de los alumnos a las clases programadas por los tutores.
          </p>
          <div style="color: rgba(255,255,255,0.4); font-size: 0.8rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem; position: absolute; bottom: 2rem; width: calc(100% - 4rem);">
            Reto: Evitar consultar y unir millones de documentos históricos cada vez que se requiere auditar el estado de un alumno.
          </div>
        </div>

        <!-- Card 2: Por qué se aplica -->
        <div style="flex: 1; min-width: 300px; background: rgba(0,0,0,0.3); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 12px; padding: 2rem; position: relative;">
          <div style="color: #3b82f6; font-weight: bold; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; text-transform: uppercase; font-size: 0.9rem;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            Por qué se aplica
          </div>
          <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 2rem; line-height: 1.6;">
            La representación en matrices booleanas permite almacenar e interrogar las asistencias en tiempo real con un costo computacional de O(1). Es mucho más rápido sumar los bits de un array indexado que consultar logs históricos completos en colecciones no estructuradas.
          </p>
          <div style="color: rgba(255,255,255,0.4); font-size: 0.8rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem; position: absolute; bottom: 2rem; width: calc(100% - 4rem);">
            Beneficio: Escalabilidad y minimización drástica de lecturas en Firestore.
          </div>
        </div>

        <!-- Card 3: Sustento -->
        <div style="flex: 1; min-width: 300px; background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 2rem;">
          <div style="color: #10b981; font-weight: bold; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; text-transform: uppercase; font-size: 0.9rem;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            Sustento Matemático
          </div>
          <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1rem; line-height: 1.6;">
            Definimos la Matriz de Relación M<sub>R</sub> = [m<sub>ij</sub>] de tamaño n × m, donde para el alumno i y clase j:
          </p>
          <div style="background: rgba(0,0,0,0.5); padding: 0.8rem; border-radius: 6px; text-align: center; font-family: monospace; font-size: 1rem; color: #10b981; margin-bottom: 1rem;">
            m<sub>ij</sub> ∈ {0, 1}
          </div>
          <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1rem; line-height: 1.6;">
            La inasistencia total (strikes) del alumno i a lo largo de m clases se expresa como:
          </p>
          <div style="background: rgba(0,0,0,0.5); padding: 0.8rem; border-radius: 6px; text-align: center; font-family: monospace; font-size: 1rem; color: #10b981;">
            Strikes<sub>i</sub> = Σ<sub>j=1</sub><sup>m</sup> (1 - m<sub>ij</sub>)
          </div>
        </div>

      </div>

      <!-- Bottom Layout: Ejemplo Práctico -->
      <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
        
        <!-- Left: Tabla -->
        <div style="flex: 1; min-width: 350px; background: rgba(0,0,0,0.3); border: 1px solid var(--border-glass); border-radius: 12px; padding: 2rem;">
          <div style="color: #60a5fa; font-weight: bold; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; font-size: 1.2rem;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"></path><path d="M4 10h16"></path><path d="M10 4v16"></path></svg>
            Ejemplo Práctico en Vecta
          </div>
          
          <p style="color: var(--text-secondary); margin-bottom: 1rem; font-size: 0.95rem; line-height: 1.6;">
            Supongamos que el tutor Roberto dicta dos clases (<strong style="color: #10b981;">C1</strong> y <strong style="color: #10b981;">C2</strong>). Tiene tres alumnos inscritos en su <code style="background: rgba(0,0,0,0.5); padding: 0.2rem 0.4rem; border-radius: 4px;">listaDeEstudiantesInscritos</code>: <strong style="color: #c084fc;">Luis, Ana y Pedro.</strong>
          </p>
          
          <ul style="color: var(--text-secondary); margin-bottom: 2rem; list-style: none; padding-left: 0;">
            <li style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;"><svg width="16" height="16" style="color: #10b981;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Luis asistió a C1, pero faltó a C2.</li>
            <li style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;"><svg width="16" height="16" style="color: #10b981;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Ana asistió a ambas.</li>
            <li style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;"><svg width="16" height="16" style="color: #ef4444;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg> Pedro faltó a ambas.</li>
          </ul>

          <div style="text-transform: uppercase; color: #64748b; font-size: 0.8rem; margin-bottom: 1rem; letter-spacing: 1px;">Tabla de Asistencia (Matriz MR)</div>
          
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.95rem;">
            <thead>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); color: #94a3b8;">
                <th style="padding: 1rem 0;">ALUMNO</th>
                <th style="padding: 1rem 0;">C1</th>
                <th style="padding: 1rem 0;">C2</th>
                <th style="padding: 1rem 0; text-align: right;">SUMA DE INASISTENCIAS (0S)</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 1rem 0; color: white;">Luis</td>
                <td style="padding: 1rem 0; color: #10b981; font-family: monospace; font-weight: bold;">1</td>
                <td style="padding: 1rem 0; color: #ef4444; font-family: monospace; font-weight: bold;">0</td>
                <td style="padding: 1rem 0; text-align: right; color: #f59e0b; font-weight: bold;">1 strike</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 1rem 0; color: white;">Ana</td>
                <td style="padding: 1rem 0; color: #10b981; font-family: monospace; font-weight: bold;">1</td>
                <td style="padding: 1rem 0; color: #10b981; font-family: monospace; font-weight: bold;">1</td>
                <td style="padding: 1rem 0; text-align: right; color: #10b981; font-weight: bold;">0 strikes</td>
              </tr>
              <tr>
                <td style="padding: 1rem 0; color: white;">Pedro</td>
                <td style="padding: 1rem 0; color: #ef4444; font-family: monospace; font-weight: bold;">0</td>
                <td style="padding: 1rem 0; color: #ef4444; font-family: monospace; font-weight: bold;">0</td>
                <td style="padding: 1rem 0; text-align: right; color: #ef4444; font-weight: bold;">2 strikes</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Right: Code Snippet -->
        <div style="flex: 1; min-width: 350px;">
          <div style="background: #1e1e1e; border-radius: 12px; overflow: hidden; border: 1px solid #333;">
            <div style="background: #2d2d2d; padding: 0.8rem 1rem; display: flex; align-items: center; gap: 0.5rem; border-bottom: 1px solid #1a1a1a;">
              <div style="width: 12px; height: 12px; border-radius: 50%; background: #ff5f56;"></div>
              <div style="width: 12px; height: 12px; border-radius: 50%; background: #ffbd2e;"></div>
              <div style="width: 12px; height: 12px; border-radius: 50%; background: #27c93f;"></div>
              <div style="color: #8b949e; font-size: 0.8rem; margin-left: 1rem; font-family: monospace; display: flex; align-items: center; gap: 0.4rem;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                registro_asistencia.dart
              </div>
            </div>
            <div style="padding: 1.5rem; font-family: 'Consolas', 'Monaco', monospace; font-size: 0.9rem; line-height: 1.5; color: #d4d4d4; overflow-x: auto;">
<pre style="margin: 0;">
<span style="color: #6a9955;">// Tu código iteraría sobre el registro_asistencia de tutoria_model.dart:</span>

<span style="color: #6a9955;">// Ejemplo conceptual para el informe</span>
<span style="color: #4ec9b0;">List</span>&lt;<span style="color: #4ec9b0;">List</span>&lt;<span style="color: #4ec9b0;">int</span>&gt;&gt; <span style="color: #dcdcaa;">generarMatrizAsistencia</span>(<span style="color: #4ec9b0;">List</span>&lt;<span style="color: #4ec9b0;">String</span>&gt; alumnos, <span style="color: #4ec9b0;">List</span>&lt;<span style="color: #4ec9b0;">String</span>&gt; clases) {
  <span style="color: #4ec9b0;">List</span>&lt;<span style="color: #4ec9b0;">List</span>&lt;<span style="color: #4ec9b0;">int</span>&gt;&gt; matriz = [];

  <span style="color: #c586c0;">for</span> (<span style="color: #569cd6;">var</span> alumno <span style="color: #c586c0;">in</span> alumnos) {
    <span style="color: #4ec9b0;">List</span>&lt;<span style="color: #4ec9b0;">int</span>&gt; filaAlumno = [];
    <span style="color: #c586c0;">for</span> (<span style="color: #569cd6;">var</span> clase <span style="color: #c586c0;">in</span> clases) {
      <span style="color: #6a9955;">// Si el valor en el Map de Firebase es true, agrega 1, si es false (o nulo) agrega 0</span>
      <span style="color: #4ec9b0;">bool</span> asistio = datosFirebase[clase][alumno] ?? <span style="color: #569cd6;">false</span>;
      filaAlumno.<span style="color: #dcdcaa;">add</span>(asistio ? <span style="color: #b5cea8;">1</span> : <span style="color: #b5cea8;">0</span>);
    }
    matriz.<span style="color: #dcdcaa;">add</span>(filaAlumno);
  }
  <span style="color: #c586c0;">return</span> matriz;
}
</pre>
            </div>
            <!-- Scrollbar simulation -->
            <div style="background: #2d2d2d; padding: 0.5rem; display: flex; align-items: center;">
               <div style="width: 100%; height: 12px; background: #1e1e1e; border-radius: 6px; display: flex; padding: 2px;">
                  <div style="width: 40%; height: 100%; background: #444; border-radius: 4px;"></div>
               </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  `;
}
