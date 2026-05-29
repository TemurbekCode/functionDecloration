import './SectionTitle.scss'

function SectionTitle({
  number,
  title,
  color
}) {

  return (
    <div className='section-title'>

      <div
        className='section-title__number'
        style={{
          borderColor: color,
          color: color
        }}
      >
        {number}
      </div>

      <div
        className='section-title__line'
        style={{
          background: color
        }}
      ></div>

      <h2>{title}</h2>

    </div>
  )
}

export default SectionTitle