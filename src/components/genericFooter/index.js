import { h, Component } from 'preact';
import style from './style.css';

export default class GenericFooter extends Component {
  render(props) {
    return (
      <div>
        <div class={`${style.lendingPartnerText}`}>Our Lending Partners</div>

        <div align='center' class={`${style.footer}`}>
          <img
            class={`${style.lenderImg}`}
            src='https://iccdn.in/lenders/federal_logo.png'
          />
          <img
            class={`${style.lenderImg}`}
            src='https://iccdn.in/lenders/IDFC-First-Bank-Logo-150.jpg'
          />
          <img
            class={`${style.lenderImg}`}
            src='https://iccdn.in/lenders/hdfc-transparent-logo.png'
          />
          <img
            className={`${style.lenderImg}`}
            src='https://iccdn.in/lenders/kotak-logo-v2.png'
          />
        </div>
      </div>
    );
  }
}
