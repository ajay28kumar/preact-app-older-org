import Password from './password';
import MobileNo from './mobileNo';
import { connect } from 'react-redux';
import { apiStatus } from '../../actionTypes';

const Contents = ({ loginInitApiState }) => {
  if (loginInitApiState === apiStatus.SUCCESS) {
    return <Password />;
  }
  return <MobileNo />;
};

const mapStateToProps = ({ userLogin }) => {
  const { loginInitApiState } = userLogin;
  return {
    loginInitApiState,
  };
};

export default connect(mapStateToProps)(Contents);
