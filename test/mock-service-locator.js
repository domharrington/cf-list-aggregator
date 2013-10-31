var saveMongodb = require('save-mongodb')

module.exports = function (db) {
  function createArticleService() {
    return require('fleet-street/bundles/article/service')(sl)
  }

  var sl =
    { sectionService: require('./mock-section-service')(saveMongodb(db.collection('section' + Date.now())))()
    , createArticleService: createArticleService
    , cache: { memoize: function (a, b) { return b } }
    , logger: require('./null-logger')
    , persistence: function (name) {
        return saveMongodb(db.collection(name + Date.now()))
      }
    , properties:
      { images: { article: { contexts: [] } }
      }
    , trashService: { trash: function () {}, setIdProperty: function () {} }
    , tagService: { ensureTagExists: function () {} }
    }

  return sl
}
