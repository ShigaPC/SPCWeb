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
      <section>
        <Helmet
          title={siteTitle}
          meta={[
            {
              name: 'description',
              content: description,
            },
          ]}
        />
        <h1>新着記事</h1>
        {posts.map(({ node }, index) => {
          if(index > 4) return;
          const title = get(node, 'frontmatter.title') || node.frontmatter.slug;
          const excerpt = node.excerpt.length > 110 ? node.excerpt.slice(0, 110) + "..." : node.excerpt;
          return (
            <div key={node.frontmatter.slug}>
              <time dateTime={node.frontmatter.date} title={node.frontmatter.date}>
                <FaClockO height="1em" width="1.5em"/>
                <small>
                  {node.frontmatter.date}
                </small>
              </time>
              <h2>
                <Link to={node.frontmatter.slug}>
                  {title}
                </Link>
              </h2>
              <p dangerouslySetInnerHTML={{ __html: excerpt }} />
            </div>
          )
        })}
      </section>
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