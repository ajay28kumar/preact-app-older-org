import { connect } from 'react-redux';
import TopAppBar from 'preact-material-components/TopAppBar';
import 'preact-material-components/TopAppBar/style.css';
import style from '../../style.css';
import RightContainer from './rightContainer';

const ActivationHeader = (props) => {
  const { lenderLogo, lenderId } = props;
  if (!lenderId) {
    return null;
  }

  return (
    <TopAppBar className={style.activationHeader}>
      <TopAppBar.Row class={style.headerBody}>
        <TopAppBar.Section align-start>
          <img
            src={lenderLogo}
            alt='lender-logo'
            className={style.lenderLogo}
          />
        </TopAppBar.Section>
        <TopAppBar.Section align-end>
          <RightContainer />
        </TopAppBar.Section>
      </TopAppBar.Row>
    </TopAppBar>
  );
};

const mapStateToProps = ({ registrationUserData }) => {
  const { lenderLogo, lenderId } = registrationUserData;
  return {
    lenderLogo,
    lenderId,
  };
};

export default connect(mapStateToProps)(ActivationHeader);
