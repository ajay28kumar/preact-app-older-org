import { faqData } from './faqData';
import style from './style.css';

const GeneralFAQSection = ({ activeId, openFaqSection, closeFaqSection }) => {
  return (
    <div>
      <div
        className={`${
          style.headerText
        } header font20 bold-text text80 text-center`}>
        {faqData.headerText}
      </div>
      {faqData.items.map((item) => {
        return (
          <div>
            <div className={style.headerContainer}>
              <div className='font16 bold-text text60'>{item.sectionName}</div>
            </div>
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
  );
};

export default GeneralFAQSection;
