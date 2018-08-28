import { observable, action, computed } from 'mobx'

class Networking {
  @observable.shallow pending = []

  @computed get completed() {
    return this.pending.length === 0
  }

  @action addPending(name) {
    const existing = this.pending
    if (!existing.includes(name)) {
      this.pending = existing.concat([name])
    }
  }

  @action removeFromPending(name) {
    const existing  = this.pending
    this.pending = existing.filter(item => item !== name)
  }

  @action flush() {
    this.pending = []
  }
}

export default Networking
