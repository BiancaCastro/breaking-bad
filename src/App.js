import { Suspense } from 'react';
import CharacterList from './components/list/List.tsx';
import Detail from "./components/detail/Detail.tsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Routes,
  Route,
} from "react-router-dom";
function App() {
  return (
    <Suspense fallback="loading">
      <h5 style={{textAlign: "center"}}>Breaking Bad</h5>
       <Routes>
          <Route path="/" element={<CharacterList/>}/>
          <Route path="/detail/:char_id" element={<Detail/>} />
        </Routes>
        </Suspense>
  );
}

export default App;
