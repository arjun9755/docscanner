// ─────────────────────────────────────────────────────
// API ENDPOINTS
// Add all your endpoint paths here grouped by feature.
// Usage:  import { endPoints } from '@api';
// ─────────────────────────────────────────────────────

export const endPoints = {
  // ── Auth ──────────────────────────────────────────
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
  },

  // Add more feature groups below as your app grows
  // home: { ... },
  // user: { ... },
} as const;
