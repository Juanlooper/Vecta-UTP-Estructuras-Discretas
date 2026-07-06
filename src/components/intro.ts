export function renderIntro(): string {
  return `
    <section id="intro" class="section">
      <div class="glass-panel text-center" style="text-align: center; padding: 4rem 2rem;">
        <h1 class="section-title">Arquitectura Lógica de <span class="text-gradient">Vecta UTP</span></h1>
        <p class="section-subtitle" style="margin: 0 auto 2rem auto;">
          Basada en Matemáticas Discretas. Una exploración de cómo la teoría matemática se traduce en la lógica de sistemas reales.
        </p>
        
        <div style="text-align: left; max-width: 800px; margin: 0 auto; line-height: 1.8; color: var(--text-secondary);">
          <p style="margin-bottom: 1.5rem;">
            El presente trabajo final tiene como objetivo aplicar de manera rigurosa los conceptos de la matemática discreta a la arquitectura lógica de un sistema real: la <strong style="color: var(--text-primary);">Plataforma de Tutorías Vecta UTP</strong>. 
          </p>
          <p style="margin-bottom: 1.5rem;">
            A través de este análisis, se evidenciará cómo la gestión de bases de datos, el emparejamiento de usuarios, el control de cupos y la seguridad criptográfica del sistema no son más que representaciones computacionales de <em>Sucesiones, Teoría de Conjuntos, Relaciones, Grafos, Funciones, Técnicas de Conteo y Estructuras Algebraicas</em>.
          </p>
          <p style="margin-bottom: 2rem;">
            La matemática discreta funciona como el puente que traduce la lógica teórica humana a instrucciones computacionales exactas; sin ella, el diseño de algoritmos eficientes y la prevención de redundancias en bases de datos serían imposibles de implementar a nivel corporativo.
          </p>
        </div>

        <div style="text-align: left; max-width: 800px; margin: 2rem auto; background: rgba(0,0,0,0.3); border-radius: 12px; border: 1px solid var(--border-glass); padding: 1.5rem;">
          <h3 style="color: white; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--accent-primary);"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            Universo de Discurso (Conjuntos Base)
          </h3>
          <p style="color: var(--text-secondary); margin-bottom: 1rem; font-size: 0.95rem;">
            Para estandarizar el análisis matemático en Vecta, estableceremos desde el principio los siguientes conjuntos fundamentales sobre los cuales operará el sistema:
          </p>
          <div style="display: grid; gap: 1rem; margin-top: 1rem;">
            
            <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; border-left: 3px solid #3b82f6;">
              <strong style="color: #3b82f6; display: block; margin-bottom: 0.5rem; font-size: 1.1rem;">Conjunto E (Estudiantes):</strong>
              <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.2rem;"><strong>Verbal:</strong> El conjunto de todos los estudiantes registrados con una cuenta activa en Vecta.</div>
              <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.2rem; font-family: monospace;"><strong>Comprensión:</strong> E = { x | x es un estudiante con cuenta activa }</div>
              <div style="color: var(--text-secondary); font-size: 0.9rem; font-family: monospace;"><strong>Extensión:</strong> E = { Nieves, Juan, Carlos, Ana, Luis, Pedro, ... }</div>
            </div>

            <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; border-left: 3px solid #10b981;">
              <strong style="color: #10b981; display: block; margin-bottom: 0.5rem; font-size: 1.1rem;">Conjunto T (Tutores):</strong>
              <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.2rem;"><strong>Verbal:</strong> El conjunto de estudiantes certificados para enseñar en Vecta.</div>
              <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.2rem; font-family: monospace;"><strong>Comprensión:</strong> T = { x ∈ E | x tiene certificación de tutor }</div>
              <div style="color: var(--text-secondary); font-size: 0.9rem; font-family: monospace;"><strong>Extensión:</strong> T = { Roberto, Elena, Marta, Ana, ... }</div>
            </div>

            <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; border-left: 3px solid #a855f7;">
              <strong style="color: #a855f7; display: block; margin-bottom: 0.5rem; font-size: 1.1rem;">Conjunto M (Materias):</strong>
              <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.2rem;"><strong>Verbal:</strong> El conjunto de todas las materias académicas habilitadas en la plataforma.</div>
              <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.2rem; font-family: monospace;"><strong>Comprensión:</strong> M = { x | x es una materia habilitada }</div>
              <div style="color: var(--text-secondary); font-size: 0.9rem; font-family: monospace;"><strong>Extensión:</strong> M = { Cálculo I, Física II, Programación IV, ... }</div>
            </div>

            <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; border-left: 3px solid #f59e0b;">
              <strong style="color: #f59e0b; display: block; margin-bottom: 0.5rem; font-size: 1.1rem;">Conjunto F (Facultades):</strong>
              <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.2rem;"><strong>Verbal:</strong> El conjunto de Facultades de la UTP en Vecta.</div>
              <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.2rem; font-family: monospace;"><strong>Comprensión:</strong> F = { x | x es una facultad de la sede principal }</div>
              <div style="color: var(--text-secondary); font-size: 0.9rem; font-family: monospace;"><strong>Extensión:</strong> F = { FISC, FIM, FIC, FIE, FIPI, FCyT }</div>
            </div>

          </div>
        </div>

        <a href="#sucesiones" class="btn btn-primary">Comenzar Exploración</a>
      </div>
    </section>
  `;
}
