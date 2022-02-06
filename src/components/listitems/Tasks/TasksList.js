import {useContext, useState} from "react";
import ListDataContext from "../../../context/ListDataContext";
import {FiLoader} from "react-icons/fi";
import ListStats from "../ListStats";
import TaskForm from "../../forms/types/TaskForm";
import TaskItem from "./TaskItem";

function TasksList( {type} ) {
    const { tasks, updateTask, isLoading } = useContext(ListDataContext)
    const [current, setCurrent] = useState(0)
    if (!isLoading && (!tasks || tasks.length === 0)) {
        return <div>
            Er zijn geen taken meer :-)
        </div>
    }

    let theseTasks = [...tasks];

    // eslint-disable-next-line default-case
    switch (type){
        case 0:
            return isLoading ? <h3><FiLoader/></h3> : ( <>
                    <div>
                        {tasks.subpages && tasks.subpages[current]}
                        <div className={'listHeader'}>
                            <ListStats
                                item = {theseTasks}
                            />
                        </div>
                    </div>
                    <TaskForm
                        list = {tasks}
                    />
                    { theseTasks.map((obj) => {
                        return <TaskItem
                            key = {obj.id}
                            item = {obj}
                            handleUpdate={updateTask}
                        />
                    })}
                </>)
        case 1:
            return isLoading ? <h3><FiLoader/></h3> : (
                <>TODAY</>
            )
        case 2:
            return isLoading ? <h3><FiLoader/></h3> : (
                <>TOMORROW</>
            )
        case 3:
            return <>THIS MONTH</>
    }

    return <>TYPE NOT FOUND</>
}

TasksList.defaultProperty = {
    type: 0,
}

export default TasksList;