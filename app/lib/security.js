const Promise = require('bluebird')
const crypto = require('crypto')
const passportJWT = require('passport-jwt')

const generateHash = (assetPath) => {
  return crypto.createHash('sha1').update(assetPath).digest('hex')
};

async const generateToken = (length) => {
  return Promise.fromCallback(clb => {
    crypto.randomBytes(length, clb)
  }).then(buf => {
    return buf.toString('hex')
  })
};

module.exports = {
  generateHash,
  generateToken
};