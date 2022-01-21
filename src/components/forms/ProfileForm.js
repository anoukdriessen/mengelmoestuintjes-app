import './forms.css'
import {useState} from "react";
import {FiImage, FiSave, FiSettings, FiUserCheck, GiPartyPopper} from "react-icons/all";
import {InputFieldWithIcon} from "./FormItems";
import {FiMail, FiUser} from "react-icons/fi";

function ProfileForm({thisUser}) {
    const [formData, setFormData] = useState({
        image: null,
        displayName: thisUser.displayName,
        email: thisUser.email,
        birthday: thisUser.details.birthday,
        province: thisUser.details.province,
    })
    const [changeDetails, setChangeDetails] = useState(false);
    const {image, displayName, email, birthday, province} = formData;

    let iconSize = 20;

    const handleSubmit = () => {
        console.log('clicked submit')
    }

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    return <>
        <div id='profile-details'>
            <span id='change-details'
                  onClick={() => {
                      changeDetails && handleSubmit()
                      setChangeDetails((prevState) => !prevState)
                  }}>
                { changeDetails ? <FiSave size={15}/> : <FiSettings size={15}/> }
                { changeDetails ? 'Opslaan' : 'Aanpassen' }
            </span>
            <form id='profile-details-form' onSubmit={handleSubmit} className={ !changeDetails && 'hidden' }>
                <div className='details'>
                    <InputFieldWithIcon icon = {<FiImage size={iconSize} />}>
                        <input
                            id='image'
                            type='file'
                            value={image}
                            placeholder={'Profielfoto'}
                            onChange={handleChange}
                            accept="image/png, image/jpeg"
                            disabled={!changeDetails}
                        />
                    </InputFieldWithIcon>
                    <p>Je profielfoto wordt getoont bij gedeelde taken en tuintjes.<br/>Je bent niet verplicht een profielfoto te uploaden maar staat wel een stuk persoonlijker</p>
                </div>
                <div className='details'>
                    <InputFieldWithIcon icon = {<FiUserCheck size={iconSize} />}>
                        <input
                            id='displayName'
                            type='text'
                            value={displayName}
                            placeholder={'Naam'}
                            onChange={handleChange}
                            autoComplete='off'
                            disabled={!changeDetails}
                        />
                    </InputFieldWithIcon>
                    <p>Je naam wordt getoont bij gedeelde taken en tuintjes.<br/>Vul je geen naam in wordt je Gebruikersnaam [ {thisUser.username} ] getoont</p>
                </div>
                <div className='details'>
                    <InputFieldWithIcon icon = {<FiMail size={iconSize} />}>
                        <input
                            id='email'
                            type='email'
                            value={email}
                            placeholder={'Email'}
                            onChange={handleChange}
                            autoComplete='off'
                            required
                            disabled={!changeDetails}
                        />
                    </InputFieldWithIcon>
                    <p>checkbox stuur mij 1 keer per maand een email met updates over Mengelmoestuintjes</p>
                </div>
                <div className='details'>
                    <InputFieldWithIcon icon = {<GiPartyPopper size={iconSize} />}>
                        <input
                            id='birthday'
                            type='date'
                            value={birthday}
                            placeholder={'Email'}
                            onChange={handleChange}
                            autoComplete='off'
                        />
                    </InputFieldWithIcon>
                    <p>Je mede tuinierders kunnen zien dat je jarig bent<br/>
                    Je bent niet verplicht om je verjaardag in te vullen</p>
                </div>
            </form>
        </div>
    </>

}

export default ProfileForm;