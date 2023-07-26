// @flow
/** @jsx h */
import { Component, h } from 'preact';
import { Content } from './Content';
import Helmet from 'preact-helmet';
import AddToHomeOption from './addToHomeOption';
import type { BicContentType } from '../../modelType/bicType';
import EligiblePrompt from './eligiblePrompt';
import withTerminalApiResponse from '../../HOC/withTerminalApiResponse';
import { tracker, UserActionType } from '../../tracking';
import style from './style.css';
import GenericFooter from '../../components/common/genericFooter';
import { getLocalstorage, setLocalStorage } from '../../utils';

type State = {
  showAddToHomeScreenPrompt: boolean,
  shouldOpenEligiblePanel: boolean,
};

type Props = {
  uiComponents: Array<BicContentType>,
  pageKey: string,
  bicAction: Function,
};

let checkAddToHomeScreenPrompt;

class BicContainer extends Component<Props, State> {
  displayComponentName = 'SHOW_USER_ELIGIBLE';
  state = {
    showAddToHomeScreenPrompt: false,
    shouldOpenEligiblePanel: this.props.uiComponents.includes(
      this.displayComponentName,
    ),
  };
  componentDidMount() {
    this.detectAddToHomeScreenPrompt();
  }

  componentDidUpdate(previousProps) {
    //for existing user hiding the panel after 3 sec
    if (
      this.props.uiComponents.includes(this.displayComponentName) !==
      previousProps.uiComponents.includes(this.displayComponentName)
    ) {
      setTimeout(() => {
        this.setState({
          shouldOpenEligiblePanel: this.props.uiComponents.includes(
            this.displayComponentName,
          ),
        });
      }, 3000);
    }
  }

  detectAddToHomeScreenPrompt = () => {
    let promptDetectCounter = 1;
    checkAddToHomeScreenPrompt = setInterval(() => {
      if (window.addToHomeScreenObject && window.addToHomeScreenObject.prompt) {
        this.triggerAddToHomeScreenPrompt();
        clearInterval(checkAddToHomeScreenPrompt);
      }
      if (promptDetectCounter === 30) {
        // Killing the Interval if no prompt detected for 15 secs
        clearInterval(checkAddToHomeScreenPrompt);
      } else {
        promptDetectCounter++;
      }
    }, 500); // Checking if prompt is detected every 500 milliseconds
  };

  triggerAddToHomeScreenPrompt = () => {
    const hidePrompt = getLocalstorage('hideAddToHomeScreenPrompt') || '';
    const { prompt } = window.addToHomeScreenObject || {};
    const shouldAskForAddToHome = prompt && !(hidePrompt === 'true');
    if (shouldAskForAddToHome) {
      setTimeout(() => {
        this.setState({
          showAddToHomeScreenPrompt: true,
          shouldOpenEligiblePanel: false,
        });
      }, 3000);
    }
  };

  onHideAddToScreenCallBack = () => {
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'NOT NOW',
      this.props.pageKey,
    );
    setLocalStorage('hideAddToHomeScreenPrompt', 'true');
    this.setState({
      showAddToHomeScreenPrompt: false,
    });
  };
  hideEligiblePanel = (shouldHide) => {
    this.setState({
      shouldOpenEligiblePanel: !shouldHide,
    });
  };
  render() {
    const { showAddToHomeScreenPrompt, shouldOpenEligiblePanel } =
      this.state || {};
    return (
      <div>
        <Helmet
          title='Buy on EMI with InstaCred Cardless EMI'
          meta={[
            {
              name: 'description',
              content:
                'Shop with InstaCred on EMI your favourite Mobile phones, TV, Furniture, Flight tickets. These & many more from our merchants Amazon, Flipkart, Via and others.',
            },
          ]}
          link={[
            {
              rel: 'canonical',
              href: 'https://instacred.me/home/buy-with-instacred',
            },
          ]}
        />
        {this.props.uiComponents.map((contentType, i) => {
          return (
            <Content
              contentType={contentType}
              pageKey={this.props.pageKey}
              bicAction={this.props.bicAction}
              hideEligiblePanel={this.hideEligiblePanel}
            />
          );
        })}
        <GenericFooter overrideMargin={true} />
        {showAddToHomeScreenPrompt && (
          <AddToHomeOption
            pageKey={this.props.pageKey}
            onHideAddToScreenCallBack={this.onHideAddToScreenCallBack}
          />
        )}
        <EligiblePrompt
          shouldOpenEligiblePanel={shouldOpenEligiblePanel}
          pageKey={this.props.pageKey}
          bicAction={this.props.bicAction}
          onHideAddToScreenCallBack={this.onHideAddToScreenCallBack}
        />
      </div>
    );
  }
}

export default withTerminalApiResponse(BicContainer);
