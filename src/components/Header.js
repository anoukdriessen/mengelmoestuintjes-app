import React from 'react';
import './styles/Container.css';

// icons
import { MdOutlineLogin } from 'react-icons/md';
import { MdPersonPin } from 'react-icons/md';

function handleAction( { isLoggedIn } ){
    // login functionaliteit
    if (isLoggedIn) { console.log('klikt op login'); }

    // profiel functionaliteit
    console.log('klikt op profiel');
}
function LoginAction() {
    return <MdOutlineLogin
        className = 'user-action login'
    />
}
function ProfileAction() {
    return <MdPersonPin
        className = 'user-action profile'
    />
}
function Action( { isLoggedIn } ) {
    // als de gebruiker niet ingelogd is wordt de login knop getoont
    if (!isLoggedIn) { return <LoginAction />; }

    // als de gebruiker is ingelogd wordt de profiel knop getoont
    return <ProfileAction />;
}

function PageTitle( { isHomePage, title } ) {
    // op de homepagina is de titel groter dan normaal
    if (isHomePage) {
        title = 'Mengelmoestuintjes';
        return <h1 id='mengelmoestuintjes' className='title'> {title} </h1>;
    }

    return <h1 className='title'> {title} </h1>
}

function Header({ isLoggedIn, isHomePage, pageTitle }) {
    return (
      <div className='header'>
          <PageTitle
            isHomePage={isHomePage}
            title={pageTitle}
          />

          <button
              className='user-action'
              type='button'
              onClick={() => handleAction( isLoggedIn )}
          >
              <Action
                  isLoggedIn={ isLoggedIn }
              />
          </button>
      </div>
  );
}

export default Header;