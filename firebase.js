const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')

const serviceAccount = require('./gimmefire-b429e-firebase-adminsdk-1diq0-5e1cf50f00.json')

initializeApp({
    credential: cert(serviceAccount)
})

const db = getFirestore()

module.exports = { db }