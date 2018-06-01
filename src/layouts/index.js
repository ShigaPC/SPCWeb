import React from 'react'
import Link from 'gatsby-link'
import FaStarO from 'react-icons/lib/fa/star-o'
import Helmet from 'react-helmet'
import TwitterIcon from 'react-icons/lib/fa/twitter-square'
import GitHubIcon from 'react-icons/lib/fa/github-square'

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
          height: '512px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            fontSize: '28px',
            color: '#FFF',
            width: '100%',
            height: '400px',
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
            width: '100%',
          }}>
          </div>
          <div style={{
            position: 'absolute',
            top: '407px',
            background: '#FFF',
            transformOrigin: 'left top',
            transform: 'rotate(5deg) translate(-60%, 0)',
            width: '120%',
            left: '60%',
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'space-around',
            fontSize: '11px',
            letterSpacing: '0.3em',
            color: '#ff8080',
            height: '300px',
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
            top: '450px',
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
      footer = (
        <footer className="footer" style={{
          background: '#331a1a',
          color: '#fff',
          textAlign: 'center',
          padding: '1em 0 3em',
          position: 'relative',
          zIndex: '1',
        }}>
          <div style={{
            display: 'inline-flex',
            flexFlow: 'column nowrap',
            justifyContent: 'center',
            margin: '1em 0',
          }}>
            <Link to="/">HOME</Link>
            <Link to="/posts">POSTS</Link>
            <Link to="/admin/">SIGN IN</Link>
          </div>
          <div className="center" style={{
            padding: '0 0 0.3em',
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <a target="_blank" style={{margin: '0 0.5em'}} href="https://twitter.com/densan_public">
              <TwitterIcon width="3em" height="3em"/>
            </a>
            <a target="_blank" style={{margin: '0 0.5em'}} href="https://github.com/ShigaPC/">
              <GitHubIcon width="3em" height="3em"/>
            </a>
          </div>
          <div style={{
            fontSize: '0.9em',
          }}>
            © 2018 Shiga Univ PC Club
          </div>
        </footer>
      )
    } else {
      header = (
        <header className="header" style={{
          height: '100px',
          background: 'linear-gradient(#745a5a, #8d5c5c)',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexFlow: 'row nowrap',
          alignItems: 'center',
          justifyContent: 'space-around'
        }}>
            <Link to={'/#about'}>About</Link>
            <Link to={'/#contact'}>Contact us</Link>
            <Link to={'/'} style={{
              display: 'block',
              width: '5em',
              height: '5em',
              color: '#fff',
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
            <Link to={'/posts'}>Posts</Link>
            <Link to={'/admin/'}>Sign in</Link>
        </header>
      )
      footer = (
        <footer className="footer" style={{
          background: '#331a1a',
          color: '#fff',
          textAlign: 'center',
          padding: '1em 0 3em',
          position: 'relative',
          zIndex: '1',
        }}>
          <div style={{
            display: 'inline-flex',
            flexFlow: 'column nowrap',
            justifyContent: 'center',
            margin: '1em 0',
          }}>
            <Link to="/">HOME</Link>
            <Link to="/posts">POSTS</Link>
            <Link to="/admin/">SIGN IN</Link>
          </div>
          <div className="center" style={{
            padding: '0 0 0.3em',
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <a target="_blank" style={{margin: '0 0.5em'}} href="https://twitter.com/densan_public">
              <TwitterIcon width="3em" height="3em"/>
            </a>
            <a target="_blank" style={{margin: '0 0.5em'}} href="https://github.com/ShigaPC/">
              <GitHubIcon width="3em" height="3em"/>
            </a>
          </div>
          <div style={{
            fontSize: '0.9em',
          }}>
            © 2018 Shiga Univ PC Club
          </div>
        </footer>
      )
    }
    return (
      <div style={{height: '100%'}}>
        <Helmet
          link={[
            {
              href: 'https://fonts.googleapis.com/earlyaccess/notosansjapanese.css',
              rel: 'stylesheet',
            },
            {
              href: 'https://fonts.googleapis.com/css?family=Oswald',
              rel: 'stylesheet',
            },
          ]}
        />
        <div style={{
          minHeight: '100%',
          marginBottom: '-250px',
        }}>
          {header}
          <main style={{background: '#fff', position: 'relative'}}>
            { location.pathname !== rootPath && <div className="bg-4"></div> }
            <div style={{position: 'relative', zIndex: '1'}}>
            {children()}
            </div>
          </main>
          <div style={{ height: "250px" }}></div>
          { location.pathname !== rootPath && <div style={{height: '55px'}}></div> }
        </div>
        {footer}
      </div>
    )
  }
}

export default Template