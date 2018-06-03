import React from "react"
import PropTypes from "prop-types"
import Link from "gatsby-link"
import Helmet from "react-helmet"
import get from 'lodash/get'
import Preview from '../components/preview'
const _ = require('lodash')

class Posts extends React.Component {
  render() {
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const { edges, totalCount } = get(this.props, 'data.allMarkdownRemark')
    return (
      <div>
        <Helmet
          title={`ALL POSTS | ${siteTitle}`}
          meta={[
            {
              name: 'description',
              content:`滋賀大学パソコン研究会 ウェブサイトです。このページでは、すべての記事を一覧表示しています。`,
            },
          ]}
        />
        <div className="title-3">ALL POSTS({totalCount})</div>
        <section className="center">
          {Preview(edges)}
        </section>
      </div>
    );
  }
};

Posts.propTypes = {
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

export default Posts;

export const pageQuery = graphql`
  query PostsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
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