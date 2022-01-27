import {useContext} from "react";
import ListDataContext from "../../../context/ListDataContext";
import Card from "../Card";
import {FiEdit3, FiX} from "react-icons/fi";

function TaskItem({item}) {
    const {deleteTask, updateTask} = useContext(ListDataContext);
    // console.log(item);

    return <Card className = {'card'}>
        <div key={item.id}>
            <span>{item.title}</span>
            <p>{item.description}</p>
            <span>is done = {item.done}</span>
            <span>{item.created} >>> {item.deadline}</span>
            <button onClick={() => {
                deleteTask(item.id, item) }}
                    className='btn close'>
                <FiX/>
            </button>
        </div>
    </Card>

}

export default TaskItem;