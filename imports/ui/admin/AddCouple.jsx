import React from "react";
import { Meteor } from "meteor/meteor";

const handleAddCoupleClick = e => {
  e.preventDefault();
  const hisNameInput = document.getElementById("his-name");
  const herNameInput = document.getElementById("her-name");
  Meteor.call("couples.insert", {
    he: hisNameInput.value.trim(),
    she: herNameInput.value.trim(),
    gameId: "t2Y8hn5qRCEgafGYs", // FIXME replace with proper logic to select active game
  });
  hisNameInput.value = "";
  herNameInput.value = "";
};

const AddCouple = () => {
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
