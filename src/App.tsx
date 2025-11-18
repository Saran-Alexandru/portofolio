import './App.css'

import NavBar from "./components/navbar/navbar"
import Hero from "./pages/hero/Hero"
import Projects from './pages/projects/projects'
// import About from './pages/about/about'
// import Contact from './pages/contact/contact'

function App() {

  return (
    <div className="min-h-screen">
      <NavBar />
      <Hero />
      <div className="max-w-screen-xl mx-auto">
        <Projects />
        {/* <About />
        <Contact /> */}
      </div>

    </div>
  )
}

export default App
