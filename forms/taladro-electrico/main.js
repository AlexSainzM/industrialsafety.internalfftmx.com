/**
 * Check List - Taladro Eléctrico (02040p54 Rev. 03)
 */
const SUBMITTED_RESULTS = {
  COMPLIANT: 'Cumple',
  NON_COMPLIANT: 'No cumple',
  NOT_APPLICABLE: 'No aplica'
};
const CONFIRMED_INSPECTION_KEY = 'taladro-electrico:confirmed-inspection-id';

const CRITERION_IDS = [
  'taladro_tope_profundidad',
  'taladro_condicion_broca',
  'taladro_interruptor',
  'taladro_mango_auxiliar',
  'taladro_cambio_marcha',
  'taladro_uso_continuo',
  'taladro_broquero_muelas',
  'taladro_cable_alimentacion_clavija',
  'taladro_selector_modo',
  'taladro_ruidos_motor'
];

const GENERAL_FIELDS = ['worker_name', 'project', 'location', 'drill_model'];

document.addEventListener('DOMContentLoaded', () => {
  initializeInspection();
});

function initializeInspection() {
  const form = document.getElementById('mainForm');

  if (!form) {
    return;
  }

  initializeDynamicYear();
  setInspectionIdentity();
  calculateSummary();

  form.addEventListener('change', (event) => {
    const target = event.target;

    if (target instanceof HTMLInputElement && target.type === 'radio') {
      const criterion = target.closest('[data-criterion-id]');
      if (criterion) {
        updateEvidenceRequirement(criterion.dataset.criterionId);
      }
    }

    calculateSummary();
  });

  form.addEventListener('input', () => {
    calculateSummary();
  });

  form.addEventListener('submit', handleSubmit);
}

function initializeDynamicYear() {
  const yearElement = document.getElementById('currentYear');

  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}

function generateInspectionId(date) {
  const now = date || new Date();
  const stamp = formatCompactTimestamp(now);
  const suffix = Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(-4).padStart(4, 'X');
  return `INSP-${stamp}-${suffix}`;
}

function formatCompactTimestamp(date) {
  const pad = (value) => String(value).padStart(2, '0');
  const yearMonthDay = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
  const time = `${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
  return `${yearMonthDay}-${time}`;
}

function toInspectionTimestamp(date) {
  const pad = (value) => String(value).padStart(2, '0');
  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const absolute = Math.abs(offsetMinutes);
  const offset = `${sign}${pad(Math.floor(absolute / 60))}:${pad(absolute % 60)}`;

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}${offset}`;
}

function formatDisplayDate(date) {
  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(date);
}

function setInspectionIdentity() {
  const now = new Date();
  const inspectionIdField = document.getElementById('inspection_id');
  const timestampField = document.getElementById('inspection_timestamp');
  const timestampDisplay = document.getElementById('inspectionTimestampDisplay');

  if (inspectionIdField && !inspectionIdField.value) {
    inspectionIdField.value = generateInspectionId(now);
  }

  if (timestampField) {
    timestampField.value = toInspectionTimestamp(now);
  }

  if (timestampDisplay) {
    timestampDisplay.dateTime = timestampField ? timestampField.value : '';
    timestampDisplay.textContent = formatDisplayDate(now);
  }
}

function getCriterionBlock(criterionId) {
  return document.querySelector(`[data-criterion-id="${criterionId}"]`);
}

function getSelectedCriterionOption(criterionId) {
  return getCriterionBlock(criterionId)?.querySelector('input[type="radio"]:checked');
}

function getCriterionLabel(criterionId) {
  const legend = getCriterionBlock(criterionId)?.querySelector('legend');
  return legend ? legend.textContent.replace('*', '').trim() : criterionId;
}

function updateEvidenceRequirement(criterionId) {
  const result = getSelectedCriterionOption(criterionId)?.value;
  const panel = document.querySelector(`[data-evidence-for="${criterionId}"]`);
  const evidenceInput = document.getElementById(`evidence_${criterionId}`);
  const observationInput = document.getElementById(`observation_${criterionId}`);
  const requiresEvidence = result === 'NON_COMPLIANT';

  if (!panel || !evidenceInput) {
    return;
  }

  panel.classList.toggle('d-none', !requiresEvidence);
  evidenceInput.disabled = !requiresEvidence;
  evidenceInput.required = requiresEvidence;

  if (!requiresEvidence) {
    evidenceInput.value = '';
    evidenceInput.classList.remove('is-invalid');
  }

  if (observationInput) {
    observationInput.disabled = !requiresEvidence;

    if (!requiresEvidence) {
      observationInput.value = '';
    }
  }
}

