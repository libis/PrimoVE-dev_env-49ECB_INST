/* https://otago.hosted.exlibrisgroup.com/primo-explore/search?vid=DUNEDIN&sortby=rank&search_scope=All */


/* document.title => See Code Table Header/Footer Tiles */
document.querySelectorAll("link[rel='icon']")[0].setAttribute("href", "/discovery/custom/49ECB_INST-ECB/img/favicon.png")

/* TODO : get this on Central Package level */

app.component('prmLinkedUserSelectorAfter', {
    bindings: {
        parentCtrl: '<'
    },
    controller: 'prmLinkedUserSelectorAfter',
    templateUrl: '/discovery/custom/49ECB_INST-ECB/html/prmLinkedUserSelectorAfter.html'
});

app.controller('prmLinkedUserSelectorAfter', [ '$scope', 
    function ($scope) {
        $scope.signOut = function () {
            scope.$root.$$childHead.$ctrl.userSessionManagerService.userLogout() 
          //  document.location.href = "https://leuven-primo.hosted.exlibrisgroup.com/pds?func=logout&calling_system=primo&institute=ECB&url=" + document.location.origin + "/primo-explore/search?vid="+ vid +"%26performLogout=true"
        }
    }
]);

app.component('prmUserAreaAfter', {
    bindings: {
        parentCtrl: '<'
    },
    controller: 'prmUserAreaAfterController',
    templateUrl: '/discovery/custom/49ECB_INST-ECB/html/user-area.html'
});

app.controller('prmUserAreaAfterController', ['$element', '$scope',
    function ($element, $scope) {

        var ctrl = this;
        ctrl.$onInit = function () {
            ctrl.$element = $element;
        };

        ctrl.$postLink = function () {
            ctrl.insertUserSignin();
        };

        ctrl.insertUserSignin = function () {
            var elementRemove = document.getElementsByTagName('prm-user-area')[0];
            var i = elementRemove.children.length -1;
            while (i >= 0) {
                if ( elementRemove.children[i].tagName !== 'PRM-USER-AREA-AFTER'){
                    angular.element(elementRemove.children[i]).remove();
                }
                i--;
            }
            /*
            console.log (elementRemove) 
            angular.element(elementRemove.children[2]).remove();
            angular.element(elementRemove.children[1]).remove();
            angular.element(elementRemove.children[0]).remove();
            */
            $scope.signIn = function () {
                ctrl.parentCtrl.loginIframeService.loginService.handleLoginClick()
            };

        };
    }
]);