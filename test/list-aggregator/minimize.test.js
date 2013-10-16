var minimize = require('../../lib/minimize')
  , _ = require('lodash')
  , eql = require('fleet-street/lib/sequential-object-eql')
  , articleFixtures = require('fleet-street/test/article/fixtures')
  , should = require('should')

describe('minimize()', function () {

  it('should strip all non-required properties', function () {

    eql(minimize(
      _.extend({}, articleFixtures.validFirstSavedModel, { __breadcrumb: [], __fullUrlPath: '' })),
      _.extend(_.pick(articleFixtures.validFirstSavedModel
        , '_id'
        , 'type'
        , 'shortTitle'
        , 'longTitle'
        , 'subTitle'
        , 'crops'
        , '__fullUrlPath'
        , '__liteSection'
        , 'displayDate'
        , 'showDisplayDate'
        , 'tags'
        , 'images'
        , 'downloads'
        , 'commentCount'
        , 'viewCount'
        , 'standfirst'
        ),
          { getImageUrl: function () {}
          }
      ))
  })

  it('should create new object', function () {
    var o = _.extend({}, articleFixtures.validFirstSavedModel)
      , min = minimize(o)

    o.xyz = true
    should.not.exist(min.xyz)

  })

})