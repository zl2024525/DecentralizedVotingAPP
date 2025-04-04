const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');

async function deployContract() {
    const web3 = new Web3(new Web3.providers.HttpProvider('https://sepolia.infura.io/v3/xxxxxx')); // you should write your own Infura project ID

    const privateKey = 'xxxxxx'; // you should write your own private key
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    web3.eth.accounts.wallet.add(account);
    const accounts = web3.eth.accounts.wallet;

    const sourceCode = fs.readFileSync('Vote.sol', 'utf8');
    const input = {
        language: 'Solidity',
        sources: {
            'Vote.sol': {
                content: sourceCode
            }
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['abi', 'evm.bytecode.object']
                }
            }
        }
    };

    const output = JSON.parse(solc.compile(JSON.stringify(input)));
    const contractAbi = output.contracts['Vote.sol'].Vote.abi;
    const contractBytecode = output.contracts['Vote.sol'].Vote.evm.bytecode.object;

    const VoteContract = new web3.eth.Contract(contractAbi);
    const deployedContract = await VoteContract.deploy({ data: contractBytecode })
      .send({ from: account.address, gas: 1000000 });

    console.log('Contract deployed at:', deployedContract.options.address);
    return deployedContract;
}

async function main() {
    try {
        const deployedContract = await deployContract();
    } catch (error) {
        console.error('Error deploying contract:', error);
    }
}

main();