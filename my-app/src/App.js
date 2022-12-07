import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Main from './components/Main';
import Date from './components/Date';

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/date" element={<Date />}>
            <Route path=":id" element={<Date />} />
          </Route>
          <Route path="*" element={<Date />} />
        </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
