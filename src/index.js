/*
  General entry to Primo custom methods

  (c)2020 KULeuven/LIBIS 
  Mehmet Celik  
*/

"use strict"
import Primo from './primo';
import Loader from './loader';
import MessageService from './factories/messageService';
// import 'primo-explore-eth-archives-getit';


import "../resources/general/css/custom1.css";
import "./index.css";

/*
import './swisscovery/41SLSP_NETWORK-VU1_UNION/js/slsp-edit-personal-details';
import './swisscovery/41SLSP_NETWORK-VU1_UNION/js/slsp-http-intercept-requests';
*/

// standard google analytics tracking code
(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments);
  }, i[r].l = 1 * new Date();
  a = s.createElement(o), m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

(function () {
  //let customType = 'centralCustom';
  let customType = 'viewCustom';
  window.Primo = new Primo();

  let moduleList = ['ngMaterial', 'angularLoad'];
  //let moduleList = ['oc.lazyLoad', 'ngMaterial', 'angularLoad', 'ethArchivesGetitModule', 'slspEditPersonalDetails', 'slspHttpInterceptRequests'];

  let app = angular.module(customType, moduleList).config(($sceDelegateProvider) => {
      $sceDelegateProvider.resourceUrlWhitelist([
        '**'
      ]);
    })
    .service('MessageService', MessageService)
    .constant('reportAProblemURL', 'https://services.libis.be/report_a_problem')
    .run(($translate, $rootScope, angularLoad) => {
      angularLoad.loadScript('https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js?' + Date.now()).then(function () {
        console.log('Altmetric script loaded');
      });

      let watcher = $rootScope.$watch(() => {
        try {
          if ($translate.instant('nui.customization.browzine.id') == 'nui.customization.browzine.id') {
            return false;
          } else {
            return true;
          }
        } catch (e) {
          return false;
        }
      }, (n, o) => {
        if (n == true) {
          let apiId = $translate.instant('nui.customization.browzine.id');
          let apikey = $translate.instant('nui.customization.browzine.apikey');
          let journal = $translate.instant('nui.customization.browzine.journal');
          let issue = $translate.instant('nui.customization.browzine.issue');
          let article = $translate.instant('nui.customization.browzine.article');
          let downloadEnabled = $translate.instant('nui.customization.browzine.download_enable') == '1';
          let download = $translate.instant('nui.customization.browzine.download');
          let articlePDFDownloadViaUnpaywallText = $translate.instant('nui.customization.browzine.articlePDFDownloadViaUnpaywallText');
          let articleLinkViaUnpaywallText = $translate.instant('nui.customization.browzine.articleLinkViaUnpaywallText');
          let articleAcceptedManuscriptPDFViaUnpaywallText = $translate.instant('nui.customization.browzine.articleAcceptedManuscriptPDFViaUnpaywallText');
          let articleAcceptedManuscriptArticleLinkViaUnpaywallText = $translate.instant('nui.customization.browzine.articleAcceptedManuscriptArticleLinkViaUnpaywallText');

          
          window.browzine = {
            api: `https://public-api.thirdiron.com/public/v1/libraries/${apiId}`,
            apiKey: apikey,
            journalBrowZineWebLinkText: journal,
            articleBrowZineWebLinkText: issue,
            articlePDFDownloadLinkEnabled: downloadEnabled,
            articlePDFDownloadLinkText: download,
            articleLinkText: article,
            articlePDFDownloadViaUnpaywallText: articlePDFDownloadViaUnpaywallText,
            articleLinkViaUnpaywallText: articleLinkViaUnpaywallText,
            articleAcceptedManuscriptPDFViaUnpaywallText: articleAcceptedManuscriptPDFViaUnpaywallText,
            articleAcceptedManuscriptArticleLinkViaUnpaywallText: articleAcceptedManuscriptArticleLinkViaUnpaywallText
          };

          angularLoad.loadScript('https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js').then(() => {
            console.log('browzine-primo-adapter.js loaded');
          });

          let googleAnalyticsKey = $translate.instant(`nui.customization.googleanalytics.${window.Primo.bridge.viewCode}`);
          if (googleAnalyticsKey) {
            ga('create', googleAnalyticsKey, 'auto');
            ga('send', 'pageview');
          }

/* BibtTip is made for RZS
          let bibTipURL = $translate.instant(`nui.customization.bibTip`);
          angularLoad.loadScript(bibTipURL).then(function () {
            console.log('bibtip.js loaded');
          });
*/
          watcher();
        }
      });
    });

  //Load components
  new Loader().load(customType);
  console.log(`Done initializing ${customType}`)
})();