import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    // component state variables
    this.state = {
      newItem: "",
      list: []
    };
  }

  //incorporating local storage using global state
  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  updateInput(key, value) {
    // update react state
    this.setState({ [key]: value });
  }

  addItem() {
    // object for retrieving date
    var currentDate = new Date();
    // variable for storing date
    var datetime = ("0" + (currentDate.getMonth() + 1)).slice(-2) + "/"
      + ("0" + currentDate.getDate()).slice(-2) + "/"
      + currentDate.getFullYear() + " @ "
      + ("0" + currentDate.getHours()).slice(-2) + ":"
      + ("0" + currentDate.getMinutes()).slice(-2) + ":"
      + ("0" + currentDate.getSeconds()).slice(-2);

    // create a new item with unique id
    const newItem = {
      id: Date.now()/*1 + Math.random()*/,
      value: this.state.newItem.slice(),
      date: "Task created on: " + datetime

    };

    // copy current list of items
    const list = [...this.state.list];

    // add the new item to the top of the list
    list.unshift(newItem);

    // update state with new list, reset the new item input
    this.setState({
      list,
      newItem: ""
    });
    // set focus back to input box after adding a task
    document.getElementById("inputBox").focus();
  }

  deleteItem(id) {
    // copy current list of items
    const list = [...this.state.list];
    // filter out the item being deleted
    const updatedList = list.filter(item => item.id !== id);

    this.setState({ list: updatedList });
  }

  render() {
    return (
      <div className="App">
        <h1 className="app-header">To-Do List</h1>

        <div className="container">
          <form className="list-form" onSubmit={() => this.addItem()}>
            <input
              className="input-box"
              id="inputBox"
              type="text"
              placeholder="Type task here"
              value={this.state.newItem}
              onChange={e => this.updateInput("newItem", e.target.value)}

            />

            <button
              className="add-btn btn-floating"
              onClick={() => this.addItem()}
              disabled={!this.state.newItem.length}
            >
              <i className="material-icons"> + </i>
            </button>

            <br />
            <ul className="list-wrapper">
              {this.state.list.map(item => {
                return (

                  <li className="item-list" key={item.id}>

                    <button className="delete-btn btn-floating"
                      onClick={() => this.deleteItem(item.id)}
                    >
                      <i className="material-icons">X</i>
                    </button>

                    {item.value}
                    <br />

                    <div className="item-date">
                      {item.date}
                    </div>

                  </li>

                );
              })}
            </ul>
          </form>
        </div>

      </div>
    );
  }
}

export default App;