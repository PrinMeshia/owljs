/**
 * Created by Prin'Meshia.
 * github ; https://github.com/PrinMeshia/owljs
 * Version : 0.0.1
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
        this.version = '0.0.1';
        this.github = 'https://github.com/PrinMeshia/owljs'
        return this;
    };
    Owljs.prototype = {
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
        css: function (css, val) {
            for (var i = 0; i < this.elength; i++) {
                this.e[i].style[css] = val;
            }
            return this;
        },
        val: function (newval) {
            for (var i = 0; i < this.elength; i++) {
                this.e[i].value = newval;
            }
            return this;
        }
    };
    if (!window.owl) {
        window.owl = owl;
    }
})(window);


