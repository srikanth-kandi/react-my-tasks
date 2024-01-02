import './index.css'

const Tag = props => {
  const {tag, onClickActiveTag, isActive} = props
  const {optionId, displayText} = tag
  const activeTagClassName = isActive ? 'tag-li active' : 'tag-li'
  const onClickTag = () => {
    onClickActiveTag(optionId)
  }
  return (
    <li>
      <button type="button" className={activeTagClassName} onClick={onClickTag}>
        {displayText}
      </button>
    </li>
  )
}

export default Tag
