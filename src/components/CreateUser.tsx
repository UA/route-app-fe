import { FC, useState } from 'react';
import {
    Button, Checkbox, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter,
    DrawerHeader, DrawerOverlay, FormControl, FormErrorMessage, FormLabel, Input,
    InputGroup, InputRightElement, Stack
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { UserFormValues } from '../models/userModel';
import { userStore } from '../store/userStore';
import { passwordReqex } from '../utils/constants';

interface IProps { }

const CreateUser: FC<IProps> = () => {
    const { isCreateUserOpen, onCreateUserClose, createUser } = userStore()

    const [showPassword, setShowPassword] = useState(false);

    const userSchema = yup.object().shape({
        firstName: yup.string().required("First name is a required field"),
        lastName: yup.string().required("Last name is a required field"),
        email: yup.string()
            .email("Please enter a valid email").required("Email is a required field"),
        password: yup
            .string()
            .matches(passwordReqex, { message: "Please create a stronger password" })
            .required("Password is a required field"),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty, isValid },
    } = useForm<UserFormValues>({
        mode: "onChange", resolver: yupResolver(userSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: true
        }
    });

    const handleShowClick = () => setShowPassword(!showPassword);

    const onSubmit = (values: UserFormValues) => {
        createUser({
            firstName: values.firstName ?? '',
            lastName: values.lastName ?? '',
            email: values.email ?? '',
            password: values.password ?? '',
            role: values.role ? 'User' : 'Admin'
        })
        reset({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        })
    }


    return (
        <>
            <Drawer isOpen={isCreateUserOpen} placement="right" onClose={onCreateUserClose}>
                <DrawerOverlay />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DrawerContent>
                        <DrawerCloseButton
                            onClick={() => {
                                onCreateUserClose();
                            }}
                        />
                        <DrawerHeader>Create User</DrawerHeader>

                        <DrawerBody>
                            <Stack spacing={'24px'}>
                                <FormControl isInvalid={!!errors?.firstName?.message}>
                                    <FormLabel>First name:</FormLabel>
                                    <Input type="text" {...register('firstName')} />
                                    <FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={!!errors?.lastName?.message}>
                                    <FormLabel>Last name:</FormLabel>
                                    <Input type="text" {...register('lastName')} />
                                    <FormErrorMessage>{errors?.lastName?.message}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={!!errors?.email?.message}>
                                    <FormLabel>Email:</FormLabel>
                                    <Input
                                        type="email" {...register('email')} />
                                    <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={!!errors?.password?.message}>
                                    <InputGroup>
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

                                <FormControl display="flex" alignItems="center" isInvalid={!!errors?.role?.message}>
                                    <Checkbox
                                        colorScheme="teal"
                                        size="lg"
                                        checked
                                        disabled
                                        {...register('role')}
                                    />
                                    <FormLabel mb="0" ml="10px">User</FormLabel>
                                    <FormErrorMessage>{errors?.role?.message}</FormErrorMessage>
                                </FormControl>
                            </Stack>
                        </DrawerBody>

                        <DrawerFooter>
                            <Button
                                variant="outline"
                                mr={3}
                                onClick={() => {
                                    onCreateUserClose();
                                    reset({
                                        firstName: '',
                                        lastName: '',
                                        email: '',
                                        password: '',
                                    })
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                colorScheme="teal"
                                onClick={handleSubmit(onSubmit)}
                                disabled={!isDirty || !isValid}
                            >
                                Save
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </form>
            </Drawer>
        </>
    )
}

export default CreateUser