/*
 * 個別ページの生成を行っています。
 * 関連ページのリストもここで生成しています。
 * excerptはマルチバイト文字列をうまく取得できないのでpruneLength:5000で全部取得しています。
 */

const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const tagTemplate = path.resolve("src/templates/tags.js")
    const categoryTemplate = path.resolve("src/templates/category.js")
    const postsTemplate = path.resolve("src/templates/posts.js")

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
              edges {
                node {
                  excerpt(pruneLength: 5000)
                  frontmatter {
                    slug
                    title
                    date(formatString: "YYYY/MM/DD")
                    author
                    tags
                    category
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allMarkdownRemark.edges;
        let tags = [];
        let categories = [];

        _.each(posts, (post, index) => {
          const previous = index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;

          var relatedPages = [];
          
          if (_.get(post, "node.frontmatter.tags")) {
            tags = tags.concat(post.node.frontmatter.tags);
          }
          
          if (_.get(post, "node.frontmatter.category")) {
            categories.push(post.node.frontmatter.category);
          }

          _.each(posts, (tmp, index) => {
            _.each(post.node.frontmatter.tags, (elm)=>{
              if(
                tmp.node.frontmatter.tags.find(target => target === elm) &&
                post.node.frontmatter.slug !== tmp.node.frontmatter.slug
              ){
                relatedPages.push(tmp);
                return false;
              }
            });
            if(relatedPages.length > 5) return false;
          })

          createPage({
            path: '/' + post.node.frontmatter.category + '/' + post.node.frontmatter.slug,
            component: blogPost,
            context: {
              slug: post.node.frontmatter.slug,
              previous,
              next,
              relatedPages
            },
          })

        tags = _.uniq(tags);
        categories = _.uniq(categories);

        createPage({
          path: '/tags/',
          component: tagTemplate,
          context: {
            tag: null,
            tags
          }
        });

        createPage({
          path: '/posts/',
          component: postsTemplate,
        });

        tags.forEach(tag => {
          createPage({
            path: `/tags/${tag}/`,
            component: tagTemplate,
            context: {
              tag,
              tags: null
            },
          });
        });

        categories.forEach(cat => {
          createPage({
            path: `/${cat}/`,
            component: categoryTemplate,
            context: {
              cat,
            },
          });
        });
        })
      })
    )
  })
}