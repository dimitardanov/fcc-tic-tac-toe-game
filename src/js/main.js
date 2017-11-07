
// window.jQuery = $ = require('jquery');
// var bootstrap = require('bootstrap-sass');

const render = require('./renderers/render.js');
const Board = require('./lib/board.js').Board;
const Player = require('./lib/player.js').Player;
const AIPlayer = require('./lib/ai-player.js').AI;
const gt = require('./lib/game-tree.js');

const boardHTML = document.getElementById('board');

render.emptyCells(boardHTML, 9);

var board = new Board();
var humanPlayer = new Player(1, board);
var aiPlayer = new AIPlayer(10, board);
humanPlayer.setOpponent(aiPlayer);
aiPlayer.setOpponent(humanPlayer);

boardHTML.addEventListener('click', makeMove);

function makeMove(e) {
  if (e.target.classList.contains('cell') &&
      e.target.classList.contains('free')) {
    e.target.classList.remove('free');
    render.cross(e.target);
    boardHTML.removeEventListener('click', makeMove);
    var cell = event.target.getAttribute('id');
    humanPlayer.takeTurn(cell);
    takeAITurn();
  }
}

function takeAITurn() {
  if (board.hasMovesLeft()) {
    var cell = aiPlayer.takeTurn();
    var cellHTML = document.getElementById(cell);
    cellHTML.classList.remove('free');
    render.circle(cellHTML);
    setTimeout(function() {
      boardHTML.addEventListener('click', makeMove);
    }, 900);
  }
}
