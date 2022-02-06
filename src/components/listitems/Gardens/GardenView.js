import '../../../styles/single-view.css'
import {FiMinus, FiPlus} from "react-icons/fi";
import {useState} from "react";
import SingleGardenView from "./SingleGardenView";
import {TasksDataContextProvider} from "../../../context/TasksDataContext";

function GardenView({type}) {

    return <div id='my-garden'>
        {
            type === 1 && <>
                <TasksDataContextProvider>
                    <SingleGardenView type={type} />
                </TasksDataContextProvider>
            </>
        }{
            type === 2 && <>
                <SingleGardenView type={type} />
            </>
        }{
            type === 3 && <>
                <SingleGardenView type={type} />
            </>
    }
    </div>
}

export default GardenView;