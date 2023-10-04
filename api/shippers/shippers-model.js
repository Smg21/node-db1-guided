const db = require('../../data/db-config')

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}

async function get() {
const result = await db('shippers')
.select('phone', 'shippername')
  return result;
}

async function getById(shipperId) {
  // const result = await db.raw('select * from shippers where shipperid = 1')
  //Second Better Way 
  // const [shipper] = await db('shippers').where('shipperid', shipperId)
  // return shipper;
  //Third Better Way
  const result = await db('shippers').where('shipperid', shipperId).first()
  return result;
}

async function create(shipper) {
//  const result = await db('shippers').insert(shipper)
//  return result;
const [shipperId] = await db('shippers').insert(shipper) 
const result = await getById(shipperId)
return result;
}

async function update(shipperId, changes) {
 await db('shippers').update(changes).where('shipperid', shipperId)
 const result = await getById(shipperId)
 return result;
}

async function remove(shipperId) {
//  const thing = await db('shippers').del().where('shipperid', shipperId)
//  return thing;
const toBeDeleted = await getById(shipperId)
await db('shippers').del().where('shipperid', shipperId)
return toBeDeleted

}


//http commands not working, not sure why. Tries httpie installing still does not work, but said server was succesful
//http get/post/put :9000/api/shippers Smg21@SabrinaPC MINGW64 ~/OneDrive/Desktop/node-db1-guided (main)
// $ http get :9000/api/shippers
// bash: http: command not found

// Smg21@SabrinaPC MINGW64 ~/OneDrive/Desktop/node-db1-guided (main)
// $  curl -i -H "Content-Type: application/json" -X DELETE  -d '{"username": "foo", "password
// " :"1234"}' http://localhost:9000/api/shippers/7
