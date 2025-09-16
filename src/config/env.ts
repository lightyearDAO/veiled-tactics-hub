// Environment configuration for Veiled Tactics Hub
export const config = {
  // Chain Configuration
  CHAIN_ID: import.meta.env.VITE_CHAIN_ID || '11155111',
  RPC_URL: import.meta.env.VITE_RPC_URL || 'https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990',
  
  // Wallet Connect Configuration
  WALLET_CONNECT_PROJECT_ID: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || '2ec9743d0d0cd7fb94dee1a7e6d33475',
  
  // Infura Configuration
  INFURA_API_KEY: import.meta.env.VITE_INFURA_API_KEY || 'b18fb7e6ca7045ac83c41157ab93f990',
  
  // Contract Configuration
  CONTRACT_ADDRESS: import.meta.env.VITE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
  
  // FHE Configuration
  FHE_NETWORK: 'sepolia',
  FHE_CHAIN_ID: 11155111,
  
  // App Configuration
  APP_NAME: 'Veiled Tactics Hub',
  APP_DESCRIPTION: 'Privacy-Preserving Strategic Platform',
  APP_VERSION: '1.0.0',
  
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.veiled-tactics-hub.com',
  
  // Feature Flags
  FEATURES: {
    FHE_ENABLED: true,
    WALLET_CONNECT_ENABLED: true,
    CONTRACT_INTERACTION_ENABLED: true,
    ANALYTICS_ENABLED: import.meta.env.VITE_ANALYTICS_ENABLED === 'true',
  },
  
  // Network Configuration
  NETWORKS: {
    sepolia: {
      chainId: 11155111,
      name: 'Sepolia',
      rpcUrl: 'https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990',
      explorerUrl: 'https://sepolia.etherscan.io',
      nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
      },
    },
  },
  
  // Default Values
  DEFAULTS: {
    STRATEGY_PRIORITY: 5,
    STRATEGY_COMPLEXITY: 50,
    SQUAD_SKILL_LEVEL: 50,
    MISSION_DIFFICULTY: 5,
    MISSION_DURATION: 24, // hours
    MISSION_REWARD: 100,
  },
  
  // Validation Rules
  VALIDATION: {
    PRIORITY_MIN: 1,
    PRIORITY_MAX: 10,
    COMPLEXITY_MIN: 1,
    COMPLEXITY_MAX: 100,
    SKILL_LEVEL_MIN: 1,
    SKILL_LEVEL_MAX: 100,
    DIFFICULTY_MIN: 1,
    DIFFICULTY_MAX: 10,
    SCORE_MIN: 0,
    SCORE_MAX: 100,
  },
} as const;

// Type definitions for better TypeScript support
export type Config = typeof config;
export type NetworkConfig = typeof config.NETWORKS.sepolia;
export type FeatureFlags = typeof config.FEATURES;
export type ValidationRules = typeof config.VALIDATION;

// Helper functions
export const getNetworkConfig = (chainId: number) => {
  return Object.values(config.NETWORKS).find(network => network.chainId === chainId);
};

export const isFeatureEnabled = (feature: keyof FeatureFlags) => {
  return config.FEATURES[feature];
};

export const validateValue = (value: number, type: keyof ValidationRules) => {
  const rules = config.VALIDATION;
  switch (type) {
    case 'PRIORITY_MIN':
    case 'PRIORITY_MAX':
      return value >= rules.PRIORITY_MIN && value <= rules.PRIORITY_MAX;
    case 'COMPLEXITY_MIN':
    case 'COMPLEXITY_MAX':
      return value >= rules.COMPLEXITY_MIN && value <= rules.COMPLEXITY_MAX;
    case 'SKILL_LEVEL_MIN':
    case 'SKILL_LEVEL_MAX':
      return value >= rules.SKILL_LEVEL_MIN && value <= rules.SKILL_LEVEL_MAX;
    case 'DIFFICULTY_MIN':
    case 'DIFFICULTY_MAX':
      return value >= rules.DIFFICULTY_MIN && value <= rules.DIFFICULTY_MAX;
    case 'SCORE_MIN':
    case 'SCORE_MAX':
      return value >= rules.SCORE_MIN && value <= rules.SCORE_MAX;
    default:
      return true;
  }
};

// Environment validation
export const validateEnvironment = () => {
  const requiredEnvVars = [
    'VITE_WALLET_CONNECT_PROJECT_ID',
    'VITE_RPC_URL',
  ];
  
  const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);
  
  if (missingVars.length > 0) {
    console.warn('Missing environment variables:', missingVars);
    return false;
  }
  
  return true;
};

// Initialize environment validation
if (import.meta.env.DEV) {
  validateEnvironment();
}
