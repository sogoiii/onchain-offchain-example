const Web3 = require('web3') // Web3 0.20.4 or web3 1 beta
const truffleContract = require("truffle-contract")
const contractArtifact = require('./build/contracts/TutorialToken.json')

const providerUrl = 'http://localhost:8545'
const provider = new Web3.providers.HttpProvider(providerUrl)

const contract = truffleContract(contractArtifact)
contract.setProvider(provider)

// dirty hack for web3@1.0.0 support for localhost testrpc, see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
if (typeof contract.currentProvider.sendAsync !== "function") {
  contract.currentProvider.sendAsync = function() {
      return contract.currentProvider.send.apply(
        contract.currentProvider,
            arguments
      );
    };
  }

contract.deployed()
  .then(contractInstance => {
    const event = contractInstance.Transfer(null, {fromBlock: 0}, (err, res) => {
      if(err) {
        throw Error(err)
      }
    })
    event.watch(function(error, result){
      if (error) { return console.log(error) }
      if (!error) {
        // DO ALL YOUR WORK HERE!
        let { args: { from, to, value }, blockNumber } = result
        console.log(`----BlockNumber (${blockNumber})----`)
        console.log(`from = ${from}`)
        console.log(`to = ${to}`)
        console.log(`value = ${value}`)
        console.log(`----BlockNumber (${blockNumber})----`)
      }
    })
  })
  .catch(e => {
    console.error('Catastrophic Error!')
    console.error(e)
  })
