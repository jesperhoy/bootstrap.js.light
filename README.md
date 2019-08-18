# Bootstrap.js.Light

Super lightweight replacement for JQuery and bootstrap.js for Bootstrap v. 4 and v. 3 projects.

No animations etc., just very basic functionality for Modals, Dropdowns, Tabs, Alerts, and Collapses (tool bar).

To use it, simply copy the 'bsjslight3.min.js' or 'bsjslight4.min.js' file (depending on your version of Bootstrap)
to your website and reference it on a web-page (`<script src="bsjslight3.min.js"></script>`) and get rid of JQuery and the Bootstrap javascript (bootstrap.js) files/references.

Demo pages: [Bootstrap v. 4](<https://jesperhoy.github.io/bootstrap.js.light/demo-bs4.html>)
/ [Bootstrap v. 3](https://jesperhoy.github.io/bootstrap.js.light/demo-bs3.html)

It works perfectly with Vue.js (and presummably React, Angular, etc.) - which is why I worte it.
 For more on background and motivation for this project, see <https://jesperhoy.com/p46>


## Supported Bootstrap components

#### Modal

- Supports `data-toggle="modal"` / `data-target="#MyModal"` / `href="#MyModal"` on trigger button/link.
- Or open via JavaScript with `BSLight.ModalShow('#MyModal',<callback>)`
    (replacing `$('#myModal').modal()` / `$('#myModal').modal('show')`).
- Supports `data-dismiss="modal"` on trigger elements (like X close button).
- Or hide via JavaScript with `BSLight.ModalHide(<result-string>)`
    (replacing `$('#myModal').modal('hide')`).
- Supports `data-keyboard="true/false"` on `.modal` (default = `true`).
- Supports `data-background="true/false/static"` on `.modal` (default = `true`).

Bootstrap docs for Modal: [Bootstrap v. 4](https://getbootstrap.com/docs/4.3/components/modal/)
/ [Bootstrap v. 3](https://getbootstrap.com/docs/3.4/javascript/#modals)

#### Dropdown


- Supports `data-toggle="dropdown"` on trigger button/link.
- Or open via JavaScript with `BSLight.Dropdown(<trigger-button/link-element>)`.

Bootstrap docs for Dropdown: [Bootstrap v. 4](https://getbootstrap.com/docs/4.3/components/dropdowns/)
/ [Bootstrap v. 3](https://getbootstrap.com/docs/3.4/javascript/#dropdowns)

#### Tab

- Supports `data-toggle="tab"` (or `pill`) / `data-target="#Tab2Content"` / `href="#Tab2Content"` on tab button/link.
- Or open via JavaScript with `BSLight.Tab(<trigger-button/link-element>,'#Tab2Content')`.

Bootstrap docs for Tab: [Bootstrap v. 4](https://getbootstrap.com/docs/4.3/components/navs/#tabs)
/ [Bootstrap v. 3](https://getbootstrap.com/docs/3.4/javascript/#tabs)

#### Alert

- Supports `data-dismiss="alert"` on trigger element (X close button).
- Or dismiss via JavaScript with `BSLight.AlertDismiss(<trigger-button-element>)`.

Bootstrap docs for Alert: [Bootstrap v. 4](https://getbootstrap.com/docs/4.3/components/alerts/)
/ [Bootstrap v. 3](https://getbootstrap.com/docs/3.4/javascript/#alerts)

#### Collapse (fx. Navbar burger)

- Supports `data-toggle="collapse"` / `data-target="#collapse1"` / `href="#collapse1"` on trigger button/link.

Bootstrap docs for Collapse: [Bootstrap v. 4](https://getbootstrap.com/docs/4.3/components/collapse/)
/ [Bootstrap v. 3](https://getbootstrap.com/docs/3.4/javascript/#collapse)

## Versioning

This project uses [Semantic Versioning](https://semver.org/).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Contributions

Contributions are most welcome. No contribution is too big or too small.

Fork this repository, clone locally, make your updates, commit, push, create a pull request in GitHub...

