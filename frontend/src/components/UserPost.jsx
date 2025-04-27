import { Box, Flex, Avatar, Text, Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Actions from './Actions'

function UserPost({ postImg, postTitle, likes, replies }) {

    const [liked, setLiked] = useState(false)

    return (
        <>
            {/* <h1>UserPost</h1> */}
            <Link to={"/markzuckerberg/post/1 "}>
                <Flex gap={2} mb={4} py={5}>
                    <Flex flexDirection={"column"} alignItems={'center'}>
                        <Avatar size="md" name='Mark Zuckerburg' src='/public/zuck-avatar.png' />
                        <Box w="1px" h={"full"} bg="gray.light" my={2}></Box>
                        <Box position={"relative"} w={'full'}>
                            <Avatar size={'xs'} name='jhon doe ' src='http://bit.ly/dan-abramov' position={'absolute'} top={'0px'} left={'15px'} padding={'2px'} />
                            <Avatar size={'xs'} name='jhon doe ' src='http://bit.ly/dan-abramov' position={'absolute'} bottom={'0px'} right={'-5px'} padding={'2px'} />
                            <Avatar size={'xs'} name='jhon doe ' src='http://bit.ly/dan-abramov' position={'absolute'} bottom={'0px'} left={'4px '} padding={'2px'} />
                        </Box>
                    </Flex>
                    <Flex flex={1} flexDirection={"column"} gap={2}>
                        <Flex justifyContent={'space-between'} w={'full'}>
                            <Flex w={'full'} alignItems={'center'}>
                                <Text fontSize={"sm"} fontWeight={'bold'} >Markzuckerberg</Text>
                                <Image src={"../../public/verified.png"} w={4} h={4} ml={1} alt='' />
                            </Flex>
                            <Flex gap={4} alignItems={"center"}>
                                <Text fontStyle={'sm'} color={"gray.light"}>1d</Text>
                                <BsThreeDots />
                            </Flex>
                        </Flex>


                        <Text>{postTitle}</Text>
                        {postImg && (
                            <Box borderRadius={6} overflow={'hidden'} border={'1px solid gray'}>
                                <Image src={postImg} w={'full'}></Image>
                            </Box>
                        )}


                        <Flex gap={3} my={1}>
                            <Actions liked={liked} setLiked={setLiked} />
                        </Flex>

                        <Flex gap={2} alignItems={'center'}>
                            <Text color={"gray.light"} fontSize={'sm'}>{replies} replies</Text>
                            <Box w={0.5} h={0.5} borderRadius={'full'} bg={"gray.light"}></Box>
                            <Text color={"gray.light"} fontSize={'sm'}>{likes} Likes</Text>
                        </Flex>

                    </Flex>
                </Flex>
            </Link>
        </>
    )
}

export default UserPost
