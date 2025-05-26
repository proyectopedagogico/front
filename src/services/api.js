// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000/api';

// Helper function to get the access token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('accessToken'); // Or however you choose to store the token
};

// Helper function to build headers, including the Authorization header if a token exists and is required
const buildHeaders = (isJsonContent = true, requireAuthToken = true) => {
  const headers = {};
  if (isJsonContent) {
    headers['Content-Type'] = 'application/json';
  }
  
  if (requireAuthToken) { // Only add Authorization header if requireAuthToken is true
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

// Helper function to handle API responses and errors
const handleResponse = async (response) => {
  if (!response.ok) {
    let errorData = { message: response.statusText }; // Default error message
    try {
      // Try to parse error response from server if it's JSON
      const jsonError = await response.json();
      errorData = { ...errorData, ...jsonError }; // Merge server error details
    } catch (e) {
      // If parsing JSON fails, use the default statusText
    }
    const error = new Error(`API error: ${response.status} - ${errorData.message || errorData.error || ''}`);
    error.status = response.status;
    error.data = errorData; // Attach detailed error data
    throw error;
  }
  // If response is 204 No Content, there might be no body to parse
  if (response.status === 204) {
    return null; 
  }
  return await response.json();
};

export const api = {
  async get(endpoint, requireAuth = true) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        // Pass requireAuth to buildHeaders. For GET, Content-Type is not typically needed for the request itself.
        headers: buildHeaders(false, requireAuth), 
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('API GET request failed:', error.message, error.data || '');
      throw error;
    }
  },

  async post(endpoint, data, requireAuth = true) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: buildHeaders(true, requireAuth), // buildHeaders handles Content-Type and Auth
        body: JSON.stringify(data),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('API POST request failed:', error.message, error.data || '');
      throw error;
    }
  },

  async postFormData(endpoint, formData, requireAuth = true) { // For file uploads
    try {
      // For FormData, do NOT set Content-Type header manually.
      // The browser will set it correctly with the boundary.
      const headers = {}; // Start with empty headers
      if (requireAuth) { // Only add Authorization if requireAuth is true
        const token = getAuthToken();
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: headers,
        body: formData, // formData is passed directly
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('API FormData POST request failed:', error.message, error.data || '');
      throw error;
    }
  },

  async put(endpoint, data, requireAuth = true) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: buildHeaders(true, requireAuth),
        body: JSON.stringify(data),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('API PUT request failed:', error.message, error.data || '');
      throw error;
    }
  },

  async delete(endpoint, requireAuth = true) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        // Pass requireAuth to buildHeaders. For DELETE, Content-Type is not typically needed for the request itself.
        headers: buildHeaders(false, requireAuth), 
      });
      return await handleResponse(response); // Might return null for 204, or a JSON message
    } catch (error) {
      console.error('API DELETE request failed:', error.message, error.data || '');
      throw error;
    }
  },

  async upload(endpoint, formData) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        body: formData, // FormData para subir archivos
      });
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },
};
