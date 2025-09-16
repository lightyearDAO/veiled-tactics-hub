import { ethers } from "hardhat";

async function main() {
  console.log("Deploying VeiledTacticsHub contract...");

  // Get the contract factory
  const VeiledTacticsHub = await ethers.getContractFactory("VeiledTacticsHub");

  // Deploy the contract with a verifier address (using deployer as verifier for now)
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  const veiledTacticsHub = await VeiledTacticsHub.deploy(deployer.address);

  await veiledTacticsHub.waitForDeployment();

  const contractAddress = await veiledTacticsHub.getAddress();
  console.log("VeiledTacticsHub deployed to:", contractAddress);
  console.log("Verifier set to:", deployer.address);

  // Save deployment info
  const deploymentInfo = {
    contractAddress,
    verifier: deployer.address,
    deployer: deployer.address,
    network: "sepolia",
    timestamp: new Date().toISOString(),
    blockNumber: await ethers.provider.getBlockNumber(),
  };

  console.log("Deployment completed successfully!");
  console.log("Contract Address:", deploymentInfo.contractAddress);
  console.log("Verifier:", deploymentInfo.verifier);
  console.log("Deployer:", deploymentInfo.deployer);
  console.log("Network:", deploymentInfo.network);
  console.log("Block Number:", deploymentInfo.blockNumber);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
