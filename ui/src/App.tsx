import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteList from "./notes/NoteList";
import NotFound from "./errors/NotFound";
import Home from "./home/Home";
import Layout from "./shared/Layout";
import NoteDetails from "./notes/NoteDetails";
import { CreateNote } from "./notes/CreateNote";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="notes" element={<NoteList />} />
            <Route path="notes/:id" element={<NoteDetails />} />
            <Route path="notes/create" element={<CreateNote />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}