export default {
  update(parameters, body) {
    this.setIsLoading(true);
    this.call({ parameters, body, type: 'patch' }, { 
      200: this.setSelected
    });
  },
  create(parameters, body) { 
    this.setIsLoading(true);
    this.call({ parameters, body, type: 'post' }, { 
      201: this.appendToCollection
    });
  },
  delete(parameters) { 
    this.setIsLoading(true);
    this.call({ parameters, type: 'delete' }, {
      200: this.removeFromCollection
    });
  },
}
