var WINS = 0
var LOSSES = 0
var TIES = 0
var prevMoves = []
prevMoves.length = 27
prevMoves.fill(0, 0, 27)
// Fills with all possible variations of RPS RSP PSR etc
var move = 0
var moves = [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)]
var allMoves = [];
var response = regressiveSearch;

function mod(n, m)
{
    return ((n % m) + m) % m;
}

function play(you, bot)
{
    document.getElementById('response').textContent = bot == 0 ? "Rock" : bot == 1 ? "Paper" : "Scissors"
    if (mod(you + 1, 3) == bot)
    {
        LOSSES++
    }
    else if (mod(you - 1, 3) == bot)
    {
        WINS++
    }
    else
    {
        TIES++
    }
    move++
    moves = [moves[1], moves[2], you]
    allMoves.push(you)
    updateResponse()
    updateStatistics()
}

function updateStatistics()
{
    document.getElementById('winrate').textContent = Math.floor(WINS * 100 / (WINS + LOSSES)) + "%"
    document.getElementById('wins').textContent = "Wins: " + WINS
    document.getElementById('loss').textContent = "Losses: " + LOSSES
    document.getElementById('ties').textContent = "Ties: " + TIES
}
// 000 001 011 111 002 012 112 020
// 000 001 00
function updateResponse()
{
    let n = moves[0] * 9 + moves[1] * 3 + moves[2]
    prevMoves[n]++
}

function originalResponse()
{
    let a = prevMoves[moves[1] * 9 + moves[2] * 3]
    let b = prevMoves[moves[1] * 9 + moves[2] * 3 + 1]
    let c = prevMoves[moves[1] * 9 + moves[2] * 3 + 2]
    if (a == b && a == c)
    {
        console.log("Random Response Fallback")
        return Math.floor(Math.random() * 3)
    }
    else if (a > b && a > c)
    {
        return 1
    }
    else if (b > c)
    {
        return 2
    }
    else
    {
        return 0
    }
}
const TREE = new BinarySearchTree()

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