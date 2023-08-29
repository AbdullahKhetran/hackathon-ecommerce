import Button from "./Buttons";

export default function Newsletter() {
    return (
        <div className="relative my-24 mx-8 md:mx-16 xl:mx-32 ">
            <div className="absolute w-full h-full text-6xl font-extrabold  tracking-widest opacity-5 text-ellipsis mt-16 -z-10">
                Newsletter
            </div>
            <div className=" my-8 flex flex-col items-center gap-4 ">
                <h1 className="font-bold text-4xl leading-snug text-center">Subscribe to our Newsletter</h1>
                <p className="text-xl text-center">Get the latest information and promo offers directly</p>
                <input type="text" placeholder="Input email address" className="border border-black p-2 " />
                <Button content="Subscribe" path="/" disabled={true} />
            </div>
        </div>
    )
}