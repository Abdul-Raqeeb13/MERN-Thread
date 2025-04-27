import { Box, Flex, Avatar, Text, Image, Divider, Stack, Button, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from '../components/Actions'
import Comment from '../components/Comment'
// import { BsThreeDots } from 'react-icons/bs'
// import { Link } from 'react-router-dom'
// import Actions from './Actions'

function PostPage() {

  const [liked, setLiked] = useState(false)

  return (
    <>
      <Flex>
        <Flex w={'full'} alignItems={"center"} gap={3} >
          <Avatar name='MZ' src='../../public/zuck-avatar.png' size={"md"} />
          <Flex >
            <Text fontWeight={'bold'} fontSize={"sm"} >markzuckerberg</Text>
            <Image src='../../public/verified.png' w={4} h={4} ml={4} />
          </Flex>
        </Flex>

        <Flex gap={4} alignItems={'center'} >
          <Text fontSize={"sm"}>1d</Text>
          <BsThreeDots />
        </Flex>
      </Flex>

      <Text my={3}>Lets talk about thrads</Text>
      <Box borderRadius={6} overflow={'hidden'} border={"1px solid gray"}>
        <Image src={"../../public/post1.png"} alt='' />
      </Box>

      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>

      <Flex alignItems={"center"} gap={2}>
        <Text fontSize={"sm"} color={"gray.light"}>238 replies</Text>
        <Box w={0.5} h={0.5} borderRadius={'full'} bg={"gray.light"}></Box>
        <Text fontSize={"sm"} color={"gray.light"}>{135 + (liked ? 1 : 0)} likes</Text>
      </Flex>

      <Divider my={4} />

      <Flex justifyContent={'space-between'} alignItems={"center"} gap={3}>
        <Flex alignItems={'center'} gap={3}>
          <Text fontSize={'3xl'}>👋</Text>
          <Text fontSize={'md'} color={"gray.light"}>Get the app to like , reply and post</Text>
        </Flex>
        <Button colorScheme="gray" variant="solid">
          Get
        </Button>
      </Flex>

      <Divider my={4} />

      <Comment comment="Looks really good i"  createdAt="2d" likes={100} username="Jhondoe" userAvatar="http://bit.ly/dan-abramov"/>
      <Comment comment="Looks really good i like"  createdAt="2d" likes={200} username="Jhondoe" userAvatar="http://bit.ly/dan-abramov"/>
      <Comment comment="Looks really good i like it"  createdAt="2d" likes={300} username="Jhondoe" userAvatar="http://bit.ly/dan-abramov"/>
      <Comment comment="Looks really good i like it keep doing"  createdAt="2d" likes={400} username="Jhondoe" userAvatar="http://bit.ly/dan-abramov"/>

    </>
  )
}

export default PostPage
