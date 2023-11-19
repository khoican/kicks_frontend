import { useEffect, useState } from 'react'
import kicksLogo from './assets/logo.png'
import Router   from './index'
import Api from './api'

function App() {

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

  return (
    <>
      <div>

        {/* sidebar */}
        <aside>

          {/* logo */}
          <div>
            <img src={kicksLogo} alt="kick's logo" />
          </div>

          {/* menu */}
          <div>
            <a href="/">DASHBOARD</a>
            <a href="/product">ALL PRODUCTS</a>
            <a href="/order">ORDER LIST</a>
          </div>

          {/* categories */}
          <div>
            <h1>Categories</h1>

            <div>
              {
                categoires.length > 0
                  ? categoires.map((category, item) => (
                    <a href="" key={item}>{ category.kategori }</a>
                  ))
                  : <a href="">Belum Ada Kategori</a>
              }

            </div>
          </div>

        </aside>

        {/* main */}
        <div>

          {/* header */}
          <div>
            <button>Search</button>
            <h1>Admin</h1>
          </div>

          {/* content */}
          <main>
            <Router />
          </main>
        </div>

      </div>
    </>
  )
}

export default App
