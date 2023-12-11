import { getDefaultProvider, Wallet, utils } from 'ethers'; // ethers v5
import { Provider, TransactionResponse } from '@ethersproject/providers'; // ethers v5
import { ERC721Client } from '@imtbl/contracts';

const CONTRACT_ADDRESS = '0x88077778f6c87af93d3b7ecf81676cc4440af0c1';
const PRIVATE_KEY = '6e512034530dfeb37c5e093e84f73d0cfb12c334693f0804f9355869f933bf83';
const TOKEN_ID1 = 1;
const TOKEN_ID2 = 2;
const TOKEN_ID3 = 3;

const provider = getDefaultProvider('https://rpc.testnet.immutable.com');

const mint = async (provider: Provider): Promise<TransactionResponse> => {
  // Bound contract instance
  const contract = new ERC721Client(CONTRACT_ADDRESS);
  // The wallet of the intended signer of the mint request
  const wallet = new Wallet(PRIVATE_KEY, provider);
  /*const minterRole = await contract.MINTER_ROLE(provider);
  const hasMinterRole = await contract.hasRole(
    provider,
    minterRole,
    wallet.address
  );

  if (!hasMinterRole) {
    // Handle scenario without permissions...
    console.log('Account doesnt have permissions to mint.');
    return Promise.reject(
      new Error('Account doesnt have permissions to mint.')
    );
  } */

  // Construct the mint requests
  const requests = [
    {
      to: '0x70BC3Ea5cFEA2D92cdEd12867d6D8953364c6398',
      tokenIds: [TOKEN_ID1, TOKEN_ID2, TOKEN_ID3],
    }
  ];
const gasOverrides = {
    maxPriorityFeePerGas: 100e9, // 100 Gwei
    maxFeePerGas: 150e9,
    gasLimit: 200000,
    };

  const populatedTransaction = await contract.populateMintBatch(requests, gasOverrides);

  const result = await wallet.sendTransaction(populatedTransaction);
  console.log(result); // To get the TransactionResponse value
  return result;
};

mint(provider);