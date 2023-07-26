import style from './style.css';

const StorageErrorFallBackUI = ({}) => {
  return (
    <div>
      <div
        id={style.appIncompatibleScreenContainer}
        className={style.topHeaderWrapper}>
        <div className={style.topHeaderContainer}>
          <div className={style.header}>
            Error! Application cannot be loaded
          </div>
          <div className={style.errorContainer}>
            <div className={style.errorIcon}>
              <img src='https://iccdn.in/img/error-icon-white.svg' />
            </div>
            <div className={style.errorContent}>
              We need you to enable the cookies
            </div>
            <div className={style.errorContent}>
              so that we can help you complete your
            </div>
            <div className={style.errorContent}>Loan Application.</div>
          </div>
        </div>
        <div id={style.stepsToEnableStorage}>
          <div id={style.mainWrapper}>
            <div className={style.howToEnableHeader}>
              How to enable cookies?
            </div>
            <div className={style.enableStorageStepsContainer}>
              <table border='0' width='100%' cellspacing='0' cellpadding='0'>
                <tr>
                  <td className={style.stepsRow} valign='top'>
                    <span className={style.stepsImg}>
                      <img src='https://iccdn.in/img/chrome.jpg' />
                    </span>
                    <span className={style.stepsContent}>Open Chrome.</span>
                  </td>
                </tr>
                <tr>
                  <td className={style.stepsRow} valign='top'>
                    <span className={style.stepsImg} style='vertical-align:top'>
                      <img src='https://iccdn.in/img/setting.jpg' />
                    </span>
                    <span className={style.stepsContent}>
                      <div>Go to More Menu > Settings</div>
                      <div>Site settings > Cookies.</div>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className={style.stepsRow} valign='top'>
                    <span className={style.stepsImg}>
                      <img src='https://iccdn.in/img/switch-icon.jpg' />
                    </span>
                    <span className={style.stepsContent}>
                      Make sure "Cookies" are turned on.
                    </span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className={style.storageErrorScreenFooter}>
        <div style='padding-left : 8px;'>
          <table width='100%'>
            <tr>
              <td>
                <div style='color:#000000;font-style:italic'>
                  <img
                    src='https://iccdn.in/img/our-lending-partners.png'
                    style='width: 57px;'
                  />
                </div>
              </td>
              <td align='right' style='text-align: right; padding-top:5px;'>
                <img
                  src='https://iccdn.in/lenders/federal_logo.png'
                  style='height:25px;width:auto;margin-left:5px;'
                />
                <img
                  src='https://iccdn.in/lenders/IDFC-First-Bank-Logo-150.jpg'
                  style='height: 25px;width:auto;margin-left:5px;'
                />
                <img
                  src='https://iccdn.in/lenders/kotak-reverse-v3.png'
                  style='height: 25px;width:auto;margin-left:5px;'
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StorageErrorFallBackUI;
