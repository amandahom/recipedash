// import Footer from 'assets/components/Footer'
import Head from 'next/head'
import * as React from 'react'
import Navbar from '../../assets/components/Navbar'

function Layout(props: any) {
  return (
    <React.Fragment>
      <Head>
        <title>Recipe App</title>
      </Head>
      <div className="flex flex-col h-full">
        <Navbar />
        <main className="mb-auto">
          <div className="mx-auto flex-grow">{props.children}</div>
        </main>
        {/* <Footer /> */}
      </div>
    </React.Fragment>
  )
}

export default Layout
