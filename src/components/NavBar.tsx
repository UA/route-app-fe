import { FC } from 'react'
import { FiHome } from 'react-icons/fi'
import NavItem from './NavItem';

interface IProps {
    navSize: string;
}

const NavBar: FC<IProps> = ({ navSize }) => {
    return (
        <>
            <NavItem navSize={navSize} icon={FiHome} title="Home" active path="/" />
        </>
    )
}

export default NavBar;