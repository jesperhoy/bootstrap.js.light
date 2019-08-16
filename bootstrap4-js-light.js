/*!
* Bootstrap.js.Light for Bootstrap v. 4 (https://github.com/jesperhoy/bootstrap.js.light)
* Version 0.1.1
* Copyright 2019 Jesper Høy
* Licensed under the MIT license
*/

var JHBS = function () {
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
        dd.classList.add('show');
        btn.setAttribute('aria-expanded', 'true');
        dd.querySelector('.dropdown-menu').classList.add('show');
    };

    function DDClose() {
        if (DDBtn === null) return;
        var dd = DDBtn.parentElement;
        dd.classList.remove('show');
        DDBtn.setAttribute('aria-expanded', 'false');
        dd.querySelector('.dropdown-menu').classList.remove('show');
        DDBtn = null;
    }

    function CollapseToggle(target) {
        var clp = document.querySelectorAll(target);
        var show = !clp[0].classList.contains('show');
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
                e.classList.add('show');
            } else {
                e.classList.remove('show');
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
        ModalE.classList.add("show");
        ModalE.addEventListener("click", ModalBDClick);
        ModalE.removeAttribute('aria-hidden');
        ModalE.setAttribute('aria-modal','true');
        document.body.classList.add('modal-open');
        if (ModalE.dataset.backdrop !== 'false') {
            ModalBD = document.createElement("div");
            ModalBD.className = 'modal-backdrop fade show';
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
        ModalE.classList.remove("show");
        ModalE.removeEventListener("click", ModalBDClick);
        ModalE.setAttribute('aria-hidden','true');
        ModalE.removeAttribute('aria-modal');
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
        while (!NavTabs.classList.contains('nav-tabs') && !NavTabs.classList.contains('nav-pills') ) {
            NavTabs = NavTabs.parentElement;
            if (!NavTabs) return;
        }
        // remove .active from all children - and set aria-expanded="false" on these
        var lst = NavTabs.querySelectorAll('.active');
        lst.forEach(function (li) {
            li.classList.remove('active');
            li.setAttribute('aria-expanded', 'false');
        });
        // set .active / aria-expanded on trigger
        btn.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        // remove .active + .show from content pages
        var tc = document.querySelector(target);
        lst = tc.parentElement.querySelectorAll('.tab-pane');
        lst.forEach(function (c) {
            c.classList.remove('show');
            c.classList.remove('active');
            });
        // set .active + .show on target content page 
        tc.classList.add('show');
        tc.classList.add('active');
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
                    rv.Tab(e, e.dataset.target || e.getAttribute('href'));
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

