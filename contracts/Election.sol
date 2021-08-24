pragma solidity ^0.7.5;

contract Election {
    
    struct Candidate{
        string name;
        uint voteCount;  
        string partyName;
        string Constituency;
    }
    
    struct Voter {
        bool isAuthorized;
        bool voted;
        uint vote;  //whom to vote
    }
    
    address payable owner;
    string public electionName;
    uint public winnerCandidate;
    
    mapping(address => Voter) public voters; 
    Candidate[] public candidates;
    
    modifier ownerOnly(){
        require(msg.sender == owner);
        _;      //remaining body of addCandidate
    }
    
    constructor(string memory _electionName) {
        owner = msg.sender;
        electionName = _electionName;
    }
    
    function addCandidate(string memory _name, string memory _partyName, string memory _constituency) ownerOnly public {
        candidates.push((Candidate(_name, 0, _partyName, _constituency)));
    }
    
    function getNumCandidate() public view returns(uint) { 
        return candidates.length;
    }
    
    function authorize(address _voter) ownerOnly public {
        voters[_voter].isAuthorized = true;
    }
    
    function vote(uint _candidateIndex) public {
        require(voters[msg.sender].voted == false);
        require(voters[msg.sender].isAuthorized == true);
        
        voters[msg.sender].vote = _candidateIndex;
        voters[msg.sender].voted = true;
        
        candidates[_candidateIndex].voteCount += 1;
    }
    
    //update winnerCandidate 
    function getWinner() public returns(uint) {
        uint max = 0;
        for(uint i = 0; i < candidates.length; i++)
            if(candidates[i].voteCount > max) 
            {
                max = candidates[i].voteCount;
                winnerCandidate = i;
            }
         return winnerCandidate;
    }
    
    function end() ownerOnly public {
        selfdestruct(owner);
    }
    
}
