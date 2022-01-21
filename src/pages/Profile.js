import {Redirect, useHistory} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthDataContext} from "../context/AuthDataContext";
import PageHeader from "../components/pageitems/PageHeader";
import PageContent from "../components/pageitems/PageContent";
import PageFooter from "../components/pageitems/PageFooter";
import ProfileForm from "../components/forms/ProfileForm";
import UserDataContext, {UserDataContextProvider} from "../context/UserDataContext";
import Card from "../components/listitems/Card";
import {InputFieldWithIcon} from "../components/forms/FormItems";
import {FiImage, GiSave} from "react-icons/all";
import axios from "axios";

function Profile() {
    const { auth } = useContext(AuthDataContext);
    const history = useHistory();
    const [image, setImage] = useState(auth.user.image);
    const [encoded, setEncoded] = useState(auth.user.image);
    const [upload, setUpload] = useState(auth.user.image);

    const handleChange = (e) => {
        setUpload(e.target.files[0])
        let file = URL.createObjectURL(e.target.files[0]);
        // console.log(file)
        setEncoded(btoa(file))
        // console.log(encoded)
        let out = document.getElementById('profile-img');
        out.src = file;
        out.onload = function() {
            URL.revokeObjectURL(out.src) // free memory
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let formData = new FormData();
            formData.append("photo", document.getElementById('profile-img').value);
            console.log(formData.get("photo"))
            const result = await axios.post(`https://localhost:8443/api/gebruikers/${auth.user.username}/upload`,
                formData.get("photo"),
                {
                    headers: {
                        'Content-Type': `multipart/form-data; boundary=file`,
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
            console.log(result)
        } catch (e) {
            console.error(e)
            console.log(e)
        }

    }

    if (auth.user !== null) {
        return<>
            <PageHeader title={auth.user.username}/>

            <PageContent>
                <UserDataContextProvider>
                    <ProfileForm thisUser = {auth.user}/>
                    <div className='profile-image'>
                        <form id='upload-image' onSubmit={handleSubmit} encType={'multipart/form-data'}>
                            {
                                image
                                    ? <img id='profile-img' src={`data:image/jpeg;base64,${image}`} />
                                    : <img id='profile-img' src='https://images.unsplash.com/photo-1587334274328-64186a80aeee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3Byb3V0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' />
                            }
                            <div>
                                <input
                                    id='photo'
                                    type='file'
                                    name='photo'
                                    accept="image/png, image/jpeg"
                                    onChange={handleChange}
                                />
                            </div>
                            <button type={'submit'}><GiSave size={20}/></button>
                        </form>
                    </div>
                    <Card retro={true}>
                        <p>
                            @{auth.user.username} - LEVEL {auth.user.details.level.currentLevel}
                        </p>

                    </Card>
                </UserDataContextProvider>
            </PageContent>
        </>
    } else {
        // auth.isAuth === null
        return <Redirect to='/404'/>
    }

}

export default Profile;