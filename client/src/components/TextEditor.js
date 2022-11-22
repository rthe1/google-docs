import { useCallback, useEffect, useState } from 'react';
import 'quill/dist/quill.snow.css';
import Quill from 'quill';
import io from 'socket.io-client';

const [socket, setSocket] = useState()
const [quill, setQuill] = useState()

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]

export default function TextEditor() {

  useEffect(() => {
    //Sets socket state
    const s = io('http://localhost:3001');

    setSocket(s);

    return () => {
      s.disconnect()
    }
  }, [])

  const wrapperRef = useCallback((wrapper) => {
    // incase .container isnt loaded yet
    if (wrapper == null) return
    // clear .container contents
    wrapper.innerHTML = "";

    // adds new div to .container 
    const editor = document.createElement("div");
    wrapper.append(editor)

    //creates a new instance of Quill editor and adds it to new div
    const q = new Quill(editor, {
      modules: { toolbar: TOOLBAR_OPTIONS },
      theme: "snow"
    });
    // sets state to the instance of Quill
    setQuill(q)
  }, [])

  return <div className="container" ref={wrapperRef}></div>
}

