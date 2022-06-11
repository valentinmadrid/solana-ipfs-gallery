import { useEffect, useState } from 'react';
import { create } from 'ipfs-http-client';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import idl from '../utils/solana_ipfs_gallery.json';

const { SystemProgram, Keypair } = web3;

let Photos = Keypair.generate();
const programID = new PublicKey(idl.metadata.address);
const network = clusterApiUrl('devnet');
const opts = {
  preflightCommitment: 'processed',
};

export default function Home() {
  const [fileUrl, setFileUrl] = useState('');
  const [walletAddress, setWalletAddress] = useState(null);
  const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
  });

  useEffect(() => {
    getProvider();
  }, []);

  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new AnchorProvider(
      connection,
      window.solana,
      opts.preflightCommitment
    );
    return provider;
  };

  const upload = async (e) => {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (err) {
      console.error('an error encountered', err);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  return (
    <div>
      <div className='h-20 bg-black'>
        <div className=''>
          <div className='flex justify-center items-center h-full'>
            <h1 className='text-white m-6'>Solana IPFS Gallery</h1>
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center h-full mt-5'>
        <input
          className='file:rounded-md file:bg-blue-600 file:border-0 file:px-6 file:py-4 file:text-white hover:file:bg-black
          bg-black rounded-xl text-white p-3 file:mr-5'
          type='file'
          onChange={upload}
        />
      </div>
      {fileUrl && (
        <div className='flex justify-center items-center h-full mt-5'>
          <div className='bg-black rounded-lg p-3 mt-3 w-80'>
            <div className='flex justify-center items-center h-full'>
              <img className='rounded-md w-32' src={fileUrl} width='600px' />
            </div>
            {walletAddress && (
              <div className='flex justify-center items-center'>
                <button
                  className='text-white bg-blue-600 p-3 rounded-md mt-3 w-full'
                  onClick={upload}
                >
                  Upload Image
                </button>
              </div>
            )}
            {!walletAddress && (
              <div className='flex justify-center items-center'>
                <button
                  className='text-white bg-blue-600 p-3 rounded-md mt-3 w-full'
                  onClick={connectWallet}
                >
                  Connect Wallet
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
