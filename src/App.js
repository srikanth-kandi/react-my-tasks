import {Component} from 'react'
import {v4} from 'uuid'
import Tag from './components/Tag'
import Task from './components/Task'
import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    inputText: '',
    inputTag: tagsList[0].displayText,
    taskList: [],
    activeTag: 'INITIAL',
  }

  componentDidMount() {
    const getLocalStorageData = localStorage.getItem('taskList')
    if (getLocalStorageData !== null) {
      this.setState({taskList: JSON.parse(getLocalStorageData)})
    }
  }

  onChangeInputText = event => {
    this.setState({inputText: event.target.value})
  }

  onChangeSelect = event => {
    this.setState({inputTag: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()
    const {inputText, inputTag} = this.state
    const newTask = {
      id: v4(),
      task: inputText,
      tag: inputTag,
    }
    if (inputText.length !== 0) {
      this.setState(prevState => {
        const updatedTaskList = [...prevState.taskList, newTask]
        localStorage.setItem('taskList', JSON.stringify(updatedTaskList))
        return {
          taskList: [...prevState.taskList, newTask],
          inputText: '',
          inputTag: tagsList[0].optionId,
        }
      })
    }
  }

  onClickActiveTag = id => {
    this.setState(prevState => ({
      activeTag: prevState.activeTag === id ? 'INITIAL' : id,
    }))
  }

  getFilteredTasks = () => {
    const {taskList, activeTag} = this.state
    if (activeTag !== 'INITIAL') {
      const filteredTasks = taskList.filter(
        eachTask => eachTask.tag.toLowerCase() === activeTag.toLowerCase(),
      )
      return filteredTasks
    }
    return taskList
  }

  render() {
    const {inputText, inputTag, activeTag} = this.state
    const getFilteredTasks = this.getFilteredTasks()
    return (
      <div className="main-container">
        <div className="left-container">
          <div className="left-inner-container">
            <h1 className="heading">Create a task!</h1>
            <form className="form-container" onSubmit={this.submitForm}>
              <label htmlFor="task" className="label">
                Task
              </label>
              <input
                type="text"
                id="task"
                className="input-ele"
                placeholder="Enter the task here"
                value={inputText}
                onChange={this.onChangeInputText}
              />
              <label htmlFor="tags" className="label-tags">
                Tags
              </label>
              <select
                className="select-ele"
                value={inputTag}
                onChange={this.onChangeSelect}
              >
                {tagsList.map(eachTag => (
                  <option className="option-ele" key={eachTag.optionId}>
                    {eachTag.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="add-task">
                Add Task
              </button>
            </form>
          </div>
        </div>
        <div className="right-container">
          <div className="right-inner-container">
            <h1 className="tags-heading">Tags</h1>
            <ul className="tags-list">
              {tagsList.map(eachTag => (
                <Tag
                  key={v4()}
                  tag={eachTag}
                  onClickActiveTag={this.onClickActiveTag}
                  isActive={activeTag === eachTag.optionId}
                />
              ))}
            </ul>
            <h1 className="tags-heading">Tasks</h1>
            {getFilteredTasks.length === 0 ? (
              <div className="no-task-container">
                {activeTag === 'INITIAL' ? (
                  <p className="no-tasks">No Tasks Added Yet</p>
                ) : (
                  <p className="no-tasks">{`No ${
                    activeTag.charAt(0).toUpperCase() +
                    activeTag.slice(1).toLowerCase()
                  } Tasks Added Yet`}</p>
                )}
              </div>
            ) : (
              <ul className="tasks-list">
                {getFilteredTasks.map(eachTask => (
                  <Task key={eachTask.id} taskDetails={eachTask} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
