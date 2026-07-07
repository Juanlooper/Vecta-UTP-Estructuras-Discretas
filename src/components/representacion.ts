export function renderRepresentacion(): string {
  return `
    <section id="representacion" class="section">
      <div style="text-align: center; margin-bottom: 3rem;">
        <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">Representación Computacional (Matriz de Relación y Código)</h2>
        <p style="color: var(--text-secondary); max-width: 800px; margin: 0 auto; font-size: 1.1rem; line-height: 1.6;">
          La Matriz de Relación (MR) funciona bajo una regla booleana simple: siempre que exista un 1 hay relación, de lo contrario es 0. 
          Aplicaremos esto al <strong>Registro de Asistencia</strong> de las clases del tutor Roberto.
        </p>
      </div>
      
      <div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
        <strong style="color: #3b82f6;">Utilidad Práctica:</strong><br>
        <span style="color: var(--text-secondary); font-size: 0.9rem;">Contabilizar de forma eficiente las inasistencias y penalizaciones ("strikes") a tutorías. Almacenar asistencias en matrices booleanas permite consultarlas en O(1), reduciendo lecturas a Firestore.</span>
      </div>

      <div style="background: rgba(168, 85, 247, 0.1); border-left: 4px solid #a855f7; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem;">
        <strong style="color: #a855f7;">Explicación Matemática:</strong><br>
        <span style="color: var(--text-secondary); font-size: 0.9rem;">
          Matriz de relación M<sub>R</sub> = [m<sub>ij</sub>] de tamaño Alumnos × Clases.<br>
          Valor de cada celda m<sub>ij</sub>:<br>
          • <strong>1</strong> = Existe relación (El alumno asistió a la clase).<br>
          • <strong>0</strong> = No hay relación (El alumno faltó a la clase).<br>
          Para calcular las inasistencias (strikes), el algoritmo simplemente cuenta cuántos 0 tiene el alumno en su fila.
        </span>
      </div>

      <div style="background: #000; padding: 1rem; border-radius: 8px; font-family: monospace; color: var(--text-secondary); margin-bottom: 3rem; border: 1px solid rgba(255,255,255,0.1);">
        <span style="color: #c678dd;">List</span>&lt;<span style="color: #e5c07b;">List</span>&lt;<span style="color: #e5c07b;">int</span>&gt;&gt; <span style="color: #61afef;">generarMatrizAsistencia</span>(<span style="color: #e5c07b;">List</span>&lt;<span style="color: #e5c07b;">String</span>&gt; alumnos, <span style="color: #e5c07b;">List</span>&lt;<span style="color: #e5c07b;">String</span>&gt; clases, <span style="color: #e5c07b;">Map</span> datos) {<br>
        &nbsp;&nbsp;<span style="color: #e5c07b;">List</span>&lt;<span style="color: #e5c07b;">List</span>&lt;<span style="color: #e5c07b;">int</span>&gt;&gt; matriz = [];<br>
        &nbsp;&nbsp;<span style="color: #c586c0;">for</span> (<span style="color: #c678dd;">var</span> alumno <span style="color: #c586c0;">in</span> alumnos) {<br>
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #e5c07b;">List</span>&lt;<span style="color: #e5c07b;">int</span>&gt; fila = [];<br>
        &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #c586c0;">for</span> (<span style="color: #c678dd;">var</span> clase <span style="color: #c586c0;">in</span> clases) {<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #64748b;">// 1 = Asistió, 0 = Inasistencia</span><br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #c678dd;">bool</span> asistio = datos[clase][alumno] ?? <span style="color: #d19a66;">false</span>;<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fila.<span style="color: #56b6c2;">add</span>(asistio ? <span style="color: #d19a66;">1</span> : <span style="color: #d19a66;">0</span>);<br>
        &nbsp;&nbsp;&nbsp;&nbsp;}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;matriz.<span style="color: #56b6c2;">add</span>(fila);<br>
        &nbsp;&nbsp;}<br>
        &nbsp;&nbsp;<span style="color: #c586c0;">return</span> matriz;<br>
        }
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
