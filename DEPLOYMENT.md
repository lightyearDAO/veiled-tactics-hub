# Vercel Deployment Guide for Veiled Tactics Hub

This guide provides step-by-step instructions for deploying Veiled Tactics Hub to Vercel.

## Prerequisites

- Vercel account (free tier available)
- GitHub account
- Node.js 18+ installed locally
- Git configured

## Step 1: Prepare the Project

### 1.1 Install Dependencies
```bash
cd veiled-tactics-hub
npm install
```

### 1.2 Build the Project Locally
```bash
npm run build
```

Verify that the build completes successfully and creates a `dist` folder.

## Step 2: Deploy to Vercel

### Method 1: Vercel CLI (Recommended)

#### 2.1 Install Vercel CLI
```bash
npm i -g vercel
```

#### 2.2 Login to Vercel
```bash
vercel login
```

#### 2.3 Deploy from Project Directory
```bash
cd veiled-tactics-hub
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No (for first deployment)
- **What's your project's name?** → `veiled-tactics-hub`
- **In which directory is your code located?** → `./`

#### 2.4 Production Deployment
```bash
vercel --prod
```

### Method 2: Vercel Dashboard

#### 2.1 Import Project
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub repository: `lightyearDAO/veiled-tactics-hub`

#### 2.2 Configure Project Settings
- **Framework Preset**: Vite
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### 2.3 Environment Variables
Add the following environment variables in Vercel dashboard:

```
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
VITE_INFURA_API_KEY=YOUR_INFURA_API_KEY
VITE_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
```

#### 2.4 Deploy
Click "Deploy" button to start the deployment process.

## Step 3: Configure Custom Domain (Optional)

### 3.1 Add Domain in Vercel
1. Go to your project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `veiled-tactics-hub.com`)

### 3.2 Configure DNS
Add the following DNS records:
- **Type**: CNAME
- **Name**: `www`
- **Value**: `cname.vercel-dns.com`

- **Type**: A
- **Name**: `@`
- **Value**: `76.76.19.61`

## Step 4: Environment Configuration

### 4.1 Production Environment Variables
Ensure these are set in Vercel:

```env
# Chain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect Configuration
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID

# Infura Configuration
VITE_INFURA_API_KEY=YOUR_INFURA_API_KEY

# Contract Address (Update after deployment)
VITE_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS

# Optional: Analytics
VITE_ANALYTICS_ENABLED=false
```

### 4.2 Update Contract Address
After deploying your smart contract to Sepolia:
1. Copy the deployed contract address
2. Update `VITE_CONTRACT_ADDRESS` in Vercel environment variables
3. Redeploy the application

## Step 5: Smart Contract Deployment

### 5.1 Deploy to Sepolia
```bash
# Set up environment variables
echo "PRIVATE_KEY=your_private_key_here" >> .env
echo "ETHERSCAN_API_KEY=your_etherscan_api_key" >> .env

# Deploy contract
npm run deploy
```

### 5.2 Verify Contract
```bash
npx hardhat verify --network sepolia CONTRACT_ADDRESS DEPLOYER_ADDRESS
```

### 5.3 Update Frontend
Update the `VITE_CONTRACT_ADDRESS` environment variable in Vercel with the deployed contract address.

## Step 6: Post-Deployment Verification

### 6.1 Test Application
1. Visit your deployed URL
2. Connect wallet (MetaMask, Rainbow, etc.)
3. Switch to Sepolia network
4. Test core functionality:
   - Create strategy
   - Form squad
   - Create mission
   - Complete mission

### 6.2 Performance Check
- Run Lighthouse audit
- Check Core Web Vitals
- Verify mobile responsiveness

## Step 7: Monitoring and Maintenance

### 7.1 Set Up Monitoring
- Enable Vercel Analytics
- Set up error tracking (Sentry)
- Monitor contract interactions

### 7.2 Regular Updates
- Keep dependencies updated
- Monitor for security vulnerabilities
- Update contract if needed

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Environment Variables Not Loading
- Check variable names (must start with `VITE_`)
- Ensure variables are set in Vercel dashboard
- Redeploy after adding variables

#### Wallet Connection Issues
- Verify WalletConnect Project ID
- Check network configuration
- Ensure contract address is correct

#### Contract Interaction Failures
- Verify contract is deployed
- Check contract address
- Ensure user has Sepolia ETH
- Verify contract ABI matches

### Support
- Check Vercel documentation
- Review contract deployment logs
- Test locally first
- Use browser developer tools for debugging

## Deployment Checklist

- [ ] Project builds successfully locally
- [ ] All environment variables configured
- [ ] Smart contract deployed to Sepolia
- [ ] Contract address updated in frontend
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Application tested on deployed URL
- [ ] Wallet connection working
- [ ] Contract interactions functional
- [ ] Performance metrics acceptable
- [ ] Mobile responsiveness verified
- [ ] Error monitoring configured

## URLs and Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Project URL**: https://veiled-tactics-hub.vercel.app
- **GitHub Repository**: https://github.com/lightyearDAO/veiled-tactics-hub
- **Sepolia Explorer**: https://sepolia.etherscan.io
- **Contract Address**: Update after deployment

## Next Steps

1. **Marketing**: Share the deployed application
2. **User Testing**: Gather feedback from users
3. **Feature Updates**: Add new features based on feedback
4. **Security Audit**: Conduct security review
5. **Mainnet Deployment**: Consider mainnet deployment when ready

---

**Note**: This deployment guide assumes you have the necessary permissions and access to the GitHub repository and Vercel account. Make sure to update the contract address and other environment-specific variables as needed.
