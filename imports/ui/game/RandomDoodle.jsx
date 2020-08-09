import React from "react";
import { Random } from "meteor/random";

import { BalletDoodle } from "react-open-doodles";
import { BikiniDoodle } from "react-open-doodles";
import { ChillingDoodle } from "react-open-doodles";
import { ClumsyDoodle } from "react-open-doodles";
import { CoffeeDoodle } from "react-open-doodles";
import { DancingDoodle } from "react-open-doodles";
import { DogJumpDoodle } from "react-open-doodles";
import { DoggieDoodle } from "react-open-doodles";
import { FloatDoodle } from "react-open-doodles";
import { GroovyDoodle } from "react-open-doodles";
import { IceCreamDoodle } from "react-open-doodles";
import { JumpingDoodle } from "react-open-doodles";
import { LayingDoodle } from "react-open-doodles";
import { LevitateDoodle } from "react-open-doodles";
import { LovingDoodle } from "react-open-doodles";
import { MeditatingDoodle } from "react-open-doodles";
import { MoshingDoodle } from "react-open-doodles";
import { PettingDoodle } from "react-open-doodles";
import { PlantDoodle } from "react-open-doodles";
import { ReadingDoodle } from "react-open-doodles";
import { ReadingSideDoodle } from "react-open-doodles";
import { RollerSkatingDoodle } from "react-open-doodles";
import { RollingDoodle } from "react-open-doodles";
import { RunningDoodle } from "react-open-doodles";
import { SelfieDoodle } from "react-open-doodles";
import { SittingDoodle } from "react-open-doodles";
import { SittingReadingDoodle } from "react-open-doodles";
import { SleekDoodle } from "react-open-doodles";
import { SprintingDoodle } from "react-open-doodles";
import { StrollingDoodle } from "react-open-doodles";
import { SwingingDoodle } from "react-open-doodles";
import { UnboxingDoodle } from "react-open-doodles";
import { ZombieingDoodle } from "react-open-doodles";

const RandomDoodle = () => {
  const doodles = [
    <BalletDoodle />,
    <BikiniDoodle />,
    <ChillingDoodle />,
    <ClumsyDoodle />,
    <CoffeeDoodle />,
    <DancingDoodle />,
    <DogJumpDoodle />,
    <DoggieDoodle />,
    <FloatDoodle />,
    <GroovyDoodle />,
    <IceCreamDoodle />,
    <JumpingDoodle />,
    <LayingDoodle />,
    <LevitateDoodle />,
    <LovingDoodle />,
    <MeditatingDoodle />,
    <MoshingDoodle />,
    <PettingDoodle />,
    <PlantDoodle />,
    <ReadingDoodle />,
    <ReadingSideDoodle />,
    <RollerSkatingDoodle />,
    <RollingDoodle />,
    <RunningDoodle />,
    <SelfieDoodle />,
    <SittingDoodle />,
    <SittingReadingDoodle />,
    <SleekDoodle />,
    <SprintingDoodle />,
    <StrollingDoodle />,
    <SwingingDoodle />,
    <UnboxingDoodle />,
    <ZombieingDoodle />,
  ];

  return Random.choice(doodles);
};

export { RandomDoodle };
