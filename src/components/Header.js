import React from 'react';
import { MdOutlineLogin } from "react-icons/md";

/**
 * Functie die gebruikt wordt om de Actie uit te voeren
 */
function handleAction({ history }){
    console.log('klikt op login')
    // console.log(history)
    // history.push('/login-register');
}

/**
 * Actie die gebruikt wordt om de gebruiker in te loggen
 */
function LoginAction() {
    return <MdOutlineLogin
            className = 'user-action login'
        />
}

/**
 * Verzameling van alle acties die gebruikt kan worden
 */
function Action( { isLoggedIn } ) {
    // als de gebruiker niet ingelogd is wordt de login knop getoont
    if (!isLoggedIn) { return <LoginAction />; }

    return null
}

/**
 * De paginatitel die getoont wordt kan of een normale titel zijn
 * of de titel van Mengelmoestuintjes op de Homepage
 */
function PageTitle( { isHomePage, title } ) {
    if (isHomePage) {
        return <h1 id='mengelmoestuintjes' className='title'>
            Mengelmoestuintjes
        </h1>;
    }

    return <h1 className='title'>
        {title}
    </h1>
}

/**
 * Component Header bestaat uit:
 * - de titel van de pagina
 */
function Header({ historyToUse, isLoggedIn, isHomePage, pageTitle }) {
    return (
      <div className='header'>
          <PageTitle
            isHomePage={isHomePage}
            title={pageTitle}
          />

          <button
              className='user-action'
              type='button'
              onClick={() => handleAction( historyToUse )}
          >
              <Action
                  isLoggedIn={ isLoggedIn }
              />
          </button>
      </div>
  );
}

export default Header;