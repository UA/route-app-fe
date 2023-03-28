import React, { FC, useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
    Button,
} from '@chakra-ui/react'
import NavBar from './NavBar'
import { FiMenu } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { getUserData } from '../utils/tokenHelper'
import { authStore } from '../store/authStore'
interface IProps { }
const SideBar: FC<IProps> = () => {
    const navigate = useNavigate();
    const [navSize, changeNavSize] = useState("large")
    const { logout } = authStore()
    const user = getUserData()
    return (
        <Flex
            pos="sticky"
            left="5"
            h="95vh"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize === "small" ? "10px" : "20px"}
            w={navSize === "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize === "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize === "small")
                            changeNavSize("large")

                        else
                            changeNavSize("small")
                    }}
                    aria-label={''} />
                <NavBar navSize={navSize} />
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize === "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize === "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" src="avatar-1.jpg" />
                    <Flex flexDir="column" ml={4} display={navSize === "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">{user?.firstName + ' ' + user?.lastName}</Heading>
                        <Text color="gray">{user?.role}</Text>
                        <Button
                            onClick={() => {
                                navigate('/login')
                                logout()
                            }}
                        >Logout</Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default SideBar;