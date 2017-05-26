import { observable, action, computed } from 'mobx';
import { finder, network } from './utils';

class Connect {
  @observable isLoading = false;

  @action setIsLoading(status) { 
    this.isLoading = status;
  }

  constructor(api) {
    this.api = api;
  }

  route = (parameters, query = false) => finder(
    null, this.resource, parameters, { query }
  );

  source = (parameters, query = false) => finder(
    this.namespace, this.resource, parameters, { query }
  );

  async call(
    args = { body: null, parameters: null, type: 'get', query: false }, 
    callback = {}
  ) {
    const pathname            = this.source(args.parameters, args.query);
    const response            = await network.request(
      this.api, args.type, pathname, args.body
    );
    
    const status              = await response.status;
    const contentType         = await response.headers.get('content-type');
    const body                = await network.reply(response, contentType);

    if (callback[status]) callback[status](body);

    this.setIsLoading(false);
  }

  @observable.shallow collection = [];
  @action setCollection = array => this.collection = array;
  @action clearCollection  = () => this.collection = [];
  @action appendToCollection = array => { 
    const existing  = this.collection;
    this.collection = existing.concat(array);
  }

  @action removeFromCollection = object => {
    const existing  = this.collection;
    this.collection = existing.filter(item => item.id === object.id);
  }

  @observable selected           = {};
  @action setSelected   = object => this.selected = object;
  @action clearSelected     = () => this.selected = {};

  @observable message  = null;
  @action setMessage   = message => this.message = message;
  @action clearMessage      = () => this.message = null;
}

export default Connect;
