import { Algorithm, IAlgorithm } from '../../interfaces';

import { rientroDeiCervelli } from './IT';

export const algorithms: Record<Algorithm, IAlgorithm> = {
  [Algorithm.RIENTRO_DEI_CERVELLI]: rientroDeiCervelli,
};
