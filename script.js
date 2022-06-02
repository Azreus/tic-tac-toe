const gameBoard = (() => {
  let _gameboard = ['o','o','o','o','o','o','o','o','o'];

  const getGameBoard = () => { return _gameboard; };

  const updateGameBoard = (index, mark) => {
    _gameboard[index] = mark;
  }

  return { getGameBoard,
          updateGameBoard };
})();

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
    square.textContent = 'x';
    gameBoard.updateGameBoard(index, 'x');
  }

  squares.forEach(square => {
    let index = square.getAttribute('data-index');
    square.addEventListener('click', () => { addMark(square, index); });
  });

  return { loadGameBoard };
})();

displayController.loadGameBoard();

const player = () => {
  return {};
};