import { h, Component } from 'preact';
import { route } from 'preact-router';
import TopAppBar from 'preact-material-components/TopAppBar';
import Utils, { getSessionStorage } from '../../utils';
import { getLenderLogo, LenderTheme } from '../../utils/lenderTheme';
import { faqRoute } from '../../alias/homeRoutes';
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/TopAppBar/style.css';
import style from './style.css';
import { tracker, UserActionType } from '../../tracking';

export default class ActivationLender extends Component {
  utils = Utils;
  constructor(props) {
    super(props);
    const lenderLogo = getLenderLogo();
    this.state = {
      drawerOpened: false,
      isLoggedIn: false,
      lenderLogo: lenderLogo || {},
      displayLogo: lenderLogo ? lenderLogo.lenderLogo : '',
      isLenderTheme: !!lenderLogo,
    };
    this.utils = new Utils();
  }
  componentDidUpdate(previousProps) {
    if (
      this.props.lenderLogo !== previousProps.lenderLogo ||
      this.props.lenderLogo !== this.state.displayLogo
    ) {
      this.setState({
        displayLogo: this.props.lenderLogo,
      });
    }
  }
  openFaq = () => {
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'Know More',
      this.props.pageKey,
      '',
    );

    //TODO: for multi-lender we will start saving lenderId in array format in storage and following code will work
    /*
     // const lenderIds = getSessionStorage('lenderId');
     const lenderNames = Object.keys(lenderConfig).reduce((lenderName,lenderId)=>{
      if(lenderIds.includes(lenderId)){
        console.log(lenderConfig[lenderId]);
        const {lenderName: lenderQueryName} =lenderConfig[lenderId];
        return `${lenderName}${lenderQueryName},`
      }else {
        return lenderName
      }
    },'');
     */
    //currently picking up lender from session-storage
    const lenderId = getSessionStorage('lenderId');
    const queryParams = lenderId ? `?q=${lenderId}` : '';
    route(`${faqRoute.path}${queryParams}`);
  };

  navigateToBIC = () => {
    return route('/');
  };

  render() {
    return (
      <div>
        <TopAppBar
          className={
            this.state.lenderLogo || this.state.isLenderTheme
              ? style.lenderTheme
              : style.instaCredBackground
          }>
          <TopAppBar.Row>
            <TopAppBar.Section align-start class={style.paddingLeft0}>
              {(this.state.displayLogo || this.state.isLenderTheme) && (
                <img
                  id={LenderTheme.LENDER_LOGO}
                  src={this.state.displayLogo}
                  class={style.lenderImage}
                  style={{
                    marginLeft: 10,
                    borderLeft: this.props.showAppDrawer
                      ? '1px solid #fff'
                      : '0',
                    backgroundColor:
                      this.props.lenderId === '501' ? '#ffffff' : 'transparent',
                  }}
                  onClick={this.navigateToBIC}
                />
              )}
            </TopAppBar.Section>
            <TopAppBar.Section
              align-end
              shrink-to-fit
              class={`${style.paddingRight0}`}>
              <div class={`${style.infoIconContainer}`} onClick={this.openFaq}>
                <img
                  src='https://iccdn.in/img/powered-by-instacred-header.png'
                  class={`${style.infoIcon}`}
                />
                <div class={`${style.knowMoreContainer}`}>Know More</div>
              </div>
            </TopAppBar.Section>
          </TopAppBar.Row>
        </TopAppBar>
      </div>
    );
  }
}
