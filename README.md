# DecentralizedVotingAPP: A Secure and Transparent Voting Tool
A decentralized voting application enabling host-controlled vote distribution and user-friendly candidate voting with result export and feedback features. It leverages the power of smart contracts to provide a secure, transparent, and tamper-proof voting system. The application is designed to be used in various scenarios, such as community decision, corporate elections, and decentralized governance. By eliminating the need for a central authority, it ensures fairness and integrity in the voting process.

## Key Features
### Smart Contract Voting Logic
* The Vote.sol smart contract is the application's core. It handles voter registration, candidate addition, and vote casting.
* Its constructor sets up initial candidates, and only the contract deployer (host) can add more candidates or assign voting rights, ensuring a secure voting environment.

### Web3 Interaction
* deploy.js and index.html work with the Web3 library for Ethereum blockchain interaction.
* deploy.js deploys the Vote.sol contract to the Sepolia testnet. The index.html interface uses Web3, either via MetaMask or an Infura node, allowing users to distribute voting rights, cast votes, and view results.

### User-Friendly Front-End
* The index.html front-end, built with Vue.js, offers an intuitive experience. It has sections for vote distribution and a voting board.
* The board shows candidate details, vote counts, and visualizes results with bar charts. It also supports exporting results as a CSV file and collecting user feedback.

### Voting Rights Control
The mandate function in Vote.sol enables the host to distribute voting rights to specific addresses. This ensures only authorized voters can participate, enhancing election security.

### Vote Casting Rules
Voters use the vote function in the smart contract to cast their votes. After voting, their eligibility is removed. A 2-hour vote interval on the front-end prevents repeated voting, adding fairness and security.

## Installation
### Prerequisites
* **Node.js:** Install Node.js on your system. You can download it from the official Node.js website.
* **MetaMask (Optional but Recommended):** If you want to use MetaMask for wallet management and interaction with the Ethereum network, install the MetaMask browser extension for Chrome or Firefox.
* **Solidity Compiler:** The Solidity code in Vote.sol is compiled using the Solidity compiler(solc). In the deploy.js script, it is installed as Node.js package. However, if you plan to compile Solidity code separately, make sure you have solc installed.

### Install Dependencies
Navigate to the project directory in the terminal and install the required Node.js packages:
```bash
npm install web3 solc
```

## Deployment
### Configure Infura and Private Key
* In the deploy.js file, replace 'https://sepolia.infura.io/v3/xxxxxx' with your own Infura project ID. Infura provides a connection to the Ethereum network.
* Use your own Ethereum private key. This private key should correspond to an account with sufficient funds on the Sepolia testnet for contract deployment.

### Deploy the Smart Contract
Run the following command in the terminal to deploy the Vote.sol smart contract:
```bash
node deploy.js
```
The deployed contract address will be logged in the console. This address is required for the front-end to interact with the contract.

## Usage
### Front-End Setup
* You should put the actual address of the deployed Vote.sol smart contract in the index.html file.
* You should put your project ID and privateKey in the corresponding part.

### Running the Application
Open the index.html file in a web browser.

**Distribute Voting Rights:**
* On the start page, input voter addresses in the textarea, separated by commas.
* Click the "Start Distributing Votes" button. This calls the mandate function in the smart contract to assign voting rights.

**Voting Phase:**
* Once voting rights are distributed, the "Voting Board" appears.
* For each candidate, you'll see their name, current vote count, and a "Vote" button. If you've voted for a candidate in the last 2 hours, the button shows "Voted" with a countdown until you can vote again.
* Click "Vote" to cast your vote, which calls the vote function in the smart contract.

**View Results and Export:**
* Vote counts update in real time, and a bar chart shows the vote distribution.
* Click the "Export Voting Results" button to download the results as a CSV file.

**User Feedback:**
* Click the "User Feedback" button to open a modal.
* Enter your feedback and click "Submit Feedback" to add it to the list shown in the modal.
