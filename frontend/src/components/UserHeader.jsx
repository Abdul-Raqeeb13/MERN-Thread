import React from 'react';
import { Link } from 'react-router-dom';
import { VStack, Box, Menu, MenuButton, Portal, Avatar, Flex, Text, MenuList, MenuItem, useToast } from '@chakra-ui/react';
import { BsInstagram } from 'react-icons/bs';
import { CgMoreO } from 'react-icons/cg';
const UserHeader = () => {

    const toast = useToast()
    const copyURL = () => {
        const currentURL = window.location.href
        navigator.clipboard.writeText(currentURL).then(()=>{
            toast({description : "Copied"})
        })
    }
    return (
        <VStack gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} fontWeight={'bold'}>Mark Zuckerberg</Text>
                    
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}>markzuckerberg</Text><Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>
                            threads.net
                        </Text>
                    </Flex>
                </Box>

                <Box>
                    <Avatar name="Mark Zuckerberg" src='../../public/zuck-avatar.png' size={{
                        base: "md",
                        "md": "xl" 
                    }}></Avatar>
                </Box>
            </Flex>

            <Text>
                C-Founder executive chairmain and CEO of Meta Platform
            </Text>
            <Flex w={'full'} justifyContent={"space-between"} >
                <Flex gap={2} alignItems={'center'}>
                    <Text color={'gray.light'}>3.2k followers</Text>
                    <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
                    <Link color={'gray.light'}>instagram.com</Link>
                </Flex>
                <Flex gap={2}>
                    <Box>
                        <BsInstagram size={24} cursor={"pointer"} />
                    </Box>
                    <Box>
                        <Menu>
                            <MenuButton>
                                <CgMoreO size={24} cursor={"pointer"} />
                            </MenuButton>
                            <Portal>
                                <MenuList bg={"gray.dark"}>
                                    <MenuItem bg={"gray.dark"} onClick={copyURL}>Copy Link</MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>

                    </Box>
                </Flex>
            </Flex>

            <Flex w={'full'}>
                <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb={3} cursor={'pointer'}>Threads</Flex>
                <Flex flex={1} borderBottom={"1px solid gray"} color={"gray.light"} justifyContent={"center"} pb={3} cursor={'pointer'}>Replies</Flex>
            </Flex>

        </VStack>
    );
};

export default UserHeader

