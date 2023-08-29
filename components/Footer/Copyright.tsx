export default function Copyright() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            py-4 px-8 md:px-16 xl:px-32
            text-xl gap-6 ">
            {/* px-8 here instead of mx-8 because border has to spread across whole page */}
            <div className="flex md:flex-col text-neutral-500">
                <h1>Copyright &copy; 2022&nbsp;</h1>
                <h2>Dine Market</h2>
            </div>
            <div className="flex md:flex-col">
                <h1 className="text-neutral-500">Design by.&nbsp;</h1>
                <h2 className="font-bold text-lg">Weird Design Studio</h2>
            </div>
            <div className="flex md:flex-col">
                <h1 className="text-neutral-500">Code by.&nbsp;</h1>
                <h2 className="font-bold text-lg">wds12 on github</h2>
            </div>
        </div>
    )
}