function getFieldValue(fieldId) {
  const field = document.getElementById(fieldId);
  return field ? field.value.trim() : '';
}

function validateForm() {
  const errors = [];

  GENERAL_FIELDS.forEach((fieldId) => {
    const field = document.getElementById(fieldId);

    if (!field) {
      return;
    }

    if (!field.value.trim()) {
      field.setCustomValidity(field.nextElementSibling ? field.nextElementSibling.textContent : 'Campo obligatorio.');
      errors.push({
        fieldId,
        element: field,
        message: field.nextElementSibling ? field.nextElementSibling.textContent : 'Completa este campo.'
      });
    } else {
      field.setCustomValidity('');
    }
  });

  CRITERION_IDS.forEach((criterionId) => {
    const result = getSelectedCriterionOption(criterionId)?.value;
    const block = getCriterionBlock(criterionId);
    const message = block ? block.querySelector('[data-criterion-message]') : null;
    const firstRadio = document.getElementById(`${criterionId}_COMPLIANT`);
    const evidenceInput = document.getElementById(`evidence_${criterionId}`);
    const label = getCriterionLabel(criterionId);

    if (!result) {
      if (message) {
        message.hidden = false;
        message.classList.add('d-block');
      }

      if (block) {
        block.classList.add('is-invalid');
      }

      errors.push({
        fieldId: criterionId,
        element: firstRadio || block,
        message: `Falta responder: ${label}`
      });
    } else if (message) {
      message.hidden = true;
      message.classList.remove('d-block');

      if (block) {
        block.classList.remove('is-invalid');
      }
    }

    if (result === 'NON_COMPLIANT') {
      const hasFile = evidenceInput && evidenceInput.files && evidenceInput.files.length > 0;

      if (!hasFile) {
        if (evidenceInput) {
          evidenceInput.setCustomValidity('Adjunta evidencia para este criterio.');
          evidenceInput.classList.add('is-invalid');
        }

        errors.push({
          fieldId: `evidence_${criterionId}`,
          element: evidenceInput || block,
          message: `Falta evidencia para: ${label}`
        });
      } else if (evidenceInput) {
        evidenceInput.setCustomValidity('');
        evidenceInput.classList.remove('is-invalid');
      }
    } else if (evidenceInput) {
      evidenceInput.setCustomValidity('');
      evidenceInput.classList.remove('is-invalid');
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
}

function calculateSummary() {
  const counts = {
    total_criteria: CRITERION_IDS.length,
    compliant_count: 0,
    non_compliant_count: 0,
    not_applicable_count: 0
  };
  const nonCompliantLabels = [];

  CRITERION_IDS.forEach((criterionId) => {
    const result = getSelectedCriterionOption(criterionId)?.value;

    if (result === 'COMPLIANT') {
      counts.compliant_count += 1;
    } else if (result === 'NON_COMPLIANT') {
      counts.non_compliant_count += 1;
      nonCompliantLabels.push(getCriterionLabel(criterionId));
    } else if (result === 'NOT_APPLICABLE') {
      counts.not_applicable_count += 1;
    }
  });

  const hasNonCompliances = counts.non_compliant_count > 0;

  setHiddenValue('total_criteria', String(counts.total_criteria));
  setHiddenValue('compliant_count', String(counts.compliant_count));
  setHiddenValue('non_compliant_count', String(counts.non_compliant_count));
  setHiddenValue('not_applicable_count', String(counts.not_applicable_count));
  setHiddenValue('has_non_compliances', hasNonCompliances ? 'true' : 'false');

  setText('summaryWorker', getFieldValue('worker_name') || '—');
  setText('summaryProject', getFieldValue('project') || '—');
  setText('summaryLocation', getFieldValue('location') || '—');
  setText('summaryModel', getFieldValue('drill_model') || '—');
  setText('summaryDate', document.getElementById('inspectionTimestampDisplay')?.textContent || '—');
  setText('summaryTotal', String(counts.total_criteria));
  setText('summaryCompliant', String(counts.compliant_count));
  setText('summaryNonCompliant', String(counts.non_compliant_count));
  setText('summaryNotApplicable', String(counts.not_applicable_count));

  const emptyMessage = document.getElementById('summaryNonCompliantEmpty');
  const list = document.getElementById('summaryNonCompliantList');

  if (list && emptyMessage) {
    list.replaceChildren();

    if (nonCompliantLabels.length === 0) {
      emptyMessage.hidden = false;
      list.hidden = true;
    } else {
      emptyMessage.hidden = true;
      list.hidden = false;
      nonCompliantLabels.forEach((label) => {
        const item = document.createElement('li');
        item.textContent = label;
        list.appendChild(item);
      });
    }
  }

  return {
    ...counts,
    has_non_compliances: hasNonCompliances
  };
}

function setHiddenValue(id, value) {
  const field = document.getElementById(id);

  if (field) {
    field.value = value;
  }
}

function setText(id, value) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = value;
  }
}

function prepareSubmission() {
  const now = new Date();
  const timestampField = document.getElementById('inspection_timestamp');
  const timestampDisplay = document.getElementById('inspectionTimestampDisplay');
  const inspectionIdField = document.getElementById('inspection_id');

  if (inspectionIdField && !inspectionIdField.value) {
    inspectionIdField.value = generateInspectionId(now);
  }

  if (timestampField) {
    timestampField.value = toInspectionTimestamp(now);
  }

  if (timestampDisplay) {
    timestampDisplay.dateTime = timestampField ? timestampField.value : '';
    timestampDisplay.textContent = formatDisplayDate(now);
  }

  return calculateSummary();
}

function showValidationErrors(errors) {
  const alertBox = document.getElementById('formErrorAlert');

  if (!alertBox) {
    return;
  }

  const items = errors.map((error) => error.message).join(' ');
  alertBox.hidden = false;
  alertBox.textContent = `No se puede enviar la inspección. ${items}`;
}

function clearValidationErrors() {
  const alertBox = document.getElementById('formErrorAlert');

  if (alertBox) {
    alertBox.hidden = true;
    alertBox.textContent = '';
  }
}

function focusFirstError(errors) {
  const first = errors.find((error) => error.element instanceof HTMLElement);

  if (!first) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  first.element.focus({ preventScroll: true });
  first.element.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    block: 'center'
  });
}

