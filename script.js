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

  const addClickEvents = () => {
    squares.forEach(square => {
      let index = square.getAttribute('data-index');
      square.addEventListener('click', () => { addMark(square, index); });
    });
  };

  const addMark = (square, index) => {
    if (gameController.checkSpot(index)) {
      let currentPlayerMark = gameController.getCurrentPlayer().getMark();
      square.textContent = currentPlayerMark;
      gameBoard.updateGameBoard(index, currentPlayerMark);
      gameController.switchPlayer();
    } else {
      return;
    }
    if (gameController.getTurn() >= 5) {
      gameController.checkWin();
    }
  }

  return {
    loadGameBoard,
    addClickEvents
  };
})();

const gameController = (() => {
  let player1 = Player('x');
  let player2 = Player('o');
  let _currentPlayer = player1;
  let _turn = 0;

  const _winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]

  const _increaseTurns = () => {
    _turn++;
    return _turn;
  }

  const startGame = () => {
    displayController.loadGameBoard();
    displayController.addClickEvents();
  }

  const checkWin = () => {
    const player1Mark = player1.getMark();
    const player2Mark = player2.getMark();
    const gameboard = gameBoard.getGameBoard();
    for (let i = 0; i < _winConditions.length; i++) {
      let player1Count = 0;
      let player2Count = 0;
      // Loops through each win condition and compares each value to the indexes
      // on the gameboard, checking for which mark is placed there
      for (let j = 0; j < _winConditions[i].length; j++) {
        if (player1Mark === gameboard[_winConditions[i][j]]) {
          player1Count++;
          console.log(player1);
        } else if (player2Mark === gameboard[_winConditions[i][j]]) {
          player2Count++;
          console.log(player2);
        }
      }
      // A playerCount of 3 means there was a win condition
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
    // The game ties after 9 rounds, when there are no spots left
    if (getTurn() == 9) {
      console.log("It's a tie");
    }
  };

  const getCurrentPlayer = () => {
    return _currentPlayer;
  };

  const getTurn = () => {
    return _turn;
  };

  const checkSpot = (index) => {
    let gameboard = gameBoard.getGameBoard();
    if (gameboard[index] === '') {
      return true;
    } else {
      return false;
    }
  };

  const switchPlayer = () => {
    if (_currentPlayer.getMark() === 'x') {
      if (player1.getMark() === 'x') {
        _currentPlayer = player2;
      } else {
        _currentPlayer = player1;
      }
    } else if (_currentPlayer.getMark() === 'o') {
      if (player1.getMark() === 'o') {
        _currentPlayer = player2;
      } else {
        _currentPlayer = player1;
      }
    }
    _increaseTurns();
  };

  return {
    startGame,
    checkWin,
    checkSpot,
    switchPlayer,
    getCurrentPlayer,
    getTurn
  }
})();

const startButton = document.querySelector('.start-game');
startButton.addEventListener('click', gameController.startGame);