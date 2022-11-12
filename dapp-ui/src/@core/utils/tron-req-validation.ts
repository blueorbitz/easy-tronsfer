import type { NextApiRequest, NextApiResponse } from 'next/types'
import { getToken } from 'next-auth/jwt'
// @ts-ignore
import TronWeb from 'tronweb'
import contractConfig from 'src/configs/contractConfig'

interface TronMiddleware {
  tronWeb: any,
  config: any,
  token: any,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>): Promise<TronMiddleware|null> {
  if (req.method !== 'POST') {
    res.status(405)
    return null
  }

  const token = await getToken({ req, secret: process.env.NEXT_PUBLIC_SECRET })
  if (token == null) {
    res.status(401).send({})
    return null
  }

  let body;
  try {
    body = JSON.parse(req.body)
  } catch (error) {
    res.status(500).send({})
    return null
  }

  const { solidityNode } = body
  if (solidityNode == null) {
    res.status(400).send({})
    return null
  }

  const config = contractConfig.find(o => o.host === solidityNode)
  if (config == null) {
    res.status(401).send({})
    return null
  }

  const tronWeb = new TronWeb({
    fullHost: solidityNode,
    privateKey: process.env.OWNER_PRIVATE_KEY,
  });
  
  return { tronWeb, config, token }
}
