import { createPublicClient, createWalletClient, http, getContract } from 'viem';
import { sepolia } from 'viem/chains';
import { VeiledTacticsHub } from './contracts/VeiledTacticsHub';

// Contract configuration
export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';
export const CHAIN_ID = import.meta.env.VITE_CHAIN_ID || 11155111;

// RPC URL configuration
export const RPC_URL = import.meta.env.VITE_RPC_URL || 'https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990';

// Create public client for read operations
export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(RPC_URL),
});

// Create wallet client for write operations
export const walletClient = createWalletClient({
  chain: sepolia,
  transport: http(RPC_URL),
});

// Contract ABI (simplified for frontend)
export const contractABI = [
  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'strategyId', type: 'uint256' },
      { indexed: true, name: 'creator', type: 'address' },
      { indexed: false, name: 'name', type: 'string' }
    ],
    name: 'StrategyCreated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'squadId', type: 'uint256' },
      { indexed: true, name: 'leader', type: 'address' },
      { indexed: false, name: 'name', type: 'string' }
    ],
    name: 'SquadCreated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'missionId', type: 'uint256' },
      { indexed: true, name: 'assignee', type: 'address' },
      { indexed: false, name: 'title', type: 'string' }
    ],
    name: 'MissionCreated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'missionId', type: 'uint256' },
      { indexed: true, name: 'assignee', type: 'address' },
      { indexed: false, name: 'score', type: 'uint32' }
    ],
    name: 'MissionCompleted',
    type: 'event'
  },
  // Read functions
  {
    inputs: [{ name: '_strategyId', type: 'uint256' }],
    name: 'getStrategyInfo',
    outputs: [
      { name: 'name', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'creator', type: 'address' },
      { name: 'createdAt', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ name: '_squadId', type: 'uint256' }],
    name: 'getSquadInfo',
    outputs: [
      { name: 'name', type: 'string' },
      { name: 'leader', type: 'address' },
      { name: 'createdAt', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ name: '_missionId', type: 'uint256' }],
    name: 'getMissionInfo',
    outputs: [
      { name: 'title', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'assignee', type: 'address' },
      { name: 'deadline', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { name: '_squadId', type: 'uint256' },
      { name: '_member', type: 'address' }
    ],
    name: 'isSquadMember',
    outputs: [{ name: 'isMember', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  // Write functions (simplified for demo)
  {
    inputs: [
      { name: '_name', type: 'string' },
      { name: '_description', type: 'string' },
      { name: '_priority', type: 'bytes' },
      { name: '_complexity', type: 'bytes' },
      { name: '_resourceCost', type: 'bytes' },
      { name: '_isPublic', type: 'bytes' },
      { name: 'inputProof', type: 'bytes' }
    ],
    name: 'createStrategy',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: '_name', type: 'string' },
      { name: '_memberCount', type: 'bytes' },
      { name: '_skillLevel', type: 'bytes' },
      { name: 'inputProof', type: 'bytes' }
    ],
    name: 'createSquad',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: '_title', type: 'string' },
      { name: '_description', type: 'string' },
      { name: '_assignee', type: 'address' },
      { name: '_deadline', type: 'uint256' },
      { name: '_difficulty', type: 'bytes' },
      { name: '_duration', type: 'bytes' },
      { name: '_reward', type: 'bytes' },
      { name: 'inputProof', type: 'bytes' }
    ],
    name: 'createMission',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: '_missionId', type: 'uint256' },
      { name: '_score', type: 'bytes' },
      { name: 'inputProof', type: 'bytes' }
    ],
    name: 'completeMission',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: '_strategyId', type: 'uint256' },
      { name: '_recipient', type: 'address' }
    ],
    name: 'shareStrategy',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: '_squadId', type: 'uint256' },
      { name: '_member', type: 'address' }
    ],
    name: 'addSquadMember',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: '_squadId', type: 'uint256' },
      { name: '_member', type: 'address' }
    ],
    name: 'removeSquadMember',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const;

// Contract instance
export const contract = getContract({
  address: CONTRACT_ADDRESS as `0x${string}`,
  abi: contractABI,
  client: publicClient,
});

// Contract write instance
export const contractWrite = getContract({
  address: CONTRACT_ADDRESS as `0x${string}`,
  abi: contractABI,
  client: walletClient,
});
