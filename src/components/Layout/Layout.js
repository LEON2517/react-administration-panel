/**
 * @module components
 */
import React from 'react';
import { PropTypesExtends } from 'common';

/**
 * Layout для страница
 *
 * @param {Object} props - props
 * @returns {ReactElement}
 */
export default function Layout({ children }) {
  return (<div className="content-wrapper">{children}</div>);
}

Layout.propTypes = {
  children: PropTypesExtends.children.isRequired,
};
