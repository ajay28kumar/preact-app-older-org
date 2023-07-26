import { lenderFaqData } from './faqData';
import style from './style.css';
import { connect } from 'react-redux';
import { lenderTheme } from '../../utils/lenderTheme';

const LenderFAQSection = ({
  activeId,
  faqData,
  openFaqSection,
  closeFaqSection,
}) => {
  return (
    <div>
      <div
        className={`${
          style.headerText
        } header font20 bold-text text80 text-center`}>
        {lenderFaqData.headerText}
      </div>
      <div>
        {faqData.map((item) => {
          const iconLogo = lenderTheme[item.lenderId].icon;
          return (
            <div>
              <div className={style.headerContainer}>
                {iconLogo && <img src={iconLogo} className={style.icon} />}
                <div
                  className={`${
                    iconLogo ? style.sectionHeaderText : ''
                  } font16 bold-text text60`}>
                  {item.subHeaderId}
                </div>
              </div>
              <div className={style.faqDisplayArea}>
                {item.subSectionDetails.map((faqValue, index) => {
                  const id = faqValue.question.split(' ').join('-');
                  const isActive = id === activeId;
                  const onClickAction = () =>
                    isActive
                      ? closeFaqSection()
                      : openFaqSection({
                          activeId: id,
                          index,
                          sectionId: item.subHeaderId,
                        });
                  return (
                    <div className={style.faqDisplayData}>
                      <div
                        className={style.headerArea}
                        onClick={() => onClickAction()}>
                        <div className={style.faqHeader}>
                          {faqValue.question}
                        </div>
                        <div>
                          {!isActive ? (
                            <img
                              src='https://iccdn.in/img/expand-more.svg'
                              alt='expand'
                            />
                          ) : (
                            <img
                              src='https://iccdn.in/img/expand-less.svg'
                              alt='collapse'
                            />
                          )}
                        </div>
                      </div>
                      {isActive && (
                        <div
                          className={`${style.answerContainer} font14 text60`}
                          dangerouslySetInnerHTML={{
                            __html: faqValue.answer,
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = ({ registrationUserData }) => {
  const { lenderId } = registrationUserData;
  const { items } = lenderFaqData;
  const faqData = items.filter((item) => item.lenderId === lenderId);
  return {
    faqData: faqData.length ? faqData : items,
  };
};

export default connect(mapStateToProps)(LenderFAQSection);
