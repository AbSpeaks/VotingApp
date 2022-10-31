import React, {useState,useEffect}from 'react';
import Web3modal from 'web3modal';
import {ethers} from 'ethers';
import  {create as ipfsHttpClient} from 'ipfs-http-client';
import axios from 'axios';
import {useRouter}from 'next/router';


//Internal

import {VotingAddrss , VotingAddressABI} from "./constants";

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const fetchContract = (signerOrProvider  ) =>
    new ethers.Contract(VotingAddrrss,VotingAddressABI,signerOrProvider)

    export const VotingContext = React.createContext();

    export const VotingProvider = ({children}) => {
        const votingTitle = 'My smart contract';
        const router = useRouter();
        const [currentAccount , setCurrentAccount] = useState('');
        const [candidateLength , setcandidate] = useState();
        const pushCandidate = [];
        const candidateIndex = [];
        const [candidateArray,setCandidateArray] = useState(pushCandidate);


        ///candidate data section 

        const [error , setError] = useState('');
        const highestVote = [];

        //voter section

        const pushVoter = [];
        const[voterArray , setVoterArray] = useState(pushVoter);
        const[voterLength, setVoterLength] = useState('');
        const[voterAddress,setVoterAddress] = useState([]);

        //----CONNECTING WALLET METAMASK

       const checkIfWalletIsConnected = async() => {
        if(!window.ethereum) return setError("Please Install Metamask");

        const account = await window.ethereum.request({method : "eth_accounts"});

        if(account.length)
        {
            setCurrentAccount(account[0]);

        }
        else{
            setError("Please Insatll Metamask & Connect , Reload");
        }
       };

       ///connect wallet

       const connectWallet = async()=>
       {
            if(!window.ethereum) return setError("Please Insatll MetaMask");
            const account = await window.ethereum.request({method:"eth_requestAccounts"});

            setCurrentAccount(account[0]);
       };

       // UPLOAD TO IPFS VOTER IMAGE

       const uploadIPFS = async(file)=>
       {
        try{
            const added = await client.add({content:file});

            const url = 'https://ipfs.infura.io/ipfs/${added.path}';

            return url;
        }catch(error)
        {
            setError("Error uploading image to IPFS");
        }
       }






        return<VotingContext.Provider value={{votingTitle,
            checkIfWalletIsConnected,
            connectWallet,
            uploadIPFS

        }}>{children}</VotingContext.Provider>
    }


