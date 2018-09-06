// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"tzclient.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TZClient = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _bs58check = require('bs58check');

var _bs58check2 = _interopRequireDefault(_bs58check);

var _libsodiumWrappers = require('libsodium-wrappers');

var _libsodiumWrappers2 = _interopRequireDefault(_libsodiumWrappers);

var _bip = require('bip39');

var _bip2 = _interopRequireDefault(_bip);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _url = require('url');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const combineUint8Array = (x, y) => {
  return new Buffer((0, _from2.default)(x).concat((0, _from2.default)(y)));
};

const RPCall = (url, input, method) => {
  return new _promise2.default((resolve, reject) => {
    const url_info = new _url.URL(url);

    let data = '';
    const req = _https2.default.request({
      method: method,
      origin: url_info.origin,
      host: url_info.host,
      path: url_info.pathname
    }, res => {
      res.on('data', d => {
        data += d + '';
      });
      res.on('end', () => {
        if (data) {
          resolve(JSON.parse(data.trim()));
        } else reject();
      });
    });
    req.on('error', reject);
    if (method === 'POST') {
      req.setHeader('Content-Type', 'application/json');
      req.write((0, _stringify2.default)(input));
    }
    req.end();
  });
};

const decodeBytes = bytes => {
  const op_map = {
    '00': 'parameter',
    '01': 'storage',
    '02': 'code',
    '03': 'False',
    '04': 'Elt',
    '05': 'Left',
    '06': 'None',
    '07': 'Pair',
    '08': 'Right',
    '09': 'Some',
    '0A': 'True',
    '0B': 'Unit',
    '0C': 'PACK',
    '0D': 'UNPACK',
    '0E': 'BLAKE2B',
    '0F': 'SHA256',
    '10': 'SHA512',
    '11': 'ABS',
    '12': 'ADD',
    '13': 'AMOUNT',
    '14': 'AND',
    '15': 'BALANCE',
    '16': 'CAR',
    '17': 'CDR',
    '18': 'CHECK_SIGNATURE',
    '19': 'COMPARE',
    '1A': 'CONCAT',
    '1B': 'CONS',
    '1C': 'CREATE_ACCOUNT',
    '1D': 'CREATE_CONTRACT',
    '1E': 'IMPLICIT_ACCOUNT',
    '1F': 'DIP',
    '20': 'DROP',
    '21': 'DUP',
    '22': 'EDIV',
    '23': 'EMPTY_MAP',
    '24': 'EMPTY_SET',
    '25': 'EQ',
    '26': 'EXEC',
    '27': 'FAILWITH',
    '28': 'GE',
    '29': 'GET',
    '2A': 'GT',
    '2B': 'HASH_KEY',
    '2C': 'IF',
    '2D': 'IF_CONS',
    '2E': 'IF_LEFT',
    '2F': 'IF_NONE',
    '30': 'INT',
    '31': 'LAMBDA',
    '32': 'LE',
    '33': 'LEFT',
    '34': 'LOOP',
    '35': 'LSL',
    '36': 'LSR',
    '37': 'LT',
    '38': 'MAP',
    '39': 'MEM',
    '3A': 'MUL',
    '3B': 'NEG',
    '3C': 'NEQ',
    '3D': 'NIL',
    '3E': 'NONE',
    '3F': 'NOT',
    '40': 'NOW',
    '41': 'OR',
    '42': 'PAIR',
    '43': 'PUSH',
    '44': 'RIGHT',
    '45': 'SIZE',
    '46': 'SOME',
    '47': 'SOURCE',
    '48': 'SENDER',
    '49': 'SELF',
    '4A': 'STEPS_TO_QUOTA',
    '4B': 'SUB',
    '4C': 'SWAP',
    '4D': 'TRANSFER_TOKENS',
    '4E': 'SET_DELEGATE',
    '4F': 'UNIT',
    '50': 'UPDATE',
    '51': 'XOR',
    '52': 'ITER',
    '53': 'LOOP_LEFT',
    '54': 'ADDRESS',
    '55': 'CONTRACT',
    '56': 'ISNAT',
    '57': 'CAST',
    '58': 'RENAME',
    '59': 'bool',
    '5A': 'contract',
    '5B': 'int',
    '5C': 'key',
    '5D': 'key_hash',
    '5E': 'lambda',
    '5F': 'list',
    '60': 'map',
    '61': 'big_map',
    '62': 'nat',
    '63': 'option',
    '64': 'or',
    '65': 'pair',
    '66': 'set',
    '67': 'signature',
    '68': 'string',
    '69': 'bytes',
    '6A': 'mutez',
    '6B': 'timestamp',
    '6C': 'unit',
    '6D': 'operation',
    '6E': 'address',
    '6F': 'SLICE'
  };

  const prim_map = {
    '00': 'int',
    '01': 'string',
    '02': 'seq',
    '03': ['prim', 0],
    '04': ['prim', 0, true], // 0 means the length of args, true means with annotation
    '05': ['prim', 1],
    '06': ['prim', 1, true],
    '07': ['prim', 2],
    '08': ['prim', 2, true],
    '09': ['prim', 3, true],
    '0A': 'bytes'
  };

  bytes = bytes.toUpperCase();

  let index = 0;

  const read = len => bytes.slice(index, index + len);

  const walk = () => {
    const b = read(2);

    if (prim_map[b] instanceof Array) {

      index += 2;
      const op = op_map[read(2)];
      index += 2;

      const args = Array.apply(null, new Array(prim_map[b][1]));
      return { prim: op, args: args.map(x => walk()) };
    } else {
      if (b === '0A') {

        index += 2;
        const len = read(8);
        index += 8;
        const int_len = parseInt(len, 16) * 2;
        const data = read(int_len);
        index += int_len;
        return { bytes: data };
      } else if (b === '01') {
        index += 2;
        const len = read(8);
        index += 8;
        const int_len = parseInt(len, 16) * 2;
        const data = read(int_len);
        index += int_len;

        const string_raw = new Uint8Array(data.match(/[\dA-F]{2}/g).map(x => parseInt(x, 16)));

        return { string: new TextDecoder('utf-8').decode(string_raw) };
      } else if (b === '00') {
        index += 2;

        const first_bytes = parseInt(read(2), 16).toString(2).padStart(8, '0');
        index += 2;
        const is_positive = first_bytes[1] === '0';

        const valid_bytes = [first_bytes.slice(2)];

        let checknext = first_bytes[0] === '1';
        while (checknext) {
          const bytes = parseInt(read(2), 16).toString(2).padStart(8, '0');
          index += 2;

          valid_bytes.push(bytes.slice(1));
          checknext = bytes[0] === '1';
        }

        return { int: parseInt(valid_bytes.reverse().join(''), 2).toString() };
      } else if (b === '02') {
        index += 2;

        const len = read(8);
        index += 8;
        const int_len = parseInt(len, 16) * 2;
        const data = read(int_len);
        const limit = index + int_len;

        const seq_lst = [];
        while (limit > index) {
          seq_lst.push(walk());
        }
        return seq_lst;
      }
    }
  };

  return walk();
};

