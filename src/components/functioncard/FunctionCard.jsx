import './FunctionCard.scss'

function FunctionCard({
  title,
  tag,
  description,
  code,
  color
}) {

  return (
    <section className='function-card'>

      <div
        className='function-card__top-border'
        style={{
          background: color
        }}
      ></div>

      <div className='function-card__header'>

        <div>
          <h3>{title}</h3>
        </div>

        <span
          style={{
            color: color,
            borderColor: color
          }}
        >
          {tag}
        </span>

      </div>

      <p className='function-card__description'>
        {description}
      </p>

      <div className='function-card__code'>

        <button>
          Nusxa
        </button>

        <pre>
{code}
        </pre>

      </div>

    </section>
  )
}

export default FunctionCard