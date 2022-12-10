import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Main from './components/mainPage/Main';
import DatePage from './components/datePage/DatePage';
import { ToastifyProvider } from "./ToastifyContext";

function App() {
  return (
    <div className="app">
      <ToastifyProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/date" element={<DatePage />}>
              <Route path=":id" element={<DatePage />} />
            </Route>
            <Route path="*" element={<DatePage />} />
          </Routes>
        </BrowserRouter>
      </ToastifyProvider>
    </div>
  );
}

export default App;
