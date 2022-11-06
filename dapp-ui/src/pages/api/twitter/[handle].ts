import type { NextApiRequest, NextApiResponse } from 'next/types'
import Twitter from 'twitter-lite'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== 'GET')
    return res.status(405)

  const { handle } = req.query
  const client = new Twitter({
    version: '2',
    extension: false,
    consumer_key: process.env.TWITTER_CONSUMER_KEY ?? '',
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET ?? '',
    bearer_token: process.env.TWITTER_BEARER_TOKEN,
  })

  try {
    const clientResp = await client.get('users/by/username/' + handle)
    return res.send(clientResp.data)
  } catch (error) {
    return res.status(400).send(error)
  }
}
