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

    async function buySoda() {
        if(!contract){
            return alert("Please connect your wallet first.");
        }
        const amount = parseInt(document.getElementById("itemPrice").value);

        try{
            const pricePerSoda = ethers.utils.parseEther("0.00002");
            const totalCost = pricePerSoda.mul(amount);

            const tx = await contract.purchase(amount, { value: totalCost });

            await tx.wait();
            alert("Purchase successful!");
        } catch (error) {
            console.error(error);
            alert("Purchase failed: " + error.message);
        }
    }
    document.getElementById("buySoda").onclick = buySoda;