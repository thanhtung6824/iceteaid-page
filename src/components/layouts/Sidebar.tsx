import React, { memo } from 'react';
import { IconButton, Icon } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { NavLink } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import { Rectangle, Text } from '../elements/StyledUtils';
import logo from '../../assets/img/logo.svg';
import homeIcon from '../../assets/img/home.svg';
import { useDarkMode, useRouter } from '../../hooks';
import { AppState, AppStateWithColor, selectedAppState } from '../../recoil/atom';
import { MenuPro } from '../elements/Menu';
import { listApp } from '../../services/appService';
import { allAppSelector } from '../../recoil/selector';
import { RectangleContent } from '../pages/Dashboard/styled/Dashboard.styled';
import { Sidenav, SidebarHead, ChooseApp, LogoTextSidebar, SidebarList } from './styled/Sidebar.styled';

const Sidebar = () => {
    const darkMode = useDarkMode();
    const [selectedApp, setSelectedApp] = useRecoilState(selectedAppState);
    const allApp = useRecoilValue(allAppSelector) as any;
    const [anchorEl, setAnchorEl] = React.useState<(EventTarget & HTMLElement) | null>(null);
    const { data } = useQuery('listApp', listApp) as any;
    const { history } = useRouter();
    const openDropdown = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const menuData = [
        {
            element: 'Dashboard',
            icon: <HomeWorkIcon />,
            func: () => {
                setAnchorEl(null);
                history.push(`/`);
                setSelectedApp({} as AppState);
            },
        },
    ] as [{ element: string; icon: React.ReactNode; func: () => void }];

    if (data) {
        allApp.map((app: AppStateWithColor) => {
            menuData.push({
                element: app.appName,
                icon: (
                    <Rectangle className="rectangle" height={'2em'} backgroundColor={'#ffffff'} borderRadius={'0.5em'}>
                        <RectangleContent>
                            <Rectangle width={'2em'} height={'2em'} backgroundColor={app.color} borderRadius={'0.3em'}>
                                <Text fontSize={'1em'} fontWeight={600} lineHeight={'0.5em'}>
                                    {app.appName.substring(0, 2).toUpperCase()}
                                </Text>
                            </Rectangle>
                        </RectangleContent>
                    </Rectangle>
                ),
                func: () => {
                    setAnchorEl(null);
                    history.push(`/home/${app.id}`);
                },
            });
        });
    }

    return (
        <>
            <Sidenav id={'sidebar'}>
                <SidebarHead>
                    <LogoTextSidebar>
                        <img src={logo} alt="logo" />
                        <Text color={'#2d1949'} fontSize={'1.6em'}>
                            IceteaID
                        </Text>
                    </LogoTextSidebar>
                    <ChooseApp>
                        <MenuPro
                            anchorEl={anchorEl}
                            setAnchorEl={setAnchorEl}
                            dropdownBtn={
                                <div onClick={openDropdown}>
                                    <Text fontWeight={600}>{(selectedApp && selectedApp.appName) || 'Choose app'}</Text>
                                    <IconButton size={'small'}>
                                        <ArrowDropDownIcon />
                                    </IconButton>
                                </div>
                            }
                            data={menuData}
                        />
                    </ChooseApp>
                </SidebarHead>
                {selectedApp.id && (
                    <SidebarList>
                        <NavLink
                            activeStyle={{
                                fontWeight: 'bold',
                                backgroundColor: darkMode.value ? 'rgb(45 53 78)' : '#D9DEFD',
                                borderRadius: '1.5em',
                            }}
                            to="/home"
                        >
                            <Icon className={'icon'}>
                                <img src={homeIcon} alt="home" />
                            </Icon>
                            <Text className={'iconText'} color={darkMode.value ? '#878dab' : '#405BF5'}>
                                Home
                            </Text>
                        </NavLink>
                        {/*<NavLink*/}
                        {/*    activeStyle={{*/}
                        {/*        fontWeight: 'bold',*/}
                        {/*        backgroundColor: darkMode.value ? 'rgb(45 53 78)' : '#D9DEFD',*/}
                        {/*        borderRadius: '1.5em',*/}
                        {/*    }}*/}
                        {/*    to="/users"*/}
                        {/*>*/}
                        {/*    <Icon className={'icon'}>*/}
                        {/*        <img src={userIcon} alt="user" />*/}
                        {/*    </Icon>*/}
                        {/*    <Text className={'iconText'} color={darkMode.value ? '#878dab' : '#405BF5'}>*/}
                        {/*        {' '}*/}
                        {/*        Users*/}
                        {/*    </Text>*/}
                        {/*</NavLink>*/}
                        {/*<NavLink*/}
                        {/*    activeStyle={{*/}
                        {/*        fontWeight: 'bold',*/}
                        {/*        backgroundColor: darkMode.value ? 'rgb(45 53 78)' : '#D9DEFD',*/}
                        {/*        borderRadius: '1.5em',*/}
                        {/*    }}*/}
                        {/*    to="/keys"*/}
                        {/*>*/}
                        {/*    <Icon className={'icon'}>*/}
                        {/*        <img src={keyIcon} alt="key" />*/}
                        {/*    </Icon>*/}
                        {/*    <Text className={'iconText'} color={darkMode.value ? '#878dab' : '#405BF5'}>*/}
                        {/*        Api Keys*/}
                        {/*    </Text>*/}
                        {/*</NavLink>*/}
                    </SidebarList>
                )}
            </Sidenav>
        </>
    );
};

// Sidebar.whyDidYouRender = { logOnDifferentValues: true, customName: 'Menu' };
export default memo(Sidebar);