const prefix = {
  contract: new Uint8Array([2, 90, 121]),
  identity: new Uint8Array([6, 161, 159]),
  public_key: new Uint8Array([13, 15, 37, 217]),
  secret_key: new Uint8Array([43, 246, 78, 7]),
  edesk: new Uint8Array([7, 90, 60, 179, 41]),
  signature: new Uint8Array([9, 245, 205, 134, 18]),
  operation: new Uint8Array([5, 116])
};
const mark = {
  operation: new Uint8Array([3])
};

class TZClient {
  constructor(params = {}) {
    this.ready = _libsodiumWrappers2.default.ready;
    this.fail_check = _promise2.default.resolve();
    this.host = params.host || 'https://testnet.tezbridge.com';
    this.chain_id = 'main';
    this.importKey(params);
  }

  static enc58(prefix, input) {
    return _bs58check2.default.encode(combineUint8Array(prefix, input));
  }

  static dec58(prefix, input) {
    return _bs58check2.default.decode(input).slice(prefix.length);
  }

  static r2tz(input) {
    return '' + Math.round(input * 1000000);
  }
  static tz2r(input) {
    return input / 1000000 + '';
  }

  static getKeysFromSeed(seed) {
    const seed_raw = seed instanceof Uint8Array ? seed : TZClient.dec58(prefix.secret_key, seed);
    const key_pair = _libsodiumWrappers2.default.crypto_sign_seed_keypair(seed_raw);
    return {
      public_key: TZClient.enc58(prefix.public_key, key_pair.publicKey),
      secret_key: TZClient.enc58(prefix.secret_key, key_pair.privateKey),
      public_key_hash: TZClient.enc58(prefix.identity, _libsodiumWrappers2.default.crypto_generichash(20, key_pair.publicKey))
    };
  }

