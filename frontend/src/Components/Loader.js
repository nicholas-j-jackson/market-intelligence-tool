import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
    return (
        <Spinner
        animation="grow"
        role="status"
        style={{
            width: "100px",
            height: "100px",
            margin: "auto",
            display: "block",
            variant: "primary",
        }}
        >
        <span className="sr-only"></span>
        </Spinner>
    );
}

export default Loader;