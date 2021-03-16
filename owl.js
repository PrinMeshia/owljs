"use strict";
const _ = (() => {
  class Owl {
    constructor(selector) {
      if (selector) {
        if (selector === "document") {
          this.elems = [document];
        } else if (selector === "window") {
          this.elems = [window];
        } else {
          this.elems = document.querySelectorAll(selector);
        }
      }
    }
    /**
     *
     * @param {*} callback
     * @returns
     */
    ready(callback) {
      if (!callback || typeof callback !== "function") return;
      this.each((item) => {
        item.addEventListener("DOMContentLoaded", callback);
        if (
          item.readyState === "interactive" ||
          item.readyState === "complete"
        ) {
          callback();
        }
      });
    }
    createElement(arg) {
      this.elem = [document.createElement(arg)];
      return this;
    }
    each(callback) {
      if (!callback || typeof callback !== "function") return;
      for (let i = 0; i < this.elems.length; i++) {
        callback(this.elems[i], i);
      }
      return this;
    }
    val(newval) {
      this.each((item) => {
        item.value = newval;
      });
      return this;
    }
    css(attr, value) {
      this.each((item) => {
        item.style[attr] = value;
      });
      return this;
    }
    html(htmlContent = null) {
      let data = [];
      this.each((item) => {
        if (htmlContent === null) {
          data.push(item.innerHtml);
        } else {
          item.innerHtml = htmlContent;
        }
      });
      if (data.length === 0) return this;
      else return data;
    }
    //Todo : add find function
    // find(attr){
    //   this.elems = container.querySelectorAll(attr);
    //   return this
    // }
    on(event, callback) {
      if (!callback || typeof callback !== "function") return;
      this.each((item) => {
        item.addEventListener(event, callback);
      });
      return this;
    }
    click(callback) {
      if (!callback || typeof callback !== "function") return;
      this.each((item) => {
        item.addEventListener("click", callback);
      });
      return this;
    }
    addClass(className) {
      this.each((item) => {
        item.classList.add(className);
      });
      return this;
    }
    removeClass(className) {
      this.each((item) => {
        item.classList.remove(className);
      });
      return this;
    }
    toggleClass(className) {
      this.each((item) => {
        item.classList.toggle(className);
      });
      return this;
    }
    hasClass(className) {
      this.each((item) => {
        item.classList.toggle(className);
      });
      return this;
    }

    _parseResult(dataType, data) {
      switch (dataType) {
        case "json":
          return data.json();
        default:
          return data.text();
      }
    }
    ajax(...args) {
      let { method, url, data, dataType, ContentType } = args[0];
      let options = {
        method: method ?? "GET",
      };
      data ? (options.data = data) : null;
      dataType ? (options.dataType = dataType) : null;
      ContentType ? (options.ContentType = ContentType) : null;
      return new Promise((resolve, reject) => {
        fetch(url, options)
          .then((response) => {
            resolve(this._parseResult(dataType, response));
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
    getJSON(url) {
      return this.ajax({
        method: "GEt",
        url: url,
        dataType: "json",
        ContentType: "application/json",
      });
    }
    hide() {
      this.each((item) => {
        item.style.display = "none";
      });
      return this;
    }
    show(display) {
      this.each((item) => {
        item.style.display = display || "block";
      });
      return this;
    }
    fadeOut() {
      this.each((item) => {
        item.style.opacity = 1;
        (function fade() {
          if ((item.style.opacity -= 0.1) < 0) {
            item.style.display = "none";
          } else {
            requestAnimationFrame(fade);
          }
        })();
      });
      return this;
    }
    fadeIn(display) {
      this.each((item) => {
        item.style.opacity = 0;
        item.style.display = display || "block";
        (function fade() {
          var val = parseFloat(item.style.opacity);
          if (!((val += 0.1) > 1)) {
            item.style.opacity = val;
            requestAnimationFrame(fade);
          }
        })();
      });
      return this;
    }
  }
  /**
   * Instantiate a new constructor
   */
  let instantiate = (selector) => new Owl(selector);
  /**
   * Return the constructor instantiation
   */
  return instantiate;
})();
