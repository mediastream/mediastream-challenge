'use strict'

const _ = require('lodash')

function getHats (data) {
  let arrTemp = []
  const hatsTemp = filterEmptyHats(data)
  _.map(hatsTemp, (obj) => {
    arrTemp = [...arrTemp, ...obj.hats]
  })

  return arrTemp
}

function filterEmptyHats (data) {
  return _.filter(data, (item) => item.hats.length !== 0)
}

function orderArray (arr, prop, orderType) {
  return _.orderBy(_.countBy(arr, prop), null, [orderType])
}

function topNSum (arr, top) {
  return _.sum(arr.slice(0, top))
}

module.exports = { getHats, orderArray, topNSum }
