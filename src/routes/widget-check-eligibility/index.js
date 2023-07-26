/** @jsx h */
import { h } from 'preact';
import CheckEligible from '../../components/widget/checkEligible';
import withWidgetCommunication from '../../HOC/withWidgetCommunication';

const WidgetCheckEligibility = ({
  dataFromParent,
  communicateDataToParent,
  matches,
}) => {
  const { contactNumber, amount } = matches || {};
  return (
    <CheckEligible
      contactNumber={contactNumber}
      amount={amount}
      dataFromParent={dataFromParent}
      communicateDataToParent={communicateDataToParent}
    />
  );
};

export default withWidgetCommunication(WidgetCheckEligibility);
