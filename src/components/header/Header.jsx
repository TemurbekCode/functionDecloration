import './Header.scss'

function Header() {
    return (
        <header className='hero'>

            <div className='hero__blur hero__blur1'></div>
            <div className='hero__blur hero__blur2'></div>

            <div className='hero__badge'>
                🚀 JavaScript Kursi • Funksiyalar
            </div>

            <h1 className='hero__title'>
                JavaScript'da
                <span> Funksiyalar </span>
            </h1>

            <p className='hero__text'>
                Function Declaration, Expression
                va Arrow Function’larni
                real misollar bilan o‘rganing.
            </p>

            <div className='hero__chips'>

                <div className='chip chip-blue'>
                    ⚡ Declaration
                </div>

                <div className='chip chip-purple'>
                    📦 Expression
                </div>

                <div className='chip chip-green'>
                    ➜ Arrow
                </div>

            </div>

            <div className='hero__code'>

                <div className='hero__top'>
                    <span className='red'></span>
                    <span className='yellow'></span>
                    <span className='green'></span>
                </div>

                <pre>
                    {`// Arrow Function

const salom = (ism) => {
  return "Salom " + ism
}

console.log(salom("Temur"))
`}
                </pre>

            </div>

        </header>
    )
}

export default Header;