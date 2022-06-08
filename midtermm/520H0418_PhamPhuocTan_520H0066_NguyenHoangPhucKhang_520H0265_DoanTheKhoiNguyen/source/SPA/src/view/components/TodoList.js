import React from 'react';
import AddTodo from './AddTodo';
import { toast } from 'react-toastify';
import axios from 'axios';
import todo from '../../image/todo.svg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPen, faTrash, faCheck} from '@fortawesome/free-solid-svg-icons'

class TodoList extends React.Component {
  state = {
    listTodo: [],
    editTodo: {}
  }
  async componentDidMount() {
    let res = await axios.get('http://localhost:8080/ToDo/API/read.php')
    this.setState({
      listTodo: res && res.data && res.data.data ? res.data.data : []
    })

  }


  addNewTodo = async (todo) => {
    let res = await axios.post('http://localhost:8080/ToDo/API/add.php', new
    URLSearchParams(todo));
    let newTodo = {
      "id": res.data.data.id,
      "title": res.data.data.title
    }
    this.setState({
      listTodo:[...this.state.listTodo,newTodo]
    })
    toast.success("Add Success!");
  }


  handleDelete = async (item) => {
    let check = window.confirm(`Would you like to delete "${item.title}" Todo ?`);
    if(check){
      axios.delete('http://localhost:8080/ToDo/API/remove.php', {
        data: {
          id: item.id
        },
        headers: {
          "Content-Type": "application/json"
        }
      });
      let currentTodo = this.state.listTodo;
      currentTodo = currentTodo.filter(todo => todo.id !== item.id)
      this.setState({
        listTodo: currentTodo
      })
      toast.success("Delete Success!");
    }
    else{
      return;
    }
  }

  handleEditTodo = async (todo) => {
    let { listTodo, editTodo } = this.state;
    let isEmpty = Object.keys(editTodo).length === 0;
    if (isEmpty === false && editTodo.id === todo.id) {
      if(!editTodo.title){
        toast.error("Your todo is empty!");
        return;
      }
      axios.put('http://localhost:8080/ToDo/API/update.php', editTodo);
      let listTodoCopy = [...listTodo];

      let index = listTodoCopy.findIndex(item => item.id === editTodo.id)
      let l = listTodoCopy[index].title
      if(l != editTodo.title){
        listTodoCopy[index].title = editTodo.title;
        this.setState({
          listTodo: listTodoCopy,
          editTodo: {}
        })
        toast.success("Edit Success!");
      }
      else{
        this.setState({
          editTodo: {}
        })
      }
      return;
    }
    this.setState({
      editTodo: todo
    })
  }
  hanldeOnchangeEdit = (event) => {
    let editTodoCopy = { ...this.state.editTodo };
    let newTitle = event.target.value
    editTodoCopy.title = newTitle;


    this.setState({
      editTodo: editTodoCopy
    })



  }
  handleDeleteAll = async () => {
    let check = window.confirm("Are you sure to delete all Todo?");
    
    if(check){
      axios.delete('http://localhost:8080/ToDo/API/removeAll.php', {
        headers: {
          "Content-Type": "application/json"
        }
      });
      this.setState({
        listTodo: []
      })
      toast.success("Delete Success!");
    }
    else{
      return;
    }
  }

  render() {
    let { listTodo, editTodo } = this.state;
    let emptyObj = Object.keys(editTodo).length === 0;

    return (
      <>
        <div className='todo-app'>
          <div>
            <h1>Todo App</h1>
          </div>
          <AddTodo
            addTodo={this.addNewTodo}
          />
          <div>
            {
              listTodo && listTodo.length > 0 ? listTodo.map((item, index) => {
                return (
                  <div className='todo-row' key={item.id}>
                    {emptyObj === true ?
                      <div>{item.title}</div>
                      :
                      <>
                        {editTodo.id === item.id ?
                          <span>
                            <input type="text" className='update' value={editTodo.title} onChange={(event) => this.hanldeOnchangeEdit(event)} />
                          </span>
                          :
                          <div>{item.title}</div>
                        }
                      </>
                    }
                    <div className='icons'>
                      <button className='edit-icon'
                        onClick={() => this.handleEditTodo(item)}
                      >
                   {/* {emptyObj === false && item.id === editTodo.id ? "Done": "Edit" } */}

                        {emptyObj === false && item.id === editTodo.id ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faPen}/> }
                      </button>
                      <button className='delete-icon' onClick={() => this.handleDelete(item)}><><FontAwesomeIcon icon={faTrash} /></></button>
                    </div>
                  </div>
                )
              }):
              <img className="picture" src={todo}/>
            }
          </div>
          <div>
            {listTodo && listTodo.length > 0 &&
              <button className="remove-all" onClick={() => this.handleDeleteAll()}>Remove All</button>
            }
          </div>
        </div>
      </>
    );
  }
}

export default TodoList;
