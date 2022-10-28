import RouteApp from "./routes";
import {BrowserRouter} from 'react-router-dom'
 

function App(){
  return(
      <BrowserRouter>
          <RouteApp/>
      </BrowserRouter>
  )
}

export default App;
