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
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
              edges {
                node {
                  excerpt(pruneLength: 5000)
                  frontmatter {
                    slug,
                    title,
                    tags,
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

        _.each(posts, (post, index) => {
          const previous = index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;

          var relatedPages = [];

          // 関連ページリストの生成
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

          // 個別ページの生成
          createPage({
            path: post.node.frontmatter.slug,
            component: blogPost,
            context: {
              slug: post.node.frontmatter.slug,
              previous,
              next,
              relatedPages
            },
          })
        })
      })
    )
  })
}