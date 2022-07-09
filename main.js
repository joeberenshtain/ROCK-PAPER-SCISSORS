var WINS = 0
var LOSSES = 0
var TIES = 0
var prevMoves = []
prevMoves.length = 27
prevMoves.fill(0, 0, 27)

console.log(prevMoves)
// Fills with all possible variations of RPS RSP PSR etc
var move = 0
var moves = [Math.floor(Math.random()*3), Math.floor(Math.random()*3), Math.floor(Math.random()*3)  ]
function mod(n, m) {
    return ((n % m) + m) % m;
  }

function play(you, bot) {   
    document.getElementById('response').textContent = bot == 0 ? "Rock" : bot == 1 ? "Paper" : "Scissors"

    if (mod(you+1, 3)==bot){
        LOSSES++
    } else if (mod(you-1, 3)==bot) {
        WINS++
    }
    else {
        TIES++
    }
    move++
    moves = [moves[1], moves[2], you]
    updateResponse()
    console.log(moves)
    updateStatistics()
}
function updateStatistics() {
    document.getElementById('winrate').textContent = Math.floor(WINS*100/(WINS+LOSSES)) + "%"
    document.getElementById('wins').textContent = "Wins: " + WINS
    document.getElementById('loss').textContent = "Losses: " + LOSSES
    document.getElementById('ties').textContent = "Ties: " + TIES


}

// 000 001 011 111 002 012 112 020
// 000 001 00
function updateResponse() {
    let n = moves[0]*9 + moves[1]*3 + moves[2]
    prevMoves[n]++

}
function generateResponse() {
    let a = prevMoves[moves[1]*9+moves[2]*3  ]
    let b = prevMoves[moves[1]*9+moves[2]*3+1]
    let c = prevMoves[moves[1]*9+moves[2]*3+2]
    console.log(a,b,c)

    if (a == b && a == c) {
        console.log("Random Response Fallback")
        return Math.floor(Math.random()*3)
    }
    else if (a > b && a > c) {
        console.log("test")
        return 1
    }
    else if (b > c) {
        console.log("testues")

        return 2
    }
    else {
        console.log("what ll")
        return 0
    }
}
document.getElementById('rock').onclick = ()=>    play(0, generateResponse())
document.getElementById('paper').onclick = ()=>   play(1, generateResponse())
document.getElementById('scissors').onclick = ()=>play(2, generateResponse())