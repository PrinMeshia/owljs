/**
 * Created by Prin'Meshia.
 * github ; https://github.com/PrinMeshia/owljs
 * Version : 0.0.2
 * created : May 2016
 * Updated : May 2016
 *
 */
(function (window) {
    var owl = function (elem) {
        return new Owljs(elem);
    };
    var Owljs = function (elem) {
        this.e = document.querySelectorAll(elem);
        this.elength = this.e.length;
        var version = '0.0.2';
        var github = 'https://github.com/PrinMeshia/owljs';
        this.fadeStart = false;
        /*ANIMATE*/
        this.animation = {
            linear: function (progress) {
                return progress;
            }
        }
        return this;
    };
    Owljs.prototype = {
        val: function (newval) {
            for (var i = 0; i < this.elength; i++) {
                this.e[i].value = newval;
            }
            return this;
        },
        css: function (css, val) {
            for (var i = 0; i < this.elength; i++) {
                this.e[i].style[css] = val;
            }
            return this;
        },

        /*
         * SHOW - HIDE - TOGGLZ
         */
        hide: function () {
            for (var i = 0; i < this.elength; i++) {
                this.e[i].style.display = 'none';
            }
            return this;
        },
        show: function () {
            for (var i = 0; i < this.elength; i++) {
                this.e[i].style.display = 'inherit';
            }
            return this;
        },
        toggle: function () {
            for (var i = 0; i < this.elength; i++) {
                if (this.e[i].style.display !== 'none') {
                    this.e[i].style.display = 'none';
                } else {
                    this.e[i].style.display = 'inherit';
                }
            }
            return this;
        },
        /*
         * CLASS ACTION
         */
        hasClass: function (el, className) {
            if (el.classList)
                return el.classList.contains(className);
            else
                return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        },
        addClass: function (className) {
            for (var i = 0; i < this.elength; i++) {
                if (this.e[i].classList)
                    this.e[i].classList.add(className);
                else if (!this.hasClass(this.e[i], className))
                    this.e[i].className += " " + className;
            }
            return this;
        },
        removeClass: function (className) {
            for (var i = 0; i < this.elength; i++) {
                if (this.e[i].classList)
                    this.e[i].classList.remove(className);
                else if (this.hasClass(this.e[i], className)) {
                    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
                    this.e[i].className = this.e[i].className.replace(reg, ' ');
                }
            }
            return this;
        },
        toggleClass: function (className) {
            for (var i = 0; i < this.elength; i++) {
                if (this.hasClass(this.e[i], className)) {
                    this.e[i].classList.remove(className);
                } else {
                    this.e[i].classList.add(className);
                }
            }
            return this;
        },

        /**
         * ANIMATE
         * params :
         *          - t : duration
         *          - d : dif
         *          - c : complete function
         *          - s : step
         **/
        animate: function (params) {
            var dateS = new Date;
            var animeInt = setInterval(function () {
                var timeInt = new Date - dateS;
                var progress = timeInt / params.t;
                if (progress > 1) {
                    progress = 1;
                }
                params.progress = progress;
                var delta = params.d(progress);
                params.s(delta);
                if (progress == 1) {
                    clearInterval(animeInt);
                    params.c();
                }
            }, params.delay || 10);
            return this;
        },
        fadeIn: function (params) {
            if (!fadeStart) {
                this.fadeStart = true;

                var to = 0;
                var _this = this;
                this.animate({
                    t: params.t,
                    d: function (progress) {
                        progress = this.progress;
                        return _this.animation.linear(progress);
                    },
                    c: function () {
                        for (var i = 0; i < _this.elength; i++) {
                            _this.e[i].style.opacity = '';
                        }
                        _this.fadeStart = false;
                    },
                    s: function (delta) {
                        for (var i = 0; i < _this.elength; i++) {
                            if (_this.e[i].offsetWidth <= 0 || _this.e[i].offsetHeight <= 0) {
                                _this.e[i].style.opacity = to + delta;
                                _this.e[i].style.display = 'inherit';
                            }
                        }
                    }
                });
            }

            return this;
        },
        fadeOut: function (params) {
            if (!fadeStart) {
                this.fadeStart = true;
                var to = 1;
                var _this = this;
                this.animate({
                    t: params.t,
                    d: function (progress) {
                        progress = this.progress;
                        return _this.animation.linear(progress);
                    },
                    c: function () {
                        for (var i = 0; i < _this.elength; i++) {
                            _this.e[i].style.display = 'none';
                            _this.e[i].style.opacity = '';

                        }
                        _this.fadeStart = false;
                    },
                    s: function (delta) {
                        for (var i = 0; i < _this.elength; i++) {
                            if (_this.e[i].offsetWidth > 0 || _this.e[i].offsetHeight > 0)
                                _this.e[i].style.opacity = to - delta;
                        }
                    }
                });
            }
            return this;
        }
    };
    if (!window.owl) {
        window.owl = owl;
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (fn) {
            var timer = 16.66; // 60 fps
            setTimeout(fn, timer);
        }
    }
})(window);


