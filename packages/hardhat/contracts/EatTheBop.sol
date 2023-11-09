//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/*M.H.G.N Hoarder Labs gaming contract where users search for the real BOP token on the game board. The logic of the game uses randomness
to get a number as the user eats a specific token.  */

contract EatTheBop {
     struct Hoarder {
        uint256 timeStarted;
        bool isHoarding;
        uint256 reward;
        uint256 Total_AllTime_Reward;
    }
    // State Variables some were taken from BopHoardingContract
    mapping (address => Hoarder) public hoarders;
    uint256 timeStarted;
    address public immutable owner;
    uint256 public points = 0;
    uint256[] public nums;
    mapping(address => uint256) public life;
    uint public reward = 6000;
    ERC20 public hoardingToken;
    uint256 public Total_Reward_Pool;


    event Result(address player, uint256 num, bool isWinner);
    event Pooled(address indexed user, uint256 amount);

    constructor(address _owner) {
        owner = _owner;
        hoardingToken = ERC20(0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 );  //Deploy token first
    }

    function playGame() public payable {
        require(msg.value >= 0.01 ether, "Failed to send enough value");
        require(address(this).balance >= reward, "Not enough reward"); // If we want to use ETH reward
        require(hoardingToken.balanceOf(address(this)) >= reward, "The contract does not have enough tokens to give you the reward");
        life[msg.sender] += 3;
    }

    function earnPoint() public {
        require(life[msg.sender] > 0, "Out of life");
        uint randomNumber = uint(keccak256(abi.encode(block.timestamp, msg.sender))) % 10;
        nums.push(randomNumber);

        bool isWinner = false;

        if (randomNumber == 6) {
            isWinner = true;
        // Function to transfer reward for finding the real BOP token
        require(hoardingToken.balanceOf(address(this)) >= reward, "The contract does not have enough tokens to give you the reward");
        hoardingToken.transfer(msg.sender, reward);
        hoarders[msg.sender].Total_AllTime_Reward += reward;
        points += 1;
        }

        else if (randomNumber < 5) {
            life[msg.sender] -= 1;
        }

        emit Result(msg.sender, randomNumber, isWinner);
    }

    function getNums() public view returns (uint256[] memory) {
        return nums;
    }

    function canPlay() public view returns (bool) {
        if (life[msg.sender] > 0) return true;
        return false;
    }

    //Read only function that checks the hoarders hoarding time in seconds.
    function GetPlayTimeInSeconds(address _hoarder) public view returns (uint256) {
        return block.timestamp - hoarders[_hoarder].timeStarted;
    }

     //Transfers tokens to the BOP rewards pool the tokens can't be withdrawn!
    function DonationPool(uint256 _amount) public  {
        require(hoardingToken.balanceOf(msg.sender) >= 0, "You cannot pool more tokens than you hold");
        hoardingToken.transferFrom(msg.sender, address(this), _amount);
        Total_Reward_Pool += _amount;
        emit Pooled(msg.sender, _amount);
    }

    // Modifier: used to define a set of rules that must be met before or after a function is executed
    // Check the withdraw() function
    modifier isOwner() {
        // msg.sender: predefined variable that represents address of the account that called the current function
        require(msg.sender == owner, "Not the Owner");
        _;
    }

    
    /**
     * Function that allows the owner to withdraw all the Ether in the contract
     * The function can only be called by the owner of the contract as defined by the isOwner modifier
     */
    function withdraw() isOwner public {
        (bool success,) = owner.call{value: address(this).balance}("");
        require(success, "Failed to send Ether");
    }

    /**
     * Function that allows the contract to receive ETH
     */
    receive() external payable {}
}
