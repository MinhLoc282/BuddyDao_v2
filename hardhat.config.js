/** @type import('hardhat/config').HardhatUserConfig */


require('dotenv').config()

require('@openzeppelin/hardhat-upgrades')
require('@nomiclabs/hardhat-etherscan')
require('@nomiclabs/hardhat-waffle')
require('hardhat-gas-reporter')
require('solidity-coverage')
require('hardhat-contract-sizer')
require('hardhat-abi-exporter')

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.8.18',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      outputSelection: {
        '*': {
          '*': ['storageLayout']
        }
      }
    }
  },
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0 // workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
    },
    bsctest: {
      url: process.env.BscTestUrl,
      accounts: process.env.PrivateKey !== undefined ? [process.env.PrivateKey] : []
    },
    bsc: {
      url: process.env.BscMainUrl,
      accounts: process.env.PrivateKey !== undefined ? [process.env.PrivateKey] : []
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD',
    gasPrice: 200,
    showTimeSpent: true,
    coinmarketcap: process.env.COINMARKETCAP_API
  },
  etherscan: {
    apiKey: process.env.BscApiKey  // bsc
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false
  },
  abiExporter: {
    path: './abi/',
    clear: true,
    flat: true,
    only: [],
    spacing: 2,
    pretty: false
  }
}