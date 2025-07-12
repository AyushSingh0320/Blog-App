import React from 'react'
import { Container, Login as LoginComponent } from '../Components'

function LoginPage() {
  return (
    <div className='py-8 px-2 sm:px-8'>
        <Container>
            <LoginComponent />
        </Container>
    </div>
  )
}

export default LoginPage;