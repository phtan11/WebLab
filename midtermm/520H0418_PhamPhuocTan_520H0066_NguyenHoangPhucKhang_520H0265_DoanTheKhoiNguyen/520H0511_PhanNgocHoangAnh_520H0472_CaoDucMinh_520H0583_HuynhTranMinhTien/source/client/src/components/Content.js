import { useState, useEffect, useRef } from 'react'
import { BiListPlus, BiPlus, BiSearch } from 'react-icons/bi'
import { BsPencilSquare } from 'react-icons/bs'
import Note from './Note'

function Content() {
  const [notes, setNotes] = useState([])
  const [note, setNote] = useState({})
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [id, setId] = useState(null)
  const titleRef = useRef(null)
  const contentRef = useRef(null)
  const searchTimeoutRef = useRef(null)

  useEffect(() => {
    handleGetNotes()
  }, [])

  useEffect(async () => {
    handleUpdate()
  }, [title, content])

  useEffect(() => {
    if (isEditing) {
      titleRef.current.focus()
    }
  }, [isEditing])

  const handleClick = async (id) => {
    if (id) {
      const note = notes.find((note) => note._id === id)
      setId(id)
      setTitle(note.title)
      setContent(note.content)
    } else {
      await handleAdd()
    }
    setIsEditing(true)
  }

  const handleOutsideClick = async () => {
    if (title.replace(/\s/g, '') === '' && content.replace(/\s/g, '') === '') {
      await handleDelete(id)
    }
    setId(null)
    setTitle('')
    setContent('')
    setIsEditing(false)
    handleGetNotes()
  }

  const handleGetNotes = () => {
    new Promise(async (resolve) => {
      const response = await fetch('http://localhost:8080/')
      const notes = await response.json()
      setNotes(notes)
      resolve()
    })
  }

  const handleAdd = () => {
    new Promise(async (resolve, reject) => {
      const newNote = { title, content }
      const response = await fetch('http://localhost:8080/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      })
      const note = await response.json()
      console.log(note)
      setId(note._id)
      resolve()
    })
  }

  const handleSearch = (value) => {
    new Promise(async (resolve, reject) => {
      searchTimeoutRef.current = setTimeout(async () => {
        if (value === '') {
          handleGetNotes()
        } else {
          const response = await fetch(
            `http://localhost:8080/search?q=${value}`
          )
          const notes = await response.json()
          setNotes(notes)
        }
        resolve()
      }, 500)
    })

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
    }
  }

  const handleUpdate = () => {
    new Promise(async (resolve, reject) => {
      const newNote = { _id: id, title, content }
      await fetch(`http://localhost:8080/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      })
      resolve()
    })
  }

  const handleDelete = (id) => {
    new Promise(async (resolve, reject) => {
      await fetch(`http://localhost:8080/${id}`, {
        method: 'DELETE',
      })
      await handleGetNotes()
      resolve()
    })
  }

  return (
    <main className="container mx-auto px-6 py-12">
      {isEditing && (
        <div className="z-50 fixed inset-0">
          <div
            onClick={handleOutsideClick}
            className="absolute inset-0 bg-black bg-opacity-25"
          ></div>
          <div className="space-y-1 rounded-lg bg-white px-6 py-3 max-w-full w-96 flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <input
              ref={titleRef}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="Title"
              className="placeholder:text-gray-600 outline-none font-medium"
            />
            <textarea
              ref={contentRef}
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="Content"
              rows={4}
              className="placeholder:text-gray-600 text-sm outline-none"
            />
            <div className="flex justify-end">
              <button
                onClick={handleOutsideClick}
                className="hover:bg-gray-50 hover:opacity-75 text-yellow-600 rounded-lg font-medium text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">Simple Note</h1>
        <button
          onClick={() => handleClick(null)}
          className="text-3xl text-yellow-600 flex justify-center items-center"
        >
          <BsPencilSquare />
        </button>
      </div>
      <div className="bg-gray-200 rounded-lg flex items-center mt-4">
        <div className="w-7 text-sm flex justify-center text-gray-600">
          <BiSearch />
        </div>
        <input
          onChange={(e) => handleSearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="placeholder:text-gray-600 flex-1 text-sm bg-transparent outline-none h-8 pr-2"
        />
      </div>
      <section className="bg-white rounded-lg px-7 shadow-md flex flex-col mt-4">
        {notes
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .map((note) => (
            <Note
              onClick={handleClick}
              onDelete={handleDelete}
              key={note.id}
              {...note}
            />
          ))}
      </section>
    </main>
  )
}

export default Content
