# TODO

* add a css classmap to allow for restyles
* remove all unused things
* check all TODO comments
* clarify use of "src/ui/trackers" ??
* report package.json info to each package
* report npmignore and test publish on a private repo
* check each configuration var and report changes
* update authors and meta in packages
* use nx ? (monorepo)
* MIT licence ?

# Rebase

update preact / deps
bundle with parcel
  + move dist-site
  + scss
  + typescript
  + jest
  - check outputs
add core
rewrite standard
  + migrate config
  + migrate translations
  + ambient.d.ts
split chunks
split translations
add dsfr
  + html
add migrations
  + html

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

DONT use translations on purposes, user should handle them itself

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



# Stories

As user

Banner
  should appear when consent has not been given
  should not appear when consent has been given
  should provide a link to the privacy policy
  should mention the site owner and its partners
  should provide a way to accept all cookies
  should provide a way to decline non mandatory cookies
  should provide a way to give consents for each purpose
  if configured, should prevent the user from interacting with the website until they set their consent

Modal
  should inform on the way to decline previous consents
  should show each purposes, and for each one:
    should show a label
    should show a decription
    should provide an input to accept or decline cookies
    should prevent from declining a mandatory cookie

Content
  should block embedded content for which the user did not accept related cookies
  should provide a way to accept cookies related to a blocked embedded content and load it

As a webmaster

Technical
  migration of config
  migration of translations
