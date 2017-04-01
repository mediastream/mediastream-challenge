module.exports = {
  makeHeaders: makeHeaders,
  parseRow: parseRow
}


/**
 * @method makeHeaders
 * @param {Array} headers 
 * return {String} 
 */
function makeHeaders(headers = ['name', 'email']) {
  return headers.map(_csvEscape).join(',').concat('\n');
}

/**
 * @method parseRow
 * @param {Array} obj 
 * return {String}
 */
function parseRow(obj = []) {
  return obj.map(_csvEscape).join(',').concat('\n');
}

/**
 * @method _csvEscape
 * @param {String} field 
 * return {String}
 */
function _csvEscape(field) {
  return `"${String(field || "").replace(/\"/g, '""')}"`;
}