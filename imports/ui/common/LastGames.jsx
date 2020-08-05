import React from "react";
import { useTracker } from "meteor/react-meteor-data";

import { Games } from "../../api/games";

const LastGames = () => {
  const isReady = useTracker(() => Meteor.subscribe("last-games"), []);
  const games = useTracker(
    () =>
      Games.find(
        {},
        { sort: { isActive: -1, updatedAt: -1 }, limit: 10 }
      ).fetch(),
    []
  );

  const renderGamesList = () => {
    return games.map(g => {
      return (
        <div key={g._id}>
          <p>
            <strong>{g.name}</strong>, состояние:{" "}
            {g.isActive ? "идет" : "завершена"}, организатор: {g.creator},
            обновлено: {Date(g.updatedAt).toString()}
          </p>
        </div>
      );
    });
  };

  if (!isReady) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h3>Last Games:</h3>
      {renderGamesList()}
    </div>
  );
};

export { LastGames };
