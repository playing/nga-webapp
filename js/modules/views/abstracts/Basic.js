define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var BasicView = Backbone.View.extend({
    constructor: function (options) {
      var self = this;
      Backbone.View.prototype.constructor.call(this, options);
      // 控制转场流程中视图元件、事件的启用与禁用
      var elems = (function () {
        var hasCached = false;
        var enabled;
        var disable = function () {
          if (hasCached) {
            return true;
          }
          enabled = self.$el.find(':enabled');
          enabled.attr('disabled', 'disabled');
          hasCached = true;
        };
        var enable = function () {
          if (!hasCached) {
            return true;
          }
          enabled.attr('disabled', null);
          hasCached = false;
        };
        return {
          disable: disable,
          enable: enable
        };
      })();
      this.on('stage-in-start', function () {
        this.delegateEvents();
        elems.disable();
      });
      this.on('stage-in-end', function () {
        elems.enable();
      });
      this.on('stage-out-start', function () {
        this.undelegateEvents();
        elems.disable();
      });
      this.on('aside-aside-in-start', function () {
        elems.disable();
      });
      this.on('aside-aside-in-end', function () {
        elems.enable();
      });
      this.on('aside-aside-out-start', function () {
        elems.disable();
      });
      this.on('aside-section-in-start', function () {
        elems.disable();
      });
      this.on('aside-section-out-start', function () {
        elems.disable();
      });
      this.on('aside-section-out-end', function () {
        elems.enable();
      });
    },
    templateFile: '',
    template: function () {
      return art.compile(this.templateFile);
    },
    render: function () {
      $el.html(this.template()(this.model));
      return this;
    }
  });
  module.exports = BasicView;
});

