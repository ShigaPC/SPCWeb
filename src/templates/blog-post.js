/*
 * 個別記事を定義しています。
 */

import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import ChevronLeft from 'react-icons/lib/fa/chevron-left'
import ChevronRight from 'react-icons/lib/fa/chevron-right'
import FaClockO from 'react-icons/lib/fa/clock-o'
import TwitterIcon from 'react-icons/lib/fa/twitter-square'
import FacebookIcon from 'react-icons/lib/fa/facebook-square'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const { previous, next, relatedPages } = this.props.pathContext
    const shareUrl = "https://www.shigapc.com/" + post.frontmatter.category + "/" + post.frontmatter.slug;

    return (
      <div>
        <div className="title-3"><Link className="category-link" to={"/" + post.frontmatter.category}>{post.frontmatter.category.toUpperCase()}</Link></div>
        <article className="center">
          <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
          <h1>{post.frontmatter.title}</h1>
            <time dateTime={post.frontmatter.date} style={{
              marginBottom: "1em",
              display: "block",
            }}>
            <FaClockO height="1em" width="1.5em"/>
            <small>
              {post.frontmatter.date}
            </small>
          </time>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <aside style={{ marginTop: '2.3em', padding: '0 0.6em' }}>
            <p style={{
              color: '#994d4d',
              fontSize: '0.9em',
            }}>この記事を書いた人：{post.frontmatter.author}</p>
            <div>
              <div style={{
                color: '#994d4d',
                fontSize: '0.9em',
              }}>シェアする</div>
              <div style={{
                display: 'inline-flex',
                flexFlow: 'row wrap',
                margin: '0.5em 0',
              }}>
                <a target="_blank" href={`http://twitter.com/share?url=${shareUrl}`}><TwitterIcon width="3em" height="2.5em" style={{color: "#1DA1F2"}}/></a>
                <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}><FacebookIcon width="3em" height="2.5em" style={{color: "#4267b2"}}/></a>
              </div>
            </div>
            <ul style={{
                display: 'flex',
                flexFlow: 'row wrap',
                listStyle: 'none',
                paddingLeft: '0',
                margin: '1em 0',
                fontSize: '1em',
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
                marginLeft: '0',
                fontSize: '1em',
              }}
            >
              <li style={{maxWidth: '44%'}}>
                {previous && (
                  <Link to={'/' + previous.frontmatter.category + '/' + previous.frontmatter.slug} rel="prev">
                    <ChevronLeft width="1.5em" height="1em"/>{previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li style={{maxWidth: '44%'}}>
                {next && (
                  <Link to={'/' + next.frontmatter.category + '/' + next.frontmatter.slug} rel="next">
                    {next.frontmatter.title}<ChevronRight width="1.5em" height="1em"/>
                  </Link>
                )}
              </li>
            </ul>
          </aside>
        </article>
        <hr className="hr-1"/>
        <section className="center">
          <div className="title-1">Related Posts</div>
          <div className="sub-title-1">この記事に類似しているページ</div>
          {relatedPages.map(({ node }) => {
            const excerptSliced = node.excerpt.length > 110 ? node.excerpt.slice(0, 110) + "..." : node.excerpt;
            return (
              <div className="preview">
                <Link to={"/" + node.frontmatter.category} className="category">{node.frontmatter.category.toUpperCase()}</Link>
                <time dateTime={node.frontmatter.date}>
                  <FaClockO height="1em" width="1.5em"/>
                  <small>
                    {node.frontmatter.date}
                  </small>
                </time>
                <div>
                <Link className="title-2" to={'/' + node.frontmatter.category + '/' + node.frontmatter.slug}>
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