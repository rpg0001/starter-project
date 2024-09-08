import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteList from "./notes/NoteList";
import NotFound from "./general/NotFound";
import Home from "./home/Home";
import Layout from "./shared/Layout";
import NoteDetails from "./notes/NoteDetails";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="notes" element={<NoteList />} />
            <Route path="notes/:id" element={<NoteDetails />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}