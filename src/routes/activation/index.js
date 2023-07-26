/** @jsx h */
import { h, Component } from 'preact';
import style from './style.css';

export default class EmailActivation extends Component {
  render() {
    return <div class={`${style.activation} page`} />;
  }
}
