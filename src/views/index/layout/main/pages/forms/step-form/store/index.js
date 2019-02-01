
import { observable, action } from 'mobx'

class Step {
  @observable step = {
    payAccount: 'cyb-antDesign@alipay.com',
    receiverAccount: 'test@example.com',
    receiverName: 'Alex',
    amount: '500',
  }

  @action setStep = (values) => {
    this.step = Object.assign(this.step, values)
  }
}

export default {
  Step: new Step()
}
