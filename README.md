# 🎯 Veiled Tactics Hub

<div align="center">
  <img src="public/favicon.svg" alt="Veiled Tactics Hub Logo" width="64" height="64">
  <h1>🎯 Veiled Tactics Hub</h1>
  <p><strong>🔐 Privacy-Preserving Strategic Command Center</strong></p>
  <p>Revolutionary tactical strategy platform powered by FHE encryption for ultra-secure strategic planning and elite team coordination.</p>
  
  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lightyearDAO/veiled-tactics-hub)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![FHE Powered](https://img.shields.io/badge/FHE-Powered-blue.svg)](https://zama.ai/)
</div>

## 🚀 Mission Statement

Veiled Tactics Hub represents the next evolution in strategic command systems. By leveraging cutting-edge Fully Homomorphic Encryption (FHE) technology from Zama, we've created a platform where sensitive tactical data remains encrypted even during computation. This isn't just another blockchain app—it's a revolutionary approach to secure strategic planning that ensures your tactical intelligence stays veiled from prying eyes.

Built on Ethereum's Sepolia testnet, our platform combines the transparency of blockchain with the privacy of military-grade encryption, creating an unprecedented level of security for strategic operations.

## ⚡ Core Capabilities

### 🛡️ **Military-Grade Privacy**
- **FHE-Powered Encryption**: Your tactical data remains encrypted even during computation
- **Zero-Knowledge Operations**: Execute strategies without revealing sensitive information
- **Quantum-Resistant Security**: Future-proof encryption that stands against emerging threats

### 🎯 **Strategic Command Features**
- **Tactical Strategy Vault**: Create, encrypt, and manage classified strategic plans
- **Elite Squad Formation**: Build and coordinate specialized tactical teams
- **Mission Control Center**: Assign, track, and analyze mission performance
- **Intelligence Analytics**: Encrypted performance metrics and reputation systems

### 🔗 **Blockchain Integration**
- **Decentralized Architecture**: Built on Ethereum Sepolia for maximum transparency
- **Multi-Wallet Support**: Seamless integration with Rainbow, MetaMask, and more
- **Smart Contract Automation**: Automated execution of tactical protocols
- **Immutable Records**: All operations permanently recorded on-chain

## 🏗️ Architecture

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Rainbow Kit** for wallet connectivity
- **Wagmi** for Ethereum interactions

### Smart Contracts
- **Solidity 0.8.24** with FHE support
- **Zama FHEVM** for homomorphic encryption
- **OpenZeppelin** for security standards
- **Sepolia testnet** deployment

### Key Technologies
- **FHE (Fully Homomorphic Encryption)**: Zama's FHEVM
- **Blockchain**: Ethereum Sepolia
- **Wallet**: Rainbow Kit, MetaMask, WalletConnect
- **Build Tool**: Vite
- **Package Manager**: npm

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git
- A Web3 wallet (MetaMask, Rainbow, etc.)
- Sepolia ETH for gas fees

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lightyearDAO/veiled-tactics-hub.git
   cd veiled-tactics-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   # Chain Configuration
   VITE_CHAIN_ID=11155111
   VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
   
   # Wallet Connect Configuration
   VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
   
   # Contract Address (after deployment)
   VITE_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run compile` - Compile smart contracts
- `npm run test` - Run contract tests
- `npm run deploy` - Deploy contracts to Sepolia

## 🔧 Smart Contract Deployment

### Deploy to Sepolia

1. **Set up Hardhat configuration**
   ```bash
   # Add your private key to .env
   PRIVATE_KEY=your_private_key_here
   ETHERSCAN_API_KEY=your_etherscan_api_key
   ```

2. **Deploy the contract**
   ```bash
   npm run deploy
   ```

3. **Update frontend configuration**
   Update `VITE_CONTRACT_ADDRESS` in your `.env` file with the deployed contract address.

## 🎮 Usage Guide

### Creating Strategies
1. Connect your wallet
2. Navigate to "Create Strategy"
3. Fill in strategy details (name, description)
4. Set encrypted parameters (priority, complexity, resource cost)
5. Submit transaction

### Forming Squads
1. Go to "Squad Management"
2. Create a new squad with encrypted member count and skill level
3. Add members to your squad
4. Manage squad settings

### Mission Management
1. Access "Missions" section
2. Create missions with encrypted difficulty and reward
3. Assign missions to squad members
4. Track completion and performance

## 🔐 Security Features

- **FHE Encryption**: All sensitive data encrypted at rest and in computation
- **Zero-Knowledge Proofs**: Verify data without revealing it
- **Decentralized Storage**: Data stored on blockchain for immutability
- **Access Control**: Role-based permissions for different operations
- **Audit Trail**: All operations logged on blockchain

## 🌐 Network Configuration

### Sepolia Testnet
- **Chain ID**: 11155111
- **RPC URL**: https://sepolia.infura.io/v3/YOUR_INFURA_KEY
- **Explorer**: https://sepolia.etherscan.io
- **Faucet**: https://sepoliafaucet.com

### Getting Test ETH
1. Visit [Sepolia Faucet](https://sepoliafaucet.com)
2. Enter your wallet address
3. Request test ETH
4. Wait for confirmation

## 📁 Project Structure

```
veiled-tactics-hub/
├── contracts/                 # Smart contracts
│   └── VeiledTacticsHub.sol  # Main contract
├── scripts/                   # Deployment scripts
│   └── deploy.ts             # Contract deployment
├── src/
│   ├── components/           # React components
│   ├── lib/                  # Utility libraries
│   │   ├── wagmi.ts         # Wallet configuration
│   │   ├── contract.ts      # Contract interactions
│   │   └── fhe-utils.ts     # FHE utilities
│   ├── config/              # Configuration files
│   │   └── env.ts           # Environment config
│   └── pages/               # Page components
├── public/                   # Static assets
└── docs/                    # Documentation
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use conventional commit messages
- Add tests for new features
- Update documentation as needed
- Ensure FHE encryption for sensitive data

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [https://veiled-tactics-hub.vercel.app](https://veiled-tactics-hub.vercel.app)
- **Documentation**: [https://docs.veiled-tactics-hub.com](https://docs.veiled-tactics-hub.com)
- **Smart Contract**: [Sepolia Etherscan](https://sepolia.etherscan.io/address/YOUR_CONTRACT_ADDRESS)

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/lightyearDAO/veiled-tactics-hub/issues)
- **Discussions**: [GitHub Discussions](https://github.com/lightyearDAO/veiled-tactics-hub/discussions)
- **Email**: support@veiled-tactics-hub.com

## 🙏 Acknowledgments

- [Zama](https://zama.ai/) for FHE technology
- [Rainbow](https://rainbow.me/) for wallet integration
- [OpenZeppelin](https://openzeppelin.com/) for security standards
- [Vite](https://vitejs.dev/) for build tooling

---

<div align="center">
  <p>Built with ❤️ by the Veiled Tactics Hub Team</p>
  <p>Powered by FHE and Blockchain Technology</p>
</div>
