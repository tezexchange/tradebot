import { TZClient } from './tzclient.js'
import Api from 'tezexchange-api'
import readline from 'readline'
import Stream from 'stream'

const readInput = (q, need_hide) => {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    console.log(q)
    rl.question('', (answer) => {
      rl.close()
      resolve(answer)
    })

    if (need_hide)
      rl._writeToOutput = function _writeToOutput(stringToWrite) {
        rl.output.write('')
      }
  })
}

export const getApiClient = async (version) => {
  const tzclient = new TZClient()
  await tzclient.ready
  const choice = await readInput('Using unencrypted key(1) or encrypted seed(2):')
  if (choice == 1) {
    const secret_key = await readInput('Unencrypted key(edsk):', true)
    await tzclient.importKey({secret_key})
  } else if (choice == 2) {
    const encrypted_seed = await readInput('Encrypted Seed(edesk):', true)
    const password = await readInput('Password:', true)
    await tzclient.importKey({encrypted_seed, password})
  }
  console.log('=== KEY IMPORTED ===')
  return new Api(tzclient, null, version)
}
