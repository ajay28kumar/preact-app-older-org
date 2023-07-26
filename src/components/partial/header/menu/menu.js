/** @jsx h */
import { h, Component } from 'preact';
import Drawer from 'preact-material-components/Drawer';
import MenuHeader from './menuHeader';
import MenuBody from './menuBody';
import 'preact-material-components/Drawer/style.css';

class Menu extends Component {
  render() {
    const { menuState, changeMenuState } = this.props;
    return (
      <Drawer
        modal={menuState}
        onClose={() => changeMenuState(false)}
        ref={(drawer) => (this.drawer = drawer)}>
        {menuState && <MenuHeader closeDrawer={() => changeMenuState(false)} />}
        {menuState && (
          <MenuBody
            closeDrawer={() => changeMenuState(false)}
            props={this.props}
          />
        )}
      </Drawer>
    );
  }
}

export default Menu;
