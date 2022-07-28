const { schema } = require('@uniswap/token-lists');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const tokenlist = require('./tokenlist.json');

function validate() {
  const ajv = new Ajv({ allErrors: true, verbose: true });
  addFormats(ajv);
  const validator = ajv.compile(schema);

  const valid = validator(tokenlist);
  if (valid) {
    console.log('valid\n');
  } else {
    console.log(validator.errors);
  }
}

function printMintable() {
  tokenlist.tokens.forEach((token) => {
    if (token.extensions && token.extensions.mintable && token.extensions.mintable.default) {
      const amount = token.extensions.mintable.default;
      const amountReadable = +amount / 10 ** token.decimals;
      console.log(token.symbol, '\t', amountReadable);
    }
  });
}

validate();
printMintable();
