/*!
* Bootstrap.js.Light for Bootstrap v. 3 (https://github.com/jesperhoy/bootstrap.js.light)
* Version 0.5.2
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
    }

    var Modals = [];

    rv.ModalShow = function (target, cbClosed, cbShown) {
        var m = {
            cbClosed: cbClosed,
            elem: typeof target === 'string' ? document.querySelector(target) : target,
            backdrop: null,
            bottom: Modals.length === 0
        };
        Modals.push(m);
        m.elem.addEventListener("click", ModalBDClick);
        m.elem.style.display = 'block';
        m.elem.style.zIndex = 1030 + 20 * Modals.length;
        if (m.bottom) {
          m.bodypr = document.body.style.paddingRight;
          var sbw = window.innerWidth - document.body.clientWidth;
          if (sbw > 0) {
            var opr = parseInt(m.bodypr);
            opr = isNaN(opr) ? 0 : opr;
            document.body.style.paddingRight = (sbw + opr) + 'px';
          }
          document.body.classList.add('modal-open');
        }
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
                m.elem.classList.add("in");
                if (m.backdrop) m.backdrop.classList.add('in');
                var af = m.elem.querySelector('[autofocus]');
                if (!af) af = m.elem;
                af.focus();
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
        var m = Modals.pop();
        m.elem.removeEventListener("click", ModalBDClick);
        var Fade = m.elem.classList.contains('fade');
        if (Fade) window.setTimeout(function () { ModalHideComplete(m, trigger, cb); }, 150);
        m.elem.classList.remove("in");
        if (m.backdrop) m.backdrop.classList.remove('in');
        if (!Fade) ModalHideComplete(m,trigger,cb);
    };

    function ModalHideComplete(m,trigger,cb) {
        if (!document.body.contains(m.elem)) console.warn('Modal not in DOM at HideComplete');
        m.elem.style.display = 'none';
        if (m.bottom) {
          document.body.style.paddingRight = m.bodypr;
          document.body.classList.remove('modal-open');
        }
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
        while (NavTabs && !NavTabs.classList.contains('nav-tabs') && !NavTabs.classList.contains('nav-pills')) {
            NavTabs = NavTabs.parentElement;
        }
        if (!NavTabs) return;
        // remove .active from all child <li> 
        var lst = NavTabs.querySelectorAll('li.active');
        lst.forEach(function (li) { li.classList.remove('active'); });
        // add .active to all <li> ancestors of btn
        var e = btn;
        while (e!==NavTabs) {
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
            if (attr === "prev" || attr==="next") {
                el = document.querySelector(e.dataset.target || e.getAttribute('href'));
                if (el) {
                    Carousels.forEach(function (c) {
                        if (c.el === el) c.Slide(attr==="next"?1:-1);
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
        var wrap = x ? x === 'true' : true;
        var paused = false;
        x = el.getAttribute('data-pause');
        if (!x || x === 'hover') {
            el.addEventListener('mouseenter', function () { paused = true; });
            el.addEventListener('mouseleave', function () { paused = false; });
        }
        var items = el.querySelectorAll(".carousel-inner .item");
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
                items[i].className = 'item' + (i === idx ? ' active' : '') + (i === toIdx ? (left ? " next" : " prev") : '');
                if (indicators.length >= i - 1) indicators[i].className = (i === toIdx ? 'active' : '');
            }
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    if (CurTurn !== ThisTurn) return;
                    for (var i = 0; i < items.length; i++) {
                        items[i].className = 'item' + (i === idx ? ' active' : '') + (i === toIdx ? (left ? " next" : " prev") : '') + (left ? " left" : " right");
                    }
                    idx = toIdx;
                    window.setTimeout(function () {
                        if (CurTurn !== ThisTurn) return;
                        for (var i = 0; i < items.length; i++) {
                            items[i].className = 'item' + (i === idx ? ' active' : '');
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

