// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Vote {
    address public host;
    mapping(address => uint256) public voters;
    mapping(uint256 => uint256) public candidates;
    uint256 public candidateCount;

    constructor() {
        host = msg.sender;
        addCandidate();
        addCandidate();
        addCandidate();
    }

    function mandate(address[] memory _voters) public {
        require(msg.sender == host, "Only host can mandate");
        for (uint256 i = 0; i < _voters.length; i++) {
            voters[_voters[i]] = 1;
        }
    }

    function vote(uint256 _candidateId) public {
        require(voters[msg.sender] > 0, "Not a voter");
        require(_candidateId < candidateCount, "Invalid candidate ID");
        candidates[_candidateId]++;
        voters[msg.sender] = 0;
    }

    function addCandidate() public {
        require(msg.sender == host, "Only host can add candidate");
        candidates[candidateCount] = 0;
        candidateCount++;
    }

    function getCandidateCount() public view returns (uint256) {
        return candidateCount;
    }

    function getCandidateVotes(uint256 _candidateId) public view returns (uint256) {
        require(_candidateId < candidateCount, "Invalid candidate ID");
        return candidates[_candidateId];
    }
}