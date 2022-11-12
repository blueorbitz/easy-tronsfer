import type { NextApiRequest, NextApiResponse } from 'next/types'
import requestValidation from 'src/@core/utils/tron-req-validation'
import { getProviderId, getTokenInfo } from 'src/@core/utils/tron-utils-backend'

export default async function (req: NextApiRequest, res: NextApiResponse<any>) {
  const validation = await requestValidation(req, res)
  if (validation === null)
    return

  const { tronWeb, config, token } = validation
  const body = JSON.parse(req.body)
  const { fromProviderId, toProviderId, amount, tokenAddress } = body

  const authProviderId = getProviderId(token.account.provider, token.account.providerAccountId)
  if (authProviderId !== fromProviderId) {
    return res.status(401).send({})
  }

  const handler = await tronWeb.contract().at(config.contractAddress)

  let result
  if (tokenAddress === null || tokenAddress === '') {
    const _amount = tronWeb.toSun(amount)
    result = await handler.transferTrxToProvider(fromProviderId, toProviderId, _amount)
      .send({
        feeLimit: 100_000_000,
        shouldPollResponse: false,
      }, process.env.OWNER_PRIVATE_KEY)
  }
  else {
    const tokenInfo = await getTokenInfo(tronWeb, tokenAddress)
    const _amount = tokenInfo.amountToContract(amount)
    result = await handler.transferTrc20ToProvider(fromProviderId, toProviderId, tokenAddress, _amount)
      .send({
        feeLimit: 100_000_000,
        shouldPollResponse: false,
      }, process.env.OWNER_PRIVATE_KEY)
  }

  return res.status(200).send(result)
}
