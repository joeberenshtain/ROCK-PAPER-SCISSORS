var WINS = 0
var LOSSES = 0
var TIES = 0
const TREE = new BinarySearchTree()
var allMoves = [];
var response = regressiveSearch;

function mod(n, m)
{
    return ((n % m) + m) % m;
}

function play(you, bot)
{

    if (mod(you + 1, 3) == bot)
    {
        document.getElementById('response').textContent = "You Lose!"
        document.getElementById('response').style.color = "red"
        LOSSES++
    }
    else if (mod(you - 1, 3) == bot)
    {
        document.getElementById('response').textContent = "You Win!"
        document.getElementById('response').style.color = "green"
        WINS++
    }
    else
    {
        document.getElementById('response').textContent = "You Tie!"
        document.getElementById('response').style.color = "grey"
        TIES++
    }
    allMoves.push(you)
    updateResponse()
    updateStatistics()
}

function updateStatistics()
{
    document.getElementById('winrate').textContent = Math.floor(WINS * 100 / (WINS + LOSSES)) + "%"
    document.getElementById('wins').textContent = WINS
    document.getElementById('losses').textContent = LOSSES
    document.getElementById('ties').textContent =   TIES
}

function regressiveSearch()
{
    TREE.add(allMoves)
    let rockWeight = (TREE.root.descendants[0] || new TreeNode(0)).descendWeight(allMoves)
    let paperWeight = (TREE.root.descendants[1] || new TreeNode(0)).descendWeight(allMoves)
    let scissorsWeight = (TREE.root.descendants[2] || new TreeNode(0)).descendWeight(allMoves)
    console.log(rockWeight, paperWeight, scissorsWeight)
    if (rockWeight == paperWeight)
    {
        if (paperWeight == scissorsWeight)
        {
            return Math.floor(Math.random() * 3);
        }
        else if (paperWeight > scissorsWeight)
        {
            return Math.floor(Math.random() * 2) + 1;
        }
        else
        {
            return 0;
        }
    }
    else if (rockWeight > paperWeight)
    {
        if (rockWeight > scissorsWeight)
        {
            return 1;
        }
        else
        {
            return 0;
        }
    }
    else
    {
        if (paperWeight == scissorsWeight)
        {
            return (Math.floor(Math.random() * 2) + 2) % 3;
        }
        else if (paperWeight > scissorsWeight)
        {
            return 2;
        }
        else
        {
            return 0;
        }
    }
}
document.getElementById('rock').onclick = () => play(0, response())
document.getElementById('paper').onclick = () => play(1, response())
document.getElementById('scissors').onclick = () => play(2, response())
