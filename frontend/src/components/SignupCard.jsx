
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import authScreenAtom from '../atoms/authAtom'
import useShowToast from '../hooks/useShowToast.js'
import userAtom from '../atoms/userAtom.js'

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false)
  const setAuthScreen = useSetRecoilState(authScreenAtom)
  const showToast = useShowToast();  
  const setUser = useSetRecoilState(userAtom) 
  const [inputs, setInputs] = useState({
    name : "",
    username : "",
    email : "",
    password : "",
  })


  const handleSignup = async () => {
    try {
        console.log(inputs);
        
        const res = await fetch("/api/users/signup", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(inputs)
        })

        const data = await res.json();
        console.log(data);
        if (data.error) {
            showToast("Error", data.error, "error")

            return
        }

        localStorage.setItem("user-threads", JSON.stringify(data))
        setUser(data)
        
    } catch (error) {
        console.log(error);
        
    }
  }
  return (
    <Flex
      align={'center'}
      justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.dark')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input type="text" onChange={(e) => setInputs({...inputs, name : e.target.value})} 
                  value={inputs.name}  />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel>UserName</FormLabel>
                  <Input type="text" onChange={(e) => setInputs({...inputs, username : e.target.value})} 
                  value={inputs.username}  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl  isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="text" onChange={(e) => setInputs({...inputs, email : e.target.value})} 
                  value={inputs.email}  />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} onClick={() => setShowPassword((showPassword) => !showPassword)} onChange={(e) => setInputs({...inputs ,password : e.target.value})} 
                    value={inputs.password} />

                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={useColorModeValue("gray.600", "gray.700")}
                color={'white'}
                _hover={{
                  bg: useColorModeValue("gray.700", "gray.800")
                }}
                onClick={handleSignup}
                >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'} onClick={()=> setAuthScreen("login") }>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}