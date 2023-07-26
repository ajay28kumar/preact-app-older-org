/** @jsx h */
import { h } from 'preact';
import style from './style.css';
import { connect } from 'react-redux';
import InfoCard from './infoCard';
import SubmitButton from '../../../../submitButton';
import helper from './helper';

const AivfInfo = (props) => {
  const { pageKey, metadata, lenderId, lenderName, closeModal } = props || {};
  const { infoDetails, informationText } = helper({ lenderId, lenderName });
  return (
    <div className={style.aivfInfoContainer}>
      <div className={style.aivfInfoHeaderContainer}>
        <div
          className={`${
            style.aivfHeaderText
          } font16 bold-text text80 text-center line-height-20`}>
          You are almost done!
        </div>
        <div className='font14 text80 line-height-20'>{informationText}</div>
      </div>
      <div className={style.aivfInfoBodyContainer}>
        <div className='font20 bold-text text80 text-center line-height-24'>
          How Cardless EMI Works
        </div>
        {infoDetails.map((itm) => {
          const { leftImage, textElement, rightImage } = itm || {};
          return (
            <InfoCard leftImage={leftImage} rightImage={rightImage}>
              {textElement}
            </InfoCard>
          );
        })}
        <div className={style.buttonContainer}>
          <SubmitButton
            metadata={metadata}
            pageKey={pageKey}
            elementName='dismiss_how_it_works'
            buttonText='Ok, Got it'
            buttonOnClick={closeModal}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ paymentUserData, config }) => {
  const { pageKey, metadata } = config || {};
  const { selectedLender, aivfType } = paymentUserData || {};
  const { lenderId, lenderName } = selectedLender || {};
  return {
    pageKey,
    metadata: {
      ...metadata,
      AIVF_Type: aivfType,
    },
    lenderId: lenderId.toString(),
    lenderName,
  };
};

export default connect(mapStateToProps)(AivfInfo);
