class ExternalLinksInDetailsController {
    constructor($scope) {
        this.$scope = $scope;
    }

    $onInit() {
        let self = this;
        self.parentCtrl = this.parentCtrl.parentCtrl;
        this.waitForPNX()
    }

    createExternalLinks() {
        let self = this;
        // console.log( self.parentCtrl.details )

        let identifiers = self.parentCtrl.details.filter(function (d) {
            return d.label === "identifier";
        });
        
        // console.log( identifiers[0].values[0].values );

        if (identifiers[0]) {
            if (identifiers[0].values) {

                var newIdentifiers = identifiers[0].values[0].values.map(i => {
                    if (new RegExp(" \\$\\$CDOI: ").test(i)) {
                        return i.replace(/( \$\$CDOI: \$\$V)([^\n ]*)/, '$1<a href="https://doi.org/$2" target="_blank">$2 <i class=\"material-icons prm-text\" style>launch</i></a>');
                    } else {
                        return i;
                    }
                });

                //console.log( newIdentifiers );

                identifiers[0].values[0].values = newIdentifiers
            }
        }

    }


    waitForPNX() {
        let self = this;

        let detailsWatcher =  self.$scope.$watch(() => {
            return ((typeof self.parentCtrl.details != "undefined") );
        }, (n, o) => {
            if (n == true) {
                detailsWatcher();
                this.createExternalLinks()
            }
        });

    }

}
ExternalLinksInDetailsController.$inject = ['$scope'];

export let externalLinksInDetailscomponent = {
    name: 'custom-external-link',
    enabled: true,
    appendTo: 'prm-service-details-after',
    enableInView: '.*',
    config: {
        bindings: { parentCtrl: '<' },
        controller: ExternalLinksInDetailsController,
        template: ''
    }
}
