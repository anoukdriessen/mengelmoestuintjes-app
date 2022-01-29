import '../forms.css'
import {useContext, useState} from "react";
import {FiImage, FiMapPin, FiSave, FiSettings, FiUserCheck, GiPartyPopper, GiSave} from "react-icons/all";
import {DetailsInput, InputFieldWithIcon, SubmitBtn} from "../FormItems";
import {FiMail, FiUser} from "react-icons/fi";
import axios from "axios";
import {toast} from "react-toastify";
import UserDataContext from "../../../context/UserDataContext";
import {convertProvince, refreshPage} from "../../../helpers/functions";
import * as fs from "fs";
import ProfileImageForm from "./ProfileImageForm";

function ProfileForm({thisUser, image, changeUserDetails, changeUserImage }) {
    const { provinces } = useContext(UserDataContext);
    const [formData, setFormData] = useState({
        displayName: thisUser.displayName,
        email: thisUser.email,
        birthday: thisUser.details.birthday,
        province: thisUser.details.province,
    })
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
        let preview = document.getElementById('profile-img-prev');
        out.src = file;
        preview.src = file;
        out.onload = function() {
            URL.revokeObjectURL(out.src) // free memory
        }
    }
    const handleImageSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        let file = selected;
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
            refreshPage();
        } catch (e) {
            console.error(e);
            console.log(e.response);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.patch(`https://localhost:8443/api/gebruikers/${thisUser.username}`, {
                "name": `${formData.displayName}`,
                "email": `${formData.email}`,
                "birthday": `${formData.birthday}`,
                "province": `${formData.province}`
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(result);
            refreshPage()
        } catch (e) {
            console.error(e);
            console.log(e.response);
        }
    }

    return <>
        <div id='profile-details'>
            <ProfileImageForm
                changeUserImage={changeUserImage}
                image={image}
                handleSubmit={handleImageSubmit}
                handleChange={handleImageChange}
                changeDetails={changeUserDetails}
            />

            <form id='profile-details-form' onSubmit={handleSubmit} className={ !changeUserDetails ? 'hidden' : '' }>
                <DetailsInput
                    isrequired={false}
                    iconSize={iconSize}
                    inputId='displayName'
                    type='text'
                    value={displayName}
                    placeholder='mijn naam'
                    onChange={handleChange}
                    info={"Kies een naam die bij je past, deze naam wordt weergegeven bij tuintjes en berichten. Je bent niet verplicht een naam in te vullen, laat je dit veld leeg dan gebruiken we je gebruikersnaam"}
                />
                <DetailsInput
                    isrequired={true}
                    iconSize={iconSize}
                    inputId='email'
                    type='email'
                    value={email}
                    placeholder={'Email'}
                    onChange={handleChange}
                    info={"Je email is verplicht, deze hebben we nodig ter identificatie. Zo kunnen we je bijvoorbeeld een herstel wachtwoord toesturen indien je jouw wachtwoord vergeten bent"}
                />
                <DetailsInput
                    isrequired={false}
                    iconSize={iconSize}
                    inputId='birthday'
                    type='date'
                    value={birthday}
                    onChange={handleChange}
                    info="Je mede tuinierders kunnen zien dat je jarig bent. Je bent niet verplicht om je verjaardag in te vullen"
                />
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
                <div className='details'>
                    <SubmitBtn>Wijzigen</SubmitBtn>
                </div>
            </form>
        </div>
    </>

}

export default ProfileForm;