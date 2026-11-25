import { getInspector } from '../../assets/js/inspector-session.js';

const CONFIRMED_INSPECTION_KEY = 'extension-electrica:confirmed-inspection-id';
const SUBMITTED_RESULTS = {
  COMPLIANT: 'Cumple',
  NON_COMPLIANT: 'No cumple',
  NOT_APPLICABLE: 'No aplica'
};

const inspector = getInspector();
const form = document.getElementById('mainForm');
const workerName = form.elements.namedItem('worker_name');
const criteria = [...form.querySelectorAll('[data-criterion-id]')];
const requiredFields = form.querySelectorAll('input[type="text"]:required:not([readonly])');
const submitButton = document.getElementById('submitButton');
const validationAlert = document.getElementById('formErrorAlert');
const submitErrorAlert = document.getElementById('submitErrorAlert');

function requireInspector() {
  const current = getInspector();
  if (current && current.username === inspector?.username && current.fullName === inspector.fullName) {
    return true;
  }

  form.hidden = true;
  window.location.replace('../../index.html');
  return false;
}

function initializeReferenceImage() {
  const image = document.getElementById('referenceImage');
  const placeholder = document.getElementById('referencePlaceholder');

  function updateReference() {
    const loaded = image.complete && image.naturalWidth > 0;
    image.hidden = !loaded;
    placeholder.hidden = loaded;
  }

  image.addEventListener('load', updateReference);
  image.addEventListener('error', updateReference);
  updateReference();
}

function selectedOption(criterion) {
  return criterion.querySelector('input[type="radio"]:checked');
}

function criterionLabel(criterion) {
  return criterion.querySelector('[data-criterion-label]').textContent;
}

function updateEvidence(criterion) {
  const panel = criterion.querySelector('.conditional-field');
  if (!panel) {
    return;
  }

  const required = selectedOption(criterion)?.value === 'NON_COMPLIANT';
  panel.hidden = !required;
  panel.querySelector('input[type="file"]').required = required;
  for (const field of panel.querySelectorAll('input, textarea')) {
    field.disabled = !required;
    if (!required) {
      field.value = '';
    }
  }
}

function updateSummary() {
  const summaryFields = {
    worker_name: 'summaryWorker',
    project: 'summaryProject',
    location: 'summaryLocation',
    model: 'summaryModel',
    economic_number: 'summaryEconomicNumber'
  };
  for (const [fieldId, summaryId] of Object.entries(summaryFields)) {
    document.getElementById(summaryId).textContent = form.elements.namedItem(fieldId).value.trim() || '—';
  }

  const counts = { COMPLIANT: 0, NON_COMPLIANT: 0, NOT_APPLICABLE: 0 };
  const list = document.getElementById('summaryNonCompliantList');
  list.replaceChildren();
  for (const criterion of criteria) {
    const result = selectedOption(criterion)?.value;
    if (Object.hasOwn(counts, result)) {
      counts[result] += 1;
    }
    if (result === 'NON_COMPLIANT') {
      const item = document.createElement('li');
      item.textContent = criterionLabel(criterion);
      list.append(item);
    }
  }

  document.getElementById('summaryCompliant').textContent = counts.COMPLIANT;
  document.getElementById('summaryNonCompliant').textContent = counts.NON_COMPLIANT;
  document.getElementById('summaryNotApplicable').textContent = counts.NOT_APPLICABLE;
  document.getElementById('summaryNonCompliantEmpty').hidden = list.childElementCount > 0;
  list.hidden = list.childElementCount === 0;
  document.getElementById('summaryReel').textContent = selectedOption(document.getElementById('extension_carrete'))?.value ?? '—';
  document.getElementById('summaryGfci').textContent = selectedOption(document.getElementById('extension_gfci'))?.value ?? '—';
}

