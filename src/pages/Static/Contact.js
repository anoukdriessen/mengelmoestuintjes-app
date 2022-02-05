import PageHeader from "../../components/pageitems/PageHeader";
import PageContent from "../../components/pageitems/PageContent";
import {SimpleTextArea, SimpleTextField} from "../../components/forms/FormItems";
import {useState} from "react";
import Form from "../../components/forms/Form";
import {FiSend} from "react-icons/fi";

function Contact() {
    const [contactForm, setContactForm] = useState({
        topic: '',
        message: '',
        contact: '',
    })
    const {topic, message, contact} = contactForm;

    const [isValid, setIsValid] = useState(false);

    const handleChange = (e) => {
        setContactForm({
            ...contactForm,
            [e.target.id]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        window.alert('We hebben je bericht ontvangen, je zult binnen 7 dagen een antwoord van ons ontvangen');
    }

    return <>
        <PageHeader title='Contact'/>
        <PageContent>
            <Form
                type={'primary'}
                onSubmit={handleSubmit}
                isDisabled={!isValid}
            >
            <SimpleTextField
                iconSize={1}
                item={topic}
                name={'topic'}
                placeHolder={'Waar gaat het over'}
                onChange={handleChange}
                isRequired={true}
                max={75}
            />
            <SimpleTextArea
                iconSize={1}
                item={message}
                name={'message'}
                placeHolder={'Laat hier het bericht achter'}
                onChange={handleChange}
                isRequired={true}
                max={255}
            />
            <h4>Hoe kunnen we contact met jou opnemen</h4>
            <sup>Laat je email of telefoonnummer achter</sup>
            <SimpleTextField
                iconSize={1}
                item={contact}
                name={'contact'}
                placeHolder={'...@.nl / 0612345678'}
                onChange={handleChange}
                isRequired={true}
            />
                <button type={"submit"} className='btn btn-form'>
                    <FiSend/>Verstuur formulier
                </button>
            </Form>
        </PageContent>
    </>
}

export default Contact;