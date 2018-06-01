/*
 * トップページを定義しています。
 * とりあえず、全部のページを新しいものから５件取得していますが、
 * カテゴリとかタグで分けることもできます。
 */

import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import FaClockO from 'react-icons/lib/fa/clock-o'
import FaDown from 'react-icons/lib/fa/angle-down'
import KaigakuSai from './images/kaigakusai.jpg'
import VSCode from './images/vscode.png'
const _ = require('lodash')

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const description = get(this, 'props.data.site.siteMetadata.description')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
    let numOfImportantPosts = 0;
    let numOfNewsTechPosts = 0;
    let numOfProjectsPosts = 0;
    let mappedImportantPosts = [];
    let mappedNewsTechPosts = [];
    let mappedProjectsPosts = [];

    _.each(posts,({node}, index) => {
      if(numOfImportantPosts > 3) return false;
      if(node.frontmatter.category !== "notices") return true;
      numOfImportantPosts += 1;
      const title = node.frontmatter.title || node.frontmatter.slug;
      mappedImportantPosts.push(
        <div className="important-preview" key={node.frontmatter.slug}>
          <Link to={"/" + node.frontmatter.category} className="category">{node.frontmatter.category.toUpperCase()}</Link>
          <Link to={'/' + node.frontmatter.category + '/' + node.frontmatter.slug}>
            {title}
          </Link>
          &nbsp;-&nbsp;
          <time dateTime={node.frontmatter.date} style={{
            display: "inline",
          }}>
              {node.frontmatter.date}
          </time>
        </div>
      )
    })
    _.each(posts,({node}, index) => {
      if(numOfNewsTechPosts > 5) return false;
      if(!(node.frontmatter.category === "news" || node.frontmatter.category === "tech")) return true;
      numOfNewsTechPosts += 1;
      const title = node.frontmatter.title || node.frontmatter.slug;
      const excerpt = node.excerpt.length > 110 ? node.excerpt.slice(0, 110) + "..." : node.excerpt;
      mappedNewsTechPosts.push(
        <div className="preview" key={node.frontmatter.slug}>
          <Link to={"/" + node.frontmatter.category} className="category">{node.frontmatter.category.toUpperCase()}</Link>
          <time dateTime={node.frontmatter.date} style={{
            display: "block",
          }}>
            <FaClockO height="1em" width="1.5em"/>
            <small>
              {node.frontmatter.date}
            </small>
          </time>
          <Link className="title-2" to={'/' + node.frontmatter.category + '/' + node.frontmatter.slug}>
            {title}
          </Link>
          <p dangerouslySetInnerHTML={{ __html: excerpt }} />
        </div>
      )
    })
    _.each(posts,({node}, index) => {
      if(numOfProjectsPosts > 5) return false;
      if(node.frontmatter.category !== "projects") return true;
      numOfProjectsPosts += 1
      const title = node.frontmatter.title || node.frontmatter.slug;
      const excerpt = node.excerpt.length > 110 ? node.excerpt.slice(0, 110) + "..." : node.excerpt;
      mappedProjectsPosts.push(
        <div className="preview" key={node.frontmatter.slug}>
          <Link to={"/" + node.frontmatter.category} className="category">{node.frontmatter.category.toUpperCase()}</Link>
          <time dateTime={node.frontmatter.date} style={{
            display: "block",
          }}>
            <FaClockO height="1em" width="1.5em"/>
            <small>
              {node.frontmatter.date}
            </small>
          </time>
          <Link className="title-2" to={'/' + node.frontmatter.category + '/' + node.frontmatter.slug}>
            {title}
          </Link>
          <p dangerouslySetInnerHTML={{ __html: excerpt }} />
        </div>
      )
    })


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
          <div style={{
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'space-around',
            margin: '1em 0 3em'
          }}>
            <img src={VSCode} alt="VSCODE"/>
            <div>
              <div className="title-5">フリーダムな部風</div>
              <p>
                活動内容は人それぞれです<br/>
                ゲームを作る人、絵を描く人<br/>
                プログラムを書く人などがいます
              </p>
            </div>
          </div>
          <div style={{
            display: 'flex',
            flexFlow: 'row wrap',
            flexDirection: 'row-reverse',
            justifyContent: 'space-around',
            margin: '3em 0 0'
          }}>
            <img src={KaigakuSai} alt="開学祭"/>
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
        <section className="content bg-2" style={{
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '2em 0'
        }}>
        <div className="title-4">NOTICES</div>
        <div className="important-preview-container">
        {mappedImportantPosts}
        <FaDown width='1.5em' height="1.5em"/>
        <Link to="notices">More Notices</Link>
        </div>
        </section>
        <div className="title-4">ARTICLES</div>
        <section className="content center">
        <div className="title-1">NEWS & TECH</div>
        <div className="sub-title-1">ＰＣ研の活動報告や、部員が書いた技術記事を読もう</div>
        <div className="preview-container">
        {mappedNewsTechPosts}
        </div>
        <FaDown width='1.5em' height="1.5em" style={{display:"block", margin: '0 auto'}}/>
        <div style={{
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'center',
        }}>
          <Link to="news">More News</Link>&nbsp;/&nbsp;
          <Link to="tech">More Tech</Link>
        </div>
        </section>
        <hr className="hr-1"/>
        <section className="content center">
        <div className="title-1">Projects</div>
        <div className="sub-title-1">部員の作品を観よう</div>
        <div className="preview-container">
        {mappedProjectsPosts}
        </div>
        <FaDown width='1.5em' height="1.5em" style={{display:"block", margin: '0 auto'}}/>
        <div style={{
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'center',
        }}>
          <Link to="projects">More Projects</Link>
        </div>
        </section>
        <section className="bg-3" style={{marginTop: '3em'}}>
        <div id="contact" className="title-4">CONTACT US</div>
        <div className="title-6">ACCESS</div>
        <p style={{textAlign: 'center'}}>
          部室棟２Ｆ（Ｂ－６）<br/>
          休み時間には誰かしらいます
        </p>
        <div className="title-6">JOIN US!</div>
        <p style={{textAlign: 'center'}}>
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