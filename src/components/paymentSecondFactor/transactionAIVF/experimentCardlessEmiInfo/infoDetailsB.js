/** @jsx h */
import { h } from 'preact';
import style from './style.css';
import { connect } from 'react-redux';
import onPaymentConfirm from '../../../../actions/onPaymentConfirm';
import actionType from '../../../../actions/onPaymentConfirm/actionType';
import { tracker, UserActionType } from '../../../../tracking';

const InfoDetailsB = ({ pageKey, metadata, onPaymentConfirm }) => {
  return (
    <div
      className={`${
        style.infoContainer
      } text-color font12 bold-text cursorPointer`}
      onClick={() => {
        tracker.trackUserInteraction(
          UserActionType.CLICK,
          'aivf_how_it_works',
          pageKey,
          metadata,
        );
        onPaymentConfirm(actionType.openAivfTransactionInfoModal);
      }}>
      How does Cardless EMI work?
    </div>
  );
};

const mapStateToProps = ({ paymentUserData, config }) => {
  const { aivfType } = paymentUserData || {};
  const { pageKey, metadata } = config || {};
  return {
    pageKey,
    metadata: {
      ...metadata,
      AIVF_Type: aivfType,
    },
  };
};

export default connect(
  mapStateToProps,
  { onPaymentConfirm },
)(InfoDetailsB);
