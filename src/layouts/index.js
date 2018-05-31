import React from 'react'
import Link from 'gatsby-link'
import FaStarO from 'react-icons/lib/fa/star-o'
import Helmet from 'react-helmet'

import '../styles/style.css'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header, footer

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    if (location.pathname === rootPath) {
      header = (
        <header style={{
          height: '400px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            fontSize: '28px',
            color: '#FFF',
            width: '100%',
            height: '350px',
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            letterSpacing: '0.2em',
            fontFamily: "Noto Sans Japanese",
            fontWeight: "bold"
          }}>
            <div style={{margin: '0 0.3em'}}>彦根から</div><div style={{margin: '0 0.3em'}}>最前線へ</div>
          </div>
          <div className="bg-1" style={{
            height: '400px',
            width: '100%',
            position: 'absolute',
          }}>
          </div>
          <div style={{
            position: 'absolute',
            top: '350px',
            background: '#FFF',
            transformOrigin: 'left top',
            transform: 'rotate(5deg) translate(-50%, 0)',
            width: '85%',
            maxWidth: '800px',
            minWidth: '480px',
            left: '50%',
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'space-between',
            fontSize: '14px',
            letterSpacing: '0.3em',
            color: '#ff8080'
          }}>
            <span>Shiga University</span>
            <span>Computer Club</span>
          </div>
          <div style={{
            position: 'absolute',
            fontSize: '36px',
            width: '5em',
            height: '5em',
            left: 'calc(50% - 2.5em)',
            top: '393px',
            transform: 'translate(0,-50%)',
            fontWeight: "bolder",
            fontFamily: "Noto Sans Japanese",
          }}>
            <div style={{
              position: 'absolute',
              left: 'calc(50% - 0.5em)',
              top: 'calc(50% - 4em)',
              transform: 'translate(-50%,-50%)',
              color: '#FFF',
            }}>
              <span style={{
                position: 'absolute',
                transform: 'rotate(-37deg)',
                transformOrigin: 'bottom center',
                height: '3em'
              }}>滋</span>
              <span style={{
                position: 'absolute',
                transform: 'rotate(0deg)',
                transformOrigin: 'bottom center',
                height: '3em'
              }}>賀</span>
              <span style={{
                position: 'absolute',
                transform: 'rotate(37deg)',
                transformOrigin: 'bottom center',
                height: '3em'
              }}>大</span>
            </div>
            <FaStarO width='2em' height='2em' style={{
              position: 'absolute',
              top: 'calc(50% - 1.5em)',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              color: '#ffb3b3'
            }}/>
            <div style={{
              position: 'absolute',
              left: 'calc(50% - 0.5em)',
              top: 'calc(50% - 2em)',
              transform: 'translate(-50%,-50%)',
              color: '#000',
            }}>
              <span style={{
                position: 'absolute',
                transform: 'rotate(37deg)',
                transformOrigin: 'top center',
                height: '3em',
                width: '1em',
              }}><span style={{position: 'absolute', bottom: '0'}}>Ｐ</span></span>
              <span style={{
                position: 'absolute',
                transform: 'rotate(0deg)',
                transformOrigin: 'top center',
                height: '3em',
                width: '1em',
              }}><span style={{position: 'absolute', bottom: '0'}}>Ｃ</span></span>
              <span style={{
                position: 'absolute',
                transform: 'rotate(-37deg)',
                transformOrigin: 'top center',
                height: '3em',
                width: '1em',
              }}><span style={{position: 'absolute', bottom: '0'}}>研</span></span>
            </div>
          </div>
        </header>
      )
    } else {
      header = (
        <header>
          <div style={{position: 'relative', top: '2.8em'}}>
            <Link to={'/'} style={{
              position: 'absolute',
              display: 'block',
              margin: '0 auto',
              width: '5em',
              height: '5em',
              left: 'calc(50%)',
              top: 'calc(50%)',
              transform: 'translate(-50%,-50%)',
              color: '#ff8080',
              fontWeight: "bolder",
              fontFamily: "Noto Sans Japanese",
            }}>
              <div style={{
                position: 'absolute',
                left: 'calc(50% - 0.5em)',
                top: 'calc(50% - 2.5em)',
                transform: 'translate(-50%,-50%)'
              }}>
                <span style={{
                  position: 'absolute',
                  transform: 'rotate(-37deg)',
                  transformOrigin: 'bottom center',
                  height: '3em'
                }}>滋</span>
                <span style={{
                  position: 'absolute',
                  transform: 'rotate(0deg)',
                  transformOrigin: 'bottom center',
                  height: '3em'
                }}>賀</span>
                <span style={{
                  position: 'absolute',
                  transform: 'rotate(37deg)',
                  transformOrigin: 'bottom center',
                  height: '3em'
                }}>大</span>
              </div>
              <FaStarO width='2em' height='2em' style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)'
              }}/>
              <div style={{
                position: 'absolute',
                left: 'calc(50% - 0.5em)',
                top: 'calc(50% - 0.5em)',
                transform: 'translate(-50%,-50%)'
              }}>
                <span style={{
                  position: 'absolute',
                  transform: 'rotate(37deg)',
                  transformOrigin: 'top center',
                  height: '3em',
                  width: '1em',
                }}><span style={{position: 'absolute', bottom: '0'}}>Ｐ</span></span>
                <span style={{
                  position: 'absolute',
                  transform: 'rotate(0deg)',
                  transformOrigin: 'top center',
                  height: '3em',
                  width: '1em',
                }}><span style={{position: 'absolute', bottom: '0'}}>Ｃ</span></span>
                <span style={{
                  position: 'absolute',
                  transform: 'rotate(-37deg)',
                  transformOrigin: 'top center',
                  height: '3em',
                  width: '1em',
                }}><span style={{position: 'absolute', bottom: '0'}}>研</span></span>
              </div>
            </Link>
          </div>
        </header>
      )
    }
    footer = (
      <footer style={{
        textAlign: 'center',
        fontSize: '0.8em',
        padding: '1em 0'
      }}>
        © 2018 Shiga Univ PC Club
      </footer>
    )
    return (
      <div>
        <Helmet
          link={[
            {
              href: 'https://fonts.googleapis.com/earlyaccess/notosansjapanese.css',
              rel: 'stylesheet',
            },
          ]}
        />
        {header}
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '928px',
            padding: '24px',
          }}
        >
          {children()}
        </div>
        {footer}
      </div>
    )
  }
}

export default Template