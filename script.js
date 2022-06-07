const gameBoard = (() => {
  let _gameboard = new Array(9).fill('');

  const getGameBoard = () => { return _gameboard; };

  const updateGameBoard = (index, mark) => {
    _gameboard[index] = mark;
  }

  const resetGameBoard = () => {
    _gameboard = new Array(9).fill('');
  }

  return {
    getGameBoard,
    updateGameBoard,
    resetGameBoard
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
  const message = document.querySelector('.message')
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
    if (!gameController.getGameOver()) {
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
    } else {
      return;
    }
  }

  const displayMessage = (text) => {
    message.textContent = text;
  }

  const showRestartButton = () => {
    restartButton.style.display = "block";
  }

  const hideRestartButton = () => {
    restartButton.style.display = "none";
  }

  const resetDisplay = () => {
    squares.forEach(square => {
      square.textContent = '';
    });
    message.textContent = 'Player 1 = X : Player 2 = O';
  }

  return {
    loadGameBoard,
    addClickEvents,
    displayMessage,
    showRestartButton,
    hideRestartButton,
    resetDisplay
  };
})();

const gameController = (() => {
  let player1 = Player('x');
  let player2 = Player('o');
  let _currentPlayer = player1;
  let _turn = 0;
  let _gameOver = false;

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

  const restartGame = () => {
    gameBoard.resetGameBoard();
    displayController.resetDisplay();
    displayController.hideRestartButton();
    _currentPlayer = player1;
    _turn = 0;
    _gameOver = false;
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
        } else if (player2Mark === gameboard[_winConditions[i][j]]) {
          player2Count++;
        }
      }
      // A playerCount of 3 means there was a win condition
      if (player1Count === 3) {
        displayController.displayMessage('Player 1 has won!');
        _gameOver = true;
        break;
      } else if (player2Count === 3) {
        displayController.displayMessage('Player 2 has won!');
        _gameOver = true;
        break;
      } else {
        continue;
      }
    }
    // The game ties after 9 rounds, when there are no spots left
    if (getTurn() == 9) {
      displayController.displayMessage('Game has tied!');
      _gameOver = true;
    }
    if (_gameOver) {
      displayController.showRestartButton();
    }
  };

  const getCurrentPlayer = () => {
    return _currentPlayer;
  };

  const getTurn = () => {
    return _turn;
  };

  const getGameOver = () => {
    return _gameOver;
  }

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
    getGameOver,
    startGame,
    restartGame,
    checkWin,
    checkSpot,
    switchPlayer,
    getCurrentPlayer,
    getTurn
  }
})();

const restartButton = document.querySelector('#restart-game');
restartButton.addEventListener('click', gameController.restartGame);
gameController.startGame();