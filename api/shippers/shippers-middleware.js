const db = require('../../data/db-config')

async function checkId(req, res, next) {
  try {
    const shipper = await db('shippers').where('shipperid', req.params.id).first();
    if (!shipper) {
      next({ status: 404, message: 'that id does not exist' });
    } else {
      next();
    }
  } catch (error) {
    next(error); 
  }
}


function checkPayload(req, res, next) {
  if (!req.body.phone || !req.body.ShipperName){
next( { status: 422, message: 'Phone ane ShipperName are required'})
  } else {
    next()
  }
  
}

module.exports = {
  checkId,
  checkPayload,
}
