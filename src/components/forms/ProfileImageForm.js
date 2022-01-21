import {GiSave} from "react-icons/all";
import axios from "axios";

function ProfileImageForm({image, handleSubmit, handleChange, changeDetails}) {
    return <div className='profile-image'>
        <form id='upload-image' onSubmit={handleSubmit} encType={'multipart/form-data'} className={ !changeDetails ? 'hidden' : '' }>
            {
                image
                    ? <img id='profile-img' src={`data:image/jpeg;base64,${image}`} alt='user'/>
                    : <img id='profile-img' src='https://images.unsplash.com/photo-1587334274328-64186a80aeee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3Byb3V0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' alt='empty user' />
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
}

export default ProfileImageForm;