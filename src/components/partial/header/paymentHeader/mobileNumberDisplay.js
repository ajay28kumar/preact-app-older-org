import { connect } from 'react-redux';
import style from './style.css';

const MobileNumberDisplay = ({ mobile }) => {
  if (!mobile) {
    return null;
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}>
      <div className={`${style.mobileNumber} bold-text`}>
        <i className='material-icons'>phone_iphone</i>
        {mobile}
      </div>
    </div>
  );
};
const mapStateToProps = ({ paymentDetails }) => {
  const { mobile } = paymentDetails;
  return { mobile };
};
export default connect(mapStateToProps)(MobileNumberDisplay);
