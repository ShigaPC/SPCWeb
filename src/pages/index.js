import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import FaDown from 'react-icons/lib/fa/angle-down'
import KaigakuSai from '../assets/kaigakusai.jpg'
import VSCode from '../assets/vscode.png'
import Preview from '../components/preview'
const _ = require('lodash')

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const description = get(this, 'props.data.site.siteMetadata.description')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <div>
        <Helmet
          title={siteTitle}
          meta={[
            {
              name: 'description',
              content: description,
            },
          ]}
        />
        <section id="about" className="content center">
          <div className="title-4">ABOUT</div>
          <div className="about-content-1">
            <img width="250" height="125" src={VSCode} alt="VSCODE"/>
            <div>
              <div className="title-5">フリーダムな部風</div>
              <p>
                活動内容は人それぞれです<br/>
                ゲームを作る人、絵を描く人<br/>
                プログラムを書く人などがいます
              </p>
            </div>
          </div>
          <div className="about-content-2">
            <img width="250" height="125" src={KaigakuSai} alt="開学祭"/>
            <div>
              <div className="title-5">年に二回の展示</div>
              <p>
                「開学祭」と「滋大祭」では<br/>
                私たちの制作物を展示しています<br/>
                気軽にお立ち寄りください
              </p>
            </div>
          </div>
        </section>
        <section className="content bg-2 notices-container">
        <div className="title-4">NOTICES</div>
        {Preview(posts, "lines", 4, ["notices"])}
        <FaDown className="downIcon"/>
        <div className="more-notices">
          <Link to="notices">More Notices</Link>
        </div>
        </section>
        <div className="title-4">ARTICLES</div>
        <section className="content center">
        <div className="title-1">News & Tech</div>
        <div className="sub-title-1">ＰＣ研の活動報告や、部員が書いた技術記事を読もう</div>
        {Preview(posts, "default", 6, ["news", "tech"])}
        <FaDown className="downIcon"/>
        <div className="more-news-tech">
          <Link to="news">More News</Link>&nbsp;/&nbsp;
          <Link to="tech">More Tech</Link>
        </div>
        </section>
        <hr className="hr-1"/>
        <section className="content center">
        <div className="title-1">Projects</div>
        <div className="sub-title-1">部員の作品を観よう</div>
        {Preview(posts, "default", 6, ["projects"])}
        <FaDown className="downIcon"/>
        <div className="more-projects">
          <Link to="projects">More Projects</Link>
        </div>
        </section>
        <section className="bg-3 contact-container">
        <div id="contact" className="title-4">CONTACT US</div>
        <div className="title-6">ACCESS</div>
        <p>
          部室棟２Ｆ（Ｂ－６）<br/>
          休み時間には誰かしらいます
        </p>
        <div className="title-6">JOIN US!</div>
        <p>
          ＰＣ研は融通が利くサークルです<br/>
          経験問わず、誰でも歓迎しています<br/>
        </p>
        <hr className="hr-2"/>
        </section>
      </div>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 5000)
          frontmatter {
            slug
            date(formatString: "YYYY/MM/DD")
            author
            title
            tags
            category
          }
        }
      }
    }
  }
`
