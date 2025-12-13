const API_URL = import.meta.env.VITE_API_URL;

// Helper to get auth token from localStorage
const getToken = () => {
  const user = localStorage.getItem("user");
  if (user) {
    const userData = JSON.parse(user);
    return userData.token;
  }
  return null;
};

// Helper to make authenticated requests
const fetchWithAuth = async (url, options = {}) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

// ===== AUTH APIs =====

export const authAPI = {
  // Signup
  signup: async (userData) => {
    return fetchWithAuth(`${API_URL}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  // Login
  login: async (credentials) => {
    return fetchWithAuth(`${API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  // Get current user
  getMe: async () => {
    return fetchWithAuth(`${API_URL}/auth/me`);
  },
};

// ===== PDF APIs =====

export const pdfAPI = {
  // Generate PDF
  generate: async (pdfData) => {
    return fetchWithAuth(`${API_URL}/pdf/generate`, {
      method: "POST",
      body: JSON.stringify(pdfData),
    });
  },

  // Get PDF status
  getStatus: async (pdfId) => {
    return fetchWithAuth(`${API_URL}/pdf/${pdfId}/status`);
  },

  // Get view URL
  getViewURL: async (pdfId) => {
    return fetchWithAuth(`${API_URL}/pdf/${pdfId}/view`);
  },

  // Get download URL
  getDownloadURL: async (pdfId) => {
    return fetchWithAuth(`${API_URL}/pdf/${pdfId}/download`);
  },

  // Get user's PDFs
  getUserPDFs: async () => {
    return fetchWithAuth(`${API_URL}/pdf/my/list`);
  },

  // Delete PDF
  delete: async (pdfId) => {
    return fetchWithAuth(`${API_URL}/pdf/${pdfId}`, {
      method: "DELETE",
    });
  },

  // Create share link
  createShareLink: async (pdfId, options = {}) => {
    return fetchWithAuth(`${API_URL}/pdf/${pdfId}/share`, {
      method: "POST",
      body: JSON.stringify(options),
    });
  },

  // Get share links
  getShareLinks: async (pdfId) => {
    return fetchWithAuth(`${API_URL}/pdf/${pdfId}/shares`);
  },

  // Revoke share link
  revokeShareLink: async (pdfId, shareId) => {
    return fetchWithAuth(`${API_URL}/pdf/${pdfId}/unshare`, {
      method: "POST",
      body: JSON.stringify({ shareId }),
    });
  },
};

export default {
  auth: authAPI,
  pdf: pdfAPI,
};
