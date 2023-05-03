import { HiBeaker } from 'react-icons/hi'
import Pattern from '../assets/auth-5.png'

// import { Link } from "react-router-dom";

const AuthLayout = ({ title = '', children }) => {
  return (
    <div className='flex text-gray-800  md:py-6  lg:p-0'>
      <div className='flex flex-col-reverse lg:flex-row w-screen lg:min-h-screen border shadow-sm rounded-lg overflow-hidden lg:border-none lg:shadow-none lg:rounded-none lg:overflow-auto'>
        <div className='flex flex-col justify-between text-white lg:min-h-screen w-full lg:w-7/12 xl:w-3/5 bg-[#111827]'>
          <img className='w-8/12 h-auto' src={Pattern} alt='' />

          <div className='space-y-8 p-9'>
            <a href='/' className='flex items-center space-x-3'>
              <HiBeaker className='w-9 h-9 md:w-12 md:h-12 text-indigo-600' />
              <div>
                <p className='inline text-xl md:text-2xl uppercase font-bold leading-[0.5rem]'>
                  Coder <span className='font-[300]'>Community</span>
                </p>
                <div className='flex items-center space-x-0.5 leading-[0.5rem]'>
                  <hr className='w-5 border-sky-600' />
                </div>
              </div>
            </a>

            <div className='space-y-4'>
              <h1 className='text-2xl lg:text-4xl font-semibold'>{title}</h1>

              <p className='font-medium'>
                "Your story, your way."{' '}
                <br className='hidden lg:inline-block xl:hidden' />
              </p>
            </div>

            <div className='space-y-4'>
              <div className='flex items-center -space-x-3'>
                {[1, 2, 3, 4].map((item) => (
                  <img
                    key={item}
                    className='h-7 w-8 md:h-10 md:w-10 bg-gray-800 border border-white rounded-full object-cover object-center'
                    src={`/images/item${item}.jpeg`}
                    alt=''
                  />
                ))}
              </div>

              <p className='font-medium text-sm'>
                More than 2k people joined us, it's your turn
              </p>
            </div>
          </div>
        </div>

        <div className='flex flex-col justify-center lg:min-h-screen p-6 md:p-10 lg:p-8 xl:p-10 w-full lg:w-5/12 xl:w-2/5'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
