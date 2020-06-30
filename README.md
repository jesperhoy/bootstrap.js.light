# Bootstrap.js.Light

Super lightweight replacement for JQuery and bootstrap.js for Bootstrap v. 3 and v. 4 projects.

As a small enhancement over the original JQuery/Bootstrap.js, this library also supports opening multiple modals on top of each other (from v. 0.4.0).


2.0 KB minified and gzipped. 

Only very basic functionality is provided for Modals, Dropdowns, Tabs, Alerts, Collapses (tool bar), and Carousel.

To use it, simply copy the 'bsjslight3.min.js' or 'bsjslight4.min.js' file (depending on your version of Bootstrap)
to your website and reference it on a web-page (`<script src="bsjslight3.min.js"></script>`) and get rid of JQuery and the Bootstrap javascript (bootstrap.js) files/references.


Demo pages: [Bootstrap v. 3](https://jesperhoy.github.io/bootstrap.js.light/demo-bs3.html) / [Bootstrap v. 4](<https://jesperhoy.github.io/bootstrap.js.light/demo-bs4.html>)

It is designed to work well with Vue.js (and presummably React, Angular, etc.) - which is why I wrote it. But it does not depend on these and can also be used stand-alone. For more on background and motivation for this project, see <https://jesperhoy.com/p46>


## Supported Bootstrap components

#### Modal

- Supports `data-toggle="modal"` / `data-target="#MyModal"` / `href="#MyModal"` on trigger button/link.
- Or open via JavaScript with `BSLight.ModalShow('#MyModal',<callbackClosed>,<callbackShown>)`
    (replacing `$('#myModal').modal()` / `$('#myModal').modal('show')`).
- Supports `data-dismiss="modal"` on trigger elements (like X close button).
- Or hide via JavaScript with `BSLight.ModalHide(<result-string>,<callbackHidden>)`
    (replacing `$('#myModal').modal('hide')`).
- Supports `data-keyboard="true/false"` on `.modal` (default = `true`).
- Supports `data-background="true/false/static"` on `.modal` (default = `true`).
- Supports opening multiple modals (from v. 0.4.0). Modals are automatically placed on top of each other (z-index) in the order they are opened. 
- Automatically focuses first form element with `autofocus` attribute within modal (if any), when modal is opened.

Bootstrap docs for Modal: [Bootstrap v. 3](https://getbootstrap.com/docs/3.4/javascript/#modals) / [Bootstrap v. 4](https://getbootstrap.com/docs/4.3/components/modal/)

#### Dropdown


- Supports `data-toggle="dropdown"` on trigger button/link.
- Or open via JavaScript with `BSLight.Dropdown(<trigger-button/link-element>)`.

Bootstrap docs for Dropdown: [Bootstrap v. 3](https://getbootstrap.com/docs/3.4/javascript/#dropdowns) / [Bootstrap v. 4](https://getbootstrap.com/docs/4.3/components/dropdowns/)

#### Tab

- Supports `data-toggle="tab"` (or `pill`) / `data-target="#Tab2Content"` / `href="#Tab2Content"` on tab button/link.
- Or open via JavaScript with `BSLight.Tab(<trigger-button/link-element>,'#Tab2Content')`.

Bootstrap docs for Tab: [Bootstrap v. 3](https://getbootstrap.com/docs/3.4/javascript/#tabs) / [Bootstrap v. 4](https://getbootstrap.com/docs/4.3/components/navs/#tabs)

#### Alert

- Supports `data-dismiss="alert"` on trigger element (X close button).
- Or dismiss via JavaScript with `BSLight.AlertDismiss(<trigger-button-element>)`.

Bootstrap docs for Alert: [Bootstrap v. 3](https://getbootstrap.com/docs/3.4/javascript/#alerts) / [Bootstrap v. 4](https://getbootstrap.com/docs/4.3/components/alerts/)

#### Collapse (fx. Navbar burger)

- Supports `data-toggle="collapse"` / `data-target="#collapse1"` / `href="#collapse1"` on trigger button/link.
 
Bootstrap docs for Collapse: [Bootstrap v. 3](https://getbootstrap.com/docs/3.4/javascript/#collapse) / [Bootstrap v. 4](https://getbootstrap.com/docs/4.3/components/collapse/)

#### Carousel

- Supports `data-ride="carousel"` on root, and `data-slide` / `data-slide-to` / `data-target="#carousel1"` / `href="#carousel1"` on trigger button/link.
- Or initialize via JavaScript with `BSLight.Carousel(<carousel-element>)`.

Bootstrap docs for Carousel: [Bootstrap v. 3](https://getbootstrap.com/docs/3.4/javascript/#carousel) / [Bootstrap v. 4](https://getbootstrap.com/docs/4.3/components/carousel/)

## Dependencies 

Only the Bootstrap CSS file. 

No JQuery. No Bootstrap.js.

## Versioning

This project uses [Semantic Versioning](https://semver.org/).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Contributions

Contributions are most welcome. No contribution is too big or too small.

Fork this repository, clone locally, make your updates, commit, push, create a pull request in GitHub...

