// @flow
/** @jsx h */
import { h, Component, VNode, toChildArray } from 'preact';
import TopAppBar from 'preact-material-components/TopAppBar';
import 'preact-material-components/TopAppBar/style.css';
import { connect } from 'react-redux';
import headerAction from '../../../../actions/headerAction';
import actionType from '../../../../actions/headerAction/actionType';
import style from '../../style.css';

type Props = {
  headerAction: Function,
  children: VNode,
};

type State = {
  isFixed: boolean,
};

class Header extends Component<Props, State> {
  state = {
    isFixed: false,
  };
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentDidUpdate(previousProps, previousState) {
    const count = toChildArray(this.props.children).length;
    const prevCount = toChildArray(previousProps.children).length;
    if (count !== prevCount) {
      this.handleScroll();
    }
    if (this.state.isFixed !== previousState.isFixed) {
      if (this.state.isFixed) {
        this.props.headerAction(actionType.headerFixed);
      } else {
        this.props.headerAction(actionType.removeFixedHeader);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll = () => {
    const count = toChildArray(this.props.children).length;
    if (count <= 1) {
      return this.setState({ isFixed: true });
    }
    //Height of Branding Header
    const scrollHandle = 60;
    const isFixed = window.scrollY >= scrollHandle;
    this.setState({ isFixed });
  };

  render() {
    const count = toChildArray(this.props.children).length;
    const { isFixed } = this.state;
    switch (count) {
      case 0:
        return null;
      case 1:
        return (
          <TopAppBar
            className={`${style.homeContainer} ${
              isFixed ? style.fixedHeader : ''
            }`}
            id='home-header'>
            {this.props.children}
          </TopAppBar>
        );
      default:
        return (
          <TopAppBar
            className={`${style.homeContainer} ${
              isFixed ? style.fixedHeader : ''
            }`}
            id='home-header'>
            {!isFixed ? this.props.children : this.props.children[count - 1]}
          </TopAppBar>
        );
    }
  }
}

export default connect(
  null,
  { headerAction },
)(Header);
