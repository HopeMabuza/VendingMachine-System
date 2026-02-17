const contractAddress = "0x7b3930aED232EAE82177aaA768A9c1E5217f56FA";

let signer;
let contract;

//Connect wallet on page load
async function connectWallet() {
    if (window.ethereum){

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, CONTRACT_ABI, signer);

        const address = await signer.getAddress();
        document.getElementById("walletAddress").innerText = "Connected to:" + address;
    } else{
        alert("Please install MetaMask.");
    }
    }