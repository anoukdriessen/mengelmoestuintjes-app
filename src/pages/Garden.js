import React, {useState} from "react";
import {useHistory} from "react-router-dom";

function handleTileClick(tile) {
    // console.log('geklikt op', tile)
    // TODO handle tile click
}

function Garden() {
    let history = useHistory();
    const[x, setX] = useState(0);
    const[y, setY] = useState(0);

    let size = (x*y);
    // console.log(size);

    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    let thisGarden = {
        rows: [],
        columns: []
    }
    for (let i = 0; i < x; i++) {
        if (y !== 0) { // y cannot be empty to have at least one row
            // for each row
            // console.log('row=',i+1);
            thisGarden.rows[i] = letters[i];

            for (let j = 0; j < y; j++) {
                // for each row we add the amount of columns
                // console.log('adding column', j+1);
                thisGarden.columns[j] = j+1;
            }
        }
    }
    // console.log("de rijen in de tuin",thisGarden.rows)
    // console.log("de kolommen in de tuin",thisGarden.columns)

    return <>
        <input type='number' value={x} id={'x'} onChange={() =>
        {
            let thisX = document.getElementById('x').value;
            if (thisX > 26) {
                setX(26);
            } else {
                setX(document.getElementById('x').value);
            }
        }}/>
        <input type='number' value={y} id={'y'} onChange={() =>
        {
            setY(document.getElementById('y').value);
        }}/>
        <div id='garden-select-box'>
            je tuin is {x} bij {y} = {x*y} vierkante meter
            { size!==0 && (
                <>
                    <p>je tuin is niet leeg</p>
                    <div id='garden'>
                        <div id='rows'>
                            {
                                thisGarden.columns.map((c) => {
                                    return <div className='row'>
                                        {
                                            thisGarden.rows.map((r) => {
                                                let name = (r+c)
                                                return <span className='tile' onClick={()=>{handleTileClick(name)}}>
                                                        {name}</span>
                                            })
                                        }
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </>
            )}
        </div>
    </>
}

export default Garden;