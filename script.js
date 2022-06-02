const gameBoard = (() => {
  let _gameboard = ['x','o','x','o','o','x','x','o','x'];

  const getGameBoard = () => { return _gameboard; };

  return { getGameBoard };
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

  const addMark = (square) => {
    square.textContent = 'x';
  }
  
  squares.forEach(square => {
    square.addEventListener('click', () => { addMark(square); });
  });

  return { loadGameBoard };
})();

displayController.loadGameBoard();

const player = () => {
  return {};
};