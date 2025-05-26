// src/services/authService.js

import { api } from './api'; // Importa el objeto 'api' que creamos antes

export const authService = {
  async login(credentials) {
    /**
     * Realiza la solicitud de login.
     * @param {object} credentials - Un objeto con { nombre_admin: '...', password: '...' }.
     * @returns {Promise<object>} La respuesta de la API, que incluye el access_token.
     */
    try {
      // El 'false' como tercer argumento indica a api.post que no intente adjuntar un token de autorización,
      // ya que esta es la solicitud para obtener el token.
      const response = await api.post('/admin/login', credentials, false); 
      
      if (response.access_token) {
        // Guarda el token en localStorage para que persista entre sesiones.
        // En una aplicación más compleja, podrías usar Pinia/Vuex aquí.
        localStorage.setItem('accessToken', response.access_token);
        
        // Opcional: Podrías decodificar el token aquí para obtener información del usuario
        // o hacer otra llamada a un endpoint '/me' para obtener el perfil del usuario
        // y guardarlo en tu store de estado (Pinia/Vuex).
      }
      return response; // Devuelve la respuesta completa de la API (incluyendo el token)
    } catch (error) {
      // Si el login falla, nos aseguramos de que no haya un token viejo en localStorage.
      localStorage.removeItem('accessToken');
      // El error ya fue logueado por api.js, aquí simplemente lo relanzamos
      // para que el componente que llamó a login() pueda manejarlo (ej. mostrar un mensaje).
      throw error;
    }
  },

  logout() {
    /**
     * Realiza la solicitud de logout y limpia el token local.
     * @returns {Promise<object>} La respuesta de la API del endpoint de logout.
     */
    // No es estrictamente necesario esperar la respuesta del backend para limpiar el token local,
    // pero es bueno llamar al endpoint si tu backend invalida tokens (ej. con una blocklist).
    const logoutPromise = api.post('/admin/logout'); // El token se adjuntará automáticamente por buildHeaders en api.js

    // Limpia el token del almacenamiento local inmediatamente.
    localStorage.removeItem('accessToken');
    
    // También podrías querer limpiar cualquier otro estado de usuario que tengas en Pinia/Vuex.

    return logoutPromise; // Devuelve la promesa por si el componente quiere reaccionar al resultado.
  },

  getAuthToken() {
    /**
     * Obtiene el token de acceso del localStorage.
     * @returns {string|null} El token de acceso o null si no existe.
     */
    return localStorage.getItem('accessToken');
  },

  isAuthenticated() {
    /**
     * Verifica si hay un token de acceso presente.
     * Para una verificación más robusta, podrías decodificar el token y comprobar su fecha de expiración.
     * @returns {boolean} True si hay un token, false si no.
     */
    const token = this.getAuthToken();
    return !!token; // Devuelve true si el token existe (no es null, undefined, o una cadena vacía)
  }
};

// Para usarlo en tus componentes Vue:
//
// import { authService } from '@/services/authService'; // Ajusta la ruta según tu estructura
//
// // En el método de login de tu componente:
// async handleLogin() {
//   try {
//     const credentials = { nombre_admin: this.username, password: this.password };
//     const response = await authService.login(credentials);
//     console.log('Login exitoso:', response);
//     // Aquí rediriges al dashboard de admin o actualizas el estado de la UI
//   } catch (error) {
//     console.error('Fallo el login:', error.data ? error.data.error : error.message);
//     // Aquí muestras un mensaje de error al usuario
//   }
// }
//
// // En el método de logout de tu componente:
// async handleLogout() {
//   try {
//     await authService.logout();
//     console.log('Logout exitoso');
//     // Aquí rediriges a la página de login o actualizas el estado de la UI
//   } catch (error) {
//     console.error('Fallo el logout:', error.data ? error.data.error : error.message);
//     // Manejar el error si es necesario
//   }
// }