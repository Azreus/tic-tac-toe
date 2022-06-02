const gameBoard = (() => {
  let _gameboard = ['x','o','x','o','o','x','x','o','x'];

  const getGameBoard = () => { return _gameboard; };

  return { getGameBoard };
})();

const displayController = (() => {
  const loadGameBoard = () => {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
      let index = square.getAttribute('data-index');
      let gameboard = gameBoard.getGameBoard();
      square.textContent = gameboard[index];
    });
  };
  loadGameBoard();
  return { loadGameBoard };
})();

displayController.loadGameBoard();

const player = () => {
  return {};
};