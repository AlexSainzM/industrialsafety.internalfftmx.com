const CONFIRMED_INSPECTION_KEY = 'extension-electrica:confirmed-inspection-id';

document.addEventListener('DOMContentLoaded', () => {
  initializeDynamicYear();
  showConfirmedInspection();
});

function initializeDynamicYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}

function showConfirmedInspection() {
  let inspectionId;
  try {
    inspectionId = sessionStorage.getItem(CONFIRMED_INSPECTION_KEY);
  } catch {
    return;
  }

  if (!inspectionId) {
    return;
  }

  document.title = 'Inspección registrada | FFT México';
  document.getElementById('confirmationTitle').textContent = 'Inspección registrada correctamente';
  document.getElementById('confirmationMessage').textContent = 'El registro se envió con el siguiente identificador.';
  document.getElementById('confirmedInspectionId').textContent = inspectionId;
  document.getElementById('confirmationIcon').classList.remove('d-none');
  document.getElementById('confirmationDetail').classList.remove('d-none');
}
