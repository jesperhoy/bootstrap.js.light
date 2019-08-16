/*!
* Bootstrap.js.Light for Bootstrap v. 3 (https://github.com/jesperhoy/bootstrap.js.light)
* Version 0.2.0
* Copyright 2019 Jesper Høy
* Licensed under the MIT license
*/

var BSLight = function () {
    var rv = {};
    var DDBtn = null;
    var BtnHEvt = null;

    rv.Dropdown = function (btn) {
        BtnHEvt = event;
        if (DDBtn !== null) {
            var WasOpen = btn === DDBtn;
            DDClose();
            if (WasOpen) return;
        }
        DDBtn = btn;
        var dd = btn.parentElement;
        dd.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
    };

    function DDClose() {
        if (DDBtn === null) return;
        DDBtn.parentElement.classList.remove('open');
        DDBtn.setAttribute('aria-expanded', 'false');
        DDBtn = null;
    }

    function CollapseToggle(target) {
        var clp = document.querySelectorAll(target);
        var show = !clp[0].classList.contains('in');
        //remove .show and set aria-expanded="false" on all triggers
        var lst = document.querySelectorAll('[data-toggle="collapse"][data-target="' + target + '"],[data-toggle="collapse"][href="' + target + '"]');
        lst.forEach(function (e) {
            if (show) {
                e.setAttribute('aria-expanded', 'true');
                e.classList.remove('collapsed');
            } else {
                e.setAttribute('aria-expanded', 'false');
                e.classList.add('collapsed');
            }
        });
        clp.forEach(function (e) {
            if (show) {
                e.classList.add('in');
                e.setAttribute('aria-expanded', 'true');
            } else {
                e.classList.remove('in');
                e.setAttribute('aria-expanded', 'false');
            }
        });
    };

    var ModalE = null;
    var ModalBD = null;
    var ModalCB = null;

    rv.ModalShow = function (target, cb) {
        if (ModalE !== null) return;
        ModalE = document.querySelector(target);
        ModalE.style.display = 'block';
        ModalE.classList.add("in");
        ModalE.addEventListener("click", ModalBDClick);
        document.body.classList.add('modal-open');
        if (ModalE.dataset.backdrop !== 'false') {
            ModalBD = document.createElement("div");
            ModalBD.className = 'modal-backdrop fade in';
            document.body.appendChild(ModalBD);
        }
        ModalCB = cb === undefined ? null : cb;
    };

    function ModalBDClick(evt) {
        if (ModalE === null) return;
        if (evt.target !== ModalE) return;
        var dbd = ModalE.dataset.backdrop;
        if (dbd === 'false' || dbd === 'static') return;
        rv.ModalHide('backdrop');
    }

    rv.ModalHide = function (result) {
        if (ModalE === null) return;
        ModalE.style.display = 'none';
        ModalE.classList.remove("in");
        ModalE.removeEventListener("click", ModalBDClick);
        document.body.classList.remove('modal-open');
        if (ModalBD !== null) document.body.removeChild(ModalBD);
        ModalE = null;
        ModalBD = null;
        if (ModalCB !== null) ModalCB(result);
    };

    rv.AlertDismiss = function (btn) {
        var al = btn.parentElement;
        if (al.classList.contains('alert') && al.classList.contains('alert-dismissible')) {
            al.parentElement.removeChild(al);
        }
    };

    rv.Tab = function (btn, target) {
        // find parent .nav-tabs
        var NavTabs = btn;
        while (NavTabs && !NavTabs.classList.contains('nav-tabs') && !NavTabs.classList.contains('nav-pills')) {
            NavTabs = NavTabs.parentElement;
        }
        if (!NavTabs) return;
        // remove .active from all child <li> 
        var lst = NavTabs.querySelectorAll('li.active');
        lst.forEach(function (li) { li.classList.remove('active'); });
        // add .active to all <li> ancestors of btn
        var e = btn;
        while (!e===NavTabs) {
            if (e.tagName === 'LI') e.classList.add('active');
            e = e.parentNode;
        }
        // set .active + .in on target content page 
        var tc = document.querySelector(target);
        tc.classList.add('active');
        tc.classList.add('in');
        // remove .active + .in from other content pages
        lst = tc.parentElement.querySelectorAll('.tab-pane');
        lst.forEach(function (c) {
            if (c !== tc) {
                c.classList.remove('active');
                c.classList.remove('in');
            }
        });
    };

    document.addEventListener('click', function (evt) {
        if (evt === BtnHEvt) return;
        var DDBtnWas = DDBtn;
        DDClose();
        var e = evt.target;
        while (e) {
            switch (e.getAttribute('data-toggle')) {
                case 'dropdown':
                    evt.preventDefault(); // don't follow link or submit form
                    if (e !== DDBtnWas) rv.Dropdown(e);
                    return;
                case 'collapse':
                    evt.preventDefault(); // don't follow link or submit form
                    CollapseToggle(e.dataset.target || e.getAttribute('href'));
                    return;
                case 'modal':
                    evt.preventDefault(); // don't follow link or submit form
                    rv.ModalShow(e.dataset.target || e.getAttribute('href'));
                    return;
                case 'tab':
                case 'pill':
                    evt.preventDefault(); // don't follow link or submit form
                    rv.Tab(e,e.dataset.target || e.getAttribute('href'));
                    return;
            }
            switch (e.getAttribute('data-dismiss')) {
                case 'modal':
                    evt.preventDefault(); // don't follow link or submit form
                    rv.ModalHide('dismiss');
                    return;
                case 'alert':
                    evt.preventDefault(); // don't follow link or submit form
                    rv.AlertDismiss(e);
                    return;
            }
            e = e.parentElement;
        }
    });

    document.addEventListener('keydown', function (evt) {
        // check for Escape key
        if (evt.key !== "Escape" && evt.key !== "Esc") return;
        if (DDBtn !== null) {
            DDClose();
            return;
        }
        if (ModalE === null) return;
        if (ModalE.dataset.keyboard === 'false') return;
        rv.ModalHide('escape');
    });

    return rv;
}();

