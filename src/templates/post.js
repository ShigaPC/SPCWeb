import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import ChevronLeft from 'react-icons/lib/fa/chevron-left'
import ChevronRight from 'react-icons/lib/fa/chevron-right'
import FaClockO from 'react-icons/lib/fa/clock-o'
import TwitterIcon from 'react-icons/lib/fa/twitter-square'
import FacebookIcon from 'react-icons/lib/fa/facebook-square'
import Preview from '../components/preview'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const { previous, next, relatedPages } = this.props.pathContext
    const shareUrl = "https://www.shigapc.com/" + post.frontmatter.category + "/" + post.frontmatter.slug;

    return (
      <div>
        <div className="title-3"><Link className="category-link" to={"/" + post.frontmatter.category}>{post.frontmatter.category.toUpperCase()}</Link></div>
        <article className="center post">
          <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
          <h1>{post.frontmatter.title}</h1>
            <time className="time" dateTime={post.frontmatter.date}>
            <FaClockO className="clock-icon"/>
            <small>
              {post.frontmatter.date}
            </small>
          </time>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <aside className="aside">
            <p>この記事を書いた人：{post.frontmatter.author}</p>
            <div>
              <p>SNSでシェア</p>
              <div className="share-button-box">
                <a target="_blank" rel="noopener" href={`http://twitter.com/share?url=${shareUrl}`} title="Twitterでシェア"><TwitterIcon className="twitter-icon"/></a>
                <a target="_blank" rel="noopener" href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} title="Facebookでシェア"><FacebookIcon className="facebook-icon"/></a>
              </div>
            </div>
            <ul className="tags-box">
              {post.frontmatter.tags.map(tag =>
                <li>
                  <Link to={`/tags/${tag}`}>#{tag}</Link>
                </li>
              )}
            </ul>
            <ul className="prev-next-box">
              <li>
                {previous && (
                  <Link to={'/' + previous.frontmatter.category + '/' + previous.frontmatter.slug} rel="prev">
                    <ChevronLeft className="prev-next-icon"/>{previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={'/' + next.frontmatter.category + '/' + next.frontmatter.slug} rel="next">
                    {next.frontmatter.title}<ChevronRight className="prev-next-icon"/>
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
          {Preview(relatedPages)}
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
