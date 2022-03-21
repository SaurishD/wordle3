// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract WordleContract {
    string[] wordlist = [
        "dummy",
        "soare",
        "mimic",
        "stair",
        "eight",
        "pause",
        "route",
        "equal",
        "bytes",
        "learn"
    ];
    string[] validList = [
        "dummy",
        "soare",
        "mimic",
        "stair",
        "eight",
        "pause",
        "route",
        "equal",
        "bytes",
        "learn"
    ];
    uint256 word_of_the_day;
    address admin;
    mapping(address => mapping(bytes => uint256)) attempts;

    constructor(address _admin) public {
        admin = _admin;
    }

    function updateWord(uint256 _random_number) external {
        require(msg.sender == admin, "You cannot call this transaction");
        word_of_the_day = _random_number;
    }

    function equal(bytes memory b1, bytes memory b2)
        private
        pure
        returns (bool)
    {
        for (uint256 i = 0; i < 5; i++) {
            if (b1[i] != b2[i]) return false;
        }
        return true;
    }

    event CheckWord(address _sender, string _output);

    function checkWord(string calldata input) external returns (string memory) {
        bytes memory temp = bytes(wordlist[word_of_the_day]);
        require(attempts[msg.sender][temp] < 6, "Your attempts are over");
        bool valid = false;
        bytes memory b1 = bytes(input);

        for (uint256 i = 0; i < validList.length; i++) {
            bytes memory b2 = bytes(validList[i]);
            if (equal(b1, b2)) {
                valid = true;
                break;
            }
        }
        require(valid, "Not a valid word");

        bytes memory output = new bytes(5);

        for (uint256 i = 0; i < 5; i++) {
            if (b1[i] == temp[i]) output[i] = "2";
            else if (
                b1[i] == temp[0] ||
                b1[i] == temp[1] ||
                b1[i] == temp[2] ||
                b1[i] == temp[3] ||
                b1[i] == temp[4]
            ) {
                output[i] = "1";
            } else output[i] = "0";
        }
        attempts[msg.sender][temp] += 1;
        bool done = true;
        for (uint256 i = 0; i < 5; i++) {
            if (output[i] != "2") {
                done = false;
                break;
            }
        }
        if (done) {
            attempts[msg.sender][temp] = 6;
        }
        emit CheckWord(msg.sender, string(output));
        return string(output);
    }
}
