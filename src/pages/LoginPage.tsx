import { useState } from "react";
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Avatar,
    FormControl,
    InputRightElement,
    FormErrorMessage,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { LoginFormValues } from "../models/authModel";
import { authStore } from "../store/authStore";
import { Navigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { getUserData } from "../utils/tokenHelper";
import Loading from "../components/Loading";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LoginPage = () => {
    const { login, isLoading } = authStore()
    const user = getUserData();
    const [showPassword, setShowPassword] = useState(false);


    const loginSchema = yup.object().shape({
        email: yup.string().email("Please enter a valid email").required("Email is a required field"),
        password: yup
            .string()
            .required("Password is a required field"),
    });

    const handleShowClick = () => setShowPassword(!showPassword);

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<LoginFormValues>({
        mode: "onBlur", resolver: yupResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = (values: LoginFormValues) => {
        login(values.email, values.password)
    }

    if (user !== null) {
        return <Navigate replace to="/" />
    }

    if (isLoading) {
        return <Loading />
    }

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
                <Avatar bg="teal.500" />
                <Heading color="teal.400">Welcome</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack
                            spacing={4}
                            p="1rem"
                            backgroundColor="whiteAlpha.900"
                            boxShadow="md"
                        >
                            <FormControl isInvalid={!!errors?.email?.message}>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaUserAlt color="gray.300" />}
                                    />
                                    <Input
                                        type="email"
                                        placeholder="email address"
                                        {...register('email')} />
                                </InputGroup>
                                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors?.password?.message}>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.300"
                                        children={<CFaLock color="gray.300" />}
                                    />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        {...register('password')}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                            {showPassword ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
                            </FormControl>
                            <Button
                                borderRadius={0}
                                onClick={handleSubmit(onSubmit)}
                                variant="solid"
                                colorScheme="teal"
                                width="full"
                                disabled={!isDirty || !isValid}
                            >
                                Login
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
};

export default LoginPage;
