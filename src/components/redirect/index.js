// @flow
/** @jsx h */
import { h, Component } from 'preact';
import { route } from 'preact-router';
import Spinner from '../spinner/spinner';

type Props = {
  /**
   * replace property to over-write browser history
   * @property {boolean}
   */
  replace?: boolean,
  /**
   * to is path to redirect
   * @property {string}
   */
  to: string,
};

class Redirect extends Component<Props> {
  componentDidMount() {
    const { to, replace } = this.props || {};
    route(to || '/', replace || false);
  }
  render() {
    return (
      <div className='loaderContainer'>
        <Spinner />
      </div>
    );
  }
}

export default Redirect;
