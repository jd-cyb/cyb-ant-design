import { basicTable } from './mock/basic-table'
import { searchTable } from './mock/search-table'
import { Login } from './mock/login'

module.exports = {
  'GET /api/basic-table': basicTable,
  'POST /api/login': Login,
  'GET /api/search-table': searchTable
}
