import { FhevmInstance } from '@fhevm/sdk';

// FHE utility functions for Veiled Tactics Hub
export class FHEUtils {
  private static instance: FhevmInstance | null = null;

  /**
   * Initialize FHE instance
   */
  static async initializeFHE(): Promise<FhevmInstance> {
    if (this.instance) {
      return this.instance;
    }

    try {
      // Import FHEVM SDK dynamically
      const { createInstance } = await import('@fhevm/sdk');
      
      // Create FHE instance for Sepolia network
      this.instance = await createInstance({
        chainId: 11155111, // Sepolia chain ID
        publicKey: {
          name: 'FHE',
          version: '1.0.0',
        },
      });

      return this.instance;
    } catch (error) {
      console.error('Failed to initialize FHE:', error);
      throw new Error('FHE initialization failed');
    }
  }

  /**
   * Get FHE instance
   */
  static async getFhevmInstance(): Promise<FhevmInstance> {
    if (!this.instance) {
      return await this.initializeFHE();
    }
    return this.instance;
  }

  /**
   * Encrypt a number value for FHE operations
   * @param value - The number to encrypt
   * @param contractAddress - The contract address
   * @param userAddress - The user's wallet address
   * @returns Encrypted data and input proof
   */
  static async encryptValue(
    value: number,
    contractAddress: string,
    userAddress: string
  ): Promise<{ encryptedData: string; inputProof: string }> {
    try {
      const instance = await this.getFhevmInstance();
      
      // Encrypt the value
      const encryptedData = instance.encrypt32(value);
      
      // Generate input proof
      const inputProof = await instance.generateInputProof({
        input: encryptedData,
        publicKey: {
          name: 'FHE',
          version: '1.0.0',
        },
        userAddress,
        contractAddress,
      });

      return {
        encryptedData: encryptedData,
        inputProof: inputProof,
      };
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('Failed to encrypt value');
    }
  }

  /**
   * Encrypt priority level (1-10)
   */
  static async encryptPriority(
    priority: number,
    contractAddress: string,
    userAddress: string
  ): Promise<{ encryptedData: string; inputProof: string }> {
    if (priority < 1 || priority > 10) {
      throw new Error('Priority must be between 1 and 10');
    }
    return this.encryptValue(priority, contractAddress, userAddress);
  }

  /**
   * Encrypt complexity score (1-100)
   */
  static async encryptComplexity(
    complexity: number,
    contractAddress: string,
    userAddress: string
  ): Promise<{ encryptedData: string; inputProof: string }> {
    if (complexity < 1 || complexity > 100) {
      throw new Error('Complexity must be between 1 and 100');
    }
    return this.encryptValue(complexity, contractAddress, userAddress);
  }

  /**
   * Encrypt resource cost
   */
  static async encryptResourceCost(
    cost: number,
    contractAddress: string,
    userAddress: string
  ): Promise<{ encryptedData: string; inputProof: string }> {
    if (cost < 0) {
      throw new Error('Resource cost cannot be negative');
    }
    return this.encryptValue(cost, contractAddress, userAddress);
  }

  /**
   * Encrypt boolean value
   */
  static async encryptBoolean(
    value: boolean,
    contractAddress: string,
    userAddress: string
  ): Promise<{ encryptedData: string; inputProof: string }> {
    return this.encryptValue(value ? 1 : 0, contractAddress, userAddress);
  }

  /**
   * Encrypt skill level (1-100)
   */
  static async encryptSkillLevel(
    skillLevel: number,
    contractAddress: string,
    userAddress: string
  ): Promise<{ encryptedData: string; inputProof: string }> {
    if (skillLevel < 1 || skillLevel > 100) {
      throw new Error('Skill level must be between 1 and 100');
    }
    return this.encryptValue(skillLevel, contractAddress, userAddress);
  }

  /**
   * Encrypt member count
   */
  static async encryptMemberCount(
    count: number,
    contractAddress: string,
    userAddress: string
  ): Promise<{ encryptedData: string; inputProof: string }> {
    if (count < 0) {
      throw new Error('Member count cannot be negative');
    }
    return this.encryptValue(count, contractAddress, userAddress);
  }

