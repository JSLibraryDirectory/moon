var Monx = require("monx");
var api = require("../util/api.js");

module.exports.store = {};

module.exports.init = function(Moon) {
  Moon.use(Monx);
  module.exports.store = new Monx({
    state: {
      lists: {
        top: []
      },
      now: Date.now() / 1000
    },
    actions: {
      "UPDATE_LISTS": function(state, info) {
        var instance = info.instance;
        var type = info.type;
        var page = info.page;
        var offset = info.offset;

        if(type === "jobs") {
          type = "job";
        }

        api.getList(type, page, offset).then(function(list) {
          state.lists[type] = list;
          instance.set("list", list);
        });
      }
    }
  });
}
