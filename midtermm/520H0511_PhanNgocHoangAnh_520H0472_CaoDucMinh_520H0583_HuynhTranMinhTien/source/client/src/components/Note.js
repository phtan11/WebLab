import { useState, useEffect } from 'react'
import { BiTrash, BiPencil } from 'react-icons/bi'

function Note({ _id, title, content, onClick, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [titleValue, setTitleValue] = useState(title)
  const [contentValue, setContentValue] = useState(content)

  return (
    <div className="group py-3 last:border-0 border-b border-gray-100 space-y-1 flex">
      <div onClick={() => onClick(_id)} className="flex-1 min-w-0">
        <h4 className="flex-1 truncate font-medium">{title}</h4>
        <p className="text-gray-600 text-sm truncate">{content}</p>
      </div>
      <button
        onClick={() => onDelete(_id)}
        className="group-hover:opacity-100 opacity-0 hover:bg-slate-100 hover:text-red-500 text-gray-600 rounded-lg w-7 h-7 flex justify-center items-center"
      >
        <BiTrash />
      </button>
    </div>
  )
}

export default Note
