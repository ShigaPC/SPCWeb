/*
 * 個別記事を定義しています。
 */

import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import ChevronLeft from 'react-icons/lib/fa/chevron-left';
import ChevronRight from 'react-icons/lib/fa/chevron-right';
import FaClockO from 'react-icons/lib/fa/clock-o'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const { previous, next, relatedPages } = this.props.pathContext

    return (
      <div>
        <article>
          <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
          <h1>{post.frontmatter.title}</h1>
            <time dateTime={post.frontmatter.date} title={post.frontmatter.date} style={{
              marginBottom: "1em",
              display: "block",
            }}>
            <FaClockO height="1em" width="1.5em"/>
            <small>
              {post.frontmatter.date}
            </small>
          </time>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <aside>
            <ul style={{
                display: 'flex',
                flexFlow: 'row wrap',
                listStyle: 'none',
                paddingLeft: '0',
                marginLeft: '0'
            }}>
              {post.frontmatter.tags.map(tag =>
                <li style={{ padding: '0 0.5em' }}>
                  <Link to={`/tags/${tag}`}>#{tag}</Link>
                </li>
              )}
            </ul>
            <ul
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                listStyle: 'none',
                paddingLeft: '0',
                marginLeft: '0'
              }}
            >
              <li style={{maxWidth: '44%'}}>
                {previous && (
                  <Link to={previous.frontmatter.slug} rel="prev">
                    <ChevronLeft width="1.5em" height="1em"/>{previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li style={{maxWidth: '44%'}}>
                {next && (
                  <Link to={next.frontmatter.slug} rel="next">
                    {next.frontmatter.title}<ChevronRight width="1.5em" height="1em"/>
                  </Link>
                )}
              </li>
            </ul>
          </aside>
        </article>
        <section>
          <strong>関連記事</strong>
          {relatedPages.map(({ node }) => {
            const excerptSliced = node.excerpt.length > 110 ? node.excerpt.slice(0, 110) + "..." : node.excerpt;
            return (
              <div>
                <time dateTime={node.frontmatter.date} title={node.frontmatter.date}>
                  <FaClockO height="1em" width="1.5em"/>
                  <small>
                    {node.frontmatter.date}
                  </small>
                </time>
                <div>
                  <Link to={node.frontmatter.slug}>
                    {node.frontmatter.title}
                  </Link>
                </div>
                <p dangerouslySetInnerHTML={{ __html: excerptSliced }} />
              </div>
            );
          })}
        </section>
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      id
      html
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
`