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
import userIcon from '../../assets/img/user.svg';
import keyIcon from '../../assets/img/key.svg';
import { useDarkMode, useRouter } from '../../hooks';
import { AppState, AppStateWithColor, selectedAppState } from '../../recoil/atom';
import { MenuPro } from '../elements/Menu';
import { listApp } from '../../services/appService';
import { allAppSelector } from '../../recoil/selector';
import { RectangleContent } from '../pages/Dashboard/styled/Dashboard.styled';
import { Sidenav, SidebarHead, ChooseApp, LogoTextSidebar, SidebarList } from './styled/Sidebar.styled';

const Sidebar = () => {
    const darkMode = useDarkMode();
    const { history } = useRouter();

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
                </SidebarHead>
                <SidebarList>
                    <NavLink
                        activeStyle={{
                            fontWeight: 'bold',
                            backgroundColor: darkMode.value ? 'rgb(45 53 78)' : '#D9DEFD',
                            borderRadius: '1.5em',
                        }}
                        exact
                        to="/"
                    >
                        <Icon className={'icon'}>
                            <img src={userIcon} alt="user" />
                        </Icon>
                        <Text className={'iconText'} color={darkMode.value ? '#878dab' : '#405BF5'}>
                            {' '}
                            Profile
                        </Text>
                    </NavLink>
                    <NavLink
                        activeStyle={{
                            fontWeight: 'bold',
                            backgroundColor: darkMode.value ? 'rgb(45 53 78)' : '#D9DEFD',
                            borderRadius: '1.5em',
                        }}
                        to="/app"
                    >
                        <Icon className={'icon'}>
                            <img src={keyIcon} alt="key" />
                        </Icon>
                        <Text className={'iconText'} color={darkMode.value ? '#878dab' : '#405BF5'}>
                            App
                        </Text>
                    </NavLink>
                </SidebarList>
            </Sidenav>
        </>
    );
};

// Sidebar.whyDidYouRender = { logOnDifferentValues: true, customName: 'Menu' };
export default memo(Sidebar);
