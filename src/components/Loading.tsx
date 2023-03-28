import { Flex, Spinner, Stack } from '@chakra-ui/react';

const Loading = () => {
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
                <Spinner />
            </Stack>
        </Flex>
    )
};

export default Loading;
