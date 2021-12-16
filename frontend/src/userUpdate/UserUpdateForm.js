import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'




const UserUpadteForm = () => {

    const [formInfo, setFormInfo] = useState({
        "name": '',
        "avatar": ''
    });

    const chgForm = (e) => {

        let { name, value } = e.target;

        setFormInfo({
        ...formInfo,
        [name]: value,
        });
        
        console.log(formInfo);

    };

    const handlerSubmit = async (e)=>{
        e.preventDefault();

        await axios.post('/api/member/edit', formInfo, {
            headers: { "Content-Type": `application/json`}
            }
            ).then((res) => {
                console.log(res.data);
                if(res.data !== null){
                    alert('수정완료');
                } else{
                    alert('수정실패');
                }
            });
    }
    
    useEffect(async () => {

        try{
            const response = await fetch('/api/members/edit', {
                method: 'get',
                mode:'cors',                          // no-cors, cors, same-origin
                credentials:'include',                // include, omit, same-origin
                cache:'no-cache',                     // no-cache, reload, force-cache, default*
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                redirect:'follow',                    // follow*, error, manual(response.url)
                referrer:'client',                    // no-refferer, *client
                body: null
            });

            const jsonResult = await response.json();
            console.log(jsonResult);
            if(jsonResult.result !== 'success') {
            throw new Error(`${jsonResult.result} ${jsonResult.message}`);
            }

            console.log(jsonResult.data);
            console.log(jsonResult.data.avatar);
            console.log(jsonResult.data.name);
            setFormInfo({'name':jsonResult.data.name,'avatar':"imageUrl"});
            
        } catch(err){

        }
    },[]);
    const styles ={
        backgroundImage:formInfo.avatar
    }
    return (
        <div>
            <div id='avatarImage' style={styles}>{formInfo.avatar}</div>
            <form className='UpdateForm' onSubmit={handlerSubmit}>
                <input type='text' name ='name' onChange={chgForm} value={formInfo.name}/>
                <input type='file' name ='avatar' onChange={chgForm}/>
                <input type='submit' value='수정'/>
            </form>



            <div className='User UpdateForm'>
           
            <Form onSubmit={handlerSubmit} >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label >Email address</Form.Label>
                    <Form.Control type="email" placeholder="Email"  name='email' disabled/>
                    <Form.Text className="text-muted">
                   
                    </Form.Text>
                </Form.Group>

               
              
                
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name"  name='name'/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" placeholder="Phone"  name='phone'/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Company</Form.Label>
                    <Form.Control type="text" placeholder="Company"  name='company'/>
                </Form.Group>
                <Button variant="primary" type="button">
                    돌아가기
                </Button>
                <Button variant="primary" type="submit">
                    회원정보 수정
                </Button>
            </Form>
        </div>
    





        </div>
    );
};

export default UserUpadteForm;

