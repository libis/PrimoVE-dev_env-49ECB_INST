class RemoveBlocksController {
  constructor() {
  }
  $onInit() {
    this.parentCtrl.parentCtrl.accountOverviewService._requiredTabsList = this.parentCtrl.parentCtrl.requiredTabsList.filter( (tab) => { return tab != "blocks" } ) 
  }
}

RemoveBlocksController.$inject = [];

export let removeBlockscomponent = {
  name: 'remove-blocks',  
  enabled: true,
  appendTo: 'prm-account-overview-after',
  enableInView: '.*',  
  config: {
    bindings: {parentCtrl: '<'},
    controller: RemoveBlocksController,
    template: ''
  }
}
