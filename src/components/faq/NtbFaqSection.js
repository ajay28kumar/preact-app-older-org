/** @jsx h */
// @flow
import { ntbFaqData } from './faqData';
import style from './style.css';

type Props = {
  /**
   * activeId of component (required)
   * @property {string}
   */
  activeId: string,
  /**
   * openFaqSection of component (required)
   * @property {string}
   */
  openFaqSection: Function,
  /**
   * closeFaqSection of component (required)
   * @property {string}
   */
  closeFaqSection: Function,
};

const NTBFAQSection = (props: Props) => {
  const { activeId, openFaqSection, closeFaqSection } = props || {};
  return (
    <div className={style.ntbFaqContainer}>
      <div
        className={`${style.headerText} header font20 bold-text text-center`}>
        {ntbFaqData.headerText}
      </div>
      {ntbFaqData.items.map((item) => {
        return (
          <div>
            <div className={style.faqDisplayArea}>
              {item.sectionDetails.map((faqValue, index) => {
                const id = faqValue.question.split(' ').join('-');
                const isActive = id === activeId;
                const onClickAction = () =>
                  isActive
                    ? closeFaqSection()
                    : openFaqSection({
                        activeId: id,
                        index,
                        sectionId: item.sectionId,
                      });
                return (
                  <div className={style.faqDisplayData}>
                    <div
                      className={style.headerArea}
                      onClick={() => onClickAction()}>
                      <div className={style.faqHeader}>{faqValue.question}</div>
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
                        className={`${style.answerContainer} font14 text80`}
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
  );
};

export default NTBFAQSection;
