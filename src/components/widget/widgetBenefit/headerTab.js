/** @jsx h */
import { h } from 'preact';
import style from './style.css';

const HeaderTab = ({ activeTab, changeTab }) => {
  return (
    <div className={style.headerWrapper}>
      <div className={style.tabWrapper}>
        <div
          onClick={() => changeTab('benefits')}
          className={`${style.tab} ${
            activeTab === 'benefits' ? style.activeTab : ''
          }`}
          id='benefit-headers-tab'>
          <div
            id='benefits-tab'
            className={`${activeTab === 'benefits' ? 'bold-text' : 'text60'}`}>
            Benefits
          </div>
        </div>
        <div
          onClick={() => changeTab('emiOptions')}
          className={`${style.tab}  ${
            activeTab === 'emiOptions' ? style.activeTab : ''
          }`}
          id='emi-headers-tab'>
          <div
            className={`${
              activeTab === 'emiOptions' ? 'bold-text' : 'text60'
            }`}>
            Your EMI options
          </div>
        </div>
        <div
          onClick={() => changeTab('howToAvail')}
          className={`${style.tab} ${
            activeTab === 'howToAvail' ? style.activeTab : ''
          }`}
          id='htb-headers-tab'>
          <div
            className={`${
              activeTab === 'howToAvail' ? 'bold-text' : 'text60'
            }`}>
            How To Avail
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTab;
