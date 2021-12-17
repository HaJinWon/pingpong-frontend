import React from 'react';
import NavRight from '../layout/NavRight';
import NavTop from '../layout/NavTop';
import WelcomeStyle from '../assets/css/Welcome.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Welcome = () => {

    //Welcome Div style
    const styles1 ={
        float:'left',
        height:'100vh',
        width:'75%'
    }

    //NavRight style
    const styles2 ={
        
    }
    return (
        <div>
            <div style ={styles1}>
                <NavTop/>
                <div className={WelcomeStyle.WelcomeDiv}><h1>Welcome</h1>
                <div className={WelcomeStyle.BodyLeft}>
                    <div className={WelcomeStyle.BodyLeftInner}><h2>팀 생성하기</h2></div>
                    <div className={WelcomeStyle.BodyLeftInner2}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>팀명을 입력해주세요.</Form.Label>
                            <Form.Control type="text" placeholder="TeamName" />
                            <Form.Text className="text-muted">
                        
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            생성하기
                        </Button>
                        </Form>
                    </div>
                </div>
                <div className={WelcomeStyle.BodyRight}>bb</div>
                </div>                                
            </div>
            <NavRight style={styles2}/>
        </div>
    );
};

export default Welcome;