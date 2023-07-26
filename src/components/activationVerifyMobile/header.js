//@flow
/** @jsx h */
import { h } from 'preact';
import { connect } from 'react-redux';

type Props = {
  shopLater: boolean,
  mobile: string,
};

const VerifyMobileHeader = (props: Props) => {
  if (props.shopLater) {
    return (
      <div className='font14 text60 bold-text'>
        Verify mobile OTP to complete registration & Shop Later
      </div>
    );
  }
  return (
    <div className='font14 bold-text'>
      <span className='text60'>Enter OTP sent on </span>{' '}
      <span className='text80'>{props.mobile}</span>
    </div>
  );
};

const mapStateToProps = ({ registrationUserData, activationInit }) => {
  const { shopLater } = activationInit;
  const { mobile } = registrationUserData;
  return {
    shopLater,
    mobile: mobile.length < 10 ? `******${mobile}` : mobile,
  };
};

export default connect(mapStateToProps)(VerifyMobileHeader);
