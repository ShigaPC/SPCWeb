import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet"
import get from 'lodash/get'
import FaClockO from 'react-icons/lib/fa/clock-o'
const _ = require('lodash')

class Tags extends React.Component {
  render() {
    const { tag, tags } = this.props.pathContext;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    if(tag) {
      const { edges, totalCount } = get(this.props, 'data.allMarkdownRemark')
      const tagHeader = `ALL #${tag}(${totalCount})`;
      return (
        <div>
          <Helmet
            title={`${tag} | ${siteTitle}`}
            meta={[
              {
                name: 'description',
                content:`滋賀大学パソコン研究会 ウェブサイトです。このページでは、${tag}に関する記事を一覧表示しています。`,
              },
            ]}
          />
          <div className="title-3">{tagHeader}</div>
          <section className="center">
            <div className="preview-container">
            {edges.map(({ node }, index) => {
              const title = get(node, 'frontmatter.title') || node.frontmatter.slug;
              const excerpt = node.excerpt.length > 140 ? node.excerpt.slice(0, 140) + "..." : node.excerpt;
              return (
                <div className='preview' key={node.frontmatter.slug}>
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
            })}
            </div>
            <div style={{display: 'block', textAlign: 'right'}}><Link to="/tags">すべてのタグ</Link></div>
          </section>
        </div>
      );
    } else {
      return (
        <section className="center">
          <Helmet title={`すべてのタグ | ${siteTitle}`} />
          <div className="title-3">すべてのタグ({tags.length})</div>
          <div style={{
            display: 'flex',
            flexFlow: 'row wrap',
          }}>
            {tags.map((tag, index) => {
              return (
                <div style={{margin: '0.5em' }}>
                  <Link to={"/tags/" + tag}>#{tag}</Link>
                </div>
              )
            })}
          </div>
        </section>
      );
    }
  }
};

Tags.propTypes = {
  pathContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              slug: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
};

export default Tags;

export const pageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 5000)
          frontmatter {
            slug
            date(formatString: "YYYY/MM/DD")
            title
            author
            tags
            category
          }
        }
      }
    }
  }
`;

