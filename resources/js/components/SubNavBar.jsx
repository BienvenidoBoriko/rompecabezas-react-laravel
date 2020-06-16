import React from "react";

 const SubNavBar = (props) => {
     let botones=[];
     for(let nivel=1;nivel<=parseInt(props['niveles']);nivel++){
       botones.push(<button type="button" key={ nivel.toString()} value={nivel} className="btn btn-secondary" onClick={ props.onClick }> { nivel } </button>);
    }
    return (
        <nav className="pt-1 pb-3">
            <div className="btn-toolar" role="toolbar" aria-label="Toolbar with button groups">
                <div className="btn-group mr-2 ml-2" role="group" aria-label="First group">
                    { botones }
                </div>
            </div>
        </nav>
    );
};

export default SubNavBar;
