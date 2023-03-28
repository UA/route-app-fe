import { Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="gray.200"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >
                <Heading color="teal.400" size='4xl'>404</Heading>
                <Text fontSize='xl'>
                    Page Not Found
                </Text>
                <Button leftIcon={<AiOutlineArrowLeft />}
                    size='md'
                    height='48px'
                    width='200px'
                    border='2px'
                    borderColor='teal.500'
                    onClick={() => navigate('/')}
                >
                    Home
                </Button>
            </Stack>
        </Flex>
    )
}

export default NotFoundPage