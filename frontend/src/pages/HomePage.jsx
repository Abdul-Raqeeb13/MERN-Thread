import React from 'react'
import { Link } from 'react-router-dom'
import { Flex, Button } from '@chakra-ui/react' // if you're using Chakra UI

function HomePage() {
  return (
    <Link to="/markzuckerberg">
      <Flex w="full" justifyContent="center">
        <Button mx="auto">Visit profile page</Button>
      </Flex>
    </Link>
  )
}

export default HomePage
