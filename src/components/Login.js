import React from 'react';
import 'antd/dist/antd.css';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';



const App = () => {
  let navigate = useNavigate();
  
  const onFinish = (values) => {
    navigate('/dashboard');
    console.log('Received values of form: ', values);
  };

  return (
    <div style={{background: '#FFE4CC' , position: 'absolute', width: '1920px', height: '1080px',left: '0px',top: '0px'}}>
    <div style={{ marginLeft:'600px' , marginTop:'200px' , backgroundColor:'#FFFFFF' , border: '1px solid' , width: '400px',height: '300px',
    borderRadius: '16px' , boxShadow:'0px 4px 12px rgba(90, 41, 5, 0.12)' , paddingLeft : '45px' , paddingTop:'10px'}}>
    <h1  style={{fontFamily: 'Nunito',fontStyle: 'normal',fontWeight: '800',fontSize: '35px',lineHeight: '140%'}}>Sign In</h1>
      <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
       >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input  placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <a className="login-form-forgot" href="">
          <span  style={{color:'orange'}}>Forgot password ?</span> 
        </a>
      </Form.Item>
      <Form.Item>
        <Button   htmlType='submit' style={{backgroundColor :'#F89E53' , color:'white' , borderRadius:'10PX' , width:'300px' , height:'40px'}}>Login</Button>
      </Form.Item>
    </Form>
  </div>
    </div>
    
   
  );
};

export default App;
