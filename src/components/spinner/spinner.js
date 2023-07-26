import { h, Component } from 'preact';
import style from './spinner.css';

export default class Spinner extends Component {
  componentWillUnmount() {}

  render(props) {
    return (
      <div class={`${style.spinner}`} style={this.props.style}>
        <div class={`${style.bounce1}`} />
        <div class={`${style.bounce2}`} />
        <div class={`${style.bounce1}`} />
      </div>
    );
  }
}
