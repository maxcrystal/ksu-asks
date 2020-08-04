import React, { useRef } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

const AddCouple = () => {
  const userId = useTracker(() => Meteor.userId(), []);
  const hisNameInput = useRef();
  const herNameInput = useRef();

  const handleAddCoupleClick = e => {
    e.preventDefault();
    const he = hisNameInput.current.value.trim();
    const she = herNameInput.current.value.trim();
    if (he.length === 0 || she.length === 0) {
      return;
    }

    Meteor.call("couples.insert", {
      he,
      she,
      nextCoupleId: "",
      gameId: userId,
      gameSlug: userId,
    });
    hisNameInput.current.value = "";
    herNameInput.current.value = "";
  };

  return (
    <div>
      <form>
        He: <input type="text" ref={hisNameInput} />
        She: <input type="text" ref={herNameInput} />
        <button onClick={handleAddCoupleClick}>+</button>
      </form>
    </div>
  );
};

export { AddCouple };
