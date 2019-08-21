import React from 'react'
import App from 'next/app'
import "katex/dist/katex.css"

export default class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props

    return <Component {...pageProps} />
  }
}
