const SESSION_KEY = 'industrial-safety:inspector';
const USERS_URL = new URL('../../data/users.json', import.meta.url);

export async function signIn(username, password) {
  const response = await fetch(USERS_URL, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('No fue posible cargar el directorio de inspectores.');
  }

  const users = await response.json();
  const user = users.find((entry) => entry?.usuario === username.trim()
    && entry.clave === password
    && typeof entry.nombre === 'string'
    && entry.nombre.trim());

  if (!user) {
    return null;
  }

  const inspector = { username: user.usuario, fullName: user.nombre.trim() };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(inspector));
  return inspector;
}

export function getInspector() {
  try {
    const inspector = JSON.parse(sessionStorage.getItem(SESSION_KEY));
    if (typeof inspector?.username === 'string' && inspector.username.trim()
        && typeof inspector.fullName === 'string' && inspector.fullName.trim()) {
      return inspector;
    }
  } catch {
    // El almacenamiento puede estar bloqueado o contener una sesión inválida.
  }
  return null;
}

export function signOut() {
  sessionStorage.removeItem(SESSION_KEY);
}
