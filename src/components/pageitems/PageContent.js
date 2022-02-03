function PageContent({contentNav, children}) {
    if (!contentNav) { contentNav = null; }

    return <main id='page-content'>
        {contentNav}
        {children}
    </main>
}

export default PageContent;