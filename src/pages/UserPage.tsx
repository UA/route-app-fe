import { useEffect } from "react";
import {
    Button,
    Container,
    Box,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    Avatar,
} from "@chakra-ui/react";
import { AiFillDelete, AiOutlineAim, AiOutlinePlus } from 'react-icons/ai';
import { userStore } from "../store/userStore";
import CreateOrEditUser from "../components/CreateUser";
import AddUserCoordinate from "../components/AddUserCoordinate";
import { coordinateStore } from "../store/coordinateStore";
import Loading from "../components/Loading";

const UserPage = () => {
    const { fetchUsers, users, onCreateUserOpen, deleteUser, isUserLoading } = userStore()
    const { setUserId, fetchCoordinates, isCoordinateLoading } = coordinateStore()

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    if (isUserLoading || isCoordinateLoading) {
        return <Loading />
    }

    return (
        <Container maxW={'full'} p="4" fontSize={'18px'}>
            <Box mt="5" rounded={'lg'} boxShadow="base">
                <Box p="4" display={'flex'} justifyContent="space-between">
                    <Text fontSize="xl" fontWeight="bold">
                        List Users
                    </Text>
                    <Button
                        colorScheme="teal"
                        variant="outline"
                        maxW={'300px'}
                        minW="150px"
                        leftIcon={<AiOutlinePlus fontSize={'20px'} />}
                        onClick={() => onCreateUserOpen()}
                    >
                        Add User
                    </Button>
                </Box>
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th></Th>
                                <Th>First Name</Th>
                                <Th>Last Name</Th>
                                <Th>Email</Th>
                                <Th>Role</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {users && users.map((user) => {
                                return (
                                    <Tr key={user.id}>
                                        <Td>
                                            <Avatar name={user.firstName + ' ' + user.lastName} />
                                        </Td>
                                        <Td>{user.firstName}</Td>
                                        <Td>{user.lastName}</Td>
                                        <Td>{user.email}</Td>
                                        <Td>{user.role}</Td>
                                        <Td>
                                            <Box display="flex" gap="1">
                                                <Button
                                                    colorScheme="blue"
                                                    onClick={() => {
                                                        setUserId(user.id)
                                                        fetchCoordinates(user.id)
                                                    }}
                                                >
                                                    <AiOutlineAim />
                                                </Button>
                                                <Button colorScheme={'red'}
                                                    onClick={() => deleteUser(user.id)}>
                                                    <AiFillDelete />
                                                </Button>
                                            </Box>
                                        </Td>
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
            <CreateOrEditUser />
            <AddUserCoordinate />
        </Container>
    );
};

export default UserPage;
