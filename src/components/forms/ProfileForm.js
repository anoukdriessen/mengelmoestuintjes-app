import './forms.css'
import {useContext, useState} from "react";
import {FiImage, FiMapPin, FiSave, FiSettings, FiUserCheck, GiPartyPopper} from "react-icons/all";
import {InputFieldWithIcon} from "./FormItems";
import {FiMail, FiUser} from "react-icons/fi";
import axios from "axios";
import {toast} from "react-toastify";
import UserDataContext from "../../context/UserDataContext";
import {convertProvince} from "../../helpers/functions";
import * as fs from "fs";
import ProfileImageForm from "./ProfileImageForm";

function ProfileForm({thisUser, image, }) {
    const { provinces } = useContext(UserDataContext);
    const [formData, setFormData] = useState({
        displayName: thisUser.displayName,
        email: thisUser.email,
        birthday: thisUser.details.birthday,
        province: thisUser.details.province,
    })
    const [changeDetails, setChangeDetails] = useState(false);
    const { displayName, email, birthday, province} = formData;
    const [selected, setSelected] = useState({});
    let iconSize = 20;

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }
    const handleImageChange = async (e) => {
        setSelected(e.target.files[0])
        // show image to user
        let file = URL.createObjectURL(e.target.files[0]);
        let out = document.getElementById('profile-img');
        out.src = file;
        out.onload = function() {
            URL.revokeObjectURL(out.src) // free memory
        }
    }
    const handleImageSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        let file = selected
        formData.append('photo', file, 'image');
        try {
            const result = await axios.post(`https://localhost:8443/api/gebruikers/${thisUser.username}/upload`,
                formData,
                { headers: {
                        'Content-Type': `multipart/form-data; boundary=photo`,
                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    }, params: {
                        photo: file
                    }
                });
            console.log(result);
        } catch (e) {
            console.error(e);
            console.log(e.response);
        }
    }
    const handleSubmit = async (e) => {
        try {
            const result = await axios.patch(`https://localhost:8443/api/gebruikers/${thisUser.username}`, {
                "name": `${formData.displayName}`,
                "email": `${formData.email}`,
                "birthday": `${formData.birthday}`,
                "provinces": `${formData.province}`
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(result);
        } catch (e) {
            console.error(e);
            console.log(e.response);
        }
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
            <ProfileImageForm
                image={image}
                handleSubmit={handleImageSubmit}
                handleChange={handleImageChange}
                changeDetails={changeDetails}
            />
            <form id='profile-details-form' onSubmit={handleSubmit} className={ !changeDetails ? 'hidden' : '' }>
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
                <div className='details'>
                    <InputFieldWithIcon icon = {<FiMapPin size={iconSize} />}>
                        <select name='province' id='province' onChange={handleChange} defaultValue={province}>
                            <option value='HIDDEN'>Kies een Provincie</option>
                            {
                                provinces && ( provinces.map((p) => {
                                    let thisProvince = convertProvince(p);
                                    if (p !== 'HIDDEN') {
                                        return <option key={p} value={p}>{thisProvince}</option>
                                    }
                                }))
                            }
                        </select>
                    </InputFieldWithIcon>
                    <p>Waar zijn jij en je tuintje gevestigd? Deel dit met je mede tuinierders en wordt getoont in de lokale berichten</p>
                </div>
            </form>
        </div>
    </>

}

export default ProfileForm;