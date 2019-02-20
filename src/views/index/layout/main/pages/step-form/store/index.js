
import { observable, action } from 'mobx'

class Step {
  @observable step = {
    payAccount: '',
    receiverAccount: '',
    receiverName: '',
    amount: '',
  }

  @action setStep = (values) => {
    this.step = Object.assign(this.step, values)
  }
}

export default {
  Step: new Step()
}
