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

        <a href="#sucesiones" class="btn btn-primary">Comenzar Exploración</a>
      </div>
    </section>
  `;
}
