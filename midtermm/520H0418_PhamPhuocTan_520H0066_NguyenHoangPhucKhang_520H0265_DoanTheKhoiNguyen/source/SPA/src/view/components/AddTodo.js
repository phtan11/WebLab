import React from "react";
import { toast } from 'react-toastify';
import {faCheck} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AddTodo extends React.Component {
    state = {
        title: ""
    }
    handleOnchange = (event) => {
        this.setState({
            title: event.target.value
        })
    }
    AddNewTodo = () => {
        if (!this.state.title) {
            toast.error("Your work must be not null like that!");
            return;
        }
        let todo = {
            title: this.state.title
        }
        this.props.addTodo(todo);
        this.setState({
            title: ""
        })
    }

    componentDidMount = () => {
        document.addEventListener("keydown", (e) => 
          e.code === "Enter" && 
              this.AddNewTodo())
    }
    
    render() {
        return (
            <div>
                <input placeholder='Type your work ' type="text" name='text' className='todo-input'
                    value={this.state.title}
                    onChange={(event) => this.handleOnchange(event)}
                />
                <button className='todo-button'
                    onClick={() => this.AddNewTodo()}
                ><><FontAwesomeIcon icon={faCheck}/></></button>
            </div>
        )
    }
}

export default AddTodo;