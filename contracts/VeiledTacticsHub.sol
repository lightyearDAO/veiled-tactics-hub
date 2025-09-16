// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title VeiledTacticsHub
 * @dev A privacy-preserving tactical strategy platform using FHE encryption
 * @notice This contract enables secure, encrypted storage and management of tactical strategies
 */
contract VeiledTacticsHub is SepoliaConfig, Ownable {
    using FHE for *;
    
    // Strategy structure with encrypted data
    struct TacticalStrategy {
        euint32 strategyId;
        euint32 priority;           // Encrypted priority level (1-10)
        euint32 complexity;         // Encrypted complexity score (1-100)
        euint32 successRate;        // Encrypted historical success rate (0-100)
        euint32 resourceCost;       // Encrypted resource cost estimate
        ebool isActive;             // Encrypted active status
        ebool isPublic;             // Encrypted public visibility
        string name;                // Public strategy name
        string description;         // Public strategy description
        address creator;            // Strategy creator
        uint256 createdAt;          // Creation timestamp
        uint256 updatedAt;          // Last update timestamp
    }
    
    // Squad structure for team management
    struct Squad {
        euint32 squadId;
        euint32 memberCount;        // Encrypted member count
        euint32 skillLevel;         // Encrypted average skill level
        euint32 experience;         // Encrypted total experience points
        ebool isActive;             // Encrypted active status
        string name;                // Public squad name
        address leader;             // Squad leader
        mapping(address => bool) members; // Squad members
        uint256 createdAt;
    }
    
    // Mission structure for tactical operations
    struct Mission {
        euint32 missionId;
        euint32 difficulty;         // Encrypted difficulty level
        euint32 estimatedDuration;  // Encrypted duration in hours
        euint32 rewardAmount;       // Encrypted reward amount
        euint32 successProbability; // Encrypted success probability
        ebool isActive;             // Encrypted active status
        ebool isCompleted;          // Encrypted completion status
        string title;               // Public mission title
        string description;         // Public mission description
        address assignee;           // Mission assignee
        uint256 deadline;           // Mission deadline
        uint256 createdAt;
    }
    
    // Performance metrics structure
    struct PerformanceMetrics {
        euint32 totalMissions;      // Encrypted total missions completed
        euint32 successRate;        // Encrypted success rate percentage
        euint32 averageScore;       // Encrypted average performance score
        euint32 skillRating;        // Encrypted skill rating
        ebool isVerified;           // Encrypted verification status
        address user;               // User address
        uint256 lastUpdated;        // Last update timestamp
    }
    
    // State variables
    mapping(uint256 => TacticalStrategy) public strategies;
    mapping(uint256 => Squad) public squads;
    mapping(uint256 => Mission) public missions;
    mapping(address => PerformanceMetrics) public userMetrics;
    mapping(address => euint32) public userReputation;
    
    uint256 public strategyCounter;
    uint256 public squadCounter;
    uint256 public missionCounter;
    
    address public verifier;
    
    // Events
    event StrategyCreated(uint256 indexed strategyId, address indexed creator, string name);
    event SquadCreated(uint256 indexed squadId, address indexed leader, string name);
    event MissionCreated(uint256 indexed missionId, address indexed assignee, string title);
    event MissionCompleted(uint256 indexed missionId, address indexed assignee, uint32 score);
    event ReputationUpdated(address indexed user, uint32 reputation);
    event StrategyShared(uint256 indexed strategyId, address indexed from, address indexed to);
    
    // Modifiers
    modifier onlyVerifier() {
        require(msg.sender == verifier, "Only verifier can call this function");
        _;
    }
    
    modifier strategyExists(uint256 _strategyId) {
        require(strategies[_strategyId].creator != address(0), "Strategy does not exist");
        _;
    }
    
    modifier squadExists(uint256 _squadId) {
        require(squads[_squadId].leader != address(0), "Squad does not exist");
        _;
    }
    
    modifier missionExists(uint256 _missionId) {
        require(missions[_missionId].assignee != address(0), "Mission does not exist");
        _;
    }
    
    constructor(address _verifier) Ownable(msg.sender) {
        verifier = _verifier;
    }
    
    /**
     * @dev Create a new tactical strategy with encrypted parameters
     * @param _name Public strategy name
     * @param _description Public strategy description
     * @param _priority Encrypted priority level
     * @param _complexity Encrypted complexity score
     * @param _resourceCost Encrypted resource cost estimate
     * @param _isPublic Encrypted public visibility flag
     * @param inputProof Proof for encrypted parameters
     */
    function createStrategy(
        string memory _name,
        string memory _description,
        externalEuint32 _priority,
        externalEuint32 _complexity,
        externalEuint32 _resourceCost,
        externalEuint32 _isPublic,
        bytes calldata inputProof
    ) public returns (uint256) {
        uint256 strategyId = strategyCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalPriority = FHE.fromExternal(_priority, inputProof);
        euint32 internalComplexity = FHE.fromExternal(_complexity, inputProof);
        euint32 internalResourceCost = FHE.fromExternal(_resourceCost, inputProof);
        ebool internalIsPublic = FHE.fromExternal(_isPublic, inputProof);
        
        strategies[strategyId] = TacticalStrategy({
            strategyId: FHE.asEuint32(0), // Will be set properly later
            priority: internalPriority,
            complexity: internalComplexity,
            successRate: FHE.asEuint32(0), // Initial success rate
            resourceCost: internalResourceCost,
            isActive: FHE.asEbool(true),
            isPublic: internalIsPublic,
            name: _name,
            description: _description,
            creator: msg.sender,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });
        
        emit StrategyCreated(strategyId, msg.sender, _name);
        return strategyId;
    }
    
    /**
     * @dev Create a new squad with encrypted parameters
     * @param _name Public squad name
     * @param _memberCount Encrypted initial member count
     * @param _skillLevel Encrypted average skill level
     * @param inputProof Proof for encrypted parameters
     */
    function createSquad(
        string memory _name,
        externalEuint32 _memberCount,
        externalEuint32 _skillLevel,
        bytes calldata inputProof
    ) public returns (uint256) {
        uint256 squadId = squadCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalMemberCount = FHE.fromExternal(_memberCount, inputProof);
        euint32 internalSkillLevel = FHE.fromExternal(_skillLevel, inputProof);
        
        Squad storage newSquad = squads[squadId];
        newSquad.squadId = FHE.asEuint32(0); // Will be set properly later
        newSquad.memberCount = internalMemberCount;
        newSquad.skillLevel = internalSkillLevel;
        newSquad.experience = FHE.asEuint32(0); // Initial experience
        newSquad.isActive = FHE.asEbool(true);
        newSquad.name = _name;
        newSquad.leader = msg.sender;
        newSquad.members[msg.sender] = true;
        newSquad.createdAt = block.timestamp;
        
        emit SquadCreated(squadId, msg.sender, _name);
        return squadId;
    }
    
    /**
     * @dev Create a new mission with encrypted parameters
     * @param _title Public mission title
     * @param _description Public mission description
     * @param _assignee Mission assignee address
     * @param _deadline Mission deadline timestamp
     * @param _difficulty Encrypted difficulty level
     * @param _duration Encrypted estimated duration
     * @param _reward Encrypted reward amount
     * @param inputProof Proof for encrypted parameters
     */
    function createMission(
        string memory _title,
        string memory _description,
        address _assignee,
        uint256 _deadline,
        externalEuint32 _difficulty,
        externalEuint32 _duration,
        externalEuint32 _reward,
        bytes calldata inputProof
    ) public returns (uint256) {
        uint256 missionId = missionCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalDifficulty = FHE.fromExternal(_difficulty, inputProof);
        euint32 internalDuration = FHE.fromExternal(_duration, inputProof);
        euint32 internalReward = FHE.fromExternal(_reward, inputProof);
        
        missions[missionId] = Mission({
            missionId: FHE.asEuint32(0), // Will be set properly later
            difficulty: internalDifficulty,
            estimatedDuration: internalDuration,
            rewardAmount: internalReward,
            successProbability: FHE.asEuint32(50), // Initial 50% probability
            isActive: FHE.asEbool(true),
            isCompleted: FHE.asEbool(false),
            title: _title,
            description: _description,
            assignee: _assignee,
            deadline: _deadline,
            createdAt: block.timestamp
        });
        
        emit MissionCreated(missionId, _assignee, _title);
        return missionId;
    }
    
    /**
     * @dev Complete a mission and update performance metrics
     * @param _missionId Mission ID to complete
     * @param _score Encrypted performance score
     * @param inputProof Proof for encrypted score
     */
    function completeMission(
        uint256 _missionId,
        externalEuint32 _score,
        bytes calldata inputProof
    ) public missionExists(_missionId) {
        require(missions[_missionId].assignee == msg.sender, "Only assignee can complete mission");
        require(block.timestamp <= missions[_missionId].deadline, "Mission deadline has passed");
        
        // Convert external encrypted score to internal
        euint32 internalScore = FHE.fromExternal(_score, inputProof);
        
        // Mark mission as completed
        missions[_missionId].isCompleted = FHE.asEbool(true);
        missions[_missionId].isActive = FHE.asEbool(false);
        
        // Update user performance metrics
        PerformanceMetrics storage metrics = userMetrics[msg.sender];
        metrics.totalMissions = FHE.add(metrics.totalMissions, FHE.asEuint32(1));
        metrics.averageScore = FHE.div(
            FHE.add(metrics.averageScore, internalScore),
            FHE.asEuint32(2)
        );
        metrics.lastUpdated = block.timestamp;
        
        // Update reputation based on performance
        euint32 reputationIncrease = FHE.div(internalScore, FHE.asEuint32(10));
        userReputation[msg.sender] = FHE.add(userReputation[msg.sender], reputationIncrease);
        
        emit MissionCompleted(_missionId, msg.sender, 0); // Score will be decrypted off-chain
        emit ReputationUpdated(msg.sender, 0); // Reputation will be decrypted off-chain
    }
    
    /**
     * @dev Share a strategy with another user
     * @param _strategyId Strategy ID to share
     * @param _recipient Recipient address
     */
    function shareStrategy(
        uint256 _strategyId,
        address _recipient
    ) public strategyExists(_strategyId) {
        require(strategies[_strategyId].creator == msg.sender, "Only creator can share strategy");
        require(_recipient != address(0), "Invalid recipient address");
        
        emit StrategyShared(_strategyId, msg.sender, _recipient);
    }
    
    /**
     * @dev Update strategy success rate (only verifier)
     * @param _strategyId Strategy ID
     * @param _successRate Encrypted new success rate
     * @param inputProof Proof for encrypted success rate
     */
    function updateStrategySuccessRate(
        uint256 _strategyId,
        externalEuint32 _successRate,
        bytes calldata inputProof
    ) public onlyVerifier strategyExists(_strategyId) {
        euint32 internalSuccessRate = FHE.fromExternal(_successRate, inputProof);
        strategies[_strategyId].successRate = internalSuccessRate;
        strategies[_strategyId].updatedAt = block.timestamp;
    }
    
    /**
     * @dev Add member to squad
     * @param _squadId Squad ID
     * @param _member Member address to add
     */
    function addSquadMember(
        uint256 _squadId,
        address _member
    ) public squadExists(_squadId) {
        require(squads[_squadId].leader == msg.sender, "Only squad leader can add members");
        require(_member != address(0), "Invalid member address");
        require(!squads[_squadId].members[_member], "Member already in squad");
        
        squads[_squadId].members[_member] = true;
        squads[_squadId].memberCount = FHE.add(squads[_squadId].memberCount, FHE.asEuint32(1));
    }
    
    /**
     * @dev Remove member from squad
     * @param _squadId Squad ID
     * @param _member Member address to remove
     */
    function removeSquadMember(
        uint256 _squadId,
        address _member
    ) public squadExists(_squadId) {
        require(squads[_squadId].leader == msg.sender, "Only squad leader can remove members");
        require(squads[_squadId].members[_member], "Member not in squad");
        
        squads[_squadId].members[_member] = false;
        squads[_squadId].memberCount = FHE.sub(squads[_squadId].memberCount, FHE.asEuint32(1));
    }
    
    /**
     * @dev Update verifier address (only owner)
     * @param _newVerifier New verifier address
     */
    function updateVerifier(address _newVerifier) public onlyOwner {
        require(_newVerifier != address(0), "Invalid verifier address");
        verifier = _newVerifier;
    }
    
    /**
     * @dev Get strategy public information
     * @param _strategyId Strategy ID
     * @return name Strategy name
     * @return description Strategy description
     * @return creator Strategy creator
     * @return createdAt Creation timestamp
     */
    function getStrategyInfo(uint256 _strategyId) 
        public 
        view 
        strategyExists(_strategyId) 
        returns (
            string memory name,
            string memory description,
            address creator,
            uint256 createdAt
        ) 
    {
        TacticalStrategy storage strategy = strategies[_strategyId];
        return (strategy.name, strategy.description, strategy.creator, strategy.createdAt);
    }
    
    /**
     * @dev Get squad public information
     * @param _squadId Squad ID
     * @return name Squad name
     * @return leader Squad leader
     * @return createdAt Creation timestamp
     */
    function getSquadInfo(uint256 _squadId) 
        public 
        view 
        squadExists(_squadId) 
        returns (
            string memory name,
            address leader,
            uint256 createdAt
        ) 
    {
        Squad storage squad = squads[_squadId];
        return (squad.name, squad.leader, squad.createdAt);
    }
    
    /**
     * @dev Get mission public information
     * @param _missionId Mission ID
     * @return title Mission title
     * @return description Mission description
     * @return assignee Mission assignee
     * @return deadline Mission deadline
     */
    function getMissionInfo(uint256 _missionId) 
        public 
        view 
        missionExists(_missionId) 
        returns (
            string memory title,
            string memory description,
            address assignee,
            uint256 deadline
        ) 
    {
        Mission storage mission = missions[_missionId];
        return (mission.title, mission.description, mission.assignee, mission.deadline);
    }
    
    /**
     * @dev Check if user is squad member
     * @param _squadId Squad ID
     * @param _member Member address
     * @return isMember True if member is in squad
     */
    function isSquadMember(uint256 _squadId, address _member) 
        public 
        view 
        squadExists(_squadId) 
        returns (bool isMember) 
    {
        return squads[_squadId].members[_member];
    }
}
