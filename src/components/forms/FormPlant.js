import {useContext, useState} from "react";
import PlantsDataContext from "../../context/PlantsDataContext";
import {InputFieldWithIcon, SimpleTextArea, SimpleTextField} from "./FormItems";
import {FiMapPin, GiBoxUnpacking, GiGroundSprout, GiSave} from "react-icons/all";
import Form from "./Form";
import {toast} from "react-toastify";
import {convertProvince} from "../../helpers/functions";

function FormPlant() {
    const { createNewPlant } = useContext(PlantsDataContext)
    const [isValid, setIsValid] = useState(false);
    const [thisPlant, setThisPlant] = useState({
        name: '',
        description: '',
        category: 'FLOWERS',
        details: {
            official: '',
            waterRequirement: "LOW",
            sunRequirement: "LOW",
            survivingWinter: "LOW",
            groundRequirement: "UNKNOWN",
            startSowInside: "NONE",
            endSowInside: "NONE",
            startSowOutside: "NONE",
            endSowOutside: "NONE",
            startHarvest: "NONE",
            endHarvest: "NONE",
            preSow: false,
            forPot: false,
            forOutside: false,
            forGreenhouse: false,
            sowingDepth: 0,
            distanceBetweenX: 0,
            distanceBetweenY: 0,
            avgDaysTillSprout: 0,
            avgDaysTillHarvest: 0
        }
    });
    const { name, description, category, details } = thisPlant;

    const categories = ['FLOWERS', 'VEGETABLES', 'HERBS', 'FRUITS'];

    const handleChange = (e) => {
        console.log(e.target.id, e.target.value)
        setThisPlant({
            ...thisPlant,
            [e.target.id]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        if (thisPlant.name === '') {
            toast.error('naam mag niet leeg zijn');
        } else if (thisPlant.description === '') {
            toast.error('beschrijving mag niet leeg zijn');
        } else {
            e.preventDefault();
            // console.log('submit', thisPlant)
            let newPlant = {
                name: thisPlant.name,
                description: thisPlant.description,
                field: null,
            }
            let category = thisPlant.category.toLowerCase();
            createNewPlant(thisPlant, category);
        }
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
                placeHolder={'Naam'}
                onChange={handleChange}
                isRequired={true}
            />
            <SimpleTextArea
                iconSize={15}
                item={description}
                name={'description'}
                placeHolder={'Beschrijving'}
                onChange={handleChange}
                isRequired={true}
                max={255}
            />
            <InputFieldWithIcon icon = {<GiGroundSprout size={15} />}>
                <select name='category' id='category' onChange={handleChange} defaultValue={category}>
                    {
                        categories.map((cat) => {
                            return <option key={cat} value={cat}>{cat.toLowerCase()}</option>
                        })
                    }
                </select>
            </InputFieldWithIcon>

            <button type={"submit"} className='btn btn-form' onClick={handleSubmit}>
                <GiSave/>Opslaan
            </button>
        </Form>
    {/*  TODO add details  */}
    </>
}

export default FormPlant;