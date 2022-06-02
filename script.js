const gameBoard = (() => {
  let _gameboard = ['o','o','o','o','o','o','o','o','o'];

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
    switchPlayer(currentPlayer);
    square.textContent = currentPlayer.getMark();
    gameBoard.updateGameBoard(index, currentPlayer.getMark());
  }

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

  let player1 = Player('x');
  let player2 = Player('o');
  let currentPlayer = player1;

  squares.forEach(square => {
    let index = square.getAttribute('data-index');
    square.addEventListener('click', () => { addMark(square, index); });
  });

  return { loadGameBoard };
})();

displayController.loadGameBoard();