import {useState} from "react";

function Post( props ) {
    let date;
    if ( props.modified ) {
        date = props.modified;
    } else {
        date = props.date;
    }

    // TODO if summary null -> description
    // if summary -> read more btn -> description
    return <>
        <section>
            <h3>{props.title}</h3>
            <img src={props.imageUrl} alt={'afbeelding ' + props.imageUrl}/>
            <hr/>
            <span>geschreven door @{props.author}</span><br/>
            <span>{props.category}</span><br/>
            <span>datum: {date}</span>
            <hr/>
            <p>{props.summary}</p>
            <p>{props.description}</p>
        </section>
    </>
}
function Task( props ) {
    let checked = ' ';
    if (props.done) {
        checked = 'X'
    }
    return <>
        <li>[{checked}] {props.title}</li>
        {/*<p>*/}
        {/*    created on: {props.created} <br/>*/}
        {/*    must finish on: {props.deadline}<hr/>*/}
        {/*    {props.description}*/}
        {/*</p>*/}
    </>
}
function Learning( props ) {
    return null
}

export function TasksFromUser( props ) {
    if (props.tasks) {
        return <ul>
            {
                props.tasks.map((task) => {
                    // console.log(task)
                    return <Task key={'todo-' + task.title + task.id}
                                 done = {task.done}
                                 title = {task.title}
                                 created = {task.created}
                                 deadline = {task.deadline}
                                 description = {task.description}
                    />
                })
            }
        </ul>
    }
    return null
}
export function PostsFromUser( props ) {
    if (props.posts) {
        let posts = []
        for (let post in props.posts) {
            // console.log(props.posts[post])
            posts[post] = props.posts[post]
        }
        // console.log(posts)
        return <div>
            {
                posts.map((post) => {
                    return <Post
                        key = {'post' + post.id}
                        imageUrl = {post.imageUrl}
                        title = {post.title}
                        author = {post.author}
                        category = {post.category}
                        date = {post.date}
                        modified = {post.modified}
                        summary = {post.summary}
                        description = {post.description}
                    />
                })
            }

        </div>
    }
    return null;
}
export function FromProvince( props ) {
    if (props.fromProvince) {
        let users = [];
        for (let user in props.fromProvince){
            users[user] = props.fromProvince[user].username;
        }
        return <>
            <h4>Gebruikers uit dezelfde provincie</h4>
            {
                users.map((username) => {
                    return <li key={username}> - {username} </li>
                } )
            }
        </>
    }
    return null
}
export function WithEmail( props ) {
    if (props.withEmail) {
        let users = [];
        for (let user in props.withEmail){
            users[user] = props.withEmail[user].username + ' -> ' + props.withEmail[user].email;
        }
        return <>
            <h4>Gebruikers met hetzelfde mail adres als ingevoerd</h4>
            {
                users.map((user) => {
                    return <li key={user}> {user} </li>
                } )
            }
        </>
    }
    return null
}
export function WithLevel( props ) {
    if (props.withLevel) {
        let users = [];
        for (let user in props.withLevel){
            // console.log(props.withLevel[user].username)
            users[user] = props.withLevel[user].username;
        }
        return <>
            <h4>Gebruikers met hetzelfde level als gebruiker</h4>
            {
                users.map((username) => {
                    return <li key={username}> - {username} </li>
                } )
            }
        </>
    } else {
        return null
    }
}
export function Authorities( props ) {
    if (props.authorities) {
        let roles = [];
        for (let role in props.authorities) {
            if (props.authorities[role]) {
                // let thisRole = props.authorities[role].authority.substr(5).toLowerCase();
                let thisRole = props.authorities[role].authority;
                roles[role] = thisRole;
            }
            // console.log(props.authorities[role].authority.substr(5).toLowerCase());
        }
        return <>
            {
                roles.map((role) => {
                    return <span key={'rol' + role}> {role} </span>
                })
            }
        </>
    }
    return null
}
export function Birthdays( props ) {
    if (props.birthdays) {
        return <>{
            props.birthdays.map((user) => {
                return <span key={user}>@{user} is jarig! <a href='#'>Feliciteren</a><br/></span>
            })}
        </>
    } else {
        return <span>niemand is vandaag jarig</span>
    }
}
export function Provinces( props ) {
    if (props.provinces) {
        return <>
            <div>
                <label htmlFor={'provincies'}>In welke provincie woon je?</label>
                <select name={'provincies'} id={'provincies'}>
                    <option value={'HIDDEN'}>Maak een keuze</option>
                    {
                        props.provinces.map((p) => {
                            if (p !== "HIDDEN") {
                                return <option key={p} value={p}>{p}</option>
                            }
                            return null
                        })
                    }
                </select>
            </div>

        </>
    } return null
}
export function UserStats(props) {
    let current = props.stats[0];
    let start = props.stats[1];
    let limit = props.stats[2];

    return <>
        LEVEL [ {current} ] [ {start} >>> {limit} ] {}
    </>
}

export function Users( props ) {
    if (props.user) {
        let username = props.user[0];
        let email = props.user[1];
        let level = props.user[2];
        let xp = props.user[3];
        let limit = props.user[4];
        let name = props.user[5];
        let province = props.user[6];

        let stats = [];
        if (!props.stats) {
            stats = ['current', 'start','limit'];
        } else {
            stats = props.stats;
        }
        let authorities = [];
        if (!props.authorities) {
            authorities = ['onbekend']
        } else {
            authorities = props.authorities
        }

        return <>
            <div>
                <h3>{props.title}</h3>
                <span>er zijn in totaal {props.count} {props.title}</span>
                <hr/>
                <div>
                    <span> @{username} -> {email} </span>
                    <hr/>
                    <ul>
                        <li>Naam: {name}</li>
                        <li>Komt uit: {province}</li>
                        <li>Huidig level: {level}</li>
                        <li>{xp} >>>> {limit}</li>
                    </ul>
                    <hr/>
                    <Authorities authorities = {authorities}/>
                </div>
                <div>
                    <span>STATS @itiskevin</span><hr/>
                    <UserStats stats={stats}/>
                </div>
                <div>
                    <Provinces provinces = {props.provinces}/>
                </div>
                <div>
                    <Birthdays birthdays = {props.birthdays}/>
                </div>
                <div>
                    <WithLevel withLevel = {props.withLevel}/>
                </div>
                <div>
                    <WithEmail withEmail = {props.withEmail}/>
                </div>
                <div>
                    <FromProvince fromProvince = {props.fromProvince}/>
                </div>
            </div>
        </>
    } return null
}

export function Hello( props ) {
    return <>
        <h2>{props.title}</h2>
    </>
}
export function DeveloperDash( props ) {
    // kijk of huidige gebruiker developer is
    if (props.isDeveloper) {
        // kijk of de server online is
        if (props.isServerRunning) {
            // kijk of er errors zijn
            if (props.errors) {
                return <>
                    <p>SERVER ONLINE
                        <br/>ERRORS:<br/>
                        {
                            props.errors.map( (error) => {
                                return {error} + " "
                            })
                        }
                    </p>
                </>
            }
            // geen errors
            return <>
                <p>SERVER ONLINE
                    <br/>NO ERRORS :-)
                </p>
            </>
        } else {
            // server is offline
            return <>
                <p>SERVER OFFLINE :-(</p>
            </>
        }
    }
    return null // als gebruiker geen developer is
}

export default Learning;