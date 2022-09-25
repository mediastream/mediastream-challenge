const document2CSV = (doc) => [doc._id, doc.name, doc.email].map(field => {
  return `"${String(field || '').replace(/"/g, '""')}"`
})
module.exports = document2CSV
