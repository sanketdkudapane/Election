const chai = require('chai');
const assert = chai.assert;
const Election = artifacts.require('Election');

contract('Election test suite', function(accounts) {
    const MAINACCOUNT = accounts[0];
    const GASLIMIT = 6721975;

    //demo accounts for testing
    const acc1 = accounts[1];
    const acc2 = accounts[2];
    const acc3 = accounts[3];

    let electionContractInstance;
    let txnObject;

    before(async function() {
        electionContractInstance = await Election.new('Election 1', {from: MAINACCOUNT, gas: GASLIMIT} );
    });

    describe('Election Deployment', () => {
        it('Smart contract deployed successfully', async() => {
            assert.ok(electionContractInstance);
        })
        it('Check initial election name', async() => {
            const electionName = await electionContractInstance.electionName.call();
            assert.equal(electionName,'Election 1')
        })
    });

    describe('Add Candidate', () => { 
        it('Adds new candidate 1', async() => {
            const newCandidate = await electionContractInstance.addCandidate.call('Sanket','Party 1','Khadakwasla');
            assert.ok(newCandidate,'Did not allow to add new candidate');
        })
        it('Adds new candidate 2', async() => {
            const newCandidate = await electionContractInstance.addCandidate.call('Amit','Party 2','Khadakwasla');
            assert.ok(newCandidate,'Did not allow to add new candidate');
        })

    });

    describe('Authorize Voters', () => { 
        it('Authorize voter 1', async() => {
            txnObject = await electionContractInstance.authorize(acc1, { from: MAINACCOUNT, gas: GASLIMIT });
            assert.equal(txnObject.receipt.status, true, 'Authorize voter 1 failed');
        })
        it('Authorize voter 2', async() => {
            txnObject = await electionContractInstance.authorize(acc2, { from: MAINACCOUNT, gas: GASLIMIT });
            assert.equal(txnObject.receipt.status, true, 'Authorize voter 2 failed');
        })
        it('Authorize voter 3', async() => {
            txnObject = await electionContractInstance.authorize(acc3, { from: MAINACCOUNT, gas: GASLIMIT });
            assert.equal(txnObject.receipt.status, true, 'Authorize voter 3 failed');
        })
    });

    describe('Cast Vote', () => { 
        it('Voter 1 casts vote', async() => {
            txnObject = await electionContractInstance.vote(1, { from: acc2, gas: GASLIMIT });
            assert.equal(txnObject.receipt.status, true, 'Failed to cast vote');
        })
    });



});
