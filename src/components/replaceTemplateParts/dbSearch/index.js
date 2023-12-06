import mdCardHTML from './mdCard.html'

class EditDbSearchTextcomponentController {
  constructor($scope, $element, $compile) {
    //this is a watcher on the prm-search component and will trigger replacement of content
    //console.log( $scope.$root.$$childHead.$ctrl.$state.params.databases );
    if ($scope.$root.$$childHead.$ctrl.$state.params.databases == undefined) {
      let componentWatcher = $scope.$watch(() => {
        let prmDatabaseMdCardExists =  $element.parent().parent().find('prm-search').find('md-card').length > 0;
        return prmDatabaseMdCardExists
      }, (n, o) => {
        if (n == true) {
          if ( $element.parent().parent().find('prm-search').find('md-card').length > 0 ) {
            let mdCardElement = $element.parent().parent().find('prm-search').find('md-card');
            var htmlResult = $compile(mdCardHTML)( $scope.$root  );
            mdCardElement.empty()
            mdCardElement.append( htmlResult );
            componentWatcher(); //deregister watcher
          }
        }
      }, false);
    }
  }
}

EditDbSearchTextcomponentController.$inject = ['$scope', '$element', '$compile'];

export let editDbSearshTextcomponent = {
  name: 'edit-dbsearch-text',
  enabled: true,
  appendTo: 'prm-databases-after',
  enableInView: '.*',  
  config: {
    bindings: {parentCtrl: '<'},
    controller: EditDbSearchTextcomponentController,
    template: ''
  }
}
