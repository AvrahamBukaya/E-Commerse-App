import React, { useRef, useState } from 'react'
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/router'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BsFillEyeFill } from 'react-icons/bs'


const SignupComp = () => {

  const [errors, setErrors] = useState({
    password: "",
    passwordConfirm: ""
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const router = useRouter();


  const emailRef = useRef("");
  const passwordRef = useRef("");
  const passwordConfirmRef = useRef("");
  const { signup, currentUser } = useAuth();


  const toggleShowPassword = () => {
    setshowPassword(!showPassword);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const regex = /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/g
    switch (name) {
      case 'password':
        {
          if (!value.match(regex)) {
            setErrors(prevState => {
              return { ...prevState, [name]: 'At least 8 characters, min 1 Uppercase 1 Lowercase 1 Number 1 special character and only contains symbols from the alphabet, numbers and chosen special characters' }
            })
            return;
          }
          setErrors(prevState => {
            return { ...prevState, [name]: '' }
          });
        }
      case 'passwordConfirm':
        {
          if (value !== passwordRef.current.value) {
            setErrors(prevState => {
              return { ...prevState, [name]: 'The password are not identical' }
            })
            return
          }
          setErrors(prevState => {
            return { ...prevState, [name]: '' }
          });
        }
    }


  }



  const isAnyError = () => {
    const keys = Object.keys(errors);

    keys.forEach(v => {
      if (errors[v].length !== 0) {
        console.log(v);
        setIsSubmit(prev => prev = false);
        return
      }
      setIsSubmit(prev => prev = true);



    });



  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    isAnyError();
    const { value: email } = emailRef.current;
    const { value: password } = passwordRef.current;


    if (isSubmit) {
      try {
        setErrors(null);
        await signup(email, password);
      } catch (e) {
        console.log(`Error occured, see more: ${e.message}`);
      }

      console.log(isSubmit);

    } else {
      console.log('Error');
      return;
    }

  }




  return (
    <Container className='d-flex align-items-center justify-content-center'
      style={{ minHeight: "100vh" }}
    >
      <div className='w-100' style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className='text-center mb-4'>Sign Up</h2>
            {/* {JSON.stringify(currentUser)} */}

            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className='mb-5'>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password" className='mb-5'>
                <Form.Label>Password</Form.Label>
                <Form.Control type={showPassword ? "test" : "password"} ref={passwordRef} name="password" required onChange={handleChange} />
                <BsFillEyeFill onClick={toggleShowPassword} />




                {!!errors?.['password'] && <Alert variant='danger' className='mb-3'>{errors['password']}</Alert>}
              </Form.Group>

              <Form.Group id="password-confirm" className='mb-5'>
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} name="passwordConfirm" required onChange={handleChange} />
                {!!errors?.['passwordConfirm'] && <Alert variant='danger' className='mb-3'>{errors['passwordConfirm']}</Alert>}
              </Form.Group>


              <Button type="submit" className='w-100'>Sign Up</Button>
            </Form>


          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an  account? Login
        </div>
      </div>
    </Container >
  )
}


export default SignupComp;
