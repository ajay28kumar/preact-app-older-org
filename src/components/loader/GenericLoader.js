/** @jsx h */
import { h, Component } from 'preact';
import style from './loader.css';
import Spinner from '../spinner/spinner';

export default class GenericLoader extends Component {
  render() {
    return (
      <div align='center'>
        <div style='margin-top:24px;'>
          <Spinner />
        </div>
        <div class={`${style.loaderText}`} style='margin:24px;'>
          {this.props.loadingMsg}
        </div>
      </div>
    );
  }
}
