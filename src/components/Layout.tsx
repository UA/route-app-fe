import { Grid, GridItem } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'

const Layout = () => {
    return (
        <Grid templateColumns="repeat(6, 1fr)" bg="gray.50">
            <GridItem
                as="aside"
                colSpan={{ base: 6, lg: 2, xl: 1 }}
                minHeight={{ lg: '100vh' }}
                p={{ base: '10px', lg: '20px' }}
            >
                <SideBar />
            </GridItem>

            <GridItem
                as="main"
                colSpan={{ base: 6, lg: 4, xl: 5 }}
            >
                <Outlet />
            </GridItem>
        </Grid>
    )
}

export default Layout