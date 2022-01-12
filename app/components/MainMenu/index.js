/**
 *
 * MainMenu
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Menu, Dropdown, Input, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './index.less';
import logo from '../../images/icon-512x512.png';
import history from '../../utils/history';

const MainMenu = props => (
  <div className="navbar-container">
    <div className="container navbar-fixed-top">
      <div className="menu-main">
        <div>
          <div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item
                key="1"
                className={
                  props.menuActive === 'inicio' || props.menuActive === ''
                    ? 'active'
                    : ''
                }
              >
                <div>
                  <Link to="/">
                    <img src={logo} alt="logo" height="50" />
                  </Link>
                </div>
              </Menu.Item>
              <Menu.Item key="2">
                <Link
                  className={
                    props.menuActive === 'inicio' || props.menuActive === ''
                      ? 'active'
                      : ''
                  }
                  to="/"
                >
                  Home
                </Link>
              </Menu.Item>
              <Menu.Item
                key="3"
                className={props.menuActive === 'genres' ? 'active' : ''}
              >
                <Dropdown
                  overlayClassName="dropdown-items-submenu"
                  overlay={
                    <Menu theme="dark" key="submenu">
                      {props.genres.map(genre => (
                        <Menu.Item key={uuidv4()}>
                          <Link to={`/genre/${genre.toLowerCase()}`}>
                            {genre}
                          </Link>
                        </Menu.Item>
                      ))}
                    </Menu>
                  }
                >
                  <Button
                    className={`ant-dropdown-link ${
                      props.menuActive === 'genres' ? 'active' : ''
                    }`}
                    type="link"
                  >
                    Genres <DownOutlined />
                  </Button>
                </Dropdown>
              </Menu.Item>
              <Menu.Item key="4">
                <Link
                  className={props.menuActive === 'movies' ? 'active' : ''}
                  to="/movies"
                >
                  Movies
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link
                  className={props.menuActive === 'favorites' ? 'active' : ''}
                  to="/favorites"
                >
                  Favorites
                </Link>
              </Menu.Item>
            </Menu>
          </div>
        </div>
        {history.location.pathname !== '/favorites' && (
          <div className="menu-options">
            <Input.Search
              placeholder="Buscar películas"
              size="large"
              style={{ width: 220 }}
              onSearch={value => props.onSearch(value)}
              onChange={({ target }) => props.onChange(target.value)}
              value={props.searchTerm}
            />
          </div>
        )}
      </div>
    </div>
  </div>
);

MainMenu.propTypes = {
  menuActive: PropTypes.string,
  genres: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onSearch: PropTypes.func,
  onChange: PropTypes.func,
  searchTerm: PropTypes.string,
};

MainMenu.defaultProps = {
  menuActive: '',
};

export default memo(MainMenu);
