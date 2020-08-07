import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import Button from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import { makeStyles } from "@material-ui/core/styles";

import { Couples } from "../../api/couples";

const useStyles = makeStyles(theme => ({
  couple: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "10px",
    paddingRight: "10px",
    marginTop: "5px",
    marginBottom: "5px",
    backgroundColor: "#fafafa",
    borderRadius: "10px",
    "& > *": { margin: 0 },
  },
}));

const Couple = ({ couple }) => {
  const classes = useStyles();

  const handleRemoveCoupleClick = _id => {
    Meteor.call("couples.remove", { _id });
  };

  return (
    <div className={classes.couple}>
      <h4>
        {couple.names.he} и {couple.names.she}
      </h4>
      <Button
        color="secondary"
        onClick={() => handleRemoveCoupleClick(couple._id)}
      >
        <DeleteIcon />
      </Button>
    </div>
  );
};

const CoupleList = () => {
  const couples = useTracker(() => {
    const userId = Meteor.userId();
    const subscription = Meteor.subscribe("couples", { gameSlug: userId });
    const couples = Couples.find({ gameId: userId }).fetch();
    return couples;
  }, []);

  return (
    <div
      style={{
        flexGrow: 4,
        WebkitOverflowScrolling: "touch",
        overflowY: "scroll",
      }}
    >
      {couples.map(couple => (
        <Couple key={couple._id} couple={couple} />
      ))}
    </div>
  );
};

export { CoupleList };
