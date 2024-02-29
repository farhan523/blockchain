import React, { useContext, useState } from "react";
import styles from "./navbar.module.css";
import logo from "../../public/images/logo.png";
import cart from "../../public/images/shopping-cart.png";
import Image from "next/image";
import close from "../../public/images/cross.png"
import menu from "../../public/images/menu.png";
import Link from 'next/link';

import "animate.css";

import { Roboto } from "next/font/google";

import { TrackingContext } from "@/Context/Tracking";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

let pages = [
    {
        name: "Home",
        link: "/home"
    },
    {
        name: "AddInventory",
        link: "#"
    },
    {
        name: "Inventory",
        link: "/inventory"
    },
    {
        name: "Profile",
        link: "#"
    },
    {
        name: "Analytics",
        link: "#"
    }
];

function Navbar({currentPage}) {
    const { currentUser, connectWallet,cartP } = useContext(TrackingContext);
    const [menuOpen, setMenuOpen] = useState(false);
    
    return (
        <div className={styles.navbar}>
            <div className={styles.parentContainer}>

                {/* logo */}
                <div className={styles.leftChild}>
                    <Image src={logo} style={{ height: "80%", width: "auto" }} alt="logo" />
                    <h1 className={roboto.className} style={{ paddingLeft: 10, fontSize: 21, fontWeight: "bold" }}>
                        Block Trace
                    </h1>
                </div>

                {/* pages links */}
                <div className={styles.centerChild}>
                    {pages.map((page) => {
                        return (
                            <p key={page.link} className={roboto.className} style={{borderColor : currentPage == page.name ? "white" : "transparent"}}>
                                <Link href={page.link}>{page.name}</Link>
                            </p>
                        );
                    })}
                </div>
                
                {/* wallet address and cart */}
                <div className={styles.rightChild}>
                    <div className={styles.walletAddress}>
                        {currentUser ? (
                            <p className={roboto.className}>{currentUser.slice(0, 25).slice(0, 25)}...</p>
                        ) : (
                            <p onClick={() => connectWallet()} style={{ cursor: "pointer" }}>
                                {" "}
                                Connect Wallet
                            </p>
                        )}
                    </div>

                    <div style={{ height: "100%", width: "auto", display: "flex", alignItems: "center", position: "relative" }}>
                        <Image src={cart} style={{ height: "30%", width: "auto" }} alt="logo" />
                        <div>
                            <span style={{ position: "absolute", top: "32%", right: "-9px", backgroundColor: "red", borderRadius: "50%", width: "20px", height: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}> {cartP.productCount} </span>
                        </div>
                    </div>
                </div>
                
                {/* menu icon */}
                <div className={styles.menuIcon} onClick={() => setMenuOpen(true)}>
                    <div style={{ height: "100%", width: "auto", display: "flex", alignItems: "center", position: "relative",marginRight:"20px" }}>
                        <Image src={cart} style={{ height: "30%", width: "auto" }} alt="logo" />
                        <div>
                            <span style={{ position: "absolute", top: "32%", right: "-9px", backgroundColor: "red", borderRadius: "50%", width: "20px", height: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}> {cartP.productCount} </span>
                        </div>
                    </div>
                    <Image src={menu} width={50} height={50} />
                </div>
            </div>

            {/* side menu */}
            <div
                style={{
                    display: menuOpen ? "flex" : "none",
                    animation: "slideInLeft",
                    animationDuration: "1s"
                }}
                className={styles.sideMenu}
            >   
              <div onClick={()=>{setMenuOpen(false)}} style={{width:"100%" , top: 0, position: "absolute", display: "flex", justifyContent:"flex-end", padding:20, cursor:"pointer"}}>
                <Image src={close} width={50} height={50} />
              </div>
                <div className={styles.menuItem}>
                    {pages.map((page) => {
                        return (
                            <p key={page.link} className={roboto.className}>
                                <a href={page.link}>{page.name}</a>
                            </p>
                        );
                    })}
                    {currentUser ? (
                        <p className={roboto.className}>{currentUser.slice(0, 25).slice(0, 25)}...</p>
                    ) : (
                        <p onClick={() => connectWallet()} style={{ cursor: "pointer" }}>
                            {" "}
                            Connect Wallet
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