  static genMnemonic() {
    return _bip2.default.generateMnemonic();
  }

  static getSeedFromMnemonic(mnemonic, password) {
    return TZClient.enc58(prefix.secret_key, _bip2.default.mnemonicToSeed(mnemonic, password).slice(0, 32));
  }

  importKey(params) {
    this.key_pair = {};

    if (params.encrypted_seed && window.crypto.subtle) {
      const encrypted_seed_bytes = TZClient.dec58(prefix.edesk, params.encrypted_seed);
      const salt = encrypted_seed_bytes.slice(0, 8);
      const encrypted_seed_msg = encrypted_seed_bytes.slice(8);

      this.fail_check = window.crypto.subtle.importKey('raw', new TextEncoder('utf-8').encode(params.password), {
        name: 'PBKDF2'
      }, false, ['deriveBits']).then(key => {
        return window.crypto.subtle.deriveBits({
          name: 'PBKDF2',
          salt: salt,
          iterations: 32768,
          hash: { name: 'SHA-512' }
        }, key, 256);
      }).then(key => {
        const seed = TZClient.libs.sodium.crypto_secretbox_open_easy(encrypted_seed_msg, new Uint8Array(24), new Uint8Array(key));
        this.key_pair = TZClient.getKeysFromSeed(seed);
      });
    }

    if (params.seed) {
      this.key_pair = TZClient.getKeysFromSeed(params.seed);
    }

    if (params.mnemonic && params.password) {
      this.key_pair = TZClient.getKeysFromSeed(TZClient.getSeedFromMnemonic(params.mnemonic, params.password));
    }

    if (params.secret_key) {
      const raw_public_key = TZClient.dec58(prefix.secret_key, params.secret_key).slice(32);
      this.key_pair = {
        secret_key: params.secret_key,
        public_key: TZClient.enc58(prefix.public_key, raw_public_key),
        public_key_hash: TZClient.enc58(prefix.identity, _libsodiumWrappers2.default.crypto_generichash(20, raw_public_key))
      };
    }
  }

  call(path, data = {}) {
    return RPCall(this.host + path, data, 'GET');
  }
  post(path, data = {}) {
    return RPCall(this.host + path, data, 'POST');
  }

  header() {
    return this.call(`/chains/${this.chain_id}/blocks/head/header`);
  }

  head_custom(path) {
    return this.call(`/chains/${this.chain_id}/blocks/head${path}`);
  }

  protocol() {
    return this.header().then(x => x.protocol);
  }

  predecessor() {
    return this.header().then(x => x.predecessor);
  }

  head_hash() {
    return this.call(`/chains/${this.chain_id}/blocks/head/hash`);
  }

  head() {
    return this.call(`/chains/${this.chain_id}/blocks/head`);
  }

  get_hash_key(prefix, data) {
    const hash = TZClient.dec58(prefix, data);
    const hash_str = _libsodiumWrappers2.default.to_hex(hash);
    const hash_key = [[0, 2], [2, 4], [4, 6], [6, 8], [8, 10], [10, undefined]].map(x => hash_str.slice(x[0], x[1])).join('/');

    return hash_key;
  }

  big_map_with_key(key, contract) {
    const hash_url = this.get_hash_key(prefix.contract, contract);

    return this.call(`/chains/${this.chain_id}/blocks/head/context/raw/bytes/contracts/index/originated/${hash_url}/big_map/${key}`).then(x => this.decode_bytes(x.data));
  }

