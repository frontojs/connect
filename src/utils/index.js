import finder from './finder';
import network from './network';

const mix = (target, object) => 
  Object.assign(target.prototype, object);

export { finder, network, mix };
