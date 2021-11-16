

app.component('prmVirtualBrowseItemAfter', {
    bindings: {
        parentCtrl: '<'
    },
    controller: 'prmVirtualBrowseItemAfter',
    templateUrl: ''
});


app.controller('prmVirtualBrowseItemAfter', ['$element',
    function ($element) {
        $element.parent().parent().attr("target","_blank")
    }
]);
