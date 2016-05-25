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
        toggleClass: function () {
            for (var i = 0; i < this.elength; i++) {
                if (this.e[i].style.display !== 'none') {
                    this.e[i].style.display = 'none';
                } else {
                    this.e[i].style.display = 'inherit';
                }
            }
            return this;
        },
        /**
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
        },
        fadeIn: function (params) {
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
                },
                s: function (delta) {
                    for (var i = 0; i < _this.elength; i++) {

                        _this.e[i].style.opacity = to + delta;
                        _this.e[i].style.display = 'inherit';
                    }
                }
            });
        },
        fadeOut: function (params) {
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
                },
                s: function (delta) {
                    for (var i = 0; i < _this.elength; i++) {
                        _this.e[i].style.opacity = to - delta;
                    }
                }
            });
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


