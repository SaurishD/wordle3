import { ethers, Contract } from "ethers";
import WordleContract from "./contracts/WordleContract.json"


const getBlockchain = () => new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
        if (window.ethereum) {
            await window.ethereum.enable();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const signerAddress = await signer.getAddress();

            const wordleContract = new Contract(
                WordleContract.networks[window.ethereum.networkVersion].getAddress, WordleContract.abi,
                WordleContract.abi,
                signer
            );
            resolve({ signerAddress, wordleContract });
        }
    })
});

export default getBlockchain;