  raw_storage(contract) {
    const hash_url = this.get_hash_key(prefix.contract, contract);

    return this.call(`/chains/${this.chain_id}/blocks/head/context/raw/bytes/contracts/index/originated/${hash_url}/data/storage`).then(storage => {
      const storage_len = parseInt(storage.slice(0, 8), 16);
      const storage_data = storage.slice(8, 8 + storage_len * 2);

      return new _promise2.default((resolve, reject) => {
        this.call(`/chains/${this.chain_id}/blocks/head/context/raw/bytes/contracts/index/originated/${hash_url}/big_map`).then(big_map => {
          const big_map_obj = {};
          const makePlain = (obj, prefix) => {
            for (const key in obj) {
              if (obj.data) {
                big_map_obj[prefix] = this.decode_bytes(obj.data);
              } else {
                makePlain(obj[key], prefix + key);
              }
            }
          };
          makePlain(big_map, '');

          resolve({
            storage: this.decode_bytes(storage_data),
            big_map: big_map_obj
          });
        }).catch(err => {
          resolve({
            storage: this.decode_bytes(storage_data),
            big_map: {}
          });
        });
      });
    });
  }

  decode_bytes(bytes_string) {
    return decodeBytes(bytes_string);
  }

  pack_data(data_json, type_json) {
    const param = { "data": data_json, "type": type_json, "gas": "400000" };
    return this.post(`/chains/${this.chain_id}/blocks/head/helpers/scripts/pack_data`, param).then(x => x.packed);
  }

  hash_data(packed_data) {
    return _promise2.default.resolve(_libsodiumWrappers2.default.to_hex(_libsodiumWrappers2.default.crypto_generichash(32, _libsodiumWrappers2.default.from_hex(packed_data))));
  }

  balance(key_hash) {
    return this.call(`/chains/${this.chain_id}/blocks/head/context/delegates/${key_hash || this.key_pair.public_key_hash}/balance`);
  }

  counter(key_hash) {
    return this.call(`/chains/${this.chain_id}/blocks/head/context/contracts/${key_hash || this.key_pair.public_key_hash}/counter`);
  }

  counter1(key_hash) {
    return this.counter(key_hash).then(x => parseInt(x) + 1 + '');
  }

  contract(key_hash) {
    return this.call(`/chains/${this.chain_id}/blocks/head/context/contracts/${key_hash}`);
  }

  manager_key(key_hash) {
    return this.call(`/chains/${this.chain_id}/blocks/head/context/contracts/${key_hash || this.key_pair.public_key_hash}/manager_key`);
  }

  createOpJSON(name) {
    const default_op = {
      reveal: {
        kind: "reveal",
        source: this.key_pair.public_key_hash,
        fee: "0",
        gas_limit: "0",
        storage_limit: "0",
        public_key: this.key_pair.public_key
        // counter: $positive_bignum,
      },
      transaction: {
        kind: 'transaction',
        source: this.key_pair.public_key_hash,
        fee: "0",
        gas_limit: "400000",
        storage_limit: "60000",
        amount: "0"
        // counter: $positive_bignum,
        // destination: $contract_id,
        // parameters?: $micheline.michelson_v1.expression
      },
      origination: {
        kind: "origination",
        source: this.key_pair.public_key_hash,
        fee: "0",
        // counter: $positive_bignum,
        gas_limit: "400000",
        storage_limit: "60000",
        manager_pubkey: this.key_pair.public_key_hash,
        balance: "0"
        // "spendable"?: boolean,
        // "delegatable"?: boolean,
        // "delegate"?: $Signature.Public_key_hash,
        // "script"?: $scripted.contracts
      }
    };

    const result = default_op[name];
    for (let i = 1; i < arguments.length; i++) {
      (0, _assign2.default)(result, JSON.parse((0, _stringify2.default)(arguments[i])));
    }

    return result;
  }

  makeOpWithReveal(source, op_lst, no_injection) {
    return this.counter1(source).then(counter => {
      return this.manager_key(source).then(x => {
        const ops = [];
        if (!x.key) ops.push(this.createOpJSON('reveal', { counter: counter++ + '', source }));

        op_lst.forEach(x => {
          ops.push(this.createOpJSON(x.kind, x.params, { counter: counter++ + '' }));
        });

        return this.makeOperations(ops, no_injection);
      });
    });
  }

