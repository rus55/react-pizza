import React from "react"
import ContentLoader from "react-content-loader"

export const Skeleton = () => (
    <ContentLoader
        className='pizza-block'
        speed={2}
        width={280}
        height={466}
        viewBox="0 0 280 466"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="138" cy="138" r="138" />
        <rect x="0" y="296" rx="10" ry="10" width="280" height="23" />
        <rect x="0" y="345" rx="10" ry="10" width="280" height="88" />
        <rect x="0" y="455" rx="10" ry="10" width="95" height="30" />
        <rect x="125" y="446" rx="24" ry="24" width="152" height="45" />
    </ContentLoader>
)