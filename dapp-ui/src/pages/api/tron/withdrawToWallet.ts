import type { NextApiRequest, NextApiResponse } from 'next/types'
import requestValidation from 'src/@core/utils/tron-req-validation'
import { getProviderId, getTokenInfo } from 'src/@core/utils/tron-utils-backend'

export default async function (req: NextApiRequest, res: NextApiResponse<any>) {
  const validation = await requestValidation(req, res)
  if (validation === null)
    return

  const { tronWeb, config, token } = validation
  const body = JSON.parse(req.body)
  const { providerId, amount, wallet, tokenAddress } = body

  const authProviderId = getProviderId(token.account.provider, token.account.providerAccountId)
  if (authProviderId !== providerId) {
    return res.status(401).send({})
  }

  const handler = await tronWeb.contract().at(config.contractAddress)

  let result
  if (body.tokenAddress === null) {
    const _amount = tronWeb.toSun(amount)
    result = await handler.withdrawTrxToWallet(providerId, _amount, wallet)
      .send({
        feeLimit: 100_000_000,
        shouldPollResponse: false,
      }, process.env.OWNER_PRIVATE_KEY)
  }
  else {
    const tokenInfo = await getTokenInfo(tronWeb, tokenAddress)
    const _amount = tokenInfo.amountToContract(amount)
    result = await handler.withdrawTrc20ToWallet(providerId, tokenAddress, _amount, wallet)
      .send({
        feeLimit: 100_000_000,
        shouldPollResponse: false,
      }, process.env.OWNER_PRIVATE_KEY)
  }

  return res.status(200).send(result)
}
