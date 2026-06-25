const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const TOKEN_KEY = 'resumeiq_token';
const LOCAL_USER_KEY = 'resumeiq_local_user';
const LOCAL_STATE_KEY = 'resumeiq_local_state';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function request(path, options = {}) {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `Request failed: ${response.status}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

function isNetworkError(error) {
  return error instanceof TypeError || /failed to fetch|networkerror|load failed/i.test(error.message);
}

function localToken(email) {
  return `local-${btoa(email).replace(/=+$/g, '')}-${Date.now()}`;
}

function getLocalUser() {
  const stored = localStorage.getItem(LOCAL_USER_KEY);
  return stored ? JSON.parse(stored) : null;
}

function setLocalUser(user) {
  localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(user));
}

function getLocalState() {
  const stored = localStorage.getItem(LOCAL_STATE_KEY);
  return stored ? JSON.parse(stored) : { resumes: [], activeResumeId: null, coverLetter: null };
}

function setLocalState(nextState) {
  localStorage.setItem(LOCAL_STATE_KEY, JSON.stringify({ ...getLocalState(), ...nextState }));
}

function localAuthResponse(payload) {
  const email = payload.email?.toLowerCase().trim();
  const existing = getLocalUser();
  const user = {
    _id: existing?._id || `local-${Date.now()}`,
    name: payload.name?.trim() || existing?.name || email?.split('@')[0] || 'ResumeIQ User',
    email,
    role: 'user',
  };

  setLocalUser(user);
  return { user, token: localToken(email) };
}

async function withLocalFallback(apiCall, fallback) {
  try {
    return await apiCall();
  } catch (error) {
    if (!isNetworkError(error)) throw error;
    return fallback();
  }
}

export const api = {
  register: (payload) => withLocalFallback(
    () => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
    () => localAuthResponse(payload)
  ),
  login: (payload) => withLocalFallback(
    () => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
    () => localAuthResponse(payload)
  ),
  me: () => withLocalFallback(
    () => request('/auth/me'),
    () => ({ user: getLocalUser() || { _id: 'local-user', name: 'ResumeIQ User', email: 'local@resumeiq.app', role: 'user' } })
  ),
  getAppState: () => withLocalFallback(
    () => request('/users/app-state'),
    () => getLocalState()
  ),
  saveAppState: (payload) => withLocalFallback(
    () => request('/users/app-state', { method: 'PUT', body: JSON.stringify(payload) }),
    () => {
      setLocalState(payload);
      return getLocalState();
    }
  ),
  createResume: (resume) => withLocalFallback(
    () => request('/users/resumes', { method: 'POST', body: JSON.stringify(resume) }),
    () => {
      const state = getLocalState();
      setLocalState({ resumes: [resume, ...(state.resumes || [])], activeResumeId: resume.id });
      return resume;
    }
  ),
  updateResume: (id, resume) => withLocalFallback(
    () => request(`/users/resumes/${id}`, { method: 'PUT', body: JSON.stringify(resume) }),
    () => {
      const state = getLocalState();
      setLocalState({ resumes: (state.resumes || []).map((item) => (item.id === id ? resume : item)) });
      return resume;
    }
  ),
  deleteResume: (id) => withLocalFallback(
    () => request(`/users/resumes/${id}`, { method: 'DELETE' }),
    () => {
      const state = getLocalState();
      const resumes = (state.resumes || []).filter((resume) => resume.id !== id);
      setLocalState({ resumes, activeResumeId: state.activeResumeId === id ? resumes[0]?.id || null : state.activeResumeId });
      return null;
    }
  ),
};
