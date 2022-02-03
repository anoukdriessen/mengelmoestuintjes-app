import {SubmitBtn} from "./FormItems";
import {FiArrowLeft} from "react-icons/all";

function Form({type, onSubmit, isUpdate, isDisabled, children}) {
    return <form className={type}>
        { children }
    </form>
}

export default Form;