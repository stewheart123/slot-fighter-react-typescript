import React from "react";

interface EnergyBarProps {
  energyBarLeft: number | undefined;
  energyBarRight: number | undefined;
  energyBarVisible: boolean | undefined;
}

function EnergyBar(props: EnergyBarProps) {
  const inlineStylesLeft = {
    backgroundPositionX: `${props.energyBarLeft}px`,
  };
  const inlineStylesRight = {
    backgroundPositionX: `${props.energyBarRight}px`,
  };
  return props.energyBarVisible ? (
    <div className="energy-bar__container">
      <div className="energy-bar__window">
        <div
          id="energy-bar-left"
          className="energy-bar__energy --left-bar"
          style={inlineStylesLeft}
        ></div>
      </div>
      <div className="energy-bar__ko">KO</div>
      <div className="energy-bar__window">
        <div
          id="energy-bar-right"
          className="energy-bar__energy --right-bar"
          style={inlineStylesRight}
        ></div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default EnergyBar;
