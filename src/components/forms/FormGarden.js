import Form from "./Form";
import {InputXAndYField, SimpleTextField} from "./FormItems";
import {GiSave} from "react-icons/all";
import {useContext, useState} from "react";
import GardensDataContext from "../../context/GardensDataContext";

function FormGarden() {
    const { createNewGarden } = useContext(GardensDataContext);

    const [thisGarden, setThisGarden] = useState({
        name: '',
        x: 0,
        y: 0,
    })
    const { name, x, y } = thisGarden;

    const [nameLength, setNameLength] = useState(name.length);
    const [tooLong, isTooLong] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const [total, setTotal] = useState(x*y);

    const handleChange = (e) => {
        let current = e.target.value;

        // validate name
        if (e.target.id === 'name') {
            setNameLength(current.length)
            if (current >= 45) { isTooLong(true)
            } else { isTooLong(false); }
        }
        // validate number
        if(e.target.id === 'x' || e.target.id === 'y') {
            if (current < 0) {
                e.target.value = 0;
            }
        }

        // set value
        setThisGarden({
            ...thisGarden,
            [e.target.id]: e.target.value,
        })
        // console.log(isValid)
    }
    const handleLeave = (e) => {
        setTotal(x*y);
        validate();
    }

    const validate = () => {
        if (name.length > 3 && x > 0 && y > 0) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit', thisGarden);
        createNewGarden(thisGarden);
    }

    return <>
        <Form
            type={'primary'}
            onSumbit={handleSubmit}
            isDisabled={!isValid}
        >
            <SimpleTextField
                iconSize={20}
                item={name}
                name={'name'}
                placeHolder={'Naam van Tuintje'}
                onChange={handleChange}
                isRequired={true}
                max={45}
                tooLong={tooLong}
                nameLength={nameLength}
                onMouse={handleLeave}
            />
            <span className='input-preview'>Tuintje: {name}</span>
            <InputXAndYField
                x={x}
                y={y}
                placeHolderX={'Breedte'}
                placeHolderY={'Lengte'}
                onChange={handleChange}
                isRequired={true}
                count={total}
                onMouse={handleLeave}
            />
            <button type={"button"} className='btn btn-form' onClick={handleSubmit}>
                <GiSave/>Opslaan
            </button>
        </Form>
    </>
}

export default FormGarden;