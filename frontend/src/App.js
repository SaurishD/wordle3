import getBlockchain from "./ethereum";
import React, { useState, useEffect } from "react";

function App() {
  const [wordleContract, setWordleContract] = useState(undefined);
  useEffect(() => {
    const init = () => {
      const { signerAddress, wordleContract } = await getBlockchain();
      setWordleContract(wordleContract);
    };
    init();
  }, [])
  const sendWord = async (word, e) => {
    e.preventDefault();

  }
  return (
    <div className="container">Hello</div>
  );
}

export default App;
