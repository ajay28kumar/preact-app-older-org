import Drawer from 'preact-material-components/Drawer';
import 'preact-material-components/Drawer/style.css';
import style from './style.css';
import { getSessionStorage } from '../../../../utils';

const MenuHeader = ({ closeDrawer }) => {
  const authDetails = getSessionStorage('authDetails');
  const { mobile, login } = authDetails ? JSON.parse(authDetails) : {};
  return (
    <Drawer.DrawerHeader className={style.menuHeader}>
      <div className={style.menuBody}>
        <div className={style.closeIcon}>
          <i className='material-icons' onClick={closeDrawer}>
            close
          </i>
        </div>
        {!(mobile && login) ? (
          <div className={style.headerText}>
            <div className='font16 bold-text menuHeaderHelloText'>Hello! </div>
            <div>Guest</div>
          </div>
        ) : (
          <div className={style.headerText}>
            <div className='font16'>
              Hello! <span className='bold-text'>{mobile}</span>
            </div>
          </div>
        )}
      </div>
    </Drawer.DrawerHeader>
  );
};

export default MenuHeader;
