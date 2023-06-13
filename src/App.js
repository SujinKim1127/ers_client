import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Mypage } from "./pages/Mypage";
import { MainPage } from "./pages/MainPage";
import { ExhibitPage } from "./pages/ExhibitPage";
import { OrderPage } from "./pages/OrderPage";
import { PurchasePage } from "./pages/PurchasePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/exhibit/:exhibitId" element={<ExhibitPage />} />
          <Route path="/order/:exhibitId" element={<OrderPage />} />
          <Route path="/purchase/:orderId" element={<PurchasePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
