const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://teamliva-backend.vercel.app/api';

const TOKEN_KEY = 'teamliva_token';
const USER_KEY = 'teamliva_user';

/** Thrown for any non-2xx response; carries per-field errors when the API sends them. */
export class ApiError extends Error {
  constructor(message, status, errors) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors || null;
  }
}

export function getToken() {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setSession(token, user) {
  try {
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {
    /* private mode / blocked storage — the in-memory session still works */
  }
}

export function getStoredUser() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  try {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
  } catch {
    /* nothing to clear */
  }
}

/**
 * Thin fetch wrapper: attaches the bearer token when present, parses the
 * envelope the API returns, and raises ApiError on failure.
 */
async function request(path, { method = 'GET', body, auth = false, signal, cache } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal,
      cache: cache ?? 'no-store',
    });
  } catch (err) {
    if (err?.name === 'AbortError') throw err;
    throw new ApiError('Cannot reach the server. Is the API running?', 0);
  }

  let payload = null;
  try {
    payload = await res.json();
  } catch {
    payload = null;
  }

  if (!res.ok) {
    throw new ApiError(
      payload?.message || `Request failed (${res.status})`,
      res.status,
      payload?.errors
    );
  }

  return payload;
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts) => request(path, { ...opts, method: 'PUT', body }),
  patch: (path, body, opts) => request(path, { ...opts, method: 'PATCH', body }),
  del: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
};

/* ------------------------------- public API ------------------------------- */

export const submitInquiry = (data) => api.post('/inquiries', data);
export const submitContact = (data) => api.post('/contacts', data);
export const submitApplication = (data) => api.post('/applications', data);
export const subscribeNewsletter = (email) => api.post('/newsletter', { email });
export const fetchTalents = (type, opts) =>
  api.get(`/talents${type && type !== 'All' ? `?type=${encodeURIComponent(type)}` : ''}`, opts);
export const fetchServices = (opts) => api.get('/services', opts);

/* -------------------------------- admin API ------------------------------- */

export const login = (email, password) => api.post('/auth/login', { email, password });
export const fetchMe = () => api.get('/auth/me', { auth: true });
export const fetchStats = () => api.get('/stats', { auth: true });
export const fetchInquiries = (params = '') => api.get(`/inquiries${params}`, { auth: true });
export const fetchContacts = (params = '') => api.get(`/contacts${params}`, { auth: true });
export const fetchApplications = (params = '') => api.get(`/applications${params}`, { auth: true });
export const updateInquiryStatus = (id, status) =>
  api.patch(`/inquiries/${id}`, { status }, { auth: true });
export const updateContactStatus = (id, status) =>
  api.patch(`/contacts/${id}`, { status }, { auth: true });
export const updateApplicationStatus = (id, status) =>
  api.patch(`/applications/${id}`, { status }, { auth: true });
export const deleteInquiry = (id) => api.del(`/inquiries/${id}`, { auth: true });
export const deleteContact = (id) => api.del(`/contacts/${id}`, { auth: true });
export const deleteApplication = (id) => api.del(`/applications/${id}`, { auth: true });

export { API_URL };
