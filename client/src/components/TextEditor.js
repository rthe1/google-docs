import { useCallback, useEffect, useState } from 'react';
import 'quill/dist/quill.snow.css';
import Quill from 'quill';
import io from 'socket.io-client';



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

  const [socket, setSocket] = useState()
const [quill, setQuill] = useState()

  useEffect(() => {
    //Sets socket state
    const s = io('http://localhost:3001');

    setSocket(s);

    return () => {
      s.disconnect()
    }
  }, [])


  useEffect(() => {

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return
      socket.emit('send-changes', delta)
      console.log(delta)
    }
    // check if quill and socket have been set yet
    if (quill == null || socket == null) return

    //add event handler
    quill.on('text-change', handler)
    

    return () => {
    // removes event handler
    quill.off('text-change', handler)
    }
  },[socket, quill])



  useEffect(() => {
    // check if quill and socket have been set yet
    if (quill == null || socket == null) return

    const handler = (delta) => {
    quill.updateContents(delta)
    console.log(delta)
    }

    //add event handler
    socket.on('recieve-changes', handler)
    console.log('recieve changes')

    return () => {
    // removes event handler
    socket.off('recieve-changes', handler)
    }
  },[socket, quill])



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

