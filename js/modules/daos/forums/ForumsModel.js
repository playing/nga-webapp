define(function (require, exports, module) {
  var config = require('config/index');
  var parser = require('modules/daos/forums/parser');
  var siteStorage = require('modules/storage/site');
  var BasicModel = require('modules/daos/abstracts/BasicModel');

  /**
   * 论坛版面数据
   * 数据需要两种结构，这里不考虑用collection实现
   */
  var ForumsModel = BasicModel.extend({
    url: config.nakeServer ? '/api/group' : 'http://bbs.ngacn.cc/template/js/nga_index_forums.xml',
    flag: {
      flattenCache: false,
    },
    cache: {
      flatten: []
    },
    parse: function (resp) {
      var data = parser(resp);
      return data;
    },
    initialize: function () {
      this.on('sync', function (model) {
        model.flag.flattenCache = false;
        siteStorage.set('forums', model.toFlatten());
      });
      return this;
    },
    // 输出一级数组格式，用于保存至storage
    toFlatten: function () {
      var origin = this.toJSON();
      var result = [];
      if (this.flag.flattenCache) {
        return this.cache.flatten;
      }
      _.each(origin, function (cat) {
        _.each(cat.groups, function (group) {
          _.each(group.forums, function (forum) {
            result.push({
              fid: forum.fid,
              name: forum.name,
              info: forum.info,
              nameshort: forum.nameshort,
              heightlight: forum.heightlight,
              gid: group.gid,
              group: group.name,
              cid: cat.cid,
              cat: cat.name
            });
          });
        });
      });
      this.cache.flatten = result;
      this.flag.flattenCache = true;
      return result;
    },
  });

  module.exports = ForumsModel;
});