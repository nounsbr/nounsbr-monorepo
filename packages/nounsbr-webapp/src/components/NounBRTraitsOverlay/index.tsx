import classes from './NounBRTraitsOverlay.module.css';
import React from 'react';
import ReactTooltip from 'react-tooltip';

console.info('NounBRTraitsOverlay');

const NounBRTraitsOverlay: React.FC<{
  parts: { filename: string }[];
}> = props => {
  const { parts } = props;
  const getNounBRTrait = (part: { filename: string }) => {
    const splitData: string[] = part.filename.split('-');
    return {trait: splitData[0], value: splitData.slice(1).join(' ')}
  }

  return (
    <ReactTooltip
      id="nounbr-traits"
      place="top"
      effect="float"
      backgroundColor="white"
      textColor="black"
    >
      <ul className={classes.traitList}>
        {parts.map((part) => {
          const { trait, value } = getNounBRTrait(part);
          return (
            <li key={trait}>
              {trait}: {value}
            </li>
          )
        })}
      </ul>
    </ReactTooltip>
  );
};

export default NounBRTraitsOverlay;