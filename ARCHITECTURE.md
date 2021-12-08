# TODO

* add a css classmap to allow for restyles
* remove categories and use purposes
* remove all unused things
* rename app => tracker
* check all TODO comments
* switch to rollup
* https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
* externalize translations
* cleanup tsconfigs
* report package.json info to each package
* report npmignore and test publish on a private repo
* check each configuration var and report changes
* update authors and meta in packages

# Done

public interface : resetConsent => clearConsents
manager is synchronous, no save after update
app.callback => manager.on()
* no more multiple instances

# Specs

https://www.cnil.fr/sites/default/files/atoms/files/recommandation-cookies-et-autres-traceurs.pdf

## Usage


* prompt
  * accept
    -> accepts all and proceeds
    -> Public.acceptAll()
  * decline
    -> decline non-essential cookies and proceeds
    -> Public.declineAll()
  * configure
    -> allows fine grain control over consents
    -> Public.prompt()
* configuration
  -> see apps (Cnil's "finalités") and categories
    -> merge categories and purposes ?
  -> Internal.toggleApp()
    -> use temporary states and commit ?
  -> accept all and decline all buttons
* changes
  -> prompts again
  -> Internal.hasConfigChanged()
* contextual changes

class Orejime {
  notify()
  prompt()
  acceptAll()
  declineAll()
}

## Configuration

* categories
* purposes
* apps
  * default consent
  * optOut
    -> remove ? (allows for apps to start without consent)
    * persisted in cookies ("eu-consent" ?)
    * persisted in DOM

# Interface

* Use checkboxes ?
* checkboxes on categories ?

# Refactoring

* ConsentManager
  * requiresConsent()
* Main
  * function
  * useImperativeHandle
  * requiresConsent()
* Apps.tsx
  * function
  * areAllAppsRequired/areAllAppsEnabled/areAllAppsDisabled
  * tests
* ConsentNoticeWrapper
  * function
* AppItem
  * function
* cookies
  * cookie-js
* ConsentModal
  * function
* ConsentNotice
  * function
  * inlinings
  * logo from config fns
* Dialog
  * no default on config.elementID
  * function
  * useEffect/LayoutEffect
* InstanceContext
* orejime
  * ManagerPool
  * getElement -> config utils
  * getTranslations -> config utils
  * validate -> config utils


WARNING : React version update ?? (hooks)
 -> BREAKING
