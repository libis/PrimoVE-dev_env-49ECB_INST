

app.component('prmServiceDetailsAfter', {
    bindings: {
        parentCtrl: '<'
    },
    controller: 'prmServiceDetailsAfter',
    templateUrl: ''
});

app.controller('prmServiceDetailsAfter', [ '$scope', '$compile',
    function ($scope,  $compile) {
        self = this
        this.$scope = $scope;
        this.$compile =  $compile;

        self.removeDescriptionIfDb = function () {

            if ( self.parentCtrl.item.pnx.display.type.includes("database") ) {

                for (var d in self.parentCtrl.details) {
                    if (self.parentCtrl.details[d].label === "description" ){
                        self.parentCtrl.details[d].values[0].values = ''
                    }
                }
            }

        };

        self.waitForPNX = function () {
            console.log ( this );
            let unbindWatcher = self.$scope.$watch(() =>
            self.parentCtrl.details,
                (newVal, oldVal) => {
                    if (newVal) {
                        unbindWatcher();
                        this.removeDescriptionIfDb()
                    }               
                }
            );
        };

        self.waitForPNX();

    }
]);
