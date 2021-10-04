# CUSTOM_VIEW
This is the CUSTOM_VIEW package 
## Getting started:
## Dependencies
node version ">= 14.13.1" !
npm install -g yarn

### Setting up the environment
- Clone the repository
- Install dependencies
```
yarn install
```
- Check if ```primoServe``` was installed if not install it manually
```
yarn add primo-server --dev
```
- Start up a proxy for testing. Copy the URL into a private or incognito window to break the browser cache.
```
yarn start
```
- Build the source. 
```
yarn build
yarn watch
```
- Create a package that you can upload to the back office 
```
yarn package (the folder 'package' must exist)
```
OR
```
make_package.sh
```

### Directory structure
```
dist                                            Directory with compiled sources
package                                         Directory with the packaged compiled sources
src                                             Source code
├── components                                  Directory with all the components                 
│   └── libInfo                                 Component
│       ├── index.js                            Business logic of component
│       ├── libInfo.html                        Visuals of component
│       └── libInfo.json                        Extra data
├── factories                                   Angular factories and services
│   ├── messageService.html
│   └── messageService.js
├── index.js                                    ViewCustom definition
├── loader.js                                   Component loader
├── primo                                       Bridge into Primo services like user, records, facets ...
└── templates                                   Template files used to overwrite existing primo templates
```
## Changing the server address

In ```package.json``` you can find the proxy parameters. 
```json
  "primo": {
    "url": "https://<primo-inst>.primo.exlibrisgroup.com",
    "institution": "<primo-inst>",
    "vidId": "<vid>"
  },
```
If you update them then next time you run ```yarn start``` it will point to a new configured Primo. 


## (de)Activating components
The index.js in the componets direcory always contains
```
export let <name>Component = {
  name: 'custom-<name>',  
  enabled: false,
  appendTo: '<after-component>',
  enableInView: '.*',
  config: {  
    bindings: {
      parentCtrl: '<'
    },
    controller: <name>Controller,
    template: <name>HTML
  }
}
```
## Institutional or View specific variables are defined with ui.customization in Alma
=> Alma => Discovery => Display Configuration => Labels => View Labels

example (browzine)