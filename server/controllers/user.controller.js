const create = require('./user/create')
const list = require('./user/list')
const remove = require('./user/remove')
const update = require('./user/update')
const userByID = require('./user/userByID')


module.exports = { list, create, userByID, remove, update }