async function handleSubmit(event) {
  event.preventDefault();
  event.stopPropagation();

  const form = event.currentTarget;
  const submitButton = document.getElementById('submitButton');
  const submitErrorAlert = document.getElementById('submitErrorAlert');

  if (submitButton?.disabled) {
    return;
  }

  if (submitErrorAlert) {
    submitErrorAlert.hidden = true;
  }

  clearValidationErrors();

  CRITERION_IDS.forEach((criterionId) => {
    updateEvidenceRequirement(criterionId);
  });

  const validation = validateForm();
  form.classList.add('was-validated');

  if (!validation.valid) {
    showValidationErrors(validation.errors);
    focusFirstError(validation.errors);
    return;
  }

  prepareSubmission();

  if (submitButton) {
    submitButton.disabled = true;
  }

  let formData;
  try {
    formData = new FormData(form);
    for (const criterionId of CRITERION_IDS) {
      const option = getSelectedCriterionOption(criterionId);
      formData.set(option.name, SUBMITTED_RESULTS[option.value]);
    }

    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('formspree-error');
    }
  } catch {
    if (submitErrorAlert) {
      submitErrorAlert.hidden = false;
      submitErrorAlert.focus?.();
    }

    if (submitButton) {
      submitButton.disabled = false;
    }
    return;
  }

  showSuccessConfirmation(form, formData.get('inspection_id'));
}

function showSuccessConfirmation(form, inspectionId) {
  form.hidden = true;

  try {
    sessionStorage.setItem(CONFIRMED_INSPECTION_KEY, inspectionId);
    window.location.replace('thanks/index.html');
    return;
  } catch {
    // El envío ya fue aceptado. Si falla la transición, mostrar la confirmación aquí.
  }

  const successPanel = document.getElementById('successPanel');
  document.getElementById('successInspectionId').textContent = inspectionId;
  document.getElementById('inspectionSection').setAttribute('aria-labelledby', 'successTitle');
  successPanel.classList.remove('d-none');
  successPanel.focus({ preventScroll: true });
  successPanel.scrollIntoView({ block: 'start' });
}
