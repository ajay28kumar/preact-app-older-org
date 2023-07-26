import { buyWithInstacredLandingRoute } from '../../alias/homeRoutes';
import {
  activationVerifySecondFactorRoute,
  verifyMobileRoute,
} from '../../alias/activationRoutes';
import { PinChangeType } from '../../utils/changePinSource';

export default {
  //ACTIVATION-FLOW REDIRECTION_PATH
  [`${PinChangeType.ACTIVATION}_BIC`]: buyWithInstacredLandingRoute.path,
  [`${PinChangeType.ACTIVATION}_VERIFY_MOBILE`]: `${verifyMobileRoute.path}${
    window.location.search
  }`,
  [`${PinChangeType.ACTIVATION}_VERIFY_AIVF`]: `${
    activationVerifySecondFactorRoute.path
  }${window.location.search}`,
};
