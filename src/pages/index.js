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

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const description = get(this, 'props.data.site.siteMetadata.description')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <div className="center">
        <Helmet
          title={siteTitle}
          meta={[
            {
              name: 'description',
              content: description,
            },
          ]}
        />
        <section className="content">
        <div className="title-1">News & Tech</div>
        <div className="sub-title-1">ＰＣ研の活動報告や、部員が書いた技術記事を読もう</div>
        <div className="preview-container">
        {posts.map(({ node }, index) => {
          if(index > 4 || !(node.frontmatter.category.toUpperCase() === "NEWS" || node.frontmatter.category.toUpperCase() === "TECH")) return;
          const title = get(node, 'frontmatter.title') || node.frontmatter.slug;
          const excerpt = node.excerpt.length > 110 ? node.excerpt.slice(0, 110) + "..." : node.excerpt;
          return (
            <div className="preview" key={node.frontmatter.slug}>
              <div className="category">{node.frontmatter.category.toUpperCase()}</div>
              <time dateTime={node.frontmatter.date} title={node.frontmatter.date} style={{
                display: "block",
              }}>
                <FaClockO height="1em" width="1.5em"/>
                <small>
                  {node.frontmatter.date}
                </small>
              </time>
              <Link className="title-2" to={node.frontmatter.slug}>
                {title}
              </Link>
              <p dangerouslySetInnerHTML={{ __html: excerpt }} />
            </div>
          )
        })}
        </div>
        </section>
        <hr className="hr-1"/>
        <section className="content">
        <div className="title-1">Projects</div>
        <div className="sub-title-1">部員の作品を観よう</div>
        {posts.map(({ node }, index) => {
          if(index > 4 || node.frontmatter.category.toUpperCase() !== "PROJECTS") return;
          const title = get(node, 'frontmatter.title') || node.frontmatter.slug;
          const excerpt = node.excerpt.length > 110 ? node.excerpt.slice(0, 110) + "..." : node.excerpt;
          return (
            <div className="preview" key={node.frontmatter.slug}>
              <div className="category">{node.frontmatter.category.toUpperCase()}</div>
              <time dateTime={node.frontmatter.date} title={node.frontmatter.date} style={{
                display: "block",
              }}>
                <FaClockO height="1em" width="1.5em"/>
                <small>
                  {node.frontmatter.date}
                </small>
              </time>
              <Link className="title-2" to={node.frontmatter.slug}>
                {title}
              </Link>
              <p dangerouslySetInnerHTML={{ __html: excerpt }} />
            </div>
          )
        })}
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