import React, { useState } from 'react';
import NavRight from '../layout/NavRight';
import NavTop from '../layout/NavTop';
import WelcomeStyle from '../assets/css/Welcome.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';




const Welcome = ({FileInput}) => {

    const [createTeamName, setCreateTeamName] = useState('');
    let warningText = '';
    //Welcome Div style
    const styles1 = {
        float: 'left',
        height: '100vh',
        width: '75%'
    }

    //NavRight style
    const styles2 = {
        color:'white',
        padding:'10%',

    }

    const chgForm = (e) => {
        setCreateTeamName(e.target.value);
        //console.log('chg',createTeamName);
    }

    /**
     *  팀 생성 핸들러
     */
    const handlerSubmit = async (e) => {
        e.preventDefault();

        if (createTeamName == '') {
            warningText = '팀명을 입력해주세요.'
            alert('팀명을 입력해주세요');
            return;
        }
        console.log('111111111111111111111111111111111111');
        console.log('teamName', JSON.stringify({'teamName':createTeamName}));

        const response = await fetch('/api/team/create', {
            method: 'post',
            mode: 'cors',
            credentials: 'include',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            redirect: 'follow',
            referrer: 'client',
            body: JSON.stringify({'teamName':createTeamName})
        });

        const data = await response.json();
        console.log('welcome',data);

        location.href = `/${data.teamId}/main`
    }

    return (
        <div>
            <div style={styles1}>
                <NavTop />
                <div className={WelcomeStyle.WelcomeDiv}>
                    <div className={WelcomeStyle.BodyLeft}>
                        <div className={WelcomeStyle.BodyLeftOuter}>
                            <div className={WelcomeStyle.BodyLeftInner}><h2 style={styles2}>팀 생성하기</h2></div>
                            <div className={WelcomeStyle.BodyLeftInner2}>
                                <Form onSubmit={handlerSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label></Form.Label>
                                        <Form.Control type="text" placeholder="TeamName" name="teamName" onChange={chgForm} />
                                        <Form.Text className="text-muted">
                                        {warningText}
                                        </Form.Text>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className={WelcomeStyle.CreateButton}>
                                        생성하기
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <div className={WelcomeStyle.BodyRight}>
                        <div className={WelcomeStyle.BodyRightInner}>
                            <div className={WelcomeStyle.BodyRightInner2}>
                                <h2 className={WelcomeStyle.WelcomeText}>핑퐁 서비스를 이용해주셔서 
                                    <br/>감사합니다.</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NavRight style={styles2} FileInput={FileInput}/>
        </div>
    );
};

export default Welcome;