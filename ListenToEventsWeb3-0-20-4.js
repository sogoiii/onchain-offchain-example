const Web3 = require('web3') // Works with web3 0.20.4
const contractArtifact = require('./build/contracts/TutorialToken.json')

const web3 = new Web3()
const providerUrl = 'http://localhost:8545'
const provider = new Web3.providers.HttpProvider(providerUrl)
web3.setProvider(provider)

const networkId = web3.version.network
const contractAddr = contractArtifact.networks[networkId].address
const TutorialToken = web3.eth.contract(contractArtifact.abi, contractAddr)
const contract = TutorialToken.at(contractAddr)

const event = contract.Transfer()
event.watch(function(error, result){
    if (error) { return console.error(error) }
      let { args: { from, to, value }, blockNumber } = result
      console.log(`----BlockNumber (${blockNumber})----`)
      console.log(`from = ${from}`)
      console.log(`to = ${to}`)
      console.log(`value = ${value}`)
      console.log(`----BlockNumber (${blockNumber})----`)
  });