function showValidation() {
  const errors = [];
  for (const field of requiredFields) {
    const message = field.nextElementSibling.textContent;
    field.setCustomValidity(field.value.trim() ? '' : message);
    if (!field.validity.valid) {
      errors.push({ field, message });
    }
  }

  for (const criterion of criteria) {
    const option = selectedOption(criterion);
    criterion.classList.toggle('is-invalid', !option);
    if (!option) {
      errors.push({
        field: criterion.querySelector('input[type="radio"]'),
        message: `Falta responder el criterio «${criterionLabel(criterion)}».`
      });
    }

    const evidence = criterion.querySelector('input[type="file"]');
    if (evidence?.required && !evidence.validity.valid) {
      errors.push({
        field: evidence,
        message: `Falta evidencia para el criterio «${criterionLabel(criterion)}».`
      });
    }
  }

  validationAlert.hidden = errors.length === 0;
  validationAlert.textContent = errors.length ? errors.map(({ message }) => message).join(' ') : '';
  return errors[0]?.field;
}

function setInspectionIdentity() {
  const inspectionId = form.elements.namedItem('inspection_id');
  if (inspectionId.value) {
    return inspectionId.value;
  }

  const now = new Date();
  const pad = (number) => String(number).padStart(2, '0');
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const offsetMinutes = -now.getTimezoneOffset();
  const offset = Math.abs(offsetMinutes);
  const suffix = Math.floor(Math.random() * 36 ** 4).toString(36).toUpperCase().padStart(4, '0');

  inspectionId.value = `INSP-${date.replaceAll('-', '')}-${time.replaceAll(':', '')}-${suffix}`;
  const timestamp = form.elements.namedItem('inspection_timestamp');
  timestamp.value = `${date}T${time}${offsetMinutes < 0 ? '-' : '+'}${pad(Math.floor(offset / 60))}:${pad(offset % 60)}`;

  const display = document.getElementById('inspectionTimestampDisplay');
  display.dateTime = timestamp.value;
  display.textContent = new Intl.DateTimeFormat('es-MX', { dateStyle: 'short', timeStyle: 'short' }).format(now);
  document.getElementById('summaryDate').textContent = display.textContent;
  return inspectionId.value;
}

function showConfirmation(inspectionId) {
  form.hidden = true;
  try {
    sessionStorage.setItem(CONFIRMED_INSPECTION_KEY, inspectionId);
    window.location.replace('thanks/index.html');
    return;
  } catch {
    // El envío ya fue aceptado. Muestra la confirmación en esta página.
  }

  const panel = document.getElementById('successPanel');
  document.getElementById('successInspectionId').textContent = inspectionId;
  document.getElementById('inspectionSection').setAttribute('aria-labelledby', 'successTitle');
  panel.classList.remove('d-none');
  panel.focus();
}

async function handleSubmit(event) {
  event.preventDefault();
  if (!requireInspector() || submitButton.disabled) {
    return;
  }

  workerName.value = inspector.fullName;
  submitErrorAlert.hidden = true;
  criteria.forEach(updateEvidence);
  form.classList.add('was-validated');
  const firstInvalid = showValidation();
  if (firstInvalid) {
    firstInvalid.focus({ preventScroll: true });
    firstInvalid.scrollIntoView({ block: 'center' });
    return;
  }

  const inspectionId = setInspectionIdentity();
  submitButton.disabled = true;
  try {
    const data = new FormData(form);
    for (const criterion of criteria) {
      const { name, value } = selectedOption(criterion);
      data.set(name, SUBMITTED_RESULTS[value] ?? value);
    }

    const response = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) {
      throw new Error('Formspree rechazó el envío.');
    }

  } catch {
    submitButton.disabled = false;
    submitErrorAlert.hidden = false;
    submitErrorAlert.focus();
    return;
  }

  showConfirmation(inspectionId);
}

if (requireInspector()) {
  workerName.value = inspector.fullName;
  document.getElementById('currentYear').textContent = String(new Date().getFullYear());
  initializeReferenceImage();
  criteria.forEach(updateEvidence);
  updateSummary();

  form.addEventListener('input', ({ target }) => {
    if (target.matches('input[type="radio"]')) {
      updateEvidence(target.closest('[data-criterion-id]'));
    }
    updateSummary();
    if (form.classList.contains('was-validated')) {
      showValidation();
    }
  });
  form.addEventListener('submit', handleSubmit);
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      requireInspector();
    }
  });
  form.hidden = false;
}
