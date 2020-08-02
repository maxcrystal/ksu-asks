import React from "react";
import { Meteor } from "meteor/meteor";

const handleAddCoupleClick = e => {
  e.preventDefault();
  const hisNameInput = document.getElementById("his-name");
  const herNameInput = document.getElementById("her-name");
  const he = hisNameInput.value.trim();
  const she = herNameInput.value.trim();
  if (he.length === 0 || she.length === 0) {
    return;
  }

  Meteor.call("couples.insert", {
    he,
    she,
    gameId: "new-game",
  });
  hisNameInput.value = "";
  herNameInput.value = "";
};

const AddCouple = ({ game }) => {
  if (game) {
    return null;
  }
  return (
    <div>
      <form>
        He: <input type="text" id="his-name" />
        She: <input type="text" id="her-name" />
        <button onClick={handleAddCoupleClick}>+</button>
      </form>
    </div>
  );
};

export { AddCouple };
