import {GiSave} from "react-icons/all";

function ProfileImageForm({changeUserImage, image, handleSubmit, handleChange, changeDetails}) {
    return <> {
        changeUserImage && <div id='profile-image'>
        <form id='upload-image' onSubmit={handleSubmit} encType={'multipart/form-data'}
              className={!changeDetails ? 'hidden' : ''}>
            {
                image
                    ? <img id='profile-img-prev' src={`data:image/jpeg;base64,${image}`} alt='user'/>
                    : <img id='profile-img-prev'
                           src='https://images.unsplash.com/photo-1587334274328-64186a80aeee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3Byb3V0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
                           alt='empty user'/>
            }
            <input
                id='photo'
                type='file'
                name='photo'
                accept="image/png, image/jpeg"
                onChange={handleChange}
            />

            <button className='link reversed' type={'submit'}>
                <GiSave size={20}/> opslaan
            </button>
        </form>
    </div>
}</>
}

export default ProfileImageForm;