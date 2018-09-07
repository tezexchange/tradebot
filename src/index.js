import { TZClient } from './tzclient.js'
import Api from 'tezexchange-api'
import readline from 'readline'

const readInput = (q) => {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    rl._writeToOutput = function _writeToOutput(stringToWrite) {
      if (stringToWrite.length === 1)
        rl.output.write("*")
      else
        rl.output.write(stringToWrite)
    }
    rl.question(q, (answer) => {
      rl.close()
      resolve(answer)
    })
  })
}

export const getApiClient = async (version) => {
  const tzclient = new TZClient()
  await tzclient.ready
  const encrypted_seed = await readInput('Encrypted Seed(edesk):')
  const password = await readInput('Password:')
  await tzclient.importKey({encrypted_seed, password})
  return new Api(tzclient, null, version)
}
