import type { NextApiRequest, NextApiResponse } from 'next/types'
import requestValidation from 'src/@core/utils/tron-req-validation'
import { getProviderId, getBalance } from 'src/@core/utils/tron-utils-backend'

export default async function (req: NextApiRequest, res: NextApiResponse<any>) {
  const validation = await requestValidation(req, res)
  if (validation === null)
    return

  const { tronWeb, config, token } = validation
  const body = JSON.parse(req.body)
  const { providerId } = body

  const authProviderId = getProviderId(token.account.provider, token.account.providerAccountId)
  if (authProviderId !== providerId) {
    return res.status(401).send({})
  }

  const handler = await tronWeb.contract().at(config.contractAddress)

  const data = await getBalance(tronWeb, handler, providerId)

  return res.status(200).send(data)
}
