import "./App.css";
import { Header } from "./components/index";
import { Home, Trading, Library } from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
function App() {
    const client = new QueryClient();
    return (
        <div className="App">
            <QueryClientProvider client={client}>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/trading" element={<Trading />}></Route>
                    <Route path="/library" element={<Library />}></Route>
                </Routes>
            </QueryClientProvider>
        </div>
    );
}

export default App;
