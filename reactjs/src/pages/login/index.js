import Logo from '../../assets/img/logo.png'

import { Container, ChatButton, ChatInput } from "./styled"

//import Api from '../../service/api'
//const api = new Api();

export default function Login() {
    return(
        <Container>
            <div className="box">
                <div className="titulo">
                    <img src={Logo} alt="" style={{width: '80px', height: '80px'}} /><br /> <span>D e v</span> S t o r e
                </div>
            </div>

            <div className="login">
                <div className="container-form">
                    <div className="form-row">
                        <div className="title">Faça seu Login</div>
                    </div>

                    <div className="form-row">
                        <div>
                            <div className="label">Login </div>
                            <ChatInput style={{ border: '1px solid gray', fontSize: '1.5em' }} />
                        </div>
                        <div>
                            <div className="label">Senha </div>
                            <ChatInput type="password" style={{ border: '1px solid gray', fontSize: '1.5em' }} />
                        </div>
                        <div>
                            <ChatButton> Login </ChatButton>
                        </div>
                    </div>
                </div>

            </div>
        </Container>
    )
}