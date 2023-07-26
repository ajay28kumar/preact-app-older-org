import style from '../../paymentEnterMobile/style.css';

export const logos = [
  {
    icon: 'https://iccdn.in/img/hdfc-logo-icon-v2.png',
    lenderImage: 'https://iccdn.in/lenders/hdfc-branding-logo-v1.png',
    lenderId: '501',
  },
  {
    icon: 'https://iccdn.in/lenders/icici-icon-logo-v4.svg',
    lenderImage: 'https://iccdn.in/img/icici-bank-logo.png',
    lenderId: '701',
  },
  {
    icon: 'https://iccdn.in/img/kotak-icon-v1.png',
    lenderImage: 'https://iccdn.in/lenders/kotak-branding-logo-v1.png',
    lenderId: '401',
  },
  {
    icon: 'https://iccdn.in/img/idfc-first-icon-v1.png',
    lenderImage: 'https://iccdn.in/lenders/idfc-branding-logo-v1.png',
    lenderId: '201',
  },
  {
    icon: 'https://iccdn.in/img/federal-icon-v1.png',
    lenderImage: 'https://iccdn.in/lenders/federal-branding-logo-v1.png',
    lenderId: '102',
  },
  {
    icon: 'https://iccdn.in/lenders/home-credit-icon-v1.svg',
    lenderImage: 'https://iccdn.in/lenders/home-ccredit-branding-logo-v1.png',
    lenderId: '601',
  },
];

const LendersLogos = () => {
  return (
    <div className={style.lenderImages} id='lender-icons-container'>
      {logos.map((logo) => (
        <img src={logo.icon} className={style.lenderIcon} alt='lender-logo' />
      ))}
    </div>
  );
};

export default LendersLogos;
