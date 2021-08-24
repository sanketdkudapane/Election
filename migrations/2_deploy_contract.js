var election = artifacts.require("Election");

module.exports = async function(deployer, network, accounts){
    const MAINACCOUNT = accounts[0]; 
    await deployer.deploy(election,"Election 1", {from: MAINACCOUNT, gas: 6721975 } );
}
