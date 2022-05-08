import React from 'react'
import { FaLock } from 'react-icons/fa'
import { Link, Route, Routes } from 'react-router-dom'

import OAuthLinks from '../components/OauthLinks'

import { EmailPassword } from './email-password'
import { EmailPasswordless } from './email-passwordless'
import AuthLayout from '../components/AuthLayout'
import { Center, Text, Anchor, Divider } from '@mantine/core'
import AuthLink from '../components/AuthLink'

const Index: React.FC = () => (
  <>
    <OAuthLinks />
    <Divider my="sm" />
    <AuthLink icon={<FaLock />} variant="outline" link="/sign-up/email-passwordless">
      Continue with passwordless email
    </AuthLink>
    <AuthLink variant="subtle" link="/sign-up/email-password">
      Continue with email + password
    </AuthLink>
  </>
)
export const SignUpPage: React.FC = () => {
  return (
    <AuthLayout
      title="Sign up"
      footer={
        <Center>
          <Text>
            Already have an account?{' '}
            <Anchor component={Link} to="/sign-in">
              Log in
            </Anchor>
          </Text>
        </Center>
      }
    >
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/email-password" element={<EmailPassword />} />
        <Route path="/email-passwordless" element={<EmailPasswordless />} />
      </Routes>
    </AuthLayout>
  )
}
