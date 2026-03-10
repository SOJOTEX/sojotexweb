import './styles.css';

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((el) => revealObserver.observe(el));

const heroStatBar = document.querySelector('.hero-stat-bar');

const animateCount = (el, target, suffix = '') => {
  let startTimestamp = null;
  const duration = 1600;

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = `${Math.floor(eased * target)}${suffix}`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
};

const statsObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.hero-stat .num').forEach((numEl) => {
          const value = parseInt(numEl.dataset.target, 10) || 0;
          animateCount(numEl, value, numEl.dataset.suffix ?? '');
        });
        observer.disconnect();
      }
    });
  },
  { threshold: 0.5 }
);

if (heroStatBar) {
  statsObserver.observe(heroStatBar);
}

const timelineData = [
  {
    label: 'Paso 1 de 5',
    title: 'Recepción de ficha técnica',
    desc:
      'Recibimos la ficha técnica del cliente con especificaciones de diseño, telas, colores y tallas. Nuestro equipo técnico valida los requerimientos y confirma tiempos de producción.',
    machines: [],
    time: '1',
    unit: 'día',
    progress: 20
  },
  {
    label: 'Paso 2 de 5',
    title: 'Corte industrial',
    desc:
      'Tendido y corte de telas según patrones y tallas. Optimizamos el aprovechamiento de la tela para reducir merma. Control de medidas en cada pieza cortada.',
    machines: ['14 rectas', 'Cutter manual'],
    time: '1–2',
    unit: 'días',
    progress: 40
  },
  {
    label: 'Paso 3 de 5',
    title: 'Confección y ensamble',
    desc:
      'Unión de piezas con máquinas rectas, remallado de bordes y recubrimiento. Es la etapa de mayor valor productivo, con supervisión constante de puntada y medidas.',
    machines: ['14 rectas autom.', '16 remalladores', '8 recubridoras'],
    time: '3–10',
    unit: 'días',
    progress: 60
  },
  {
    label: 'Paso 4 de 5',
    title: 'Acabado y control de calidad',
    desc:
      'Ojalado, botonado, planchado y revisión prenda por prenda. Se verifican medidas, costuras, uniformidad de color y etiquetado según especificaciones del cliente.',
    machines: ['2 botoneras', '2 ojaladoras', '5 basteras'],
    time: '1–3',
    unit: 'días',
    progress: 80
  },
  {
    label: 'Paso 5 de 5',
    title: 'Packing y despacho',
    desc:
      'Doblado, embolsado, etiquetado y empaque final según requerimientos de exportación o entrega nacional. Preparación de documentación para envío.',
    machines: ['Mesa de packing', 'Etiquetadora'],
    time: '1',
    unit: 'día',
    progress: 100
  }
];

const tlSteps = document.querySelectorAll('.tl-step');
const setTimelineStep = (index) => {
  const step = timelineData[index] ?? timelineData[0];
  if (!step) return;

  tlSteps.forEach((element, idx) => {
    element.classList.toggle('active', idx === index);
  });

  document.getElementById('tlLabel').textContent = step.label;
  document.getElementById('tlTitle').textContent = step.title;
  document.getElementById('tlDesc').textContent = step.desc;
  document.getElementById('tlTime').textContent = step.time;
  document.getElementById('tlUnit').textContent = step.unit;
  document.getElementById('tlProgressFill').style.width = `${step.progress}%`;

  const machinesContainer = document.getElementById('tlMachines');
  if (machinesContainer) {
    machinesContainer.innerHTML = step.machines
      .map((machine) => `<span class="tl-machine-tag">${machine}</span>`)
      .join('');
  }
};

tlSteps.forEach((stepEl, idx) => {
  stepEl.addEventListener('click', () => setTimelineStep(idx));
});

setTimelineStep(0);

const formState = {
  service: '',
  quantity: 500,
  timeline: ''
};

const updateRangeValue = (value) => {
  const numericValue = Number(value) || 0;
  formState.quantity = numericValue;
  const rangeLabel = document.getElementById('rangeVal');
  if (rangeLabel) {
    rangeLabel.textContent = numericValue.toLocaleString('es-PE');
  }
};

const updateDots = (step) => {
  const dots = document.querySelectorAll('.pform-dot');
  dots.forEach((dot, index) => {
    dot.className = 'pform-dot';
    if (index < step - 1) {
      dot.classList.add('done');
    } else if (index === step - 1) {
      dot.classList.add('current');
    }
  });
};

const showStep = (step) => {
  const steps = document.querySelectorAll('.pform-step');
  steps.forEach((stepEl) => stepEl.classList.remove('active'));
  const target = document.getElementById(`pStep${step}`);
  if (target) {
    target.classList.add('active');
    updateDots(step);
  }
};

const updateSummary = () => {
  const sumService = document.getElementById('sumService');
  const sumQty = document.getElementById('sumQty');
  const sumTimeline = document.getElementById('sumTimeline');

  if (sumService) {
    sumService.textContent = formState.service || '—';
  }
  if (sumQty) {
    sumQty.textContent = `${formState.quantity.toLocaleString('es-PE')} unidades`;
  }
  if (sumTimeline) {
    sumTimeline.textContent = formState.timeline || '—';
  }
};

document
  .querySelectorAll('.pform-opt')
  .forEach((optionEl) =>
    optionEl.addEventListener('click', () => {
      const group = optionEl.dataset.group;
      document
        .querySelectorAll(`.pform-opt[data-group="${group}"]`)
        .forEach((groupOpt) => groupOpt.classList.remove('selected'));
      optionEl.classList.add('selected');

      if (group === 's1') {
        formState.service = optionEl.dataset.val ?? '';
      }
      if (group === 's3') {
        formState.timeline = optionEl.dataset.val ?? '';
      }
    })
  );

const quantityRange = document.getElementById('quantityRange');
if (quantityRange) {
  quantityRange.addEventListener('input', (event) => {
    updateRangeValue(event.target.value);
  });
}

updateRangeValue(formState.quantity);
updateDots(1);

document.querySelectorAll('.pform-next').forEach((btn) => {
  if (btn.dataset.submit !== undefined) {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      const wrapper = document.querySelector('.pform-wrapper');
      const progress = document.getElementById('pformProgress');
      const formLabel = document.querySelector('.form-label');
      if (progress) {
        progress.style.display = 'none';
      }
      if (formLabel) {
        formLabel.style.display = 'none';
      }
      if (wrapper) {
        wrapper.style.display = 'none';
      }
      document.getElementById('pformSuccess')?.classList.add('show');
    });
  } else if (btn.dataset.next) {
    const nextStep = Number(btn.dataset.next);
    btn.addEventListener('click', () => {
      showStep(nextStep);
      if (nextStep === 4) {
        updateSummary();
      }
    });
  }
});

document.querySelectorAll('.pform-back').forEach((btn) => {
  const prevStep = Number(btn.dataset.prev);
  btn.addEventListener('click', () => {
    showStep(prevStep);
  });
});
