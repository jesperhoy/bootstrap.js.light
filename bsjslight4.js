/*!
* Bootstrap.js.Light for Bootstrap v. 4 (https://github.com/jesperhoy/bootstrap.js.light)
* Version 0.3.0
* Copyright 2019 Jesper Høy
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

    var ModalE = null;
    var ModalBD = null;
    var ModalCB = null;

    rv.ModalShow = function (target, cb) {
        if (ModalE !== null) return;
        ModalCB = cb === undefined ? null : cb;
        ModalE = typeof target==='string' ? document.querySelector(target):target;
        ModalE.addEventListener("click", ModalBDClick);
        ModalE.style.display = 'block';
        ModalE.removeAttribute('aria-hidden');
        ModalE.setAttribute('aria-modal', 'true');
        document.body.classList.add('modal-open');
        ModalBD = null;
        if (ModalE.dataset.backdrop !== 'false') {
            ModalBD = document.createElement("div");
            ModalBD.className = 'modal-backdrop' + (ModalE.classList.contains('fade') ? ' fade':'');
            document.body.appendChild(ModalBD);
        }
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                ModalE.classList.add("show");
                if (ModalBD) ModalBD.classList.add('show');
            });
        });
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
        ModalE.removeEventListener("click", ModalBDClick);
        ModalE.setAttribute('aria-hidden', 'true');
        ModalE.removeAttribute('aria-modal');
        var Fade = ModalE.classList.contains('fade');
        if (Fade) window.setTimeout(function () { ModalHideComplete(result); }, 150);
        ModalE.classList.remove("show");
        if (ModalBD) ModalBD.classList.remove('show');
        if (!Fade) ModalHideComplete(result);
    };

    function ModalHideComplete(result) {
        ModalE.style.display = 'none';
        document.body.classList.remove('modal-open');
        if (ModalBD !== null) document.body.removeChild(ModalBD);
        ModalE = null;
        ModalBD = null;
        if (ModalCB !== null) ModalCB(result);
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
        if (ModalE === null) return;
        if (ModalE.dataset.keyboard === 'false') return;
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
            console.log(idx + " -> " + toIdx);
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

