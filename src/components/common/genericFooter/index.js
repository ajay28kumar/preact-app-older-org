import style from './style.css';

import { faqRoute } from '../../../alias/homeRoutes';

import {
  aboutUsRoute,
  termsAndCondition,
  privacyPolicy,
} from '../../../alias/commonRoutes';

const GenericFooter = ({ overrideMargin }) => {
  return (
    <div>
      <div className={`${style.footerContainer} ${style.showOnMobile} font14`}>
        <div className={`${style.quickLinksContainer} `}>
          <div className={`${style.quickLinksCell} font14`}>
            <div className={`${style.quickLinksHeader} font12 bold-text`}>
              Quick Links
            </div>
            <div className={`${style.quickLinks} font12 cursor-pointer text60`}>
              <a href={aboutUsRoute.path} target='_blank' rel='noopener' native>
                About Instacred
              </a>
            </div>
            <div className={`${style.quickLinks} font12 cursor-pointer text60`}>
              <a href={faqRoute.path}>FAQs</a>
            </div>
          </div>

          <div className={`${style.quickLinksCell} font14`}>
            <div className={`${style.quickLinksHeader} font12 bold-text`}>
              Policies
            </div>
            <div className={`${style.quickLinks} font12 cursor-pointer text60`}>
              <a
                href={privacyPolicy.path}
                target='_blank'
                rel='noopener'
                native>
                Privacy Policy
              </a>
            </div>
            <div className={`${style.quickLinks} font12 cursor-pointer text60`}>
              <a
                href={termsAndCondition.path}
                target='_blank'
                rel='noopener'
                native>
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>

        <div className={`${style.footerWrapper} `}>
          <div className={`${style.copyright} font12 text40`}>
            © Flexmoney Technologies Pvt. Ltd.
          </div>
        </div>
      </div>

      <div
        className={`${style.footerContainer} ${style.showOnDesktop} font14 ${
          overrideMargin ? style.marginOverride : ''
        }`}>
        <div className={`${style.quickLinksContainer} `}>
          <div className={`${style.quickLinksCell} font14`}>
            <div>
              <span className={`${style.quickLinksHeader} font12`}>
                QUICK LINKS
              </span>
              <a
                href={aboutUsRoute.path}
                className={`${style.quickLinksDesktop} font12 bold-text text60`}
                target='_blank'
                rel='noopener'
                native>
                About Instacred
              </a>
              <a
                href={faqRoute.path}
                className={`${
                  style.quickLinksDesktop
                } font12 bold-text text60`}>
                FAQs
              </a>
            </div>
            <div>
              <span className={`${style.quickLinksHeader} font12`}>
                POLICIES
              </span>
              <a
                href={privacyPolicy.path}
                className={`${style.quickLinksDesktop} font12 bold-text text60`}
                target='_blank'
                rel='noopener'
                native>
                Privacy Policy
              </a>
              <a
                href={termsAndCondition.path}
                className={`${style.quickLinksDesktop} font12 bold-text text60`}
                target='_blank'
                rel='noopener'
                native>
                Terms & Conditions
              </a>
            </div>
          </div>
          <div className={`${style.quickLinksCell} `}>
            <div className={style.instacredLogoContainer}>
              <img
                src='https://iccdn.in/img/instacred-logo.svg'
                className={style.instacredFooterLogo}
              />
            </div>
            <div className={`${style.copyright} font12 textRight text40`}>
              © Flexmoney Technologies Pvt. Ltd.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericFooter;
