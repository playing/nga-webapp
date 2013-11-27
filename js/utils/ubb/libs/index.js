define(function (require, exports) {
  var Ubb = require('./Ubb').Ubb;
  var font = require('./tags/font');
  var layout = require('./tags/layout');
  var list = require('./tags/list');
  var img = require('./tags/img');
  var url = require('./tags/url');
  var fontExtra = require('./tags/extras/font');
  var brExtra = require('./tags/extras/br');
  var smileExtra = require('./tags/extras/smile');
  var encodeExtra = require('./tags/extras/encode');
  var ubb = new Ubb();
  ubb.add(font.b);
  ubb.add(font.u);
  ubb.add(font.i);
  ubb.add(font.del);
  ubb.add(font.h);
  ubb.add(font.font);
  ubb.add(font.color);
  ubb.add(font.size);
  ubb.add(font.align);
  ubb.add(layout.l);
  ubb.add(layout.r);
  ubb.add(layout.quote);
  ubb.add(layout.code);
  ubb.add(layout.tid);
  ubb.add(layout.pid);
  ubb.add(list.list);
  ubb.add(img.img);
  ubb.add(img.relativeImg);
  ubb.add(url.url);
  ubb.addExtra(fontExtra.h);
  ubb.addExtra(brExtra.br);
  ubb.addExtra(smileExtra.smile);
  ubb.addExtra(encodeExtra.amp);
  return ubb;
});