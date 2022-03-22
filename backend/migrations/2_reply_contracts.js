const WordleContract = artifacts.require("WordleContract");

module.exports = function (deployer) {
    deployer.deploy(WordleContract);
};
