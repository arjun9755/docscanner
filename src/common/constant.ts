//configs
// API CONFIGS

// !!!! very very important variable make it true only while making production builds
export const IS_PRODUCTION = false;

// PRODUCTION API URL
export const PRODUCTION_BASE_URL = `PRODUCTION_BASE_URL`;

// DEVELOPMENT API URL
export const DEVELOPMENT_BASE_URL = `DEVELOPMENT_BASE_URL`;

// USE BASE URL
export const BASE_URL = IS_PRODUCTION
  ? PRODUCTION_BASE_URL
  : DEVELOPMENT_BASE_URL;

export const currency = '$';
