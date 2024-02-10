import React from "react";
import { Link } from "react-router-dom";
import "../common/Navbar.css";
import Button from "@material-ui/core/Button";


const NavBar = () => {
    return (
        <>
            <div className="TopArea">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "0vh",
                        padding: "3%", 
                    }}
                >
                    <div style={{ marginLeft: "2vw" }}>
                        <strong style={{ fontSize: "1.8rem" }}>Natwest</strong>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-around"
                        }}
                    >
                        <a className="underLine2 hide_on_responsive">
                            <Button variant="text" color="default" href="/">
                                Assignment-1 
                            </Button>
                        </a>
                        <a className="underLine2 hide_on_responsive" href="/state">
                            <Button variant="text" color="default">
                            Assignment-2 
                            </Button>
                        </a>

                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBar;
