/*!
* Bootstrap.js.Light for Bootstrap v. 4 (https://github.com/jesperhoy/bootstrap.js.light)
* Version 0.5.0
* Copyright 2019-2020 Jesper Høy
* Licensed under the MIT license
*/

var BSLight = function () {
    var rv = {};
    var DDBtn = null;
    var BtnHEvt = null;

    rv.Dropdown = function (btn) {
        if (typeof btn === 'string') btn = document.querySelector(btn);
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

    var Modals = [];

    rv.ModalShow = function (target, cbClosed, cbShown) {
        var m = {
            cbClosed: cbClosed,
            elem: typeof target === 'string' ? document.querySelector(target) : target,
            backdrop: null
        };
        Modals.push(m);
        m.elem.addEventListener("click", ModalBDClick);
        m.elem.style.display = 'block';
        m.elem.style.zIndex = 1030 + 20 * Modals.length;
        m.elem.removeAttribute('aria-hidden');
        m.elem.setAttribute('aria-modal', 'true');
        if (Modals.length === 1) document.body.classList.add('modal-open');
        if (m.elem.dataset.backdrop !== 'false') {
            m.backdrop = document.createElement("div");
            m.backdrop.className = 'modal-backdrop' + (m.elem.classList.contains('fade') ? ' fade' : '');
            m.backdrop.style.zIndex = 1020 + 20 * Modals.length;
            document.body.appendChild(m.backdrop);
        }
        m.elem.querySelector('.modal-dialog').addEventListener("transitionend",
            function () {
              var af = m.elem.querySelector('[autofocus]');
              if (!af) af = m.elem;
              af.focus();
              if (cbShown) cbShown();
            }, { once: true });
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            m.elem.classList.add("show");
            if (m.backdrop) m.backdrop.classList.add('show');
            });
        });
    };

    function ModalBDClick(evt) {
        if (Modals.length === 0) return;
        var m = Modals[Modals.length - 1];
        if (evt.target !== m.elem) return;
        var dbd = m.elem.dataset.backdrop;
        if (dbd === 'false' || dbd === 'static') return;
        rv.ModalHide('backdrop');
    }

    rv.ModalHide = function (trigger,cb) {
        if (Modals.length === 0) return;
        var m = Modals[Modals.length - 1];
        m.elem.removeEventListener("click", ModalBDClick);
        m.elem.setAttribute('aria-hidden', 'true');
        m.elem.removeAttribute('aria-modal');
        var Fade = m.elem.classList.contains('fade');
        if (Fade) {
          m.elem.querySelector('.modal-dialog').addEventListener("transitionend",
            function () { ModalHideComplete(trigger, cb); }, { once: true });
        }
        m.elem.classList.remove("show");
        if (m.backdrop) m.backdrop.classList.remove('show');
        if (!Fade) ModalHideComplete(trigger,cb);
    };

    function ModalHideComplete(trigger,cb) {
        var m = Modals.pop();
        m.elem.style.display = 'none';
        if(Modals.length===0) document.body.classList.remove('modal-open');
        if (m.backdrop !== null) document.body.removeChild(m.backdrop);
        if (m.cbClosed) m.cbClosed(trigger);
        if (cb) cb();
    }

    rv.AlertDismiss = function (btn) {
        if (typeof btn === 'string') btn = document.querySelector(btn);
        var al = btn.parentElement;
        if (al.classList.contains('alert') && al.classList.contains('alert-dismissible')) {
            al.parentElement.removeChild(al);
        }
    };

    rv.Tab = function (btn, target) {
        if (typeof btn === 'string') btn = document.querySelector(btn);
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
        var attr;
        var el;
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
            attr = e.getAttribute('data-slide-to');
            if (attr) {
                el = document.querySelector(e.dataset.target || e.getAttribute('href'));
                if (el) {
                    Carousels.forEach(function (c) {
                        if (c.el === el) c.SlideTo(parseInt(attr));
                    });
                    evt.preventDefault(); // don't follow link or submit form
                    return;
                }
            }
            attr = e.getAttribute('data-slide');
            if (attr === "prev" || attr === "next") {
                el = document.querySelector(e.dataset.target || e.getAttribute('href'));
                if (el) {
                    Carousels.forEach(function (c) {
                        if (c.el === el) c.Slide(attr === "next" ? 1 : -1);
                    });
                    evt.preventDefault(); // don't follow link or submit form
                    return;
                }
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
        if (Modals.length === 0) return;
        var m = Modals[Modals.length - 1];
        if (m.elem.dataset.keyboard === 'false') return;
        rv.ModalHide('escape');
    });

    var Carousels = [];
    rv.Carousel = function (el) {
        if (typeof el === 'string') el = document.querySelector(el);
        var x = el.getAttribute('data-interval');
        var interval = x ? parseInt(x) : 5000;
        x = el.getAttribute('data-wrap');
        var wrap = x ? (x === 'true') : true;
        var paused = false;
        x = el.getAttribute('data-pause');
        if (!x || x === 'hover') {
            el.addEventListener('mouseenter', function () { paused = true; });
            el.addEventListener('mouseleave', function () { paused = false; });
        }
        var items = el.querySelectorAll(".carousel-inner .carousel-item");
        var idx = 0;
        for (var i = 0; i < items.length; i++) {
            if (items[i].classList.contains('active')) {
                idx = i;
                break;
            }
        }
        var indicators = el.querySelectorAll(".carousel-indicators li");

        window.setInterval(function () {
            if (paused) return;
            if (!wrap && idx === items.length - 1) return;
            Turn((idx + 1) % items.length, true);
        }, interval);

        var co = {
            el: el,
            SlideTo: function (toIdx) {
                if (toIdx === idx) return;
                Turn(toIdx, idx < toIdx);
            },
            Slide: function (rel) {
                if (!wrap && rel === -1 && idx === 0) return;
                if (!wrap && rel === 1 && idx === items.length - 1) return;
                Turn((idx + items.length + rel) % items.length, rel > 0);
            }
        };
        Carousels.push(co);

        var CurTurn = 0;

        function Turn(toIdx, left) {
            CurTurn += 1;
            var ThisTurn = CurTurn;
            for (var i = 0; i < items.length; i++) {
                items[i].className = 'carousel-item' + (i === idx ? ' active' : '') + (i === toIdx ? " carousel-item-" + (left ? "next" : "prev") : '');
                if (indicators.length >= i - 1) indicators[i].className = (i === toIdx ? 'active' : '');
            }
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    if (CurTurn !== ThisTurn) return;
                    for (var i = 0; i < items.length; i++) {
                        items[i].className = 'carousel-item' + (i === idx ? ' active' : '') + (i === toIdx ? " carousel-item-" + (left ? "next" : "prev") : '') + " carousel-item-" + (left ? "left" : "right");
                    }
                    idx = toIdx;
                    window.setTimeout(function () {
                        if (CurTurn !== ThisTurn) return;
                        for (var i = 0; i < items.length; i++) {
                            items[i].className = 'carousel-item' + (i === idx ? ' active' : '');
                        }
                    }, 600);
                });
            });
        }
    };

    window.addEventListener('load', function () {
        document.querySelectorAll('[data-ride="carousel"]').forEach(rv.Carousel);
    });



    return rv;
}();

