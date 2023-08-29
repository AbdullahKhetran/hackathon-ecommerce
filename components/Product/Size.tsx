export default function Size() {
    const buttonStyle = "font-bold text-lg text-gray-700"
    return (
        <div className="flex flex-col gap-4">
            <h1 className='font-bold text-lg tracking-wider'>SELECT SIZE</h1>
            <div className="flex gap-14 ">
                <button className={buttonStyle}>XS</button>
                <button className={buttonStyle}>S</button>
                <button className={buttonStyle}>M</button>
                <button className={buttonStyle}>L</button>
                <button className={buttonStyle}>XL</button>
            </div>
        </div>
    )
}