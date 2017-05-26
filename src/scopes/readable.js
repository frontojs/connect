export default {
  find() { this.findBy(); },
  findBy(parameters) {
    this.setIsLoading(true);
    this.clearSelected();
    this.call({ parameters, type: 'get' }, {
      200: this.setSelected
    });
  },
  findAll(parameters) {
    this.setIsLoading(true);
    this.clearCollection();
    this.call({ parameters, type: 'get' }, {
      200: this.setCollection 
    });
  },
};
