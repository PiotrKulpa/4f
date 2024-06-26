import React from 'react';
import { Link } from 'react-router-dom';

import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './submenuColumn.module.css';
import PropTypes from 'prop-types';

/**
 * The SubmenuColumn component displays columns with categories in submenu
 *
 * @param {MegaMenuCategory} props.category
 * @param {function} props.onNavigate - function called when clicking on Link
 */
const SubmenuColumn = props => {
  const {
    category,
    categoryUrlSuffix,
    onNavigate,
    handleCloseSubMenu
  } = props;
  const classes = useStyle(defaultClasses, props.classes);

  const categoryUrl = resourceUrl(
    `/${category.url_path}${categoryUrlSuffix || ''}`
  );
  let children = null;

  if (category.children.length) {
    const childrenItems = category.children.map((subCategory, index) => {
      const { url_path, isActive, name, children: subChildren } = subCategory;
      const categoryUrl = resourceUrl(
        `/${url_path}${categoryUrlSuffix || ''}`
      );

      // setting keyboardProps if it is last child of that category
      const keyboardProps =
        index === category.children.length - 1
          ? props.keyboardProps
          : {};

      return (
        <li key={index} className={classes.submenuChildItem}>
          <Link
            {...keyboardProps}
            className={isActive ? classes.linkActive : classes.link}
            data-cy="MegaMenu-SubmenuColumn-link"
            to={categoryUrl}
            onClick={onNavigate}
          >
            {name}
          </Link>
          {subChildren.length > 0 && <ul className={classes.submenuChild}>
            {subChildren.map(({ name, url_path }) => (
              <li key={index} className={classes.submenuChildItem}>
                <Link
                  {...keyboardProps}
                  className={isActive ? classes.linkActive : classes.link}
                  data-cy="MegaMenu-SubmenuColumn-link"
                  to={url_path}
                  onClick={onNavigate}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>}
        </li>
      );
    });

    children = <ul className={classes.submenuChild}>{childrenItems}</ul>;
  }

  // setting keyboardProps if category does not have any sub-category
  const keyboardProps = category.children.length ? {} : props.keyboardProps;

  return (
    <div className={classes.submenuColumn}>
      <Link
        {...keyboardProps}
        className={classes.link}
        data-cy="MegaMenu-SubmenuColumn-link"
        to={categoryUrl}
        onClick={() => {
          handleCloseSubMenu();
          onNavigate();
        }}
      >
        <span className={classes.heading}>{category.name}</span>
      </Link>
      {children}
    </div>
  );
};

export default SubmenuColumn;

SubmenuColumn.propTypes = {
  category: PropTypes.shape({
    children: PropTypes.array,
    uid: PropTypes.string.isRequired,
    include_in_menu: PropTypes.number,
    isActive: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.array.isRequired,
    position: PropTypes.number.isRequired,
    url_path: PropTypes.string.isRequired
  }).isRequired,
  categoryUrlSuffix: PropTypes.string,
  onNavigate: PropTypes.func.isRequired,
  handleCloseSubMenu: PropTypes.func.isRequired
};
