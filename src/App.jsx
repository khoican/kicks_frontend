import { useEffect, useState } from 'react'
import kicksLogo from './assets/logo.png'
import Router   from './Index'
import Api from './api'
import * as Icon from '@heroicons/react/24/outline'
import * as IconSolid from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function NavLink ({ path, icon, text }) {
  return (
    <Link to={path} className='flex items-center gap-3 text-xs font-medium p-3 rounded-lg hover:bg-blue-500 hover:text-white'>
      {icon} {text}
    </Link>
  )
}
NavLink.propTypes = {
  path: PropTypes.string.isRequired,
  icon: PropTypes.node,
  text: PropTypes.string.isRequired
}

function Category ({text, number}) {
  return (
    <>
      <p className='text-sm'>{text}</p>
      <p className='px-3 py-1 bg-slate-300 rounded-lg font-medium text-sm hover:bg-blue-500'>{number}</p>
    </>
  )

}
Category.propTypes = {
  text: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired
};

function App() {

  // fetching API
  const [categoires, setCategories] = useState([])
  const fetchDataCategories = async () => {
    await Api.get('/categories')
      .then(response => {
        setCategories(response.data.data)
      })
  } 

  useEffect (() => {
    fetchDataCategories()
  }, [])

  // Dropdown Toggler
  const [ dropdownOpen, setDropdownOpen ] = useState(false)
  const handleToggle = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const [ userOpen, setUserOpen ] = useState(false)
  const handleUserToggle = () => {
    setUserOpen(!userOpen)
  }

  return (
    <>
      <div className='flex bg-slate-200 min-h-full'>

        {/* sidebar */}
        <aside className='w-64 px-7 py-5 min-h-screen bg-white drop-shadow-lg'>

          {/* logo */}
          <div className='h-8 my-5'>
            <img src={kicksLogo} alt="kick's logo" className='h-full mx-auto' />
          </div>

          {/* menu */}
          <div className='mt-14 grid gap-4'>

            <NavLink path='/' icon={<Icon.SquaresPlusIcon className='h-5' />} text='DASHBOARD' />
            <NavLink path='/product' icon={<Icon.InboxStackIcon className='h-5' />} text='ALL PRODUCT' />
            <NavLink path='/order' icon={<IconSolid.DocumentTextIcon className='h-5' />} text='ORDER LIST' />

          </div>

          {/* categories */}
          <div className='mt-12'>
            <button className='flex justify-between items-center mb-3 w-full' onClick={handleToggle}>
              <h1 className='font-bold text-xl'>Categories</h1>
                <Icon.ChevronDownIcon className='w-4' />
              </button>

              { dropdownOpen && (
              <div className='grid transition-all duration-75'>
                { categoires.map((category, item) => (
                  <div key={item} className='flex justify-between mb-2 items-center'>
                    <Category text={category.kategori} number={category.jumlah} />
                  </div>
                ))}                           
              </div>
              )}
          </div>

        </aside>

        {/* main */}
        <div className='w-full '>

          {/* header */}
          <div className='bg-white px-20 py-4 flex justify-end gap-10'>
            <Icon.MagnifyingGlassIcon className='w-5' />
            
            <div>
              <button onClick={handleUserToggle} className='px-3 py-1 border border-black rounded-md flex justify-between items-center w-24'>
                <h1 className='font-medium text-xs cursor-pointer'>ADMIN</h1>
                <Icon.ChevronDownIcon className='w-4' />
              </button>
              
              { userOpen && (
                <div className='absolute flex justify-between items-center w-24 bg-white p-2 shadow-md rounded-md mt-3'>
                  <Icon.ArrowUpTrayIcon className='h-4'/>
                  <p>Logout</p>
                </div>
              )}
            </div>
          </div>

          {/* content */}
          <main className='p-5 pe-10'>
            <Router />
          </main>
        </div>

      </div>
    </>
  )
}

export default App
