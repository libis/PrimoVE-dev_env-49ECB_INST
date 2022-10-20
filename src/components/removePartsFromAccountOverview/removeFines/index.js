class RemoveFinesController {
  constructor() {
  }
  $onInit() {
    this.parentCtrl.parentCtrl.accountOverviewService._requiredTabsList  =  this.parentCtrl.parentCtrl.requiredTabsList.filter( (tab) => { return tab != "fines" } ) 
  }
}

RemoveFinesController.$inject = [];

export let removeFinescomponent = {
  name: 'remove-fines',  
  enabled: true,
  appendTo: 'prm-account-overview-after',
  enableInView: '.*',  
  config: {
    bindings: {parentCtrl: '<'},
    controller: RemoveFinesController,
    template: ''
  }
}