  /**
   * Encrypt difficulty level (1-10)
   */
  static async encryptDifficulty(
    difficulty: number,
    contractAddress: string,
    userAddress: string
  ): Promise<{ encryptedData: string; inputProof: string }> {
    if (difficulty < 1 || difficulty > 10) {
      throw new Error('Difficulty must be between 1 and 10');
    }
    return this.encryptValue(difficulty, contractAddress, userAddress);
  }

  /**
   * Encrypt duration in hours
   */
  static async encryptDuration(
    duration: number,
    contractAddress: string,
    userAddress: string
  ): Promise<{ encryptedData: string; inputProof: string }> {
    if (duration < 0) {
      throw new Error('Duration cannot be negative');
    }
    return this.encryptValue(duration, contractAddress, userAddress);
  }

  /**
   * Encrypt reward amount
   */
  static async encryptReward(
    reward: number,
    contractAddress: string,
    userAddress: string
  ): Promise<{ encryptedData: string; inputProof: string }> {
    if (reward < 0) {
      throw new Error('Reward cannot be negative');
    }
    return this.encryptValue(reward, contractAddress, userAddress);
  }

  /**
   * Encrypt performance score (0-100)
   */
  static async encryptScore(
    score: number,
    contractAddress: string,
    userAddress: string
  ): Promise<{ encryptedData: string; inputProof: string }> {
    if (score < 0 || score > 100) {
      throw new Error('Score must be between 0 and 100');
    }
    return this.encryptValue(score, contractAddress, userAddress);
  }

  /**
   * Decrypt a value (for authorized users only)
   * @param encryptedData - The encrypted data
   * @param contractAddress - The contract address
   * @param userAddress - The user's wallet address
   * @returns Decrypted value
   */
  static async decryptValue(
    encryptedData: string,
    contractAddress: string,
    userAddress: string
  ): Promise<number> {
    try {
      const instance = await this.getFhevmInstance();
      
      // Decrypt the value
      const decryptedValue = instance.decrypt(encryptedData, contractAddress);
      
      return decryptedValue;
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('Failed to decrypt value');
    }
  }

  /**
   * Generate multiple encrypted values with a single proof
   * @param values - Array of values to encrypt
   * @param contractAddress - The contract address
   * @param userAddress - The user's wallet address
   * @returns Array of encrypted data and combined input proof
   */
  static async encryptMultipleValues(
    values: number[],
    contractAddress: string,
    userAddress: string
  ): Promise<{ encryptedData: string[]; inputProof: string }> {
    try {
      const instance = await this.getFhevmInstance();
      
      // Encrypt all values
      const encryptedData = values.map(value => instance.encrypt32(value));
      
      // Generate combined input proof
      const inputProof = await instance.generateInputProof({
        input: encryptedData,
        publicKey: {
          name: 'FHE',
          version: '1.0.0',
        },
        userAddress,
        contractAddress,
      });

      return {
        encryptedData,
        inputProof,
      };
    } catch (error) {
      console.error('Multiple encryption failed:', error);
      throw new Error('Failed to encrypt multiple values');
    }
  }

  /**
   * Validate encrypted data format
   * @param encryptedData - The encrypted data to validate
   * @returns True if valid, false otherwise
   */
  static validateEncryptedData(encryptedData: string): boolean {
    try {
      // Basic validation - check if it's a valid hex string
      if (!/^0x[0-9a-fA-F]+$/.test(encryptedData)) {
        return false;
      }
      
      // Check minimum length (should be at least 64 characters for 32-bit value)
      if (encryptedData.length < 66) {
        return false;
      }
      
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get FHE network status
   * @returns Network status information
   */
  static async getNetworkStatus(): Promise<{
    isConnected: boolean;
    chainId: number;
    networkName: string;
  }> {
    try {
      const instance = await this.getFhevmInstance();
      
      return {
        isConnected: true,
        chainId: 11155111,
        networkName: 'Sepolia',
      };
    } catch (error) {
      return {
        isConnected: false,
        chainId: 0,
        networkName: 'Unknown',
      };
    }
  }
}
