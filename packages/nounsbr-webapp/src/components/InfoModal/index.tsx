import classes from './InfoModal.module.css';
import ReactDOM from 'react-dom';
import React from 'react';
import { XIcon } from '@heroicons/react/solid';
import { Trans } from '@lingui/macro';

export const Backdrop: React.FC<{ onDismiss: () => void }> = props => {
  return <div className={classes.backdrop} onClick={props.onDismiss} />;
};

const InfoModalOverlay: React.FC<{
  onDismiss: () => void;
}> = props => {
  const { onDismiss } = props;

  return (
    <>
      <div className={classes.closeBtnWrapper}>
        <button onClick={onDismiss} className={classes.closeBtn}>
          <XIcon className={classes.icon} />
        </button>
      </div>

      <div className={classes.modal}>
        <div className={classes.content}>
          <div className={classes.bidWrapper}>
            <div className={classes.header}>
              <div className={classes.title}>
                <h2>Info</h2>
                <h1><Trans>Bidding and Settling</Trans></h1>
              </div>
            </div>
            <div className={classes.headerText}><Trans>Settlement</Trans></div>
            <Trans>Anyone can settle an auction. When an auction ends, a gas-only transaction is required</Trans>
            <Trans>to send the current NounBR to the winners wallet and to mint a new NounBR for the next auction.</Trans>
            <Trans>As gas price fluctuates, the cost of settlement also fluctuates.</Trans>
            <br />
            <br />
            <Trans>Settlement gas price of every 9th NounBR is higher. This is due to the transaction</Trans>
            <Trans>also triggering 1 free NounBR mint: The NoundersBR mint.</Trans>
            <br />
            <br />
            <div className={classes.headers}><Trans>Bids</Trans></div>
            <Trans>Once an auction starts, everyone has 15 minutes to bid. Anyone can bid an amount</Trans>
            <Trans>at/above 0.01 eth. The Amount bid is returned to bidder if they lose the auction (minus</Trans>
            <Trans>gas spent on bid transaction).</Trans>
            <br />
            <br />
            <Trans>Bids at the very last minute increase the auction time by 1:30 minutes.</Trans>
            <Trans>Sometimes, multiple bids are sent at the same time. This may result in bids coming in</Trans>
            <Trans>and winning an auction at the very last minute/seconds (irrespective of time increase).</Trans>
            <br />
            <div className={classes.headerText}><Trans>Bid Refunds</Trans></div>
            <Trans>Unsuccessful bids are refunded in full. The timing of refunds may be offset by 1 bidder.</Trans>
            <Trans>This means that a refund is processed for an unsuccessful bid, when a higher bid is</Trans>
            <Trans>submitted.</Trans>
          </div>
        </div>
      </div>
    </>
  );
};

const InfoModal: React.FC<{
  onDismiss: () => void;
}> = props => {
  const { onDismiss } = props;
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onDismiss={onDismiss} />,
        document.getElementById('backdrop-root')!,
      )}
      {ReactDOM.createPortal(
        <InfoModalOverlay onDismiss={onDismiss} />,
        document.getElementById('overlay-root')!,
      )}
    </>
  );
};

export default InfoModal;
