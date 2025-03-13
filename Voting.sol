// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    mapping(string => uint) public votes; // Stores votes for each candidate
    address public owner; // Tracks who deployed the contract

    constructor() {
        owner = msg.sender; // Set the deployer as the owner
    }

    function vote(string memory candidate) public {
        votes[candidate] += 1; // Add 1 vote to the candidate
    }

    function getVotes(string memory candidate) public view returns (uint) {
        return votes[candidate]; // Return the vote count
    }
}