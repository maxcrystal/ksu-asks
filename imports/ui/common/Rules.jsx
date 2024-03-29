import React from "react";

import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import HeartIcon from "@material-ui/icons/Favorite";
import HeartBorderIcon from "@material-ui/icons/FavoriteBorder";
import DotIcon from "@material-ui/icons/FiberManualRecord";
import GroupIcon from "@material-ui/icons/Group";
import CopyrightIcon from "@material-ui/icons/Copyright";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

const Rules = () => {
  const currentYear = new Date().getFullYear();

  const handleButtonClick = () => {
    window.open("https://semipyadnaya.ru/ksuasks", "_blank");
  };

  return (
    <div
      style={{
        flexGrow: 4,
        heght: "100%",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Развлекательная семейная терапия для пар и больших компаний</h3>
        <div style={{ display: "flex", padding: ".5rem" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: ".5rem",
              marginRight: ".5rem",
            }}
          >
            <Avatar
              style={{
                height: "2rem",
                width: "2rem",
                backgroundColor: "grey",
              }}
            >
              <GroupIcon />
            </Avatar>
            <div
              style={{
                fontSize: ".5rem",
                color: "grey",
                textAlign: "center",
                marginTop: ".2rem",
              }}
            >
              2+ пары
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: ".5rem",
            }}
          >
            <Avatar
              style={{
                height: "2rem",
                width: "2rem",
                backgroundColor: "grey",
              }}
            >
              18+
            </Avatar>
            <div
              style={{
                fontSize: ".5rem",
                color: "grey",
                textAlign: "center",
                marginTop: ".2rem",
              }}
            >
              18+ лет
            </div>
          </div>
        </div>
      </div>
      <h4>Цель игры</h4>
      <p>
        Пара, в которой партнеры знают друг друга лучше, выигрывает. Очки
        зарабатываются за ответы на вопросы друг о друге.
      </p>
      <h4>Как играть?</h4>
      <p>
        Пары по очереди и искренне отвечают на случайные вопросы друг о друге.
        Сначала один партнер записывает ответ на вопрос в течение первой минуты,
        затем второй должен в течение второй минуты ответить устно на тот же
        вопрос. Остальные пары должны в это время оценить ответ голосованием.
      </p>
      <Button color="primary" variant="outlined" onClick={handleButtonClick}>
        Подробные правила игры
      </Button>
      <h4>Как считаются очки?</h4>
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <HeartIcon style={{ color: "pink", marginRight: ".3rem" }} />2 очка,
          если ответы полностью совпали
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <HeartBorderIcon style={{ color: "pink", marginRight: ".3rem" }} />1
          очко, если ответы совпали частично
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <DotIcon style={{ color: "grey", marginRight: ".3rem" }} />0 очков,
          если ответы совсем разные
        </div>
      </div>
      <p>
        Очки за голосование по одному вопросу усредняются, если кто-то не успел
        проголосовать, то это считается голосованием с 0 очками.
      </p>
      <div>
        <Divider variant="middle" style={{ marginTop: "2rem" }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          <CopyrightIcon
            style={{ color: "grey", marginRight: ".3rem", fontSize: ".8rem" }}
          />
          <div style={{ color: "grey", fontSize: ".6rem" }}>
            М.Хрусталев, 2020 - {currentYear}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Rules };
