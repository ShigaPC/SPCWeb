import React from "react"
import PropTypes from "prop-types"
import Link from "gatsby-link"
import Helmet from "react-helmet"
import get from 'lodash/get'
import Preview from '../components/preview'
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
            {Preview(edges)}
          </section>
        </div>
      );
    } else {
      return (
        <section className="center">
          <Helmet title={`すべてのタグ | ${siteTitle}`} />
          <div className="title-3">すべてのタグ({tags.length})</div>
          <div className="tags-wrapper">
            {tags.map((tag, index) => {
              return (
                <div className="tag">
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

