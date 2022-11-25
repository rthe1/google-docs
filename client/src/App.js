import TextEditor from './components/TextEditor'
import {
  BrowserRouter,
  Routes,
  Navigate,
  Route
} from 'react-router-dom';
import {v4 as uuid} from 'uuid';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/documents/${uuid()}`} />} exact />
          
        <Route path="/documents/:id" element={<TextEditor/>}/>
          
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
