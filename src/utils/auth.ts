// Simple authentication utility for admin access using environment variables

// Debug logging to help troubleshoot authentication issues
const logAuthAttempt = (username: string, inputPassword: string) => {
  console.log('Auth attempt:', {
    entered: { username, password: '***' },
    adminMatch: username === import.meta.env.VITE_ADMIN_USERNAME,
    partnerMatch: username === import.meta.env.VITE_PARTNER_USERNAME
  });
};

// Check if a user is authorized
export const authenticateUser = (username: string, password: string): boolean => {
  // Log auth attempt for debugging (password is hidden)
  logAuthAttempt(username, password);
  
  // Simple direct comparison with environment variables
  const isAdminUser = username === import.meta.env.VITE_ADMIN_USERNAME && 
                     password === import.meta.env.VITE_ADMIN_PASSWORD;
                     
  const isPartnerUser = username === import.meta.env.VITE_PARTNER_USERNAME && 
                       password === import.meta.env.VITE_PARTNER_PASSWORD;
  
  return isAdminUser || isPartnerUser;
};

// Store authentication state in localStorage
export const login = (username: string, password: string): boolean => {
  if (authenticateUser(username, password)) {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('username', username);
    return true;
  }
  return false;
};

export const logout = (): void => {
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('username');
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

export const getCurrentUser = (): string | null => {
  return localStorage.getItem('username');
};
