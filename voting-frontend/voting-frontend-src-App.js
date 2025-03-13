import React, { useState } from "react";
import { ethers } from "ethers";
import "./App.css";

const Voting = () => {
  const contractAddress = "30x5B38Da6a701c568545dCfcB03FcB875f56beddC4";
  const ABI = [
    "function vote(string memory candidate) public",
    "function getVotes(string memory candidate) public view returns (uint)",
  ];

  const [candidate, setCandidate] = useState("");
  const [voteCount, setVoteCount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      return provider.getSigner();
    }
  };

  const voteForCandidate = async () => {
    const signer = await connectWallet();
    const contract = new ethers.Contract(contractAddress, ABI, signer);
    await contract.vote(candidate);
    alert(`Voted for ${candidate}!`);
  };

  const checkVotes = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, ABI, provider);
    const votes = await contract.getVotes(candidate);
    setVoteCount(votes.toString());
  };

  return (
    <div className="App">
      <h1>Web3 Voting dApp</h1>
      <input
        type="text"
        placeholder="Enter candidate name"
        value={candidate}
        onChange={(e) => setCandidate(e.target.value)}
      />
      <button onClick={voteForCandidate}>Vote</button>
      <button onClick={checkVotes}>Check Votes</button>
      {voteCount && <p>{candidate} has {voteCount} votes</p>}
    </div>
  );
};

export default Voting;