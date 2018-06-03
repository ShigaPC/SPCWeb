import React from 'react'
import Link from 'gatsby-link'
import FaStarO from 'react-icons/lib/fa/star-o'
import Helmet from 'react-helmet'
import TwitterIcon from 'react-icons/lib/fa/twitter-square'
import GitHubIcon from 'react-icons/lib/fa/github-square'
import HikoneSakura from '../assets/hikone-sakura.jpg'

import '../styles/typebase.css'
import '../styles/common.scss'

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
        <header className="header">
          <div className="catch-phrase-wrapper">
            <div>彦根から</div><div>最前線へ</div>
          </div>
          <div className="bg-1" style={{
            background: `url("${HikoneSakura}") center center / cover no-repeat fixed`
          }}></div>
          <div className="bg-1-slash">
            <span>Shiga University</span>
            <span>Computer Club</span>
          </div>
          <div className="logo">
            <div className="logo-top">
              <span className="logo-top-a">滋</span>
              <span className="logo-top-b">賀</span>
              <span className="logo-top-c">大</span>
            </div>
            <FaStarO className="logo-mid"/>
            <div className="logo-bottom">
              <span className="logo-bottom-a"><span className="logo-bottom-letter">Ｐ</span></span>
              <span className="logo-bottom-b"><span className="logo-bottom-letter">Ｃ</span></span>
              <span className="logo-bottom-c"><span className="logo-bottom-letter">研</span></span>
            </div>
          </div>
        </header>
      )
      footer = (
        <footer className="footer">
          <nav className="footer-nav">
            <Link to="/">HOME</Link>
            <Link to="/posts">POSTS</Link>
            <Link to="/admin/">SIGN IN</Link>
          </nav>
          <div className="center footer-sns">
            <a target="_blank" rel="noopener" href="https://twitter.com/densan_public" title="Twitter@densan_public">
              <TwitterIcon width="3em" height="3em"/>
            </a>
            <a target="_blank" rel="noopener" href="https://github.com/ShigaPC/" title="GitHub@ShigaPC">
              <GitHubIcon width="3em" height="3em"/>
            </a>
          </div>
          <div className="footer-copyright">
            © 2018 Shiga Univ PC Club
          </div>
        </footer>
      )
    } else {
      header = (
        <header className="header">
            <Link to={'/#about'}>About</Link>
            <Link to={'/#contact'}>Contact us</Link>
            <Link className="logo" to={'/'}>
              <div className="logo-top">
                <span className="logo-top-a">滋</span>
                <span className="logo-top-b">賀</span>
                <span className="logo-top-c">大</span>
              </div>
              <FaStarO className="logo-mid"/>
              <div className="logo-bottom">
                <span className="logo-bottom-a"><span className="logo-bottom-letter">Ｐ</span></span>
                <span className="logo-bottom-b"><span className="logo-bottom-letter">Ｃ</span></span>
                <span className="logo-bottom-c"><span className="logo-bottom-letter">研</span></span>
              </div>
            </Link>
            <Link to={'/posts'}>Posts</Link>
            <Link to={'/admin/'}>Sign in</Link>
        </header>
      )
      footer = (
        <footer className="footer">
          <div className="footer-nav">
            <Link to="/">HOME</Link>
            <Link to="/posts">POSTS</Link>
            <Link to="/admin/">SIGN IN</Link>
          </div>
          <div className="center footer-sns">
            <a target="_blank" rel="noopener" href="https://twitter.com/densan_public" title="Twitter@densan_public">
              <TwitterIcon width="3em" height="3em"/>
            </a>
            <a target="_blank" rel="noopener" href="https://github.com/ShigaPC/" title="GitHub@ShigaPC">
              <GitHubIcon width="3em" height="3em"/>
            </a>
          </div>
          <div className="footer-copyright">
            © 2018 Shiga Univ PC Club
          </div>
        </footer>
      )
    }
    return (
      <div className={"page-wrapper " + (location.pathname === rootPath ? "home" : "pages")}>
        <Helmet
          link={[
            {
              href: 'https://fonts.googleapis.com/css?family=Oswald',
              rel: 'stylesheet',
            },
          ]}
        >
          <html lang="ja"/>
        </Helmet>
        <div className="main-wrapper">
          {header}
          <main className="main">
            { location.pathname !== rootPath && <div className="bg-4"></div> }
            <div className="content-wrapper">
              {children()}
            </div>
          </main>
          <div className="push"></div>
          { location.pathname !== rootPath && <div className="bottom-space"></div> }
        </div>
        {footer}
      </div>
    )
  }
}

export default Template
