let turnModel = {
  playerTurn: "playerTwo",
  switchPlayer: SwitchPlayer,
};
function SwitchPlayer() {
  if (turnModel.playerTurn === "playerOne") {
    turnModel.playerTurn = "playerTwo";
  } else {
    turnModel.playerTurn = "playerOne";
  }
}
export default turnModel;