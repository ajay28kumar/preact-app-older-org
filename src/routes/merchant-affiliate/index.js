import { Component } from 'preact';
import ActivationLender from '../../components/lenderHeader';
import Utils from '../../utils';
import withBaseComponent from '../../HOC/withBaseComponent';
import style from './style.css';
import { tracker, UserActionType } from '../../tracking';

class Merchants extends Component {
  pageKey = "AMZN Affiliate'";
  utils = new Utils();
  state = {
    showLoadingScreen: true,
    showGenericStyling: !Utils.getAuthToken(),
    currentUrl: this.props.path,
    productList: null,
  };

  componentDidMount() {
    this.createAffilateProductList();
  }

  createAffilateProductList = () => {
    let productObject = [
      {
        name:
          'Amazon Echo - Smart speaker with Alexa | Powered by Dolby – Black',
        imgUrl:
          'https://images-eu.ssl-images-amazon.com/images/I/41EV-YRIMAL._AC_AC_SR98,95_.jpg',
        price: '7,999.00',
        urlToProduct: 'https://amzn.to/2GG8hpa',
      },
      {
        name: 'OnePlus 7 (Mirror Blue, 6GB RAM, 128GB Storage)',
        imgUrl:
          'https://images-eu.ssl-images-amazon.com/images/I/41OBiHW1oqL._AC_AC_SR98,95_.jpg',
        price: '32,999.00',
        urlToProduct: 'https://amzn.to/2YFW7ma',
      },
      {
        name: 'Mi LED TV 4A PRO 123.2 cm (49) Full HD Android TV (Black)',
        imgUrl:
          'https://images-eu.ssl-images-amazon.com/images/I/513zNV3iHkL._AC_AC_SR98,95_.jpg',
        price: '29,999.00',
        urlToProduct: 'https://amzn.to/2Ki2OWt',
      },
      {
        name:
          'Furniture World Sheesham Wooden Dining Table 4 Seater | Dining Table Set with 3 Chairs & 1 Bench | Home Dining Room Furniture | Honey Finish',
        imgUrl:
          'https://images-eu.ssl-images-amazon.com/images/I/51FN2l34GwL._AC_AC_SR98,95_.jpg',
        price: '17,999.00',
        urlToProduct: 'https://amzn.to/2YFqSYk',
      },
      {
        name: "VERO MODA Women's Body Con Cotton midi Dress",
        imgUrl:
          'https://images-eu.ssl-images-amazon.com/images/I/31jZo1VFfaL._AC_AC_SR98,95_.jpg',
        price: '1,479.00',
        urlToProduct: 'https://amzn.to/2KmIPWq',
      },
      {
        name:
          'Firefox Mountana-V 21S Alumnium Mountain Bike (Matt Neon Yellow)',
        imgUrl:
          'https://images-eu.ssl-images-amazon.com/images/I/51vX2Sjp11L._AC_AC_SR98,95_.jpg',
        price: '17,400.00',
        urlToProduct: 'https://amzn.to/2KpoP5A',
      },
      {
        name:
          'Safari Thorium Sharp Anti-Scratch Combo Set of 3 Red Small, Medium & Large Check-in 4 Wheel Hard Suitcase',
        imgUrl:
          'https://images-eu.ssl-images-amazon.com/images/I/412o0yOtMRL._AC_AC_SR98,95_.jpg',
        price: '8,699.00',
        urlToProduct: 'https://amzn.to/31dpoX7',
      },
      {
        name:
          "Nike Men's Air Zoom Pegasus 35 Obsidn / Blhero Running Shoes- 6 UK(40 EU)(7 US)(942851 - 401)",
        imgUrl:
          'https://images-eu.ssl-images-amazon.com/images/I/514RVuenwpL._AC_AC_SR98,95_.jpg',
        price: '5,874.00',
        urlToProduct: 'https://amzn.to/2GK2ChA',
      },
    ];

    let productList = [];
    productObject.map((product, index) => {
      productList.push(
        <div
          class={`${style.productTile} ${style.inlineBlock}`}
          onClick={() =>
            this.navigateToProduct(product.urlToProduct, index + 1)
          }>
          <div class={`${style.productImg}`}>
            <img src={product.imgUrl} />
          </div>
          <div class={`${style.productDescription}`}>{product.name}</div>
          <div class={`${style.productPrice}`}>INR {product.price}</div>
          <div class={`${style.shopNowContainer}`}>
            <input
              type='button'
              value='Shop Now'
              class={`${style.shopNowBtn}`}
            />
          </div>
        </div>,
      );
    });

    this.setState({
      productList: productList,
    });
  };

  navigateToProduct = (urlToProduct, productRank) => {
    if (urlToProduct) {
      tracker.trackUserInteraction(
        UserActionType.CLICK,
        'Product Tile',
        this.pageKey,
        { Rank: productRank },
      );
      window.open(urlToProduct, '_blank');
    }
  };

  redirectToMerchant = () => {
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'Continue',
      this.pageKey,
    );

    window.open('https://amzn.to/2KbOSys', '_blank');
  };

  render() {
    return (
      <div class={`${style.affilatePage}`}>
        <ActivationLender
          selectedRoute={this.state.currentUrl}
          showHeader={true}
          pageKey={this.pageKey}
          showAppDrawer
        />
        <div class={`${style.merchantProductContainer}`}>
          <div class={`${style.merchantInfoContainer}`}>
            <div class={`${style.merchantLogoContainer}`}>
              <img src='https://iccdn.in/img/amazon_logo.png' />
            </div>
            <div class={`${style.merchantNameContainer}`}>
              <strong>Buy on Amazon</strong>
              <div>with Instacred EMI</div>
            </div>
          </div>
          <div>{this.state.productList}</div>
          <div class={`${style.continueToShopContainer}`}>
            <button
              type='button'
              onclick={() => this.redirectToMerchant()}
              className='btn genericButtonFilled font16'
              style=''>
              CONTINUE TO Amazon
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withBaseComponent(Merchants);
