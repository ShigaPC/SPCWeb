import React from "react"
import PropTypes from "prop-types"
import Link from "gatsby-link"
import Helmet from "react-helmet"
import get from 'lodash/get'
import Preview from '../components/preview'
const _ = require('lodash')

class Category extends React.Component {
  render() {
    const { cat } = this.props.pathContext;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const { edges, totalCount } = get(this.props, 'data.allMarkdownRemark')
    const categoryHeader = `${cat.toUpperCase()}(${totalCount})`;
    return (
      <div>
        <Helmet
          title={`${cat.toUpperCase()} | ${siteTitle}`}
          meta={[
            {
              name: 'description',
              content:`滋賀大学パソコン研究会 ウェブサイトです。このページでは、${cat.toUpperCase()}に関する記事を一覧表示しています。`,
            },
          ]}
        />
        <div className="title-3">ALL {categoryHeader}</div>
        <section className="center">
          {Preview(edges)}
        </section>
      </div>
    );
  }
};

Category.propTypes = {
  pathContext: PropTypes.shape({
    cat: PropTypes.string.isRequired,
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

export default Category;

export const pageQuery = graphql`
  query CategoryPage($cat: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category:  { eq: $cat } } }
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

