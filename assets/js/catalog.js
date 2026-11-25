import { getInspector, signIn, signOut } from './inspector-session.js';

const loginSection = document.getElementById('loginSection');
const loginForm = document.getElementById('loginForm');
const loginFields = document.getElementById('loginFields');
const usernameField = document.getElementById('loginUsername');
const passwordField = document.getElementById('loginPassword');
const sessionError = document.getElementById('sessionError');
const catalog = document.getElementById('catalogSection');
const catalogHeading = document.getElementById('catalogHeading');
const inspectorName = document.getElementById('inspectorName');

function renderSession(inspector) {
  loginSection.hidden = Boolean(inspector);
  catalog.hidden = !inspector;
  inspectorName.textContent = inspector?.fullName ?? '';
}

function showSessionError(message) {
  sessionError.textContent = message;
  sessionError.hidden = !message;
}

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (loginFields.disabled) {
    return;
  }

  const username = usernameField.value;
  if (!username.trim()) {
    showSessionError('Ingresa tu usuario.');
    usernameField.focus();
    return;
  }

  showSessionError('');
  loginFields.disabled = true;

  let inspector;
  try {
    inspector = await signIn(username, passwordField.value);
    if (!inspector) {
      showSessionError('El usuario o la clave son incorrectos.');
    }
  } catch {
    showSessionError('No fue posible iniciar sesión. Intenta de nuevo.');
  } finally {
    passwordField.value = '';
    loginFields.disabled = false;
  }

  if (inspector) {
    renderSession(inspector);
    catalogHeading.focus();
  } else {
    passwordField.focus();
  }
});

document.getElementById('logoutButton').addEventListener('click', () => {
  try {
    signOut();
  } catch {
    showSessionError('No fue posible cerrar la sesión. Cierra esta pestaña.');
    return;
  }

  showSessionError('');
  loginForm.reset();
  renderSession(null);
  usernameField.focus();
});

window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    showSessionError('');
    renderSession(getInspector());
  }
});

document.getElementById('currentYear').textContent = String(new Date().getFullYear());
renderSession(getInspector());
loginFields.disabled = false;
