import './style.css';
import { renderIntro } from './components/intro';
import { renderSucesiones, initSucesionesLogic } from './components/sucesiones';
import { renderConteo, initConteoLogic } from './components/conteo';
import { renderRepresentacion } from './components/representacion';
import { renderGrafos, initGrafosLogic } from './components/grafos';
import { renderFunciones, initFuncionesLogic } from './components/funciones';
import { renderAlgebra, initAlgebraLogic } from './components/algebra';
import { renderPrototype, initPrototypeLogic } from './components/prototype';
import { renderConclusion } from './components/conclusion';

const app = document.querySelector<HTMLElement>('#app')!;

app.innerHTML = `
  <div class="container">
    ${renderIntro()}
    ${renderSucesiones()}
    ${renderConteo()}
    ${renderRepresentacion()}
    ${renderGrafos()}
    ${renderFunciones()}
    ${renderAlgebra()}
    ${renderPrototype()}
    ${renderConclusion()}
  </div>
`;

// Initialize dynamic logics
initSucesionesLogic();
initConteoLogic();
initGrafosLogic();
initFuncionesLogic();
initAlgebraLogic();
initPrototypeLogic();
