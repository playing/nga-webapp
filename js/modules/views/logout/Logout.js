define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var ui = require('utils/ui/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var tpl = require('templates/logout/logout.tpl');
  var tplContent = require('templates/logout/content.tpl');
  var Navigate = require('utils/Navigate');
  var appCache = require('modules/AppCache').appCache;

  var logoutUrl = 'http://account.178.com/q_account.php?_act=logout';

  var LogoutView = BasicView.extend({
    el: '#logout',
    tpl: art.compile(tpl),
    tplContent: art.compile(tplContent),
    flag: {
      requesting: false, // 正在请求
    },
    events: {
      'singleTap .action-logout': 'doLogout'
    },
    doLogout: function () {
      var self, username ,password;
      if (this.flag.requesting) {
        return false;
      }
      self = this;
      self.flag.requesting = true;
      console.log('connect start');
      ui.Loading.open();
      $.get(logoutUrl, function () {
        alert('登出成功');
        ui.Loading.close();
        appCache.get('loginView').nextAction.success = function () {appCache.get('bootupView').introFunc();};
        Navigate.redirect('#!/login');
        self.flag.requesting = false;
      });
      return false;
    },
    render: function () {
      this.$el.html(this.tpl());
      this.$content = this.$el.find('.content');
      this._refresh();
      return this;
    },
    _refresh: function () {
      var self = this;
      ui.Loading.open();
      this.$content.html(this.tplContent({}));
      this.$content.removeClass('hide').addClass('show');
      _.delay(function () {
        ui.Loading.close();
      }, 200);

    },
    initialize: function () {
      this.$content = this.$el.find('.content');
      return this.render();
    }
  });
  module.exports = LogoutView;
});
