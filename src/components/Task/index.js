import './index.css'

const Task = props => {
  const {taskDetails} = props
  const {task, tag} = taskDetails
  return (
    <li className="task-li">
      <p className="task-name">{task}</p>
      <p className="tag">{tag}</p>
    </li>
  )
}

export default Task
