import { getSessionStorage } from './index';

export const ABTestConfig = Object.freeze({
  A: {},
  B: {},
  C: {},
  D: {},
});

export class ABTestUtils {
  static HOW_TO_BUY_EXPERIMENT_NAME = 'voucher_test_explain_journey_namespace';
  static STEPS_TO_REGISTER_EXPERIMENT_NAME = 'test_category_campaign_namespace';
  static BIC_EXPERIMENT_NAME = 'test_merchant_vs_offline_store_namespace';
  static MYNTRA_HOW_TO_BUY_EXPERIMENT_NAME = 'test_htb_gif_vs_image_namespace';
  static TATACLIQ_HOW_TO_BUY_EXPERIMENT_NAME =
    'test_htb_tatacliq_gif_vs_image_namespace';
  static VOUCHER_UI_BUILDUP_EXPERIMENT_NAME =
    'v2_voucher_landing_field_buildup_vs_display_once_together_namespace';
  static AMAZON_AFFILIATE_REDIRECT_EXPERIMENT_NAME =
    'v2_affliate_direct_vs_products_namespace';

  static getABTestVariantName() {
    let abTestVariant = getSessionStorage('abTestVariant');
    if (abTestVariant && ABTestConfig.hasOwnProperty(abTestVariant)) {
      return abTestVariant;
    }
    return 'A';
  }

  static getABTestConfig() {
    return ABTestConfig[ABTestUtils.getABTestVariantName()];
  }
}
