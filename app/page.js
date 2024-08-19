import Layout from './components/Layout'
import { auth } from "./auth";

export default async function Home() {
  const  session  = await auth();
  return (
    <>
    <Layout>
      <div className='text-blue-900 flex justify-between'>
        <h2 className='font-bold'>Hello, {session?.user?.name}</h2>
        <div className='flex bg-gray-300 gap-1 text-black rounded-lg'>
        <img className='rounded-lg w-6 h-6' src={session?.user?.image} />
        <span className='px-2'>
        {session?.user?.name}
        </span>
        </div>
      </div>
      </Layout>
    </>
  );
}
