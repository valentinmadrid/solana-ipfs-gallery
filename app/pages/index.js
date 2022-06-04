import { useState } from 'react';
import { create } from 'ipfs-http-client';

export default function Home() {
  const [fileUrl, setFileUrl] = useState('');
  const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
  });
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
            <div className='flex justify-center items-center'>
              <button className='text-white bg-blue-600 p-3 rounded-md mt-3 w-full'>
                upload image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