  originate(params) {
    const no_injection = params.no_injection;
    delete params.no_injection;
    return this.makeOpWithReveal(params.source, [{ kind: 'origination', params }], no_injection);
  }

  transfer(params) {
    if (!params.destination) return _promise2.default.reject('lack of destination when calling transfer');

    const no_injection = params.no_injection;
    delete params.no_injection;
    return this.makeOpWithReveal(params.source, [{ kind: 'transaction', params }], no_injection);
  }

  activate(secret) {
    return this.makeOperations([{
      kind: 'activate_account',
      secret,
      pkh: this.key_pair.public_key_hash
    }]);
  }

  makeOperations(ops, no_injection) {
    ops = ops.map(x => {
      ['fee', 'balance', 'amount'].forEach(key => {
        if (typeof x[key] === 'number') x[key] = TZClient.r2tz(x[key]);
      });['gas_limit', 'storage_limit'].forEach(key => {
        if (typeof x[key] === 'number') x[key] = x[key] + '';
      });
      return x;
    });

    return this.head_hash().then(head_hash => {
      const post_data = {
        branch: head_hash,
        contents: ops
      };

      return _promise2.default.all([post_data, this.protocol(), this.post(`/chains/${this.chain_id}/blocks/head/helpers/forge/operations`, (0, _assign2.default)(post_data))]).then(([op_req, protocol, operation_data]) => {
        const sig = _libsodiumWrappers2.default.crypto_sign_detached(_libsodiumWrappers2.default.crypto_generichash(32, combineUint8Array(mark.operation, _libsodiumWrappers2.default.from_hex(operation_data))), TZClient.dec58(prefix.secret_key, this.key_pair.secret_key));
        const signed_operation = operation_data + _libsodiumWrappers2.default.to_hex(sig);

        op_req.protocol = protocol;
        op_req.signature = TZClient.enc58(prefix.signature, sig);

        return _promise2.default.all([this.post(`/chains/${this.chain_id}/blocks/head/helpers/preapply/operations`, [op_req]), signed_operation]);
      });
    }).then(([x, signed_operation]) => {
      const operation_results = [].concat.apply([], x.map(x => x.contents.map(x => x.metadata.operation_result))).filter(x => x);
      if (operation_results.filter(x => x.status !== 'applied').length) return _promise2.default.reject(x);

      const contracts = operation_results.map(x => x.originated_contracts || []);
      return _promise2.default.all([contracts, no_injection ? null : this.post('/injection/operation', signed_operation)]);
    }).then(([contracts, x]) => ({
      contracts,
      operation_id: x
    }));
  }
}

exports.TZClient = TZClient;
TZClient.libs = {
  bs58check: _bs58check2.default,
  sodium: _libsodiumWrappers2.default,
  bip39: _bip2.default
};
},{}],"index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getApiClient = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _tzclient = require('./tzclient.js');

var _tezexchangeApi = require('tezexchange-api');

var _tezexchangeApi2 = _interopRequireDefault(_tezexchangeApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getApiClient = exports.getApiClient = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (sk, version) {
    const tzclient = new _tzclient.TZClient();
    yield tzclient.ready;
    tzclient.importKey({ secret_key: sk });
    return new _tezexchangeApi2.default(tzclient, null, version);
  });

  return function getApiClient(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

(0, _asyncToGenerator3.default)(function* () {
  const ac = yield getApiClient('edskRwCM7hMRBCFuqqAwkrvyrMiRNvA5NVjN8Neg9UfT5xUpcSRJQDb8y2HgBvwAzM6Ah9d4ykZ1HgN8N426ZYrntLES5gZv79', 'testnet#3');
  try {
    // await ac.getStorage('main')
    // console.log(JSON.stringify(await ac.getOrders()))
    console.log((0, _stringify2.default)((yield ac.getRewardInfo(ac.client.key_pair.public_key_hash))));
  } catch (err) {
    console.log(err);
  }
})();
},{"./tzclient.js":"tzclient.js"}]},{},["index.js"], null)
//# sourceMappingURL=/index.map