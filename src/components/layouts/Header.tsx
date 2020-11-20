import React, { memo } from 'react';
import { IconButton } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { WbSunny, NightsStay } from '@material-ui/icons';
import { useQuery } from 'react-query';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Skeleton from 'react-loading-skeleton';
import { ColorfulIcon, Text, VerticalLine } from '../elements/StyledUtils';
import noAvatar from '../../assets/img/no-avatar.jpg';
import { useDarkMode, useAuth } from '../../hooks';
import { MenuPro } from '../elements/Menu';
import { Navbar, MenuList, Avatar, Ball, DarkModeGroup } from './styled/Header.styled';

const Header: React.FC = () => {
    const darkMode = useDarkMode(false);
    const { getUser, logOut } = useAuth();
    const { data } = useQuery('getUser', getUser);
    const [anchorEl, setAnchorEl] = React.useState<(EventTarget & HTMLElement) | null>(null);
    const openDropdown = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleChange = () => {
        darkMode.toggle();
    };

    const menuData = [
        {
            element: 'Logout',
            icon: <ExitToAppIcon />,
            func: () => logOut(),
        },
    ] as [{ element: string; icon: React.ReactNode; func: () => void }];

    return (
        <>
            <Navbar>
                <DarkModeGroup>
                    <input type={'checkbox'} checked={darkMode.value} onChange={handleChange} name="checkedA" />
                    <label className={'label'}>
                        <ColorfulIcon color={'#f1c40f'} darkModeColor={'#f1c40f'}>
                            <NightsStay />
                        </ColorfulIcon>
                        <ColorfulIcon color={'#f39c12'} darkModeColor={'#f1c40f'}>
                            <WbSunny />
                        </ColorfulIcon>
                        <Ball />
                    </label>
                </DarkModeGroup>

                <MenuList>
                    <Text>Documentation</Text>
                    <VerticalLine border={'1px solid #D9DEFD'} height={'1em'} margin={'0 1em'} />
                    <Avatar>
                        <img
                            src={
                                data && data.data.payload.avatar
                                    ? `${process.env.REACT_APP_BACKEND}${data.data.payload.avatar}`
                                    : noAvatar
                            }
                            alt="avatar"
                        />
                    </Avatar>
                    <Text>{data ? data.data.payload.displayName.split('@')[0] : <Skeleton />}</Text>
                    <MenuPro
                        anchorEl={anchorEl}
                        setAnchorEl={setAnchorEl}
                        dropdownBtn={
                            <div onClick={openDropdown}>
                                <IconButton size={'small'}>
                                    <ArrowDropDownIcon />
                                </IconButton>
                            </div>
                        }
                        data={menuData}
                    />
                </MenuList>
            </Navbar>
        </>
    );
};

export default memo(Header);
