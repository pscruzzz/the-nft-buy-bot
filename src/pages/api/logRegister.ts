import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, Db } from 'mongodb'
import url from 'url'
import { verify } from 'jsonwebtoken'
import authConfig from '../../config/auth'
import { IncomingHttpHeaders } from 'http'

interface IRequestHeaders extends IncomingHttpHeaders {
  authtoken?: string
}

let cachedDb: Db = null

async function connectToDatabase(uri: string) {
  if (cachedDb) {
    return cachedDb
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  // eslint-disable-next-line node/no-deprecated-api
  const dbName = url.parse(uri).pathname.substr(1)

  const db = client.db(dbName)

  cachedDb = db

  return db
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const requestHeaders: IRequestHeaders = request.headers

  try {
    verify(requestHeaders.authtoken, authConfig.jwt.secret)

    const { timestamp, artName, log, data } = request.body

    const db = await connectToDatabase(process.env.MONGODB_URI)

    const collection = db.collection('BotLogs')

    await collection.insertOne({
      timestamp,
      log,
      data,
      artName
    })

    collection
      .find(
        { artName },
        { projection: { timestamp: 1, log: 1, data: 1, artName: 1 } }
      )
      .toArray(function (err, result) {
        if (err) {
          return response.status(404).json({ ok: false })
        }

        return response.status(201).send(result)
      })
  } catch {
    return response.status(401).json({ ok: false })
  }
}
