import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Main from './components/Main';
import DatePage from './components/DatePage';
import { ToastifyProvider } from "./ToastifyContext";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
