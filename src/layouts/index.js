import React from 'react'
import Link from 'gatsby-link'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            
          }}
        >
          <Link
            style={{
              textDecoration: 'none',
              color: '#222',
            }}
            to={'/'}
          >
            滋賀大学パソコン研究会
          </Link>
        </h1>
      )
    } else {
      header = (
        <h1
          style={{
          }}
        >
          <Link
            style={{
              textDecoration: 'none',
              color: '#222',
            }}
            to={'/'}
          >
            滋賀大学パソコン研究会
          </Link>
        </h1>
      )
    }
    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '928px',
          padding: '24px',
        }}
      >
        {header}
        {children()}
      </div>
    )
  }
}

export default Template