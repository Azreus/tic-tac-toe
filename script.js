const gameBoard = (() => {
  let _gameboard = new Array(9).fill('');

  const getGameBoard = () => { return _gameboard; };

  const updateGameBoard = (index, mark) => {
    _gameboard[index] = mark;
  }

  return {
    getGameBoard,
    updateGameBoard
  };
})();

const Player = (mark) => {
  const getMark = () => { return mark; };

  return {
    mark,
    getMark
  };
};

const displayController = (() => {
  const squares = document.querySelectorAll('.square');
  
  const loadGameBoard = () => {
    squares.forEach(square => {
      let index = square.getAttribute('data-index');
      let gameboard = gameBoard.getGameBoard();
      square.textContent = gameboard[index];
    });
  };

  const addMark = (square, index) => {
    if (gameController.checkSpot(index)) {
      let currentPlayer = gameController.getCurrentPlayer();
      gameController.switchPlayer(currentPlayer);
      square.textContent = currentPlayer.getMark();
      gameBoard.updateGameBoard(index, currentPlayer.getMark());
    } else {
      return;
    }
    gameController.checkWin();
  }

  squares.forEach(square => {
    let index = square.getAttribute('data-index');
    square.addEventListener('click', () => { addMark(square, index); });
  });

  return {
    loadGameBoard
  };
})();

const gameController = (() => {
  let player1 = Player('x');
  let player2 = Player('o');
  let currentPlayer = player1;

  const _winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]

  const checkWin = () => {
    const player1Mark = player1.getMark();
    const player2Mark = player2.getMark();
    const gameboard = gameBoard.getGameBoard();
    for (let i = 0; i < _winConditions.length; i++) {
      let player1Count = 0;
      let player2Count = 0;
      for (let j = 0; j < _winConditions[i].length; j++) {
        if (player1Mark === gameboard[_winConditions[i][j]]) {
          player1Count++;
          console.log(player1);
        } else if (player2Mark === gameboard[_winConditions[i][j]]) {
          player2Count++;
          console.log(player2);
        }
      }
      if (player1Count === 3) {
        console.log('congrats player 1');
        break;
      } else if (player2Count === 3) {
        console.log('congrats player 2');
        break;
      } else {
        continue;
      }
    }
  };

  const getCurrentPlayer = () => {
    return currentPlayer;
  };

  const checkSpot = (index) => {
    let gameboard = gameBoard.getGameBoard();
    if (gameboard[index] === '') {
      return true;
    } else {
      return false;
    }
  };

  const switchPlayer = (player) => {
    if (player.getMark() === 'x') {
      if (player1.getMark() === 'x') {
        currentPlayer = player2;
      } else {
        currentPlayer = player1;
      }
    } else if (player.getMark() === 'o') {
      if (player1.getMark() === 'o') {
        currentPlayer = player2;
      } else {
        currentPlayer = player1;
      }
    }
  };

  return {
    checkWin,
    checkSpot,
    switchPlayer,
    getCurrentPlayer
  }
})();

displayController.loadGameBoard();