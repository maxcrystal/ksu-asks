import React from "react";

const handleOkClick = e => {
  e.preventDefault();
  const nameInput = document.getElementById("game-name");
  Meteor.call(
    "games.insert",
    { name: nameInput.value.trim() },
    (err, newGameId) => {
      console.log("new game id", newGameId);
      Meteor.call("couples.assignGame", { gameId: newGameId });
    }
  );

  nameInput.value = "";
};

const AddGame = () => {
  return (
    <form>
      <span>New game: </span>
      <input type="text" id="game-name" />
      <button onClick={handleOkClick}>Ok</button>
    </form>
  );
};

export { AddGame };
