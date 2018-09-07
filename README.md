# tradebot
trade bot lib for tez.exchange

## How to install
```
npm install --save tezexchange-tradebot
```

## How to use
```
const tradebot = require('tezexchange-tradebot')

tradebot.getApiClient()
.then(ac => {
  return ac.getTokenInfo(ac.tokens.TES, ac.client.key_pair.public_key_hash)
})
.then(x => console.log(x))
```