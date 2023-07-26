import InfoDetailsB from './infoDetailsB';
import { experimentName } from '../../../../api/controllers/experimentController';
import withExperiment from '../../../../HOC/withExperiment';
import InfoDetailsA from './infoDetailsA';

export default withExperiment(
  experimentName.TRANSACTION_AIVF_POP_UP_VARIANT,
  {
    A: InfoDetailsA,
    B: InfoDetailsB,
  },
  'A',
)(null);
