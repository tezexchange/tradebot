import { TZClient } from './tzclient.js'
import Api from 'tezexchange-api'

export const getApiClient = async (sk, version) => {
  const tzclient = new TZClient()
  await tzclient.ready
  tzclient.importKey({secret_key: sk})
  return new Api(tzclient, null, version)
}

(async () => {
  const ac = await getApiClient('edskRwCM7hMRBCFuqqAwkrvyrMiRNvA5NVjN8Neg9UfT5xUpcSRJQDb8y2HgBvwAzM6Ah9d4ykZ1HgN8N426ZYrntLES5gZv79', 'testnet#3')
  try {
    // await ac.getStorage('main')
    // console.log(JSON.stringify(await ac.getOrders()))
    console.log(JSON.stringify(await ac.getRewardInfo(ac.client.key_pair.public_key_hash)))
  } catch (err) {
    console.log(err)
  }
})()
