/** @jsx h */
import { h, VNode } from 'preact';
import { connect } from 'react-redux';
import PaymentContainer from './paymentContainer';
import ActivationContainer from './activationContainer';
import BICContainer from './bicContainer';
import WidgetContainer from './widgetContainer';

type Props = {
  template: string,
  children: VNode,
};

const Container = ({ children, template }: Props) => {
  switch (template) {
    case 'payment':
      return <PaymentContainer>{children}</PaymentContainer>;
    case 'activation':
      return <ActivationContainer>{children}</ActivationContainer>;
    case 'home':
    case 'neutral':
    case 'login':
      return <BICContainer>{children}</BICContainer>;
    case 'widget':
      return <WidgetContainer>{children}</WidgetContainer>;
    default:
      return children;
  }
};

const mapStateToProps = ({ config }) => {
  const { template } = config || {};
  return {
    template,
  };
};

export default connect(mapStateToProps)(Container);
