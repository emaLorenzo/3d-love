import './styles.css'
import ReactDOM from 'react-dom'
import { Suspense, lazy, useState } from 'react'
import { FadeIn } from './styles'

const Hearts = lazy(() => import('./Hearts'))

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Suspense fallback={null}>
        <Hearts speed={1} count={120} depth={40} />
      </Suspense>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))