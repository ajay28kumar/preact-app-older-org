/** @jsx h */
import { Component, Fragment, h } from 'preact';
import { tracker, UserActionType } from '../../tracking';

class LenderTermsHandler extends Component {
  showLenderLink = () => {
    const { lenderDetails, pageKey, showLenderTncModal, metadata } =
      this.props || {};
    const { lenderId, lenderName, externalTncLink, lenderTncUrl } =
      lenderDetails || {};
    const lender = lenderId.toString();
    switch (lender) {
      case '102':
        return (
          <span
            className='linkColor bold-text'
            id='lenderTncHref'
            onClick={() => showLenderTncModal('federalTnc')}>
            loan agreement by {lenderName}
          </span>
        );
      case '501':
        return (
          <span
            className='linkColor bold-text'
            id='lenderTncHref'
            onClick={() => showLenderTncModal('loanTnc')}>
            loan agreement by {lenderName}
          </span>
        );
      case '502':
        return (
          <span
            className='linkColor bold-text'
            id='lenderTncHref'
            onClick={() => showLenderTncModal('payLater')}>
            loan agreement by {lenderName}
          </span>
        );
      case '601':
        return (
          <span
            className='linkColor bold-text'
            id='lenderTncHref'
            onClick={() => showLenderTncModal('homeCredit')}>
            loan agreement by {lenderName}
          </span>
        );
      case '701':
        return (
          <span
            className='linkColor bold-text'
            id='lenderTncHref'
            onClick={() => showLenderTncModal('iciciTnc')}>
            loan agreement by {lenderName}
          </span>
        );

      case '801':
        return (
          <span
            className='linkColor bold-text'
            id='lenderTncHref'
            onClick={() => showLenderTncModal('mahindraFinanceTnc')}>
            TERMS OF USE by {lenderName}
          </span>
        );

      default:
        return (
          <span>
            <a
              className='linkColor bold-text'
              id='lenderTncHref'
              href={externalTncLink || lenderTncUrl || ''}
              target='_blank'
              onClick={() => {
                tracker.trackUserInteraction(
                  UserActionType.CLICK,
                  'aivf_view_lender_t&c',
                  pageKey,
                  metadata,
                );
              }}>
              loan agreement by {lenderName}
            </a>
          </span>
        );
    }
  };

  render() {
    return <Fragment>{this.showLenderLink()}</Fragment>;
  }
}

export default LenderTermsHandler;
