import React from "react";

const handleOkClick = e => {
  e.preventDefault();
  const nameInput = document.getElementById("game-name");
  Meteor.call("games.insert", { name: nameInput.value.trim() });
  nameInput.value = "";
};

const AddGame = () => {
  return (
    <form>
      <input type="text" id="game-name" />
      <button onClick={handleOkClick}>Ok</button>
    </form>
  );
};

export { AddGame };