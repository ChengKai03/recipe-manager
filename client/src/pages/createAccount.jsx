import Panel from "../components/panel";


export default function CreateAccount(){

    return(
        <>
            <Panel content={
                <>
                    
                    <span className="heading">Creat an Account</span>
                    <form className="login-field">
                        <input className="input-field" type="text" placeholder="Username" name="username"/>
                        <input className="input-field" type="password" placeholder="Password" name="password"/>
                        <input className="input-field" type="password" placeholder="Enter password again" name="passwordVerified"/>
                    </form>
                    <button>Create Account</button>
                </>
            }/>
        </>
    )
}
