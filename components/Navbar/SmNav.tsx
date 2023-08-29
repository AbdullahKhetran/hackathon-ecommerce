"use client"
import OpenMenu from "./openMenu";
import ClosedMenu from "./closedMenu";
import { useState } from "react";

export default function SmNav() {
    const [burger, setBurger] = useState(false)

    function changeState() {
        setBurger(!burger)
    }

    return (
        <div className=" my-8 mx-8 md:mx-16 ">
            {burger ?
                <OpenMenu onShow={changeState} /> :
                <ClosedMenu onShow={changeState} />
            }
        </div>
    )
}
