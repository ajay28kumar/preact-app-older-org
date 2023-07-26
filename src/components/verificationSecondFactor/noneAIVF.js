//@flow
/** @jsx h */
import { h, Component } from 'preact';
import Spinner from '../spinner/spinner';

type Props = {
  verifySecondFactor: Function,
};

class NoneAIVF extends Component<Props> {
  componentDidMount() {
    this.verifyAIVF();
  }
  verifyAIVF = () => {
    this.props.verifySecondFactor('');
  };

  render() {
    return (
      <div className='loaderContainer'>
        <Spinner />
      </div>
    );
  }
}

export default NoneAIVF;
