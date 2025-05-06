
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
} from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import { useRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import { useState } from 'react'

export default function UpdateProfilePage() {
    const [user, setUser] = useRecoilState(userAtom)
    const [inputs, setInputs] = useState({
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        password: "",
    })

    console.log(user, "user is here");

    const handleSignup = async () => {
        try {
            console.log(inputs);

            const res = await fetch("/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs)
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
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                    User Profile Edit
                </Heading>
                <FormControl>
                    <FormLabel>User Icon</FormLabel>
                    <Stack direction={['column', 'row']} spacing={6}>
                        <Center>
                            <Avatar size="xl" src={user.profilePic}>
                                <AvatarBadge
                                    as={IconButton}
                                    size="sm"
                                    rounded="full"
                                    top="-10px"
                                    colorScheme="red"
                                    aria-label="remove Image"
                                    icon={<SmallCloseIcon />}
                                />
                            </Avatar>
                        </Center>
                        <Center w="full">
                            <Button w="full">Change Icon</Button>
                        </Center>
                    </Stack>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Full name</FormLabel>
                    <Input
                        placeholder="UserName"
                        _placeholder={{ color: 'gray.500' }}
                        type="text" onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                        value={inputs.name}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>User name</FormLabel>
                    <Input
                        placeholder="UserName"
                        _placeholder={{ color: 'gray.500' }}
                        type="text" onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        value={inputs.username}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                        placeholder="your-email@example.com"
                        _placeholder={{ color: 'gray.500' }}
                        type="email" onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                        value={inputs.email}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Bio</FormLabel>
                    <Input
                        placeholder="Your Bio... "
                        _placeholder={{ color: 'gray.500' }}
                        type="email" onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
                        value={inputs.bio}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                        placeholder="password"
                        _placeholder={{ color: 'gray.500' }}
                        type="password" onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        value={inputs.password}
                    />
                </FormControl>
                <Stack spacing={6} direction={['column', 'row']}>
                    <Button
                        bg={'red.400'}
                        color={'white'}
                        w="full"
                        _hover={{
                            bg: 'red.500',
                        }}>
                        Cancel
                    </Button>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        w="full"
                        _hover={{
                            bg: 'blue.500',
                        }}>
                        Submit
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    )
}