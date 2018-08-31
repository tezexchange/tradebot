import { TZClient } from './tzclient.js'
import transactions from './transactions.js'
import { getContract } from './contracts.js'
import { test, hash } from './test.rs'
// import { up, show } from './test.rs'

// const tzclient = new TZClient({
//   secret_key: 'edskRwCM7hMRBCFuqqAwkrvyrMiRNvA5NVjN8Neg9UfT5xUpcSRJQDb8y2HgBvwAzM6Ah9d4ykZ1HgN8N426ZYrntLES5gZv79'
// })

// console.log(test(2))
console.log(hash())
console.log(test(3))