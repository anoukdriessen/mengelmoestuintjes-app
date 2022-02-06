import {Link} from "react-router-dom";
import React from "react";

function CallToAction({linkTo, title}) {
    return <Link to={linkTo}>
        <button type='button' className='btn btn-call-to-action'>
            {title}
        </button>
    </Link>
}

export default CallToAction;