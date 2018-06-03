import React from "react"
import Link from 'gatsby-link'
import FaClockO from 'react-icons/lib/fa/clock-o'

function Preview(posts, type = "default", max = -1, category = []) {
  let numOfPosts = 0;
  let mappedPosts = [];
  _.each(posts,({node}, index) => {
    if(max != -1 && numOfPosts > max) return false;
    if(category.length && !category.find((t)=>{return t===node.frontmatter.category})) return true;
    numOfPosts += 1;
    const title = node.frontmatter.title || node.frontmatter.slug;
    const excerpt = node.excerpt.length > 110 ? node.excerpt.slice(0, 110) + "..." : node.excerpt;
    mappedPosts.push(
      type === "lines" ?
        <div className="preview-lines" key={node.frontmatter.slug}>
          <Link to={'/' + node.frontmatter.category + '/' + node.frontmatter.slug}>
            {title}
          </Link>
          &nbsp;-&nbsp;
          <time className="time" dateTime={node.frontmatter.date}>{node.frontmatter.date}</time>
        </div>
      :
        <div className="preview" key={node.frontmatter.slug}>
          <Link to={"/" + node.frontmatter.category} className="category">{node.frontmatter.category.toUpperCase()}</Link>
          <time className="time" dateTime={node.frontmatter.date}>
            <FaClockO className="clockIcon"/>
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
  })
  return (
    <div className={type==="lines"?"preview-lines-container":"preview-container"}>
      {mappedPosts}
    </div>
  )
}

export default Preview;