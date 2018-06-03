import React from 'react'
import Helmet from 'react-helmet'

const NotFoundPage = () => (
  <div>
    <Helmet
      title={`404 Not Found | 滋賀大学パソコン研究会ウェブサイト`}
    />
    <div className="title-3">404 NOT FOUND</div>
    <p>お探しのページは見つかりませんでした。一時的にアクセスできない状況にあるか、移動もしくは削除された可能性があります。</p>
  </div>
)

export default NotFoundPage